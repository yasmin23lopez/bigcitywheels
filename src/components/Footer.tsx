"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TireIcon from "@/components/TireIcon";
import { AnimatePresence, motion } from "framer-motion";

const menuItems = [
  {
    label: "Tires",
    href: "/tires",
    sections: [
      {
        title: "All Brands",
        links: [
          { label: "Accelera", href: "/tires?brand=ACCELERA" },
          { label: "Dunlop", href: "/tires?brand=DUNLOP" },
          { label: "Evergreen", href: "/tires?brand=EVERGREEN" },
          { label: "Farroad", href: "/tires?brand=FARROAD" },
          { label: "Fullway", href: "/tires?brand=FULLWAY" },
          { label: "Goodyear", href: "/tires?brand=GOODYEAR" },
          { label: "Gritmaster", href: "/tires?brand=GRITMASTER" },
          { label: "Hankook", href: "/tires?brand=HANKOOK" },
          { label: "Haida", href: "/tires?brand=HAIDA" },
          { label: "Kanati", href: "/tires?brand=KANATI" },
          { label: "Landspider", href: "/tires?brand=LANDSPIDER" },
          { label: "Landgolden", href: "/tires?brand=LANDGOLDEN" },
          { label: "Lexani", href: "/tires?brand=LEXANI" },
          { label: "Lionhart", href: "/tires?brand=LIONHART" },
          { label: "Mastertrack", href: "/tires?brand=MASTERTRACK" },
          { label: "Nebula", href: "/tires?brand=NEBULA" },
          { label: "Nitto", href: "/tires?brand=NITTO" },
          { label: "Predator", href: "/tires?brand=PREDATOR" },
          { label: "Pirelli", href: "/tires?brand=PIRELLI" },
          { label: "Roadone", href: "/tires?brand=ROADONE" },
          { label: "Royalblack", href: "/tires?brand=ROYALBLACK" },
          { label: "Radar", href: "/tires?brand=RADAR" },
          { label: "Toyo", href: "/tires?brand=TOYO" },
          { label: "Travelstar", href: "/tires?brand=TRAVELSTAR" },
          { label: "Suretrac", href: "/tires?brand=SURETRAC" },
          { label: "Trailer", href: "/tires?brand=TRAILER" },
          { label: "Vogue", href: "/tires?brand=VOGUE" },
          { label: "Zeta", href: "/tires?brand=ZETA" },
        ],
      },
    ],
  },
  {
    label: "Wheels",
    href: "/wheels",
    sections: [
      {
        title: "All Brands",
        links: [
          { label: "American Force", href: "/wheels?brand=AMERICAN+FORCE" },
          { label: "Artis", href: "/wheels?brand=ARFIS" },
          { label: "AXE", href: "/wheels?brand=AXE" },
          { label: "AXD Offroad", href: "/wheels?brand=AXD" },
          { label: "Aodhan", href: "/wheels?brand=AODHAN" },
          { label: "Built Offroad", href: "/wheels?brand=BUILT+OFFROAD" },
          { label: "Curva Concept", href: "/wheels?brand=CURVA" },
          { label: "Dolce", href: "/wheels?brand=DOLCE" },
          { label: "DRW", href: "/wheels?brand=DRW" },
          { label: "Defy", href: "/wheels?brand=DEFY" },
          { label: "Forgiato", href: "/wheels?brand=FORGIATO" },
          { label: "Giovanna", href: "/wheels?brand=GIOVANNA" },
          { label: "Gianelle", href: "/wheels?brand=GIANELLE" },
          { label: "Hardcore Offroad", href: "/wheels?brand=HARDCORE" },
          { label: "Koko Kulture", href: "/wheels?brand=KOKO" },
          { label: "Katana Racing", href: "/wheels?brand=KATANA" },
          { label: "Legion Offroad", href: "/wheels?brand=LEGION" },
          { label: "Lexani", href: "/wheels?brand=LEXANI" },
          { label: "Lethal Offroad", href: "/wheels?brand=LETHAL" },
          { label: "Mach Performance", href: "/wheels?brand=MACH" },
          { label: "Replica", href: "/wheels?brand=REPLICA" },
          { label: "Scorpion", href: "/wheels?brand=SCORPION" },
          { label: "STR", href: "/wheels?brand=STR" },
          { label: "Revolution Racing", href: "/wheels?brand=REVOLUTION" },
          { label: "Revenge Offroad", href: "/wheels?brand=REVENGE" },
          { label: "TW Offroad", href: "/wheels?brand=TW+OFFROAD" },
          { label: "US Mag", href: "/wheels?brand=US+MAG" },
          { label: "VCT", href: "/wheels?brand=VCT" },
          { label: "Wraith", href: "/wheels?brand=WRAITH" },
          { label: "Wicked Offroad", href: "/wheels?brand=WICKED" },
          { label: "2Crave", href: "/wheels?brand=2CRAVE" },
        ],
      },
    ],
  },
  {
    label: "Lift Kits",
    href: "/services/lift-kits",
    sections: [
      {
        title: "By Make",
        links: [
          { label: "Chevy / GMC", href: "/services/lift-kits" },
          { label: "Ford", href: "/services/lift-kits" },
          { label: "Dodge", href: "/services/lift-kits" },
          { label: "Jeep", href: "/services/lift-kits" },
          { label: "Nissan", href: "/services/lift-kits" },
        ],
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    sections: [
      {
        title: "What We Do",
        links: [
          { label: "Tire Mounting & Balancing", href: "/services/tires" },
          { label: "Rim Installation", href: "/services/rims" },
          { label: "Wheel Alignment", href: "/services/alignment" },
          { label: "Accessories", href: "/accessories" },
        ],
      },
    ],
  },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  {
    name: "facebook",
    svg: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
    href: "#",
  },
  {
    name: "instagram",
    svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />,
    href: "#",
  },
  {
    name: "tiktok",
    svg: <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />,
    href: "#",
  },
  {
    name: "google",
    svg: <><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></>,
    href: "https://share.google/jt8xoS89YKj3WaMtm",
  },
];

export default function Footer() {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [badgeText, setBadgeText] = useState("Open Mon 9AM");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkHours = () => {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }));
      const day = now.getDay();
      const hour = now.getHours();

      if (day === 0) {
        setIsOpen(false);
        setBadgeText("Open Mon 9AM");
      } else if (day === 6) {
        if (hour < 9) { setIsOpen(false); setBadgeText("Open Today 9AM"); }
        else if (hour >= 15) { setIsOpen(false); setBadgeText("Open Mon 9AM"); }
        else { setIsOpen(true); setBadgeText("Open Now"); }
      } else {
        if (hour < 9) { setIsOpen(false); setBadgeText("Open Today 9AM"); }
        else if (hour >= 18) { setIsOpen(false); setBadgeText(day === 5 ? "Open Sat 9AM" : "Open Tomorrow 9AM"); }
        else { setIsOpen(true); setBadgeText("Open Now"); }
      }
    };
    checkHours();
    const interval = setInterval(checkHours, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleSubmenu = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label);
  };

  return (
    <footer className="relative bg-[#0a0a0a]">
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-red via-red-dark to-red py-5 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <span className="text-2xl leading-none">🔥</span>
          <span className="font-condensed text-sm sm:text-base font-bold tracking-[0.12em] uppercase text-white text-center">
            Buy 3 Tires, Get the 4th 50% Off — Limited Time
          </span>
          <a
            href="#contact"
            className="font-condensed text-xs sm:text-sm font-bold tracking-[0.1em] uppercase text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 transition-all"
            style={{ clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)" }}
          >
            Claim Now
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_auto] gap-14 lg:gap-10">

          {/* LEFT — Logo + Badge + Contact + Socials */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-5">
              <Image
                src="/logo.png"
                alt="Big City Wheels & Tires"
                width={120}
                height={120}
                className="w-20 h-20 sm:w-24 sm:h-24"
              />
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                  Big City<br/>Wheels & Tires
                </h3>
              </div>
            </div>

            {/* Contact info — with icons */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 bg-white/[0.06] font-condensed text-sm tracking-[0.2em] uppercase font-semibold px-4 py-2 text-white/60">
                <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-green-500 animate-pulse" : "bg-red animate-pulse"}`} />
                Crosby, TX — {badgeText}
              </span>
            </div>

            <div className="space-y-3">

              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <p className="font-body text-xl text-white/50">4343 US-90, Crosby, TX 77532</p>
              </div>

              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a href="tel:7135615519" className="font-body text-xl text-white/50 hover:text-red transition-colors">(713) 561-5519</a>
              </div>

              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href="mailto:Bcwtires@gmail.com" className="font-body text-xl text-white/50 hover:text-red transition-colors">Bcwtires@gmail.com</a>
              </div>
            </div>

            {/* Socials — diagonal cut like buttons */}
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href || "#"}
                  target={s.href && s.href !== "#" ? "_blank" : undefined}
                  rel={s.href && s.href !== "#" ? "noopener noreferrer" : undefined}
                  aria-label={s.name}
                  className="w-10 h-10 bg-white/[0.06] flex items-center justify-center text-white/30 hover:text-white hover:bg-red/80 transition-all duration-200"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">{s.svg}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — Grid menu with expandable submenus */}
          <div className="flex flex-col w-full lg:w-[320px]">
            <div className="border border-white/[0.08]">
              {menuItems.map((item, i) => (
                <div key={item.label}>
                  {item.sections ? (
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={`w-full px-5 py-3.5 text-base font-medium tracking-wide text-left transition-all duration-200 border-b border-white/[0.08] flex items-center justify-between ${
                        activeSubmenu === item.label ? "text-red bg-white/[0.03]" : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      {item.label}
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${activeSubmenu === item.label ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="block px-5 py-3.5 text-base font-medium tracking-wide text-white/50 hover:text-white hover:bg-white/[0.03] transition-all duration-200 border-b border-white/[0.08]"
                    >
                      {item.label}
                    </a>
                  )}

                  {/* Expanded submenu with sections — like the header megamenu */}
                  <AnimatePresence>
                    {item.sections && activeSubmenu === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-b border-white/[0.08] bg-white/[0.02]"
                      >
                        <div className="px-5 py-4 space-y-4">
                          {item.sections.map((section) => (
                            <div key={section.title}>
                              <h5 className="font-condensed text-xs font-bold tracking-[0.25em] uppercase text-red/70 mb-2">
                                {section.title}
                              </h5>
                              <div className="flex flex-wrap gap-x-3 gap-y-2">
                                {section.links.map((link) => (
                                  <a
                                    key={link.label}
                                    href={link.href}
                                    className="font-body text-sm sm:text-base text-white/40 hover:text-white transition-colors duration-200 py-1"
                                  >
                                    {link.label}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="tel:7135615519"
              className="mt-3 flex items-center justify-between bg-white text-black font-display text-base font-bold tracking-[0.12em] uppercase px-5 py-4 hover:bg-red hover:text-white transition-all duration-300 group"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
              }}
            >
              <span>Get a Quote</span>
              <TireIcon className="w-4 h-4 transition-transform duration-1000 group-hover:rotate-[360deg]" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-base text-white/25">
            &copy;{" "}{new Date().getFullYear()}{" "}Big City Wheels &amp; Tires. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-base text-white/25 hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-base text-white/25 hover:text-white/50 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
