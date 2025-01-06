import { connectionStr } from "@/lib/db1";
import { User } from "@/lib/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// export  async function GET() {
    
    
//     return NextResponse.json({result:"hello"})
// }
// export async function GET(request) {
    
//     const data=user;
//     await mongoose.connect(connectionStr)

//     return NextResponse.json(data,{status:200})
// }
// export  function GET(request,response) {
   
//     const userData=user.filter((item)=>item.id==response.params.id)
//     return NextResponse.json(userData.length==0?{result:"no data",success:false}:{result:userData[0],success:true})
// }
export async function GET() {
    await mongoose.connect(connectionStr)
    const data=await User.find()

     return NextResponse.json({result:data})
 }
