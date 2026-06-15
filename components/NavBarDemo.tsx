"use client";

import { Home, Briefcase, Wrench, User, FileText, Mail } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

export function NavBarDemo() {
  const navItems = [
    { name: "Home", url: "#top", icon: Home },
    { name: "Projects", url: "#projects", icon: Briefcase },
    { name: "Services", url: "#services", icon: Wrench },
    { name: "About", url: "#about", icon: User },
    { name: "Blog", url: "#blog", icon: FileText },
    { name: "Contact", url: "#contact", icon: Mail },
  ];

  return <NavBar items={navItems} />;
}
