"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import type { Perfume } from "@/data/catalogo";
import { addItem, useLista } from "@/lib/lista-store";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";
import { rotaPerfume } from "@/lib/genero";
import { toast } from "@/lib/toast-store";
import { precoFrasco } from "@/lib/promo";

type Destaque = NonNullable<Perfume["destaque"]>;

const DESTAQUE_LABELS: Record<Destaque, string> = {
  "mais-pedido": "Mais vendido",
  novidade: "Novo",
  "ultimas-unidades": "Últimas unidades",
  curadoria: "Curadoria",
};

function formatPrice(n: number | null): string {
  if (n === null) return "—";
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

type Props = {
  perfume: Perfume;
  index?: number;
};

/**
 * Variante "claro/editorial" do PerfumeCard.
 * Card cream com foto still-life em cima e infos embaixo —
 * estilo vitrine premium (proposta 2026-05-14).
 */
export function PerfumeCardLight({ perfume, index = 0 }: Props) {
  const primaryClone = perfume.cloneDe?.[0];
  const isPending = !perfume.marca;
  const lista = useLista();
  const jaNaLista = lista.some((i) => i.perfumeId === perfume.id);
  const preco = precoFrasco(perfume);
  const ehSelecionado = perfume.selecionadoSemana === true;
  const fichaHref = rotaPerfume(perfume);

  const badgeTopo =
    ehSelecionado
      ? { label: "Seleção da Semana", tone: "amber" as const }
      : perfume.destaque === "mais-pedido"
      ? { label: DESTAQUE_LABELS["mais-pedido"], tone: "ink" as const }
      : perfume.destaque === "novidade"
      ? { label: DESTAQUE_LABELS.novidade, tone: "ink" as const }
      : perfume.destaque === "curadoria"
      ? { label: DESTAQUE_LABELS.curadoria, tone: "amber" as const }
      : perfume.destaque === "ultimas-unidades"
      ? { label: DESTAQUE_LABELS["ultimas-unidades"], tone: "wine" as const }
      : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: Math.min(index * 0.05, 0.4),
        ease: [0.19, 1, 0.22, 1],
      }}
      className="group relative flex flex-col overflow-hidden rounded-md border border-ink/10 bg-cream-soft shadow-[0_2px_24px_-12px_rgba(0,0,0,0.18)] transition-all duration-700 hover:-translate-y-1 hover:border-amber/40 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.28)]"
    >
      {/* Faixa "Nº XX" no topo */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 flex items-start justify-between px-5 pt-4">
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber/80">
          Nº {String(perfume.numero).padStart(2, "0")}
        </span>
        {!isPending && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            aria-label="Favoritar"
            className="pointer-events-auto flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 bg-cream/60 text-ink/40 backdrop-blur-sm transition-all hover:border-amber hover:text-amber"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}
      </div>

      <Link href={fichaHref} className="flex flex-1 flex-col">
        {/* Foto still-life — mantém proporção quadrada da imagem original */}
        <div className="relative aspect-square w-full overflow-hidden bg-cream-muted">
          {/* Badge contextual sobre a foto */}
          {badgeTopo && (
            <div className="absolute left-4 top-12 z-10">
              <span
                className={`rounded-full px-2.5 py-1 text-[9px] font-sans font-bold uppercase tracking-[0.28em] shadow-sm ${
                  badgeTopo.tone === "amber"
                    ? "bg-amber text-ink"
                    : badgeTopo.tone === "wine"
                    ? "bg-wine text-cream"
                    : "bg-ink text-cream"
                }`}
              >
                {badgeTopo.label}
              </span>
            </div>
          )}

          {preco.emPromo && (
            <div className="absolute right-4 top-12 z-10">
              <span className="rounded-full bg-wine px-2.5 py-1 text-[9px] font-sans font-bold uppercase tracking-[0.28em] text-cream shadow-sm">
                Promo
              </span>
            </div>
          )}

          {hasFoto(perfume) ? (
            <Image
              src={fotoSrc(perfume)}
              alt={`Frasco de ${perfume.nome}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-[1500ms] group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cream-muted via-cream to-amber/10 text-amber/40">
              <span className="font-display text-6xl italic">∅</span>
            </div>
          )}

          {/* Vinheta sutil no rodapé pra emendar com bloco de texto */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-cream-soft to-transparent"
          />
        </div>

        {/* Bloco de infos */}
        <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-4">
          {/* Nome (2 linhas confortáveis) */}
          <h3 className="font-display text-2xl font-light leading-[1.1] text-ink transition-colors group-hover:text-amber md:text-[26px]">
            {perfume.nome}
          </h3>

          {/* Inspirado em */}
          {primaryClone ? (
            <p className="text-xs leading-snug text-ink/65">
              Inspirado em{" "}
              <span className="text-ink/85">{primaryClone}</span>
            </p>
          ) : isPending ? (
            <p className="text-xs italic text-ink/50">dados em breve</p>
          ) : (
            <p className="text-xs italic text-ink/60">DNA próprio</p>
          )}

          {/* Chips: concentração · volume · DECANT */}
          {!isPending && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="rounded-full bg-ink/[0.06] px-2.5 py-1 text-[9px] font-sans uppercase tracking-[0.28em] text-ink/70">
                {perfume.concentracao}
              </span>
              <span className="rounded-full bg-ink/[0.06] px-2.5 py-1 text-[9px] font-sans uppercase tracking-[0.28em] text-ink/70">
                {perfume.volume}
              </span>
              {perfume.decantDisponivel !== false && (
                <span className="rounded-full border border-amber/50 bg-amber/10 px-2.5 py-1 text-[9px] font-sans uppercase tracking-[0.28em] text-amber">
                  Decant
                </span>
              )}
            </div>
          )}

          {/* Preço */}
          <div className="mt-2 flex items-baseline gap-2">
            {preco.emPromo && preco.cheio !== null ? (
              <>
                <span className="font-sans text-sm leading-none text-ink/40 line-through">
                  {formatPrice(preco.cheio)}
                </span>
                <span className="font-display text-3xl leading-none text-amber">
                  {formatPrice(preco.atual)}
                </span>
              </>
            ) : (
              <span className="font-display text-3xl leading-none text-ink">
                {formatPrice(preco.atual)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Rodapé com CTA "Ver detalhes" + botão "+" */}
      {!isPending && perfume.precoVenda !== null && (
        <div className="flex items-stretch gap-2 border-t border-ink/8 bg-cream px-5 py-4">
          <Link
            href={fichaHref}
            className="flex-1 rounded-full bg-ink py-2.5 text-center text-[10px] font-sans uppercase tracking-[0.3em] text-cream transition-all hover:bg-amber hover:text-ink"
          >
            Ver detalhes
          </Link>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (jaNaLista) return;
              addItem(perfume, "frasco");
              toast.success(
                `${perfume.nome} na sua lista`,
                "Abre a lista no canto inferior direito pra enviar pro Instagram."
              );
            }}
            disabled={jaNaLista}
            aria-label={
              jaNaLista
                ? `${perfume.nome} já está na sua lista`
                : `Adicionar ${perfume.nome} à lista`
            }
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-base transition-all ${
              jaNaLista
                ? "border-amber bg-amber text-ink"
                : "border-ink/15 bg-cream text-ink hover:border-amber hover:bg-amber hover:text-ink"
            }`}
          >
            <span className="leading-none">{jaNaLista ? "✓" : "+"}</span>
          </button>
        </div>
      )}
    </motion.article>
  );
}
