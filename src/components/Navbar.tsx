"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TireIcon from "@/components/TireIcon";

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
        title: "By Category",
        links: [
          { label: "All-Terrain", href: "/tires" },
          { label: "Highway", href: "/tires" },
          { label: "Mud-Terrain", href: "/tires" },
          { label: "All-Season", href: "/tires" },
          { label: "Performance", href: "/tires" },
        ],
      },
      {
        title: "By Vehicle",
        links: [
          { label: "Pickup Trucks", href: "/tires" },
          { label: "SUV / CUV", href: "/tires" },
          { label: "Sedan / Coupe", href: "/tires" },
          { label: "3/4 Ton & 3500", href: "/tires" },
        ],
      },
      {
        title: "Popular Brands",
        links: [
          { label: "BFGoodrich", href: "/tires" },
          { label: "Nitto", href: "/tires" },
          { label: "Toyo", href: "/tires" },
          { label: "Falken", href: "/tires" },
          { label: "Cooper", href: "/tires" },
        ],
      },
    ],
  },
  {
    label: "Wheels",
    href: "/wheels",
    megamenu: [
      {
        title: "By Style",
        links: [
          { label: "Off-Road", href: "/wheels" },
          { label: "Street / Sport", href: "/wheels" },
          { label: "Classic / Chrome", href: "/wheels" },
          { label: "Matte & Black", href: "/wheels" },
        ],
      },
      {
        title: "By Size",
        links: [
          { label: '17" – 18"', href: "/wheels" },
          { label: '20" – 22"', href: "/wheels" },
          { label: '24" +', href: "/wheels" },
        ],
      },
      {
        title: "Popular Brands",
        links: [
          { label: "Fuel", href: "/wheels" },
          { label: "Moto Metal", href: "/wheels" },
          { label: "XD Series", href: "/wheels" },
          { label: "American Force", href: "/wheels" },
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
        title: "Suspension",
        links: [
          { label: "Lift Kits", href: "/services/lift-kits" },
          { label: "Leveling Kits", href: "/services/lift-kits" },
          { label: "Full Suspension Upgrades", href: "/services/lift-kits" },
        ],
      },
      {
        title: "Why Big City",
        links: [
          { label: "Free Alignment w/ Purchase", href: "/services" },
          { label: "Same-Day Service", href: "/services" },
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
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 lg:px-8 pt-4 sm:pt-5"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Announcement marquee bar — blue with top diagonal cuts */}
        <div
          className="overflow-hidden"
          style={{
            backgroundColor: "#1E3FA0",
            clipPath: "polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, 0% 100%, 0% 8px)",
          }}
        >
          <div className="flex animate-marquee whitespace-nowrap py-1.5">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="font-condensed text-[11px] tracking-[0.2em] uppercase font-semibold text-white/80 mx-8">
                Grand Opening — Free Alignment with every rim or suspension purchase
                <span className="mx-3 text-white/30">·</span>
                <a href="tel:7135615519">Call (713) 561-5519</a>
              </span>
            ))}
          </div>
        </div>

        {/* Logo — desfasado, sits above the bar */}
        <a href="/" className="absolute left-4 -top-2 flex-shrink-0 group z-20">
          <Image
            src="/logo.png"
            alt="Big City Wheels & Tires"
            width={140}
            height={140}
            className="w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
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
            <div className="w-24 sm:w-28 flex-shrink-0" />

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
                    className={`flex items-center gap-1 font-condensed text-sm font-semibold tracking-[0.15em] uppercase px-5 py-2 transition-colors duration-200 ${
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

            {/* CTA button — red */}
            <a
              href="#contact"
              className="hidden sm:flex items-center justify-center gap-2 h-full font-condensed font-semibold text-sm tracking-[0.15em] uppercase px-8 sm:px-10 text-white bg-red hover:bg-red-dark transition-all duration-300 whitespace-nowrap group"
            >
              Get a Quote
              <TireIcon className="w-4 h-4 transition-transform duration-1000 group-hover:rotate-[360deg]" />
            </a>

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
                      .map((item) => (
                        <div key={item.label} className="grid grid-cols-3 gap-12">
                          {item.megamenu!.map((section) => (
                            <div key={section.title}>
                              <h4 className="font-condensed text-xs font-bold tracking-[0.3em] uppercase text-red mb-5">
                                {section.title}
                              </h4>
                              <ul className="space-y-3">
                                {section.links.map((link) => (
                                  <li key={link.label}>
                                    <a
                                      href={link.href}
                                      onClick={() => setActiveMenu(null)}
                                      className={`font-body text-[15px] font-medium hover:pl-2 transition-all duration-200 ${scrolled ? "text-black/50 hover:text-black" : "text-white/60 hover:text-white"}`}
                                    >
                                      {link.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ))}
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
                  className="block font-display text-2xl font-bold tracking-wider uppercase text-white/80 hover:text-red transition-colors py-4"
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
