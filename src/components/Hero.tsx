"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, ChevronDown } from "lucide-react";
import { siteConfig, formatWhatsAppUrl } from "@/lib/config";
import { scrollToSection } from "@/lib/utils";
import { useWhatsappNumber } from "@/hooks/useWhatsappNumber";

const headlineWords = ["Cada", "Hambúrguer", "é", "uma", "Experiência"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const whatsappNumber = useWhatsappNumber();

  // Parallax values
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const statsY = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image - Parallax */}
      <motion.div
        className="absolute inset-0 z-0 gpu-accelerated"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: "url(/burgao.jpeg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          style={{ y: badgeY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-sm text-muted tracking-wider uppercase">
            {siteConfig.openingHours}
          </span>
        </motion.div>

        {/* Main Headline - Word by Word */}
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold font-[family-name:var(--font-display)] leading-[0.9] tracking-tighter mb-6"
          style={{ y: textY, opacity }}
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              className={`inline-block mr-3 md:mr-5 ${
                word === "Hambúrguer" ? "gradient-text" : "text-white"
              } ${word === "Experiência" ? "italic font-light" : ""}`}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          Ingredientes selecionados. Carne suculenta. Muito sabor.{" "}
          <span className="text-white font-medium">
            Preparado para ser inesquecível.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ y: ctaY }}
        >
          <motion.a
            href={formatWhatsAppUrl(whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-3 text-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.1,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-pointer
          >
            <MessageCircle size={24} />
            <span>Pedir no WhatsApp</span>
          </motion.a>

          <motion.button
            onClick={() => scrollToSection("especialidades")}
            className="flex items-center gap-2 text-muted hover:text-white transition-colors px-6 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            data-cursor-pointer
          >
            <span>Ver Especialidades</span>
            <ChevronDown size={20} />
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 flex items-center justify-center gap-12 md:gap-20"
          style={{ y: statsY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              4.8★
            </div>
            <div className="text-sm text-muted mt-1">Avaliação</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">
              200+
            </div>
            <div className="text-sm text-muted mt-1">Avaliações</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">
              2019
            </div>
            <div className="text-sm text-muted mt-1">Desde</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
