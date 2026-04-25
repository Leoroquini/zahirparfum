"use client";

import { useEffect, useState } from "react";
import { isLowEndDevice } from "@/lib/device";

/**
 * Ruído visual (film grain) em cima de toda a tela.
 * SVG fractalNoise + mix-blend-overlay é caro em GPU — por isso só renderiza:
 *   - do lado do cliente (SSR não precisa)
 *   - em telas md+ (mobile já tem muita textura própria)
 *   - em hardware que aguenta (detecta via lib/device)
 */
export function GrainOverlay() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isLowEndDevice()) return;
    if (window.innerWidth < 1024) return; // desktop only
    setShouldRender(true);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.07] mix-blend-overlay"
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <filter id="zahir-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#zahir-grain)" />
      </svg>
    </div>
  );
}
