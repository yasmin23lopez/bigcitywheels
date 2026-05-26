"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "@/components/Badge";
import TireIcon from "@/components/TireIcon";
import { useQuoteCart } from "@/components/QuoteCartContext";

interface Product {
  part: string;
  desc: string;
  price: string;
  image: string | null;
}

type Catalog = Record<string, Product[]>;

function parseTireSize(desc: string): string | null {
  // Match patterns like 205/55R16, 275/60R20, 33X12.50R20, etc.
  const match = desc.match(/(\d{2,3}\/\d{2,3}R\d{2}|\d{2,3}X[\d.]+R\d{2}|R(\d{2}))/i);
  if (match) {
    const rimMatch = desc.match(/R(\d{2})/i);
    return rimMatch ? `R${rimMatch[1]}` : null;
  }
  return null;
}

function parseTireType(desc: string): string | null {
  const d = desc.toUpperCase();
  if (d.includes("MUD") || d.includes("M/T")) return "Mud-Terrain";
  if (d.includes("ALL TERRAIN") || d.includes("A/T") || d.includes("AT ")) return "All-Terrain";
  if (d.includes("HIGHWAY") || d.includes("H/T") || d.includes("HT ")) return "Highway";
  if (d.includes("TRAILER") || d.includes("ST ") || d.includes("ST2")) return "Trailer";
  return null;
}

const ITEMS_PER_PAGE = 20;

export default function TiresCatalog({ hiddenProducts = [], customProducts = [] }: { hiddenProducts?: any[]; customProducts?: any[] }) {
  const [catalog, setCatalog] = useState<Catalog>({});
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { addItem } = useQuoteCart();

  useEffect(() => {
    fetch("/data/tires-catalog.json")
      .then((r) => r.json())
      .then((data: Catalog) => {
        if (hiddenProducts.length > 0) {
          Object.keys(data).forEach(brand => {
            data[brand] = data[brand].filter(p => !hiddenProducts.some((h) => (h.partNumber && p.part === h.partNumber) || (h.name && p.desc && p.desc.toLowerCase().includes(h.name.toLowerCase()))));
          });
        }
        if (customProducts.length > 0) {
          customProducts.forEach((cp: any) => {
            const brand = cp.subcategory || cp.brand || "Other";
            if (!data[brand]) data[brand] = [];
            data[brand].push({ part: cp.partNumber, desc: cp.name, price: "", image: cp.imageUrl || null });
          });
        }
        setCatalog(data);
        const brandParam = searchParams.get("brand");
        if (brandParam) {
          const match = Object.keys(data).find(
            (b) => b.toLowerCase() === brandParam.toLowerCase()
          );
          if (match) setActiveBrand(match);
        }
      });
  }, [searchParams, hiddenProducts, customProducts]);

  const brands = Object.keys(catalog);

  const filterOptions = useMemo(() => {
    if (!activeBrand || !catalog[activeBrand]) return { sizes: [], types: [] };
    const products = catalog[activeBrand];
    const sizes = new Set<string>();
    const types = new Set<string>();
    products.forEach((p) => {
      const s = parseTireSize(p.desc);
      const t = parseTireType(p.desc);
      if (s) sizes.add(s);
      if (t) types.add(t);
    });
    return {
      sizes: Array.from(sizes).sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1))),
      types: Array.from(types).sort(),
    };
  }, [activeBrand, catalog]);

  const filteredProducts = useMemo(() => {
    if (!activeBrand || !catalog[activeBrand]) return [];
    let products = catalog[activeBrand];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      products = products.filter(
        (p) => p.desc.toLowerCase().includes(term) || p.part.toLowerCase().includes(term)
      );
    }
    if (sizeFilter) {
      products = products.filter((p) => parseTireSize(p.desc) === sizeFilter);
    }
    if (typeFilter) {
      products = products.filter((p) => parseTireType(p.desc) === typeFilter);
    }
    if (priceRange) {
      products = products.filter((p) => {
        const priceStr = p.price.replace(/[$,]/g, "");
        const price = parseFloat(priceStr);
        if (isNaN(price)) return false;
        switch (priceRange) {
          case "0-100": return price <= 100;
          case "100-200": return price > 100 && price <= 200;
          case "200-400": return price > 200 && price <= 400;
          case "400+": return price > 400;
          default: return true;
        }
      });
    }
    if (sortBy) {
      products = [...products].sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[$,]/g, "")) || 0;
        const priceB = parseFloat(b.price.replace(/[$,]/g, "")) || 0;
        switch (sortBy) {
          case "price-asc": return priceA - priceB;
          case "price-desc": return priceB - priceA;
          case "name-asc": return a.desc.localeCompare(b.desc);
          default: return 0;
        }
      });
    }
    return products;
  }, [activeBrand, catalog, searchTerm, sizeFilter, typeFilter, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setSearchTerm("");
    setSizeFilter("");
    setTypeFilter("");
    setPriceRange("");
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Brand selector grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 mb-8">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => { setActiveBrand(brand); clearFilters(); }}
            className={`px-3 py-3 font-condensed text-xs sm:text-sm tracking-[0.05em] uppercase text-center transition-all duration-200 border ${
              activeBrand === brand
                ? "bg-red text-white border-red font-bold"
                : "bg-white text-gray-600 border-gray-200 hover:border-red/40 hover:text-gray-900 shadow-sm"
            }`}
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
            }}
          >
            {brand}
            <span className="block text-[10px] font-normal opacity-60 mt-0.5">
              {catalog[brand]?.length}
            </span>
          </button>
        ))}
      </div>

      {/* Products panel */}
      <AnimatePresence mode="wait">
        {activeBrand && (
          <motion.div
            key={activeBrand}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded overflow-hidden border border-gray-200">
              {/* Filters bar */}
              <div className="px-6 py-4 border-b border-gray-200 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-xl font-bold uppercase tracking-wider text-gray-900">
                      {activeBrand}
                    </h3>
                    <Badge>{filteredProducts.length} items</Badge>
                  </div>

                </div>

                {/* Filter row */}
                <div className="flex flex-wrap items-center gap-2 overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0 sm:overflow-x-visible">
                  <div className="relative flex-shrink-0">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                      className="px-4 py-2.5 pl-9 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red/50 w-40 sm:w-44 min-h-[44px]"
                    />
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  {filterOptions.sizes.length > 0 && (
                    <select
                      value={sizeFilter}
                      onChange={(e) => { setSizeFilter(e.target.value); setCurrentPage(1); }}
                      className="px-4 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red/50 appearance-none cursor-pointer flex-shrink-0 min-h-[44px]"
                    >
                      <option value="">All Rim Sizes</option>
                      {filterOptions.sizes.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  )}
                  {filterOptions.types.length > 0 && (
                    <select
                      value={typeFilter}
                      onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                      className="px-4 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red/50 appearance-none cursor-pointer flex-shrink-0 min-h-[44px]"
                    >
                      <option value="">All Types</option>
                      {filterOptions.types.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  )}
                  
                  <select
                    value={sortBy}
                    onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                    className="px-4 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red/50 appearance-none cursor-pointer flex-shrink-0 min-h-[44px]"
                  >
                    <option value="">Sort By</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="name-asc">Name: A → Z</option>
                  </select>
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden ml-auto flex-shrink-0">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-2.5 min-h-[44px] ${viewMode === "list" ? "bg-red text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`px-3 py-2.5 min-h-[44px] ${viewMode === "grid" ? "bg-red text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                      </svg>
                    </button>
                  </div>
                  {(searchTerm || sizeFilter || typeFilter || priceRange) && (
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2.5 text-xs font-bold text-red hover:text-red-dark uppercase tracking-wider bg-red/5 rounded-lg border border-red/20 flex-shrink-0 min-h-[44px]"
                    >
                      ✕ Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Products */}
              <div className={viewMode === "grid" 
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4" 
                : "divide-y divide-gray-100"
              }>
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product, i) => (
                    viewMode === "grid" ? (

                      <div key={`${product.part}-${i}`} className="flex flex-col items-center text-center p-3 border border-gray-100 rounded-lg hover:border-red/20 transition-colors">
                        {product.image ? (
                          <div className="w-full aspect-square rounded-lg overflow-hidden cursor-zoom-in mb-2" onClick={() => setLightboxImage(product.image)}>
                            <img src={product.image} alt={product.desc} className="w-full h-full object-contain" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = '<img src="/logo.png" alt="" class="w-14 h-14 opacity-20 m-auto" />'; }} />
                          </div>
                        ) : (
                          <div className="w-full aspect-square rounded-lg flex items-center justify-center mb-2">
                            <img src="/logo.png" alt="" className="w-14 h-14 opacity-15" />
                          </div>
                        )}
                        <p className="font-body text-xs font-bold text-gray-800 line-clamp-2 mb-1">{product.desc}</p>
                        {false && product.price && product.price !== "" && product.price !== "-" && (
                          <span className="font-display text-sm font-bold text-gray-900 mb-2">
                            {product.price.startsWith("$") ? product.price : `$${product.price}`}
                          </span>
                        )}
                        <div className="flex items-center gap-1 mt-auto">
                          <div className="flex items-center border border-gray-200 rounded overflow-hidden">
                            <button onClick={() => { const el = document.getElementById(`tgq-${product.part}-${i}`) as HTMLInputElement; if(el && parseInt(el.value)>1) el.value=String(parseInt(el.value)-1); }} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-xs">−</button>
                            <input id={`tgq-${product.part}-${i}`} type="number" defaultValue="1" min="1" className="w-7 h-6 text-center text-xs font-bold text-gray-800 border-x border-gray-200 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                            <button onClick={() => { const el = document.getElementById(`tgq-${product.part}-${i}`) as HTMLInputElement; if(el) el.value=String(parseInt(el.value)+1); }} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-xs">+</button>
                          </div>
                          <button onClick={() => { const el = document.getElementById(`tgq-${product.part}-${i}`) as HTMLInputElement; addItem({ part: product.part, desc: product.desc, price: product.price, image: product.image, brand: activeBrand! }, el ? parseInt(el.value)||1 : 1); }} className="px-2 py-1 text-[10px] font-bold text-white bg-red hover:bg-red-dark rounded transition-colors uppercase">Add</button>
                        </div>
                      </div>
                    ) : (
                      <div key={`${product.part}-${i}`} className="px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                          {product.image ? (
                            <div className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-zoom-in" onClick={() => setLightboxImage(product.image)}>
                              <img src={product.image} alt={product.desc} className="w-full h-full object-contain" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = '<img src="/logo.png" alt="" class="w-14 h-14 opacity-20 m-auto" />'; }} />
                            </div>
                          ) : (
                            <div className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg flex items-center justify-center">
                              <img src="/logo.png" alt="" className="w-10 sm:w-14 h-10 sm:h-14 opacity-20" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-body text-sm sm:text-base font-bold text-gray-800 truncate">{product.desc}</p>
                            <p className="font-condensed text-xs tracking-[0.15em] uppercase text-gray-500 mt-1">{product.part}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-auto sm:ml-0">
                          {false && product.price && product.price !== "" && product.price !== "-" && (
                            <span className="font-display text-base font-bold text-gray-900">
                              {product.price.startsWith("$") ? product.price : `$${product.price}`}
                            </span>
                          )}
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => {
                                const input = document.getElementById(`qty-tire-${product.part}`) as HTMLInputElement;
                                if (input && parseInt(input.value) > 1) input.value = String(parseInt(input.value) - 1);
                              }}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-sm"
                            >−</button>
                            <input
                              id={`qty-tire-${product.part}`}
                              type="number"
                              defaultValue="1"
                              min="1"
                              className="w-10 h-8 text-center text-sm font-bold text-gray-800 border-x border-gray-200 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                              onClick={() => {
                                const input = document.getElementById(`qty-tire-${product.part}`) as HTMLInputElement;
                                if (input) input.value = String(parseInt(input.value) + 1);
                              }}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-sm"
                            >+</button>
                          </div>
                          <button
                            onClick={() => {
                              const input = document.getElementById(`qty-tire-${product.part}`) as HTMLInputElement;
                              const qty = input ? parseInt(input.value) || 1 : 1;
                              addItem({ part: product.part, desc: product.desc, price: product.price, image: product.image, brand: activeBrand! }, qty);
                            }}
                            className="px-4 py-2 text-xs font-bold text-white bg-red hover:bg-red-dark rounded-lg transition-colors uppercase tracking-wider whitespace-nowrap"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )
                  ))
                ) : (
                  <div className="px-6 py-12 text-center col-span-full">
                    <p className="text-gray-400">No products match your filters.</p>
                    <button onClick={clearFilters} className="mt-2 text-red text-sm font-bold uppercase">Clear Filters</button>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="w-9 h-9 flex items-center justify-center text-sm bg-white border border-gray-200 rounded disabled:opacity-30 hover:border-red/40 transition-colors"
                    >
                      ‹
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let page: number;
                      if (totalPages <= 5) page = i + 1;
                      else if (currentPage <= 3) page = i + 1;
                      else if (currentPage >= totalPages - 2) page = totalPages - 4 + i;
                      else page = currentPage - 2 + i;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-9 h-9 flex items-center justify-center text-sm rounded transition-colors ${
                            currentPage === page
                              ? "bg-red text-white"
                              : "bg-white border border-gray-200 hover:border-red/40 text-gray-700"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="w-9 h-9 flex items-center justify-center text-sm bg-white border border-gray-200 rounded disabled:opacity-30 hover:border-red/40 transition-colors"
                    >
                      ›
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!activeBrand && (
        <div className="text-center py-12">
          <p className="font-body text-base text-gray-400">Select a brand above to browse tires</p>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setLightboxImage(null)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
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
