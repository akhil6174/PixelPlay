//basic multer middleware fucntionality
import multer from 'multer'

//we will store uplaoded file at disStorage here and after that it will be uploaded to cloudinary.
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/temp')//where will keep our uploaded files locally.
    },
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now()+'-'+Math.round(Math.random*1E9)
        cb(null,file.fieldname+'-'+uniqueSuffix)
    }
})

export const upload=multer({storage:storage})