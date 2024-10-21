import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import getCurrentUser from "@/app/actions/getCurrentUser";
import calculateClickSeconds from "@/utils/calculateClickSeconds";

export const PATCH = async (req) => { 
    try { 
        const { price } = await req.json(); 
        await connectToDB(); 

        const currentUser = await getCurrentUser(); 
        if(!currentUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 }); 

        const newClickPerSecondCost = calculateClickSeconds(currentUser?.secondsLevel, currentUser?.upgradePointsPerSecondCost); 

        const updatedUser = await User.findByIdAndUpdate(
            currentUser?._id, 
            { 
                points: currentUser?.points - price, 
                pointsPerSecond: currentUser?.pointsPerSecond + 1, 
                secondsLevel: currentUser?.secondsLevel + 1,
                upgradePointsPerSecondCost: newClickPerSecondCost, 
            }
        ); 

        if(!updatedUser) return NextResponse.json({ message: "Forbidden" }, { status: 403 }); 
        return NextResponse.json(updatedUser, { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return NextResponse.json({ message: "Internal server error" }, { status: 500 }); 
    }
}