import mongoose from 'mongoose'
import { db_name } from '../constants.js'

const dbConnect=async()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`)
        console.log("Connectiorn created :-",connectionInstance)
    }catch(err){
        console.log('MOngoDB connection failed',err)
    }
}
export default dbConnect;