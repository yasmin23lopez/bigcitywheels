import Badge from "@/components/Badge";
import BrandsSlider from "@/components/BrandsSlider";
import LiftKitsCatalog from "@/components/LiftKitsCatalog";

export default function LiftKitsPage() {
  return (
    <>
      <section className="pt-52 pb-20 sm:pt-60 sm:pb-28 bg-[#e8e8e8]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge>Suspension</Badge>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-gray-900">
              Lift & Level Kits
            </h2>
            <p className="mt-4 font-body text-base sm:text-lg text-gray-500 max-w-lg mx-auto">
              Select your vehicle make to see available kits. Free alignment included with every installation.
            </p>
            <div className="mt-4 w-16 h-[2px] bg-red mx-auto" />
          </div>

          <LiftKitsCatalog />
        </div>
      </section>

      <BrandsSlider />
    </>
  );
}
