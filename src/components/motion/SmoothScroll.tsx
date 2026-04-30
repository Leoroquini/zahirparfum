"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { isLowEndDevice } from "@/lib/device";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Lenis é o principal culpado por travamento em devices fracos.
    // Em hardware modesto, mobile, ou prefers-reduced-motion, mantém o
    // scroll nativo do browser, que é liso e hardware-accelerated.
    if (isLowEndDevice()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
