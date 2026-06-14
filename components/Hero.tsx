import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  
  // Layer 0: Sky (moves slower)
  const skyY = useTransform(scrollY, [0, 1000], [0, 200]);
  
  // Layer 1: Crane/Buildings (moves faster)
  // Since we only have one image currently, we'll apply a subtle parallax to the whole background 
  // to simulate depth, but when segmented images are available, they can be separated here.
  const craneY = useTransform(scrollY, [0, 1000], [0, 500]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#000000]">
      {/* 1. Ambient Background Media Layer (Parallax) */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: skyY }}
      >
        <img 
          src="/assets/hero-crane-sunset.png" 
          alt="Architectural Skyline" 
          className="w-full h-full object-cover object-bottom opacity-80"
        />
        {/* Soft vignette overlay to maximize text contrast based on Stitch Obsidian palette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/60 via-transparent to-[#000000]" />
      </motion.div>

      {/* 2. Foreground Content Layer (Positioned directly under nav) */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-start pt-40 px-6 sm:px-8">
        
        {/* Animated Masked Headline */}
        <div className="overflow-hidden mb-6">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.2 }}
            className="text-6xl md:text-8xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.05] drop-shadow-md mix-blend-difference"
          >
            Building spaces to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mix-blend-normal">
              live, work, and thrive.
            </span>
          </motion.h1>
        </div>

        {/* Animated Subheadline */}
        <div className="overflow-hidden mb-10">
          <motion.p 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.2, delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-300 max-w-2xl font-light tracking-wide"
          >
            Expert builders delivering homes, offices, and commercial spaces that stand the test of time.
          </motion.p>
        </div>

        {/* Magnetic/Interactive CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a 
            href="#contact" 
            className="inline-flex items-center gap-3 bg-white text-black text-sm tracking-[0.1em] font-bold px-10 py-5 rounded-sm hover:bg-[#E5E5E7] transition-all duration-300 hover:scale-[1.02]"
          >
            START YOUR PROJECT
            <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
              ↗
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
