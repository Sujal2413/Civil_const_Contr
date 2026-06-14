import type { Metadata } from "next";
import { SuppressThreeClockWarning } from "@/components/SuppressThreeClockWarning";
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SuppressThreeClockWarning />
        {children}
      </body>
    </html>
  );
}

