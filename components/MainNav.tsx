"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Expertise", href: "/expertise" },
  { label: "Heritage", href: "/heritage" },
  { label: "Contact", href: "/contact" },
];

export default function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Determine if we're on a dark-hero page (all pages have dark heroes)
  const isLightPage = false;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`main-nav ${isScrolled ? "is-scrolled" : ""} ${isLightPage && !isScrolled ? "is-light" : ""}`}
      >
        <Link href="/" className="nav-brand" aria-label="Buildings home">
          <span className="nav-brand-symbol" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="nav-brand-text">Buildings</span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href ? "is-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="nav-cta-btn">
            Start Your Project
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </Link>
        </nav>

        <button
          className="nav-hamburger"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <X size={24} strokeWidth={1.8} />
          ) : (
            <div className="nav-hamburger-lines">
              <span />
              <span />
              <span />
            </div>
          )}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-menu-panel"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className="mobile-menu-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                  <ChevronRight size={24} strokeWidth={1.8} />
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <Link
                href="/contact"
                className="mobile-menu-cta"
                onClick={() => setMenuOpen(false)}
              >
                Start Your Project
                <ArrowUpRight size={20} strokeWidth={2} />
              </Link>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
