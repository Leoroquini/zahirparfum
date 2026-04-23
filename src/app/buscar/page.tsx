"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { CATALOGO, type Perfume } from "@/data/catalogo";
import { PerfumeCard } from "@/components/ui/PerfumeCard";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

function matchPerfume(p: Perfume, q: string): number {
  // Score system — retorna peso de relevância
  const needle = q.toLowerCase().trim();
  if (!needle) return 0;

  let score = 0;
  const nome = p.nome.toLowerCase();
  if (nome.includes(needle)) score += 10;
  if (nome.startsWith(needle)) score += 5;
  if (p.marca?.toLowerCase().includes(needle)) score += 6;
  if (p.familia?.toLowerCase().includes(needle)) score += 4;
  if (p.cloneDe?.some((c) => c.toLowerCase().includes(needle))) score += 5;
  if (p.ocasioes.some((o) => o.toLowerCase().includes(needle))) score += 2;

  const notasAll = [
    ...p.notas.topo,
    ...p.notas.coracao,
    ...p.notas.fundo,
  ].map((n) => n.toLowerCase());
  if (notasAll.some((n) => n.includes(needle))) score += 3;

  return score;
}

function BuscarContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const qInicial = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(qInicial);

  // Debounce leve — atualiza URL sem recarregar
  useEffect(() => {
    const t = setTimeout(() => {
      const url = query
        ? `/buscar?q=${encodeURIComponent(query)}`
        : "/buscar";
      router.replace(url, { scroll: false });
    }, 250);
    return () => clearTimeout(t);
  }, [query, router]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return CATALOGO.map((p) => ({ perfume: p, score: matchPerfume(p, query) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [query]);

  return (
    <article className="relative">
      {/* Header com input */}
      <header className="border-b border-cream/5 px-6 pb-10 pt-32 md:px-12 md:pb-14 md:pt-40">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.35em] text-cream/50 transition-colors hover:text-amber"
          >
            ← Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="mt-8 flex flex-col gap-6"
          >
            <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="h-px w-8 bg-amber" />
              Buscar
            </span>
            <h1 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight text-cream md:text-6xl">
              O que você está{" "}
              <em className="italic text-amber/90">procurando?</em>
            </h1>

            <div className="relative mt-4 max-w-2xl">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: aventus, oud, cítrico, Lattafa…"
                autoFocus
                className="w-full rounded-full border border-cream/20 bg-ink-soft py-4 pl-6 pr-14 font-display text-xl font-light text-cream placeholder:text-cream/30 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber/30"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-cream/50 transition-colors hover:text-amber"
                  aria-label="Limpar busca"
                >
                  ×
                </button>
              )}
            </div>

            <p className="text-xs italic text-cream/50">
              Busca por nome, marca, família olfativa, clone designer, nota ou
              ocasião.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Resultados */}
      <section className="bg-ink px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          {!query.trim() ? (
            <SugestoesBusca onClick={setQuery} />
          ) : results.length === 0 ? (
            <EmptyResults query={query} />
          ) : (
            <>
              <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-cream/50">
                {results.length}{" "}
                {results.length === 1 ? "resultado" : "resultados"} para{" "}
                <em className="italic text-amber">&ldquo;{query}&rdquo;</em>
              </span>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map(({ perfume }, i) => (
                  <PerfumeCard key={perfume.id} perfume={perfume} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </article>
  );
}

export default function BuscarPage() {
  return (
    <Suspense fallback={<BuscaLoadingFallback />}>
      <BuscarContent />
    </Suspense>
  );
}

function BuscaLoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-cream/40">
        Carregando busca…
      </span>
    </div>
  );
}

function SugestoesBusca({ onClick }: { onClick: (q: string) => void }) {
  const sugestoes = [
    "aventus",
    "oud",
    "cítrico",
    "Lattafa",
    "Armaf",
    "baunilha",
    "gourmand",
    "fresco",
    "Sauvage",
  ];
  return (
    <div className="flex flex-col gap-6">
      <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
        Buscas populares
      </span>
      <div className="flex flex-wrap gap-2">
        {sugestoes.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onClick(s)}
            className="rounded-full border border-cream/15 px-4 py-1.5 text-xs text-cream/75 transition-all hover:border-amber hover:bg-amber hover:text-ink"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function EmptyResults({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center gap-5 py-10 text-center">
      <span className="font-display text-5xl italic text-amber/40">∅</span>
      <div className="flex max-w-md flex-col gap-2">
        <p className="font-display text-xl font-light text-cream">
          Nada encontrado pra{" "}
          <em className="italic text-amber/80">&ldquo;{query}&rdquo;</em>.
        </p>
        <p className="text-sm leading-relaxed text-cream/55">
          Tenta uma nota (oud, baunilha), um designer (Sauvage, Aventus), ou
          uma família (gourmand, fresco, amadeirado).
        </p>
      </div>
    </div>
  );
}
