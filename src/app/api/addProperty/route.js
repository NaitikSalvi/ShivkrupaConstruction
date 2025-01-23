import { connectionStr } from "@/lib/db1";
import {PropertyDetails} from "@/lib/model/property";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload= await request.json()
    // if(!payload.name)
    // { return NextResponse.json({result:"name not found"})}
    await mongoose.connect(connectionStr)
    // const file1=payload.file
    // if(!file1){
    //   return NextResponse.json({success:false})
    // }
    // const bufferData=await file1.arrayBuffer()
    // const buffer=Buffer.from(bufferData)

    let property=new PropertyDetails(payload)
    const result=await property.save()
    return NextResponse.json({result,s1:true})
}
export async function GET() {
  await mongoose.connect(connectionStr)
  const data=await PropertyDetails.find()

   return NextResponse.json({result:data})
}
