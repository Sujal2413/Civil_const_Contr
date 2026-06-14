"use client";

import React, { useEffect, useRef } from "react";
import { useInView, motion, useSpring, useTransform } from "framer-motion";

function Counter({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const springValue = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  const displayValue = useTransform(springValue, (current) => {
    return `${prefix}${Math.floor(current)}${suffix}`;
  });

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

export default function StitchStats() {
  return (
    <section className="py-20 bg-[#1d100c] px-5 md:px-10 lg:px-20 text-center">
      <span className="font-['JetBrains_Mono'] text-[12px] text-[#a98a80] uppercase tracking-[0.2em] block mb-12">
        Key Performance Indicators
      </span>
      <div className="space-y-16">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
        >
          <div className="font-['Inter'] text-[48px] md:text-[80px] font-bold text-[#ff6c2f] mb-2 leading-[1.1]">
            <Counter value={25} suffix="+" />
          </div>
          <div className="font-['JetBrains_Mono'] text-[12px] text-[#e1bfb4] tracking-[0.05em]">TRUSTED PARTNERS</div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="font-['Inter'] text-[48px] md:text-[80px] font-bold text-[#ff6c2f] mb-2 leading-[1.1]">
            <Counter value={15} prefix="₹" suffix="Cr+" />
          </div>
          <div className="font-['JetBrains_Mono'] text-[12px] text-[#e1bfb4] tracking-[0.05em]">PROJECTS DELIVERED</div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="font-['Inter'] text-[48px] md:text-[80px] font-bold text-[#ff6c2f] mb-2 leading-[1.1]">
            <Counter value={90} suffix="%" />
          </div>
          <div className="font-['JetBrains_Mono'] text-[12px] text-[#e1bfb4] tracking-[0.05em]">CLIENT SATISFACTION RATE</div>
        </motion.div>
      </div>
    </section>
  );
}
