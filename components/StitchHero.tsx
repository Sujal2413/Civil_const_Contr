"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            style={{ position: "relative", display: "inline-block" }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default function StitchHero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 200]);

    return (
        <section className="relative h-screen min-h-[600px] flex flex-col justify-end pb-12 px-5 md:px-10 lg:px-20 overflow-hidden bg-[#1d100c]">
            <motion.div style={{ y }} className="absolute inset-0 z-0 overflow-hidden">
                <video 
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover absolute top-0 left-0" 
                    src="/hero-video-lossless.mp4?v=1" 
                />
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 max-w-2xl"
            >
                <h1 className="font-['Inter'] text-[48px] md:text-[80px] text-white font-bold mb-6 leading-[1.1] tracking-[-0.04em]">
                    Building spaces to live, work, and thrive.
                </h1>
                <p className="font-['Inter'] text-[18px] text-[#e1bfb4] mb-8 max-w-md leading-[1.6]">
                    Expert builders delivering homes, offices, and commercial spaces that stand the test of time.
                </p>
                
                <MagneticButton>
                    <button className="bg-[#ff6c2f] text-[#5d1c00] px-8 py-4 font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-[4px]">
                        START YOUR PROJECT
                    </button>
                </MagneticButton>
            </motion.div>
        </section>
    );
}
