"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "@/components/Badge";
import TireIcon from "@/components/TireIcon";
import { useQuoteCart } from "@/components/QuoteCartContext";

interface Product {
  name: string;
  brand: string;
  code: string;
  sku: string;
  image: string | null;
}

type Catalog = Record<string, Product[]>;

const categoryIcons: Record<string, React.ReactNode> = {
  "1-2 Inch Lift Kits": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 19V5M8 9l4-4 4 4" />
    </svg>
  ),
  "3-5 Inch Lift Kits": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 19V5M8 9l4-4 4 4M5 19h14" />
    </svg>
  ),
  "6-8 Inch Lift Kits": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 21V3M8 7l4-4 4 4M5 21h14M7 17h10" />
    </svg>
  ),
  "Leveling Kits": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M4 12h16M8 8h8M6 16h12" />
    </svg>
  ),
};

export default function LiftKitsCatalog() {
  const [catalog, setCatalog] = useState<Catalog>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const { addItem } = useQuoteCart();

  useEffect(() => {
    fetch("/data/lift-kits.json")
      .then((r) => r.json())
      .then((data) => {
        const clean: Catalog = {};
        Object.keys(data).forEach((k) => {
          if (data[k].length > 0) clean[k] = data[k];
        });
        setCatalog(clean);
      });
  }, []);

  const categories = Object.keys(catalog);

  const filterOptions = useMemo(() => {
    if (!activeCategory || !catalog[activeCategory]) return { brands: [] };
    const brands = new Set<string>();
    catalog[activeCategory].forEach((p) => { if (p.brand) brands.add(p.brand); });
    return { brands: Array.from(brands).sort() };
  }, [activeCategory, catalog]);

  const filteredProducts = useMemo(() => {
    if (!activeCategory || !catalog[activeCategory]) return [];
    let products = catalog[activeCategory];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      products = products.filter((p) => p.name.toLowerCase().includes(term) || p.brand.toLowerCase().includes(term));
    }
    if (brandFilter) {
      products = products.filter((p) => p.brand === brandFilter);
    }
    return products;
  }, [activeCategory, catalog, searchTerm, brandFilter]);

  const clearFilters = () => { setSearchTerm(""); setBrandFilter(""); };

  return (
    <div>
      {/* Category row with icons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); clearFilters(); }}
            className={`flex items-center gap-3 px-5 py-4 font-condensed text-xs sm:text-sm tracking-[0.05em] uppercase transition-all duration-200 border ${
              activeCategory === cat
                ? "bg-red text-white border-red font-bold"
                : "bg-white text-gray-600 border-gray-200 hover:border-red/40 hover:text-gray-900 shadow-sm"
            }`}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}
          >
            <span className={activeCategory === cat ? "text-white" : "text-red"}>
              {categoryIcons[cat] || categoryIcons["Leveling Kits"]}
            </span>
            <span className="text-left">
              {cat}
              <span className="block text-[10px] font-normal opacity-60">{catalog[cat]?.length} products</span>
            </span>
          </button>
        ))}
      </div>

      {/* Products panel */}
      <AnimatePresence mode="wait">
        {activeCategory && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded overflow-hidden border border-gray-200">
              {/* Filters */}
              <div className="px-6 py-4 border-b border-gray-200 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-xl font-bold uppercase tracking-wider text-gray-900">{activeCategory}</h3>
                    <Badge>{filteredProducts.length} items</Badge>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative flex-shrink-0">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-4 py-2.5 pl-9 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red/50 w-44 min-h-[44px]"
                    />
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  {filterOptions.brands.length > 1 && (
                    <select
                      value={brandFilter}
                      onChange={(e) => setBrandFilter(e.target.value)}
                      className="px-4 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red/50 appearance-none cursor-pointer min-h-[44px]"
                    >
                      <option value="">All Brands</option>
                      {filterOptions.brands.map((b) => (<option key={b} value={b}>{b}</option>))}
                    </select>
                  )}
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden ml-auto flex-shrink-0">
                    <button onClick={() => setViewMode("list")} className={`px-3 py-2.5 min-h-[44px] ${viewMode === "list" ? "bg-red text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <button onClick={() => setViewMode("grid")} className={`px-3 py-2.5 min-h-[44px] ${viewMode === "grid" ? "bg-red text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>
                    </button>
                  </div>
                  {(searchTerm || brandFilter) && (
                    <button onClick={clearFilters} className="px-4 py-2.5 text-xs font-bold text-red hover:text-red-dark uppercase tracking-wider bg-red/5 rounded-lg border border-red/20 min-h-[44px]">✕ Clear</button>
                  )}
                </div>
              </div>

              {/* Products */}
              <div className={viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4"
                : "divide-y divide-gray-100"
              }>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, i) => (
                    viewMode === "grid" ? (
                      <div key={`${product.code}-${i}`} className="flex flex-col items-center text-center p-3 border border-gray-100 rounded-lg hover:border-red/20 transition-colors">
                        {product.image ? (
                          <div className="w-full aspect-square rounded-lg overflow-hidden cursor-zoom-in mb-2" onClick={() => setLightboxImage(product.image)}>
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; (e.target as HTMLImageElement).parentElement!.innerHTML='<img src="/logo.png" alt="" class="w-14 h-14 opacity-20 m-auto" />'; }} />
                          </div>
                        ) : (
                          <div className="w-full aspect-square rounded-lg flex items-center justify-center mb-2">
                            <img src="/logo.png" alt="" className="w-14 h-14 opacity-15" />
                          </div>
                        )}
                        <p className="font-body text-xs font-bold text-gray-800 line-clamp-2 mb-1">{product.name}</p>
                        <p className="font-condensed text-[10px] tracking-[0.1em] uppercase text-gray-400 mb-2">{product.brand}</p>
                        <div className="flex items-center gap-1 mt-auto">
                          <div className="flex items-center border border-gray-200 rounded overflow-hidden">
                            <button onClick={() => { const el = document.getElementById(`lk-${product.code}-${i}`) as HTMLInputElement; if(el && parseInt(el.value)>1) el.value=String(parseInt(el.value)-1); }} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-xs">−</button>
                            <input id={`lk-${product.code}-${i}`} type="number" defaultValue="1" min="1" className="w-7 h-6 text-center text-xs font-bold text-gray-800 border-x border-gray-200 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            <button onClick={() => { const el = document.getElementById(`lk-${product.code}-${i}`) as HTMLInputElement; if(el) el.value=String(parseInt(el.value)+1); }} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-xs">+</button>
                          </div>
                          <button onClick={() => { const el = document.getElementById(`lk-${product.code}-${i}`) as HTMLInputElement; addItem({ part: product.code, desc: product.name, price: '', image: product.image, brand: product.brand }, el ? parseInt(el.value)||1 : 1); }} className="px-2 py-1 text-[10px] font-bold text-white bg-red hover:bg-red-dark rounded transition-colors uppercase">Add</button>
                        </div>
                      </div>
                    ) : (
                      <div key={`${product.code}-${i}`} className="px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                          {product.image ? (
                            <div className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-zoom-in" onClick={() => setLightboxImage(product.image)}>
                              <img src={product.image} alt={product.name} className="w-full h-full object-contain" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; (e.target as HTMLImageElement).parentElement!.innerHTML='<img src="/logo.png" alt="" class="w-14 h-14 opacity-20 m-auto" />'; }} />
                            </div>
                          ) : (
                            <div className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg flex items-center justify-center">
                              <img src="/logo.png" alt="" className="w-10 sm:w-14 h-10 sm:h-14 opacity-20" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-body text-sm sm:text-base font-bold text-gray-800 truncate">{product.name}</p>
                            <p className="font-condensed text-xs tracking-[0.15em] uppercase text-gray-500 mt-1">{product.brand}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-auto sm:ml-0">
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button onClick={() => { const el = document.getElementById(`lkl-${product.code}-${i}`) as HTMLInputElement; if(el && parseInt(el.value)>1) el.value=String(parseInt(el.value)-1); }} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-sm">−</button>
                            <input id={`lkl-${product.code}-${i}`} type="number" defaultValue="1" min="1" className="w-10 h-8 text-center text-sm font-bold text-gray-800 border-x border-gray-200 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            <button onClick={() => { const el = document.getElementById(`lkl-${product.code}-${i}`) as HTMLInputElement; if(el) el.value=String(parseInt(el.value)+1); }} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-sm">+</button>
                          </div>
                          <button onClick={() => { const el = document.getElementById(`lkl-${product.code}-${i}`) as HTMLInputElement; addItem({ part: product.code, desc: product.name, price: '', image: product.image, brand: product.brand }, el ? parseInt(el.value)||1 : 1); }} className="px-4 py-2 text-xs font-bold text-white bg-red hover:bg-red-dark rounded-lg transition-colors uppercase whitespace-nowrap">Add</button>
                        </div>
                      </div>
                    )
                  ))
                ) : (
                  <div className="col-span-full px-6 py-12 text-center">
                    <p className="text-gray-400">No products match your filters.</p>
                    <button onClick={clearFilters} className="mt-2 text-red text-sm font-bold uppercase">Clear Filters</button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!activeCategory && (
        <div className="text-center py-12">
          <p className="font-body text-base text-gray-400">Select a category above to browse lift kits</p>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer" onClick={() => setLightboxImage(null)}>
            <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} src={lightboxImage} alt="Product" className="max-w-[90vw] max-h-[90vh] object-contain bg-white rounded-lg p-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
