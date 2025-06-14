import{Schema,model} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
const videoSchema=new Schema({
    videoFile:{
        type:String,//cloudinry url
        required:true
    },
    thumbnail:{
        type:String,//cloudinry url
        required:true
    },
    title:{
        type:String,
        required:true
    },
    duration:{
        type:Number,//get from cloudinary itself
        required:true
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    description:{
        type:String,
        required:true
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    views:{
        type:Number,
        default:0,
    }
},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video =model("Video",videoSchema)