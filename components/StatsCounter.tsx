"use client";
import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, animate } from "framer-motion";

interface CounterProps {
  value: number;
}

function Counter({ value }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

export default function StatsSection() {
  const targetStats = [
    { label: "Trusted Partners", value: 45, suffix: "+" },
    { label: "Projects Delivered", value: 120, prefix: "£", suffix: "M+" },
    { label: "Client Satisfaction Rate", value: 100, suffix: "%" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20 px-6 max-w-7xl mx-auto bg-[#000000]">
      {targetStats.map((stat, idx) => (
        <div 
          key={idx} 
          className="relative border-l border-[#353534] pl-8 py-6 bg-[#0C0C0C] hover:bg-[#131313] transition-colors duration-300"
        >
          {/* Subtle rim light accent on hover, as defined in Stitch rules */}
          <div className="absolute top-0 left-0 w-[2px] h-full bg-[#007AFF] opacity-0 hover:opacity-100 transition-opacity duration-300" />
          
          <h3 className="text-5xl font-extrabold text-white tracking-tight mb-2">
            {stat.prefix}
            <Counter value={stat.value} />
            {stat.suffix}
          </h3>
          <p className="text-xs text-[#8e9192] font-bold uppercase tracking-[0.1em]">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
