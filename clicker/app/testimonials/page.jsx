import { getTestimonials } from "../actions/getTestimonials";
import Navbar from "../components/Navbar";
import TestimonialForm from "./_components/TestimonialForm";

const Testimonials = async () => {
  const testimonials = await getTestimonials(); 
  return (
    <div>
      <Navbar />
      <TestimonialForm /> 
      <div> { JSON.stringify(testimonials) } </div>
    </div>
  );
};

export default Testimonials;
