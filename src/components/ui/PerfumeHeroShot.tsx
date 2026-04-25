"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { Perfume } from "@/data/catalogo";
import { fotoSrc } from "@/lib/perfume-foto";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Hero shot do produto — foto grande do frasco com spray effect no hover.
 * Partículas só renderizam DURANTE o hover (evita 14 animações infinitas
 * rodando mesmo quando o usuário não está olhando, que travava mobile).
 */
export function PerfumeHeroShot({ perfume }: { perfume: Perfume }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: EASE_OUT }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      className="group relative aspect-square w-full overflow-hidden rounded-sm border border-cream/10 bg-ink-soft"
    >
      {/* Foto do frasco */}
      <Image
        src={fotoSrc(perfume)}
        alt={`Frasco de ${perfume.nomeCompleto}`}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
        quality={78}
        className="object-cover transition-transform duration-[1800ms] group-hover:scale-[1.03]"
      />

      {/* Glow âmbar ao hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(231,182,89,0.25) 0%, transparent 55%)",
        }}
      />

      {/* Spray particles — só renderiza enquanto hover ativo */}
      {isHovering && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {SPRAY_PARTICLES.map((p) => (
            <SprayParticle key={p.id} delay={p.delay} x={p.x} size={p.size} />
          ))}
        </div>
      )}

      {/* Etiqueta de interação no canto */}
      <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-cream/15 bg-ink/60 px-3 py-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-80">
        <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-amber" />
        <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-cream/80">
          Cheire com os olhos
        </span>
      </div>

      {/* Frame âmbar fino no hover pra acabamento */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-sm ring-1 ring-inset ring-transparent transition-all duration-500 group-hover:ring-amber/30"
      />
    </motion.div>
  );
}

/* ---------------- Spray particles ---------------- */

type Particle = { id: number; x: number; delay: number; size: number };

const SPRAY_PARTICLES: Particle[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  x: 35 + Math.random() * 30,
  delay: Math.random() * 1.5,
  size: 2 + Math.random() * 3,
}));

function SprayParticle({
  x,
  delay,
  size,
}: {
  x: number;
  delay: number;
  size: number;
}) {
  return (
    <motion.span
      className="absolute rounded-full bg-amber/80"
      style={{
        left: `${x}%`,
        top: "18%",
        width: size,
        height: size,
        filter: "blur(0.5px)",
      }}
      animate={{
        y: [0, -20, -50, -80],
        x: [0, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 60],
        opacity: [0, 0.9, 0.4, 0],
        scale: [0.3, 1, 1.5, 0.5],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 0.3,
        ease: "easeOut",
      }}
    />
  );
}
