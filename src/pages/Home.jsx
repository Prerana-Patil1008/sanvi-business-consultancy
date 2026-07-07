import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
// import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import TestimonialsSection from "../components/TestimonialsSection";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default Home;