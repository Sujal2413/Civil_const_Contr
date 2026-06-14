import { Briefcase, FileText, Home, Info, Mail } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

export function NavBarDemo() {
  const navItems = [
    { name: "Home", url: "#", icon: Home },
    { name: "About", url: "#", icon: Info },
    { name: "Projects", url: "#", icon: Briefcase },
    { name: "Resume", url: "#", icon: FileText },
    { name: "Contact", url: "#contact", icon: Mail }
  ];

  return <NavBar items={navItems} />;
}
