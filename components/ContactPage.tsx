"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Check,
  Globe,
  ExternalLink,
} from "lucide-react";
import { homeContent } from "@/lib/content";

const projectTypes = [
  "Commercial Development",
  "Residential Construction",
  "Industrial & Infrastructure",
  "Institutional & Public",
  "Renovation & Restoration",
  "Other",
];

const budgetRanges = [
  "Under £1M",
  "£1M - £5M",
  "£5M - £10M",
  "£10M - £20M",
  "£20M+",
  "Not sure yet",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    description: "",
    startDate: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const { footer } = homeContent;

  return (
    <main className="buildings-shell">
      {/* Hero */}
      <section className="contact-hero blueprint-grid-dark">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Let&apos;s Build Together
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Every great project starts with a conversation. Tell us about your
            vision and our team will provide expert guidance to bring it to life.
          </motion.p>
        </div>
      </section>

      {/* Contact Layout */}
      <section className="section">
        <div className="container">
          <div className="contact-layout">
            {/* Left: Info */}
            <div className="contact-info">
              <h3>Get in Touch</h3>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-info-text">
                  <span>Email</span>
                  <a href={`mailto:${footer.contact.email}`}>
                    {footer.contact.email}
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-info-text">
                  <span>Phone</span>
                  <a href={`tel:${footer.contact.phone.replace(/\s/g, "")}`}>
                    {footer.contact.phone}
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-info-text">
                  <span>Office</span>
                  <span>{footer.address}</span>
                </div>
              </div>

              <div className="contact-social">
                <a href="#" aria-label="LinkedIn">
                  <Globe size={20} />
                </a>
                <a href="#" aria-label="Instagram">
                  <ExternalLink size={20} />
                </a>
                <a href="#" aria-label="YouTube">
                  <Globe size={20} />
                </a>
              </div>

              {/* Office hours */}
              <div style={{ marginTop: "40px" }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "16px" }}>
                  Office Hours
                </h3>
                <div
                  style={{
                    display: "grid",
                    gap: "8px",
                    color: "var(--muted)",
                    fontSize: "0.92rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Monday – Friday</span>
                    <span style={{ fontWeight: 700, color: "var(--ink)" }}>
                      8:00 AM – 6:00 PM
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Saturday</span>
                    <span style={{ fontWeight: 700, color: "var(--ink)" }}>
                      9:00 AM – 1:00 PM
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Sunday</span>
                    <span style={{ fontWeight: 700, color: "var(--ink)" }}>
                      Closed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  className="contact-form form-success"
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="form-success-icon">
                    <Check size={32} strokeWidth={2.5} />
                  </div>
                  <h3>Thank you!</h3>
                  <p>
                    Your inquiry has been received. Our team will review your
                    project details and get back to you within 24 hours.
                  </p>
                  <Link
                    href="/"
                    className="magnetic-button"
                    style={{ marginTop: "32px" }}
                  >
                    Back to Home
                    <ArrowUpRight size={18} strokeWidth={1.9} />
                  </Link>
                </motion.div>
              ) : (
                <motion.form
                  className="contact-form"
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3>Project Inquiry</h3>

                  <div className="form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor="contact-name">Full Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="John Smith"
                        required
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor="contact-email">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="john@company.com"
                        required
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor="contact-phone">Phone</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="+44 7XXX XXXXXX"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor="contact-start">Preferred Start Date</label>
                      <input
                        id="contact-start"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          updateField("startDate", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor="contact-type">Project Type</label>
                      <select
                        id="contact-type"
                        required
                        value={formData.projectType}
                        onChange={(e) =>
                          updateField("projectType", e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Select project type
                        </option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor="contact-budget">Budget Range</label>
                      <select
                        id="contact-budget"
                        value={formData.budget}
                        onChange={(e) => updateField("budget", e.target.value)}
                      >
                        <option value="" disabled>
                          Select budget range
                        </option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-description">
                      Project Description
                    </label>
                    <textarea
                      id="contact-description"
                      placeholder="Tell us about your project — the site, your goals, any specific requirements..."
                      required
                      value={formData.description}
                      onChange={(e) =>
                        updateField("description", e.target.value)
                      }
                    />
                  </div>

                  <button type="submit" className="form-submit">
                    Submit Inquiry
                    <ArrowUpRight size={18} strokeWidth={2} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
