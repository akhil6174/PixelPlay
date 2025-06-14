import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
(async function() {

    // Configuration is done first
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.envCLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });


})();//ify function(runs firstly)

//Note :- we can direclty upload file at cloudinary but thats not efficient and production grade work.
//          we will use multer(middleware) which will help us to store our uploading file firslty at localStorage of server(either DiskStorage or MemoryStorage[it's small])
//          and then from our localStorage path we will upload it to cloudinary.
//                                      Let's see...

const uploadFileOnCloudinary=async(localStoragePath)=>{
    try {
        if(!localStoragePath)return null //we can also give error on this.
        //upload file at cloudinary
        const response=await cloudinary.uploader.upload(localStoragePath,{resource_type:'auto'});
        //file uploaded successfully.
        console.log("File uploaded Successfully",response.url)
        return response;
    } catch (error) {
        //when we will receive an error we will delete the uploading file from localSotrage
        fs.unlinkSync(localStoragePath)
    }
}

export {uploadFileOnCloudinary}