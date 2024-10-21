import { getTestimonials } from "../actions/getTestimonials";
import Navbar from "../components/Navbar";
import TestimonialForm from "./_components/TestimonialForm";

const Testimonials = async () => {
  const testimonials = await getTestimonials();
  const latestTestimonials = testimonials.slice(-4);
  
  return (
    <div>
      <Navbar />
      <div className="testimonials-page">
        <TestimonialForm />
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
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
