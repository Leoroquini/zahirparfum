"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

/**
 * Botão flutuante discreto no canto inferior esquerdo.
 * Leva pra /manifesto — convida a entender a marca sem ocupar espaço
 * na navbar principal.
 *
 * Desktop: pill com símbolo + "Manifesto" em caixa alta.
 * Mobile: só o símbolo num círculo.
 * Esconde na própria /manifesto (e nas pages de onboarding imersivo
 * se fizer sentido no futuro).
 */
export function ManifestoFloat() {
  const pathname = usePathname();
  const esconder =
    pathname === "/manifesto" || pathname.startsWith("/manifesto/");

  return (
    <AnimatePresence>
      {!esconder && (
        <motion.div
          initial={{ opacity: 0, x: -10, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -10, y: 10 }}
          transition={{ duration: 0.5, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="fixed bottom-6 left-6 z-40 md:bottom-10 md:left-10"
        >
          <Link
            href="/manifesto"
            aria-label="Ler o manifesto da ZAHIR"
            className="group flex items-center gap-2 rounded-full border border-amber/40 bg-ink/85 px-3 py-2.5 backdrop-blur-md transition-all hover:border-amber hover:bg-amber hover:text-ink md:gap-3 md:px-4"
          >
            <span className="font-display text-base italic text-amber transition-colors group-hover:text-ink">
              ✦
            </span>
            <span className="hidden text-[10px] font-sans uppercase tracking-[0.35em] text-cream/80 transition-colors group-hover:text-ink md:inline">
              Manifesto
            </span>
            {/* Seta aparece no hover desktop */}
            <span className="hidden text-xs text-amber opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-ink group-hover:opacity-100 md:inline">
              →
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
