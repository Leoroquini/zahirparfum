"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { CATALOGO, type Perfume } from "@/data/catalogo";
import { addItem, precoDa } from "@/lib/lista-store";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";
import { toast } from "@/lib/toast-store";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

const KIT_DEFAULT_IDS: [string, string, string] = [
  "salvo-elixir",
  "asad-preto",
  "al-noble-safeer",
];

/**
 * Kit Descobridor: 3 decants 10ml com 20% off.
 * Cliente pode trocar qualquer um dos 3 antes de adicionar à lista.
 * Sugestão padrão = 3 entradas equilibradas (fresco/oriental/gourmand).
 */
export function KitDescobridor() {
  const [kitIds, setKitIds] = useState<string[]>(KIT_DEFAULT_IDS);
  const [editandoIdx, setEditandoIdx] = useState<number | null>(null);

  // Resolve perfumes (filtra ids inválidos defensivamente)
  const kit = useMemo(
    () =>
      kitIds
        .map((id) => CATALOGO.find((p) => p.id === id))
        .filter((p): p is Perfume => !!p),
    [kitIds],
  );

  // Cálculo dinâmico — sempre bate com o estado atual do catálogo
  const totalAvulso = kit.reduce((sum, p) => sum + precoDa(p, "decant-10"), 0);
  const precoKit = Math.round((totalAvulso * 0.8) / 5) * 5;
  const descontoPct =
    totalAvulso > 0
      ? Math.round(((totalAvulso - precoKit) / totalAvulso) * 100)
      : 0;

  const customizado = kitIds.some((id, i) => id !== KIT_DEFAULT_IDS[i]);

  const trocarPerfume = (idx: number, novoId: string) => {
    setKitIds((prev) => {
      const next = [...prev];
      next[idx] = novoId;
      return next;
    });
    setEditandoIdx(null);
  };

  const resetarKit = () => {
    setKitIds(KIT_DEFAULT_IDS);
    setEditandoIdx(null);
  };

  const handleAdicionarKit = () => {
    if (kit.length === 0) return;
    kit.forEach((p) => addItem(p, "decant-10"));
    toast.success(
      "Kit Descobridor na sua lista",
      `${kit.length} decants 10ml adicionados. Desconto de 20% aplicado no fechamento via DM.`,
    );
  };

  return (
    <section className="relative overflow-hidden border-t border-cream/5 bg-ink-soft px-6 py-20 md:px-12 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(200,155,60,0.15), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20"
        >
          {/* Lado esquerdo — pitch */}
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="h-px w-8 bg-amber" />
              Kit Descobridor
            </span>
            <h2 className="max-w-xl font-display text-4xl font-light leading-[1.05] tracking-tight text-cream md:text-5xl lg:text-6xl">
              Três decants{" "}
              {customizado ? "do seu jeito" : "curados"} por{" "}
              <em className="italic text-amber/90">R$ {precoKit}.</em>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-cream/70 md:text-lg">
              Três decants de 10 ml de perfumes árabes diferentes, com{" "}
              <em className="italic text-cream">20% off</em> versus comprar
              avulso. A combinação padrão é equilibrada — fresco especiado,
              oriental denso, gourmand noturno — mas você pode trocar qualquer
              um dos três pelos seus favoritos do catálogo.
            </p>

            <div className="mt-2 flex flex-wrap items-baseline gap-4">
              <span className="font-display text-4xl font-light text-cream md:text-5xl">
                R$ {precoKit}
              </span>
              {totalAvulso > precoKit && (
                <>
                  <span className="text-sm text-cream/55 line-through">
                    R$ {totalAvulso}
                  </span>
                  <span className="rounded-full bg-amber/15 px-3 py-1 text-[10px] font-sans uppercase tracking-[0.3em] text-amber">
                    {descontoPct}% off
                  </span>
                </>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAdicionarKit}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-amber px-8 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all duration-500 hover:bg-amber-bright"
              >
                Adicionar kit à lista
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </button>
              {customizado ? (
                <button
                  type="button"
                  onClick={resetarKit}
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-cream/25 px-8 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-cream/85 transition-all hover:border-amber hover:text-amber"
                >
                  Voltar pra sugestão original
                </button>
              ) : (
                <Link
                  href="/catalogo"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-cream/25 px-8 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-cream/85 transition-all hover:border-amber hover:text-amber"
                >
                  Ver catálogo completo
                </Link>
              )}
            </div>

            {customizado && (
              <p className="text-xs italic text-amber/70">
                Você customizou o kit. O desconto de 20% segue valendo.
              </p>
            )}
          </div>

          {/* Lado direito — os 3 perfumes */}
          <div className="flex flex-col gap-3">
            {kitIds.map((id, idx) => {
              const p = CATALOGO.find((x) => x.id === id);
              const editando = editandoIdx === idx;
              return (
                <motion.div
                  key={`slot-${idx}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + idx * 0.1,
                    ease: EASE_OUT,
                  }}
                >
                  <AnimatePresence mode="wait">
                    {editando ? (
                      <SeletorPerfume
                        key={`editor-${idx}`}
                        idx={idx}
                        idsJaNoKit={kitIds}
                        onCancelar={() => setEditandoIdx(null)}
                        onEscolher={(novoId) => trocarPerfume(idx, novoId)}
                      />
                    ) : p ? (
                      <CardPerfume
                        key={`card-${idx}`}
                        idx={idx}
                        perfume={p}
                        onTrocar={() => setEditandoIdx(idx)}
                      />
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Card de perfume (modo padrão) ---------------- */

function CardPerfume({
  idx,
  perfume,
  onTrocar,
}: {
  idx: number;
  perfume: Perfume;
  onTrocar: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative flex items-center gap-4 rounded-sm border border-amber/20 bg-ink/50 p-4 transition-all hover:border-amber/40 md:gap-5 md:p-5"
    >
      {hasFoto(perfume) && (
        <Link
          href={`/perfume/${perfume.id}`}
          className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border border-cream/10 md:h-20 md:w-20"
        >
          <Image
            src={fotoSrc(perfume)}
            alt=""
            fill
            sizes="80px"
            className="object-cover transition-transform duration-700 hover:scale-110"
          />
        </Link>
      )}
      <Link
        href={`/perfume/${perfume.id}`}
        className="flex min-w-0 flex-1 flex-col gap-1"
      >
        <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber/80">
          0{idx + 1} · {perfume.marca}
        </span>
        <span className="font-display text-lg font-light leading-tight text-cream transition-colors hover:text-amber/95 md:text-xl">
          {perfume.nome}
        </span>
        {perfume.cloneDe?.[0] && (
          <span className="text-xs italic text-cream/50">
            inspirado em {perfume.cloneDe[0]}
          </span>
        )}
      </Link>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="text-xs font-sans uppercase tracking-[0.3em] text-cream/60">
          10ml
        </span>
        <button
          type="button"
          onClick={onTrocar}
          className="text-[10px] font-sans uppercase tracking-[0.3em] text-amber/70 underline-offset-4 hover:text-amber hover:underline"
          aria-label={`Trocar ${perfume.nome} por outro perfume`}
        >
          Trocar
        </button>
      </div>
    </motion.div>
  );
}

/* ---------------- Seletor inline (modo edição) ---------------- */

function SeletorPerfume({
  idx,
  idsJaNoKit,
  onCancelar,
  onEscolher,
}: {
  idx: number;
  idsJaNoKit: string[];
  onCancelar: () => void;
  onEscolher: (id: string) => void;
}) {
  const [busca, setBusca] = useState("");

  const opcoes = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return CATALOGO.filter((p) => {
      // Não pode escolher um perfume que já está em outra posição do kit
      const usadoEmOutroSlot = idsJaNoKit.some(
        (id, i) => i !== idx && id === p.id,
      );
      if (usadoEmOutroSlot) return false;
      if (!q) return true;
      return (
        p.nome.toLowerCase().includes(q) ||
        (p.marca?.toLowerCase().includes(q) ?? false) ||
        (p.familia?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [busca, idsJaNoKit, idx]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-sm border border-amber/40 bg-ink-soft p-4 md:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber">
          Trocar slot 0{idx + 1}
        </span>
        <button
          type="button"
          onClick={onCancelar}
          className="text-xs italic text-cream/55 underline-offset-4 hover:text-amber hover:underline"
        >
          cancelar
        </button>
      </div>

      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Procura por nome, marca ou família..."
        autoFocus
        className="mt-3 w-full rounded-sm border border-cream/15 bg-ink px-3 py-2 text-sm text-cream placeholder:text-cream/35 focus:border-amber focus:outline-none"
      />

      <ul className="mt-3 flex max-h-72 flex-col gap-1 overflow-y-auto pr-1">
        {opcoes.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onEscolher(p.id)}
              className="flex w-full items-center gap-3 rounded-sm border border-transparent bg-ink px-3 py-2 text-left transition-all hover:border-amber/40 hover:bg-ink-muted"
            >
              {hasFoto(p) && (
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm border border-cream/10">
                  <Image
                    src={fotoSrc(p)}
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-display text-sm font-light text-cream">
                  {p.nome}
                </span>
                <span className="truncate text-[10px] font-sans uppercase tracking-[0.3em] text-cream/50">
                  {p.marca}
                  {p.familia ? ` · ${p.familia}` : ""}
                </span>
              </div>
              <span className="shrink-0 text-[10px] font-sans uppercase tracking-[0.3em] text-amber/70">
                R$ {precoDa(p, "decant-10")}
              </span>
            </button>
          </li>
        ))}
        {opcoes.length === 0 && (
          <li className="px-3 py-4 text-xs italic text-cream/45">
            Nenhum perfume encontrado.
          </li>
        )}
      </ul>
    </motion.div>
  );
}
