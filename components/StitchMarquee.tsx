"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame, useMotionValue } from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="font-['Inter'] font-bold text-2xl tracking-tighter flex whitespace-nowrap flex-nowrap items-center" style={{ x }}>
        <span className="block mr-16">{children}</span>
        <span className="block mr-16">{children}</span>
        <span className="block mr-16">{children}</span>
        <span className="block mr-16">{children}</span>
      </motion.div>
    </div>
  );
}

export default function StitchMarquee() {
  return (
    <section className="py-12 bg-[#170b07] overflow-hidden border-b border-white/10">
      <div className="px-5 md:px-10 lg:px-20 mb-4">
        <span className="font-['JetBrains_Mono'] text-[12px] text-[#a98a80] uppercase tracking-[0.2em]">100+ projects, 100% commitment</span>
      </div>
      <ParallaxText baseVelocity={-2}>
        <div className="flex gap-16 items-center px-8 text-[#e1bfb4] pointer-events-none select-none">
          <span>CONSTRUCTION</span>
          <span>INFRASTRUCTURE</span>
          <span>ENGINEERING</span>
          <span>DEVELOPERS</span>
          <span>BUILDERS</span>
          <span>PROJECTS</span>
        </div>
      </ParallaxText>
    </section>
  );
}
