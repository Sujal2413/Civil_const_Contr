"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check } from "lucide-react";
import { expertiseAreas, processSteps } from "@/lib/content";

export default function ExpertisePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="buildings-shell">
      {/* Hero */}
      <section className="expertise-hero blueprint-grid-dark">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Our Expertise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Fifteen years of specialized knowledge across every facet of
            construction — from architectural vision to structural reality. We
            combine traditional craft with cutting-edge technology.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="section-heading reveal">
            <h2>What we do best.</h2>
          </div>
          <div className="expertise-services-grid">
            {expertiseAreas.map((area, index) => (
              <motion.article
                className="expertise-card reveal"
                key={area.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div>
                  <span className="expertise-card-number">{area.number}</span>
                  <h3 style={{ marginTop: "20px" }}>{area.title}</h3>
                  <p>{area.body}</p>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "24px 0 0",
                    display: "grid",
                    gap: "8px",
                  }}
                >
                  {area.details.map((detail) => (
                    <li
                      key={detail}
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "flex-start",
                        fontSize: "0.86rem",
                        color: "var(--muted)",
                      }}
                    >
                      <Check
                        size={15}
                        strokeWidth={2}
                        style={{
                          flexShrink: 0,
                          color: "var(--orange)",
                          marginTop: "2px",
                        }}
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Techniques Showcase */}
      <section className="section" style={{ background: "var(--soft)" }}>
        <div className="container">
          <div className="section-heading reveal">
            <h2>Craftsmanship meets technology.</h2>
          </div>
          <div className="techniques-split reveal">
            <div className="technique-panel">
              <div className="technique-image">
                <Image
                  src="/assets/commitment-construction.png"
                  alt="Traditional stonework"
                  fill
                  sizes="(max-width: 1060px) 100vw, 50vw"
                />
              </div>
              <h3>Traditional Stonework</h3>
              <p>
                Our master craftsmen preserve centuries-old building techniques,
                ensuring authenticity and enduring quality in every stone laid.
                Heritage skills meet modern precision.
              </p>
              <ul>
                <li>
                  <Check size={15} strokeWidth={2} />
                  Hand-cut natural stone facades
                </li>
                <li>
                  <Check size={15} strokeWidth={2} />
                  Traditional lime mortar pointing
                </li>
                <li>
                  <Check size={15} strokeWidth={2} />
                  Bespoke architectural masonry
                </li>
                <li>
                  <Check size={15} strokeWidth={2} />
                  Heritage restoration expertise
                </li>
              </ul>
            </div>
            <div className="technique-panel">
              <div className="technique-image">
                <Image
                  src="/assets/hero-construction.png"
                  alt="Digital twin modeling"
                  fill
                  sizes="(max-width: 1060px) 100vw, 50vw"
                />
              </div>
              <h3>Digital Twin Modeling</h3>
              <p>
                We leverage Building Information Modeling (BIM) and digital twin
                technology to simulate, optimize, and monitor every aspect of
                construction in real time.
              </p>
              <ul>
                <li>
                  <Check size={15} strokeWidth={2} />
                  Real-time construction monitoring
                </li>
                <li>
                  <Check size={15} strokeWidth={2} />
                  Clash detection and resolution
                </li>
                <li>
                  <Check size={15} strokeWidth={2} />
                  Energy performance simulation
                </li>
                <li>
                  <Check size={15} strokeWidth={2} />
                  4D scheduling integration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section">
        <div className="container">
          <div
            className="section-heading reveal"
            style={{ justifyContent: "center", textAlign: "center" }}
          >
            <h2>Our process, simplified.</h2>
          </div>
          <div className="process-timeline reveal">
            {processSteps.map((step, index) => (
              <div className="process-step" key={step.title}>
                <div className="process-step-dot" />
                <h4>
                  {`0${index + 1}. `}
                  {step.title}
                </h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="prefooter">
        <div className="container prefooter-inner">
          <div>
            <h2>Ready to build?</h2>
            <p>
              Our expertise is at your service. Let us know about your project
              and we&apos;ll provide a comprehensive consultation.
            </p>
          </div>
          <Link href="/contact" className="magnetic-button">
            Get a Quote
            <ArrowUpRight size={19} strokeWidth={1.9} />
          </Link>
        </div>
      </section>
    </main>
  );
}
