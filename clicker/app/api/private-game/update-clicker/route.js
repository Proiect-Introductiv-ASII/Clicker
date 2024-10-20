import { NextResponse } from "next/server";
import User from "@/models/user";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { connectToDB } from "@/utils/database";

export const PATCH = async (req) => { 
    try { 
        await connectToDB(); 

        const currentUser = await getCurrentUser(); 
        if(!currentUser) return NextResponse.json({ message: "No current user was found" }, { status: 401 }); 

        const { price } = await req.json(); 

        const updatedUser = await User.findByIdAndUpdate( 
            currentUser?._id, 
            { 
                points: currentUser?.points - price, 
                pointsPerClick: currentUser?.pointsPerClick + 1, 
            }
        ); 

        if(!updatedUser) return NextResponse.json({ message: "Update went wrong" }, { status: 403 }); 
        return NextResponse.json(updatedUser, { status: 200 }); 
    } catch(err) { 
        return NextResponse.json({ message: "Error occured on the server side"}, { status: 500 }); 
    }
}