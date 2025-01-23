import { connectionStr } from "@/lib/db1";
import {PropertyDetails} from "@/lib/model/property";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request,content){
    console.log(content)

    const propertyId=content.params.editproperties
    const record={_id:propertyId}
    const payload=await request.json()
    await mongoose.connect(connectionStr)
   const result =await PropertyDetails.findOneAndUpdate(record,payload)
   return NextResponse.json({result,success:true})
  }