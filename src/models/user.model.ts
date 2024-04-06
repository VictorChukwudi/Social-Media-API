import mongoose from "mongoose";

const schema= mongoose.Schema

const userSchema= new schema({
    firstName:{
        type:String,
        required:true,
        trim: true
    },
    lastName:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    followers:[{type: schema.Types.ObjectId, ref:"User"}],
    following:[{type: schema.Types.ObjectId, ref:"User"}],
},{
    timestamps:true
})

const User= mongoose.model("User",userSchema)
export default User