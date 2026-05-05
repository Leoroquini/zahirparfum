"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import type { Perfume } from "@/data/catalogo";
import { addItem, useLista } from "@/lib/lista-store";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";
import { toast } from "@/lib/toast-store";

/**
 * Gradient escuro de fundo do card, por família olfativa.
 * Cards têm fundo escuro pra destacar as fotos dos perfumes, o card é uma
 * "ilha" sobre o mármore claro do site (alto contraste = qualidade editorial).
 */
function gradientForFamily(familia: string | null): string {
  if (!familia)
    return "linear-gradient(135deg, #1a0a0e 0%, #3d1a22 50%, #8c6b26 100%)";
  const f = familia.toLowerCase();
  if (f.includes("aquátic") || f.includes("marinh"))
    return "linear-gradient(135deg, #0a1a25 0%, #1a3347 50%, #4a7a9c 100%)";
  if (f.includes("gourmand"))
    return "linear-gradient(135deg, #1a0e06 0%, #3d2210 50%, #c89b6a 100%)";
  if (f.includes("oriental oud") || f.includes(" oud"))
    return "linear-gradient(135deg, #0a0605 0%, #2a150a 55%, #6a3d1e 100%)";
  if (f.includes("floral doce") || f.includes("floral"))
    return "linear-gradient(135deg, #2a0e1a 0%, #4a1e3d 50%, #c89b6a 100%)";
  if (f.includes("fougère"))
    return "linear-gradient(135deg, #14211a 0%, #2a4538 50%, #6b8a5d 100%)";
  if (f.includes("aromático frutado cítrico"))
    return "linear-gradient(135deg, #1a2010 0%, #3d4518 50%, #c89b6a 100%)";
  if (f.includes("aromático frutado amadeirado"))
    return "linear-gradient(135deg, #1a1e0e 0%, #3d3522 50%, #8c6b26 100%)";
  if (f.includes("especiado"))
    return "linear-gradient(135deg, #2e0e10 0%, #5c1e20 50%, #8c5d26 100%)";
  if (f.includes("âmbar") || f.includes("oriental amadeirado"))
    return "linear-gradient(135deg, #1a0a0e 0%, #4a1518 50%, #c89b3c 100%)";
  if (f.includes("oriental baunilha"))
    return "linear-gradient(135deg, #1a0e08 0%, #3d2014 50%, #c89b6a 100%)";
  if (f.includes("oriental"))
    return "linear-gradient(135deg, #1a0a0e 0%, #3d1a22 50%, #8c6b26 100%)";
  if (f.includes("amadeirado aromático fresco"))
    return "linear-gradient(135deg, #0f1a25 0%, #1e3447 50%, #4a7a8c 100%)";
  if (f.includes("amadeirado aromático"))
    return "linear-gradient(135deg, #2e1b0c 0%, #4a2f14 45%, #8c6b26 100%)";
  if (f.includes("amadeirado especiado"))
    return "linear-gradient(135deg, #1a1510 0%, #3d2822 50%, #6e5326 100%)";
  if (f.includes("amadeirado"))
    return "linear-gradient(135deg, #1a1510 0%, #3d3322 50%, #6e5b36 100%)";
  if (f.includes("aromático"))
    return "linear-gradient(135deg, #1a1a0e 0%, #3d3520 50%, #8c6b26 100%)";
  return "linear-gradient(135deg, #1a0a0e 0%, #3d1a22 50%, #8c6b26 100%)";
}

type Destaque = NonNullable<Perfume["destaque"]>;

const DESTAQUE_LABELS: Record<Destaque, string> = {
  "mais-pedido": "Mais pedido",
  novidade: "Novidade",
  "ultimas-unidades": "Últimas unidades",
  curadoria: "Escolha da curadoria",
};

function DestaqueBadge({ destaque }: { destaque: Destaque }) {
  const isUrgente = destaque === "ultimas-unidades";
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[9px] font-sans uppercase tracking-[0.28em] backdrop-blur-sm ${
        isUrgente
          ? "border-wine/80 bg-wine/30 text-cream"
          : "border-amber bg-amber/20 text-amber"
      }`}
    >
      {DESTAQUE_LABELS[destaque]}
    </span>
  );
}

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

export function PerfumeCard({ perfume, index = 0 }: Props) {
  const gradient = gradientForFamily(perfume.familia);
  const primaryClone = perfume.cloneDe?.[0];
  const extraClones = perfume.cloneDe && perfume.cloneDe.length > 1
    ? perfume.cloneDe.length - 1
    : 0;
  const isPending = !perfume.marca;
  const lista = useLista();
  const jaNaLista = lista.some((i) => i.perfumeId === perfume.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: Math.min(index * 0.04, 0.4),
        ease: [0.19, 1, 0.22, 1],
      }}
      className="group/wrap relative"
    >
      <Link
        href={`/perfume/${perfume.id}`}
        className="group relative block aspect-square overflow-hidden rounded-sm border border-ink/20 bg-ink shadow-product transition-all duration-700 hover:-translate-y-1 hover:border-amber/60 hover:shadow-product-hover"
      >
        {/* Foto real do perfume (ou gradient fallback) */}
        {hasFoto(perfume) ? (
          <>
            <Image
              src={fotoSrc(perfume)}
              alt={`Frasco de ${perfume.nome}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-[1500ms] group-hover:scale-[1.03]"
            />
            {/* Vinheta âmbar no hover pra destacar */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(200,155,60,0.18) 100%)",
              }}
            />
          </>
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 transition-transform duration-[1500ms] group-hover:scale-105"
            style={{ background: gradient }}
          />
        )}

        {/* Darkening gradient no topo pra contraste dos badges */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-ink/55 via-ink/20 to-transparent"
        />

        {/* Darkening gradient no rodapé pra contraste do texto sem cobrir o frasco */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-ink/95 via-ink/60 to-transparent"
        />

        {/* Número do catálogo */}
        <div className="absolute left-5 top-5 z-10 flex flex-col items-start gap-2">
          <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber/80">
            Nº {String(perfume.numero).padStart(2, "0")}
          </span>
          {perfume.destaque && <DestaqueBadge destaque={perfume.destaque} />}
        </div>

        {/* Concentração ou badge "em breve" + decant disponível */}
        <div className="absolute right-5 top-5 z-10 flex flex-col items-end gap-1.5">
          <span
            className={`text-[9px] font-sans uppercase tracking-[0.35em] ${
              isPending ? "text-amber/70" : "text-cream/50"
            }`}
          >
            {isPending ? "Em breve" : perfume.concentracao}
          </span>
          {!isPending && perfume.decantDisponivel !== false && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber/40 bg-amber/10 px-2 py-0.5 text-[8px] font-sans uppercase tracking-[0.3em] text-amber backdrop-blur-sm">
              <span className="h-1 w-1 rounded-full bg-amber" />
              Decant
            </span>
          )}
        </div>

        {/* Conteúdo principal no rodapé */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6">
          {/* Marca */}
          <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber/90">
            {perfume.marca ?? "Fragrância"}
          </span>

          {/* Nome */}
          <h3 className="mt-2 font-display text-xl font-light leading-[1.1] text-cream transition-colors duration-500 group-hover:text-amber/95 md:text-2xl">
            {perfume.nome}
          </h3>

          {/* Divider */}
          <span className="mt-4 block h-px w-10 bg-amber/50 transition-all duration-500 group-hover:w-16 group-hover:bg-amber" />

          {/* Row: clone de × preço */}
          <div className="mt-4 flex items-end justify-between gap-3">
            <div className="min-w-0 flex-1">
              {primaryClone ? (
                <p className="text-xs leading-tight text-cream/60">
                  <span className="italic">inspirado em </span>
                  <span className="text-cream/85">{primaryClone}</span>
                  {extraClones > 0 && (
                    <span className="text-cream/40"> +{extraClones}</span>
                  )}
                </p>
              ) : isPending ? (
                <p className="text-xs italic text-cream/50">dados em breve</p>
              ) : (
                <p className="text-xs italic text-cream/60">DNA próprio</p>
              )}
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-cream/40">
                Frasco · {perfume.volume}
              </span>
              <span className="font-display text-2xl leading-none text-cream">
                {formatPrice(perfume.precoVenda)}
              </span>
            </div>
          </div>
        </div>

        {/* Seta de navegação, aparece no hover */}
        <div className="absolute right-5 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-all duration-500 group-hover:right-6 group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber/50 bg-ink/60 backdrop-blur-sm">
            <span className="font-sans text-xs text-amber">→</span>
          </div>
        </div>
      </Link>

      {/* Botão "+" pra adicionar à lista, fora do Link pra não disparar navegação */}
      {!isPending && perfume.precoVenda !== null && (
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
          className={`absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-400 ${
            jaNaLista
              ? "border-amber bg-amber text-ink"
              : "border-cream/20 bg-ink/70 text-cream/80 hover:border-amber hover:bg-amber hover:text-ink"
          }`}
        >
          <span className="text-base font-light leading-none">
            {jaNaLista ? "✓" : "+"}
          </span>
        </button>
      )}

      {/* Botão "Comparar com" — aparece no hover, pre-preenche slot A em /compare */}
      {!isPending && (
        <Link
          href={`/compare?a=${perfume.id}`}
          onClick={(e) => e.stopPropagation()}
          aria-label={`Comparar ${perfume.nome} com outro perfume`}
          title="Comparar lado a lado"
          className="absolute bottom-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 bg-ink/70 text-cream/80 opacity-0 backdrop-blur-sm transition-all duration-500 hover:border-amber hover:bg-amber hover:text-ink group-hover/wrap:opacity-100"
        >
          <span className="text-base leading-none">⇄</span>
        </Link>
      )}
    </motion.div>
  );
}
