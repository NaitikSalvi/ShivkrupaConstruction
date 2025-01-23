import { connectionStr } from "@/lib/db1";
import {PropertyDetails} from "@/lib/model/property";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(request,content){
    console.log(content)
    const propertyId=content.params.deleteproperty
    const record={_id:propertyId}
    await mongoose.connect(connectionStr)
   const result =await PropertyDetails.deleteOne(record)
   return NextResponse.json({result,success:true})
  }