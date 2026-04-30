"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { CATALOGO, type Perfume, type Projecao } from "@/data/catalogo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";
import { addItem, type ItemLista } from "@/lib/lista-store";
import {
  linkInstagram,
  linkWhatsApp,
  mensagemLista,
} from "@/lib/reserva-dm";
import { events } from "@/lib/track";
import { toast } from "@/lib/toast-store";
import { normalizarNota } from "@/lib/notas-helper";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

function formatMoney(n: number | null): string {
  if (n === null) return "—";
  return `R$ ${n.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

/** Score numerico de projecao pra comparar quem "projeta mais" */
const PROJECAO_SCORE: Record<Projecao, number> = {
  discreta: 1,
  moderada: 2,
  "moderada-alta": 3,
  alta: 4,
  nuclear: 5,
};

/** Extrai o "valor de fixacao" minimo a partir do texto ("8-10h" -> 8) */
function fixacaoScore(fix: string | null): number {
  if (!fix) return 0;
  const m = fix.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const slugA = searchParams.get("a") ?? "";
  const slugB = searchParams.get("b") ?? "";

  const a = useMemo(() => CATALOGO.find((p) => p.id === slugA), [slugA]);
  const b = useMemo(() => CATALOGO.find((p) => p.id === slugB), [slugB]);

  const setSlot = (slot: "a" | "b", id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set(slot, id);
    else params.delete(slot);
    router.replace(`/compare?${params.toString()}`, { scroll: false });
  };

  return (
    <article className="relative">
      <header className="px-6 pb-10 pt-32 md:px-12 md:pb-14 md:pt-40">
        <div className="mx-auto max-w-[1440px]">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Catálogo", href: "/catalogo" },
              { label: "Comparar" },
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="mt-8 flex flex-col gap-6"
          >
            <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="h-px w-8 bg-amber" />
              Comparar 2 a 2
            </span>
            <h1 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Dois frascos,{" "}
              <em className="italic text-amber/90">uma decisão.</em>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
              Coloca dois perfumes do catálogo lado a lado. Veja a pirâmide
              olfativa de cada um, quais notas eles compartilham, qual projeta
              mais, qual dura mais, qual sai mais barato. Útil quando você está
              em dúvida entre dois do mesmo perfil.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Seletores + comparação */}
      <section className="section-veil-light px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          {/* Seletores */}
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <SeletorSlot
              label="A"
              selecionado={a}
              onSelect={(id) => setSlot("a", id)}
              outroSlug={slugB}
            />
            <SeletorSlot
              label="B"
              selecionado={b}
              onSelect={(id) => setSlot("b", id)}
              outroSlug={slugA}
            />
          </div>

          {/* Área de comparação */}
          <AnimatePresence mode="wait">
            {a && b ? (
              <ComparacaoView key={`${a.id}-${b.id}`} a={a} b={b} />
            ) : (
              <EmptyState key="empty" />
            )}
          </AnimatePresence>
        </div>
      </section>
    </article>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-sm italic text-ink/75">Carregando…</div>}>
      <CompareContent />
    </Suspense>
  );
}

/* ---------------- Seletor de slot ---------------- */

function SeletorSlot({
  label,
  selecionado,
  onSelect,
  outroSlug,
}: {
  label: string;
  selecionado: Perfume | undefined;
  onSelect: (id: string) => void;
  outroSlug: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`group flex w-full items-center gap-4 rounded-sm border p-4 transition-all md:p-5 ${
          selecionado
            ? "border-amber/40 hover:border-amber"
            : "border-dashed border-ink/20 bg-cream-soft/30 hover:border-amber/60"
        }`}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber bg-amber/10 font-display text-lg italic text-amber">
          {label}
        </span>
        {selecionado ? (
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {hasFoto(selecionado) && (
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm border border-ink/10">
                <Image
                  src={fotoSrc(selecionado)}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex min-w-0 flex-col text-left">
              <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-amber/80">
                {selecionado.marca}
              </span>
              <span className="truncate font-display text-lg font-light text-ink">
                {selecionado.nome}
              </span>
            </div>
          </div>
        ) : (
          <span className="flex-1 text-left text-sm italic text-ink/70">
            Escolher perfume…
          </span>
        )}
        <span className="text-xs text-ink/70">{open ? "▲" : "▼"}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 right-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-sm border border-amber/30 bg-cream shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
        >
          <ul>
            {CATALOGO.map((p) => {
              const jaEhOutro = p.id === outroSlug;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => {
                      if (jaEhOutro) return;
                      onSelect(p.id);
                      setOpen(false);
                    }}
                    disabled={jaEhOutro}
                    className={`flex w-full items-center gap-3 border-b border-ink/5 px-4 py-3 text-left transition-colors ${
                      jaEhOutro
                        ? "cursor-not-allowed opacity-40"
                        : "hover:bg-cream-soft/70"
                    }`}
                  >
                    {hasFoto(p) && (
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm border border-ink/10">
                        <Image src={fotoSrc(p)} alt="" fill sizes="40px" className="object-cover" />
                      </div>
                    )}
                    <div className="flex min-w-0 flex-col">
                      <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-amber/70">
                        Nº {String(p.numero).padStart(2, "0")} · {p.marca ?? "—"}
                      </span>
                      <span className="truncate font-display text-base text-ink">
                        {p.nome}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </div>
  );
}

/* ---------------- Empty state ---------------- */

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mt-16 flex flex-col items-center gap-5 rounded-sm border border-dashed border-ink/15 py-16 text-center"
    >
      <span className="font-display text-4xl italic text-amber/40">A × B</span>
      <p className="max-w-md text-base text-ink/65">
        Escolhe dois perfumes acima pra ver a comparação lado a lado.
      </p>
      <Link
        href="/catalogo"
        className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber underline-offset-4 hover:underline"
      >
        Ir ao catálogo
      </Link>
    </motion.div>
  );
}

/* ---------------- Comparação view ---------------- */

function ComparacaoView({ a, b }: { a: Perfume; b: Perfume }) {
  // Set normalizado de notas pra detectar comuns
  const notasNormA = useMemo(
    () =>
      new Set(
        [...a.notas.topo, ...a.notas.coracao, ...a.notas.fundo].map(
          normalizarNota,
        ),
      ),
    [a],
  );
  const notasNormB = useMemo(
    () =>
      new Set(
        [...b.notas.topo, ...b.notas.coracao, ...b.notas.fundo].map(
          normalizarNota,
        ),
      ),
    [b],
  );
  const comuns = useMemo(
    () => Array.from(notasNormA).filter((n) => notasNormB.has(n)),
    [notasNormA, notasNormB],
  );

  // Diferenca de preco
  const diferencaPreco =
    a.precoVenda !== null && b.precoVenda !== null
      ? Math.abs(a.precoVenda - b.precoVenda)
      : null;

  const handleAddBoth = () => {
    addItem(a, "frasco");
    addItem(b, "frasco");
    toast.success(
      "Os dois na sua lista",
      "Abra a lista no canto inferior direito pra fechar via WhatsApp ou Instagram.",
    );
  };

  const items: ItemLista[] = useMemo(
    () => [
      {
        perfumeId: a.id,
        variante: "frasco",
        precoSnapshot: a.precoVenda ?? 0,
        addedAt: Date.now(),
      },
      {
        perfumeId: b.id,
        variante: "frasco",
        precoSnapshot: b.precoVenda ?? 0,
        addedAt: Date.now(),
      },
    ],
    [a, b],
  );

  const totalAmbos = (a.precoVenda ?? 0) + (b.precoVenda ?? 0);

  const handleWa = () => {
    const url = linkWhatsApp(mensagemLista(items));
    if (!url) return;
    events.enviouListaWa(2, totalAmbos);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleIg = () => {
    events.enviouListaDm(2, totalAmbos);
    const url = linkInstagram(mensagemLista(items));
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="mt-12 flex flex-col gap-12"
    >
      {/* Fotos lado a lado */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <FotoLado perfume={a} lado="A" />
        <FotoLado perfume={b} lado="B" />
      </div>

      {/* Pirâmide olfativa lado a lado */}
      <PiramideComparada a={a} b={b} comuns={comuns} />

      {/* Tabela técnica (com indicador de quem ganha em performance/preço) */}
      <TabelaTecnica a={a} b={b} />

      {/* Resumo de diferença de preço */}
      {diferencaPreco !== null && diferencaPreco > 0 && (
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-ink/75">
            Diferença de preço
          </span>
          <span className="font-display text-4xl font-light text-ink md:text-5xl">
            R$ {diferencaPreco.toLocaleString("pt-BR")}
          </span>
          <span className="text-xs italic text-ink/70">
            entre {a.nome} e {b.nome}
          </span>
        </div>
      )}

      {/* CTA final — WhatsApp + Instagram */}
      <div className="flex flex-col gap-4 border-t border-ink/5 pt-10">
        <div className="text-center">
          <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber-dim">
            Levar os dois
          </span>
          <p className="mt-2 font-display text-2xl font-light text-ink md:text-3xl">
            Total estimado:{" "}
            <span className="text-amber">{formatMoney(totalAmbos)}</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-4">
          <button
            type="button"
            onClick={handleAddBoth}
            className="rounded-full border border-ink/25 px-7 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-ink/85 transition-all hover:border-amber hover:text-amber"
          >
            Adicionar à lista
          </button>
          <button
            type="button"
            onClick={handleWa}
            className="group inline-flex items-center gap-3 rounded-full bg-amber px-7 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
          >
            Reservar pelo WhatsApp
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </button>
          <button
            type="button"
            onClick={handleIg}
            className="group inline-flex items-center gap-3 rounded-full border border-ink/25 bg-cream/40 px-7 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-ink/85 transition-all hover:border-amber hover:text-amber"
          >
            Reservar pelo Instagram
            <span className="opacity-60 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
              →
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Foto lado ---------------- */

function FotoLado({ perfume, lado }: { perfume: Perfume; lado: string }) {
  return (
    <Link
      href={`/perfume/${perfume.id}`}
      className="group relative block aspect-square overflow-hidden rounded-sm border border-ink/10 bg-ink"
    >
      {hasFoto(perfume) && (
        <Image
          src={fotoSrc(perfume)}
          alt={perfume.nome}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-ink/55 via-ink/15 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ink/95 via-ink/55 to-transparent"
      />
      <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-amber bg-amber/20 font-display text-xl italic text-amber backdrop-blur-sm">
        {lado}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6">
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber/95">
          {perfume.marca}
        </span>
        <h3 className="font-display text-2xl font-light leading-[1.1] text-cream transition-colors group-hover:text-amber/95 md:text-3xl">
          {perfume.nome}
        </h3>
        <span className="mt-1 font-display text-xl font-light text-cream">
          {formatMoney(perfume.precoVenda)}
        </span>
      </div>
    </Link>
  );
}

/* ---------------- Pirâmide comparada ---------------- */

function PiramideComparada({
  a,
  b,
  comuns,
}: {
  a: Perfume;
  b: Perfume;
  comuns: string[];
}) {
  const camadas: { label: string; key: "topo" | "coracao" | "fundo" }[] = [
    { label: "Topo", key: "topo" },
    { label: "Coração", key: "coracao" },
    { label: "Fundo", key: "fundo" },
  ];

  return (
    <div className="overflow-hidden rounded-sm border border-ink/10 bg-cream-soft/40">
      <div className="border-b border-ink/10 px-5 py-4 md:px-8">
        <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
          Pirâmide olfativa
        </span>
        {comuns.length > 0 && (
          <p className="mt-1 text-xs italic text-ink/70">
            Notas em <span className="text-amber">amber</span> aparecem nos
            dois — {comuns.length} no total.
          </p>
        )}
      </div>

      {camadas.map((c) => (
        <div
          key={c.key}
          className="grid grid-cols-1 gap-3 border-b border-ink/5 p-5 last:border-0 md:grid-cols-[1fr_auto_1fr] md:gap-6 md:px-8 md:py-6"
        >
          {/* A */}
          <div className="flex flex-col gap-2 md:items-end md:text-right">
            <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-ink/55 md:hidden">
              A · {a.nome}
            </span>
            <NotasChips
              notas={a.notas[c.key]}
              comunsSet={new Set(comuns)}
              alinhamento="end"
            />
          </div>

          {/* Label central */}
          <div className="flex items-center justify-center">
            <span className="rounded-full border border-amber/40 bg-cream px-3 py-1 text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
              {c.label}
            </span>
          </div>

          {/* B */}
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-ink/55 md:hidden">
              B · {b.nome}
            </span>
            <NotasChips
              notas={b.notas[c.key]}
              comunsSet={new Set(comuns)}
              alinhamento="start"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function NotasChips({
  notas,
  comunsSet,
  alinhamento,
}: {
  notas: string[];
  comunsSet: Set<string>;
  alinhamento: "start" | "end";
}) {
  if (notas.length === 0) {
    return (
      <span className="text-xs italic text-ink/50">—</span>
    );
  }
  return (
    <div
      className={`flex flex-wrap gap-1.5 ${
        alinhamento === "end" ? "md:justify-end" : ""
      }`}
    >
      {notas.map((n) => {
        const comum = comunsSet.has(normalizarNota(n));
        return (
          <span
            key={n}
            className={`rounded-full border px-2.5 py-0.5 text-[11px] transition-colors ${
              comum
                ? "border-amber bg-amber/15 text-amber"
                : "border-ink/15 bg-cream/60 text-ink/85"
            }`}
          >
            {n}
          </span>
        );
      })}
    </div>
  );
}

/* ---------------- Tabela técnica ---------------- */

function TabelaTecnica({ a, b }: { a: Perfume; b: Perfume }) {
  // Vencedores em cada eixo
  const projecaoWinner = (() => {
    const sa = a.projecao ? PROJECAO_SCORE[a.projecao] : 0;
    const sb = b.projecao ? PROJECAO_SCORE[b.projecao] : 0;
    if (sa === sb) return "tie";
    return sa > sb ? "a" : "b";
  })();
  const fixacaoWinner = (() => {
    const fa = fixacaoScore(a.fixacao);
    const fb = fixacaoScore(b.fixacao);
    if (fa === fb) return "tie";
    return fa > fb ? "a" : "b";
  })();
  const precoWinner = (() => {
    if (a.precoVenda === null || b.precoVenda === null) return "tie";
    if (a.precoVenda === b.precoVenda) return "tie";
    // Menor preço = vencedor (custo-benefício)
    return a.precoVenda < b.precoVenda ? "a" : "b";
  })();

  return (
    <div className="overflow-hidden rounded-sm border border-ink/10 bg-cream-soft/40">
      <div className="border-b border-ink/10 px-5 py-4 md:px-8">
        <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
          Ficha técnica
        </span>
      </div>
      <LinhaCompara label="Marca" valorA={a.marca ?? "—"} valorB={b.marca ?? "—"} />
      <LinhaCompara label="Volume" valorA={a.volume} valorB={b.volume} />
      <LinhaCompara label="Concentração" valorA={a.concentracao} valorB={b.concentracao} />
      <LinhaCompara label="Família" valorA={a.familia ?? "—"} valorB={b.familia ?? "—"} />
      <LinhaCompara
        label="Projeção"
        valorA={a.projecao ?? "—"}
        valorB={b.projecao ?? "—"}
        vencedor={projecaoWinner as "a" | "b" | "tie"}
        legendaTieBreak="quem se faz notar mais"
      />
      <LinhaCompara
        label="Fixação"
        valorA={a.fixacao ?? "—"}
        valorB={b.fixacao ?? "—"}
        vencedor={fixacaoWinner as "a" | "b" | "tie"}
        legendaTieBreak="quem dura mais na pele"
      />
      <LinhaCompara
        label="Inspirado em"
        valorA={a.cloneDe?.[0] ?? "DNA próprio"}
        valorB={b.cloneDe?.[0] ?? "DNA próprio"}
      />
      <LinhaCompara
        label="Fidelidade"
        valorA={a.cloneFidelidade ?? "—"}
        valorB={b.cloneFidelidade ?? "—"}
      />
      <LinhaCompara
        label="Preço"
        valorA={formatMoney(a.precoVenda)}
        valorB={formatMoney(b.precoVenda)}
        destaque
        vencedor={precoWinner as "a" | "b" | "tie"}
        legendaTieBreak="custo-benefício"
      />
    </div>
  );
}

function LinhaCompara({
  label,
  valorA,
  valorB,
  destaque = false,
  vencedor,
  legendaTieBreak,
}: {
  label: string;
  valorA: string;
  valorB: string;
  destaque?: boolean;
  vencedor?: "a" | "b" | "tie";
  legendaTieBreak?: string;
}) {
  const aWinner = vencedor === "a";
  const bWinner = vencedor === "b";
  const tieBreakActive = vencedor && vencedor !== "tie";

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-ink/5 px-5 py-4 last:border-0 md:gap-6 md:px-8 md:py-5">
      {/* Mobile: label aparece em cima */}
      <div className="col-span-3 mb-1 flex items-center justify-center gap-2 md:hidden">
        <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber">
          {label}
        </span>
        {tieBreakActive && legendaTieBreak && (
          <span className="text-[9px] italic text-ink/50">
            ({legendaTieBreak})
          </span>
        )}
      </div>

      <div className="flex flex-col gap-0.5 md:items-end md:text-right">
        <span
          className={`${
            destaque
              ? "font-display text-xl text-ink md:text-2xl"
              : "text-sm text-ink/85"
          } ${aWinner ? "font-display text-amber md:text-amber" : ""}`}
        >
          {valorA}
        </span>
        {aWinner && (
          <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-amber/80">
            ◆ ganha aqui
          </span>
        )}
      </div>

      <div className="hidden flex-col items-center gap-1 md:flex">
        <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber">
          {label}
        </span>
        {tieBreakActive && legendaTieBreak && (
          <span className="text-[9px] italic text-ink/50">
            {legendaTieBreak}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <span
          className={`${
            destaque
              ? "font-display text-xl text-ink md:text-2xl"
              : "text-sm text-ink/85"
          } ${bWinner ? "font-display text-amber md:text-amber" : ""}`}
        >
          {valorB}
        </span>
        {bWinner && (
          <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-amber/80">
            ◆ ganha aqui
          </span>
        )}
      </div>
    </div>
  );
}
