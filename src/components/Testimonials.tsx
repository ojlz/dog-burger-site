"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimations";
import { testimonials } from "@/lib/config";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: titleRef, isInView: titleInView } = useInView(0.2);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      id="depoimentos"
      ref={containerRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.span
            className="text-primary text-sm tracking-[0.3em] uppercase font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Depoimentos
          </motion.span>

          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-display)] mt-4 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">O que Dizem </span>
            <span className="gradient-text">Nossos Clientes</span>
          </motion.h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          {/* Quote Icon */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <Quote
              size={60}
              className="text-primary/20"
              fill="currentColor"
            />
          </div>

          {/* Testimonial Content */}
          <motion.div
            key={currentIndex}
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-8">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className="fill-primary text-primary"
                />
              ))}
            </div>

            {/* Text */}
            <blockquote className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed max-w-4xl mx-auto mb-10 font-[family-name:var(--font-display)]">
              &ldquo;{testimonials[currentIndex].text}&rdquo;
            </blockquote>

            {/* Author */}
            <div>
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">
                  {testimonials[currentIndex].name.charAt(0)}
                </span>
              </div>
              <p className="text-white font-medium text-lg">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-muted text-sm mt-1">Cliente Verificado</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              data-cursor-pointer
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-8 bg-primary"
                      : "bg-border hover:bg-muted"
                  }`}
                  data-cursor-pointer
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              data-cursor-pointer
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
