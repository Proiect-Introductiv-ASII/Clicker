"use client"
import { useState } from "react";

const TestimonialForm = ({ testimonials }) => {
    const latestTestimonials = JSON.parse(testimonials); 
    const [testimonialText, setTestimonialText] = useState("");
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [ testimonialLoad, setTestimonialLoad ] = useState({}); 
     
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (rating < 1 || rating > 5) {
            setError("Please provide a rating between 1 and 5.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/create-testimonial", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    testimonialText,
                    rating,
                }),
            });

            if (!response.ok) {
                throw new Error("Error submitting testimonial");
            }

            if(response.ok) { 
                setTestimonialLoad({ 
                    text: testimonialText, 
                    rating
                }); 
            }

            setTestimonialText("");
            setRating(0);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
                <div className="testimonial-form">
            <h2>Submit Your Testimonial</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    value={testimonialText}
                    onChange={(e) => setTestimonialText(e.target.value)}
                    placeholder="Write your testimonial here..."
                    required
                />
                <input
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Rating (1-5)"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Posting..." : "Post"}
                </button>
            </form>
            </div>
                <div className="testimonials-list">
                {latestTestimonials && latestTestimonials.length > 0 ? (
                  latestTestimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-item form-style">
                      <p className="testimonial-text">{testimonial.text}</p>
                      <p className="testimonial-rating">Rating: {testimonial.rating}</p>
                    </div>
                  ))
                ) : (
                  <p>No testimonials available.</p>
                )}
                { 
                    testimonialLoad?.text && 
                    <div key={testimonialLoad.text} className="testimonial-item form-style">
                        <p className="testimonial-text">{testimonialLoad.text}</p>
                        <p className="testimonial-rating">Rating: {testimonialLoad.rating}</p>
                    </div>
                }
              </div>
        </>
    );
};

export default TestimonialForm;
