"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VideoSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={sectionRef} className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
      {/* Video background with parallax */}
      <motion.div style={{ y: videoY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video/video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Content overlay */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-display text-sm font-bold tracking-[0.4em] uppercase text-red">
            Crosby, Texas
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[0.9]">
            Where your truck
            <br />
            gets the <span style={{ fontFamily: "var(--font-accent)" }}>treatment</span>
            <br />
            it deserves.
          </h2>
          <p className="mt-6 text-sm sm:text-base text-white/50 max-w-md mx-auto font-medium">
            Tires, rims, lift kits & alignment — done right, priced fair.
          </p>
          <a
            href="tel:7135615519"
            className="mt-8 inline-flex items-center gap-3 bg-red hover:bg-red-dark text-white font-display font-bold text-sm tracking-[0.15em] uppercase px-8 py-4 transition-colors duration-300"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
            }}
          >
            Call Now · (713) 561-5519
          </a>
        </motion.div>
      </div>
    </section>
  );
}
