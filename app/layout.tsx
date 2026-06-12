import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buildings - Construction Framer Template Reconstruction",
  description:
    "Immersive construction landing page with WebGL crane silhouettes, GSAP motion, and a GraphQL-ready data layer."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
