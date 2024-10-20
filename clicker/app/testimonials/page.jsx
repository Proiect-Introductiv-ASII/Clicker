import Navbar from "../components/Navbar";
import TestimonialForm from "./_components/TestimonialForm";

const Testimonials = () => {
  return (
    <div>
      <Navbar />
      <h1>Testimonials</h1>
      <p>Check out what users have to say about the game.</p>
      <TestimonialForm /> 
    </div>
  );
};

export default Testimonials;
