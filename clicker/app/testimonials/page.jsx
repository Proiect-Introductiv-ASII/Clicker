import { getTestimonials } from "../actions/getTestimonials";
import Navbar from "../components/Navbar";
import TestimonialForm from "./_components/TestimonialForm";

const Testimonials = async () => {
  const testimonials = await getTestimonials(); 
  return (
    <div>
      <div> { JSON.stringify(testimonials) } </div>
      <Navbar />
      <h1>Testimonials</h1>
      <p>Check out what users have to say about the game.</p>
      <TestimonialForm /> 
    </div>
  );
};

export default Testimonials;
