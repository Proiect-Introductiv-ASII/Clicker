"use client"; 

import { useState } from "react";

const TestimonialForm = () => {
    const [ testimonialText, setTestimonialText ] = useState(""); 
    const [ rating, setRating ] = useState(0); 

    const handleSubmit = async (e) => { 
        e.preventDefault();

        try { 
            const response = await fetch("/api/create-testimonial", { 
                method: "POST", 
                mode: "cors", 
                headers: { 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    testimonialText, 
                    rating 
                })
            })
        } catch (err) { 
            console.log(err); 
        }
    }
  return (
    <div>
        <form onSubmit = { handleSubmit } >
            <textarea
                onChange = { (e) => setTestimonialText(e.target.value) }
                type = "text"
                placeholder= "Aa..."
            />

            <input
                onChange = { (e) => setRating(e.target.value) }
                type = "number"
                step={1}
                min={1}
                max={5}
            />
            <button type = "submit"> Post </button>
        </form>
    </div>
  )
}

export default TestimonialForm