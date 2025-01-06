import { connectionStr } from "@/lib/db1";
import { User } from "@/lib/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export  async function GET() {
    
    await mongoose.connect(connectionStr)
    
    return NextResponse.json({result:"hello"})
}
export async function POST(request) {
    const payload= await request.json()
    // if(!payload.name)
    // { return NextResponse.json({result:"name not found"})}
    await mongoose.connect(connectionStr)
    let user=new User(payload)
    const result=await user.save()
    return NextResponse.json({result,s1:true})
}