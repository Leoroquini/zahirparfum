"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import type { Perfume } from "@/data/catalogo";
import { CATALOGO } from "@/data/catalogo";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";
import { getGenero } from "@/lib/genero";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Cross-sell entre mundos.
 *
 * Quando o perfume tem `parMasculino` (ex.: Fakhar Rose → fakhar-preto),
 * mostra card "Pra ele também" no rodapé da ficha — convertendo cliente
 * que está comprando pra si em compra adicional pra parceiro/familiar.
 *
 * Também roda inverso: se o perfume masculino atual tem um SKU feminino
 * que aponta de volta via parMasculino, sugere "Pra ela também".
 */
export function ParMundo({ perfume }: { perfume: Perfume }) {
  const generoAtual = getGenero(perfume);

  // Caso 1: perfume feminino com par masculino explícito
  if (perfume.parMasculino) {
    const par = CATALOGO.find((p) => p.id === perfume.parMasculino);
    if (par) return <CardPar atual={perfume} par={par} direcao="pra-ele" />;
  }

  // Caso 2: perfume masculino que é referenciado por SKU feminino via parMasculino
  if (generoAtual === "masculino") {
    const parFem = CATALOGO.find(
      (p) => p.parMasculino === perfume.id && getGenero(p) === "feminino",
    );
    if (parFem) return <CardPar atual={perfume} par={parFem} direcao="pra-ela" />;
  }

  return null;
}

function CardPar({
  atual,
  par,
  direcao,
}: {
  atual: Perfume;
  par: Perfume;
  direcao: "pra-ele" | "pra-ela";
}) {
  const isParaEle = direcao === "pra-ele";
  const eyebrow = isParaEle ? "Pra ele também" : "Pra ela também";
  const href = isParaEle ? `/perfume/${par.id}` : `/ela/perfume/${par.id}`;
  const explicacao = isParaEle
    ? "Mesma casa, leitura masculina. Comprou pra você? Considere pro parceiro, irmão, pai."
    : "Mesma casa, leitura feminina. Cliente pediu, recebemos: 'tem versão dela?'";

  return (
    <section className="relative border-t border-ink/5 px-6 py-20 md:px-12 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="flex flex-col gap-10 lg:grid lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-16"
        >
          <div className="flex flex-col gap-5">
            <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="h-px w-8 bg-amber" />
              {eyebrow}
            </span>
            <h2 className="font-display text-3xl font-light leading-[1.1] tracking-tight text-ink md:text-5xl">
              <em className="italic text-amber/90">{par.nome}</em>
              {isParaEle ? "." : " — a versão dela."}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-ink/75 md:text-base">
              {explicacao}
            </p>
            <p className="max-w-md text-xs italic text-ink/65 md:text-sm">
              Atual: <strong className="not-italic">{atual.nome}</strong>{" "}
              {atual.familia ? `· ${atual.familia}` : ""}
              <br />
              Par: <strong className="not-italic">{par.nome}</strong>{" "}
              {par.familia ? `· ${par.familia}` : ""}
            </p>
            <Link
              href={href}
              className="group mt-2 inline-flex w-fit items-center gap-3 rounded-full border border-amber px-7 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-amber transition-all hover:bg-amber hover:text-ink"
            >
              Conhecer {par.nome}
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <Link
            href={href}
            className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-sm border border-ink/10 bg-cream-soft/50 p-6 transition-all hover:-translate-y-1 hover:border-amber/50 hover:shadow-product md:p-8"
          >
            {hasFoto(par) ? (
              <Image
                src={fotoSrc(par)}
                alt={par.nome}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain transition-transform duration-[1500ms] group-hover:scale-105"
                style={{ padding: "8%" }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-6xl italic text-amber/30">
                  {par.nome
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>
            )}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream-soft via-cream-soft/70 to-transparent"
            />
            <div className="relative z-10 flex items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-amber-dim">
                  Nº {String(par.numero).padStart(2, "0")} ·{" "}
                  {getGenero(par) === "feminino" ? "Feminino" : "Masculino"}
                </span>
                <span className="font-display text-2xl font-light text-ink md:text-3xl">
                  {par.nome}
                </span>
              </div>
              {par.precoVenda && (
                <span className="font-display text-xl text-ink md:text-2xl">
                  R$ {par.precoVenda}
                </span>
              )}
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
