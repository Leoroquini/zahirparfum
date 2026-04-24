"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CATALOGO, type Perfume } from "@/data/catalogo";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";
import { addItem, precoDa } from "@/lib/lista-store";
import { toast } from "@/lib/toast-store";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Cross-sell contextual na página do produto.
 * "Monte um Kit com esse perfume + 2 outros da mesma família" —
 * adiciona esse como decant 10ml + 2 complementares como decant 10ml.
 * Mostra preço somado, economia estimada.
 */
export function CrossSellKit({ perfume }: { perfume: Perfume }) {
  // Precisa ter decant disponível e preço
  if (perfume.precoVenda === null || perfume.decantDisponivel === false)
    return null;

  // Busca 2 perfumes complementares: mesma família, preços acessíveis, diferentes do atual
  const complementares = CATALOGO.filter(
    (p) =>
      p.id !== perfume.id &&
      p.familia === perfume.familia &&
      p.precoVenda !== null &&
      p.decantDisponivel !== false
  )
    .sort((a, b) => (a.precoVenda ?? 0) - (b.precoVenda ?? 0))
    .slice(0, 2);

  if (complementares.length < 2) return null;

  const kit = [perfume, ...complementares];
  const totalDecant10 = kit.reduce(
    (sum, p) => sum + precoDa(p, "decant-10"),
    0
  );
  const totalCheio = kit.reduce((sum, p) => sum + (p.precoVenda ?? 0), 0);
  const economia = totalCheio - totalDecant10;

  const handleAddKit = () => {
    kit.forEach((p) => addItem(p, "decant-10"));
    toast.success(
      `Kit montado na sua lista`,
      `3 decants 10ml adicionados — ${kit.map((p) => p.nome).join(", ")}.`
    );
  };

  return (
    <section className="mt-16 md:mt-20">
      <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
        <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
        Monte um kit
      </span>

      <div className="mt-6 overflow-hidden rounded-sm border border-amber/25 bg-gradient-to-br from-ink-soft via-ink to-ink-soft">
        <div className="p-6 md:p-8">
          <h3 className="font-display text-2xl font-light leading-[1.15] text-cream md:text-3xl">
            Três decants{" "}
            <em className="italic text-amber/90">
              {perfume.familia ? perfume.familia.toLowerCase() : "complementares"}
            </em>{" "}
            em uma compra
          </h3>
          <p className="mt-3 max-w-xl text-sm text-cream/65 md:text-base">
            Esse perfume + 2 da mesma família em decants de 10ml. Testa os
            três antes de decidir qual vai pro frasco cheio — sem pagar o
            valor completo de cada.
          </p>
        </div>

        {/* Os 3 perfumes */}
        <div className="grid border-t border-cream/5 md:grid-cols-3">
          {kit.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: EASE_OUT }}
              className="flex items-center gap-4 border-cream/5 p-4 md:flex-col md:items-start md:gap-3 md:border-r md:p-6 md:last:border-r-0"
            >
              <Link
                href={`/perfume/${p.id}`}
                className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border border-cream/10 md:h-auto md:w-full md:aspect-square"
              >
                {hasFoto(p) && (
                  <Image
                    src={fotoSrc(p)}
                    alt={p.nome}
                    fill
                    sizes="(max-width: 768px) 64px, 200px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </Link>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-amber/80">
                  {idx === 0 ? "Você escolheu" : `+ complementar ${idx}`}
                </span>
                <Link
                  href={`/perfume/${p.id}`}
                  className="truncate font-display text-base font-light text-cream transition-colors hover:text-amber md:text-lg"
                >
                  {p.nome}
                </Link>
                <span className="text-xs text-cream/60">
                  Decant 10ml · R$ {precoDa(p, "decant-10")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Preço + CTA */}
        <div className="flex flex-col gap-4 border-t border-cream/5 bg-ink/40 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-baseline gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-cream/45">
                Kit em decants
              </span>
              <span className="font-display text-3xl font-light text-cream md:text-4xl">
                R$ {totalDecant10}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber/80">
                vs frasco cheio
              </span>
              <span className="text-sm text-cream/55 line-through">
                R$ {totalCheio}
              </span>
              <span className="text-xs italic text-amber">
                economia R$ {economia}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddKit}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-amber px-7 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
          >
            Adicionar kit à lista
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
