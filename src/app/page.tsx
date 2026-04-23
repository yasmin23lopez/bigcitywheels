import Hero from "@/components/Hero";
import Services from "@/components/Services";
import VideoSection from "@/components/VideoSection";
import GrandOpening from "@/components/GrandOpening";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import ClosingSection from "@/components/ClosingSection";
import StairTransition from "@/components/StairTransition";
import BrandsSlider from "@/components/BrandsSlider";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandsSlider />
      <StairTransition />
      <Services />
      <VideoSection />
      <GrandOpening />
      <Testimonials />
      <FAQ />
      <Contact />
      <ClosingSection />
      <BrandsSlider />
    </>
  );
}
