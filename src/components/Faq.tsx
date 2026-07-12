"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useWhatsappNumber } from "@/hooks/useWhatsappNumber";
import { formatWhatsAppUrl } from "@/lib/config";

const faqs = [
  {
    question: "Qual o melhor hambúrguer da Dog Burger?",
    answer:
      "O Australiano Burger é o mais pedido! Pão australiano, hambúrguer 150g, queijo cheddar, mussarela, bacon crocante, cebola roxa, rúcula, tomate, molho barbecue e molho especial. Por R$ 27,90.",
  },
  {
    question: "A Dog Burger faz delivery?",
    answer:
      "Sim! Você pode pedir pelo WhatsApp (00) 90000-0007. Entregamos em Porto Fictício� e região.",
  },
  {
    question: "Qual o horário de funcionamento?",
    answer:
      "Terça a Sábado: 15h às 22h30. Domingo: 18h às 22h30. Segunda-feira: Fechado.",
  },
  {
    question: "Onde fica a Dog Burger?",
    answer:
      "Av. Fictícia, 621 - Centro, Porto Fictício� - MS, CEP: 00000-000. Busque por 'Dog Burger & Café' no Google Maps.",
  },
  {
    question: "A Dog Burger tem hot dog prensado?",
    answer:
      "Sim! Nosso Hot Dog Prensado é feito na chapa com crosta dourada, molho artesanal, salsicha Seara, milho verde e batata palha. A partir de R$ 9,90.",
  },
  {
    question: "Qual a nota da Dog Burger no Google?",
    answer:
      "4.8 estrelas com mais de 200 avaliações. Somos a hamburgueria mais bem avaliada de Porto Fictício�!",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const whatsappNumber = useWhatsappNumber();

  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
            Perguntas Frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)] mt-4 tracking-tight">
            <span className="text-white">Tirando suas </span>
            <span className="gradient-text">Dúvidas</span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="rounded-2xl glass overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
              >
                <span className="text-white font-medium text-sm sm:text-base pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={20} className="text-primary" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-muted text-sm sm:text-base leading-relaxed border-t border-border/50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-muted mb-4 text-sm sm:text-base">
            Ainda tem dúvidas?
          </p>
          <motion.a
            href={formatWhatsAppUrl(
              whatsappNumber,
              "Olá! Vim pelo site e tenho uma dúvida."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-primary text-sm sm:text-base"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <MessageCircle size={18} />
            <span>Fale Conosco no WhatsApp</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
