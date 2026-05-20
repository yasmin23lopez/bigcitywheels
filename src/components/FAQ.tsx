"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import Badge from "@/components/Badge";

const faqs = [
  {
    q: "What types of vehicles do you service?",
    a: "We work on personal vehicles including regular cars, SUVs, and trucks — especially 3/4 ton and 3500 series pickups. We don't currently service 18-wheelers or commercial semi-trucks.",
  },
  {
    q: "Do you offer financing or payment plans?",
    a: "We're working on financing options for our customers. Contact us directly to discuss payment arrangements for larger purchases like lift kits and suspension packages.",
  },
  {
    q: "How long does a lift kit installation take?",
    a: "Most lift kit installations are completed within the same day, depending on the complexity of the kit and your vehicle. We'll give you a time estimate when you bring your truck in.",
  },
  {
    q: "Do I need an appointment?",
    a: "Walk-ins are welcome, but we recommend calling ahead or requesting a quote online to ensure we have your parts ready and can get you in quickly.",
  },
  {
    q: "What brands do you carry?",
    a: "We carry a wide selection of trusted tire, rim, and suspension brands. We're constantly expanding our inventory — call us to ask about specific brands or products.",
  },
  {
    q: "Do you speak Spanish?",
    a: "Yes! Se habla español. Our team is bilingual so every customer feels comfortable and understood.",
  },
];

function FaqItem({ faq, index, isOpen, toggle }: { faq: typeof faqs[0]; index: number; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-card-border">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-6 sm:py-8 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="font-display text-sm text-white/20 font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-condensed text-base sm:text-lg font-semibold tracking-wider uppercase group-hover:text-red transition-colors duration-300">
            {faq.q}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/40 group-hover:text-red transition-colors duration-300 flex-shrink-0 ml-4"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 sm:pb-8 pl-10 sm:pl-14 font-body text-base sm:text-lg text-white/50 leading-relaxed font-light max-w-2xl">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ({ faqs: sanityFaqs }: { faqs?: { question: string; answer: string }[] | null }) {
  const ref = useRef(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqData = sanityFaqs && sanityFaqs.length > 0 ? sanityFaqs.map(f => ({ q: f.question, a: f.answer })) : faqs;

  return (
    <section id="faq" className="relative py-24 sm:py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[#050505]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16 sm:mb-20">
          <Badge>Got Questions?</Badge>
          <h2 className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight">
            Before You Roll In
          </h2>
          <p className="mt-4 font-body text-base sm:text-lg text-white/30 max-w-lg mx-auto">
            Everything you need to know before your visit.
          </p>
          <div className="mt-4 w-16 h-[2px] bg-red mx-auto" />
        </ScrollReveal>

        <ScrollReveal>
          <div className="border-t border-card-border">
            {faqData.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                toggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
