"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useAnimations";

export default function History() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: titleRef, isInView: titleInView } = useInView(0.2);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      id="historia"
      ref={containerRef}
      className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(/burg.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            className="relative"
            style={{ y }}
          >
            <motion.div
              className="relative rounded-3xl overflow-hidden aspect-[4/5]"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url(/burgao.jpeg)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </motion.div>

            {/* Floating Card */}
            <motion.div
              className="absolute bottom-4 right-4 sm:-bottom-8 sm:-right-8 p-4 sm:p-6 rounded-2xl glass"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-4xl font-bold gradient-text font-[family-name:var(--font-display)]">
                5+
              </div>
              <div className="text-sm text-muted mt-1">
                Anos de
                <br />
                Experiência
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <div ref={titleRef}>
            <motion.span
              className="text-primary text-sm tracking-[0.3em] uppercase font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Nossa História
            </motion.span>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] mt-4 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-white">Paixão que </span>
              <span className="gradient-text">Nasce do Sabor</span>
            </motion.h2>

            <motion.div
              className="mt-8 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-muted text-base sm:text-lg leading-relaxed">
                O Dog Burger nasceu do sonho de criar algo diferente em
                Porto Fictício. Não apenas uma hamburgueria, mas um lugar onde cada
                hambúrguer conta uma história de qualidade e sabor.
              </p>

              <p className="text-muted text-base sm:text-lg leading-relaxed">
                Começamos com uma ideia simples:{" "}
                <span className="text-white font-medium">
                  ingredientes selecionados, preparo artesanal e muito amor.
                </span>{" "}
                Hoje, somos referência na cidade, com mais de 200 avaliações
                positivas no Google.
              </p>

              <p className="text-muted text-base sm:text-lg leading-relaxed">
                Nosso compromisso é oferecer não apenas um hambúrguer, mas uma
                experiência completa que faz nossos clientes voltarem sempre.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div>
                <div className="text-xl sm:text-3xl font-bold text-primary font-[family-name:var(--font-display)]">
                  200+
                </div>
                <div className="text-xs sm:text-sm text-muted mt-1">Avaliações</div>
              </div>
              <div>
                <div className="text-xl sm:text-3xl font-bold text-white font-[family-name:var(--font-display)]">
                  4.8★
                </div>
                <div className="text-xs sm:text-sm text-muted mt-1">Nota Média</div>
              </div>
              <div>
                <div className="text-xl sm:text-3xl font-bold text-white font-[family-name:var(--font-display)]">
                  5k+
                </div>
                <div className="text-xs sm:text-sm text-muted mt-1">Clientes Felizes</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
