"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import Badge from "@/components/Badge";
import TireIcon from "@/components/TireIcon";

const reviews = [
  {
    name: "Jesus Torres",
    vehicle: "2021 Chevy Silverado 3500",
    rating: 5,
    text: "Big City hooked up my dually with American Force wheels. They look absolutely insane. The fitment is perfect and the ride quality is still great. 10/10 recommend.",
    time: "2 weeks ago",
  },
  {
    name: "Mario Ruiz del Sol Gonzalez",
    vehicle: "",
    rating: 5,
    text: "Muy buena atención al cliente, te explican todo sin hacerte sentir perdido. Se nota que saben lo que hacen.",
    time: "2 weeks ago",
  },
  {
    name: "Ana Karina Tejeda Ortiz",
    vehicle: "",
    rating: 5,
    text: "Excellent experience from start to finish. The team explained everything clearly and got the job done quickly.",
    time: "2 weeks ago",
  },
  {
    name: "Gustavo Adolfo Pérez Bolaños",
    vehicle: "",
    rating: 5,
    text: "Best tire shop around. Honest pricing and quality work. I'll definitely be coming back.",
    time: "2 weeks ago",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-yellow-400" : "text-white/10"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ reviews: sanityReviews }: { reviews?: { name: string; vehicle: string; rating: number; text: string; time: string }[] | null }) {
  const reviewData = sanityReviews && sanityReviews.length > 0 ? sanityReviews : reviews;
  const [activeIndex, setActiveIndex] = useState(0);
  const current = reviewData[activeIndex];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % reviewData.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + reviewData.length) % reviewData.length);

  return (
    <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <Badge>Reviews</Badge>
          <h2 className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-gray-900">
            What Our Customers Say
          </h2>
          <div className="mt-4 w-16 h-[2px] bg-red mx-auto" />
        </ScrollReveal>

        {/* Container with background image */}
        <div className="relative overflow-hidden p-4 sm:p-6 lg:p-8" style={{ clipPath: "polygon(0% 12px, 12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px))" }}>
          {/* Background image — tire shop / truck vibes */}
          <Image
            src="/img/tyres.jpg"
            alt="Tires"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Card on the right — only this animates */}
          <div className="relative z-10 flex justify-end min-h-[400px] sm:min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full lg:w-[55%] bg-white p-8 sm:p-10 lg:p-14 flex flex-col justify-between shadow-2xl"
                style={{ clipPath: "polygon(0% 12px, 12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px))" }}
              >
                  <div>
                    {/* Author + rating */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red/10 border border-red/20 flex items-center justify-center font-display text-lg font-bold text-red"
                          style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}
                        >
                          {current.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-display text-base font-bold uppercase tracking-wider text-gray-900">{current.name}</p>
                          <p className="font-body text-sm text-gray-400 mt-0.5">{current.vehicle}</p>
                        </div>
                      </div>
                      <Stars count={current.rating} />
                    </div>

                    {/* Quote */}
                    <svg className="w-8 h-8 text-red/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                    </svg>
                    <p className="font-body text-lg sm:text-xl text-gray-700 leading-relaxed">
                      &ldquo;{current.text}&rdquo;
                    </p>

                    <p className="font-body text-sm text-gray-400 mt-4">{current.time}</p>
                  </div>

                  {/* Navigation + CTA */}
                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
                    <div className="flex gap-2">
                      <button
                        onClick={handlePrev}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all"
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNext}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all"
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    <a
                      href="https://share.google/jt8xoS89YKj3WaMtm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 bg-red hover:bg-red-dark text-white font-condensed font-semibold text-xs tracking-[0.15em] uppercase px-5 py-3 transition-all duration-300"
                      style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)" }}
                    >
                      View All Reviews
                      <TireIcon className="w-3.5 h-3.5 transition-transform duration-1000 group-hover:rotate-[360deg]" />
                    </a>
                  </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
