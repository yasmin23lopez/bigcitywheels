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
import { getSiteSettings, getReviews, getFaqs, getPromos } from "@/sanity/queries";

export default async function Home() {
  const [settings, reviews, faqs, promos] = await Promise.all([
    getSiteSettings().catch(() => null),
    getReviews().catch(() => null),
    getFaqs().catch(() => null),
    getPromos().catch(() => null),
  ]);

  return (
    <>
      <Hero promos={promos} />
      <BrandsSlider />
      <StairTransition />
      <Services />
      <VideoSection />
      <GrandOpening promos={promos} />
      <Testimonials reviews={reviews} />
      <FAQ faqs={faqs} />
      <Contact settings={settings} />
      <ClosingSection />
      <BrandsSlider />
    </>
  );
}
