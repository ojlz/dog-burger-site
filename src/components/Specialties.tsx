"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimations";
import { specialties, formatWhatsAppUrl } from "@/lib/config";
import { useWhatsappNumber } from "@/hooks/useWhatsappNumber";
import { MessageCircle, Star } from "lucide-react";

export default function Specialties() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: titleRef, isInView: titleInView } = useInView(0.2);
  const whatsappNumber = useWhatsappNumber();

  return (
    <section
      id="especialidades"
      ref={containerRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.span
            className="text-primary text-sm tracking-[0.3em] uppercase font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Nossas Especialidades
          </motion.span>

          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-display)] mt-4 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">Sabores que </span>
            <span className="gradient-text">Conquistam</span>
          </motion.h2>

          <motion.p
            className="text-muted text-lg mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Cada hambúrguer é preparado com ingredientes selecionados e muito
            carinho. Uma explosão de sabor em cada mordida.
          </motion.p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((item, index) => (
            <SpecialtyCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-muted mb-6">
            Mais do que hambúrguer, uma experiência completa.
          </p>
          <motion.a
            href={formatWhatsAppUrl(
              whatsappNumber,
              "Olá! Gostaria de ver o cardápio completo!"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-pointer
          >
            <MessageCircle size={20} />
            <span>Ver Cardápio Completo</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function SpecialtyCard({
  item,
  index,
}: {
  item: (typeof specialties)[0];
  index: number;
}) {
  return (
    <motion.div
      className="group relative rounded-3xl overflow-hidden bg-surface border border-border card-hover"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

        {/* Price Badge */}
        <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-primary text-background font-bold">
          {item.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className="fill-primary text-primary"
            />
          ))}
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 font-[family-name:var(--font-display)]">
          {item.name}
        </h3>

        <p className="text-muted leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}
