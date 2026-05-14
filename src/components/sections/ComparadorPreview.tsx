"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CATALOGO } from "@/data/catalogo";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

const DESIGNER_ORIGINAL_ELE = {
  nome: "Creed Aventus",
  preco: 2400,
  acorde: "Acorde frutado amadeirado",
  exemplosTexto:
    "Tem alternativas árabes pra Sauvage, Bleu de Chanel, Le Male Elixir, Angel's Share, YSL e muitos outros clássicos.",
};

const DESIGNER_ORIGINAL_ELA = {
  nome: "La Vie Est Belle",
  preco: 729,
  acorde: "Acorde gourmand floral",
  exemplosTexto:
    "Tem alternativas árabes pra La Vie Est Belle, Good Girl, Libre, Black Opium, Coco Mademoiselle e mais.",
};

/**
 * Prévia do Comparador.
 * Prop `mundo`:
 * - "ele" / "raiz" / undefined → Aventus × Club de Nuit Intense
 * - "ela" → La Vie Est Belle × Khamrah (ou primeiro feminino destaque do catálogo)
 */
export function ComparadorPreview({
  mundo = "ele",
}: {
  mundo?: "ele" | "ela" | "raiz";
} = {}) {
  const isEla = mundo === "ela";
  const DESIGNER = isEla ? DESIGNER_ORIGINAL_ELA : DESIGNER_ORIGINAL_ELE;
  const comparadorHref = isEla ? "/ela/comparador" : "/comparador";

  const alternativa = isEla
    ? CATALOGO.find((p) => p.genero === "feminino" && p.destaque) ??
      CATALOGO.find((p) => p.genero === "feminino")
    : CATALOGO.find((p) => p.id === "club-de-nuit-intense");
  if (!alternativa) return null;

  const perfumeHref = isEla
    ? `/ela/perfume/${alternativa.id}`
    : `/perfume/${alternativa.id}`;

  const economia = alternativa.precoVenda
    ? Math.round(
        ((DESIGNER.preco - alternativa.precoVenda) / DESIGNER.preco) * 100,
      )
    : 0;

  return (
    <section
      id="comparador"
      className="section-veil-light relative overflow-hidden border-t border-ink/5 px-6 py-24 md:px-12 md:py-32"
    >
      {/* Vinheta dourada */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(231,182,89,0.16), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="flex flex-col gap-5"
        >
          <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="h-px w-8 bg-amber" />
            Árabe × Designer
          </span>

          <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.04] tracking-tight text-ink md:text-5xl lg:text-6xl">
            O cheiro que você conhece,
            <br />
            <em className="italic text-amber/90">na leitura árabe.</em>
          </h2>

          <p className="font-display text-lg italic text-amber/85 md:text-xl">
            Compare assinatura, desempenho e economia.
          </p>

          <p className="max-w-2xl text-base leading-relaxed text-ink/75 md:text-[17px]">
            Algumas fragrâncias árabes reinterpretam DNAs de grifes icônicas com
            altíssima qualidade e um custo-benefício que faz sentido.
          </p>
        </motion.div>

        {/* Comparação 2 cards + centro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15, ease: EASE_OUT }}
          className="mt-12 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-6"
        >
          {/* Lado designer */}
          <div className="relative flex flex-col items-center gap-5 rounded-md border border-ink/10 bg-cream-soft p-7 text-center md:p-9">
            <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-ink/65">
              Designer
            </span>
            <DesignerFrascoSVG />
            <h3 className="font-display text-2xl font-light leading-tight text-ink md:text-3xl">
              {DESIGNER.nome}
            </h3>
            <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-ink/55">
              Preço de boutique
            </span>
            <span className="font-display text-4xl font-light text-ink md:text-5xl">
              R$ {DESIGNER.preco.toLocaleString("pt-BR")}
            </span>
          </div>

          {/* Centro: economia */}
          <div className="flex flex-col items-center justify-center gap-3 py-6 lg:px-4 lg:py-0">
            <CoinIcon />
            <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-ink/65">
              Você economiza
            </span>
            <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              até
            </span>
            <span className="font-display text-6xl font-light leading-none text-amber md:text-7xl lg:text-8xl">
              {economia}%
            </span>
            <span className="h-px w-12 bg-amber/50" />
            <p className="max-w-[180px] text-center text-[10px] font-sans uppercase tracking-[0.32em] text-ink/65">
              Mesma essência.
              <br />
              Escolhas inteligentes.
            </p>
          </div>

          {/* Lado árabe */}
          <Link
            href={perfumeHref}
            className="group relative flex flex-col items-center gap-5 overflow-hidden rounded-md border border-amber/40 bg-cream-soft p-7 text-center transition-all hover:border-amber md:p-9"
          >
            {/* Selo "INSPIRADO EM GRANDES ASSINATURAS" */}
            <div className="absolute right-3 top-3 hidden md:block">
              <CarimboInspirado />
            </div>

            <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              Alternativa árabe
            </span>

            {hasFoto(alternativa) ? (
              <div className="relative h-40 w-40 overflow-hidden rounded-md bg-cream">
                <Image
                  src={fotoSrc(alternativa)}
                  alt={alternativa.nome}
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ) : (
              <DesignerFrascoSVG />
            )}

            <h3 className="font-display text-2xl font-light leading-tight text-ink transition-colors group-hover:text-amber md:text-3xl">
              {alternativa.nome}
            </h3>
            <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber/80">
              Referência alta · mesma família
            </span>
            <span className="font-display text-4xl font-light text-ink md:text-5xl">
              R$ {alternativa.precoVenda}
            </span>
          </Link>
        </motion.div>

        {/* Chips comparativos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE_OUT }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Chip
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 2C8 6 6 9 6 13a6 6 0 0 0 12 0c0-4-2-7-6-11z" />
              </svg>
            }
            label="Mesma proposta olfativa"
          />
          <Chip
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 2v20" />
                <path d="M4 8c4-2 8-2 16 0" />
                <path d="M4 14c4-2 8-2 16 0" />
              </svg>
            }
            label={DESIGNER.acorde}
          />
          <Chip
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            }
            label="Muito mais acessível"
          />
          <Chip
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M10 2h4v3h-4z" />
                <path d="M8 5h8v15a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z" />
                <path d="M10 11h4" />
              </svg>
            }
            label="Ideal para testar em decant"
          />
        </motion.div>

        {/* Faixa de garantias */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT }}
          className="mt-8 grid grid-cols-2 gap-5 rounded-md border border-ink/10 bg-cream/70 px-6 py-5 sm:grid-cols-4 lg:px-10"
        >
          <Garantia
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M10 2h4v3h-4z" />
                <path d="M8 5h8v15a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z" />
              </svg>
            }
            titulo="Curadoria Zahir"
            sub="Selecionamos apenas o que entregar performance."
          />
          <Garantia
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 6h18" />
                <path d="m6 6 2 12h8l2-12" />
                <path d="M12 3v3" />
              </svg>
            }
            titulo="Comparação honesta"
            sub="Transparência sobre inspiração, performance e uso."
          />
          <Garantia
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="m8 12 3 3 5-6" />
              </svg>
            }
            titulo="Originais e decants"
            sub="Produtos 100% originais e decants higienizados."
          />
          <Garantia
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path d="M5 21a7 7 0 0 1 14 0" />
              </svg>
            }
            titulo="Atendimento humano"
            sub="Especialistas que te ajudam a fazer a melhor escolha."
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-5 text-center"
        >
          <p className="max-w-2xl text-sm italic leading-relaxed text-ink/70 md:text-base">
            {DESIGNER.exemplosTexto}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={comparadorHref}
              className="group inline-flex items-center gap-3 rounded-full bg-amber px-7 py-3.5 text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
            >
              Ver comparador completo
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href={isEla ? "/ela/decants" : "/decants"}
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink/80 transition-all hover:border-amber hover:text-amber"
            >
              Quero testar em decant
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Frasco SVG (designer) ---------------- */

function DesignerFrascoSVG() {
  return (
    <svg
      width="120"
      height="160"
      viewBox="0 0 120 160"
      aria-hidden
    >
      <defs>
        <linearGradient id="cmpGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="1" stopColor="rgba(244,233,212,0.95)" />
        </linearGradient>
        <linearGradient id="cmpLiq" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(231,182,89,0.4)" />
          <stop offset="1" stopColor="rgba(200,155,60,0.85)" />
        </linearGradient>
      </defs>
      {/* Sombra */}
      <ellipse cx="60" cy="155" rx="40" ry="4" fill="rgba(0,0,0,0.15)" />
      {/* Tampa */}
      <rect x="44" y="0" width="32" height="20" fill="#1a0e08" rx="2" />
      <rect x="48" y="-3" width="24" height="5" fill="#c89b3c" rx="1" />
      {/* Pescoço */}
      <rect x="50" y="20" width="20" height="12" fill="rgba(255,255,255,0.6)" stroke="#c89b3c" strokeWidth="0.8" />
      {/* Corpo */}
      <rect x="20" y="32" width="80" height="118" fill="url(#cmpGlass)" stroke="#c89b3c" strokeWidth="1" rx="3" />
      {/* Líquido */}
      <rect x="22" y="50" width="76" height="98" fill="url(#cmpLiq)" rx="2" />
      {/* Etiqueta */}
      <rect x="32" y="74" width="56" height="44" fill="#faf7f0" stroke="#c89b3c" strokeWidth="0.5" />
      <text x="60" y="95" textAnchor="middle" fontFamily="serif" fontSize="9" fill="#1a0e08" letterSpacing="2">PARFUM</text>
      <line x1="42" y1="100" x2="78" y2="100" stroke="#c89b3c" strokeWidth="0.4" />
      <text x="60" y="110" textAnchor="middle" fontFamily="serif" fontSize="6" fill="#8c6b26" letterSpacing="1">ZAHIR</text>
      {/* Brilho */}
      <ellipse cx="32" cy="80" rx="2" ry="40" fill="rgba(255,255,255,0.6)" />
    </svg>
  );
}

/* ---------------- Ícone de moedas ---------------- */

function CoinIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden>
      <ellipse cx="11" cy="22" rx="8" ry="3" fill="#c89b3c" />
      <ellipse cx="11" cy="20" rx="8" ry="3" fill="#e7b659" stroke="#8c6b26" strokeWidth="0.6" />
      <ellipse cx="16" cy="16" rx="8" ry="3" fill="#c89b3c" />
      <ellipse cx="16" cy="14" rx="8" ry="3" fill="#e7b659" stroke="#8c6b26" strokeWidth="0.6" />
      <ellipse cx="21" cy="10" rx="8" ry="3" fill="#c89b3c" />
      <ellipse cx="21" cy="8" rx="8" ry="3" fill="#e7b659" stroke="#8c6b26" strokeWidth="0.6" />
      <text x="21" y="11" textAnchor="middle" fontFamily="serif" fontSize="7" fill="#8c6b26" fontStyle="italic">$</text>
    </svg>
  );
}

/* ---------------- Carimbo "INSPIRADO EM GRANDES ASSINATURAS" ---------------- */

function CarimboInspirado() {
  return (
    <svg width="78" height="78" viewBox="0 0 100 100" aria-hidden>
      <defs>
        <path
          id="circle-path"
          d="M 50 50 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0"
        />
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke="#c89b3c" strokeWidth="0.6" />
      <circle cx="50" cy="50" r="32" fill="none" stroke="#c89b3c" strokeWidth="0.6" />
      <text
        fontFamily="serif"
        fontSize="7"
        fill="#c89b3c"
        letterSpacing="2"
      >
        <textPath href="#circle-path" startOffset="0">
          INSPIRADO EM GRANDES · ASSINATURAS ·
        </textPath>
      </text>
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="22"
        fontStyle="italic"
        fill="#c89b3c"
      >
        Z
      </text>
    </svg>
  );
}

/* ---------------- Chip comparativo ---------------- */

function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-cream-soft/80 px-4 py-2 text-xs text-ink/80">
      <span className="text-amber" aria-hidden>
        {icon}
      </span>
      {label}
    </span>
  );
}

/* ---------------- Garantia (4 ícones) ---------------- */

function Garantia({
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
