"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CATALOGO, FAMILIAS } from "@/data/catalogo";
import { PerfumeCard } from "@/components/ui/PerfumeCard";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/** Agrupamento de ocasiões em categorias amigáveis */
const OCASIAO_GRUPOS = [
  {
    key: "dia",
    label: "Dia / Trabalho",
    match: ["dia", "trabalho", "casual", "esportivo"],
  },
  {
    key: "noite",
    label: "Noite / Encontro",
    match: ["noite", "encontro", "encontros românticos"],
  },
  {
    key: "eventos",
    label: "Eventos",
    match: [
      "eventos",
      "eventos especiais",
      "eventos formais",
      "ocasiões especiais",
    ],
  },
  {
    key: "inverno",
    label: "Frio",
    match: ["inverno", "outono"],
  },
  {
    key: "verao",
    label: "Calor",
    match: ["verão", "primavera", "praia"],
  },
  {
    key: "versatil",
    label: "Versátil",
    match: ["versátil", "todas as estações", "3 estações"],
  },
] as const;

/** Faixas de preço pré-calibradas pros dados do catálogo */
const PRECO_FAIXAS = [
  { key: "low", label: "até R$140", min: 0, max: 140 },
  { key: "mid", label: "R$140–180", min: 140, max: 180 },
  { key: "high", label: "R$180–220", min: 180, max: 220 },
  { key: "premium", label: "R$220+", min: 220, max: Infinity },
] as const;

type Ordenacao =
  | "relevancia"
  | "preco-asc"
  | "preco-desc"
  | "novos"
  | "destaques";

const ORDENACOES: { key: Ordenacao; label: string }[] = [
  { key: "relevancia", label: "Relevância" },
  { key: "destaques", label: "Destaques" },
  { key: "preco-asc", label: "Preço ↑" },
  { key: "preco-desc", label: "Preço ↓" },
  { key: "novos", label: "Mais recentes" },
];

export function CatalogoGrid({ hideIntro = false }: { hideIntro?: boolean } = {}) {
  const [selFamilias, setSelFamilias] = useState<string[]>([]);
  const [selOcasioes, setSelOcasioes] = useState<string[]>([]);
  const [selPreco, setSelPreco] = useState<string[]>([]);
  const [ordenacao, setOrdenacao] = useState<Ordenacao>("relevancia");

  const toggle = (key: string, list: string[]): string[] =>
    list.includes(key) ? list.filter((k) => k !== key) : [...list, key];

  const limpar = () => {
    setSelFamilias([]);
    setSelOcasioes([]);
    setSelPreco([]);
  };

  const filtered = useMemo(() => {
    const base = CATALOGO.filter((p) => {
      // Família
      if (selFamilias.length > 0) {
        if (!p.familia || !selFamilias.includes(p.familia)) return false;
      }

      // Ocasião (match por grupo)
      if (selOcasioes.length > 0) {
        const gruposAtivos = OCASIAO_GRUPOS.filter((g) =>
          selOcasioes.includes(g.key)
        );
        const match = gruposAtivos.some((g) =>
          p.ocasioes.some((o) =>
            g.match.some((m) => o.toLowerCase().includes(m))
          )
        );
        if (!match) return false;
      }

      // Preço
      if (selPreco.length > 0) {
        if (p.precoVenda === null) return false;
        const faixasAtivas = PRECO_FAIXAS.filter((f) =>
          selPreco.includes(f.key)
        );
        const match = faixasAtivas.some(
          (f) => p.precoVenda! >= f.min && p.precoVenda! < f.max
        );
        if (!match) return false;
      }

      return true;
    });

    // Ordenação
    const sorted = [...base];
    if (ordenacao === "preco-asc") {
      sorted.sort((a, b) => (a.precoVenda ?? 999) - (b.precoVenda ?? 999));
    } else if (ordenacao === "preco-desc") {
      sorted.sort((a, b) => (b.precoVenda ?? 0) - (a.precoVenda ?? 0));
    } else if (ordenacao === "novos") {
      sorted.sort((a, b) => b.numero - a.numero);
    } else if (ordenacao === "destaques") {
      const destaquePrio: Record<string, number> = {
        "mais-pedido": 4,
        curadoria: 3,
        novidade: 2,
        "ultimas-unidades": 1,
      };
      sorted.sort(
        (a, b) =>
          (destaquePrio[b.destaque ?? ""] ?? 0) -
          (destaquePrio[a.destaque ?? ""] ?? 0)
      );
    }
    // "relevancia" = ordem default (por numero)
    return sorted;
  }, [selFamilias, selOcasioes, selPreco, ordenacao]);

  const hasFilters =
    selFamilias.length + selOcasioes.length + selPreco.length > 0;

  return (
    <section
      id="catalogo"
      className="relative border-t border-cream/5 bg-ink px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[1440px]">
        {!hideIntro && (
          <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: EASE_OUT }}
              className="flex max-w-3xl flex-col gap-6"
            >
              <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
                <span className="h-px w-8 bg-amber" />
                Catálogo · Curadoria
              </span>

              <h2 className="font-display text-4xl font-light leading-[1.05] tracking-tight text-cream md:text-6xl lg:text-7xl">
                Cada um com uma{" "}
                <em className="italic text-amber/90">história.</em>
              </h2>

              <p className="mt-2 max-w-2xl text-base leading-relaxed text-cream/60 md:text-lg">
                Perfumes selecionados pra quem está começando e pra quem já
                coleciona. Notas explicadas, comparação direta com clones
                designer, decants disponíveis nos principais.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
              className="hidden flex-col gap-2 text-right md:flex"
            >
              <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-cream/40">
                Coleção atual
              </span>
              <span className="font-display text-3xl text-cream">
                {CATALOGO.length} fragrâncias
              </span>
              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-cream/40">
                {FAMILIAS.length} famílias olfativas
              </span>
            </motion.div>
          </div>
        )}

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 flex flex-col gap-6 border-y border-cream/5 py-8"
        >
          <FilterGroup
            label="Família"
            items={FAMILIAS.map((f) => ({ key: f, label: f }))}
            selected={selFamilias}
            onToggle={(k) => setSelFamilias((prev) => toggle(k, prev))}
          />
          <FilterGroup
            label="Ocasião"
            items={OCASIAO_GRUPOS.map((g) => ({ key: g.key, label: g.label }))}
            selected={selOcasioes}
            onToggle={(k) => setSelOcasioes((prev) => toggle(k, prev))}
          />
          <FilterGroup
            label="Preço"
            items={PRECO_FAIXAS.map((f) => ({ key: f.key, label: f.label }))}
            selected={selPreco}
            onToggle={(k) => setSelPreco((prev) => toggle(k, prev))}
          />

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <span className="text-xs text-cream/60">
              {filtered.length === CATALOGO.length
                ? `Mostrando toda a coleção`
                : `${filtered.length} ${
                    filtered.length === 1 ? "fragrância" : "fragrâncias"
                  } encontrada${filtered.length === 1 ? "" : "s"}`}
            </span>

            <div className="flex items-center gap-4">
              {/* Ordenação */}
              <div className="flex items-center gap-2">
                <span className="hidden text-[10px] font-sans uppercase tracking-[0.35em] text-cream/40 md:inline">
                  Ordenar
                </span>
                <select
                  value={ordenacao}
                  onChange={(e) => setOrdenacao(e.target.value as Ordenacao)}
                  className="rounded-full border border-cream/15 bg-ink-soft px-4 py-1.5 text-xs text-cream/85 transition-colors hover:border-amber/50 focus:border-amber focus:outline-none"
                >
                  {ORDENACOES.map((o) => (
                    <option key={o.key} value={o.key} className="bg-ink">
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {hasFilters && (
                <button
                  onClick={limpar}
                  className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber transition-colors hover:text-amber-bright"
                >
                  Limpar ×
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Grid com animação entre filtros */}
        <div className="mt-12 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                key="grid"
                layout
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filtered.map((perfume, index) => (
                  <motion.div
                    key={perfume.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                  >
                    <PerfumeCard perfume={perfume} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <EmptyState onReset={limpar} />
            )}
          </AnimatePresence>
        </div>

        {/* Rodapé da seção */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-24 flex flex-col items-center gap-4 text-center"
        >
          <span className="h-px w-16 bg-amber/40" />
          <p className="max-w-md text-sm italic text-cream/50">
            O catálogo cresce junto com a curadoria. Novas casas árabes entram
            sob convite dos sócios.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Grupo de filtros ---------------- */

type FilterItem = { key: string; label: string };

function FilterGroup({
  label,
  items,
  selected,
  onToggle,
}: {
  label: string;
  items: FilterItem[];
  selected: string[];
  onToggle: (key: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
      <span className="shrink-0 pt-1.5 text-[10px] font-sans uppercase tracking-[0.4em] text-amber md:w-24">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const active = selected.includes(item.key);
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onToggle(item.key)}
              className={`group relative overflow-hidden rounded-full border px-4 py-1.5 text-xs transition-all duration-300 ${
                active
                  ? "border-amber bg-amber text-ink"
                  : "border-cream/15 text-cream/70 hover:border-amber/50 hover:text-amber"
              }`}
            >
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Estado vazio ---------------- */

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-5 py-20 text-center"
    >
      <span className="font-display text-5xl italic text-amber/40">∅</span>
      <p className="max-w-sm text-base text-cream/60">
        Nenhuma fragrância casa com essa combinação de filtros no momento.
      </p>
      <button
        onClick={onReset}
        className="rounded-full border border-amber/40 px-6 py-2.5 text-[10px] font-sans uppercase tracking-[0.3em] text-amber transition-all hover:border-amber hover:bg-amber/10"
      >
        Ver toda a coleção
      </button>
    </motion.div>
  );
}
