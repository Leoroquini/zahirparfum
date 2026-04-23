"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { CATALOGO, type Perfume } from "@/data/catalogo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";
import { addItem } from "@/lib/lista-store";
import { linkInstagram, mensagemLista } from "@/lib/reserva-dm";
import type { ItemLista } from "@/lib/lista-store";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

function formatMoney(n: number | null): string {
  if (n === null) return "—";
  return `R$ ${n.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
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
            <h1 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight text-cream md:text-6xl lg:text-7xl">
              Dois frascos,{" "}
              <em className="italic text-amber/90">uma decisão.</em>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-cream/60 md:text-lg">
              Coloca dois perfumes do catálogo lado a lado e compara tudo:
              notas, família, projeção, fixação, preço, inspiração designer.
              Útil quando você está em dúvida entre dois do mesmo perfil.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Seletores + comparação */}
      <section className="bg-ink px-6 py-16 md:px-12 md:py-20">
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
    <Suspense fallback={<div className="pt-40 text-center text-sm italic text-cream/40">Carregando…</div>}>
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
            ? "border-amber/40 bg-ink-soft hover:border-amber"
            : "border-dashed border-cream/20 bg-ink-soft/30 hover:border-amber/60"
        }`}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber bg-amber/10 font-display text-lg italic text-amber">
          {label}
        </span>
        {selecionado ? (
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {hasFoto(selecionado) && (
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm border border-cream/10">
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
              <span className="truncate font-display text-lg font-light text-cream">
                {selecionado.nome}
              </span>
            </div>
          </div>
        ) : (
          <span className="flex-1 text-left text-sm italic text-cream/50">
            Escolher perfume…
          </span>
        )}
        <span className="text-xs text-cream/50">{open ? "▲" : "▼"}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 right-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-sm border border-amber/30 bg-ink shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
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
                    className={`flex w-full items-center gap-3 border-b border-cream/5 px-4 py-3 text-left transition-colors ${
                      jaEhOutro
                        ? "cursor-not-allowed opacity-40"
                        : "hover:bg-ink-soft"
                    }`}
                  >
                    {hasFoto(p) && (
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm border border-cream/10">
                        <Image src={fotoSrc(p)} alt="" fill sizes="40px" className="object-cover" />
                      </div>
                    )}
                    <div className="flex min-w-0 flex-col">
                      <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-amber/70">
                        Nº {String(p.numero).padStart(2, "0")} · {p.marca ?? "—"}
                      </span>
                      <span className="truncate font-display text-base text-cream">
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
      className="mt-16 flex flex-col items-center gap-5 rounded-sm border border-dashed border-cream/15 py-16 text-center"
    >
      <span className="font-display text-4xl italic text-amber/40">A × B</span>
      <p className="max-w-md text-base text-cream/65">
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
  const notasA = new Set(
    [...a.notas.topo, ...a.notas.coracao, ...a.notas.fundo].map((n) =>
      n.toLowerCase()
    )
  );
  const notasB = new Set(
    [...b.notas.topo, ...b.notas.coracao, ...b.notas.fundo].map((n) =>
      n.toLowerCase()
    )
  );
  const comuns = Array.from(notasA).filter((n) => notasB.has(n));

  const diferencaPreco =
    a.precoVenda !== null && b.precoVenda !== null
      ? Math.abs(a.precoVenda - b.precoVenda)
      : null;

  const handleAddBoth = () => {
    addItem(a, "frasco");
    addItem(b, "frasco");
  };

  const handleDmBoth = () => {
    const items: ItemLista[] = [
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
    ];
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

      {/* Linhas comparativas */}
      <div className="overflow-hidden rounded-sm border border-cream/10 bg-ink-soft/40">
        <LinhaCompara label="Marca" valorA={a.marca ?? "—"} valorB={b.marca ?? "—"} />
        <LinhaCompara label="Volume" valorA={a.volume} valorB={b.volume} />
        <LinhaCompara label="Concentração" valorA={a.concentracao} valorB={b.concentracao} />
        <LinhaCompara label="Família" valorA={a.familia ?? "—"} valorB={b.familia ?? "—"} />
        <LinhaCompara label="Projeção" valorA={a.projecao ?? "—"} valorB={b.projecao ?? "—"} />
        <LinhaCompara label="Fixação" valorA={a.fixacao ?? "—"} valorB={b.fixacao ?? "—"} />
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
        />
      </div>

      {/* Notas em comum */}
      {comuns.length > 0 && (
        <div className="rounded-sm border border-amber/25 bg-amber/5 p-6 md:p-8">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            Notas em comum · {comuns.length}
          </span>
          <div className="mt-4 flex flex-wrap gap-2">
            {comuns.map((n) => (
              <span
                key={n}
                className="rounded-full border border-amber/40 bg-ink/50 px-3 py-1 text-xs text-cream"
              >
                {n}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm italic text-cream/55">
            Notas compartilhadas geralmente indicam que os dois perfumes
            convivem bem na mesma pele — bom se você gosta de ter opções pro
            mesmo momento.
          </p>
        </div>
      )}

      {/* Resumo */}
      {diferencaPreco !== null && diferencaPreco > 0 && (
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-cream/40">
            Diferença de preço
          </span>
          <span className="font-display text-4xl font-light text-cream md:text-5xl">
            R$ {diferencaPreco.toLocaleString("pt-BR")}
          </span>
          <span className="text-xs italic text-cream/50">
            entre {a.nome} e {b.nome}
          </span>
        </div>
      )}

      {/* CTA final */}
      <div className="flex flex-col items-center gap-3 border-t border-cream/5 pt-10 md:flex-row md:justify-center md:gap-5">
        <button
          type="button"
          onClick={handleAddBoth}
          className="rounded-full border border-cream/25 px-7 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-cream/85 transition-all hover:border-amber hover:text-amber"
        >
          Adicionar os dois à lista
        </button>
        <button
          type="button"
          onClick={handleDmBoth}
          className="group inline-flex items-center gap-3 rounded-full bg-amber px-7 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
        >
          Reservar os dois via Instagram
          <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </button>
      </div>
    </motion.div>
  );
}

function FotoLado({ perfume, lado }: { perfume: Perfume; lado: string }) {
  return (
    <Link
      href={`/perfume/${perfume.id}`}
      className="group relative block aspect-square overflow-hidden rounded-sm border border-cream/10 bg-ink-soft"
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
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/95 via-ink/60 to-transparent"
      />
      <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-amber bg-amber/20 font-display text-xl italic text-amber backdrop-blur-sm">
        {lado}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6">
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber/90">
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

function LinhaCompara({
  label,
  valorA,
  valorB,
  destaque = false,
}: {
  label: string;
  valorA: string;
  valorB: string;
  destaque?: boolean;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-cream/5 px-5 py-4 last:border-0 md:px-8">
      <span
        className={`text-left text-sm ${
          destaque
            ? "font-display text-xl text-cream md:text-2xl"
            : "text-cream/80"
        }`}
      >
        {valorA}
      </span>
      <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber">
        {label}
      </span>
      <span
        className={`text-right text-sm ${
          destaque
            ? "font-display text-xl text-cream md:text-2xl"
            : "text-cream/80"
        }`}
      >
        {valorB}
      </span>
    </div>
  );
}
