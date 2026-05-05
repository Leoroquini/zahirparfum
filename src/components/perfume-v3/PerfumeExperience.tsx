"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import type { Perfume } from "@/data/catalogo";
import { CATALOGO } from "@/data/catalogo";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";
import { arquetipoDe } from "@/data/arquetipos";
import { addItem, useLista } from "@/lib/lista-store";
import { toast } from "@/lib/toast-store";
import { RelogioPele } from "./RelogioPele";
import { PerfumeNavigator } from "./PerfumeNavigator";
import { PerfumePyramid } from "@/components/ui/PerfumePyramid";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * PerfumeExperience — A página de produto reimaginada.
 *
 * 6 atos cinematográficos:
 *  1. Chegada       — frasco materializa do mármore
 *  2. Encontro      — rotação 3D + nome + arquétipo
 *  3. Constelação   — notas orbitando interativas
 *  4. Relógio       — sundial das 12h na pele
 *  5. Cross-sell    — vai amar também
 *  6. Veredicto     — 3 cartas + reservar
 */

type Props = {
  perfume: Perfume;
};

export function PerfumeExperience({ perfume }: Props) {
  return (
    <div className="relative">
      <PerfumeNavigator perfumeAtual={perfume} />
      <Ato2Encontro perfume={perfume} />
      <Ato3Piramide perfume={perfume} />
      <Ato4Relogio perfume={perfume} />
      <Ato6Veredicto perfume={perfume} />
      <Ato5CrossSell perfume={perfume} />
    </div>
  );
}

/* ============================================================
 * ATO 2 — ENCONTRO (sessão principal)
 * Frasco em destaque + nome se forma + arquétipo.
 * ============================================================ */

function Ato2Encontro({ perfume }: { perfume: Perfume }) {
  const arquetipo = arquetipoDe(perfume.id);
  const palavrasNome = perfume.nome.split(" ");
  const numero = String(perfume.numero).padStart(2, "0");
  const lista = useLista();
  const jaNaLista5 = lista.some(
    (i) => i.perfumeId === perfume.id && i.variante === "decant-5"
  );
  const jaNaListaFrasco = lista.some(
    (i) => i.perfumeId === perfume.id && i.variante === "frasco"
  );
  const preco5 = perfume.precoVenda
    ? Math.round((perfume.precoVenda * 0.2) / 5) * 5
    : null;
  const precoFrasco = perfume.precoVenda;

  const handleAdd = (variante: "decant-5" | "frasco") => {
    addItem(perfume, variante);
    const labels = {
      "decant-5": "Decant 5ml",
      frasco: "Frasco cheio",
    };
    toast.success(
      `${labels[variante]} na sua lista`,
      "Confira a lista no canto direito pra finalizar via Instagram."
    );
  };

  const scrollToVeredicto = () => {
    document
      .getElementById("veredicto")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative flex min-h-[calc(100svh-7rem)] items-center overflow-hidden pb-24 pt-8 md:min-h-[calc(100svh-9rem)] md:pb-32 md:pt-10">
      {/* Sombra diagonal sutil (sol entrando) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: EASE_OUT }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(125deg, rgba(255,250,235,0.35) 0%, transparent 35%, transparent 60%, rgba(120,90,60,0.12) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-12 px-6 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-16 md:px-12">
        {/* Frasco em destaque */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 0.3, ease: EASE_OUT }}
          className="relative flex items-center justify-center"
        >
          {hasFoto(perfume) ? (
            <div className="relative aspect-[4/5] w-full max-w-[560px]">
              <Image
                src={fotoSrc(perfume)}
                alt={perfume.nome}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 45vw"
                className="object-contain drop-shadow-product"
              />
            </div>
          ) : (
            <div className="flex h-[60vh] w-full items-center justify-center">
              <span className="font-display text-[clamp(8rem,18vw,16rem)] italic text-amber/30">
                Nº {numero}
              </span>
            </div>
          )}
        </motion.div>

        {/* Lado direito — nome + arquétipo */}
        <div className="flex flex-col justify-center gap-7">
          {/* Nº editorial pequeno */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE_OUT }}
          >
            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.45em] text-amber-dim">
              Nº {numero} · {perfume.marca ?? "Fragrância"}
            </span>
          </motion.div>

          {/* Nome explosivo */}
          <h1 className="font-display text-[clamp(2.75rem,7.5vw,6.5rem)] font-light leading-[0.94] tracking-[-0.03em] text-ink">
            {palavrasNome.map((palavra, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.6 + i * 0.1,
                  ease: EASE_OUT,
                }}
                className="block"
              >
                {palavra}
                {i === palavrasNome.length - 1 && (
                  <span className="text-amber-dim">.</span>
                )}
              </motion.span>
            ))}
          </h1>

          {/* Arquétipo */}
          {arquetipo && (
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: EASE_OUT }}
              className="max-w-xl border-l-2 border-amber-dim/50 pl-5 font-display text-lg font-light italic leading-[1.45] text-ink/85 md:text-xl"
            >
              {arquetipo}
            </motion.blockquote>
          )}

          {/* Inspirado em (se houver clone) */}
          {perfume.cloneDe && perfume.cloneDe.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="flex flex-wrap items-baseline gap-3"
            >
              <span className="text-[10px] font-sans font-medium uppercase tracking-[0.4em] text-amber-dim">
                Inspirado em
              </span>
              <span className="font-display text-2xl italic text-ink md:text-3xl">
                {perfume.cloneDe.join(" · ")}
              </span>
              {perfume.cloneFidelidade && (
                <span className="text-sm italic text-ink/75">
                  fidelidade {perfume.cloneFidelidade}
                </span>
              )}
            </motion.div>
          )}

          {/* CTA — Provar (decant 5ml) ou Possuir (frasco) */}
          {preco5 !== null && precoFrasco !== null && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8, ease: EASE_OUT }}
              className="flex flex-col gap-3 pt-2"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {/* Provar — decant 5ml (primário, destacado) */}
                <button
                  type="button"
                  onClick={() => handleAdd("decant-5")}
                  disabled={jaNaLista5}
                  className={`group/cta flex items-center justify-between gap-3 rounded-full border px-5 py-3.5 text-left transition-all md:px-6 md:py-4 ${
                    jaNaLista5
                      ? "cursor-default border-amber-dim/40 bg-amber-dim/15 text-ink/65"
                      : "border-ink bg-ink text-cream hover:bg-amber hover:border-amber hover:text-ink hover:shadow-product"
                  }`}
                  aria-label={
                    jaNaLista5
                      ? "Decant de 5ml já está na sua lista"
                      : `Provar Decant 5ml por R$${preco5}`
                  }
                >
                  <span className="flex flex-col gap-0.5 overflow-hidden">
                    <span className="text-[9px] font-sans font-medium uppercase tracking-[0.32em] opacity-75">
                      {jaNaLista5 ? "Na sua lista" : "Provar"}
                    </span>
                    <span className="truncate font-display text-lg font-light leading-tight md:text-xl">
                      {jaNaLista5 ? "✓ Decant 5ml" : `Decant 5ml · R$ ${preco5}`}
                    </span>
                  </span>
                  {!jaNaLista5 && (
                    <span
                      aria-hidden
                      className="shrink-0 text-xl leading-none transition-transform duration-500 group-hover/cta:translate-x-1"
                    >
                      →
                    </span>
                  )}
                </button>

                {/* Possuir — frasco cheio (secundário, outline) */}
                <button
                  type="button"
                  onClick={() => handleAdd("frasco")}
                  disabled={jaNaListaFrasco}
                  className={`group/cta flex items-center justify-between gap-3 rounded-full border px-5 py-3.5 text-left transition-all md:px-6 md:py-4 ${
                    jaNaListaFrasco
                      ? "cursor-default border-amber-dim/40 bg-amber-dim/15 text-ink/65"
                      : "border-ink/40 bg-cream-soft/60 text-ink hover:border-ink hover:bg-cream hover:shadow-editorial"
                  }`}
                  aria-label={
                    jaNaListaFrasco
                      ? "Frasco já está na sua lista"
                      : `Possuir Frasco ${perfume.volume} por R$${precoFrasco}`
                  }
                >
                  <span className="flex flex-col gap-0.5 overflow-hidden">
                    <span className="text-[9px] font-sans font-medium uppercase tracking-[0.32em] text-amber-dim">
                      {jaNaListaFrasco ? "Na sua lista" : "Possuir"}
                    </span>
                    <span className="truncate font-display text-lg font-light leading-tight md:text-xl">
                      {jaNaListaFrasco
                        ? `✓ Frasco ${perfume.volume}`
                        : `Frasco ${perfume.volume} · R$ ${precoFrasco}`}
                    </span>
                  </span>
                  {!jaNaListaFrasco && (
                    <span
                      aria-hidden
                      className="shrink-0 text-xl leading-none transition-transform duration-500 group-hover/cta:translate-x-1"
                    >
                      →
                    </span>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={scrollToVeredicto}
                className="self-start text-[10px] font-sans uppercase tracking-[0.35em] text-ink/65 underline-offset-4 transition-colors hover:text-amber-dim hover:underline"
              >
                ou ver decant 10ml também ↓
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Tagline / role pra conhecer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2, ease: EASE_OUT }}
        className="absolute inset-x-0 bottom-8 z-10 text-center"
      >
        <span className="text-[9px] font-sans uppercase tracking-[0.4em] text-ink/55">
          Role para conhecer ↓
        </span>
      </motion.div>
    </section>
  );
}

/* ============================================================
 * ATO 3 — PIRÂMIDE OLFATIVA
 * ============================================================ */

function Ato3Piramide({ perfume }: { perfume: Perfume }) {
  const hasNotes =
    perfume.notas.topo.length +
      perfume.notas.coracao.length +
      perfume.notas.fundo.length >
    0;

  if (!hasNotes) return null;

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="mb-12 md:mb-16"
        >
          <span className="text-[10px] font-sans font-medium uppercase tracking-[0.45em] text-amber-dim">
            <span className="mr-3 inline-block h-px w-10 align-middle bg-amber-dim" />
            Pirâmide Olfativa
          </span>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1] tracking-tight text-ink">
            As notas que constroem{" "}
            <em className="italic text-amber-dim">você.</em>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/75 md:text-base">
            Topo abre a fragrância — coração assina — fundo é o que fica na
            pele. Toque qualquer nota pra entender como ela cheira e em quais
            outros perfumes do catálogo ela aparece.
          </p>
        </motion.div>

        <PerfumePyramid
          topo={perfume.notas.topo}
          coracao={perfume.notas.coracao}
          fundo={perfume.notas.fundo}
          perfumeId={perfume.id}
        />
      </div>
    </section>
  );
}

/* ============================================================
 * ATO 4 — RELÓGIO NA PELE
 * ============================================================ */

function Ato4Relogio({ perfume }: { perfume: Perfume }) {
  const hasNotes =
    perfume.notas.topo.length +
      perfume.notas.coracao.length +
      perfume.notas.fundo.length >
    0;

  if (!hasNotes) return null;

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="mb-12 md:mb-16"
        >
          <span className="text-[10px] font-sans font-medium uppercase tracking-[0.45em] text-amber-dim">
            <span className="mr-3 inline-block h-px w-10 align-middle bg-amber-dim" />
            Relógio na Pele
          </span>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1] tracking-tight text-ink">
            Como ele evolui{" "}
            <em className="italic text-amber-dim">em você.</em>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/75 md:text-base">
            Perfume não é estático. Toda hora ele muda — e quem te abraça sente
            algo diferente. Arraste o ponteiro pra ver a evolução real na sua
            pele.
          </p>
        </motion.div>

        <RelogioPele
          topo={perfume.notas.topo}
          coracao={perfume.notas.coracao}
          fundo={perfume.notas.fundo}
        />
      </div>
    </section>
  );
}

/* ============================================================
 * ATO 5 — CROSS-SELL
 * ============================================================ */

function Ato5CrossSell({ perfume }: { perfume: Perfume }) {
  // Pega 3 perfumes complementares (mesma família, diferente marca)
  const complementares = CATALOGO.filter(
    (p) =>
      p.id !== perfume.id &&
      p.familia === perfume.familia &&
      p.precoVenda !== null
  ).slice(0, 3);

  if (complementares.length === 0) return null;

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="mb-12 md:mb-16"
        >
          <span className="text-[10px] font-sans font-medium uppercase tracking-[0.45em] text-amber-dim">
            <span className="mr-3 inline-block h-px w-10 align-middle bg-amber-dim" />
            Família Próxima
          </span>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1] tracking-tight text-ink">
            Você também vai{" "}
            <em className="italic text-amber-dim">amar.</em>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {complementares.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: EASE_OUT }}
            >
              <Link
                href={`/perfume/${p.id}`}
                className="group flex h-full flex-col gap-4 rounded-sm border border-ink/10 bg-cream-soft/60 p-6 backdrop-blur-sm shadow-editorial transition-all hover:border-amber/50 hover:shadow-product hover:-translate-y-1"
              >
                {/* Foto */}
                {hasFoto(p) && (
                  <div className="relative aspect-square overflow-hidden rounded-sm bg-cream-muted/40">
                    <Image
                      src={fotoSrc(p)}
                      alt={p.nome}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-sans font-medium uppercase tracking-[0.35em] text-amber-dim">
                    Nº {String(p.numero).padStart(2, "0")} · {p.marca}
                  </span>
                  <h3 className="font-display text-2xl font-light leading-[1.1] text-ink transition-colors group-hover:text-amber-dim">
                    {p.nome}
                  </h3>
                  {p.cloneDe && p.cloneDe[0] && (
                    <p className="text-xs italic text-ink/75">
                      inspirado em {p.cloneDe[0]}
                    </p>
                  )}
                </div>

                <div className="mt-auto flex items-end justify-between border-t border-ink/10 pt-3">
                  <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-ink/65">
                    Frasco · {p.volume}
                  </span>
                  <span className="font-display text-2xl text-ink">
                    R$ {p.precoVenda}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * ATO 6 — VEREDICTO (3 cartas)
 * ============================================================ */

function Ato6Veredicto({ perfume }: { perfume: Perfume }) {
  const lista = useLista();
  const jaNaListaFrasco = lista.some(
    (i) => i.perfumeId === perfume.id && i.variante === "frasco"
  );
  const jaNaLista10 = lista.some(
    (i) => i.perfumeId === perfume.id && i.variante === "decant-10"
  );
  const jaNaLista5 = lista.some(
    (i) => i.perfumeId === perfume.id && i.variante === "decant-5"
  );

  const handleAdd = (variante: "decant-5" | "decant-10" | "frasco") => {
    addItem(perfume, variante);
    const labels = {
      "decant-5": "Decant 5ml",
      "decant-10": "Decant 10ml",
      frasco: "Frasco cheio",
    };
    toast.success(
      `${labels[variante]} na sua lista`,
      "Confira a lista no canto direito pra finalizar via Instagram."
    );
  };

  if (perfume.precoVenda === null) return null;

  // Preços calculados a partir do frasco cheio
  const preco5 = Math.round(perfume.precoVenda * 0.2 / 5) * 5; // ~20% do frasco
  const preco10 = Math.round(perfume.precoVenda * 0.32 / 5) * 5; // ~32% do frasco
  const precoFrasco = perfume.precoVenda;

  return (
    <section id="veredicto" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="text-[10px] font-sans font-medium uppercase tracking-[0.45em] text-amber-dim">
            O Veredicto
          </span>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1] tracking-tight text-ink">
            Como você quer{" "}
            <em className="italic text-amber-dim">conhecer?</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/75 md:text-base">
            Não decide só pelo preço. Decide pelo tempo que esse perfume
            merece na sua vida.
          </p>
        </motion.div>

        {/* 3 CARTAS */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          <Carta
            tamanho="5ml"
            titulo="Provar"
            subtitulo="Uma semana de teste"
            descricao="Decant 5ml. Pra você descobrir se vocês combinam antes de qualquer compromisso."
            preco={preco5}
            onAdd={() => handleAdd("decant-5")}
            jaNaLista={jaNaLista5}
            delay={0}
          />
          <Carta
            tamanho="10ml"
            titulo="Conhecer"
            subtitulo="Um mês na sua rotina"
            descricao="Decant 10ml. Tempo suficiente pra entender como ele evolui na sua pele em diferentes climas e ocasiões."
            preco={preco10}
            onAdd={() => handleAdd("decant-10")}
            jaNaLista={jaNaLista10}
            delay={0.15}
            destaque
          />
          <Carta
            tamanho={perfume.volume}
            titulo="Possuir"
            subtitulo="Anos com você"
            descricao={`Frasco cheio ${perfume.volume}. Vai durar de 1 a 3 anos com uso normal. Pra quem já decidiu.`}
            preco={precoFrasco}
            onAdd={() => handleAdd("frasco")}
            jaNaLista={jaNaListaFrasco}
            delay={0.3}
          />
        </div>

        {/* Prova social placeholder (vira real quando tiver dados) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex flex-col items-center gap-4 text-center"
        >
          <div className="flex items-center gap-2 text-[10px] font-sans font-medium uppercase tracking-[0.4em] text-amber-dim">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-dim" />
            <span>Curadoria · Atendimento humano</span>
          </div>
          <p className="max-w-xl text-sm italic text-ink/75">
            Cada reserva passa por contato direto via Instagram. Você confirma
            tamanho, frete e forma de pagamento antes de qualquer envio.
            Garantia de troca em 7 dias se chegar lacrado.
          </p>
        </motion.div>

        {/* Fim */}
        <div className="mt-16 text-center">
          <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-ink/55">
            Fim do capítulo · Nº {String(perfume.numero).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}

/** Carta individual de tamanho */
function Carta({
  tamanho,
  titulo,
  subtitulo,
  descricao,
  preco,
  onAdd,
  jaNaLista,
  delay,
  destaque = false,
}: {
  tamanho: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  preco: number;
  onAdd: () => void;
  jaNaLista: boolean;
  delay: number;
  destaque?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-sm border bg-cream-soft/80 p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-product md:p-10 ${
        destaque
          ? "border-amber/60 shadow-product"
          : "border-ink/15 shadow-editorial"
      }`}
    >
      {destaque && (
        <div className="absolute right-4 top-4 rounded-full bg-amber px-3 py-1 text-[8px] font-sans font-bold uppercase tracking-[0.3em] text-ink">
          Recomendado
        </div>
      )}

      {/* Volume — herói tipográfico */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-sans font-medium uppercase tracking-[0.4em] text-amber-dim">
          {subtitulo}
        </span>
        <span className="font-display text-[clamp(3.5rem,7vw,5.5rem)] font-light leading-[0.9] tracking-[-0.03em] text-ink">
          {tamanho}
        </span>
      </div>

      {/* Filete divisor */}
      <div className="my-6 h-px w-12 bg-amber-dim/60 md:my-8" />

      {/* Título + descrição */}
      <h3 className="font-display text-3xl font-light leading-[1.05] text-ink md:text-4xl">
        {titulo}
        <span className="text-amber-dim">.</span>
      </h3>

      <p className="mt-4 text-sm leading-relaxed text-ink/80 md:text-base">
        {descricao}
      </p>

      {/* Preço + CTA */}
      <div className="mt-auto flex flex-col gap-5 pt-8">
        <div className="flex items-baseline justify-between gap-3 border-t border-ink/15 pt-5">
          <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-ink/65">
            Preço
          </span>
          <span className="font-display text-3xl font-light text-ink md:text-4xl">
            R$ {preco}
          </span>
        </div>

        <button
          type="button"
          onClick={onAdd}
          disabled={jaNaLista}
          className={`group/btn flex items-center justify-between gap-3 rounded-full px-6 py-3.5 text-[10px] font-sans font-medium uppercase tracking-[0.3em] transition-all ${
            jaNaLista
              ? "bg-amber-dim/30 text-ink/65"
              : "bg-amber text-ink hover:bg-amber-bright"
          }`}
        >
          <span>{jaNaLista ? "✓ Na sua lista" : "Adicionar"}</span>
          {!jaNaLista && (
            <span className="transition-transform duration-500 group-hover/btn:translate-x-1">
              →
            </span>
          )}
        </button>
      </div>
    </motion.div>
  );
}

