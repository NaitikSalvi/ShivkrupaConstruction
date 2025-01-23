import { connectionStr } from "@/lib/db1";
import { Enquiry } from "@/lib/model/enquiry";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(request) {
    const payload= await request.json()
    // if(!payload.name)
    // { return NextResponse.json({result:"name not found"})}
    await mongoose.connect(connectionStr)
    let enquiry=new Enquiry(payload)
    const result=await enquiry.save()
    return NextResponse.json({result,s1:true})
}
export async function GET() {
    await mongoose.connect(connectionStr)
    const data=await Enquiry.find()

     return NextResponse.json({result:data})
 }