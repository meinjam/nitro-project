"use client";

import { useEffect, useState } from "react";

const SCROLLED_OFFSET = 24;

/**
 * Tracks whether the page has scrolled past the top threshold so the fixed navbar
 * can apply a subtle dark readability backdrop while remaining visible at constant height.
 */
export function useNavbarScrollState(): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLLED_OFFSET);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}
