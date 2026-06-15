import type { Metadata } from "next";
import HeritagePage from "@/components/HeritagePage";

export const metadata: Metadata = {
  title: "Our Heritage — Buildings Architectural Group",
  description:
    "Discover 15 years of building excellence. From a small team of five craftsmen to a 60+ strong firm delivering award-winning architecture.",
};

export default function Heritage() {
  return <HeritagePage />;
}
