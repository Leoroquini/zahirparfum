"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { CATALOGO, type Perfume } from "@/data/catalogo";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Info curada dos principais designers referenciados no catálogo.
 * Preços são estimativas de boutique no Brasil (abril 2026) — usados
 * apenas pra calcular % de economia; ajustar quando os sócios pesquisarem.
 */
const DESIGNER_INFO: Record<
  string,
  { precoEstimado: number; descricao: string }
> = {
  "Creed Aventus": {
    precoEstimado: 2400,
    descricao:
      "Abacaxi, bétula defumada e musk. O designer mais imitado da perfumaria masculina moderna — lançado em 2010, virou referência obrigatória.",
  },
  "Dior Sauvage EDT": {
    precoEstimado: 850,
    descricao:
      "Bergamota calabresa, ambroxan e pimenta de Sichuan. O fresh cítrico-amadeirado que Johnny Depp transformou em fenômeno mundial.",
  },
  "Dior Sauvage Elixir": {
    precoEstimado: 1300,
    descricao:
      "Versão extrait do Sauvage: cardamomo, canela e baunilha. Potência maior, projeção mais discreta que o EDT.",
  },
  "Dior Sauvage EDP": {
    precoEstimado: 950,
    descricao:
      "Meio-termo entre o EDT e o Elixir. Adiciona baunilha e ambroxan intensificado — masculinidade clássica moderna.",
  },
  "Bleu de Chanel EDT": {
    precoEstimado: 850,
    descricao:
      "Aromático amadeirado com toranja, jasmim e sândalo. A resposta da Chanel pro Sauvage: classe sem grito.",
  },
  "Boss Bottled Absolu": {
    precoEstimado: 900,
    descricao:
      "Cacau, davana e baunilha bourbon. Gourmand masculino sofisticado, pensado pra eventos formais.",
  },
  "Angel's Share by Kilian": {
    precoEstimado: 2600,
    descricao:
      "Cognac, canela e praliné. O gourmand de nicho que definiu a categoria 'bebida madura em perfume'.",
  },
  "Angel's Share": {
    precoEstimado: 2600,
    descricao:
      "Cognac, canela e praliné. Gourmand sofisticado da Kilian que virou referência pra aromas amadurecidos.",
  },
  "Side Effect Initio": {
    precoEstimado: 2600,
    descricao:
      "Tabaco, canela, sândalo. Oriental densamente especiado — Initio é conhecida pela intensidade que dura o dia inteiro.",
  },
  "Initio Oud for Greatness": {
    precoEstimado: 2800,
    descricao:
      "Oud, açafrão e patchouli. Oriental denso da Initio — fragrância que marca presença em ambiente fechado.",
  },
  "Rosendo Mateu": {
    precoEstimado: 2000,
    descricao:
      "Linha autoral espanhola com DNA oriental-oud. Elegância discreta de nicho, feita em pequenas séries.",
  },
  "Tom Ford Oud": {
    precoEstimado: 3500,
    descricao:
      "Oud puro, rosa e patchouli. Oriental masculino de luxo que consagrou o oud no Ocidente nos anos 2000.",
  },
  "YSL Y EDP": {
    precoEstimado: 750,
    descricao:
      "Aromático fougère moderno — maçã, gengibre, lavanda, sálvia. O Y foi o reset da YSL pro público jovem.",
  },
  "Paco Rabanne 1 Million Parfum": {
    precoEstimado: 650,
    descricao:
      "Cardamomo, pimenta rosa, cashmeran. Doce especiado pop — o 1 Million virou ícone do masculino mainstream.",
  },
  "JPG Le Male Elixir": {
    precoEstimado: 900,
    descricao:
      "Lavanda, baunilha e tabaco. A versão extrait do Le Male clássico — mais escura, mais hipnótica.",
  },
  "Givenchy Gentleman EDP": {
    precoEstimado: 700,
    descricao:
      "Íris, couro e baunilha. Amadeirado sofisticado com elegância francesa clássica.",
  },
  "LV Afternoon Swim": {
    precoEstimado: 2400,
    descricao:
      "Cítrico aquático da Louis Vuitton — tangerina, bergamota e âmbar solar. Fresco sofisticado de couture.",
  },
  "Bvlgari Tygar": {
    precoEstimado: 1200,
    descricao:
      "Bergamota, cedro e sândalo. Cítrico amadeirado da Bvlgari — luxo mediterrâneo em frasco escuro.",
  },
  "JPG Ultra Male": {
    precoEstimado: 800,
    descricao:
      "Maçã, baunilha e lavanda. Gourmand frutal que dominou as noites brasileiras em meados dos 2010s.",
  },
  "Orto Parisi Megamare": {
    precoEstimado: 3200,
    descricao:
      "Aquático marinho nuclear. Uma das fragrâncias com maior projeção já criadas — 2 borrifadas e o ambiente fica tomado.",
  },
  "Parfums de Marly Althair": {
    precoEstimado: 2800,
    descricao:
      "Baunilha bourbon, cardamomo e praliné. Gourmand de nicho com 12h+ de fixação — favorito no inverno.",
  },
  "Nishane Hacivat": {
    precoEstimado: 1900,
    descricao:
      "Abacaxi, bergamota, patchouli e cedro. Nishane virou referência ao criar um 'Aventus de nicho turco'.",
  },
};

function infoFor(name: string): { precoEstimado: number; descricao: string } {
  return (
    DESIGNER_INFO[name] ?? {
      precoEstimado: 1500,
      descricao:
        "Designer internacional de alta perfumaria — referência olfativa reconhecida.",
    }
  );
}

/** Designers ordenados por quantidade de alternativas no catálogo */
function sortedDesigners(): string[] {
  const counts = new Map<string, number>();
  CATALOGO.forEach((p) =>
    p.cloneDe?.forEach((d) => counts.set(d, (counts.get(d) ?? 0) + 1))
  );
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);
}

export function ComparadorArabeDesigner({ hideIntro = false }: { hideIntro?: boolean } = {}) {
  const designers = useMemo(() => sortedDesigners(), []);
  const [selected, setSelected] = useState<string>(designers[0] ?? "");

  const alternativas = useMemo(
    () => CATALOGO.filter((p) => p.cloneDe?.includes(selected)),
    [selected]
  );

  const info = infoFor(selected);

  return (
    <section
      id="comparador"
      className="relative border-t border-cream/5 bg-ink px-6 py-28 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-[1440px]">
        {!hideIntro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: EASE_OUT }}
            className="flex flex-col gap-6"
          >
            <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="h-px w-8 bg-amber" />
              Comparador
            </span>
            <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight text-cream md:text-6xl lg:text-7xl">
              Árabe <span className="text-amber/90">×</span>{" "}
              <em className="italic">Designer</em>.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-cream/60 md:text-lg">
              Escolhe um designer que você conhece (ou queria conhecer). Mostramos
              as fragrâncias árabes do catálogo que capturam o mesmo DNA — por
              uma fração do preço.
            </p>
          </motion.div>
        )}

        {/* Designer picker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`${hideIntro ? "" : "mt-12 "}flex flex-col gap-3 border-y border-cream/5 py-6`}
        >
          <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
            Escolha um designer
          </span>
          <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
            {designers.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSelected(d)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs transition-all duration-300 ${
                  selected === d
                    ? "border-amber bg-amber text-ink"
                    : "border-cream/15 text-cream/70 hover:border-amber/50 hover:text-amber"
                }`}
              >
                {d}
                <span className="ml-2 text-[10px] opacity-60">
                  {alternativasFor(d)}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Comparison area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12"
          >
            {/* Left — Designer info */}
            <div className="flex flex-col rounded-sm border border-cream/10 bg-ink-soft/50 p-7 md:p-9">
              <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-cream/40">
                Designer
              </span>
              <h3 className="mt-3 font-display text-3xl font-light leading-[1.1] text-cream md:text-4xl">
                {selected}
              </h3>
              <p className="mt-6 flex-1 text-sm leading-relaxed text-cream/70 md:text-base">
                {info.descricao}
              </p>
              <div className="mt-8 flex flex-col gap-1 border-t border-cream/5 pt-6">
                <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-cream/40">
                  Preço de boutique
                </span>
                <span className="font-display text-3xl font-light text-cream md:text-4xl">
                  R$ {info.precoEstimado.toLocaleString("pt-BR")}
                </span>
                <span className="mt-1 text-[10px] italic text-cream/40">
                  referência de mercado
                </span>
              </div>
            </div>

            {/* Right — Alternativas */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
                Alternativas árabes ·{" "}
                {alternativas.length === 1
                  ? "1 fragrância"
                  : `${alternativas.length} fragrâncias`}
              </span>
              {alternativas.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * i, ease: EASE_OUT }}
                >
                  <AlternativaCard
                    perfume={p}
                    designerPrice={info.precoEstimado}
                  />
                </motion.div>
              ))}
              {alternativas.length === 0 && (
                <p className="rounded-sm border border-dashed border-cream/15 p-6 text-center text-sm italic text-cream/50">
                  Nenhuma alternativa no catálogo atual pra esse designer.
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function alternativasFor(designer: string): number {
  return CATALOGO.filter((p) => p.cloneDe?.includes(designer)).length;
}

/* ---------------- Card de alternativa ---------------- */

function AlternativaCard({
  perfume,
  designerPrice,
}: {
  perfume: Perfume;
  designerPrice: number;
}) {
  const economia = perfume.precoVenda
    ? Math.round(
        ((designerPrice - perfume.precoVenda) / designerPrice) * 100
      )
    : 0;

  return (
    <Link
      href={`/perfume/${perfume.id}`}
      className="group relative block overflow-hidden rounded-sm border border-amber/25 bg-ink-soft p-6 transition-all duration-500 hover:border-amber/80 hover:bg-ink-muted md:p-7"
    >
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center md:gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-lg italic text-amber/70">
              Nº {String(perfume.numero).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber/80">
              {perfume.marca ?? "—"}
            </span>
          </div>
          <h4 className="font-display text-2xl font-light leading-[1.1] text-cream transition-colors duration-500 group-hover:text-amber-bright md:text-3xl">
            {perfume.nome}
          </h4>
          {perfume.familia && (
            <span className="text-xs italic text-cream/55">
              {perfume.familia}
            </span>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            {perfume.cloneFidelidade && (
              <span className="text-cream/70">
                <span className="italic">Fidelidade </span>
                <span className="font-display text-amber">
                  {perfume.cloneFidelidade}
                </span>
              </span>
            )}
            {perfume.projecao && (
              <span className="text-cream/60">
                <span className="italic">Projeção </span>
                <span className="text-cream/85">{perfume.projecao}</span>
              </span>
            )}
            {perfume.fixacao && (
              <span className="text-cream/60">
                <span className="italic">Fixação </span>
                <span className="text-cream/85">{perfume.fixacao}</span>
              </span>
            )}
          </div>
        </div>

        {/* Preço + economia */}
        <div className="flex flex-row items-end justify-between gap-5 border-t border-cream/5 pt-5 md:flex-col md:items-end md:border-l md:border-t-0 md:pl-8 md:pt-0 md:text-right">
          <div className="flex flex-col md:items-end">
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-cream/40">
              Na Zahir
            </span>
            <span className="font-display text-3xl font-light text-cream md:text-4xl">
              R$ {Math.round(perfume.precoVenda ?? 0)}
            </span>
          </div>
          {economia > 0 && (
            <div className="flex flex-col md:items-end">
              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-amber/80">
                Economia
              </span>
              <span className="font-display text-2xl font-light leading-none text-amber md:text-3xl">
                −{economia}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Seta de hover */}
      <div className="pointer-events-none absolute right-6 top-6 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100 md:top-7 md:right-7">
        <span className="font-sans text-xs text-amber">→</span>
      </div>
    </Link>
  );
}
