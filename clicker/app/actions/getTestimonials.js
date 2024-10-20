import getSession from "./getSession";
import { connectToDB } from "@/utils/database";
import Testimonial from "@/models/testimonial";

export const getTestimonials = async () => { 
    try { 
        await connectToDB(); 
        const session = await getSession(); 
    
        if(!session?.user?.email) { 
            console.log("No user is logged in."); 
            return null; 
        }

        const testimonials = await Testimonial.find().sort({ createdAt: 1 }); 
        return testimonials; 
    } catch(err) {  
        console.log(err); 
        return null; 
    }
}