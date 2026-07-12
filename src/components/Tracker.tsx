"use client";

import { useEffect } from "react";

export default function Tracker() {
  useEffect(() => {
    // Generate or get unique device ID
    let deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
      deviceId = crypto.randomUUID();
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
