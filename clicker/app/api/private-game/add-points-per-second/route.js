import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { LEVEL_UP_COST } from "@/contants";

export const PATCH = async () => { 
    try { 
        await connectToDB(); 

        const currentUser = await getCurrentUser(); 
        if(!currentUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 }); 

        if(currentUser?.points < LEVEL_UP_COST) { 
            const updatedUser = await User.findByIdAndUpdate(
                currentUser?._id, 
                { 
                    points: currentUser?.points + currentUser?.pointsPerSecond, 
                }   
            ); 
    
            if(!updatedUser) return NextResponse.json({ message: "Forbidden" }, { status: 403 }); 
            return NextResponse.json(updatedUser, { status: 200 }); 
        } else { 
            return NextResponse.json({ message: "Level Up" }, { status: 403 });
        }
    } catch(err) { 
        console.log(err); 
        return NextResponse.json({ message: "Internal server error" }, { status: 500 }); 
    }
}