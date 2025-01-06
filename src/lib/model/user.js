import mongoose from "mongoose";
const userModel=new mongoose.Schema({
    
    name:String,
    email:String,
    password:String,
    age:Number, 
});
export const User =mongoose.models.user || mongoose.model("user",userModel)