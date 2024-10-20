import { NextResponse } from "next/server";
import Testimonial from "@/models/testimonial";
import User from "@/models/user";
import { connectToDB  } from "@/utils/database";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const POST = async (req) => { 
    try { 
        const { testimonialText, rating } = await req.json(); 
        await connectToDB(); 

        const currentUser = await getCurrentUser(); 
        if(!currentUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        
        if(currentUser.testimonialId) return NextResponse.json({ message: "Unprocessable content" }, { status: 422 }); 

        const newTestimonial = await Testimonial.create({ 
            userId: currentUser?._id,
            text: testimonialText, 
            rating
        }); 

        if(!newTestimonial) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

        const updatedUser = await User.findByIdAndUpdate(
            currentUser?._id, 
            { 
                testimonialId: newTestimonial?._id
            }
        ); 

        if(!updatedUser)  return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        return NextResponse.json(newTestimonial, { status: 201 }); 
    } catch(err) { 
        console.log(err); 
        return NextResponse.json({ message: "Internal server error" }, { status: 500 }); 
    }
}