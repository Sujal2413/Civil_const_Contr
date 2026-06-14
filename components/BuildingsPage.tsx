"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  Fragment
} from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight
} from "lucide-react";
import type { HomeContent, ProofStat, Project, Service } from "@/lib/content";
import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { LogoAllReno, LogoCareer, LogoChema, LogoEnergyMax, LogoGretta, LogoInsure } from "@/components/ui/logos";



type BuildingsPageProps = {
  content: HomeContent;
};

function moveMagneticButton(event: ReactMouseEvent<HTMLAnchorElement>) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;

  target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  target.style.setProperty("--my", `${event.clientY - rect.top}px`);
  target.style.transform = `translate3d(${x * 0.08}px, ${y * 0.18}px, 0)`;
}

function resetMagneticButton(event: ReactMouseEvent<HTMLAnchorElement>) {
  event.currentTarget.style.transform = "translate3d(0, 0, 0)";
}

function CountUpStat({ stat }: { stat: ProofStat }) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 120, damping: 22, mass: 0.8 });
  const [label, setLabel] = useState(`${stat.prefix ?? ""}0${stat.suffix}`);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, stat.target, {
      duration: 1.45,
      ease: [0.22, 1, 0.36, 1]
    });

    return () => controls.stop();
  }, [count, isInView, stat.target]);

  useMotionValueEvent(spring, "change", (latest) => {
    setLabel(`${stat.prefix ?? ""}${Math.round(latest)}${stat.suffix}`);
  });

  return (
    <article className="framer-stat-card reveal" key={stat.label}>
      <strong ref={ref}>{label}</strong>
      <span>{stat.label}</span>
    </article>
  );
}

function ProjectCard({
  project,
  onMagneticMove,
  onMagneticLeave
}: {
  project: Project;
  onMagneticMove: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
  onMagneticLeave: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
}) {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const imageX = useTransform(tiltY, [-9, 9], [-10, 10]);
  const imageY = useTransform(tiltX, [-8, 8], [8, -8]);
  const sheenX = useMotionValue(50);
  const rotateX = useSpring(tiltX, { stiffness: 180, damping: 18, mass: 0.6 });
  const rotateY = useSpring(tiltY, { stiffness: 180, damping: 18, mass: 0.6 });
  const shine = useSpring(sheenX, { stiffness: 110, damping: 18, mass: 0.4 });
  const shinePosition = useTransform(shine, (value) => `${value}%`);

  function handleMouseMove(event: ReactMouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const percentX = (event.clientX - rect.left) / rect.width;
    const percentY = (event.clientY - rect.top) / rect.height;
    const deltaX = percentX - 0.5;
    const deltaY = percentY - 0.5;

    tiltX.set(deltaY * -9);
    tiltY.set(deltaX * 12);
    sheenX.set(percentX * 100);
  }

  function handleMouseLeave() {
    tiltX.set(0);
    tiltY.set(0);
    sheenX.set(50);
  }

  return (
    <motion.article
      className="project-framer-card reveal project-tilt-card"
      key={project.title}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          rotateX,
          rotateY,
          "--sheen-x": shinePosition
        } as CSSProperties
      }
    >
      <motion.div className="project-image-wrap" aria-hidden="true" style={{ x: imageX, y: imageY }}>
        <Image src={project.image} alt="" fill sizes="(max-width: 760px) 90vw, 40vw" />
      </motion.div>
      <div className="project-copy-framer">
        <span className="project-index">{project.index}</span>
        <h3>{project.title}</h3>
        <p className="project-meta">{project.location}. {project.year}</p>
        <a className="project-read-more" href="#contact">
          READ MORE
        </a>
      </div>
    </motion.article>
  );
}

const serviceImages = [
  "/assets/hero-crane-sunset.png",
  "/assets/riverside-business-centre.png",
  "/assets/gateway-industrial-park.png",
  "/assets/oakwood-residential.png"
];

function ServiceCard({
  service,
  index
}: {
  service: Service;
  index: number;
}) {
  return (
    <article className="framer-service-card reveal">
      <h3>{service.title}</h3>
      <div className="framer-service-image">
        <Image src={serviceImages[index % serviceImages.length]} alt={service.title} fill sizes="(max-width: 760px) 100vw, 45vw" />
      </div>
      <p>{service.body}</p>
    </article>
  );
}

export default function BuildingsPage({ content }: BuildingsPageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [heroRippleActive, setHeroRippleActive] = useState(false);
  const tickerRef = useRef<HTMLElement | null>(null);

  const tickerItems = useMemo(
    () => [...content.tickerStats, ...content.tickerStats],
    [content.tickerStats]
  );


  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 36);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!tickerRef.current) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let lastY = window.scrollY;
    let lastTime = performance.now();

    const updateTickerMomentum = () => {
      const now = performance.now();
      const deltaY = window.scrollY - lastY;
      const deltaTime = Math.max(16, now - lastTime);
      const velocity = Math.min(1.8, Math.abs(deltaY / deltaTime) * 12);
      const skew = Math.max(-10, Math.min(10, deltaY * -0.12));

      tickerRef.current?.style.setProperty("--ticker-skew", `${skew.toFixed(2)}deg`);
      tickerRef.current?.style.setProperty(
        "--ticker-duration",
        `${Math.max(15, 24 - velocity * 5).toFixed(2)}s`
      );

      lastY = window.scrollY;
      lastTime = now;

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        tickerRef.current?.style.setProperty("--ticker-skew", "0deg");
        tickerRef.current?.style.setProperty("--ticker-duration", "24s");
      }, 150);
    };

    updateTickerMomentum();
    window.addEventListener("scroll", updateTickerMomentum, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateTickerMomentum);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.78,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%"
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".manifesto-line").forEach((line) => {
        gsap.to(line, {
          color: "#101010",
          ease: "none",
          scrollTrigger: {
            trigger: line,
            start: "top 78%",
            end: "bottom 52%",
            scrub: true
          }
        });
      });

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.fromTo(
          card.querySelector(".project-image-wrap"),
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%"
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  function showPreviousTestimonial() {
    setActiveTestimonial((current) =>
      current === 0 ? content.testimonials.length - 1 : current - 1
    );
  }

  function showNextTestimonial() {
    setActiveTestimonial((current) =>
      current === content.testimonials.length - 1 ? 0 : current + 1
    );
  }

  function handleHeroActionLeave(event: ReactMouseEvent<HTMLAnchorElement>) {
    setHeroRippleActive(false);
    resetMagneticButton(event);
  }

  const activeQuote = content.testimonials[activeTestimonial];

  return (
    <main className="buildings-shell">
      {/* ── Framer-style horizontal navbar ── */}
      <motion.header
        className={`framer-nav ${isScrolled ? "is-scrolled" : ""}`}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <a className="framer-brand" href="#top" aria-label="Buildings home">
          <span className="framer-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 28 28" fill="none">
              <rect x="2" y="8" width="10" height="18" rx="2" fill="currentColor" />
              <rect x="14" y="2" width="12" height="24" rx="2" fill="currentColor" opacity="0.6" />
            </svg>
          </span>
          <span className="framer-brand-text">Buildings</span>
        </a>

        <nav className="framer-nav-links" aria-label="Primary navigation">
          {content.navigation
            .filter((item) => item.label !== "Contact us")
            .map((item) => (
              <a key={item.href} href={item.href} className="framer-nav-link">
                {item.label}
              </a>
            ))}
        </nav>

        <div className="framer-nav-actions">
          <a href="#projects" className="framer-nav-btn framer-nav-btn--outline">
            Our Work
          </a>
          <a href="#contact" className="framer-nav-btn framer-nav-btn--solid">
            Contact Us
          </a>
        </div>

        {/* Mobile hamburger */}
        <motion.button
          className="hamburger"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <motion.line
              x1="7" y1="10" x2="25" y2="10"
              animate={menuOpen ? { x1: 9, y1: 9, x2: 23, y2: 23 } : { x1: 7, y1: 10, x2: 25, y2: 10 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            />
            <motion.line
              x1="7" y1="16" x2="25" y2="16"
              animate={menuOpen ? { opacity: 0.3, scaleX: 0.2 } : { opacity: 1, scaleX: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              style={{ transformOrigin: "50% 50%" }}
            />
            <motion.line
              x1="7" y1="22" x2="25" y2="22"
              animate={menuOpen ? { x1: 9, y1: 23, x2: 23, y2: 9 } : { x1: 7, y1: 22, x2: 25, y2: 22 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            />
          </svg>
        </motion.button>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            className="menu-panel"
            aria-label="Primary navigation"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            {content.navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
                <ChevronRight size={18} strokeWidth={1.7} />
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <AnimatedHero
        backgroundImageUrl="/assets/hero-crane-sunset.png"
        title={content.hero.title}
        description={content.hero.body}
        ctaButton={{
          text: content.hero.cta,
          href: "#contact",
          icon: <ArrowUpRight size={18} strokeWidth={1.9} />,
          onMouseMove: moveMagneticButton,
          onMouseEnter: () => setHeroRippleActive(true),
          onMouseLeave: handleHeroActionLeave
        }}
        rippleActive={heroRippleActive}
      />

      <section className="logo-ticker" aria-label="Our Partners">
        <div className="logo-ticker-header">
          <p>100+ projects, 100% commitment.</p>
        </div>
        <div className="logo-ticker-track-container">
          <div className="logo-ticker-track">
            {/* We duplicate the logos array to ensure a seamless infinite loop */}
            {[...Array(2)].map((_, i) => (
              <Fragment key={i}>
                <LogoGretta className="client-logo" />
                <LogoEnergyMax className="client-logo" />
                <LogoCareer className="client-logo" />
                <LogoAllReno className="client-logo" />
                <LogoChema className="client-logo" />
                <LogoInsure className="client-logo" />
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="section framer-projects-section" id="projects">
        <div className="container">
          <div className="framer-projects-header reveal">
            <h2>Projects built with<br/>care and precision.</h2>
            <a className="framer-orange-pill" href="#projects">
              VIEW ALL PROJECTS
            </a>
          </div>
        </div>
        <div className="framer-projects-track-wrapper">
          <div className="framer-projects-track">
            {content.projects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onMagneticMove={moveMagneticButton}
                onMagneticLeave={resetMagneticButton}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section framer-about-section" id="about">
        <div className="container">
          <div className="framer-stats-container reveal">
            <h3 className="framer-stats-title">DID YOU KNOW?</h3>
            <div className="framer-stats-grid">
              {content.proofStats.map((stat, i) => (
                <div className="framer-stat-item" key={stat.label}>
                  <CountUpStat stat={stat} />
                </div>
              ))}
            </div>
          </div>

          <div className="framer-strengths-layout reveal">
            <div className="framer-strengths-title">
              <h2>Built on quality,<br/>trust, and safety.</h2>
            </div>
            <div className="framer-strengths-list">
              {content.strengths.map((strength) => (
                <div className="framer-strength-item" key={strength.title}>
                  <h3>{strength.title}</h3>
                  <div className="framer-strength-points">
                    {strength.points.map((point) => (
                      <p key={point}>{point}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section framer-services-section" id="services">
        <div className="container">
          <div className="framer-services-header reveal">
            <h2>Services for every<br/>stage of your build.</h2>
            <p>From planning to completion, we handle<br/>every detail of your project.</p>
          </div>
          <div className="framer-services-grid">
            {content.services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section manifesto-section" id="manifesto">
        <div className="container">
          <h2 className="reveal">Experience meets innovation</h2>
          <div className="manifesto-copy" aria-label={content.manifesto}>
            {content.manifesto.split("\n").map((line) => (
              <p className="manifesto-line" key={line}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section editorial-section" id="blog">
        <div className="container editorial-grid">
          <div className="testimonial-panel reveal">
            <div className="panel-heading">
              <h2>Testimonials</h2>
              <div className="carousel-controls">
                <button type="button" aria-label="Previous testimonial" onClick={showPreviousTestimonial}>
                  <ArrowLeft size={18} />
                </button>
                <button type="button" aria-label="Next testimonial" onClick={showNextTestimonial}>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeQuote.author}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) showNextTestimonial();
                  if (info.offset.x > 50) showPreviousTestimonial();
                }}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ type: "spring", stiffness: 170, damping: 20 }}
              >
                <p>{activeQuote.quote}</p>
                <footer>
                  <strong>{activeQuote.author}</strong>
                  <span>{activeQuote.role}</span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="blog-panel reveal">
            <div className="panel-heading">
              <h2>From the blog</h2>
              <a href="#contact">View all blog</a>
            </div>
            <div className="blog-grid">
              {content.articles.map((article) => (
                <article className="blog-card" key={article.title}>
                  <div className="blog-image">
                    <Image src={article.image} alt="" fill sizes="(max-width: 760px) 100vw, 28vw" />
                  </div>
                  <div>
                    <p>
                      <span>{article.category}</span>
                      {article.date}
                    </p>
                    <h3>{article.title}</h3>
                  </div>
                  <ArrowUpRight className="blog-arrow" size={20} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="prefooter" id="contact">
        <div className="container prefooter-inner">
          <div>
            <h2>Have a project in mind?</h2>
            <p>{content.contactIntro}</p>
          </div>
          <a
            className="magnetic-button"
            href={`mailto:${content.footer.contact.email}`}
            onMouseMove={moveMagneticButton}
            onMouseLeave={resetMagneticButton}
          >
            Work with us
            <ArrowUpRight size={19} strokeWidth={1.9} />
          </a>
        </div>
      </section>

      <CinematicFooter content={content} />
    </main>
  );
}
