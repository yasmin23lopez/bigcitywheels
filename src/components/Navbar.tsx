"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TireIcon from "@/components/TireIcon";
import { useQuoteCart } from "@/components/QuoteCartContext";

interface MegaMenuSection {
  title: string;
  links: { label: string; href: string }[];
}

interface NavItem {
  label: string;
  href: string;
  megamenu?: MegaMenuSection[];
}

const navItems: NavItem[] = [
  {
    label: "Tires",
    href: "/tires",
    megamenu: [
      {
        title: "All Brands",
        links: [
          { label: "Nitto", href: "/tires?brand=NITTO" },
          { label: "Toyo", href: "/tires?brand=TOYO" },
          { label: "Pirelli", href: "/tires?brand=PIRELLI" },
          { label: "Goodyear", href: "/tires?brand=GOODYEAR" },
          { label: "Hankook", href: "/tires?brand=HANKOOK" },
          { label: "Radar", href: "/tires?brand=RADAR" },
          { label: "Landspider", href: "/tires?brand=LANDSPIDER" },
          { label: "Predator", href: "/tires?brand=PREDATOR" },
          { label: "Zeta", href: "/tires?brand=ZETA" },
          { label: "Accelera", href: "/tires?brand=ACCELERA" },
          { label: "Dunlop", href: "/tires?brand=DUNLOP" },
          { label: "Evergreen", href: "/tires?brand=EVERGREEN" },
          { label: "Farroad", href: "/tires?brand=FARROAD" },
          { label: "Fullway", href: "/tires?brand=FULLWAY" },
          { label: "Gritmaster", href: "/tires?brand=GRITMASTER" },
          { label: "Haida", href: "/tires?brand=HAIDA" },
          { label: "Kanati", href: "/tires?brand=KANATI" },
          { label: "Landgolden", href: "/tires?brand=LANDGOLDEN" },
          { label: "Lexani", href: "/tires?brand=LEXANI" },
          { label: "Lionhart", href: "/tires?brand=LIONHART" },
          { label: "Mastertrack", href: "/tires?brand=MASTERTRACK" },
          { label: "Nebula", href: "/tires?brand=NEBULA" },
          { label: "Roadone", href: "/tires?brand=ROADONE" },
          { label: "Royalblack", href: "/tires?brand=ROYALBLACK" },
          { label: "Travelstar", href: "/tires?brand=TRAVELSTAR" },
          { label: "Suretrac", href: "/tires?brand=SURETRAC" },
          { label: "Trailer", href: "/tires?brand=TRAILER" },
          { label: "Vogue", href: "/tires?brand=VOGUE" },
        ],
      },
      {
        title: "By Type",
        links: [
          { label: "All-Terrain", href: "/tires" },
          { label: "Mud-Terrain", href: "/tires" },
          { label: "Highway", href: "/tires" },
          { label: "Performance", href: "/tires" },
        ],
      },
      {
        title: "By Vehicle",
        links: [
          { label: "Pickup Trucks", href: "/tires" },
          { label: "SUV / CUV", href: "/tires" },
          { label: "Sedan / Coupe", href: "/tires" },
          { label: "3/4 Ton & Dually", href: "/tires" },
        ],
      },
    ],
  },
  {
    label: "Wheels",
    href: "/wheels",
    megamenu: [
      {
        title: "All Brands",
        links: [
          { label: "American Force", href: "/wheels?brand=AMERICAN+FORCE" },
          { label: "Lexani", href: "/wheels?brand=LEXANI" },
          { label: "Forgiato", href: "/wheels?brand=FORGIATO" },
          { label: "Giovanna", href: "/wheels?brand=GIOVANNA" },
          { label: "Mach Performance", href: "/wheels?brand=MACH" },
          { label: "Hardcore Offroad", href: "/wheels?brand=HARDCORE" },
          { label: "Revenge Offroad", href: "/wheels?brand=REVENGE" },
          { label: "Wicked Offroad", href: "/wheels?brand=WICKED" },
          { label: "Wraith", href: "/wheels?brand=WRAITH" },
          { label: "Artis", href: "/wheels?brand=ARFIS" },
          { label: "AXE", href: "/wheels?brand=AXE" },
          { label: "AXD Offroad", href: "/wheels?brand=AXD" },
          { label: "Aodhan", href: "/wheels?brand=AODHAN" },
          { label: "Built Offroad", href: "/wheels?brand=BUILT+OFFROAD" },
          { label: "Curva Concept", href: "/wheels?brand=CURVA" },
          { label: "Dolce", href: "/wheels?brand=DOLCE" },
          { label: "DRW", href: "/wheels?brand=DRW" },
          { label: "Defy", href: "/wheels?brand=DEFY" },
          { label: "Gianelle", href: "/wheels?brand=GIANELLE" },
          { label: "Koko Kulture", href: "/wheels?brand=KOKO" },
          { label: "Katana Racing", href: "/wheels?brand=KATANA" },
          { label: "Legion Offroad", href: "/wheels?brand=LEGION" },
          { label: "Lethal Offroad", href: "/wheels?brand=LETHAL" },
          { label: "Replica", href: "/wheels?brand=REPLICA" },
          { label: "Scorpion", href: "/wheels?brand=SCORPION" },
          { label: "STR", href: "/wheels?brand=STR" },
          { label: "Revolution Racing", href: "/wheels?brand=REVOLUTION" },
          { label: "TW Offroad", href: "/wheels?brand=TW+OFFROAD" },
          { label: "US Mag", href: "/wheels?brand=US+MAG" },
          { label: "VCT", href: "/wheels?brand=VCT" },
          { label: "2Crave", href: "/wheels?brand=2CRAVE" },
        ],
      },
      {
        title: "By Size",
        links: [
          { label: '20"', href: "/wheels" },
          { label: '22"', href: "/wheels" },
          { label: '24"', href: "/wheels" },
          { label: '26"+', href: "/wheels" },
        ],
      },
      {
        title: "By Style",
        links: [
          { label: "Off-Road", href: "/wheels" },
          { label: "Street / Luxury", href: "/wheels" },
          { label: "Dually", href: "/wheels" },
          { label: "Chrome / Polish", href: "/wheels" },
        ],
      },
    ],
  },
  {
    label: "Lift Kits",
    href: "/services/lift-kits",
    megamenu: [
      {
        title: "By Size",
        links: [
          { label: "1-2 Inch Lift Kits", href: "/services/lift-kits" },
          { label: "3-5 Inch Lift Kits", href: "/services/lift-kits" },
          { label: "6-8 Inch Lift Kits", href: "/services/lift-kits" },
          { label: "Leveling Kits", href: "/services/lift-kits" },
        ],
      },
      {
        title: "Popular Brands",
        links: [
          { label: "ReadyLIFT", href: "/services/lift-kits" },
          { label: "Rough Country", href: "/services/lift-kits" },
          { label: "ICON", href: "/services/lift-kits" },
          { label: "Mammoth", href: "/services/lift-kits" },
          { label: "Cognito", href: "/services/lift-kits" },
        ],
      },
      {
        title: "Includes",
        links: [
          { label: "Free Alignment", href: "/services/lift-kits" },
          { label: "Same-Day Install", href: "/services/lift-kits" },
        ],
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    megamenu: [
      {
        title: "Installation",
        links: [
          { label: "Tire Mounting & Balancing", href: "/services/tires" },
          { label: "Rim Installation", href: "/services/rims" },
          { label: "Wheel Alignment", href: "/services/alignment" },
        ],
      },
      {
        title: "More",
        links: [
          { label: "Accessories", href: "/accessories" },
          { label: "Request a Quote", href: "/contact" },
        ],
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { totalItems, setIsOpen: setCartOpen } = useQuoteCart();

  useEffect(() => {
    const onScroll = () => {
      // On home page (has hero), wait until after hero animation
      // On other pages, change immediately on scroll
      const isHome = window.location.pathname === "/";
      const threshold = isHome ? window.innerHeight * 2.5 : 50;
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Check on mount for non-home pages
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const bg = scrolled ? "bg-white/80 backdrop-blur-xl shadow-lg" : "bg-black";
  const textColor = scrolled ? "text-black" : "text-white";
  const hoverColor = "hover:text-red";
  const dividerColor = scrolled ? "bg-black/15" : "bg-white/20";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 lg:px-4 pt-4 sm:pt-5"
    >
      <div className="relative mx-auto">
        {/* Announcement marquee bar — blue with top diagonal cuts */}
        <div
          className="overflow-hidden"
          style={{
            backgroundColor: "#1E3FA0",
            clipPath: "polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, 0% 100%, 0% 8px)",
          }}
        >
          <div className="flex animate-marquee whitespace-nowrap py-1.5 sm:py-2">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="font-condensed text-[11px] sm:text-[13px] tracking-[0.05em] sm:tracking-[0.1em] uppercase font-semibold text-white/80 mx-6 sm:mx-8">
                Grand Opening — Free Alignment with every rim or suspension purchase
              </span>
            ))}
          </div>
        </div>

        {/* Logo — desfasado, sits above the bar */}
        <a href="/" className="absolute left-4 -top-2 flex-shrink-0 group z-20">
          <Image
            src="/logo.png"
            alt="Big City Wheels & Tires"
            width={160}
            height={160}
            className="w-32 h-32 sm:w-36 sm:h-36 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
          />
        </a>

        {/* Nav container — no gap with announcement */}
        <div className="relative">
          {/* Top bar with diagonal cuts */}
          <div
            className={`flex items-center h-14 sm:h-16 transition-all duration-500 ${bg}`}
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px))",
            }}
          >
            {/* Spacer for logo overlap */}
            <div className="w-32 sm:w-36 flex-shrink-0" />

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center justify-center flex-1 gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.megamenu && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href={item.href}
                    className={`flex items-center gap-1 font-condensed text-base font-semibold tracking-[0.1em] uppercase px-5 py-2 transition-colors duration-200 ${
                      activeMenu === item.label ? "text-red" : `${textColor} ${hoverColor}`
                    }`}
                  >
                    {item.label}
                    {item.megamenu && (
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${activeMenu === item.label ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </a>
                </div>
              ))}
            </div>

            {/* Divider line */}
            <div className={`hidden sm:block w-px h-6 transition-colors duration-500 ${dividerColor}`} />

            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="hidden sm:flex items-center justify-center gap-2 h-full font-condensed font-semibold text-base tracking-[0.1em] uppercase px-8 sm:px-10 text-white bg-red hover:bg-red-dark transition-all duration-300 whitespace-nowrap group relative"
            >
              Get a Quote
              <TireIcon className="w-4 h-4 transition-transform duration-1000 group-hover:rotate-[360deg]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-red text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile toggle */}
            <div className="flex items-center ml-auto lg:hidden pr-4">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex flex-col gap-1.5 p-2"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className={`block w-6 h-[2px] transition-colors duration-500 ${scrolled ? "bg-black" : "bg-white"}`}
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className={`block w-6 h-[2px] transition-colors duration-500 ${scrolled ? "bg-black" : "bg-white"}`}
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className={`block w-6 h-[2px] transition-colors duration-500 ${scrolled ? "bg-black" : "bg-white"}`}
                />
              </button>
            </div>
          </div>

          {/* Megamenu — inside the same container */}
          <AnimatePresence>
            {activeMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="hidden lg:block overflow-hidden"
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className={`relative transition-colors duration-500 ${bg}`}
                  style={{
                    clipPath: "polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)",
                  }}
                >
                  {/* Inner content with padding for logo space */}
                  <div className="pl-36 pr-12 pt-8 pb-10">
                    {navItems
                      .filter((item) => item.label === activeMenu && item.megamenu)
                      .map((item) => {
                        const brandSection = item.megamenu!.find(s => s.links.length > 8);
                        const otherSections = item.megamenu!.filter(s => s.links.length <= 8);
                        
                        return (
                          <div key={item.label} className="flex gap-10">
                            {/* Left: Brands grid */}
                            {brandSection && (
                              <div className="flex-1">
                                <h4 className="font-condensed text-sm font-bold tracking-[0.2em] uppercase text-red mb-4">
                                  {brandSection.title}
                                </h4>
                                <div className="grid grid-cols-4 gap-x-6 gap-y-2.5">
                                  {brandSection.links.map((link) => (
                                    <a
                                      key={link.label}
                                      href={link.href}
                                      onClick={() => setActiveMenu(null)}
                                      className={`font-body text-base font-medium hover:text-red transition-colors duration-200 ${scrolled ? "text-black/60" : "text-white/60"}`}
                                    >
                                      {link.label}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Right: Categories — or full width if no brands */}
                            {otherSections.length > 0 && (
                              <div className={brandSection 
                                ? "w-[220px] flex-shrink-0 pl-10 border-l border-white/[0.06] flex flex-col gap-6" 
                                : "flex-1 grid grid-cols-3 gap-10"
                              }>
                                {otherSections.map((section) => (
                                  <div key={section.title}>
                                    <h4 className="font-condensed text-sm font-bold tracking-[0.2em] uppercase text-red mb-3">
                                      {section.title}
                                    </h4>
                                    <ul className="space-y-2">
                                      {section.links.map((link) => (
                                        <li key={link.label}>
                                          <a
                                            href={link.href}
                                            onClick={() => setActiveMenu(null)}
                                            className={`font-body text-base font-medium hover:text-red transition-colors duration-200 ${scrolled ? "text-black/50" : "text-white/50"}`}
                                          >
                                            {link.label}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* If no brand section, show all sections in a row */}
                            {!brandSection && otherSections.length === 0 && item.megamenu!.map((section) => (
                              <div key={section.title}>
                                <h4 className="font-condensed text-sm font-bold tracking-[0.2em] uppercase text-red mb-3">
                                  {section.title}
                                </h4>
                                <ul className="space-y-2">
                                  {section.links.map((link) => (
                                    <li key={link.label}>
                                      <a
                                        href={link.href}
                                        onClick={() => setActiveMenu(null)}
                                        className={`font-body text-base font-medium hover:text-red transition-colors duration-200 ${scrolled ? "text-black/50" : "text-white/50"}`}
                                      >
                                        {link.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-0 bg-black/98 backdrop-blur-xl z-[-1] flex flex-col pt-28 pb-8 px-6 overflow-y-auto"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="border-b border-white/10"
              >
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-display text-2xl font-bold tracking-wider uppercase text-white/80 hover:text-red transition-colors py-4 min-h-[44px]"
                >
                  {item.label}
                </a>
                {item.megamenu && (
                  <div className="pb-4 pl-4 grid grid-cols-2 gap-x-6 gap-y-1">
                    {item.megamenu.flatMap((section) =>
                      section.links.slice(0, 3).map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="font-body text-sm text-white/40 hover:text-white py-1 transition-colors"
                        >
                          {link.label}
                        </a>
                      ))
                    )}
                  </div>
                )}
              </motion.div>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => setMobileOpen(false)}
              className="mt-8 bg-red text-white font-condensed font-semibold text-lg tracking-wider uppercase px-10 py-4 text-center"
              style={{
                borderRadius: "8px 8px 0 8px",
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
              }}
            >
              Get a Quote
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
