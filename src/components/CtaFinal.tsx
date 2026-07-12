"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { formatWhatsAppUrl } from "@/lib/config";
import { useWhatsappNumber } from "@/hooks/useWhatsappNumber";

export default function CtaFinal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const whatsappNumber = useWhatsappNumber();

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background Image - Simplified */}
      <motion.div className="absolute inset-0 gpu-accelerated" style={{ y }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/burgao.jpeg)" }}
        />
        <div className="absolute inset-0 bg-background/80" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Headline */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold font-[family-name:var(--font-display)] leading-[0.9] tracking-tighter mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="block text-white">Está esperando</span>
          <span className="block gradient-text">o quê?</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-xl md:text-2xl text-muted mb-8 sm:mb-12 max-w-2xl mx-auto px-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Para experimentar o{" "}
          <span className="text-white font-bold">melhor hambúrguer</span> de
          Porto Fictício�? Cada mordida é uma experiência que você não vai esquecer.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.a
            href={formatWhatsAppUrl(
              whatsappNumber,
              "Olá! Quero fazer um pedido!"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 btn-primary text-xl md:text-2xl px-12 py-6"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            data-cursor-pointer
          >
            <MessageCircle size={32} />
            <span>Pedir no WhatsApp</span>
          </motion.a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 text-muted">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm">Entrega Rápida</span>
          </div>
          <div className="flex items-center gap-2 text-muted">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm">Ingredientes Frescos</span>
          </div>
          <div className="flex items-center gap-2 text-muted">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm">Atendimento Premium</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
