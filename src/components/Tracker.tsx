"use client";

import { useEffect } from "react";

function generateId(): string {
  // Try crypto.randomUUID first (modern browsers)
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback: generate a simple unique ID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function Tracker() {
  useEffect(() => {
    // Generate or get unique device ID
    let deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
      deviceId = generateId();
      localStorage.setItem("device_id", deviceId);
    }

    // Check last visit timestamp
    const lastVisit = parseInt(localStorage.getItem("last_visit") || "0");
    const now = Date.now();
    const fifteenMinutes = 15 * 60 * 1000;

    // Only count if 15+ minutes since last visit
    if (now - lastVisit > fifteenMinutes) {
      const visits = parseInt(localStorage.getItem("page_visits") || "0") + 1;
      localStorage.setItem("page_visits", visits.toString());
      localStorage.setItem("last_visit", now.toString());
    }
  }, []);

  return null;
}
