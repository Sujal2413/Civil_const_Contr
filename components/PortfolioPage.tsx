"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { allProjects } from "@/lib/content";

const categories = ["All", "Commercial", "Industrial", "Residential", "Institutional"];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter);

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
      <section className="portfolio-hero blueprint-grid-dark">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Our Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            A curated collection of architectural masterpieces spanning commercial,
            residential, and institutional sectors. Each project tells a story of
            craftsmanship meeting innovation.
          </motion.p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-pill ${activeFilter === cat ? "is-active" : ""}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="portfolio-grid"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              {filteredProjects.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/portfolio/${project.slug}`}
                  className="portfolio-card"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="portfolio-card-image">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 760px) 100vw, (max-width: 1060px) 50vw, 33vw"
                      />
                      <div className="portfolio-card-overlay">
                        <h3>{project.title}</h3>
                        <span>
                          {project.location} · {project.year}
                        </span>
                      </div>
                    </div>
                    <div className="portfolio-card-meta">
                      <span className="portfolio-card-tag">{project.category}</span>
                      <h3>{project.title}</h3>
                      <span>
                        {project.location} · {project.year}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="prefooter">
        <div className="container prefooter-inner">
          <div>
            <h2>Interested in our work?</h2>
            <p>
              Every project begins with a conversation. Let us know what you&apos;re
              building and we&apos;ll show you how we can help.
            </p>
          </div>
          <Link href="/contact" className="magnetic-button">
            Start Your Project
            <ArrowUpRight size={19} strokeWidth={1.9} />
          </Link>
        </div>
      </section>
    </main>
  );
}
