import type { Metadata } from "next";
import ExpertisePage from "@/components/ExpertisePage";

export const metadata: Metadata = {
  title: "Expertise & Services — Buildings Architectural Group",
  description:
    "Discover our specialized construction services from architectural design to sustainable building, blending traditional craftsmanship with modern technology.",
};

export default function Expertise() {
  return <ExpertisePage />;
}
