"use client";

import Image from "next/image";

const brands: { name: string; logo?: string }[] = [
  { name: "BFGoodrich", logo: "/img/bfgood.svg" },
  { name: "Michelin", logo: "/img/michelin.svg" },
  { name: "Goodyear", logo: "/img/goodyear.svg" },
  { name: "Nitto" },
  { name: "Toyo" },
  { name: "Falken" },
  { name: "Cooper" },
  { name: "Fuel" },
  { name: "Moto Metal" },
  { name: "XD Series" },
  { name: "American Force" },
  { name: "Hostile" },
];

export default function BrandsSlider() {
  const items = [...brands, ...brands];

  return (
    <section className="relative py-10 sm:py-14 bg-[#050505] overflow-hidden border-y border-white/[0.04]">
      <div className="relative overflow-hidden">
        <div className="flex items-center animate-marquee-slow whitespace-nowrap">
          {items.map((brand, i) => (
            <div key={i} className="flex-shrink-0 mx-8 sm:mx-12 flex items-center justify-center" style={{ width: 140, height: 40 }}>
              {brand.logo ? (
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={140}
                  height={40}
                  className="max-h-8 w-auto max-w-[120px] object-contain opacity-40 transition-opacity duration-300 brightness-0 invert"
                />
              ) : (
                <span className="font-display text-base font-bold tracking-[0.1em] uppercase text-white/40 hover:text-white/40 transition-colors duration-300 cursor-default">
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
