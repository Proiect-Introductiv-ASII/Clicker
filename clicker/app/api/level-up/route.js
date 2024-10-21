import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { LEVEL_UP_COST } from "@/contants";

export const PATCH = async () => { 
    try { 
        await connectToDB(); 
        
        const currentUser = await getCurrentUser(); 
        if(!currentUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 }); 

        console.log({ points: currentUser?.points }); 
        if(currentUser?.points < LEVEL_UP_COST) return NextResponse.json({ message: "Forbidden" }, { status: 403 }); 

        const updatedUser = await User.findByIdAndUpdate(
            currentUser?._id, 
            { 
                level: currentUser?.level + 1, 
                points: currentUser?.points - LEVEL_UP_COST, 
            }
        ); 

        if(!updatedUser) return NextResponse.json({ message: "Forbidden" }, { status: 403 }); 
        return NextResponse.json(updatedUser, { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 }); 
    }
}