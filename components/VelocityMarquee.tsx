"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame, useMotionValue } from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function VelocityMarquee() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [1, 5], { clamp: false });

  // Soft loop controller over the absolute coordinates bounds
  const x = useTransform(baseX, (v: number) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  const baseVelocity = -2;

  useAnimationFrame((time, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    // Accelerate the track array relative to layout scroll velocity spikes
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const items = ["100+ PROJECTS", "100% COMMITMENT", "15 YEARS OF EXCELLENCE", "24/7 SITE COORDINATION"];

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap bg-[#0C0C0C] text-[#E5E5E7] py-6 font-bold tracking-[0.1em] text-sm md:text-base border-y border-[#353534]">
      <motion.div className="flex whitespace-nowrap gap-20 uppercase" style={{ x }}>
        {[...Array(4)].map((_, outerIdx) => (
          <span key={outerIdx} className="flex gap-20">
            {items.map((item, innerIdx) => (
              <span key={innerIdx} className="mx-4 flex items-center">
                {item} <span className="ml-20 text-[#353534] font-normal">//</span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
