"use client";

import * as React from "react";
import {
  motion,
  type MotionStyle,
  type Variants,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";

type HeroAction = {
  text: string;
  href: string;
  icon?: React.ReactNode;
  onMouseMove?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
};

type AnimatedHeroProps = {
  backgroundImageUrl: string;
  title: string;
  description: string;
  ctaButton: HeroAction;
  secondaryCta?: HeroAction;
  className?: string;
  rippleActive?: boolean;
};

/* stagger children into view */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.35, staggerChildren: 0.12 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const bottomVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.6, staggerChildren: 0.12 }
  }
};

const bottomItem: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

/* split title into word-level reveal */
function renderTitle(title: string) {
  return title.split(" ").map((word, index) => (
    <motion.span className="framer-hero-word" variants={itemVariants} key={`${word}-${index}`}>
      {word}
    </motion.span>
  ));
}

function renderAction(action: HeroAction, className: string) {
  return (
    <a
      className={className}
      href={action.href}
      onMouseMove={action.onMouseMove}
      onMouseEnter={action.onMouseEnter}
      onMouseLeave={action.onMouseLeave}
    >
      <span className="hero-button-shine" aria-hidden="true" />
      {action.text}
      {action.icon}
    </a>
  );
}

export function AnimatedHero({
  backgroundImageUrl,
  title,
  description,
  ctaButton,
  secondaryCta,
  className,
  rippleActive = false
}: AnimatedHeroProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  /* subtle parallax on background image */
  const bgX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-14, 14]), {
    stiffness: 80,
    damping: 22
  });
  const bgY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-10, 10]), {
    stiffness: 80,
    damping: 22
  });

  const bgStyle: MotionStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    x: bgX,
    y: bgY
  };

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      className={`framer-hero ${className ?? ""}`}
      id="top"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* background photo with parallax */}
      <motion.div
        className="framer-hero-photo"
        aria-hidden="true"
        style={bgStyle}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* subtle vignette for contrast */}
      <div className="framer-hero-vignette" aria-hidden="true" />

      {/* top-left title block */}
      <motion.div
        className="framer-hero-title-block"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="framer-hero-title" aria-label={title} variants={containerVariants}>
          {renderTitle(title)}
        </motion.h1>
      </motion.div>

      {/* bottom-right description + CTA */}
      <motion.div
        className="framer-hero-bottom-block"
        variants={bottomVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="framer-hero-description" variants={bottomItem}>
          {description}
        </motion.p>
        <motion.div className="framer-hero-actions" variants={bottomItem}>
          {renderAction(ctaButton, "magnetic-button framer-hero-cta")}
          {secondaryCta
            ? renderAction(secondaryCta, "framer-hero-secondary-cta")
            : null}
        </motion.div>
      </motion.div>
    </section>
  );
}
