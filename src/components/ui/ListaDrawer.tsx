"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  useLista,
  removeItem,
  clearLista,
  labelDa,
  type ItemLista,
} from "@/lib/lista-store";
import { CATALOGO } from "@/data/catalogo";
import { mensagemLista, linkInstagram } from "@/lib/reserva-dm";
import { events } from "@/lib/track";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Drawer lateral + botão flutuante da "Minha Lista de Reserva".
 * Renderizado globalmente no layout, sempre disponível no canto direito.
 */
export function ListaDrawer() {
  const items = useLista();
  const [open, setOpen] = useState(false);

  const total = items.reduce((sum, i) => sum + i.precoSnapshot, 0);

  // Lock scroll quando drawer aberto
  useEffect(() => {
    if (!open) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleEnviar = () => {
    events.enviouListaDm(items.length, total);
    const mensagem = mensagemLista(items);
    const url = linkInstagram(mensagem);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Botão flutuante (só aparece quando há itens) */}
      <AnimatePresence>
        {items.length > 0 && !open && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-amber px-5 py-3.5 shadow-[0_8px_32px_rgba(200,155,60,0.35)] transition-all hover:bg-amber-bright hover:shadow-[0_12px_40px_rgba(200,155,60,0.5)] md:bottom-10 md:right-10"
            aria-label="Abrir lista de reserva"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[11px] font-sans font-medium tabular-nums text-amber">
              {items.length}
            </span>
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-ink">
              Minha lista
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Overlay + drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm"
              aria-hidden
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-hidden border-l border-cream/10 bg-ink-soft md:max-w-lg"
              role="dialog"
              aria-modal="true"
              aria-label="Minha lista de reserva"
            >
              {/* Header */}
              <header className="flex items-start justify-between gap-4 border-b border-cream/5 px-6 py-5 md:px-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
                    Minha lista de reserva
                  </span>
                  <h2 className="font-display text-2xl font-light text-cream">
                    {items.length === 0
                      ? "Sua lista"
                      : items.length === 1
                      ? "1 fragrância"
                      : `${items.length} fragrâncias`}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-[11px] font-sans uppercase tracking-[0.3em] text-cream/60 transition-colors hover:text-amber"
                  aria-label="Fechar"
                >
                  Fechar ×
                </button>
              </header>

              {/* Corpo */}
              <div className="flex-1 overflow-y-auto px-6 py-4 md:px-8">
                {items.length === 0 ? (
                  <EmptyState />
                ) : (
                  <ul className="flex flex-col gap-3">
                    {items.map((item) => (
                      <ListaItemRow key={`${item.perfumeId}-${item.variante}`} item={item} />
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer — ações */}
              {items.length > 0 && (
                <footer className="border-t border-cream/5 bg-ink/60 px-6 py-6 md:px-8">
                  <div className="mb-4 flex items-baseline justify-between gap-2">
                    <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-cream/50">
                      Total estimado
                    </span>
                    <span className="font-display text-3xl font-light text-cream">
                      R${" "}
                      {total.toLocaleString("pt-BR", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <p className="mb-5 text-[11px] italic leading-relaxed text-cream/45">
                    Frete não incluso. O valor final é confirmado no DM depois
                    do seu CEP — ou no Pix.
                  </p>

                  <button
                    type="button"
                    onClick={handleEnviar}
                    className="group flex w-full items-center justify-center gap-3 rounded-full bg-amber px-6 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
                  >
                    Enviar lista via Instagram
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (
                        confirm("Limpar toda a lista?")
                      ) {
                        clearLista();
                      }
                    }}
                    className="mt-4 w-full text-center text-[10px] font-sans uppercase tracking-[0.3em] text-cream/40 transition-colors hover:text-wine"
                  >
                    Limpar lista
                  </button>
                </footer>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Empty state ---------------- */

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-5 py-10 text-center">
      <span className="font-display text-5xl italic text-amber/40">∅</span>
      <div className="flex flex-col gap-2">
        <p className="font-display text-xl font-light text-cream">
          Sua lista está vazia.
        </p>
        <p className="max-w-xs text-sm leading-relaxed text-cream/60">
          Adicione perfumes pelo{" "}
          <Link
            href="/catalogo"
            className="italic text-amber underline-offset-4 hover:underline"
          >
            catálogo
          </Link>{" "}
          e envie tudo de uma vez pro Instagram.
        </p>
      </div>
    </div>
  );
}

/* ---------------- Item row ---------------- */

function ListaItemRow({ item }: { item: ItemLista }) {
  const perfume = CATALOGO.find((p) => p.id === item.perfumeId);
  if (!perfume) return null;

  return (
    <li className="group relative flex items-start gap-4 rounded-sm border border-cream/10 bg-ink/40 p-4 transition-colors hover:border-amber/40">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-amber/80">
          Nº {String(perfume.numero).padStart(2, "0")} ·{" "}
          {labelDa(item.variante)}
        </span>
        <Link
          href={`/perfume/${perfume.id}`}
          className="font-display text-lg font-light leading-tight text-cream transition-colors hover:text-amber"
        >
          {perfume.nome}
        </Link>
        {perfume.marca && (
          <span className="text-xs italic text-cream/50">{perfume.marca}</span>
        )}
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="font-display text-xl font-light text-cream">
          R$ {item.precoSnapshot}
        </span>
        <button
          type="button"
          onClick={() => removeItem(item.perfumeId, item.variante)}
          className="text-[10px] font-sans uppercase tracking-[0.3em] text-cream/40 transition-colors hover:text-wine"
          aria-label={`Remover ${perfume.nome} da lista`}
        >
          Remover
        </button>
      </div>
    </li>
  );
}
