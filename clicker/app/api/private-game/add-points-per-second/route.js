import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const PATCH = async () => { 
    try { 
        await connectToDB(); 

        const currentUser = await getCurrentUser(); 
        if(!currentUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 }); 

        const updatedUser = await User.findByIdAndUpdate(
            currentUser?._id, 
            { 
                points: currentUser?.points + currentUser?.pointsPerSecond, 
            }   
        ); 

        if(!updatedUser) return NextResponse.json({ message: "Forbidden" }, { status: 403 }); 
        return NextResponse.json(updatedUser, { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return NextResponse.json({ message: "Internal server error" }, { status: 500 }); 
    }
}