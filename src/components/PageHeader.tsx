"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Badge from "@/components/Badge";

export default function PageHeader({
  badge,
  title,
  subtitle,
  image,
}: {
  badge: string;
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative pt-52 sm:pt-60 pb-20 sm:pb-28 bg-black overflow-hidden">
      {/* Background image */}
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        </>
      )}
      {!image && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(254,56,48,0.06)_0%,transparent_60%)]" />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge>{badge}</Badge>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-7xl font-bold uppercase tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 font-body text-base sm:text-lg text-white/40 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          <div className="mt-6 w-20 h-[2px] bg-red mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
