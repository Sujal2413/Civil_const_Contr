"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type HeroLoaderProps = {
  isReady: boolean;
};

export default function HeroLoader({ isReady }: HeroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fast initial progress just to show it's working
      const fakeProgress = { val: 0 };
      gsap.to(fakeProgress, {
        val: 85,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => setProgress(Math.round(fakeProgress.val)),
      });

      // When canvas is actually ready, speed to 100% and exit
      if (isReady) {
        gsap.to(fakeProgress, {
          val: 100,
          duration: 0.4,
          ease: "power2.inOut",
          onUpdate: () => setProgress(Math.round(fakeProgress.val)),
          onComplete: () => {
            gsap.to(containerRef.current, {
              clipPath: "inset(0% 0% 100% 0%)",
              duration: 0.8,
              ease: "power4.inOut",
              delay: 0.1,
            });
            gsap.to(textRef.current, {
              y: -50,
              opacity: 0,
              duration: 0.4,
              ease: "power2.in",
            });
          },
        });
      }
    });

    return () => ctx.revert();
  }, [isReady]);

  return (
    <div ref={containerRef} className="hero-loader">
      <div ref={textRef} className="loader-content">
        <div className="loader-number">{progress}%</div>
        <div className="loader-text">Loading Assets</div>
      </div>
    </div>
  );
}
