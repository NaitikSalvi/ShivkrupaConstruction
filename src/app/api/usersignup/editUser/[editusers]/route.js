
import { connectionStr } from "@/lib/db1";
import {User} from "@/lib/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function PUT(request,content){
    console.log(content)

    const userId=content.params.editusers
    const record={_id:userId}
    const payload=await request.json()
    await mongoose.connect(connectionStr)
   const result =await User.findOneAndUpdate(record,payload)
   return NextResponse.json({result,success:true})
  }