"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import TireIcon from "@/components/TireIcon";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingQuotePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating mini card — bottom right */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
          isVisible && !isOpen ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="relative bg-red p-5 sm:p-6 w-[220px] shadow-2xl shadow-red/20 hover:shadow-red/40 transition-all duration-300 group"
          style={{
            borderRadius: "12px",
            clipPath: "polygon(0% 8px, 8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% 40%, calc(100% + 1px) 40%, calc(100% + 1px) 60%, 100% 60%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 60%, -1px 60%, -1px 40%, 0% 40%)",
          }}
        >
          <p className="font-body text-sm text-white/90 leading-snug mb-4">
            Get a free quote for your ride.
          </p>
          <span className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-condensed font-semibold text-xs tracking-[0.15em] uppercase px-5 py-2.5 transition-all w-full justify-center group-hover:bg-white/30"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
            }}
          >
            Get a Quote
            <TireIcon className="w-3.5 h-3.5 transition-transform duration-1000 group-hover:rotate-[360deg]" />
          </span>
        </button>
      </div>

      {/* Fullscreen popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

            {/* Content */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-5xl mx-auto my-6 sm:my-10 flex overflow-hidden"
            >
              {/* Left — Image */}
              <div className="hidden lg:block relative w-[45%] bg-black">
                <Image
                  src="/img/tyres.jpg"
                  alt="Big City Wheels & Tires"
                  fill
                  className="object-cover opacity-70"
                  sizes="45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
                <div className="absolute bottom-10 left-10 right-10 z-10">
                  <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-white mb-3">
                    Your Ride<br />
                    <span className="italic text-red" style={{ fontFamily: "var(--font-accent)" }}>Deserves</span> the Best
                  </h3>
                  <p className="font-body text-sm text-white/50">
                    Tires, rims, lift kits & alignment — Crosby, TX
                  </p>
                </div>
              </div>

              {/* Right — Form */}
              <div className="flex-1 bg-[#0a0a0a] relative overflow-y-auto">
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] transition-all z-20"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
                  }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="p-8 sm:p-10 lg:p-12">
                  <QuoteForm variant="section" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
