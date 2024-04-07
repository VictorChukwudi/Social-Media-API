import mongoose from "mongoose";

const schema= mongoose.Schema

const notificationSchema= new schema({
    recipient: { type: mongoose.Schema.Types.ObjectId, ref:"User", required: true },
    message: { type: String, required: true },
    postId: {type: mongoose.Schema.Types.ObjectId, ref:"Post"}      //required for only comments on posts
},{
    timestamps:true
})

const Notification= mongoose.model("Notification",notificationSchema)
export default Notification
