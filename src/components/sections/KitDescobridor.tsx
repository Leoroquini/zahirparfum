"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CATALOGO } from "@/data/catalogo";
import { addItem, precoDa } from "@/lib/lista-store";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";
import { toast } from "@/lib/toast-store";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Kit pré-montado de 3 decants 10ml — entrada premium pro Descobridor.
 * Preço cheio = soma dos 3 decants 10ml (~R$ 120). Kit sai por R$ 99.
 */
export function KitDescobridor() {
  // Seleciona 3 perfumes-entrada com projeção alta e preço acessível
  const kit = useMemo(() => {
    const ids = [
      "salvo-elixir",      // clone Sauvage Elixir, 5ml acessível
      "asad-preto",        // Dior Sauvage Elixir, cult favorito
      "al-noble-sabaen",   // Oud for Greatness — oriental especiado
    ];
    return ids
      .map((id) => CATALOGO.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => !!p);
  }, []);

  // Cálculo dinâmico — sempre bate com os preços vigentes do catálogo
  const totalAvulso = kit.reduce((sum, p) => sum + precoDa(p, "decant-10"), 0);
  const precoKit = Math.round((totalAvulso * 0.8) / 5) * 5; // 20% off arredondado múltiplo de 5
  const descontoPct = totalAvulso > 0
    ? Math.round(((totalAvulso - precoKit) / totalAvulso) * 100)
    : 0;

  const handleAdicionarKit = () => {
    kit.forEach((p) => addItem(p, "decant-10"));
    toast.success(
      "Kit Descobridor na sua lista",
      "Três decants 10ml adicionados. Abre a lista pra enviar pro Instagram."
    );
  };

  return (
    <section className="relative overflow-hidden border-t border-cream/5 bg-ink-soft px-6 py-20 md:px-12 md:py-28">
      {/* Background gradient */}
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
              Três decants curados por{" "}
              <em className="italic text-amber/90">R$ {precoKit}.</em>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-cream/70 md:text-lg">
              Três perfumes árabes completamente diferentes — um fresco
              especiado, um oriental denso, um gourmand noturno — em decants
              de 10 ml cada. O jeito mais barato de descobrir seu perfil
              olfativo sem gastar em três frascos cheios.
            </p>

            <div className="mt-2 flex flex-wrap items-baseline gap-4">
              <span className="font-display text-4xl font-light text-cream md:text-5xl">
                R$ {precoKit}
              </span>
              <span className="text-sm text-cream/55 line-through">
                R$ {totalAvulso}
              </span>
              <span className="rounded-full bg-amber/15 px-3 py-1 text-[10px] font-sans uppercase tracking-[0.3em] text-amber">
                {descontoPct}% off
              </span>
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
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-cream/25 px-8 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-cream/85 transition-all hover:border-amber hover:text-amber"
              >
                Montar kit próprio
              </Link>
            </div>
          </div>

          {/* Lado direito — os 3 perfumes */}
          <div className="flex flex-col gap-3">
            {kit.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.1,
                  ease: EASE_OUT,
                }}
              >
                <Link
                  href={`/perfume/${p.id}`}
                  className="group flex items-center gap-4 rounded-sm border border-amber/20 bg-ink/50 p-4 transition-all hover:border-amber hover:bg-ink-muted md:gap-5 md:p-5"
                >
                  {/* Thumb real da foto */}
                  {hasFoto(p) && (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border border-cream/10 md:h-20 md:w-20">
                      <Image
                        src={fotoSrc(p)}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber/80">
                      0{i + 1} · {p.marca}
                    </span>
                    <span className="font-display text-lg font-light leading-tight text-cream transition-colors group-hover:text-amber/95 md:text-xl">
                      {p.nome}
                    </span>
                    {p.cloneDe?.[0] && (
                      <span className="text-xs italic text-cream/50">
                        inspirado em {p.cloneDe[0]}
                      </span>
                    )}
                  </div>
                  <span className="shrink-0 text-xs font-sans uppercase tracking-[0.3em] text-cream/60">
                    10ml
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
