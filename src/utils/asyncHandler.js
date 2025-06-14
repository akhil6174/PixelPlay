//create highOrder func

const asyncHandler=(func)=>async(err,req,res,next)=>{
    try{
        return await func(err,req,res,next)
    }catch(error){
        return res.staus(error.status || 500).json({
            success:false,
            message:error.message
        })
    }
}
export {asyncHandler};