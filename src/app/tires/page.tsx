import PageHeader from "@/components/PageHeader";
import Badge from "@/components/Badge";
import Link from "next/link";

const categories = [
  { name: "All-Terrain", description: "Built for adventure on and off the road.", count: "50+ options" },
  { name: "Mud-Terrain", description: "Aggressive tread for serious off-road grip.", count: "30+ options" },
  { name: "Highway", description: "Smooth, quiet ride for daily driving.", count: "40+ options" },
  { name: "All-Season", description: "Year-round performance in any condition.", count: "45+ options" },
  { name: "Performance", description: "Maximum grip and handling at speed.", count: "25+ options" },
];

const brands = [
  "BFGoodrich", "Nitto", "Toyo", "Falken", "Cooper",
  "Michelin", "Goodyear", "Hankook", "Yokohama", "Continental",
];

export default function TiresPage() {
  return (
    <>
      <PageHeader
        badge="Tires"
        title="Find Your Tires"
        subtitle="Top brands, all categories. We'll help you find the perfect tire for your vehicle and driving style."
        image="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1400&q=80&fit=crop"
      />

      <section className="py-20 sm:py-28 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge>By Category</Badge>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <div
                key={cat.name}
                className="group bg-white/[0.02] border border-white/[0.06] hover:border-red/30 p-8 transition-all duration-300 hover:bg-white/[0.04] cursor-pointer"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
                }}
              >
                <p className="font-condensed text-[10px] tracking-[0.3em] uppercase text-white/20 mb-3">{cat.count}</p>
                <h3 className="font-display text-xl font-bold uppercase tracking-wider group-hover:text-red transition-colors mb-2">
                  {cat.name}
                </h3>
                <p className="font-body text-base text-white/40">{cat.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <Badge>Brands We Carry</Badge>
            <div className="mt-8 flex flex-wrap gap-3">
              {brands.map((brand) => (
                <span
                  key={brand}
                  className="font-condensed text-sm tracking-[0.15em] uppercase text-white/30 bg-white/[0.04] px-5 py-3 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
                  }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="font-body text-base text-white/40 mb-6">
              Not sure which tire is right for you? We&apos;ll help you find the perfect match.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-red hover:bg-red-dark text-white font-condensed font-semibold text-sm tracking-[0.2em] uppercase px-10 py-4 transition-all duration-300"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
              }}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
