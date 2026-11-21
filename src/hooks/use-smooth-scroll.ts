"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

interface UseSmoothScrollOptions {
  lerp?: number;
  wheelMultiplier?: number;
  anchorDuration?: number;
}

/**
 * Initializes Lenis inertia smooth scrolling synchronized directly with GSAP's ticker
 * and ScrollTrigger updates so scroll-scrubbed animations stay locked 1:1 with page scroll.
 */
export function useSmoothScroll({
  lerp = 0.085,
  wheelMultiplier = 0.9,
  anchorDuration = 1.4,
}: UseSmoothScrollOptions = {}) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp,
      smoothWheel: true,
      wheelMultiplier,
      anchors: {
        duration: anchorDuration,
      },
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickLenis);
      lenis.destroy();
    };
  }, [lerp, wheelMultiplier, anchorDuration]);
}
