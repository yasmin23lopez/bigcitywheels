import Contact from "@/components/Contact";
import BrandsSlider from "@/components/BrandsSlider";
import { getSiteSettings } from "@/sanity/queries";

export default async function ContactPage() {
  const settings = await getSiteSettings().catch(() => null);
  return (
    <>
      <div className="pt-28 sm:pt-32">
        <Contact settings={settings} />
      </div>
      <BrandsSlider />
    </>
  );
}
