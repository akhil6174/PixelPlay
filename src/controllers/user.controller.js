import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import { User } from "../models/user.models.js";
import {uploadFileOnCloudinary} from "../utils/cloudinaryConfig.js"
import {ApiResponse} from "../utils/ApiResponse.js"
const registerUser=asyncHandler(async(req,res)=>{
    //      **Algo (steps neended in Register)**
    // 1) get user details from frontend
    // 2) validate details (whether all details are filled)
    // 3) check if user already exists :username,email
    // 4) check for images (files),check for avatar[because avatar is a required filled and if don't check while uploading at server then at the time of uploading at cloudinary then our db may get error.]
    // 5) upload files at cloudinary,check for avatar
    // 6) create user Object (create entry at db)

    // now we will send the response at user side(frontend) 
    // 7) remove password&refresh token from user response becaus we don't want to send the response at the userside.
    // 8) Check for user creation (means, whther we have created user at db successfully or not)
    // 9) return response to user (where password & refresh token will be empty beacuse they were removed)
    //   ** Algo completed **

    // Step-1  get details
    //when data is send from json/html/form they come to body thus:-

    const {fullname,email,password,username}=req.body //extracting these values from body
    console.log("Email :- ",email)

    //Step-2 validate detais

    // if(fullname===""){                                  //basic approach to validate
    //     throw new ApiError(400,"Field is required")
    // }

    if(
        [fullname,email,password,username].some((field)=>{field.trim()===""})   //better approach
    )throw new ApiError(400,"All fields are required")

    // Step-3 check for pre existing username/email
    const existedUser=User.findOne({
        $or:[{ username },{ email }]
    })
    if(existedUser){ // means already existed username or email
        throw new ApiError(411,"username/email already exist")
    }

    // Step-04 Check for images/files
    //multer provides req.files to get local file path of files
    const avatarLocalPath= req.files?.avatar[0].path;
    const coverImageLocalPath= req.files.coverImage[0].path;
    //check for avatar is added to server or not
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar not found")
    }
    
    // Step-05 upload file on cloudinary
    const avatar= await uploadFileOnCloudinary(avatarLocalPath)
    const coverImage= await uploadFileOnCloudinary(coverImageLocalPath)

    //check for avatar
    if(!avatar){
        throw new ApiError(400,"Avatar not found")
    }

    // Step-06 Create user Object
    const user= await User.create({
        fullname,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    // Step-07 Remove password & refreshToken
    const createdUser= await User.findById(user._id).select("-password -refreshToken");
    //Step -8 check whether user created or not
    if(!createdUser){
        throw new ApiError(504,"Something went wrong while registration")
    }
    // Step -09 Return response
    res.status(201).json(
        new ApiResponse(200,createdUser,"User Created Successfully")
    )
})

export {registerUser}