"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import type { Perfume } from "@/data/catalogo";
import { precoDa } from "@/lib/lista-store";
import { linkInstagram, mensagemPerfume } from "@/lib/reserva-dm";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";

/**
 * Barra fixa no rodapé do mobile com preço do frasco + CTA reservar.
 * Aparece depois que o usuário scrolla além da primeira dobra.
 * Só em mobile/tablet (lg:hidden).
 */
export function StickyReservaBar({ perfume }: { perfume: Perfume }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isPending = !perfume.marca || perfume.precoVenda === null;
  if (isPending) return null;

  const preco = precoDa(perfume, "frasco");

  const handleReservar = () => {
    const msg = mensagemPerfume(perfume, "frasco");
    const url = linkInstagram(msg);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-cream/10 bg-ink/95 px-4 py-3 backdrop-blur-xl lg:hidden"
        >
          <div className="mx-auto flex max-w-[1440px] items-center gap-3">
            {hasFoto(perfume) && (
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm border border-cream/10 bg-ink-soft">
                <Image
                  src={fotoSrc(perfume)}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-[10px] font-sans uppercase tracking-[0.3em] text-amber/80">
                {perfume.nome}
              </span>
              <span className="font-display text-xl font-light leading-none text-cream">
                R$ {preco}
              </span>
            </div>
            <button
              type="button"
              onClick={handleReservar}
              className="shrink-0 rounded-full bg-amber px-5 py-2.5 text-[10px] font-sans uppercase tracking-[0.3em] text-ink transition-colors hover:bg-amber-bright"
            >
              Reservar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
