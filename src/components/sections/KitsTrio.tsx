"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { KIT_ESTREIA, KIT_COLECAO, fmtPrecoCent, type KitConfig } from "@/lib/promo";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Dois cards explicativos dos kits da Seleção da Semana:
 *  - Kit Estreia  → 3 decants 5ml,  R$ 99,90 cheio / R$ 69,90 promo
 *  - Kit Coleção  → 3 decants 10ml, R$ 149,90 cheio / R$ 99,90 promo
 *
 * Preço promo aplica automaticamente no montador quando os 3 decants forem
 * da Seleção da Semana. Aqui é só showcase + CTA pra abrir o montador livre.
 */
export function KitsTrio() {
  return (
    <section
      id="kits"
      className="section-veil-light relative overflow-hidden border-t border-ink/5 px-6 py-24 md:px-12 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(200,155,60,0.18), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="flex flex-col items-center gap-5 text-center"
        >
          <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="h-px w-8 bg-amber" />
            Kits promocionais
            <span className="h-px w-8 bg-amber" />
          </span>
          <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
            Três decants,{" "}
            <em className="italic text-amber/90">um preço.</em>
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
            Monte qualquer combinação de 3 perfumes. Quando os três forem da{" "}
            <em className="italic text-amber">Seleção da Semana</em>, o preço
            promocional aplica sozinho.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <KitCard kit={KIT_ESTREIA} variant="estreia" />
          <KitCard kit={KIT_COLECAO} variant="colecao" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Card de kit ---------------- */

function KitCard({ kit, variant }: { kit: KitConfig; variant: "estreia" | "colecao" }) {
  const isEstreia = variant === "estreia";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      className={`relative flex flex-col overflow-hidden rounded-sm border bg-cream-soft/60 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-product ${
        isEstreia
          ? "border-ink/15 shadow-editorial"
          : "border-amber/40 shadow-product"
      }`}
    >
      {!isEstreia && (
        <div className="absolute right-5 top-5 z-10 rounded-full bg-amber px-3 py-1 text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-ink">
          Mais escolhido
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 px-7 pb-2 pt-8 md:px-9 md:pt-10">
        <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber-dim">
          {kit.subtitulo}
        </span>
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-5xl font-light leading-[0.95] tracking-tight text-ink md:text-6xl">
            {kit.titulo.replace("Kit ", "")}
            <span className="text-amber-dim">.</span>
          </h3>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-ink/60 line-through">
              {fmtPrecoCent(kit.precoCheio)}
            </span>
            <span className="font-display text-4xl font-light leading-none text-amber md:text-5xl">
              {fmtPrecoCent(kit.precoPromo)}
            </span>
            <span className="text-[9px] font-sans uppercase tracking-[0.32em] text-wine/85">
              economia de {fmtPrecoCent(kit.precoCheio - kit.precoPromo)}
            </span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-ink/75 md:text-base">
          {isEstreia
            ? "Sua entrada na perfumaria árabe. Três decants de 5ml pra testar três caminhos diferentes sem se comprometer."
            : "Pra quem já conhece o básico e quer subir o nível. Três decants de 10ml, mais tempo de pele, mais memória."}
        </p>
      </div>

      <div className="my-6 mx-7 h-px bg-ink/10 md:mx-9" />

      {/* Como funciona */}
      <div className="flex flex-col gap-3 px-7 pb-2 md:px-9">
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
          Como funciona
        </span>
        <ol className="flex flex-col gap-2.5 text-sm text-ink/80">
          <li className="flex gap-3">
            <span className="font-display text-amber">1</span>
            <span>
              Abre o montador e escolhe três perfumes da{" "}
              <em className="italic text-amber/90">Seleção da Semana</em> (12
              modelos curados).
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-display text-amber">2</span>
            <span>O preço promocional aplica automático no kit.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-display text-amber">3</span>
            <span>Fecha pelo WhatsApp em um clique.</span>
          </li>
        </ol>
      </div>

      {/* CTA */}
      <div className="mt-auto flex flex-col gap-3 px-7 pb-8 pt-8 md:px-9 md:pb-10">
        <Link
          href={`/decants/montar?tamanho=${kit.tamanho}`}
          className={`group flex w-full items-center justify-center gap-3 rounded-full px-7 py-4 text-[11px] font-sans uppercase tracking-[0.3em] transition-all ${
            isEstreia
              ? "border border-ink/25 bg-cream/40 text-ink hover:border-amber hover:bg-amber hover:text-ink"
              : "bg-amber text-ink hover:bg-amber-bright"
          }`}
        >
          Montar {kit.titulo.toLowerCase()}
          <span className="transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
