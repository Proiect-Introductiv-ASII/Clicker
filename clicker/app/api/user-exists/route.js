import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export async function POST (req) { 
    try { 
        await connectToDB(); 
        const { email } = await req.json(); 
        const user = await User.findOne({ email }).select("_id"); 

        return NextResponse.json({ user }, { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return NextResponse.json({ err: "Error occured while verifying existing user" }, { status: 500 }); 
    }
}