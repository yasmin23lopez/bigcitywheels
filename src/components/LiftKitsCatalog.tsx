"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "@/components/Badge";
import TireIcon from "@/components/TireIcon";
import { useQuoteCart } from "@/components/QuoteCartContext";

interface Product {
  partNumber: string;
  description: string;
  price: number;
  image?: string;
}

interface Make {
  name: string;
  image: string;
  products: Product[];
}

const makes: Make[] = [
  {
    name: "Chevy / GMC",
    image: "/img/logos/chevy.svg",
    products: [
      { partNumber: "760776-A", description: "GMC/Chevy 5-8 Front Shocks", price: 227.46 },
      { partNumber: "1237BOX5", description: "Steel Control Arm Knuckle 14-18 GMC/Chevy 1500", price: 310.97 },
      { partNumber: "25530RC", description: "1977-87 Chevy C20-K20-K25-C25 4 Inch Lift 56in RR Springs", price: 640.00 },
    ],
  },
  {
    name: "Dodge",
    image: "/img/logos/dodge-black-logo.svg",
    products: [
      { partNumber: "RT10-2295HH18EGZ", description: "22x9.5 Dodge Replica Wheels RT10 5x115 Gloss Bronze +18ET", price: 175.00, image: "/img/products/dodge/RT10-2295HH18EGZ.jpg" },
      { partNumber: "RT13-2095HH18ECH", description: "20x9.5 Dodge Replica RT13 5x115 Chrome +18ET", price: 230.00, image: "/img/products/dodge/RT13-2095HH18ECH.jpg" },
      { partNumber: "RT13-2011HH-2ECH", description: "20x11 Dodge Replica RT13 5x115 Chrome -2ET", price: 245.00, image: "/img/products/dodge/RT13-2011HH-2ECH.jpg" },
      { partNumber: "RT1-2295HH18ECH", description: "22x9.5 Dodge Replica Wheels RT1 5x115 Chrome +18ET", price: 275.00, image: "/img/products/dodge/RT1-2295HH18ECH.jpg" },
      { partNumber: "RT1-2215HH27ECH", description: "22x10.5 Dodge Replica Wheels RT1 5x115 Chrome +27ET", price: 275.00, image: "/img/products/dodge/RT1-2215HH27ECH.jpg" },
    ],
  },
  {
    name: "Ford",
    image: "/img/logos/ford-1.svg",
    products: [
      { partNumber: "1018RC", description: "Ford 1980-96 Bronco 4WD 4-6in Sway Bar Drop Brackets", price: 49.99 },
      { partNumber: "50108", description: "1998-2011 Ford Ranger 4WD 1.5 Inch Level Kit", price: 70.00 },
      { partNumber: "FD02022956135GB", description: "22x9.5 Ford Replica Wheels FD020 6x135 Gloss Black +44ET", price: 225.00, image: "/img/products/ford/FD02022956135GB.jpg" },
      { partNumber: "FD02024106135GB", description: "24x10 Ford Replica Wheels FD020 6x135 Gloss Black +40ET", price: 295.00, image: "/img/products/ford/FD02024106135GB.jpg" },
      { partNumber: "FD02022956135C", description: "22x9.5 Ford Replica Wheels FD020 6x135 Chrome +44ET", price: 320.00, image: "/img/products/ford/FD02022956135C.jpg" },
      { partNumber: "FD02024106135C", description: "24x10 Ford Replica Wheels FD020 6x135 Chrome +40ET", price: 350.00, image: "/img/products/ford/FD02024106135C.jpg" },
      { partNumber: "46730", description: "1980-1996 Ford F-150 2WD 4in Lift Kit", price: 605.00 },
      { partNumber: "594.20RC", description: "2008-2010 Ford Super Duty 6 Inch Lift Kit", price: 840.00 },
      { partNumber: "41100", description: "2021-22 Ford Bronco 4WD 5 Inch Lift", price: 1060.00 },
      { partNumber: "22825AF-NOTCH", description: "22x8.25 American Force Notch Dually 8x165 8x170 8x200 8x210 All Polish / Adapter", price: 1100.00, image: "/img/products/ford/22825AF-NOTCH.jpg" },
      { partNumber: "51083", description: "2021-22 Ford Bronco 4WD 7 Inch Lift", price: 1130.00 },
    ],
  },
  {
    name: "Jeep",
    image: "/img/logos/jeep-7.svg",
    products: [
      { partNumber: "85120[AA]", description: "2 PC Mesh Top Black JLU Jeep", price: 85.00 },
      { partNumber: "11910", description: "Jeep TJ/ZJ 4WD Rear Adjustable Arms", price: 330.00 },
      { partNumber: "646.20", description: "Jeep 97-06 TJ 4WD 3.75in Combo System", price: 465.00 },
    ],
  },
  {
    name: "Nissan",
    image: "/img/logos/nissan-next-logo.svg",
    products: [
      { partNumber: "867RED", description: "05-24 Nissan Frontier / 05-15 Xterra 2.5 Inch Level Kit", price: 150.00 },
    ],
  },
];

export default function LiftKitsCatalog() {
  const [activeMake, setActiveMake] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const { addItem } = useQuoteCart();

  return (
    <div>
      {/* Make cards + Content unified */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded overflow-hidden">
        {/* Make cards row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-b border-white/[0.06]">
          {makes.map((make) => (
            <button
              key={make.name}
              onClick={() => setActiveMake(activeMake === make.name ? null : make.name)}
              className={`group relative overflow-hidden aspect-[4/3] transition-all duration-300 border-r border-white/[0.06] last:border-r-0 ${
                activeMake === make.name
                  ? "bg-white/[0.08]"
                  : "hover:bg-white/[0.05]"
              }`}
            >
              {/* Active indicator */}
              {activeMake === make.name && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-red" />
              )}
              {/* Logo */}
              <div className="h-full flex flex-col items-center justify-center px-4 gap-3">
                <img
                  src={make.image}
                  alt={make.name}
                  className={`object-contain brightness-0 invert transition-opacity duration-300 ${
                    activeMake === make.name ? "opacity-100" : "opacity-60 group-hover:opacity-100"
                  } ${
                    make.name === "Nissan" ? "w-16 h-16 sm:w-20 sm:h-20" :
                    make.name === "Jeep" ? "w-18 h-18 sm:w-22 sm:h-22" :
                    make.name === "Ford" ? "w-18 h-18 sm:w-22 sm:h-22" :
                    "w-24 h-14 sm:w-28 sm:h-16"
                  }`}
                />
                <span className={`font-condensed text-sm font-normal tracking-[0.12em] uppercase transition-colors ${
                  activeMake === make.name ? "text-white/80" : "text-white/40 group-hover:text-white/70"
                }`}>
                  {make.products.length} {make.products.length === 1 ? "product" : "products"}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Products content */}
        <AnimatePresence mode="wait">
          {activeMake ? (
            <motion.div
              key={activeMake}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white">
                {/* Table header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-gray-900">
                      {activeMake}
                    </h3>
                    <Badge>{makes.find(m => m.name === activeMake)?.products.length} items</Badge>
                  </div>
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 bg-red hover:bg-red-dark text-white font-condensed font-semibold text-xs tracking-[0.15em] uppercase px-5 py-2.5 transition-all duration-300"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
                    }}
                  >
                    Get a Quote
                    <TireIcon className="w-3.5 h-3.5 transition-transform duration-1000 group-hover:rotate-[360deg]" />
                  </a>
                </div>

                {/* Products list */}
                <div className="divide-y divide-gray-100">
                  {makes
                    .find((m) => m.name === activeMake)
                    ?.products.map((product) => (
                      <div
                        key={product.partNumber}
                        className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          {product.image ? (
                            <div
                              className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden group/img cursor-zoom-in relative"
                              onClick={() => setLightboxImage(product.image!)}
                            >
                              <img
                                src={product.image}
                                alt={product.description}
                                className="w-full h-full object-contain transition-transform duration-300 group-hover/img:scale-110"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center">
                              <img
                                src="/logo.png"
                                alt="Big City Wheels & Tires"
                                className="w-10 sm:w-14 h-10 sm:h-14 object-contain opacity-20"
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-body text-sm sm:text-base font-bold text-gray-800 break-words">
                              {product.description}
                            </p>
                            <p className="font-condensed text-xs tracking-[0.15em] uppercase text-gray-500 mt-1">
                              Part# {product.partNumber}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                          <span className="font-display text-lg font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                          </span>
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => {
                                const input = document.getElementById(`qty-lift-${product.partNumber}`) as HTMLInputElement;
                                if (input && parseInt(input.value) > 1) input.value = String(parseInt(input.value) - 1);
                              }}
                              className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-sm"
                            >−</button>
                            <input
                              id={`qty-lift-${product.partNumber}`}
                              type="number"
                              defaultValue="1"
                              min="1"
                              className="w-10 h-9 sm:h-8 text-center text-sm font-bold text-gray-800 border-x border-gray-200 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                              onClick={() => {
                                const input = document.getElementById(`qty-lift-${product.partNumber}`) as HTMLInputElement;
                                if (input) input.value = String(parseInt(input.value) + 1);
                              }}
                              className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-sm"
                            >+</button>
                          </div>
                          <button
                            onClick={() => {
                              const input = document.getElementById(`qty-lift-${product.partNumber}`) as HTMLInputElement;
                              const qty = input ? parseInt(input.value) || 1 : 1;
                              addItem({ part: product.partNumber, desc: product.description, price: `$${product.price.toFixed(2)}`, image: product.image || null, brand: activeMake! }, qty);
                            }}
                            className="px-3 sm:px-4 py-2 min-h-[36px] text-xs font-bold text-white bg-red hover:bg-red-dark rounded-lg transition-colors uppercase tracking-wider whitespace-nowrap"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Note */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <p className="font-body text-sm text-gray-400 text-center">
                    Prices subject to change. Contact us for current availability and installation pricing.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="font-body text-base text-white/40">
                Select a make above to browse available kits
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      {!activeMake && (
        <div className="mt-12 text-center">
          <p className="font-body text-base text-white/40 mb-6">
            Don&apos;t see your vehicle? Call us — we can source kits for most trucks and SUVs.
          </p>
          <a
            href="tel:7135615519"
            className="group inline-flex items-center gap-2 bg-red hover:bg-red-dark text-white font-condensed font-semibold text-sm tracking-[0.2em] uppercase px-10 py-4 transition-all duration-300"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
            }}
          >
            Call (713) 561-5519
            <TireIcon className="w-4 h-4 transition-transform duration-1000 group-hover:rotate-[360deg]" />
          </a>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setLightboxImage(null)}
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={lightboxImage}
              alt="Product"
              className="max-w-[90vw] max-h-[90vh] object-contain bg-white rounded-lg p-4"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
