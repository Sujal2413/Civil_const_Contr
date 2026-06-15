"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import type { Project } from "@/lib/content";

type ProjectDetailPageProps = {
  project: Project;
  relatedProjects: Project[];
};

export default function ProjectDetailPage({
  project,
  relatedProjects,
}: ProjectDetailPageProps) {
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
      <section className="detail-hero">
        <div className="detail-hero-bg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/portfolio"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "32px",
                fontSize: "0.84rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <ArrowLeft size={16} />
              Back to Portfolio
            </Link>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {project.title}
          </motion.h1>
          <motion.div
            className="detail-meta-inline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.location}</span>
            <span>·</span>
            <span>{project.year}</span>
          </motion.div>
        </div>
      </section>

      {/* Specs */}
      <section className="section" style={{ paddingBottom: "60px" }}>
        <div className="container">
          <div className="detail-specs-grid reveal">
            <div className="detail-spec-card">
              <span>Total Area</span>
              <strong>{project.specs.area}</strong>
            </div>
            <div className="detail-spec-card">
              <span>Duration</span>
              <strong>{project.specs.duration}</strong>
            </div>
            <div className="detail-spec-card">
              <span>Budget</span>
              <strong>{project.specs.budget}</strong>
            </div>
            <div className="detail-spec-card">
              <span>Project Type</span>
              <strong>{project.specs.type}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative + Sidebar */}
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="container">
          <div className="detail-body-grid">
            <div className="detail-narrative">
              <h2 className="reveal">The Vision</h2>
              {project.narrative.map((para, i) => (
                <p className="reveal" key={i}>
                  {para}
                </p>
              ))}

              <h2 className="reveal" style={{ marginTop: "48px" }}>
                Craftsmanship Meets Technology
              </h2>
              <p className="reveal">
                This project exemplifies our approach of blending time-honored building
                techniques with cutting-edge construction technology. From the
                foundations to the finishing touches, every element reflects our
                commitment to both precision engineering and artisanal quality.
              </p>
            </div>

            <div className="detail-sidebar reveal">
              <h3>Project Details</h3>
              <div className="detail-sidebar-item">
                <span>Client</span>
                <span>{project.category} Development</span>
              </div>
              <div className="detail-sidebar-item">
                <span>Location</span>
                <span>{project.location}</span>
              </div>
              <div className="detail-sidebar-item">
                <span>Year</span>
                <span>{project.year}</span>
              </div>
              <div className="detail-sidebar-item">
                <span>Area</span>
                <span>{project.specs.area}</span>
              </div>
              <div className="detail-sidebar-item">
                <span>Budget</span>
                <span>{project.specs.budget}</span>
              </div>
              <div className="detail-sidebar-item" style={{ borderBottom: "none" }}>
                <span>Duration</span>
                <span>{project.specs.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="container">
          <h2
            className="reveal"
            style={{
              fontSize: "2.4rem",
              fontWeight: 800,
              marginBottom: "28px",
              letterSpacing: "-0.02em",
            }}
          >
            Project Gallery
          </h2>
          <div className="detail-gallery-scroll reveal">
            {project.galleryImages.map((img, i) => (
              <div className="detail-gallery-item" key={i}>
                <Image
                  src={img}
                  alt={`${project.title} gallery ${i + 1}`}
                  fill
                  sizes="(max-width: 760px) 80vw, 400px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="section" style={{ background: "var(--soft)" }}>
        <div className="container">
          <div className="section-heading reveal">
            <h2>Related Projects</h2>
            <Link className="text-link" href="/portfolio">
              View all
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="related-projects-grid">
            {relatedProjects.map((rp) => (
              <Link
                key={rp.slug}
                href={`/portfolio/${rp.slug}`}
                className="portfolio-card reveal"
              >
                <div className="portfolio-card-image">
                  <Image
                    src={rp.image}
                    alt={rp.title}
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                  <div className="portfolio-card-overlay">
                    <h3>{rp.title}</h3>
                    <span>
                      {rp.location} · {rp.year}
                    </span>
                  </div>
                </div>
                <div className="portfolio-card-meta">
                  <span className="portfolio-card-tag">{rp.category}</span>
                  <h3>{rp.title}</h3>
                  <span>
                    {rp.location} · {rp.year}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="prefooter">
        <div className="container prefooter-inner">
          <div>
            <h2>Start a project like this?</h2>
            <p>
              Our team is ready to discuss your vision and bring it to life with
              the same level of care and precision.
            </p>
          </div>
          <Link href="/contact" className="magnetic-button">
            Discuss Your Project
            <ArrowUpRight size={19} strokeWidth={1.9} />
          </Link>
        </div>
      </section>
    </main>
  );
}
