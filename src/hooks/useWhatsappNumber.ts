"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/config";

export function useWhatsappNumber() {
  const [whatsappNumber, setWhatsappNumber] = useState(
    siteConfig.whatsappNumber
  );

  useEffect(() => {
    const savedNumber = localStorage.getItem("whatsapp_number");
    if (savedNumber) {
      setWhatsappNumber(savedNumber);
    }
  }, []);

  return whatsappNumber;
}
