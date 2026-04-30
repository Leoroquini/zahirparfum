"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CATALOGO, FAMILIAS, type Perfume } from "@/data/catalogo";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Versão alternativa do Mapa Olfativo pra mobile, o 2D com pontos
 * é inusável em tela pequena. Aqui agrupamos por família olfativa
 * em accordion vertical, mostrando capacidade de scroll natural.
 *
 * Renderizada via md:hidden nas páginas onde o mapa aparece.
 */
export function MapaMobileAlt() {
  const perfumesPorFamilia = FAMILIAS.map((familia) => ({
    familia,
    perfumes: CATALOGO.filter((p) => p.familia === familia),
  }))
    .filter((g) => g.perfumes.length > 0)
    .sort((a, b) => b.perfumes.length - a.perfumes.length);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-sm border border-ink/10 bg-cream-soft/50 p-5">
        <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber">
          Em mobile
        </span>
        <p className="mt-2 text-sm italic text-ink/65">
          O mapa 2D funciona melhor em tela maior. Aqui abaixo o catálogo
          agrupado por família, toque numa família pra ver as fragrâncias.
        </p>
      </div>

      {perfumesPorFamilia.map(({ familia, perfumes }, idx) => (
        <motion.details
          key={familia}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.03, ease: EASE_OUT }}
          className="group rounded-sm border border-ink/10 bg-cream-soft/30 p-4 open:bg-cream-soft/60"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-3 list-none">
            <div className="flex flex-col gap-0.5">
              <span className="font-display text-lg font-light text-ink">
                {familia}
              </span>
              <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber/70">
                {perfumes.length}{" "}
                {perfumes.length === 1 ? "fragrância" : "fragrâncias"}
              </span>
            </div>
            <span
              aria-hidden
              className="text-xl text-amber transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>

          <ul className="mt-4 flex flex-col gap-2">
            {perfumes.map((p) => (
              <MobilePerfumeRow key={p.id} perfume={p} />
            ))}
          </ul>
        </motion.details>
      ))}
    </div>
  );
}

function MobilePerfumeRow({ perfume }: { perfume: Perfume }) {
  return (
    <li>
      <Link
        href={`/perfume/${perfume.id}`}
        className="group flex items-center gap-3 rounded-sm border border-ink/5 bg-cream/50 p-3 transition-colors hover:border-amber/30"
      >
        {hasFoto(perfume) && (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm border border-ink/10">
            <Image
              src={fotoSrc(perfume)}
              alt=""
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-amber/70">
            Nº {String(perfume.numero).padStart(2, "0")}
          </span>
          <span className="truncate font-display text-base text-ink transition-colors group-hover:text-amber">
            {perfume.nome}
          </span>
        </div>
        {perfume.precoVenda && (
          <span className="shrink-0 text-xs text-ink/70">
            R$ {perfume.precoVenda}
          </span>
        )}
      </Link>
    </li>
  );
}
