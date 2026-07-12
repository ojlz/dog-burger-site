"use client";

import { motion } from "framer-motion";
import { MessageCircle, Heart, ArrowUp } from "lucide-react";
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

export default function Footer() {
  const whatsappNumber = useWhatsappNumber();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-20 px-6 border-t border-border">
      {/* Background */}
      <div className="absolute inset-0 bg-surface" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-3xl font-bold font-[family-name:var(--font-display)]">
                <span className="gradient-text">DOG</span>
                <span className="text-white"> BURGER</span>
              </span>
              <span className="block text-muted text-sm mt-1">& Café</span>
            </motion.div>

            <p className="text-muted max-w-md leading-relaxed mb-8">
              Mais do que hambúrguer, uma experiência. Ingredientes selecionados,
              preparo artesanal e muito sabor em cada mordida.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <motion.a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                data-cursor-pointer
              >
                <InstagramIcon size={20} />
              </motion.a>

              <motion.a
                href={formatWhatsAppUrl(whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-background hover:bg-primary-dark transition-colors"
                whileHover={{ scale: 1.1, y: -3 }}
                data-cursor-pointer
              >
                <MessageCircle size={20} />
              </motion.a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold mb-6">Navegação</h3>
            <ul className="space-y-3">
              {[
                { label: "Especialidades", href: "especialidades" },
                { label: "Galeria", href: "galeria" },
                { label: "História", href: "historia" },
                { label: "Depoimentos", href: "depoimentos" },
                { label: "Localização", href: "localizacao" },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted hover:text-white transition-colors text-sm"
                    data-cursor-pointer
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">Contato</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li>{siteConfig.address}</li>
              <li>{siteConfig.phone}</li>
              <li>{siteConfig.openingHours}</li>
            </ul>

            <motion.a
              href={formatWhatsAppUrl(whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-primary hover:text-primary-dark transition-colors text-sm font-medium"
              whileHover={{ x: 5 }}
              data-cursor-pointer
            >
              <span>Fale Conosco</span>
              <MessageCircle size={16} />
            </motion.a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
          <p className="text-muted text-sm flex items-center gap-2">
            © {new Date().getFullYear()} {siteConfig.businessName}. Feito com{" "}
            <Heart size={14} className="text-primary fill-primary" /> em
            Porto Fictício�.
          </p>

          <motion.button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-all duration-300"
            whileHover={{ y: -3 }}
            data-cursor-pointer
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
