"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  getInfoNota,
  getPerfumesComNota,
  normalizarNota,
} from "@/lib/notas-helper";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

type Props = {
  /** Nome da nota tal como aparece na pirâmide (com acentos, case original) */
  nota: string | null;
  /** Slug do perfume atual (não aparece na lista "também aparece em") */
  perfumeAtualId?: string;
  onClose: () => void;
};

export function NotaModal({ nota, perfumeAtualId, onClose }: Props) {
  // Lock body scroll quando modal aberto + ESC pra fechar
  useEffect(() => {
    if (!nota) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [nota, onClose]);

  return (
    <AnimatePresence>
      {nota && (
        <Modal
          nota={nota}
          perfumeAtualId={perfumeAtualId}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  );
}

function Modal({
  nota,
  perfumeAtualId,
  onClose,
}: {
  nota: string;
  perfumeAtualId?: string;
  onClose: () => void;
}) {
  const info = getInfoNota(nota);
  const perfumes = getPerfumesComNota(nota).filter(
    (p) => p.id !== perfumeAtualId,
  );
  const nomeExibicao = info?.nome ?? capitalize(nota);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="nota-modal-titulo"
    >
      {/* Backdrop */}
      <motion.button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 cursor-default bg-ink/85 backdrop-blur-md"
      />

      {/* Modal body */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="relative w-full max-w-2xl overflow-hidden rounded-sm border border-amber/25 bg-ink-soft shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-all hover:border-amber hover:text-amber"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
          >
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Header — fundo gradiente sutil + tipografia da nota */}
        <div className="relative overflow-hidden border-b border-cream/8 px-6 py-10 md:px-10 md:py-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at 70% 30%, rgba(200,155,60,0.18), transparent 60%)",
            }}
          />
          <div className="relative">
            {info && (
              <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
                Família · {info.familia}
              </span>
            )}
            <h2
              id="nota-modal-titulo"
              className="mt-3 font-display text-4xl font-light leading-[1.05] tracking-tight text-cream md:text-5xl"
            >
              {nomeExibicao}
            </h2>

            {info && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {info.comoCheira.map((adj) => (
                  <li
                    key={adj}
                    className="rounded-full border border-amber/35 px-3 py-1 text-[11px] font-sans uppercase tracking-[0.25em] text-amber/90"
                  >
                    {adj}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Corpo — descrição editorial + lista de perfumes */}
        <div className="max-h-[60vh] overflow-y-auto px-6 py-8 md:px-10">
          {info ? (
            <p className="font-display text-lg font-light leading-[1.55] text-cream/90 md:text-xl">
              {info.descricao}
            </p>
          ) : (
            <p className="text-sm italic text-cream/55">
              Nota ainda sem leitura editorial — em breve a gente escreve.
            </p>
          )}

          {perfumes.length > 0 && (
            <div className="mt-10">
              <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
                {perfumes.length === 1
                  ? "Aparece também em"
                  : `Aparece também em ${perfumes.length} ${
                      perfumes.length === 1 ? "perfume" : "perfumes"
                    }`}
              </span>
              <ul className="mt-4 flex flex-col divide-y divide-cream/8 border-y border-cream/8">
                {perfumes.slice(0, 6).map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/perfume/${p.id}`}
                      onClick={onClose}
                      className="group flex items-baseline justify-between gap-4 py-3 transition-colors hover:bg-ink-muted/40"
                    >
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate font-display text-base font-light text-cream group-hover:text-amber md:text-lg">
                          {p.nome}
                        </span>
                        {p.marca && (
                          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-cream/45">
                            {p.marca}
                            {p.familia ? ` · ${p.familia}` : ""}
                          </span>
                        )}
                      </div>
                      <span className="shrink-0 text-xs text-amber/70 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              {perfumes.length > 6 && (
                <p className="mt-4 text-xs italic text-cream/45">
                  + {perfumes.length - 6}{" "}
                  {perfumes.length - 6 === 1 ? "outro" : "outros"} no catálogo
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Hook export: retorna handlers comuns pro caller que quer renderizar
 * o modal com seu próprio state.
 */
export function isNotaCatalogada(nota: string): boolean {
  return getInfoNota(nota) !== null || normalizarNota(nota).length > 0;
}
