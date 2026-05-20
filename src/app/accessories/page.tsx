import Badge from "@/components/Badge";
import BrandsSlider from "@/components/BrandsSlider";
import AccessoriesCatalog from "@/components/AccessoriesCatalog";

export default function AccessoriesPage() {
  return (
    <>
      <section className="pt-52 pb-20 sm:pt-60 sm:pb-28 bg-[#e8e8e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge>Shop</Badge>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
              Accessories
            </h2>
            <p className="mt-4 font-body text-base sm:text-lg text-white/40 max-w-lg mx-auto">
              Wheel weights, lug nuts, spacers, and everything else to complete your setup.
            </p>
            <div className="mt-4 w-16 h-[2px] bg-red mx-auto" />
          </div>

          <AccessoriesCatalog />
        </div>
      </section>

      <BrandsSlider />
    </>
  );
}
