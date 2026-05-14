"use client";

import { motion } from "motion/react";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Seção de depoimentos pra LP raiz unissex.
 * Prova social mista (clientes ele + ela) — aquece a captura de e-mail logo abaixo.
 *
 * TODO Leo: substituir os 3 placeholders abaixo por depoimentos reais.
 * Primeiro candidato a substituir: a cliente de mai/2026 que comprou pra
 * ela e o marido + filho levaram quando ela foi buscar.
 */

type Depoimento = {
  texto: string;
  autor: string;     // "M., 38 anos · São Paulo"
  perfume: string;   // "Khamrah Qahwa"
  destaque?: boolean;
};

const DEPOIMENTOS: Depoimento[] = [
  {
    texto:
      "Comprei um pra mim, fui buscar e o meu marido cheirou os outros que eu tinha levado pro almoço. No fim ele levou um pra ele, um pro nosso filho e ainda um a mais pro dia a dia.",
    autor: "PLACEHOLDER · cliente de maio/2026",
    perfume: "Substituir pelo perfume real",
    destaque: true,
  },
  {
    texto:
      "Estava buscando um árabe há meses sem coragem de comprar online. O atendimento da Zahir me explicou tudo, me mandou decant antes — agora é o único que uso.",
    autor: "PLACEHOLDER · cliente",
    perfume: "Substituir pelo perfume real",
  },
  {
    texto:
      "Achei o site lindo mas o que me convenceu foi cheirar antes. Voltei pra comprar o frasco cheio depois do decant.",
    autor: "PLACEHOLDER · cliente",
    perfume: "Substituir pelo perfume real",
  },
];

export function Depoimentos() {
  return (
    <section
      id="depoimentos"
      className="section-veil-light relative border-t border-ink/5 px-6 py-24 md:px-12 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="mb-16 flex flex-col items-center gap-4 text-center"
        >
          <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="h-px w-8 bg-amber" />
            Quem já é da casa
            <span className="h-px w-8 bg-amber" />
          </span>
          <h2 className="max-w-2xl font-display text-3xl font-light leading-[1.05] tracking-tight text-ink md:text-5xl">
            Histórias que <em className="italic text-amber/90">ficaram.</em>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {DEPOIMENTOS.map((d, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.12,
                ease: EASE_OUT,
              }}
              className={
                "relative flex flex-col gap-5 rounded-2xl border border-ink/10 bg-cream/40 p-7 backdrop-blur-sm transition-colors hover:border-amber/40 md:p-8 " +
                (d.destaque ? "md:scale-[1.02] md:border-amber/30" : "")
              }
            >
              <span
                aria-hidden
                className="absolute -top-3 left-7 font-display text-5xl leading-none text-amber/70"
              >
                &ldquo;
              </span>
              <blockquote className="pt-2 font-display text-lg font-light italic leading-[1.45] text-ink md:text-xl">
                {d.texto}
              </blockquote>
              <figcaption className="mt-auto flex flex-col gap-1 border-t border-ink/10 pt-4">
                <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-ink/75">
                  {d.autor}
                </span>
                <span className="text-[11px] font-sans italic text-amber/90">
                  {d.perfume}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
