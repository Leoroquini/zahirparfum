"use client";

import Link from "next/link";
import { motion } from "motion/react";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Seção 3 da home — resumo de encaminhamento, não a página de decants.
 *
 * Explica só o risco que o decant remove e mostra os três níveis de
 * compromisso (5 ml · 10 ml · frasco). O detalhamento fica em /decants,
 * então aqui não se repete a explicação longa, os kits nem o catálogo.
 *
 * Sem preço em nenhum nível: 44 dos 45 SKUs femininos não têm preço de
 * decant definido e o fallback calculado inventaria valores que a operação
 * nunca fechou. O vocabulário Testar / Conhecer / Possuir vem de
 * Decants.tsx e das 3 cartas do Veredicto em PerfumeExperience.tsx.
 *
 * Prop `mundo` espelha as rotas — as duas árvores permanecem separadas.
 */
export function DecantsResumo({
  mundo = "ele",
}: {
  mundo?: "ele" | "ela";
}) {
  const isEla = mundo === "ela";
  const montarHref = isEla ? "/ela/decants/montar" : "/decants/montar";
  const decantsHref = isEla ? "/ela/decants" : "/decants";
  const catalogoHref = isEla ? "/ela/catalogo" : "/catalogo";

  const niveis = [
    {
      medida: "5 ml",
      titulo: "Testar",
      texto:
        "Alguns dias na pele. O suficiente pra saber se é seu antes de qualquer compromisso.",
      cta: "Montar com 5 ml",
      href: `${montarHref}?tamanho=5ml`,
      aria: "Montar com 5 ml — kit de decants para testar",
      altura: 54,
      destaque: false,
    },
    {
      medida: "10 ml",
      titulo: "Conhecer",
      texto:
        "Semanas de uso, em ocasiões e climas diferentes. Você vê o perfume no calor, no frio e no dia comum.",
      cta: "Montar com 10 ml",
      href: `${montarHref}?tamanho=10ml`,
      aria: "Montar com 10 ml — kit de decants para conhecer",
      altura: 78,
      destaque: true,
    },
    {
      medida: "Frasco",
      titulo: "Possuir",
      texto:
        "A escolha já feita. O frasco entra na estante porque você já sabe como ele termina o dia.",
      cta: "Ver o catálogo",
      href: catalogoHref,
      aria: "Ver o catálogo de frascos cheios",
      altura: 104,
      destaque: false,
    },
  ];

  return (
    <section
      id="decants-resumo"
      className="section-veil-light relative border-t border-ink/5 px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="flex flex-col gap-6"
        >
          <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="h-px w-8 bg-amber" />
            Decants
          </span>

          <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight text-ink md:text-6xl">
            Perfume não se cheira{" "}
            <em className="italic text-amber/90">pela tela.</em>
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
            Árabe muda muito ao longo do dia. O que abre doce pode fechar seco
            algumas horas depois, e é a sua pele que decide qual versão fica. O
            decant existe pra tirar essa aposta da sua mão.
          </p>

          <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-ink/55">
            Três níveis de compromisso · não três preços
          </p>
        </motion.div>

        {/* Os três níveis */}
        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
          {niveis.map((n, i) => (
            <motion.div
              key={n.medida}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: EASE_OUT }}
            >
              {/*
                aria-label SUBSTITUI o nome acessível calculado pelo conteúdo
                do link. Por isso cada `aria` começa com o texto visível do CTA
                ("Montar com 5 ml", "Ver o catálogo") — sem isso o comando de
                voz "clicar em Montar com 5 ml" não encontra o alvo (WCAG 2.5.3,
                Label in Name).
              */}
              <Link
                href={n.href}
                aria-label={n.aria}
                className={`group flex h-full flex-col rounded-sm border p-6 shadow-editorial transition-all duration-500 hover:-translate-y-1 hover:border-amber/50 hover:shadow-product focus-visible:-translate-y-1 focus-visible:border-amber/50 focus-visible:shadow-product focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-cream md:p-7 ${
                  n.destaque
                    ? "border-amber/40 bg-cream-soft/80"
                    : "border-ink/10 bg-cream-soft/50"
                }`}
              >
                {/* Frasco — a altura é o próprio argumento */}
                <div className="flex h-[112px] items-end">
                  <FrascoNivel altura={n.altura} destaque={n.destaque} />
                </div>

                <span className="mt-6 text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
                  {n.medida}
                </span>

                <h3 className="mt-2 font-display text-3xl font-light leading-tight text-ink transition-colors duration-500 group-hover:text-amber-dim group-focus-visible:text-amber-dim md:text-4xl">
                  {n.titulo}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {n.texto}
                </p>

                <span className="mt-auto inline-flex min-h-[44px] items-center gap-2 pt-6 text-[10px] font-sans uppercase tracking-[0.35em] text-amber transition-all duration-500 group-hover:gap-3 group-focus-visible:gap-3">
                  {n.cta}
                  <span
                    aria-hidden
                    className="transition-transform duration-500 group-hover:translate-x-1 group-focus-visible:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Encaminhamento */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-12"
        >
          <Link
            href={montarHref}
            className="group inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full bg-amber px-8 py-4 text-center text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:w-auto"
          >
            Montar meu kit de decants
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1 group-focus-visible:translate-x-1"
            >
              →
            </span>
          </Link>

          <Link
            href={decantsHref}
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-ink/20 px-7 py-4 text-center text-[11px] font-sans uppercase tracking-[0.3em] text-ink/75 transition-all hover:border-amber hover:text-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:w-auto"
          >
            Entender os decants
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Frasco do nível (silhueta, sem texto) ---------------- */

function FrascoNivel({
  altura,
  destaque,
}: {
  altura: number;
  destaque: boolean;
}) {
  const w = 28;
  const capH = 8;
  const neckH = 7;
  const bodyH = altura - capH - neckH;

  const stroke = destaque ? "#c89b3c" : "#8c6b26";
  const liquido = destaque ? "rgba(231,182,89,0.9)" : "rgba(200,155,60,0.7)";

  const totalW = w + 20;
  const totalH = altura + 8;
  const left = (totalW - w) / 2;

  return (
    <svg
      width={totalW}
      height={totalH}
      viewBox={`0 0 ${totalW} ${totalH}`}
      aria-hidden
      className="transition-transform duration-700 group-hover:-translate-y-1 group-focus-visible:-translate-y-1"
    >
      {/* Sombra de apoio */}
      <ellipse
        cx={totalW / 2}
        cy={totalH - 3}
        rx={w * 0.62}
        ry={3}
        fill="rgba(10,10,10,0.1)"
      />

      {/* Tampa */}
      <rect
        x={totalW / 2 - w * 0.22}
        y={0}
        width={w * 0.44}
        height={capH}
        rx={1.5}
        fill="#0a0a0a"
      />

      {/* Pescoço */}
      <rect
        x={totalW / 2 - w * 0.13}
        y={capH}
        width={w * 0.26}
        height={neckH}
        fill="rgba(255,255,255,0.6)"
        stroke={stroke}
        strokeWidth={0.8}
      />

      {/* Corpo */}
      <rect
        x={left}
        y={capH + neckH}
        width={w}
        height={bodyH}
        rx={2.5}
        fill="rgba(255,255,255,0.55)"
        stroke={stroke}
        strokeWidth={1.2}
      />

      {/* Líquido */}
      <rect
        x={left + 2}
        y={capH + neckH + bodyH * 0.24}
        width={w - 4}
        height={bodyH * 0.76 - 3}
        rx={2}
        fill={liquido}
      />

      {/* Brilho */}
      <rect
        x={left + 4.5}
        y={capH + neckH + bodyH * 0.34}
        width={2}
        height={bodyH * 0.38}
        rx={1}
        fill="rgba(255,255,255,0.6)"
      />
    </svg>
  );
}
