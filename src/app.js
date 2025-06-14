import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app=express()

app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true,
    }
))

//telling how much  of json,urlencoder,some static(public) files can be stored
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import  userRouter  from './routes/user.routes.js';



//routes declaration 
//Note:- here we can't direclty use app.get to declare the route because we had kept router somewhere else that'swhy we will use middleware to declare route
app.use("/api/v1/users",userRouter)//middleware will take me to userRouter and there what route i will add will be further used and method called will be executed.
export default app;