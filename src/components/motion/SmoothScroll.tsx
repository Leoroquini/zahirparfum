"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { isLowEndDevice } from "@/lib/device";

declare global {
  interface Window {
    __zahirLenis?: Lenis;
  }
}

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

    // Expõe globalmente pra overlays poderem pausar/resumir
    window.__zahirLenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__zahirLenis;
    };
  }, []);

  return <>{children}</>;
}
