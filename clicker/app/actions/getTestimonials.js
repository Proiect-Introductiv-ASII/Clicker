import getSession from "./getSession";
import { connectToDB } from "@/utils/database";
import Testimonial from "@/models/testimonial";
import User from "@/models/user";

export const getTestimonials = async () => { 
    try { 
        await connectToDB(); 
        const session = await getSession(); 
        const currentUser = await User.findOne({ 
            email: session?.user?.email
        }).select("_id"); 
    
        if(!session?.user?.email) { 
            console.log("No user is logged in."); 
            return null; 
        }

        console.log({ t:  session?.user }); 
        const testimonials = await Testimonial.find({ 
            //userId: { $ne: currentUser?._id } // pentru dupa ce se face front end dev
        }).sort({ createdAt: 1 }); 
        return testimonials; 
    } catch(err) {  
        console.log(err); 
        return null; 
    }
}