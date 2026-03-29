import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import WhySection from "@/components/sections/WhySection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CoverageSection from "@/components/sections/CoverageSection";
import PilarSection from "@/components/sections/PilarSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustBar />
      <WhySection />
      <ServicesSection />
      <ProcessSection />
      <CoverageSection />
      <PilarSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
}
