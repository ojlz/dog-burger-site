"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimations";
import { siteConfig } from "@/lib/config";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";

const openingHours = [
  { day: "Domingo", hours: "18h – 22h30", isOpen: true },
  { day: "Segunda", hours: "Fechado", isOpen: false },
  { day: "Terça", hours: "15h – 22h30", isOpen: true },
  { day: "Quarta", hours: "15h – 22h30", isOpen: true },
  { day: "Quinta", hours: "15h – 22h30", isOpen: true },
  { day: "Sexta", hours: "15h – 22h30", isOpen: true },
  { day: "Sábado", hours: "15h – 22h30", isOpen: true },
];

export default function Location() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: titleRef, isInView: titleInView } = useInView(0.2);

  return (
    <section
      id="localizacao"
      ref={containerRef}
      className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.span
            className="text-primary text-sm tracking-[0.3em] uppercase font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Localização
          </motion.span>

          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-display)] mt-4 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">Venha nos </span>
            <span className="gradient-text">Visitar</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <motion.div
            className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-square lg:aspect-auto lg:h-full min-h-[280px] sm:min-h-[400px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.5!2d-54.1959596!3d-23.0588221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x948b8f54ffaf68db%3A0x27fafaa0f01ed365!2sDog%20Burger%20%26%20Caf%C3%A9!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) invert(1) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Dog Burger"
              className="absolute inset-0"
            />

            {/* Map Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Info Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Address Card */}
            <div className="p-6 rounded-2xl glass">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Endereço</h3>
                  <p className="text-muted leading-relaxed">{siteConfig.address}</p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="p-6 rounded-2xl glass">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-4">Horário de Funcionamento</h3>
                  <div className="space-y-2">
                    {openingHours.map((item) => (
                      <div key={item.day} className="flex items-center justify-between">
                        <span className={`text-sm ${item.isOpen ? 'text-white' : 'text-muted'}`}>
                          {item.day}
                        </span>
                        <span className={`text-sm font-medium ${item.isOpen ? 'text-primary' : 'text-red-400'}`}>
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-6 rounded-2xl glass">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Contato</h3>
                  <p className="text-muted">{siteConfig.phone}</p>
                  <p className="text-muted text-sm mt-1">WhatsApp disponível</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.a
              href="https://www.google.com/maps/place/Dog+Burger+%26+Caf%C3%A9/@0.0000, -30.0000,17z/data=!3m1!4b1!4m6!3m5!1s0x948b8f54ffaf68db:0x27fafaa0f01ed365!8m2!3d-23.0588221!4d-54.1959596!16s%2Fg%2F11n6pyxz2k"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full p-6 rounded-2xl bg-primary text-background font-bold text-lg hover:bg-primary-dark transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cursor-pointer
            >
              <Navigation size={24} />
              <span>Como Chegar</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
