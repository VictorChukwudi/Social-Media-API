import mongoose from "mongoose";

const schema= mongoose.Schema

const postSchema= new schema({
   creatorId:{
    type: schema.Types.ObjectId,
    ref:"User",
    required:true
   },
   creator:{
    type:String,
    required:true,
    ref: "User"
   },
   body:{
    type:String
   },
   imageData:[{type: Object}],
   videoData:[{type: Object}],
   likes:[{type: schema.Types.ObjectId, ref:"User"}],
   comments:[{type: Object}]
},{
    timestamps:true
})

const Post= mongoose.model("Post",postSchema)
export default Post