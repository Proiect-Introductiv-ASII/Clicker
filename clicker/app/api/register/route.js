import { NextResponse } from "next/server";

export async function POST (req) { 
    try { 
        const { name, email, password } = await req.json(); 

        console.log({ name, email, password }); 

        return NextResponse.json({ 
            message: "User registered"
        }, { status: 201 }); 
    } catch(err) { 
        return NextResponse.json({ 
            message: "Error occured while registering the user"
        }, { status: 500 }); 
    }
}