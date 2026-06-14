"use client";

import { useEffect, useRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import type { HomeContent } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type CinematicFooterProps = {
  content: HomeContent;
};

function useMagneticElement<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const handleMouseMove = (event: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
          x: x * 0.22,
          y: y * 0.22,
          rotationX: -y * 0.06,
          rotationY: x * 0.06,
          scale: 1.035,
          duration: 0.36,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.9,
          ease: "elastic.out(1, 0.36)"
        });
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, element);

    return () => ctx.revert();
  }, []);

  return ref;
}

function MagneticAnchor({
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useMagneticElement<HTMLAnchorElement>();

  return (
    <a ref={ref} className={`footer-glass-pill ${className ?? ""}`} {...props}>
      {children}
    </a>
  );
}

function MagneticButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useMagneticElement<HTMLButtonElement>();

  return (
    <button ref={ref} className={`footer-glass-pill ${className ?? ""}`} {...props}>
      {children}
    </button>
  );
}

function MarqueeRow({ content }: CinematicFooterProps) {
  const items = [
    content.footer.summary,
    content.footer.address,
    content.footer.contact.phone,
    content.footer.contact.email,
    ...content.navigation.slice(0, 4).map((item) => item.label)
  ];

  return (
    <div className="footer-marquee-row">
      {[...items, ...items].map((item, index) => (
        <span key={`${item}-${index}`}>
          {item}
          <i aria-hidden="true">✦</i>
        </span>
      ))}
    </div>
  );
}

export function CinematicFooter({ content }: CinematicFooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.86, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1
          }
        }
      );

      gsap.fromTo(
        [summaryRef.current, linksRef.current],
        { y: 54, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 54%",
            end: "top 8%",
            scrub: 1
          }
        }
      );
    }, wrapper);

    return () => ctx.revert();
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div
      id="footer"
      ref={wrapperRef}
      className="cinematic-footer-reveal"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <footer className="site-footer cinematic-footer">
        <div className="footer-aurora" aria-hidden="true" />
        <div className="footer-bg-grid" aria-hidden="true" />
        <div ref={giantTextRef} className="footer-giant-bg-text" aria-hidden="true">
          Buildings
        </div>

        <div className="footer-marquee" aria-hidden="true">
          <MarqueeRow content={content} />
        </div>

        <div className="container cinematic-footer-main">
          <div ref={summaryRef} className="cinematic-footer-summary">
            <a className="brand footer-brand" href="#top" aria-label="Buildings home">
              <span className="brand-symbol" aria-hidden="true">
                <span />
                <span />
              </span>
              <span className="brand-text">Buildings</span>
            </a>
            <p>{content.footer.summary}</p>
          </div>

          <div ref={linksRef} className="cinematic-footer-pills">
            <div className="footer-detail-pill footer-glass-pill">
              <span>Address</span>
              <p>{content.footer.address}</p>
            </div>
            <div className="footer-detail-pill footer-glass-pill">
              <span>Contact</span>
              <p>
                <a href={`tel:${content.footer.contact.phone.replace(/\s/g, "")}`}>
                  {content.footer.contact.phone}
                </a>
                <a href={`mailto:${content.footer.contact.email}`}>
                  {content.footer.contact.email}
                </a>
              </p>
            </div>
            <nav className="footer-detail-pill footer-glass-pill" aria-label="Footer navigation">
              <span>Navigation</span>
              <div>
                {content.navigation.slice(0, 4).map((item) => (
                  <MagneticAnchor key={item.href} href={item.href} className="footer-mini-link">
                    {item.label}
                    <ArrowUpRight size={14} />
                  </MagneticAnchor>
                ))}
              </div>
            </nav>
            <div className="footer-detail-pill footer-glass-pill">
              <span>Social</span>
              <div>
                {content.footer.social.map((item) => (
                  <MagneticAnchor key={item} href="#top" className="footer-mini-link">
                    {item}
                    <ArrowUpRight size={14} />
                  </MagneticAnchor>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container cinematic-footer-bottom">
          <span>Created by dianadia © 2026</span>
          <span>Built in Framer spirit, rebuilt in Next.js</span>
          <MagneticButton
            type="button"
            className="footer-top-button"
            aria-label="Back to top"
            onClick={scrollToTop}
          >
            <ArrowUp size={19} />
          </MagneticButton>
        </div>
      </footer>
    </div>
  );
}
