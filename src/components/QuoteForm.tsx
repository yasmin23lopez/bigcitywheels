"use client";

import { useState } from "react";
import TireIcon from "@/components/TireIcon";

interface QuoteFormProps {
  variant?: "popup" | "section";
  onClose?: () => void;
}

export default function QuoteForm({ variant = "section", onClose }: QuoteFormProps) {
  const [formState, setFormState] = useState({ 
    name: "", phone: "", email: "", vehicle: "", message: "" 
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      if (variant === "popup" && onClose) onClose();
    }, 3000);
    setFormState({ name: "", phone: "", email: "", vehicle: "", message: "" });
  };

  const isPopup = variant === "popup";

  const inputClass = isPopup
    ? "w-full px-4 py-3.5 font-body text-base leading-normal text-white placeholder:text-white/50 placeholder:font-body placeholder:text-base bg-white/10 border border-white/20 focus:border-white/40 focus:outline-none rounded-lg transition-colors"
    : "w-full px-4 py-3.5 font-body text-base leading-normal text-white placeholder:text-white/40 placeholder:font-body placeholder:text-base bg-[#0a0a0a] border border-white/[0.08] focus:border-red/50 focus:outline-none transition-colors";

  return (
    <div className={`relative ${isPopup ? "" : "bg-card-bg border border-card-border"} p-6 sm:p-8`}>
      {isPopup && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      <div className="mb-6">
        <h3 className={`font-display text-xl font-bold uppercase tracking-wider mb-2 ${isPopup ? "text-white" : ""}`}>
          {isPopup ? "Get a Free Quote" : "Request a Quote"}
        </h3>
        <p className={`font-body text-base font-light ${isPopup ? "text-white/70" : "text-white/40"}`}>
          {isPopup ? "Tell us about your ride." : "Tell us what you need and we'll get back to you fast."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            required
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            className={inputClass}
            placeholder="Name *"
          />
          <input
            type="tel"
            required
            value={formState.phone}
            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
            className={inputClass}
            placeholder="Phone *"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="email"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            className={inputClass}
            placeholder="Email"
          />
          <input
            type="text"
            value={formState.vehicle}
            onChange={(e) => setFormState({ ...formState, vehicle: e.target.value })}
            className={inputClass}
            placeholder="Year, make, model"
          />
        </div>

        <textarea
          required
          rows={3}
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          className={`${inputClass} resize-none`}
          placeholder="What do you need? *"
        />

        <button
          type="submit"
          className={`group w-full font-condensed font-semibold text-sm tracking-[0.2em] uppercase py-4 transition-all duration-300 flex items-center justify-center gap-2 ${
            isPopup 
              ? "bg-white/20 hover:bg-white/30 text-white rounded-lg" 
              : "bg-red hover:bg-red-dark text-white hover:shadow-[0_0_40px_rgba(196,30,42,0.4)]"
          }`}
          style={!isPopup ? {
            clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
          } : undefined}
        >
          {submitted ? "Message Sent!" : (
            <>
              <span>{isPopup ? "Get Quote" : "Send Message"}</span>
              <TireIcon className="w-4 h-4 transition-transform duration-1000 group-hover:rotate-[360deg]" />
            </>
          )}
        </button>

        {!isPopup && (
          <p className="font-body text-base text-white/40 text-center mt-4">
            Or call us directly at{" "}
            <a href="tel:7135615519" className="text-red hover:text-red-dark transition-colors">
              (713) 561-5519
            </a>
          </p>
        )}
      </form>
    </div>
  );
}
