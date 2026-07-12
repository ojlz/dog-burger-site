"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig, formatWhatsAppUrl } from "@/lib/config";

export default function WhatsAppButton() {
  const [whatsappNumber, setWhatsappNumber] = useState(
    siteConfig.whatsappNumber
  );

  useEffect(() => {
    const savedNumber = localStorage.getItem("whatsapp_number");
    if (savedNumber) {
      setWhatsappNumber(savedNumber);
    }
  }, []);

  const handleClick = () => {
    const clicks = parseInt(localStorage.getItem("whatsapp_clicks") || "0") + 1;
    localStorage.setItem("whatsapp_clicks", clicks.toString());
  };

  const message = "Olá, vim pelo site e gostaria de ver o cardápio.";

  return (
    <motion.a
      href={formatWhatsAppUrl(whatsappNumber, message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[90] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg whatsapp-pulse gpu-accelerated"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      data-cursor-pointer
    >
      <MessageCircle size={28} />
    </motion.a>
  );
}
