"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollIndicator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Infinite bouncing animation
      gsap.to(arrowRef.current, {
        y: 8,
        duration: 0.8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Fade out on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%", // Start fading when scrolled down slightly
        end: "+=200",
        scrub: true,
        animation: gsap.to(containerRef.current, {
          opacity: 0,
          y: -20,
          ease: "power1.inOut",
        }),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="scroll-indicator" aria-hidden="true">
      <div className="scroll-indicator-mouse">
        <div ref={arrowRef} className="scroll-indicator-wheel" />
      </div>
    </div>
  );
}
