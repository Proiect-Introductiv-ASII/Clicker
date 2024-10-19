import { Schema, models, model } from "mongoose"; 

const TestimonialSchema = new Schema({ 
    userId: { 
        type: Schema.Types.ObjectId, 
        required: [ true, "userId is required!" ],  
    }, 
    text: { 
        type: String, 
        required: [ true, "Text is required" ], 
    }, 
    rating: { 
        type: Number, 
        required: true, 
    }
}, { timestamps: true }); 

const Testimonial = models.Testimonial || model("Testimonial", TestimonialSchema); 
export default Testimonial; 