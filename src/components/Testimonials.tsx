"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import Badge from "@/components/Badge";
import TireIcon from "@/components/TireIcon";

const reviews = [
  {
    name: "Carlos M.",
    vehicle: "2022 RAM 1500",
    rating: 5,
    text: "Best tire shop in the Crosby area. They mounted and balanced my 35s in under an hour. Fair prices and the guys really know their stuff. Will definitely be back for my alignment.",
    time: "2 weeks ago",
  },
  {
    name: "Jessica R.",
    vehicle: "2021 Chevy Tahoe",
    rating: 5,
    text: "Got a full set of Nitto Ridge Grapplers and new Fuel wheels installed. The truck looks amazing. They even helped me pick the right offset. Super professional team.",
    time: "1 month ago",
  },
  {
    name: "Miguel A.",
    vehicle: "2023 Ford F-250",
    rating: 5,
    text: "Had a 6-inch lift kit installed and the work was flawless. They took their time to make sure everything was perfect. The truck rides smooth and looks incredible.",
    time: "3 weeks ago",
  },
  {
    name: "David T.",
    vehicle: "2020 Toyota Tacoma",
    rating: 5,
    text: "These guys are the real deal. Came in for an alignment after hitting a pothole and they had me in and out. Truck drives straight as an arrow now. Great customer service.",
    time: "1 week ago",
  },
  {
    name: "Amanda L.",
    vehicle: "2022 Jeep Wrangler",
    rating: 5,
    text: "Bought mud terrains for my Jeep and they installed them same day. The staff was super friendly and even gave me advice on tire pressure for off-roading. Love this place!",
    time: "2 months ago",
  },
  {
    name: "Roberto S.",
    vehicle: "2021 Chevy Silverado 3500",
    rating: 5,
    text: "Big City hooked up my dually with American Force wheels. They look absolutely insane. The fitment is perfect and the ride quality is still great. 10/10 recommend.",
    time: "1 month ago",
  },
  {
    name: "Sarah K.",
    vehicle: "2023 GMC Sierra",
    rating: 4,
    text: "Got a leveling kit and new tires. The truck sits perfect now. Only reason for 4 stars is the wait time was a bit long, but the quality of work was excellent.",
    time: "3 months ago",
  },
  {
    name: "James W.",
    vehicle: "2020 Ford F-150",
    rating: 5,
    text: "Se habla español! That was a huge plus for my dad. They explained everything clearly and the prices were way better than the dealership. New tires and alignment done right.",
    time: "2 weeks ago",
  },
  {
    name: "Luis G.",
    vehicle: "2022 RAM 2500",
    rating: 5,
    text: "Third time coming here and they never disappoint. Just got 22-inch XD wheels with Toyo Open Country. The combo is fire. These guys are artists with trucks.",
    time: "1 month ago",
  },
  {
    name: "Brittany H.",
    vehicle: "2021 Nissan Titan",
    rating: 5,
    text: "Found them on Google and so glad I did. Professional, fast, and affordable. They mounted my Cooper AT3s and did an alignment. Truck handles like new. Highly recommend!",
    time: "3 weeks ago",
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

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = reviews[activeIndex];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="relative py-24 sm:py-32 bg-[#3B3B3B] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <Badge>Reviews</Badge>
          <h2 className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight">
            What Our Customers Say
          </h2>
          <div className="mt-4 w-16 h-[2px] bg-red mx-auto" />
        </ScrollReveal>

        {/* Container with background image */}
        <div className="relative overflow-hidden p-4 sm:p-6 lg:p-8">
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
                className="w-full lg:w-[55%] bg-background/90 backdrop-blur-sm border border-white/[0.08] p-8 sm:p-10 lg:p-12 flex flex-col justify-between"
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
                          <p className="font-display text-sm font-bold uppercase tracking-wider text-white">{current.name}</p>
                          <p className="font-body text-xs text-white/30 mt-0.5">{current.vehicle}</p>
                        </div>
                      </div>
                      <Stars count={current.rating} />
                    </div>

                    {/* Quote */}
                    <svg className="w-8 h-8 text-red/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                    </svg>
                    <p className="font-body text-base sm:text-lg text-white/60 leading-relaxed">
                      &ldquo;{current.text}&rdquo;
                    </p>

                    <p className="font-body text-xs text-white/20 mt-4">{current.time}</p>
                  </div>

                  {/* Navigation + CTA */}
                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/[0.06]">
                    <div className="flex gap-2">
                      <button
                        onClick={handlePrev}
                        className="w-10 h-10 bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center text-white/40 hover:text-white transition-all"
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNext}
                        className="w-10 h-10 bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center text-white/40 hover:text-white transition-all"
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
