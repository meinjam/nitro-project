"use client";

import { useEffect, useState } from "react";

interface NavbarScrollState {
  scrolled: boolean;
  visible: boolean;
  show: () => void;
}

const SCROLLED_OFFSET = 24;
const TOP_PIN_OFFSET = 40;
const DIRECTION_THRESHOLD = 8;

/**
 * Tracks scroll direction with hysteresis so the navbar stays pinned at the top,
 * hides smoothly while scrolling down, and reappears immediately on reverse (upward) scroll.
 */
export function useNavbarScrollState(): NavbarScrollState {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - lastY;

      setScrolled(currentY > SCROLLED_OFFSET);

      if (currentY <= TOP_PIN_OFFSET) {
        setVisible(true);
        lastY = currentY;
        return;
      }

      if (Math.abs(delta) < DIRECTION_THRESHOLD) return;

      setVisible(delta < 0);
      lastY = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return {
    scrolled,
    visible,
    show: () => setVisible(true),
  };
}
