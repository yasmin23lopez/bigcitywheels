import FAQ from "@/components/FAQ";
import BrandsSlider from "@/components/BrandsSlider";
import { getFaqs } from "@/sanity/queries";

export default async function FAQPage() {
  const faqs = await getFaqs().catch(() => null);
  return (
    <>
      <FAQ faqs={faqs} />
      <BrandsSlider />
    </>
  );
}
