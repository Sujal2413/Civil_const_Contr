import type { Metadata } from "next";
import PortfolioPage from "@/components/PortfolioPage";

export const metadata: Metadata = {
  title: "Project Portfolio — Buildings Architectural Group",
  description:
    "Explore our portfolio of premium commercial, residential, and institutional projects delivered with precision and craftsmanship across England.",
};

export default function Portfolio() {
  return <PortfolioPage />;
}
