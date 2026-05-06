"use client";

import Image from "next/image";

const brands: { name: string; logos?: string[]; logo?: string }[] = [
  { name: "Chevy / GMC", logos: ["/img/logos/chevy.svg", "/img/logos/gmc-1.svg"] },
  { name: "Dodge", logo: "/img/logos/dodge-black-logo.svg" },
  { name: "Ford", logo: "/img/logos/ford-1.svg" },
  { name: "Jeep", logo: "/img/logos/jeep-7.svg" },
  { name: "Nissan", logo: "/img/logos/nissan-next-logo.svg" },
  { name: "Toyota", logo: "/img/logos/toyota-car-logo.svg" },
  { name: "BFGoodrich", logo: "/img/bfgood.svg" },
  { name: "Michelin", logo: "/img/michelin.svg" },
  { name: "Goodyear", logo: "/img/goodyear.svg" },
];

export default function BrandsSlider() {
  // Triple the items for seamless infinite loop
  const items = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="relative py-10 sm:py-14 bg-[#050505] overflow-hidden border-y border-white/[0.04]">
      <div className="relative overflow-hidden">
        <div className="flex items-center animate-marquee-slow whitespace-nowrap">
          {items.map((brand, i) => (
            <div key={i} className="flex-shrink-0 mx-6 sm:mx-12 flex items-center justify-center gap-2 sm:gap-3" style={{ minWidth: brand.logos ? 150 : 120, height: 40 }}>
              {brand.logos ? (
                brand.logos.map((src, j) => (
                  <Image
                    key={j}
                    src={src}
                    alt={brand.name}
                    width={140}
                    height={40}
                    className="max-h-6 sm:max-h-7 w-auto max-w-[60px] sm:max-w-[80px] object-contain opacity-40 transition-opacity duration-300 brightness-0 invert"
                  />
                ))
              ) : (
                <Image
                  src={brand.logo!}
                  alt={brand.name}
                  width={140}
                  height={40}
                  className={`w-auto object-contain opacity-40 transition-opacity duration-300 brightness-0 invert ${
                    brand.name === "Nissan" || brand.name === "Ford" ? "max-h-10 max-w-[100px]" :
                    brand.name === "Jeep" ? "max-h-7 max-w-[90px]" :
                    "max-h-8 max-w-[120px]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
