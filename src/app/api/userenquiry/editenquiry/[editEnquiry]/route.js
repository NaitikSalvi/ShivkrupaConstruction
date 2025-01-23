import { connectionStr } from "@/lib/db1";
import { Enquiry } from "@/lib/model/enquiry";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function PUT(request,content){
    console.log(content)

    const enquiryId=content.params.editEnquiry
    const record={_id:enquiryId}
    const payload=await request.json()
    await mongoose.connect(connectionStr)
   const result =await Enquiry.findOneAndUpdate(record,payload)
   return NextResponse.json({result,success:true})
  }