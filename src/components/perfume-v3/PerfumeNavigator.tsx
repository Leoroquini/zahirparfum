"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { CATALOGO, type Perfume } from "@/data/catalogo";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

type Props = {
  perfumeAtual: Perfume;
};

export function PerfumeNavigator({ perfumeAtual }: Props) {
  const ordenado = useMemo(
    () => [...CATALOGO].sort((a, b) => a.numero - b.numero),
    []
  );
  const indexAtual = ordenado.findIndex((p) => p.id === perfumeAtual.id);
  const anterior = indexAtual > 0 ? ordenado[indexAtual - 1] : null;
  const proximo =
    indexAtual >= 0 && indexAtual < ordenado.length - 1
      ? ordenado[indexAtual + 1]
      : null;

  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <>
      <BarraNavegacao
        perfumeAtual={perfumeAtual}
        anterior={anterior}
        proximo={proximo}
        total={ordenado.length}
        index={indexAtual}
        onOpenPicker={() => setPickerOpen(true)}
      />
      <Picker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        atualId={perfumeAtual.id}
        catalogo={ordenado}
      />
    </>
  );
}

/* ---------------- Barra inline com prev/picker/next ---------------- */

function BarraNavegacao({
  perfumeAtual,
  anterior,
  proximo,
  total,
  index,
  onOpenPicker,
}: {
  perfumeAtual: Perfume;
  anterior: Perfume | null;
  proximo: Perfume | null;
  total: number;
  index: number;
  onOpenPicker: () => void;
}) {
  return (
    <div className="relative z-10 mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 pb-2 pt-24 md:px-12 md:pt-28">
      {/* Anterior */}
      {anterior ? (
        <Link
          href={`/perfume/${anterior.id}`}
          className="group flex items-center gap-2 rounded-full border border-ink/15 bg-cream-soft/85 px-3 py-2 text-[10px] font-sans uppercase tracking-[0.28em] text-ink/75 backdrop-blur-sm transition-all hover:border-amber/60 hover:bg-cream hover:text-ink md:px-4 md:py-2.5"
          aria-label={`Anterior: ${anterior.nome}`}
        >
          <span className="text-base leading-none transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <span className="hidden sm:inline">Anterior</span>
          <span className="hidden font-display text-xs italic text-amber-dim md:inline">
            Nº {String(anterior.numero).padStart(2, "0")}
          </span>
        </Link>
      ) : (
        <span aria-hidden className="w-[44px] md:w-[140px]" />
      )}

      {/* Picker no centro */}
      <button
        type="button"
        onClick={onOpenPicker}
        className="group flex items-center gap-2 rounded-full border border-ink/15 bg-cream-soft/90 px-4 py-2 text-[10px] font-sans uppercase tracking-[0.3em] text-ink/85 backdrop-blur-sm transition-all hover:border-amber/60 hover:bg-cream hover:text-ink md:gap-3 md:px-5 md:py-2.5"
        aria-label="Trocar perfume"
      >
        <span className="hidden font-display text-sm italic text-amber-dim sm:inline">
          Nº {String(perfumeAtual.numero).padStart(2, "0")}
        </span>
        <span className="hidden h-3 w-px bg-ink/15 sm:block" />
        <span>Trocar perfume</span>
        <span className="hidden text-ink/55 sm:inline">
          {index + 1}/{total}
        </span>
        <span aria-hidden className="text-ink/50">⌕</span>
      </button>

      {/* Próximo */}
      {proximo ? (
        <Link
          href={`/perfume/${proximo.id}`}
          className="group flex items-center gap-2 rounded-full border border-ink/15 bg-cream-soft/85 px-3 py-2 text-[10px] font-sans uppercase tracking-[0.28em] text-ink/75 backdrop-blur-sm transition-all hover:border-amber/60 hover:bg-cream hover:text-ink md:px-4 md:py-2.5"
          aria-label={`Próximo: ${proximo.nome}`}
        >
          <span className="hidden font-display text-xs italic text-amber-dim md:inline">
            Nº {String(proximo.numero).padStart(2, "0")}
          </span>
          <span className="hidden sm:inline">Próximo</span>
          <span className="text-base leading-none transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      ) : (
        <span aria-hidden className="w-[44px] md:w-[140px]" />
      )}
    </div>
  );
}

/* ---------------- Picker (drawer com busca) ---------------- */

function Picker({
  open,
  onClose,
  atualId,
  catalogo,
}: {
  open: boolean;
  onClose: () => void;
  atualId: string;
  catalogo: Perfume[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Lock scroll quando aberto
  useEffect(() => {
    if (!open) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
    };
  }, [open]);

  // Esc fecha
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Reset query ao abrir
  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  // Prefetch dos slugs visíveis pra navegação ficar instantânea
  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return catalogo;
    return catalogo.filter((p) => {
      const haystack = [
        p.nome,
        p.nomeCompleto,
        p.marca ?? "",
        p.familia ?? "",
        ...(p.cloneDe ?? []),
        String(p.numero),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, catalogo]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
          />

          {/* Painel */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="fixed inset-x-4 top-4 z-50 mx-auto flex max-h-[calc(100svh-2rem)] max-w-3xl flex-col overflow-hidden rounded-sm border border-ink/15 bg-cream-soft shadow-product md:inset-x-auto md:left-1/2 md:top-12 md:max-h-[calc(100svh-6rem)] md:w-[min(720px,90vw)] md:-translate-x-1/2"
          >
            {/* Header com busca */}
            <div className="flex items-center gap-3 border-b border-ink/10 px-5 py-4 md:px-6">
              <span aria-hidden className="text-amber-dim">
                ⌕
              </span>
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nome, marca, família, inspirado em…"
                className="flex-1 bg-transparent font-display text-lg text-ink placeholder:text-ink/40 focus:outline-none md:text-xl"
              />
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-ink/20 px-3 py-1 text-[9px] font-sans uppercase tracking-[0.3em] text-ink/70 transition-all hover:border-ink hover:bg-ink hover:text-cream"
                aria-label="Fechar"
              >
                Esc
              </button>
            </div>

            {/* Lista */}
            <div className="overflow-y-auto px-2 py-2 md:px-3 md:py-3">
              {filtrados.length === 0 ? (
                <div className="px-4 py-12 text-center">
                  <span className="font-display text-base italic text-ink/55">
                    Nenhum perfume encontrado pra "{query}".
                  </span>
                </div>
              ) : (
                <ul className="flex flex-col">
                  {filtrados.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => {
                          if (p.id === atualId) {
                            onClose();
                            return;
                          }
                          onClose();
                          router.push(`/perfume/${p.id}`);
                        }}
                        className={`flex w-full items-center gap-4 rounded-sm px-3 py-2.5 text-left transition-colors hover:bg-amber/10 md:px-4 md:py-3 ${
                          p.id === atualId ? "bg-amber/15" : ""
                        }`}
                      >
                        {/* Foto */}
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm bg-cream-muted/40 md:h-14 md:w-14">
                          {hasFoto(p) ? (
                            <Image
                              src={fotoSrc(p)}
                              alt=""
                              fill
                              sizes="56px"
                              className="object-contain"
                            />
                          ) : (
                            <span className="flex h-full items-center justify-center font-display text-xs italic text-ink/40">
                              Nº{p.numero}
                            </span>
                          )}
                        </div>

                        {/* Texto */}
                        <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                          <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-amber-dim">
                            Nº {String(p.numero).padStart(2, "0")} ·{" "}
                            {p.marca ?? "—"}
                          </span>
                          <span className="truncate font-display text-base text-ink md:text-lg">
                            {p.nome}
                          </span>
                          {p.cloneDe && p.cloneDe[0] && (
                            <span className="truncate text-xs italic text-ink/65">
                              inspirado em {p.cloneDe[0]}
                            </span>
                          )}
                        </div>

                        {/* Indicador atual / preço */}
                        {p.id === atualId ? (
                          <span className="shrink-0 text-[9px] font-sans uppercase tracking-[0.3em] text-amber-dim">
                            Atual
                          </span>
                        ) : (
                          p.precoVenda !== null && (
                            <span className="shrink-0 font-display text-base text-ink/85">
                              R$ {p.precoVenda}
                            </span>
                          )
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer dica de teclado */}
            <div className="hidden border-t border-ink/10 px-6 py-2.5 text-[10px] font-sans uppercase tracking-[0.3em] text-ink/50 md:block">
              {filtrados.length} de {catalogo.length} fragrâncias · Esc fecha
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
