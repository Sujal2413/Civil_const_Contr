"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  isScrolled?: boolean;
}

function MagneticNavLink({
  item,
  isActive,
  onSelect
}: {
  item: NavItem;
  isActive: boolean;
  onSelect: (name: string) => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  function handlePointerMove(event: React.MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    x.set(offsetX * 0.12);
    y.set(offsetY * 0.18);
  }

  function resetPointer() {
    x.set(0);
    y.set(0);
  }

  return (
    <Link
      href={item.url}
      onClick={() => onSelect(item.name)}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
      className={cn("floating-nav-link", isActive && "is-active")}
    >
      {isActive ? (
        <motion.span
          layoutId="nav-active-pill"
          className="floating-nav-active-bg"
          transition={{ type: "spring", stiffness: 240, damping: 24 }}
        />
      ) : null}
      <motion.span className="floating-nav-link-copy" style={{ x: springX, y: springY }}>
        {item.name}
      </motion.span>
    </Link>
  );
}

export function NavBar({ items, className, isScrolled = false }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name ?? "");

  return (
    <motion.nav
      className={cn("floating-nav", isScrolled && "is-scrolled", className)}
      initial={{ opacity: 0, scale: 0.92, y: -18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Section navigation"
    >
      <div className="floating-nav-shell">
        {items.map((item) => {
          const isActive = activeTab === item.name;

          return (
            <MagneticNavLink
              key={item.name}
              item={item}
              isActive={isActive}
              onSelect={setActiveTab}
            />
          );
        })}
      </div>
    </motion.nav>
  );
}
