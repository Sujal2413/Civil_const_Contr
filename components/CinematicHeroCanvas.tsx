"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BuildingsHeroScene = dynamic(() => import("./BuildingsHeroScene"), {
  ssr: false,
});

export default function CinematicHeroCanvas({ onReady }: { onReady: () => void }) {
  const [isLowPower, setIsLowPower] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState(0); // 0 = dawn, 0.5 = midday, 1 = night
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect low-power devices or reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    
    if (prefersReducedMotion || hardwareConcurrency <= 2 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      setIsLowPower(true);
      onReady(); // Immediately ready for fallback
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scroll-driven time of day
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=1000",
        scrub: true,
        onUpdate: (self) => {
          setTimeOfDay(self.progress);
        },
      });
    });

    const handlePointerMove = (e: PointerEvent) => {
      setPointer({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      ctx.revert();
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [onReady]);

  if (isLowPower) {
    return (
      <div className="hero-photo" aria-hidden="true">
        <Image 
          src="/assets/hero-crane-sunset.png" 
          alt="Construction site at sunset" 
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="cinematic-canvas-container" aria-hidden="true">
      <BuildingsHeroScene 
        onReady={onReady} 
        timeOfDay={timeOfDay} 
        pointer={pointer} 
      />
    </div>
  );
}
