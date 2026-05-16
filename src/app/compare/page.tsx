"use client";

import { Suspense, useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { CATALOGO, type Perfume, type Projecao } from "@/data/catalogo";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";
import { rotaPerfume, getGenero, type GeneroFiltro } from "@/lib/genero";
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
      <CompareHero />

      {/* Seletores + comparação */}
      <section className="section-veil-light px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 flex items-center gap-3 md:mb-10">
            <span className="h-px w-8 bg-amber" />
            <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              Escolha os dois frascos
            </span>
          </div>

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

/* ---------------- Hero ---------------- */

function CompareHero() {
  return (
    <header className="relative overflow-hidden border-b border-ink/5 px-6 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cream/60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 25% 35%, rgba(231,182,89,0.14), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream via-cream/30 to-transparent"
      />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT }}
            className="flex flex-col gap-7"
          >
            <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="h-px w-8 bg-amber" />
              Comparador · 2 a 2
            </span>

            <h1 className="max-w-2xl font-display text-5xl font-light leading-[1.04] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Dois frascos,{" "}
              <em className="italic text-amber/90">uma decisão.</em>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-ink/75 md:text-[17px]">
              Coloca dois perfumes do catálogo lado a lado. Pirâmide olfativa,
              notas em comum, projeção, fixação e preço — pra você decidir
              quando estiver em dúvida entre dois do mesmo perfil.
            </p>

            {/* Trust signals */}
            <ul className="mt-2 flex flex-wrap gap-x-8 gap-y-4 text-ink/75">
              <TrustItem
                label="87 perfumes"
                sub="masculino e feminino"
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M4 7h16M4 12h16M4 17h10" />
                  </svg>
                }
              />
              <TrustItem
                label="Pirâmide"
                sub="topo, coração, fundo"
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="m12 3 9 17H3z" />
                    <path d="M7 13h10M9.5 17h5" />
                  </svg>
                }
              />
              <TrustItem
                label="Quem ganha"
                sub="projeção · fixação · preço"
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M6 4h12v6a6 6 0 0 1-12 0z" />
                    <path d="M9 20h6M12 16v4M5 6H3a3 3 0 0 0 3 4M19 6h2a3 3 0 0 1-3 4" />
                  </svg>
                }
              />
            </ul>
          </motion.div>

          {/* Slot reservado pra imagem */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE_OUT }}
            className="relative hidden lg:block"
            aria-hidden
          >
            <div className="relative aspect-[5/6] w-full overflow-hidden border border-amber/15 bg-cream/40">
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse at 70% 30%, rgba(231,182,89,0.18), transparent 65%), radial-gradient(ellipse at 30% 80%, rgba(231,182,89,0.10), transparent 60%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-xs italic tracking-[0.3em] text-ink/30">
                  imagem em breve
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4 cards de benefício */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT }}
          className="mt-16 grid grid-cols-2 gap-3 md:mt-24 md:grid-cols-4 md:gap-4"
        >
          <BenefitCard
            n="01"
            titulo="Lado a lado"
            descricao="As duas pirâmides na mesma tela, não num PDF que ninguém abre."
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <rect x="3" y="4" width="7" height="16" rx="1" />
                <rect x="14" y="4" width="7" height="16" rx="1" />
              </svg>
            }
          />
          <BenefitCard
            n="02"
            titulo="Notas em comum"
            descricao="O que se repete entre os dois aparece destacado em amber."
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="9" cy="12" r="6" />
                <circle cx="15" cy="12" r="6" />
              </svg>
            }
          />
          <BenefitCard
            n="03"
            titulo="Quem ganha em quê"
            descricao="Projeção, fixação, preço — quem leva cada eixo, sem firula."
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M4 20V10M12 20V4M20 20v-7" />
              </svg>
            }
          />
          <BenefitCard
            n="04"
            titulo="Levar os dois"
            descricao="Decidiu pelos dois? Adiciona à lista e fecha por WhatsApp ou DM."
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M6 6h15l-2 9H8z" />
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="18" cy="20" r="1.4" />
                <path d="M3 4h3" />
              </svg>
            }
          />
        </motion.div>
      </div>
    </header>
  );
}

function TrustItem({
  label,
  sub,
  icon,
}: {
  label: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber/30 text-amber">
        {icon}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-sm text-ink">{label}</span>
        <span className="text-[11px] text-ink/55">{sub}</span>
      </span>
    </li>
  );
}

function BenefitCard({
  n,
  titulo,
  descricao,
  icon,
}: {
  n: string;
  titulo: string;
  descricao: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border border-amber/15 bg-cream/40 p-5 md:p-6">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber/30 text-amber">
          {icon}
        </span>
        <span className="font-display text-xs italic text-amber/70">{n}</span>
      </div>
      <span className="font-display text-lg font-light text-ink md:text-xl">
        {titulo}
      </span>
      <p className="text-[13px] leading-relaxed text-ink/65">{descricao}</p>
    </div>
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
  const [query, setQuery] = useState("");
  const [genero, setGenero] = useState<GeneroFiltro>("todos");
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Fecha ao clicar fora
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Focus no input ao abrir
  useEffect(() => {
    if (open) {
      // pequeno delay pra esperar a animação montar o input
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
    setQuery("");
  }, [open]);

  // Catálogo filtrado: gênero + busca por texto (nome, marca, família, notas)
  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATALOGO.filter((p) => {
      // filtro de gênero
      if (genero !== "todos") {
        const g = getGenero(p);
        if (g !== genero && g !== "unissex") return false;
      }
      if (!q) return true;
      const haystack = [
        p.nome,
        p.marca ?? "",
        p.familia ?? "",
        ...p.notas.topo,
        ...p.notas.coracao,
        ...p.notas.fundo,
        ...(p.cloneDe ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, genero]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`group flex w-full items-center gap-4 border p-4 transition-all md:p-5 ${
          selecionado
            ? "border-amber/40 bg-cream/60 hover:border-amber"
            : "border-dashed border-ink/20 bg-cream-soft/30 hover:border-amber/60 hover:bg-cream/40"
        }`}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber bg-amber/10 font-display text-lg italic text-amber">
          {label}
        </span>
        {selecionado ? (
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {hasFoto(selecionado) && (
              <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-ink/10 bg-ink/5">
                <Image
                  src={fotoSrc(selecionado)}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex min-w-0 flex-col text-left">
              <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-amber/80">
                {selecionado.marca} · {getGenero(selecionado) === "feminino" ? "Feminino" : getGenero(selecionado) === "unissex" ? "Unissex" : "Masculino"}
              </span>
              <span className="truncate font-display text-lg font-light text-ink md:text-xl">
                {selecionado.nome}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex min-w-0 flex-1 flex-col text-left">
            <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-amber/70">
              Slot {label}
            </span>
            <span className="text-sm italic text-ink/70">
              Escolher perfume…
            </span>
          </div>
        )}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className={`shrink-0 text-ink/60 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden border border-amber/30 bg-cream shadow-[0_24px_60px_rgba(0,0,0,0.22)]"
          >
            {/* Busca + filtro de gênero */}
            <div className="border-b border-ink/10 bg-cream-soft/40 p-3 md:p-4">
              <label className="relative block">
                <span className="sr-only">Buscar perfume</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/50"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4.3-4.3" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por nome, marca, família ou nota…"
                  className="w-full border border-ink/15 bg-cream py-2.5 pl-10 pr-3 text-sm text-ink placeholder:italic placeholder:text-ink/50 focus:border-amber focus:outline-none"
                />
              </label>

              <div
                role="tablist"
                aria-label="Filtrar por gênero"
                className="mt-3 flex gap-1.5 rounded-sm bg-cream p-1"
              >
                {[
                  { v: "todos", l: "Todos" },
                  { v: "masculino", l: "Masculino" },
                  { v: "feminino", l: "Feminino" },
                ].map((t) => (
                  <button
                    key={t.v}
                    type="button"
                    role="tab"
                    aria-selected={genero === t.v}
                    onClick={() => setGenero(t.v as GeneroFiltro)}
                    className={`flex-1 px-3 py-1.5 text-[10px] font-sans uppercase tracking-[0.3em] transition-colors ${
                      genero === t.v
                        ? "bg-amber/15 text-amber"
                        : "text-ink/65 hover:text-amber"
                    }`}
                  >
                    {t.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Lista */}
            <div className="max-h-[420px] overflow-y-auto">
              {filtrados.length === 0 ? (
                <div className="px-4 py-10 text-center">
                  <p className="text-sm italic text-ink/60">
                    Nada encontrado pra “{query}”.
                  </p>
                </div>
              ) : (
                <ul>
                  {filtrados.map((p) => {
                    const jaEhOutro = p.id === outroSlug;
                    const g = getGenero(p);
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
                          {hasFoto(p) ? (
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-ink/10 bg-ink/5">
                              <Image src={fotoSrc(p)} alt="" fill sizes="48px" className="object-cover" />
                            </div>
                          ) : (
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink/10 bg-cream-soft/60 font-display text-xs italic text-ink/40">
                              Nº{p.numero}
                            </div>
                          )}
                          <div className="flex min-w-0 flex-1 flex-col">
                            <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-amber/70">
                              {p.marca ?? "—"} · {p.familia ?? "—"}
                            </span>
                            <span className="truncate font-display text-base text-ink">
                              {p.nome}
                            </span>
                          </div>
                          <span
                            className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-sans uppercase tracking-[0.3em] ${
                              g === "feminino"
                                ? "border-rose-300/60 text-rose-400/90"
                                : g === "unissex"
                                  ? "border-ink/25 text-ink/65"
                                  : "border-amber/40 text-amber/85"
                            }`}
                          >
                            {g === "feminino" ? "F" : g === "unissex" ? "U" : "M"}
                          </span>
                          {jaEhOutro && (
                            <span className="shrink-0 text-[9px] italic text-ink/45">
                              já no slot
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer com contagem */}
            <div className="border-t border-ink/10 bg-cream-soft/40 px-4 py-2 text-center">
              <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-ink/55">
                {filtrados.length} {filtrados.length === 1 ? "perfume" : "perfumes"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
      className="mt-16 flex flex-col items-center gap-5 border border-dashed border-ink/15 py-20 text-center"
    >
      <span className="font-display text-5xl italic text-amber/40">
        A <span className="text-amber/30">×</span> B
      </span>
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

  // addedAt é "agora" no momento em que a/b são definidos — capturado uma vez
  // por par via useMemo (Date.now() é impuro mas só roda quando deps mudam).
  const items: ItemLista[] = useMemo(() => {
    const now = Date.now();
    return [
      {
        perfumeId: a.id,
        variante: "frasco",
        precoSnapshot: a.precoVenda ?? 0,
        addedAt: now,
      },
      {
        perfumeId: b.id,
        variante: "frasco",
        precoSnapshot: b.precoVenda ?? 0,
        addedAt: now,
      },
    ];
  }, [a, b]);

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
      href={rotaPerfume(perfume)}
      className="group relative block aspect-square overflow-hidden border border-ink/10 bg-ink"
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
    <div className="overflow-hidden border border-ink/10 bg-cream-soft/40">
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
    <div className="overflow-hidden border border-ink/10 bg-cream-soft/40">
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
