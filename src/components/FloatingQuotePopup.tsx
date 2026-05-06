"use client";

import { useQuoteCart } from "@/components/QuoteCartContext";
import TireIcon from "@/components/TireIcon";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingQuotePopup() {
  const { totalItems, setIsOpen, isOpen } = useQuoteCart();

  return (
    <AnimatePresence>
      {totalItems > 0 && !isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-red hover:bg-red-dark p-5 shadow-2xl shadow-red/30 hover:shadow-red/50 transition-all duration-300 group flex items-center gap-3"
            style={{
              clipPath: "polygon(0% 8px, 8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px))",
            }}
          >
            <div className="flex flex-col items-start">
              <span className="font-condensed text-[11px] tracking-[0.2em] uppercase text-white/60">
                {totalItems} {totalItems === 1 ? "item" : "items"} added
              </span>
              <span className="font-display text-sm font-bold uppercase tracking-wider text-white">
                View Quote
              </span>
            </div>
            <TireIcon className="w-5 h-5 text-white transition-transform duration-1000 group-hover:rotate-[360deg]" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
