import { connectionStr } from "@/lib/db1";
import {User} from "@/lib/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(request,content){
    console.log(content)
    const userId=content.params.deleteuser
    const record={_id:userId}
    await mongoose.connect(connectionStr)
   const result =await User.deleteOne(record)
   return NextResponse.json({result,success:true})
  }