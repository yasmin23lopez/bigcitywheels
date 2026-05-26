"use client";

import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import Badge from "@/components/Badge";
import QuoteForm from "@/components/QuoteForm";
import TireIcon from "@/components/TireIcon";

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Visit Us",
    content: "4343 US-90, Crosby, TX 77532",
    action: { label: "Get Directions", href: "https://maps.google.com/?q=4343+US-90+Crosby+TX+77532" },
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    title: "Call Us",
    content: "(713) 561-5519",
    action: { label: "Call Now", href: "tel:7135615519" },
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    title: "Email Us",
    content: "bcwtires@gmail.com",
    action: { label: "Send Email", href: "mailto:bcwtires@gmail.com" },
  },
];

export default function Contact({ settings }: { settings?: any }) {
  const ref = useRef(null);

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden bg-[#3B3B3B]" ref={ref}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16 sm:mb-20">
          <Badge>Get In Touch</Badge>
          <h2 className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight">
            Let&apos;s Talk{" "}
            <span className="italic text-red" style={{ fontFamily: "var(--font-accent)" }}>Wheels</span>
          </h2>
          <p className="mt-4 font-body text-base sm:text-lg text-white/50 max-w-lg mx-auto">
            Walk-ins welcome. Se habla español.
          </p>
          <div className="mt-4 w-16 h-[2px] bg-red mx-auto" />
        </ScrollReveal>

        {/* Contact cards row */}
        <ScrollReveal className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {contactInfo.map((item, i) => (
              <a
                key={i}
                href={item.action.href}
                target={item.action.href.startsWith("http") ? "_blank" : undefined}
                rel={item.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group bg-white/[0.06] border border-white/[0.1] hover:border-red/30 p-6 sm:p-8 transition-all duration-300 hover:bg-white/[0.1] flex flex-col items-center text-center"
                style={{
                  clipPath: i === 0
                    ? "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)"
                    : i === 2
                    ? "polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)"
                    : undefined,
                }}
              >
                <div className="text-red mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h4 className="font-condensed text-xs font-bold tracking-[0.25em] uppercase text-white/50 mb-2">{item.title}</h4>
                <p className="font-body text-base text-white/70 mb-4">{item.content}</p>
                <span className="font-condensed text-[14px] tracking-[0.2em] uppercase text-red/90 group-hover:text-red transition-colors">
                  {item.action.label} →
                </span>
              </a>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <ScrollReveal direction="left">
            <div className="h-full min-h-[400px] relative">
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)",
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.5!2d-95.068!3d29.908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU0JzI5LjAiTiA5NcKwMDQnMDUuMCJX!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(30%)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Big City Wheels & Tires Location"
                />
              </div>
              {/* Hours overlay on map */}
              <div
                className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm border border-white/[0.08] px-5 py-4 z-10"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
                }}
              >
                <h4 className="font-condensed text-[14px] font-bold tracking-[0.3em] uppercase text-red mb-2">Hours</h4>
                <div className="font-body text-sm font-medium text-white/40 space-y-0.5">
                  <p>Mon–Fri: 8AM – 6PM</p>
                  <p>Sat: 8AM – 5PM</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal direction="right">
            <QuoteForm variant="section" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
