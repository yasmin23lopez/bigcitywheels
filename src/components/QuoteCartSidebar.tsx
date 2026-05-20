"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuoteCart } from "./QuoteCartContext";
import TireIcon from "./TireIcon";

export default function QuoteCartSidebar() {
  const { items, removeItem, updateQuantity, clearCart, isOpen, setIsOpen, totalItems } = useQuoteCart();
  const [formState, setFormState] = useState({ name: "", phone: "", email: "", vehicle: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const itemsList = items
      .map((i) => `• ${i.quantity}x ${i.desc} (${i.part}) ${i.price ? `- ${i.price}` : ""}`)
      .join("\n");

    const data = {
      access_key: "6d3e4d22-8893-497a-bf83-c09db35d4dd2",
      subject: `Quote Request from ${formState.name}`,
      from_name: formState.name,
      phone: formState.phone,
      email: formState.email,
      vehicle: formState.vehicle,
      notes: formState.notes,
      products: itemsList,
    };

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        clearCart();
        setIsOpen(false);
        setFormState({ name: "", phone: "", email: "", vehicle: "", notes: "" });
      }, 3000);
    } catch {
      alert("Error sending quote. Please try again.");
    }
    setSending(false);
  };

  return (
    <>
      {/* Sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full sm:max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg font-bold uppercase tracking-wider text-gray-900">
                    Your Quote
                  </h2>
                  <span className="bg-red text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <img src="/logo.png" alt="" className="w-16 h-16 mx-auto opacity-15 mb-4" />
                    <p className="text-gray-400 text-sm">Your quote is empty. Add products from the catalog.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.part} className="flex gap-3 pb-4 border-b border-gray-100">
                        {item.image ? (
                          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                            <img src={item.image} alt={item.desc} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-gray-50 flex items-center justify-center">
                            <img src="/logo.png" alt="" className="w-8 h-8 opacity-15" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm font-bold text-gray-800 line-clamp-2">{item.desc}</p>
                          <p className="font-condensed text-[10px] tracking-[0.1em] uppercase text-gray-400 mt-0.5">{item.brand} · {item.part}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-gray-200 rounded">
                              <button
                                onClick={() => updateQuantity(item.part, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                              >−</button>
                              <span className="w-8 text-center text-sm font-bold text-gray-800">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.part, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                              >+</button>
                            </div>
                            <button onClick={() => removeItem(item.part)} className="text-xs text-red hover:text-red-dark font-bold uppercase">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quote form */}
              {items.length > 0 && (
                <div className="border-t border-gray-200 px-6 py-5 bg-gray-50">
                  {submitted ? (
                    <div className="text-center py-6">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="font-display text-lg font-bold text-gray-900 uppercase">Quote Sent!</p>
                      <p className="text-sm text-gray-500 mt-1">We&apos;ll get back to you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <p className="font-display text-sm font-bold uppercase tracking-wider text-gray-900 mb-3">Request Your Quote</p>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          required
                          type="text"
                          placeholder="Name *"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-red/50 placeholder:text-gray-400"
                        />
                        <input
                          required
                          type="tel"
                          placeholder="Phone *"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          className="px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-red/50 placeholder:text-gray-400"
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="Email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-red/50 placeholder:text-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Year, Make, Model"
                        value={formState.vehicle}
                        onChange={(e) => setFormState({ ...formState, vehicle: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-red/50 placeholder:text-gray-400"
                      />
                      <textarea
                        placeholder="Notes (optional)"
                        rows={2}
                        value={formState.notes}
                        onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-red/50 resize-none placeholder:text-gray-400"
                      />
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full bg-red hover:bg-red-dark text-white font-display font-bold text-sm tracking-[0.15em] uppercase py-3.5 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)" }}
                      >
                        {sending ? "Sending..." : "Submit Quote Request"}
                        <TireIcon className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
