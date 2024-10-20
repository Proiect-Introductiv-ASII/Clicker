import { NextResponse } from "next/server";
import User from "@/models/user";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { connectToDB } from "@/utils/database";

export const PATCH = async () => { 
    try { 
        await connectToDB(); 

        const currentUser = await getCurrentUser();  
        if(!currentUser?.email) return NextResponse.json({ message: "No current user is logged in" }, { status: 401 }); 

        const user = await User.findOne({ 
            email: currentUser?.email 
        }, { 
            points: 1, 
            pointsPerClick: 1
        }); 

        console.log(user); 

        if(!user) return NextResponse.json({ message: "No current user was found" }, { status: 403 }); 

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { 
                points: user.points + user.pointsPerClick, 
            }
    ); 

        if(!updatedUser) return NextResponse.json({ message: "Forbidden" }, { status: 403 }); 
        return NextResponse.json(updatedUser, { status: 200 }); 
    } catch(err) {  
        console.log(err); 
        return NextResponse.json({ message: "Failed to add a point"}, { status: 500 })
    }
}