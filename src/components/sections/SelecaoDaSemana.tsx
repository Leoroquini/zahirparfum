"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CATALOGO, type Perfume } from "@/data/catalogo";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";
import { rotaPerfume } from "@/lib/genero";
import {
  KIT_ESTREIA,
  KIT_COLECAO,
  fmtPrecoCent,
  proximoDomingo,
  fmtDataExtenso,
} from "@/lib/promo";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Hero da Seleção da Semana com lista visual dos 12 modelos agrupados
 * por marca. Usado na página /decants. Data dinâmica de próximo domingo.
 */
export function SelecaoDaSemana() {
  const selecionados = CATALOGO.filter((p) => p.selecionadoSemana === true);

  // Agrupar por marca
  const porMarca = selecionados.reduce<Record<string, Perfume[]>>((acc, p) => {
    const m = p.marca ?? "Outros";
    if (!acc[m]) acc[m] = [];
    acc[m].push(p);
    return acc;
  }, {});

  const ordemMarcas = Object.keys(porMarca).sort();
  const validade = fmtDataExtenso(proximoDomingo());

  return (
    <section
      id="selecao-semana"
      className="section-veil-light relative overflow-hidden border-t border-ink/5 px-6 py-24 md:px-12 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(200,155,60,0.18), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px]">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="flex flex-col items-center gap-5 text-center"
        >
          <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="h-px w-8 bg-amber" />
            Seleção da Semana
            <span className="h-px w-8 bg-amber" />
          </span>
          <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight text-ink md:text-6xl">
            12 perfumes curados,{" "}
            <em className="italic text-amber/90">kits a partir de {fmtPrecoCent(KIT_ESTREIA.precoPromo)}.</em>
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
            Toda semana a curadoria seleciona doze modelos. Você monta um kit
            de três decants e o preço promocional aplica sozinho.
          </p>
          <p className="text-[11px] uppercase tracking-[0.32em] text-wine/80">
            válido até {validade}
          </p>
        </motion.div>

        {/* 2 cards de kit lado a lado */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {[
            { ...KIT_ESTREIA, descricao: "3 decants 5ml — entrada na curadoria" },
            { ...KIT_COLECAO, descricao: "3 decants 10ml — mais tempo de pele" },
          ].map((k) => (
            <Link
              key={k.tipo}
              href={`/decants/montar?tamanho=${k.tamanho}`}
              className="group flex items-center justify-between gap-6 rounded-sm border border-amber/40 bg-cream-soft/70 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-amber hover:shadow-product md:p-8"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber-dim">
                  {k.descricao}
                </span>
                <span className="font-display text-3xl font-light text-ink md:text-4xl">
                  {k.titulo}
                </span>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-sm text-ink/55 line-through">
                    {fmtPrecoCent(k.precoCheio)}
                  </span>
                  <span className="font-display text-3xl font-light text-amber">
                    {fmtPrecoCent(k.precoPromo)}
                  </span>
                </div>
              </div>
              <span className="shrink-0 text-2xl text-amber transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>

        {/* CTA único */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/decants/montar"
            className="group inline-flex items-center gap-3 rounded-full bg-amber px-8 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
          >
            Montar meu kit
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Lista dos 12 modelos por marca */}
        <div className="mt-20 border-t border-ink/10 pt-12">
          <h3 className="mb-8 font-display text-2xl font-light text-ink md:text-3xl">
            Os 12 modelos desta semana
          </h3>
          <div className="flex flex-col gap-10">
            {ordemMarcas.map((marca) => (
              <div key={marca} className="flex flex-col gap-4">
                <h4 className="text-[11px] font-sans uppercase tracking-[0.45em] text-amber">
                  {marca}
                </h4>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
                  {porMarca[marca].map((p) => (
                    <SelecaoMiniCard key={p.id} perfume={p} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SelecaoMiniCard({ perfume }: { perfume: Perfume }) {
  return (
    <Link
      href={rotaPerfume(perfume)}
      className="group flex flex-col overflow-hidden rounded-sm border border-ink/15 bg-cream-soft/60 transition-all hover:-translate-y-1 hover:border-amber/60 hover:shadow-product"
    >
      <div className="relative aspect-square w-full bg-ink">
        {hasFoto(perfume) ? (
          <Image
            src={fotoSrc(perfume)}
            alt={perfume.nome}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
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
        <span className="absolute left-2 top-2 rounded-full border border-amber bg-amber/85 px-2 py-0.5 text-[8px] font-sans font-bold uppercase tracking-[0.2em] text-ink">
          ★ Seleção
        </span>
      </div>
      <div className="flex flex-col gap-1 p-3">
        <span className="font-display text-sm leading-tight text-ink group-hover:text-amber md:text-base">
          {perfume.nome}
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-ink/60">
          {perfume.concentracao} · {perfume.volume}
        </span>
      </div>
    </Link>
  );
}
