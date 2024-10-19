import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; 

export async function POST (req) { 
    try { 
        await connectToDB(); 
        const { name, email, password } = await req.json(); 
        const hashedPassword = await bcrypt.hash(password, 10); 

        await User.create({ 
            name,
            email, 
            password: hashedPassword, 
            points: 0,
        }); 

        return NextResponse.json({ 
            message: "User registered"
        }, { status: 201 }); 
    } catch(err) { 
        console.log(err); 
        return NextResponse.json({ 
            message: "Error occured while registering the user"
        }, { status: 500 }); 
    }
}