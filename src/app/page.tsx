"use client";

import dynamic from "next/dynamic";
import { useSmoothScroll } from "@/hooks/useLenis";

// Dynamic imports for components
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});
const Hero = dynamic(() => import("@/components/Hero"), {
  ssr: false,
});
const Specialties = dynamic(() => import("@/components/Specialties"), {
  ssr: false,
});
const Ingredients = dynamic(() => import("@/components/Ingredients"), {
  ssr: false,
});
const Gallery = dynamic(() => import("@/components/Gallery"), {
  ssr: false,
});
const History = dynamic(() => import("@/components/History"), {
  ssr: false,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  ssr: false,
});
const Location = dynamic(() => import("@/components/Location"), {
  ssr: false,
});
const CtaFinal = dynamic(() => import("@/components/CtaFinal"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
});
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), {
  ssr: false,
});
const Tracker = dynamic(() => import("@/components/Tracker"), {
  ssr: false,
});

export default function Home() {
  useSmoothScroll();

  return (
    <main className="relative">
      {/* Tracker */}
      <Tracker />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Specialties Section */}
      <Specialties />

      {/* Ingredients Section */}
      <Ingredients />

      {/* Gallery Section */}
      <Gallery />

      {/* History Section */}
      <History />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Location Section */}
      <Location />

      {/* CTA Final Section */}
      <CtaFinal />

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </main>
  );
}
