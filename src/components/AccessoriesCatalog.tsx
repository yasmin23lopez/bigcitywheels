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

interface Category {
  name: string;
  products: Product[];
}

const categories: Category[] = [
  {
    name: "Wheel Weights",
    products: [
      { partNumber: "PA-TW-1448S", description: "Stick On Wheel Weight 1/4 oz 48S Box — Silver", price: 18.00, image: "/img/products/accessories/PA-TW-1448S.jpg" },
      { partNumber: "PA-TW-1448B", description: "Stick On Wheel Weight 1/4 oz 48-S Box — Black", price: 19.00, image: "/img/products/accessories/PA-TW-1448B.jpg" },
    ],
  },
];

export default function AccessoriesCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].name);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const { addItem } = useQuoteCart();

  return (
    <div>
      {/* Category tabs + Content unified */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded overflow-hidden">
        {/* Category tabs */}
        <div className="flex border-b border-white/[0.06] overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex-1 min-w-[140px] flex flex-col items-center justify-center gap-1 px-6 py-5 transition-all duration-200 relative ${
                activeCategory === cat.name
                  ? "bg-white/[0.08]"
                  : "hover:bg-white/[0.05]"
              }`}
            >
              {activeCategory === cat.name && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-red" />
              )}
              <span className={`font-display text-sm sm:text-base font-bold uppercase tracking-wider transition-colors ${
                activeCategory === cat.name ? "text-white" : "text-white/50"
              }`}>
                {cat.name}
              </span>
              <span className={`font-condensed text-sm font-normal tracking-[0.12em] uppercase transition-colors ${
                activeCategory === cat.name ? "text-white/80" : "text-white/40"
              }`}>
                {cat.products.length} {cat.products.length === 1 ? "product" : "products"}
              </span>
            </button>
          ))}
        </div>

        {/* Products content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
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
                    {activeCategory}
                  </h3>
                  <Badge>{categories.find(c => c.name === activeCategory)?.products.length} items</Badge>
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
                {categories
                  .find((c) => c.name === activeCategory)
                  ?.products.map((product) => (
                    <div
                      key={product.partNumber}
                      className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {product.image ? (
                          <div
                            className="w-24 h-24 flex-shrink-0 rounded overflow-hidden group/img cursor-zoom-in relative"
                            onClick={() => setLightboxImage(product.image!)}
                          >
                            <img
                              src={product.image}
                              alt={product.description}
                              className="w-full h-full object-contain transition-transform duration-300 group-hover/img:scale-110"
                            />
                          </div>
                        ) : (
                          <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded overflow-hidden flex items-center justify-center">
                            <img
                              src="/logo.png"
                              alt="Big City Wheels & Tires"
                              className="w-14 h-14 object-contain opacity-20"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-body text-base font-bold text-gray-800">
                            {product.description}
                          </p>
                          <p className="font-condensed text-xs tracking-[0.15em] uppercase text-gray-500 mt-1">
                            Part# {product.partNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Price hidden - data preserved */}
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => {
                              const input = document.getElementById(`qty-acc-${product.partNumber}`) as HTMLInputElement;
                              if (input && parseInt(input.value) > 1) input.value = String(parseInt(input.value) - 1);
                            }}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-sm"
                          >−</button>
                          <input
                            id={`qty-acc-${product.partNumber}`}
                            type="number"
                            defaultValue="1"
                            min="1"
                            className="w-10 h-8 text-center text-sm font-bold text-gray-800 border-x border-gray-200 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button
                            onClick={() => {
                              const input = document.getElementById(`qty-acc-${product.partNumber}`) as HTMLInputElement;
                              if (input) input.value = String(parseInt(input.value) + 1);
                            }}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-sm"
                          >+</button>
                        </div>
                        <button
                          onClick={() => {
                            const input = document.getElementById(`qty-acc-${product.partNumber}`) as HTMLInputElement;
                            const qty = input ? parseInt(input.value) || 1 : 1;
                            addItem({ part: product.partNumber, desc: product.description, price: `$${product.price.toFixed(2)}`, image: product.image || null, brand: "Accessories" }, qty);
                          }}
                          className="px-4 py-2 text-xs font-bold text-white bg-red hover:bg-red-dark rounded-lg transition-colors uppercase tracking-wider"
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
                  Prices subject to change. Contact us for current availability.
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <p className="font-body text-base text-white/40 mb-6">
          Need something specific? We can source most accessories.
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
