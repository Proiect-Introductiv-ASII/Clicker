import { getTestimonials } from "../actions/getTestimonials";
import Navbar from "../components/Navbar";
import TestimonialForm from "./_components/TestimonialForm";

const Testimonials = async () => {
  const testimonials = await getTestimonials();
  const latestTestimonials = testimonials.slice(-6);

  return (
    <div>
      <Navbar />
      <div className="testimonials-page">
        <TestimonialForm testimonials={JSON.stringify(latestTestimonials)} />
      </div>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default Testimonials;
