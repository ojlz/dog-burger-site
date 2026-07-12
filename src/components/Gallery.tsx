"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { siteConfig, formatWhatsAppUrl } from "@/lib/config";

const galleryImages = [
  { src: "/australianoburger.jpg", alt: "Australiano Burger", category: "Destaque" },
  { src: "/hotdogprensado.webp", alt: "Hot Dog Prensado", category: "Hot Dog" },
  { src: "/burgao.jpeg", alt: "Páprica Burger", category: "Hambúrguer" },
  { src: "/burg.jpg", alt: "Hambúrguer Artesanal", category: "Clássico" },
  { src: "/dogao.jpeg", alt: "Toscana Burger", category: "Especial" },
  {
    src: "/imgi_25_708260991_18108129839491666_7248925743940123627_n.jpg",
    alt: "Dog Burger Premium",
    category: "Premium",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [whatsappNumber, setWhatsappNumber] = useState(
    siteConfig.whatsappNumber
  );

  useEffect(() => {
    const savedNumber = localStorage.getItem("whatsapp_number");
    if (savedNumber) {
      setWhatsappNumber(savedNumber);
    }
  }, []);

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1
      );
    }
  };

  const handleImageClick = (index: number) => {
    const product = galleryImages[index];
    const message = `Olá, vim pelo site e gostaria de pedir o ${product.alt}.`;
    const clicks = parseInt(localStorage.getItem("whatsapp_clicks") || "0") + 1;
    localStorage.setItem("whatsapp_clicks", clicks.toString());
    window.open(formatWhatsAppUrl(whatsappNumber, message), "_blank");
  };

  return (
    <section
      id="galeria"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            className="text-primary text-sm tracking-[0.3em] uppercase font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Galeria
          </motion.span>

          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-display)] mt-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-white">Momentos </span>
            <span className="gradient-text">Inesquecíveis</span>
          </motion.h2>

          <motion.p
            className="text-muted text-lg mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Clique em qualquer imagem para pedir pelo WhatsApp.
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => handleImageClick(index)}
              data-cursor-pointer
            >
              <div
                className={`bg-cover bg-center transition-transform duration-500 group-hover:scale-105 ${
                  index === 0 ? "aspect-square" : "aspect-[4/3]"
                }`}
                style={{ backgroundImage: `url(${img.src})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-background text-xs font-bold uppercase tracking-wider">
                {img.category}
              </div>

              {/* WhatsApp CTA on Hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                <div className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2 px-4 rounded-full text-sm font-medium">
                  <MessageCircle size={16} />
                  <span>Pedir {img.alt}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
