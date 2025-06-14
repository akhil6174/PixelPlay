import dotenv from 'dotenv'
import dbConnect from './db/index.js'
import app from './app.js'

dotenv.config({path:'./.env'})


dbConnect().then(()=>{
    app.on("error",(error)=>{
        console.log("Error while connecting to db",error);
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log("server started at port:",process.env.PORT)
    })
})


