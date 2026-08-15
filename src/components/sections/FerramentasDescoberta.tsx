"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { NOTAS } from "@/data/notas";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Seção 5 da home (Arquitetura §3) — "Provas de descoberta".
 *
 * A home ENCAMINHA, não substitui as páginas de profundidade. Por isso aqui
 * não entra mapa 2D, nem comparador embutido, nem ritual inline: só quatro
 * cartões baixos, cada um amarrado à intenção que resolve.
 *
 * Prop `mundo` controla apenas as rotas espelhadas (mapa e comparador).
 * /compare e /notas existem só na raiz — são iguais nos dois mundos.
 */
type Ferramenta = {
  n: string;
  titulo: string;
  quando: string;
  href: string;
  meta: string[];
};

export function FerramentasDescoberta({
  mundo = "ele",
}: {
  mundo?: "ele" | "ela";
}) {
  const isEla = mundo === "ela";

  // Rotas montadas no topo — nada de ternário solto no meio do JSX.
  const mapaHref = isEla ? "/ela/mapa" : "/mapa";
  const comparadorHref = isEla ? "/ela/comparador" : "/comparador";
  // Sem espelho em /ela — as rotas /ela/compare e /ela/notas NÃO existem em
  // src/app. /compare traz o próprio seletor de gênero (tabs "todos · ela ·
  // ele") dentro do picker, então a visitante filtra na própria página; não é
  // resultado misturado e silencioso como seria mandá-la pra /buscar.
  const compareHref = "/compare";
  const notasHref = "/notas";

  // Eixos reais do MapaOlfativo — diferem entre os mundos.
  const eixosMapa = isEla
    ? ["Fresco · Solar → Envolvente · Noite", "Floral · Romântico → Gourmand · Comestível"]
    : ["Fresco · Aquático → Intenso · Amadeirado", "Seco · Especiado → Doce · Gourmand"];

  // Nomes vindos de src/data/notas.ts — são quatro, e só essas existem.
  const nomesNotas = NOTAS.map((nota) => nota.nome);

  const ferramentas: Ferramenta[] = [
    {
      n: "01",
      titulo: "Mapa olfativo",
      quando: "Quando você quer explorar antes de saber o nome de qualquer coisa.",
      href: mapaHref,
      meta: eixosMapa,
    },
    {
      n: "02",
      titulo: "Árabe × Designer",
      quando: "Quando você já chega com uma grife de referência na cabeça.",
      href: comparadorHref,
      meta: ["mesma família olfativa", "conversa entre casas"],
    },
    {
      n: "03",
      titulo: "Comparar dois",
      quando: "Quando a dúvida travou entre dois frascos do catálogo.",
      href: compareHref,
      meta: ["pirâmide lado a lado", "projeção · fixação"],
    },
    {
      n: "04",
      titulo: "Notas-assinatura",
      quando: "Quando o interesse começa por um ingrediente, não por um frasco.",
      href: notasHref,
      meta: nomesNotas,
    },
  ];

  return (
    <section
      id="ferramentas"
      className="section-veil-light relative border-t border-ink/5 px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="flex flex-col gap-6"
        >
          <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="h-px w-8 bg-amber" />
            Ferramentas de descoberta
          </span>

          <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight text-ink md:text-6xl">
            Quando quiser{" "}
            <em className="italic text-amber/90">ir mais fundo.</em>
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
            Quatro caminhos, cada um pra um tipo de dúvida: explorar sem
            referência, partir de uma grife que você já conhece, decidir entre
            dois frascos ou pesquisar um ingrediente.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5">
          {ferramentas.map((f, i) => (
            <FerramentaCard key={f.href} ferramenta={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Card horizontal ---------------- */

function FerramentaCard({
  ferramenta,
  index,
}: {
  ferramenta: Ferramenta;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: EASE_OUT }}
    >
      <Link
        href={ferramenta.href}
        className="group flex min-h-[88px] w-full items-start gap-4 rounded-sm border border-ink/10 bg-cream-soft/55 px-5 py-5 shadow-editorial transition-all duration-500 hover:-translate-y-1 hover:border-amber/50 hover:shadow-product focus-visible:-translate-y-1 focus-visible:border-amber/50 focus-visible:shadow-product focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-cream md:gap-6 md:px-7 md:py-6"
      >
        {/* Numeral */}
        <span
          aria-hidden
          className="shrink-0 pt-0.5 font-display text-lg italic tabular-nums text-amber/55 transition-colors duration-500 group-hover:text-amber group-focus-visible:text-amber md:text-xl"
        >
          {ferramenta.n}
        </span>

        {/* Conteúdo */}
        <span className="flex min-w-0 flex-1 flex-col gap-2">
          <span className="font-display text-xl font-light leading-tight text-ink transition-colors duration-500 group-hover:text-amber-dim group-focus-visible:text-amber-dim md:text-2xl">
            {ferramenta.titulo}
          </span>

          <span className="text-sm leading-relaxed text-ink/70">
            {ferramenta.quando}
          </span>

          <span className="mt-1 flex flex-wrap gap-1.5">
            {ferramenta.meta.map((m) => (
              <span
                key={m}
                className="rounded-full border border-ink/10 bg-cream/70 px-2.5 py-1 text-[10px] leading-none text-ink/60 transition-colors duration-500 group-hover:border-amber/25 group-hover:text-ink/75"
              >
                {m}
              </span>
            ))}
          </span>
        </span>

        {/* Seta */}
        <span
          aria-hidden
          className="shrink-0 self-center text-amber transition-transform duration-500 group-hover:translate-x-1 group-focus-visible:translate-x-1"
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}
