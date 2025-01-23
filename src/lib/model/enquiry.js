import mongoose from "mongoose";
const enquiryModel=new mongoose.Schema({
    
 name:{
    type:String,
 },
 email:{
    type:String
 },
 message:{
    type:String
 }
});
export const Enquiry =mongoose.models.EnquiryDetails || mongoose.model("EnquiryDetails",enquiryModel)