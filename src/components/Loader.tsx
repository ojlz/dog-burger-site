"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, #FFD400 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Smoke Effect */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,212,0,0.1) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Logo */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold font-[family-name:var(--font-display)] tracking-tighter"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="gradient-text">DOG</span>
              <span className="text-white"> BURGER</span>
            </motion.h1>

            <motion.p
              className="text-muted text-lg tracking-[0.3em] uppercase mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              & Café
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-surface-light overflow-hidden rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>

          {/* Loading Text */}
          <motion.p
            className="absolute bottom-12 text-muted text-sm tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            PREPARANDO SUA EXPERIÊNCIA
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
