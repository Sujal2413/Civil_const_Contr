"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Hammer, Lightbulb, Shield, Leaf } from "lucide-react";
import {
  coreValues,
  heritageTimeline,
  teamMembers,
  homeContent,
} from "@/lib/content";

const iconMap: Record<string, React.ReactNode> = {
  hammer: <Hammer size={24} />,
  lightbulb: <Lightbulb size={24} />,
  shield: <Shield size={24} />,
  leaf: <Leaf size={24} />,
};

export default function HeritagePage() {
  const timelineLineRef = useRef<HTMLDivElement>(null);

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

      // Timeline fill animation
      if (timelineLineRef.current) {
        const container = timelineLineRef.current.parentElement;
        if (container) {
          gsap.to(timelineLineRef.current, {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 60%",
              end: "bottom 40%",
              scrub: true,
            },
          });
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="buildings-shell">
      {/* Hero */}
      <section className="heritage-hero blueprint-grid-dark">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            15 Years of Building Excellence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            From five dedicated craftsmen to a team of 60+ professionals, our
            journey is built on unwavering commitment to quality, safety, and
            innovation.
          </motion.p>
        </div>
      </section>

      {/* Core Values */}
      <section className="section">
        <div className="container">
          <div className="section-heading reveal">
            <h2>What we stand for.</h2>
          </div>
          <div className="values-grid">
            {coreValues.map((value, index) => (
              <motion.div
                className="value-card reveal"
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="value-icon">{iconMap[value.icon]}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        className="section"
        style={{ background: "var(--soft)" }}
      >
        <div className="container">
          <div
            className="section-heading reveal"
            style={{ justifyContent: "center", textAlign: "center" }}
          >
            <h2>Our journey.</h2>
          </div>
          <div className="timeline-container">
            <div className="timeline-line" />
            <div className="timeline-line-fill" ref={timelineLineRef} />

            {heritageTimeline.map((event, index) => (
              <div className="timeline-item reveal" key={event.year}>
                <div className="timeline-dot" />

                {index % 2 === 0 ? (
                  <>
                    <div className="timeline-content">
                      <span className="timeline-year">{event.year}</span>
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                      {event.image && (
                        <div className="timeline-image">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            sizes="(max-width: 1060px) 100vw, 50vw"
                          />
                        </div>
                      )}
                    </div>
                    <div className="timeline-spacer" />
                  </>
                ) : (
                  <>
                    <div className="timeline-spacer" />
                    <div className="timeline-content">
                      <span className="timeline-year">{event.year}</span>
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                      {event.image && (
                        <div className="timeline-image">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            sizes="(max-width: 1060px) 100vw, 50vw"
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        className="section blueprint-grid-dark"
        style={{ background: "var(--black)", color: "var(--white)" }}
      >
        <div className="container">
          <div className="proof-cards" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {[
              { value: "100+", label: "Projects Completed" },
              { value: "98%", label: "Client Retention" },
              { value: "60+", label: "Team Members" },
              { value: "£50M+", label: "Total Value Delivered" },
            ].map((stat) => (
              <article className="proof-card reveal" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="section-heading reveal">
            <h2>The leadership team.</h2>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.div
                className="team-card reveal"
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="team-card-image">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1060px) 50vw, 25vw"
                  />
                </div>
                <div className="team-card-info">
                  <h4>{member.name}</h4>
                  <span>{member.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="prefooter">
        <div className="container prefooter-inner">
          <div>
            <h2>Join our journey.</h2>
            <p>
              Whether you&apos;re planning your next build or exploring partnership
              opportunities, we&apos;d love to hear from you.
            </p>
          </div>
          <Link href="/contact" className="magnetic-button">
            Get in Touch
            <ArrowUpRight size={19} strokeWidth={1.9} />
          </Link>
        </div>
      </section>
    </main>
  );
}
