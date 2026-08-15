"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { KIT_ESTREIA, KIT_COLECAO, fmtPrecoCent, type KitConfig } from "@/lib/promo";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Prop `mundo` define o destino dos CTAs "Montar agora":
 * - "ele" / "raiz" / undefined → /decants/montar
 * - "ela" → /ela/decants/montar
 */
export function KitsTrio({
  mundo = "ele",
}: {
  mundo?: "ele" | "ela" | "raiz";
} = {}) {
  const montarBase = mundo === "ela" ? "/ela/decants/montar" : "/decants/montar";

  return (
    <section
      id="kits"
      className="section-veil-light relative overflow-hidden border-t border-ink/5 px-6 py-24 md:px-12 md:py-32"
    >
      {/* Luz dourada de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(200,155,60,0.2), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px]">
        {/* Header */}
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

          <h2 className="max-w-4xl font-display text-4xl font-light leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
            Monte seu kit. Descubra{" "}
            <em className="italic text-amber/90">3 perfumes por menos.</em>
          </h2>

          <p className="font-display text-xl italic text-amber/85 md:text-2xl">
            Teste na pele. Compare com calma.
          </p>

          <p className="max-w-2xl text-base leading-relaxed text-ink/75 md:text-[17px]">
            O jeito inteligente de escolher seu próximo perfume. Experimente,
            compare e só então invista no frasco ideal.
          </p>
        </motion.div>

        {/* 2 cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <KitCard
            kit={KIT_ESTREIA}
            variant="estreia"
            montarBase={montarBase}
            chips={["5ml cada", "Mais compacto", "Ideal para começar"]}
          />
          <KitCard
            kit={KIT_COLECAO}
            variant="colecao"
            montarBase={montarBase}
            chips={["10ml cada", "Mais tempo de uso", "Melhor custo-benefício"]}
          />
        </div>

        {/* Faixa de confiança */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="mt-10 grid grid-cols-2 gap-5 rounded-md border border-ink/10 bg-cream-soft/80 px-6 py-5 sm:grid-cols-4 lg:px-10"
        >
          <ConfiancaItem
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 2 4 6v6c0 5 4 9 8 10 4-1 8-5 8-10V6z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            }
            titulo="100% Originais"
            sub="Decants dos frascos originais"
          />
          <ConfiancaItem
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 8h18v12H3z" />
                <path d="m3 8 9-5 9 5" />
                <path d="M12 3v17" />
              </svg>
            }
            titulo="Envio cuidadoso"
            sub="Embalagem reforçada"
          />
          <ConfiancaItem
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M21 11.5a8.4 8.4 0 0 1-1.1 4.2l1.1 4.3-4.4-1.1a8.4 8.4 0 1 1 4.4-7.4z" />
              </svg>
            }
            titulo="Fecha pelo WhatsApp"
            sub="Atendimento humano"
          />
          <ConfiancaItem
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="m8 12 3 3 5-6" />
              </svg>
            }
            titulo="Sem compra às cegas"
            sub="Teste antes. Escolha melhor."
          />
        </motion.div>

        {/* Como funciona em 3 passos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
          className="mt-6 rounded-md border border-ink/10 bg-cream/60 px-6 py-8 lg:px-10"
        >
          <p className="text-center text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            Como funciona em 3 passos
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
            <Passo
              n="1"
              titulo="Escolha 3 perfumes"
              sub="Monte seu kit com as fragrâncias que mais te despertam."
              icon={<FrascoIcon />}
            />
            <Passo
              n="2"
              titulo="Teste na pele"
              sub="Viva cada fragrância no seu tempo e sinta como ela te representa."
              icon={<MaoIcon />}
            />
            <Passo
              n="3"
              titulo="Volte para o frasco ideal"
              sub="Confiante, escolha o frasco que realmente é para você."
              icon={<FrascoCheioIcon />}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

/* ---------------- Card do kit ---------------- */

function KitCard({
  kit,
  variant,
  montarBase,
  chips,
}: {
  kit: KitConfig;
  variant: "estreia" | "colecao";
  montarBase: string;
  chips: string[];
}) {
  const isEstreia = variant === "estreia";
  const economia = kit.precoCheio - kit.precoPromo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      className={`relative flex flex-col overflow-hidden rounded-md border bg-cream-soft transition-all hover:-translate-y-1 ${
        isEstreia
          ? "border-ink/10 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.25)]"
          : "border-amber/50 shadow-[0_18px_50px_-22px_rgba(140,107,38,0.45)]"
      }`}
    >
      {/* Badge superior */}
      {isEstreia ? (
        <div className="absolute left-6 top-6 z-10 rounded-full bg-cream px-3 py-1 text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-amber-dim shadow-sm">
          Ideal para começar
        </div>
      ) : (
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 translate-y-[-50%]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber px-4 py-1.5 text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-ink shadow-[0_8px_22px_-6px_rgba(140,107,38,0.55)]">
            Pra usar, não só testar
          </span>
        </div>
      )}

      <div className="grid gap-6 px-7 pb-7 pt-12 md:grid-cols-[1fr_1.1fr] md:gap-8 md:px-9 md:pb-9 md:pt-14">
        {/* Visual dos 3 frascos */}
        <div className="relative flex items-end justify-center pb-2">
          <FrascosKitSVG variant={variant} />
        </div>

        {/* Texto */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-display text-3xl font-light leading-tight text-ink md:text-4xl">
              {kit.titulo.toUpperCase()}
            </h3>
            <span className="mt-1 block text-[10px] font-sans uppercase tracking-[0.35em] text-amber-dim">
              {isEstreia ? "3 decants 5ml" : "3 decants 10ml"}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-ink/75">
            {isEstreia
              ? "Perfeito para o primeiro contato. Sinta, compare e descubra novos caminhos olfativos."
              : "Mais tempo na pele, mais memória. A escolha de quem quer sentir cada detalhe por mais tempo."}
          </p>

          {/* Preço */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-sans uppercase tracking-[0.32em] text-ink/55 line-through">
              de {fmtPrecoCent(kit.precoCheio)}
            </span>
            <span className="font-display text-4xl font-light leading-none text-ink md:text-5xl">
              {fmtPrecoCent(kit.precoPromo)}
            </span>
            <span className="mt-1 inline-flex w-fit items-center rounded-full bg-amber/15 px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-amber">
              Economia de {fmtPrecoCent(economia)}
            </span>
          </div>

          {/* Chips */}
          <div className="mt-2 flex flex-wrap gap-2">
            {chips.map((chip, i) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink/[0.05] px-2.5 py-1 text-[10px] text-ink/75"
              >
                <span className="text-amber" aria-hidden>
                  {i === 0 ? "●" : i === 1 ? "◷" : "◆"}
                </span>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA + microcopy */}
      <div className="border-t border-ink/8 bg-cream px-7 py-5 md:px-9">
        <Link
          href={`${montarBase}?tamanho=${kit.tamanho}`}
          className={`group flex w-full items-center justify-center gap-3 rounded-full py-3.5 text-[11px] font-sans font-bold uppercase tracking-[0.3em] transition-all ${
            isEstreia
              ? "border border-ink/20 bg-cream text-ink hover:border-amber hover:bg-amber hover:text-ink"
              : "bg-amber text-ink hover:bg-amber-bright"
          }`}
        >
          Montar {kit.titulo.toLowerCase()}
          <span className="transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </Link>
        <p className="mt-3 text-center text-[10px] font-sans tracking-[0.2em] text-ink/65">
          Escolha 3 perfumes da{" "}
          <em className="italic text-amber/85">Seleção da Semana</em>
        </p>
      </div>
    </motion.div>
  );
}

/* ---------------- 3 frascos do kit ---------------- */

function FrascosKitSVG({ variant }: { variant: "estreia" | "colecao" }) {
  // Estreia = 5ml (frascos menores), Coleção = 10ml (frascos maiores)
  const bodyH = variant === "estreia" ? 110 : 150;
  const bodyW = variant === "estreia" ? 26 : 30;
  const colors = variant === "estreia" ? "#c89b3c" : "#e7b659";

  return (
    <svg
      viewBox="0 0 200 220"
      className="h-full w-full max-h-[210px]"
      aria-hidden
    >
      <defs>
        <linearGradient id={`liq-kit-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(231,182,89,0.4)" />
          <stop offset="1" stopColor="rgba(200,155,60,0.85)" />
        </linearGradient>
        <radialGradient id={`pedestal-${variant}`} cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#f4e9d4" />
          <stop offset="1" stopColor="#dcc99a" />
        </radialGradient>
      </defs>

      {/* Pedestal */}
      <ellipse cx="100" cy="200" rx="80" ry="10" fill={`url(#pedestal-${variant})`} stroke={colors} strokeWidth="0.6" />
      <ellipse cx="100" cy="198" rx="74" ry="6" fill="#faf7f0" opacity="0.6" />
      <ellipse cx="100" cy="206" rx="74" ry="3" fill="rgba(0,0,0,0.12)" />

      {/* 3 frascos */}
      {[
        { x: 50, delay: 0 },
        { x: 100, delay: 0.1 },
        { x: 150, delay: 0.2 },
      ].map((f, i) => {
        const yTop = 200 - bodyH - 8;
        return (
          <g key={i} transform={`translate(${f.x - bodyW / 2}, ${yTop})`}>
            {/* Tampa */}
            <rect x={bodyW / 2 - 7} y={-10} width={14} height={10} fill="#1a0e08" rx={1} />
            <rect x={bodyW / 2 - 4} y={-13} width={8} height={3} fill={colors} rx={1} />
            {/* Pescoço */}
            <rect x={bodyW / 2 - 4} y={0} width={8} height={6} fill="rgba(255,255,255,0.5)" stroke={colors} strokeWidth={0.5} />
            {/* Corpo */}
            <rect x={0} y={6} width={bodyW} height={bodyH} fill="rgba(255,255,255,0.55)" stroke={colors} strokeWidth={0.8} rx={2} />
            {/* Líquido */}
            <rect
              x={1.5}
              y={6 + bodyH * 0.2}
              width={bodyW - 3}
              height={bodyH * 0.78}
              fill={`url(#liq-kit-${variant})`}
              rx={2}
            />
            {/* Z */}
            <text
              x={bodyW / 2}
              y={6 + bodyH * 0.55}
              textAnchor="middle"
              fontFamily="serif"
              fontSize={bodyW * 0.32}
              fontStyle="italic"
              fill="#1a0e08"
              opacity="0.85"
            >
              Z
            </text>
            {/* Brilho */}
            <rect x={3} y={12} width={2} height={bodyH * 0.6} fill="rgba(255,255,255,0.55)" rx={1} />
          </g>
        );
      })}
    </svg>
  );
}

/* ---------------- Item da faixa de confiança ---------------- */

function ConfiancaItem({
  icon,
  titulo,
  sub,
}: {
  icon: React.ReactNode;
  titulo: string;
  sub: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-amber">{icon}</span>
      <div className="flex flex-col">
        <span className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-ink">
          {titulo}
        </span>
        <span className="text-xs leading-snug text-ink/65">{sub}</span>
      </div>
    </div>
  );
}

/* ---------------- Passo ---------------- */

function Passo({
  n,
  titulo,
  sub,
  icon,
}: {
  n: string;
  titulo: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-[12px] font-sans font-bold text-cream">
        {n}
      </span>
      <span className="shrink-0 text-amber/85">{icon}</span>
      <div className="flex flex-col">
        <span className="text-[12px] font-sans font-bold uppercase tracking-[0.18em] text-ink">
          {titulo}
        </span>
        <span className="text-xs leading-snug text-ink/65">{sub}</span>
      </div>
    </div>
  );
}

/* ---------------- Ícones do "Como funciona" ---------------- */

function FrascoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 2h4v3h-4z" />
      <path d="M8 5h8l-1 4v11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V9z" />
      <path d="M10 12h4" />
    </svg>
  );
}

function MaoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 11V5a2 2 0 0 1 4 0v6" />
      <path d="M12 11V3a2 2 0 0 1 4 0v8" />
      <path d="M16 11V6a2 2 0 0 1 4 0v9a7 7 0 0 1-14 0V9a2 2 0 0 1 2-2" />
    </svg>
  );
}

function FrascoCheioIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 2h6v4H9z" />
      <path d="M7 6h10v15a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z" />
      <circle cx="12" cy="14" r="2" />
    </svg>
  );
}
