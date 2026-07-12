import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWhatsAppUrl(phone: string, message?: string): string {
  const baseUrl = "https://wa.me/";
  const cleanedPhone = phone.replace(/\D/g, "");
  const encodedMessage = message
    ? `?text=${encodeURIComponent(message)}`
    : "";
  return `${baseUrl}${cleanedPhone}${encodedMessage}`;
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
