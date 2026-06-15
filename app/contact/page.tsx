import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us — Buildings Architectural Group",
  description:
    "Get in touch to discuss your construction project. Professional consultation for commercial, residential, and institutional builds.",
};

export default function Contact() {
  return <ContactPage />;
}
