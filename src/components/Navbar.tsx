"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Menu, X } from "lucide-react";
import { siteConfig, formatWhatsAppUrl } from "@/lib/config";
import { scrollToSection } from "@/lib/utils";
import { useWhatsappNumber } from "@/hooks/useWhatsappNumber";

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const whatsappNumber = useWhatsappNumber();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Especialidades", href: "especialidades" },
    { label: "Galeria", href: "galeria" },
    { label: "História", href: "historia" },
    { label: "Depoimentos", href: "depoimentos" },
    { label: "Localização", href: "localizacao" },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? "bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
            : "bg-black/20 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-2xl font-bold font-[family-name:var(--font-display)]">
              <span className="gradient-text">DOG</span>
              <span className="text-white"> BURGER</span>
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-white/70 hover:text-white transition-colors duration-300 tracking-wide"
                data-cursor-pointer
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <motion.a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex w-10 h-10 rounded-full bg-white/10 border border-white/10 items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              data-cursor-pointer
            >
              <InstagramIcon size={18} />
            </motion.a>

            <motion.a
              href={formatWhatsAppUrl(whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 btn-primary text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-cursor-pointer
            >
              <MessageCircle size={18} />
              <span>Pedir Agora</span>
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-cursor-pointer
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[99] bg-black/80 backdrop-blur-xl lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-3xl font-bold text-white hover:text-primary transition-colors"
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.3s ease ${i * 0.05}s`
              }}
              data-cursor-pointer
            >
              {link.label}
            </button>
          ))}

          <a
            href={formatWhatsAppUrl(whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 btn-primary flex items-center gap-3 text-lg"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.3s ease 0.3s"
            }}
            data-cursor-pointer
          >
            <MessageCircle size={24} />
            <span>Pedir Agora</span>
          </a>
        </div>
      </div>
    </>
  );
}
