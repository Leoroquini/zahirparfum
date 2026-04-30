"use client";

/**
 * Ruído visual (film grain) em cima de toda a tela.
 * Mantém a mesma árvore no SSR e no cliente para evitar mismatch de hidratação.
 * O CSS limita o efeito ao desktop.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] hidden opacity-[0.07] mix-blend-overlay lg:block"
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
