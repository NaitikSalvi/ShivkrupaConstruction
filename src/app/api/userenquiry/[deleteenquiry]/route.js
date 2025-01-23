import { connectionStr } from "@/lib/db1";
import {Enquiry} from "@/lib/model/enquiry";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(request,content){
    console.log(content)
    const enquiryId=content.params.deleteenquiry
    const record={_id:enquiryId}
    await mongoose.connect(connectionStr)
   const result =await Enquiry.deleteOne(record)
   return NextResponse.json({result,success:true})
  }