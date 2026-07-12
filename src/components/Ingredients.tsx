"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimations";

const ingredients = [
  {
    name: "Carne Premium",
    description:
      "Blend exclusivo de cortes selecionados, maturado para máximo sabor e suculência.",
    icon: "🥩",
  },
  {
    name: "Pão Brioche",
    description:
      "Pão artesanal fresco, macio por fora, cremoso por dentro.",
    icon: "🍞",
  },
  {
    name: "Queijos Especiais",
    description:
      "Cheddar, mussarela e queijos selecionados. Derretidos na hora.",
    icon: "🧀",
  },
  {
    name: "Molhos da Casa",
    description:
      "Receitas exclusivas desenvolvidas pelo chef.",
    icon: "🍯",
  },
  {
    name: "Vegetais Frescos",
    description:
      "Alface, tomate, cebola roxa e rúcula frescos diariamente.",
    icon: "🥬",
  },
  {
    name: "Bacon Crocante",
    description:
      "Bacon defumado até atingir a crocância perfeita.",
    icon: "🥓",
  },
];

export default function Ingredients() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: titleRef, isInView: titleInView } = useInView(0.2);

  return (
    <section ref={containerRef} className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url(/burg.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.span
            className="text-primary text-sm tracking-[0.3em] uppercase font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Ingredientes Premium
          </motion.span>

          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-display)] mt-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-white">Qualidade em </span>
            <span className="gradient-text">Cada Detalhe</span>
          </motion.h2>

          <motion.p
            className="text-muted text-lg mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Selecionamos apenas o melhor para criar hambúrgueres que transcendem
            o comum.
          </motion.p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((item, index) => (
            <IngredientCard key={item.name} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IngredientCard({
  item,
  index,
}: {
  item: (typeof ingredients)[0];
  index: number;
}) {
  return (
    <motion.div
      className="group relative p-8 rounded-3xl bg-surface/50 border border-border hover:border-primary/30 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      {/* Icon */}
      <div className="text-5xl mb-6">{item.icon}</div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-display)]">
        {item.name}
      </h3>

      <p className="text-muted leading-relaxed">{item.description}</p>
    </motion.div>
  );
}
