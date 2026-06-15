import type { Metadata } from "next";
import { SuppressThreeClockWarning } from "@/components/SuppressThreeClockWarning";
import MainNav from "@/components/MainNav";
import HoverFooter from "@/components/HoverFooterDemo";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buildings Architectural Group — Craftsmanship Meets Technology",
  description:
    "Premium construction and architectural services with 15 years of heritage. Commercial, residential, and institutional projects delivered with precision and innovation.",
  keywords: [
    "architecture",
    "construction",
    "commercial development",
    "residential construction",
    "Buildings Architectural Group",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SuppressThreeClockWarning />
        <MainNav />
        {children}
        <HoverFooter />
      </body>
    </html>
  );
}
