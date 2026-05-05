"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { CATALOGO, type Perfume } from "@/data/catalogo";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Info curada dos principais designers referenciados no catálogo.
 * Preços são estimativas de boutique no Brasil, varia por loja, época, câmbio.
 * `foto` opcional — caminho em /public/designers/{slug}.jpg.
 */
const DESIGNER_INFO: Record<
  string,
  { precoEstimado: number; descricao: string; foto?: string }
> = {
  "Creed Aventus": {
    precoEstimado: 2400,
    descricao:
      "Abacaxi, bétula defumada e musk. O designer mais imitado da perfumaria masculina moderna, lançado em 2010, virou referência obrigatória.",
    foto: "/designers/creed-aventus.jpg",
  },
  "Dior Sauvage EDT": {
    precoEstimado: 850,
    descricao:
      "Bergamota calabresa, ambroxan e pimenta de Sichuan. O fresh cítrico-amadeirado que Johnny Depp transformou em fenômeno mundial.",
    foto: "/designers/dior-sauvage-edt.jpg",
  },
  "Dior Sauvage Elixir": {
    precoEstimado: 1300,
    descricao:
      "Versão extrait do Sauvage: cardamomo, canela e baunilha. Potência maior, projeção mais discreta que o EDT.",
    foto: "/designers/dior-sauvage-elixir.jpg",
  },
  "Dior Sauvage EDP": {
    precoEstimado: 950,
    descricao:
      "Meio-termo entre o EDT e o Elixir. Adiciona baunilha e ambroxan intensificado, masculinidade clássica moderna.",
    foto: "/designers/dior-sauvage-edp.jpg",
  },
  "Bleu de Chanel EDT": {
    precoEstimado: 850,
    descricao:
      "Aromático amadeirado com toranja, jasmim e sândalo. A resposta da Chanel pro Sauvage: classe sem grito.",
    foto: "/designers/bleu-de-chanel-edt.jpg",
  },
  "Boss Bottled Absolu": {
    precoEstimado: 900,
    descricao:
      "Cacau, davana e baunilha bourbon. Gourmand masculino sofisticado, pensado pra eventos formais.",
    foto: "/designers/boss-bottled-absolu.jpg",
  },
  "Angel's Share by Kilian": {
    precoEstimado: 2600,
    descricao:
      "Cognac, canela e praliné. O gourmand de nicho que definiu a categoria 'bebida madura em perfume'.",
    foto: "/designers/angels-share-by-kilian.jpg",
  },
  "Angel's Share": {
    precoEstimado: 2600,
    descricao:
      "Cognac, canela e praliné. Gourmand sofisticado da Kilian que virou referência pra aromas amadurecidos.",
    foto: "/designers/angels-share-by-kilian.jpg",
  },
  "Side Effect Initio": {
    precoEstimado: 2600,
    descricao:
      "Tabaco, canela, sândalo. Oriental densamente especiado, Initio é conhecida pela intensidade que dura o dia inteiro.",
    foto: "/designers/side-effect-initio.jpg",
  },
  "Initio Oud for Greatness": {
    precoEstimado: 2800,
    descricao:
      "Oud, açafrão e patchouli. Oriental denso da Initio, fragrância que marca presença em ambiente fechado.",
    foto: "/designers/initio-oud-for-greatness.jpg",
  },
  "Rosendo Mateu": {
    precoEstimado: 2000,
    descricao:
      "Linha autoral espanhola com DNA oriental-oud. Elegância discreta de nicho, feita em pequenas séries.",
    foto: "/designers/rosendo-mateu.jpg",
  },
  "Tom Ford Oud": {
    precoEstimado: 3500,
    descricao:
      "Oud puro, rosa e patchouli. Oriental masculino de luxo que consagrou o oud no Ocidente nos anos 2000.",
    foto: "/designers/tom-ford-oud.jpg",
  },
  "YSL Y EDP": {
    precoEstimado: 750,
    descricao:
      "Aromático fougère moderno, maçã, gengibre, lavanda, sálvia. O Y foi o reset da YSL pro público jovem.",
    foto: "/designers/ysl-y-edp.jpg",
  },
  "Paco Rabanne 1 Million Parfum": {
    precoEstimado: 650,
    descricao:
      "Cardamomo, pimenta rosa, cashmeran. Doce especiado pop, o 1 Million virou ícone do masculino mainstream.",
    foto: "/designers/paco-rabanne-1-million-parfum.jpg",
  },
  "JPG Le Male Elixir": {
    precoEstimado: 900,
    descricao:
      "Lavanda, baunilha e tabaco. A versão extrait do Le Male clássico, mais escura, mais hipnótica.",
    foto: "/designers/jpg-le-male-elixir.jpg",
  },
  "Givenchy Gentleman EDP": {
    precoEstimado: 700,
    descricao:
      "Íris, couro e baunilha. Amadeirado sofisticado com elegância francesa clássica.",
    foto: "/designers/givenchy-gentleman-edp.jpg",
  },
  "LV Afternoon Swim": {
    precoEstimado: 2400,
    descricao:
      "Cítrico aquático da Louis Vuitton, tangerina, bergamota e âmbar solar. Fresco sofisticado de couture.",
  },
  "Bvlgari Tygar": {
    precoEstimado: 1200,
    descricao:
      "Bergamota, cedro e sândalo. Cítrico amadeirado da Bvlgari, luxo mediterrâneo em frasco escuro.",
  },
  "JPG Ultra Male": {
    precoEstimado: 800,
    descricao:
      "Maçã, baunilha e lavanda. Gourmand frutal que dominou as noites brasileiras em meados dos 2010s.",
    foto: "/designers/jpg-ultra-male.jpg",
  },
  "Orto Parisi Megamare": {
    precoEstimado: 3200,
    descricao:
      "Aquático marinho nuclear. Uma das fragrâncias com maior projeção já criadas, 2 borrifadas e o ambiente fica tomado.",
  },
  "Parfums de Marly Althair": {
    precoEstimado: 2800,
    descricao:
      "Baunilha bourbon, cardamomo e praliné. Gourmand de nicho com 12h+ de fixação, favorito no inverno.",
    foto: "/designers/parfums-de-marly-althair.jpg",
  },
  "Nishane Hacivat": {
    precoEstimado: 1900,
    descricao:
      "Abacaxi, bergamota, patchouli e cedro. Nishane virou referência ao criar um 'Aventus de nicho turco'.",
    foto: "/designers/nishane-hacivat.jpg",
  },
};

function infoFor(name: string): {
  precoEstimado: number;
  descricao: string;
  foto?: string;
} {
  return (
    DESIGNER_INFO[name] ?? {
      precoEstimado: 1500,
      descricao:
        "Designer internacional de alta perfumaria, referência olfativa reconhecida.",
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
  // Creed Aventus tem foto e e o exemplo mais reconhecivel — vai como default
  const defaultSelected = designers.includes("Creed Aventus")
    ? "Creed Aventus"
    : designers[0] ?? "";
  const [selected, setSelected] = useState<string>(defaultSelected);

  const alternativas = useMemo(
    () => CATALOGO.filter((p) => p.cloneDe?.includes(selected)),
    [selected]
  );

  const info = infoFor(selected);

  return (
    <section id="comparador"
      className="section-veil-light relative border-t border-ink/5 px-6 py-28 md:px-12 md:py-36"
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
            <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Árabe <span className="text-amber/90">×</span>{" "}
              <em className="italic">Designer</em>.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
              Escolhe um designer que você conhece (ou queria conhecer). Mostramos
              as fragrâncias árabes do catálogo que conversam com o mesmo
              caminho olfativo, com referência editorial transparente.
            </p>
          </motion.div>
        )}

        {/* Designer picker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`${hideIntro ? "" : "mt-12 "}flex flex-col gap-3 border-y border-ink/5 py-6`}
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
                    : "border-ink/15 text-ink/70 hover:border-amber/50 hover:text-amber"
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
            {/* Left, Designer info — sticky em desktop pra ficar visivel ao scrollar alternativas */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <div className="flex flex-col overflow-hidden rounded-sm border border-ink/10 bg-cream-soft/50">
                {/* Foto do designer (se houver) — ocupa o topo do card, menor que aspect-square */}
                {info.foto && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream">
                    <Image
                      src={info.foto}
                      alt={`Frasco ${selected}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-contain p-6"
                    />
                  </div>
                )}

                <div className="flex flex-col p-6 md:p-7">
                  <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-ink/75">
                    Designer
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-light leading-[1.1] text-ink md:text-3xl">
                    {selected}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink/70">
                    {info.descricao}
                  </p>
                  <div className="mt-6 flex items-baseline justify-between gap-3 border-t border-ink/5 pt-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-ink/75">
                        Estimativa boutique
                      </span>
                      <span className="font-display text-2xl font-light text-ink md:text-3xl">
                        R$ {info.precoEstimado.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <span className="text-right text-[9px] italic text-ink/55">
                      varia conforme<br />loja e câmbio
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right, Alternativas */}
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
                    designerName={selected}
                  />
                </motion.div>
              ))}
              {alternativas.length === 0 && (
                <p className="rounded-sm border border-dashed border-ink/15 p-6 text-center text-sm italic text-ink/70">
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
  designerName,
}: {
  perfume: Perfume;
  designerPrice: number;
  designerName: string;
}) {
  const precoZahir = Math.round(perfume.precoVenda ?? 0);
  const showComparativo = precoZahir > 0 && designerPrice > precoZahir;

  return (
    <div className="group relative overflow-hidden rounded-sm border border-amber/25 bg-cream-soft/40 transition-all duration-500 hover:border-amber/70 hover:shadow-product">
      <div className="grid gap-0 md:grid-cols-[200px_1fr]">
        {/* Foto cinematográfica do árabe */}
        <Link
          href={`/perfume/${perfume.id}`}
          className="relative block aspect-square overflow-hidden bg-ink md:aspect-auto md:h-full"
          aria-label={`Ver ${perfume.nome}`}
        >
          {hasFoto(perfume) ? (
            <Image
              src={fotoSrc(perfume)}
              alt={perfume.nome}
              fill
              sizes="(max-width: 768px) 100vw, 200px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #1a0a0e 0%, #3d1a22 50%, #8c6b26 100%)",
              }}
            />
          )}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-ink/80 to-transparent md:h-[35%]"
          />
          <div className="absolute left-3 top-3 z-10 rounded-full border border-cream/30 bg-ink/55 px-2.5 py-0.5 text-[9px] font-sans uppercase tracking-[0.35em] text-cream/90 backdrop-blur-sm">
            Nº {String(perfume.numero).padStart(2, "0")}
          </div>
        </Link>

        {/* Conteúdo */}
        <div className="flex flex-col gap-4 p-6 md:p-7">
          <Link
            href={`/perfume/${perfume.id}`}
            className="flex flex-col gap-1.5"
          >
            <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber/85">
              {perfume.marca ?? "Fragrância"}
            </span>
            <h4 className="font-display text-2xl font-light leading-[1.1] text-ink transition-colors duration-500 group-hover:text-amber-bright md:text-3xl">
              {perfume.nome}
            </h4>
            {perfume.familia && (
              <span className="text-xs italic text-ink/65">
                {perfume.familia}
              </span>
            )}
          </Link>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            {perfume.cloneFidelidade && (
              <span className="text-ink/70">
                <span className="italic">Fidelidade </span>
                <span className="font-display text-amber">
                  {perfume.cloneFidelidade}
                </span>
              </span>
            )}
            {perfume.projecao && (
              <span className="text-ink/75">
                <span className="italic">Projeção </span>
                <span className="text-ink/85">{perfume.projecao}</span>
              </span>
            )}
            {perfume.fixacao && (
              <span className="text-ink/75">
                <span className="italic">Fixação </span>
                <span className="text-ink/85">{perfume.fixacao}</span>
              </span>
            )}
          </div>

          {/* Preço Zahir vs estimativa boutique */}
          <div className="mt-2 grid grid-cols-2 gap-4 border-t border-ink/10 pt-4">
            <div className="flex flex-col">
              <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-ink/60">
                {designerName}
              </span>
              <span className="font-display text-xl font-light text-ink/55 line-through md:text-2xl">
                R$ {designerPrice.toLocaleString("pt-BR")}
              </span>
              <span className="text-[9px] italic text-ink/50">
                estimativa de boutique
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-amber-dim">
                Na Zahir
              </span>
              <span className="font-display text-2xl font-light text-ink md:text-3xl">
                R$ {precoZahir}
              </span>
              {showComparativo && (
                <span className="text-[9px] italic text-amber/80">
                  mesma família olfativa
                </span>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-2 flex flex-wrap gap-2 border-t border-ink/10 pt-4">
            <Link
              href={`/perfume/${perfume.id}`}
              className="group/btn inline-flex items-center gap-2 rounded-full bg-amber px-4 py-2 text-[10px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
            >
              Ver perfume
              <span className="transition-transform duration-500 group-hover/btn:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href={`/compare?a=${perfume.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-4 py-2 text-[10px] font-sans uppercase tracking-[0.3em] text-ink/85 transition-all hover:border-amber hover:text-amber"
            >
              Comparar lado a lado
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
