import PageHeader from "@/components/PageHeader";
import Badge from "@/components/Badge";
import Link from "next/link";

const styles = [
  { name: "Off-Road", description: "Rugged wheels built for trails and mud.", count: "40+ options" },
  { name: "Street / Sport", description: "Clean lines and aggressive fitment.", count: "35+ options" },
  { name: "Classic / Chrome", description: "Timeless looks with a mirror finish.", count: "20+ options" },
  { name: "Matte & Black", description: "Murdered-out style for a bold statement.", count: "30+ options" },
];

const sizes = ['17"–18"', '20"–22"', '24"+'];

const brands = [
  "Fuel", "Moto Metal", "XD Series", "American Force",
  "Hostile", "TIS", "Anthem", "Vision",
];

export default function WheelsPage() {
  return (
    <>
      <PageHeader
        badge="Wheels"
        title="Custom Wheels"
        subtitle="From off-road beasts to street style — find the perfect rims for your ride."
        image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80&fit=crop"
      />

      <section className="py-20 sm:py-28 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge>By Style</Badge>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {styles.map((style, i) => (
              <div
                key={style.name}
                className="group bg-white/[0.02] border border-white/[0.06] hover:border-red/30 p-8 transition-all duration-300 hover:bg-white/[0.04] cursor-pointer"
                style={{
                  clipPath: i % 2 === 0
                    ? "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)"
                    : "polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)",
                }}
              >
                <p className="font-condensed text-[10px] tracking-[0.3em] uppercase text-white/20 mb-3">{style.count}</p>
                <h3 className="font-display text-xl font-bold uppercase tracking-wider group-hover:text-red transition-colors mb-2">
                  {style.name}
                </h3>
                <p className="font-body text-base text-white/40">{style.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Badge>By Size</Badge>
            <div className="mt-8 flex gap-4">
              {sizes.map((size) => (
                <span
                  key={size}
                  className="font-display text-2xl sm:text-3xl font-bold uppercase text-white/20 hover:text-red bg-white/[0.03] px-8 py-6 transition-all cursor-pointer hover:bg-white/[0.06]"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                  }}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-16">
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
              Need help choosing the right wheels? We&apos;ll find the perfect fit.
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
