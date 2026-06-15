"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
} from "lucide-react";
import type { HomeContent } from "@/lib/content";

import CinematicHeroCanvas from "./CinematicHeroCanvas";
import HeroLoader from "./HeroLoader";
import ScrollIndicator from "./ScrollIndicator";

const ServiceWireframe = dynamic(() => import("./ServiceWireframe"), {
  ssr: false,
  loading: () => <div className="wireframe-loading" />,
});

type BuildingsPageProps = {
  content: HomeContent;
};

function splitHeadline(headline: string) {
  return headline.split(" ").map((word, wordIndex) => (
    <span className="hero-word" key={`${word}-${wordIndex}`}>
      {Array.from(word).map((letter, letterIndex) => (
        <span className="hero-letter-mask" key={`${letter}-${letterIndex}`}>
          <span className="hero-letter">{letter}</span>
        </span>
      ))}
    </span>
  ));
}

function moveMagneticButton(event: ReactMouseEvent<HTMLAnchorElement>) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;

  target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  target.style.setProperty("--my", `${event.clientY - rect.top}px`);
  target.style.transform = `translate3d(${x * 0.15}px, ${y * 0.3}px, 0)`;
}

function resetMagneticButton(event: ReactMouseEvent<HTMLAnchorElement>) {
  event.currentTarget.style.transform = "translate3d(0, 0, 0)";
}

export default function BuildingsPage({ content }: BuildingsPageProps) {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const tickerItems = useMemo(
    () => [...content.tickerStats, ...content.tickerStats, ...content.tickerStats],
    [content.tickerStats]
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reveal timeline (waits for loader)
      const revealTl = gsap.timeline({ paused: true });

      revealTl
        .fromTo(
          ".hero-letter",
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.74,
            ease: "power4.out",
            stagger: 0.018,
          }
        )
        .fromTo(
          ".hero-support",
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.14,
          },
          "-=0.4"
        )
        .fromTo(
          ".scroll-indicator",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.2"
        );

      if (heroReady) {
        setTimeout(() => revealTl.play(), 800);
      }

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
              start: "top 86%",
            },
          }
        );
      });

      // Cinematic Marquee Scroll-Coupling
      const tickerTrack = document.querySelector(".ticker-track");
      if (tickerTrack) {
        let direction = 1;
        ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            if (self.direction !== direction) {
              direction = self.direction;
              gsap.to(tickerTrack, {
                animationDirection: direction === 1 ? "normal" : "reverse",
                duration: 0.5,
              });
            }
            gsap.to(tickerTrack, {
              animationDuration: `${24 - Math.abs(self.getVelocity()) * 0.005}s`,
              duration: 0.2,
              overwrite: "auto",
            });
            gsap.to(tickerTrack, {
              animationDuration: "24s",
              duration: 1,
              delay: 0.2,
              overwrite: "auto",
            });
          },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((counter) => {
        const target = Number(counter.dataset.target ?? "0");
        const prefix = counter.dataset.prefix ?? "";
        const suffix = counter.dataset.suffix ?? "";
        const value = { current: 0 };

        gsap.to(value, {
          current: target,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 88%",
            once: true,
          },
          onUpdate: () => {
            counter.textContent = `${prefix}${Math.round(value.current)}${suffix}`;
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".manifesto-line").forEach((line) => {
        gsap.to(line, {
          color: "#101010",
          ease: "none",
          scrollTrigger: {
            trigger: line,
            start: "top 78%",
            end: "bottom 52%",
            scrub: true,
          },
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
              start: "top 82%",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [heroReady]);

  // Handle global mouse move for gradient text and CTA proximity
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (heroRef.current) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        heroRef.current.style.setProperty("--mouse-x", `${x}%`);
        heroRef.current.style.setProperty("--mouse-y", `${y}%`);
      }

      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < 150 && distance > rect.width / 2) {
          const pull = 1 - distance / 150;
          const pullX = distanceX * 0.1 * pull;
          const pullY = distanceY * 0.1 * pull;
          ctaRef.current.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
        } else if (distance >= 150) {
          ctaRef.current.style.transform = "translate3d(0, 0, 0)";
        }
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
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

  const activeQuote = content.testimonials[activeTestimonial];

  return (
    <main className="buildings-shell">
      <HeroLoader isReady={heroReady} />

      <section className="hero" id="top" ref={heroRef}>
        <CinematicHeroCanvas onReady={() => setHeroReady(true)} />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="container hero-content">
          <h1 className="hero-headline" aria-label={content.hero.title}>
            {splitHeadline(content.hero.title)}
          </h1>
          <div className="hero-lower">
            <p className="hero-support">{content.hero.body}</p>
            <a
              ref={ctaRef}
              className="hero-cta-magnetic hero-support"
              href="/contact"
              onMouseMove={moveMagneticButton}
              onMouseLeave={resetMagneticButton}
            >
              <span>{content.hero.cta}</span>
              <div className="cta-arrow-wrapper">
                <ArrowUpRight size={18} strokeWidth={1.9} className="cta-arrow-main" />
                <ArrowUpRight size={18} strokeWidth={1.9} className="cta-arrow-hover" />
              </div>
            </a>
          </div>
          <ScrollIndicator />
        </div>
      </section>

      <section className="cinematic-marquee" aria-label="Company stats">
        <div className="ticker-track">
          {tickerItems.map((item, index) => (
            <div className="ticker-item" key={`${item.value}-${item.label}-${index}`}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              <span className="ticker-separator">//</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="container">
          <div className="section-heading reveal">
            <h2>Projects built with care and precision.</h2>
            <Link className="text-link" href="/portfolio">
              View all projects
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="project-stack">
            {content.projects.map((project) => (
              <article className="project-card reveal" key={project.title}>
                <span className="project-index">{project.index}</span>
                <div className="project-image-wrap" aria-hidden="true">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 100vw, 42vw"
                  />
                </div>
                <div className="project-copy">
                  <p>{project.category}</p>
                  <h3>{project.title}</h3>
                  <div>
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                  </div>
                  <Link href={`/portfolio/${project.slug}`}>
                    Read more
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section proof-section blueprint-grid-dark" aria-labelledby="proof-title">
        <div className="container proof-grid">
          <div className="proof-title reveal">
            <h2 id="proof-title">Did you know?</h2>
            <p>
              Three practical signals behind a construction partner built for
              demanding commercial, industrial, and residential work.
            </p>
          </div>
          <div className="proof-cards">
            {content.proofStats.map((stat) => (
              <article className="proof-card reveal" key={stat.label}>
                <strong
                  data-count
                  data-target={stat.target}
                  data-prefix={stat.prefix ?? ""}
                  data-suffix={stat.suffix}
                >
                  {stat.prefix ?? ""}
                  0{stat.suffix}
                </strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section strengths-section" id="about">
        <div className="container strengths-layout">
          <div className="sticky-title reveal">
            <h2>Built on quality, trust, and safety.</h2>
            <p>
              A focused operating model for work that needs craft, clarity, and
              accountable site leadership.
            </p>
          </div>
          <div className="strength-card-deck">
            {content.strengths.map((strength, index) => (
              <article
                className="strength-card reveal"
                key={strength.title}
                style={{ "--card-offset": `${index * 28}px` } as CSSProperties}
              >
                <span>{`0${index + 1}`}</span>
                <h3>{strength.title}</h3>
                <ul>
                  {strength.points.map((point) => (
                    <li key={point}>
                      <Check size={17} strokeWidth={1.8} />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-heading reveal">
            <h2>Services for every stage of your build.</h2>
            <Link className="text-link" href="/contact">
              Get a quote
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="services-grid">
            {content.services.map((service, index) => (
              <article
                className="service-card reveal"
                key={service.title}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="service-mesh" aria-hidden="true">
                  <ServiceWireframe active={activeService === index} />
                </div>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </article>
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
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={showPreviousTestimonial}
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={showNextTestimonial}
                >
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
              <a href="/portfolio">View all blog</a>
            </div>
            <div className="blog-grid">
              {content.articles.map((article) => (
                <article className="blog-card" key={article.title}>
                  <div className="blog-image">
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      sizes="(max-width: 760px) 100vw, 28vw"
                    />
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
            href="/contact"
            onMouseMove={moveMagneticButton}
            onMouseLeave={resetMagneticButton}
          >
            Work with us
            <ArrowUpRight size={19} strokeWidth={1.9} />
          </a>
        </div>
      </section>
    </main>
  );
}
