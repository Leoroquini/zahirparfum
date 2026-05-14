"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { CATALOGO } from "@/data/catalogo";
import { filtrarPorGenero } from "@/lib/genero";
import { PerfumeCardLight } from "@/components/ui/PerfumeCardLight";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Lista curada manualmente dos "Favoritos da casa" exibidos na home.
 * 8 SKUs por mundo, na ordem que o Leo definiu em 2026-05-13.
 *
 * Pra trocar os destaques, edita os arrays abaixo (referência pelo
 * campo `numero` do catálogo). NÃO reordena por destaque editorial
 * automático — é curadoria manual.
 */
const FAVORITOS_NUMEROS_ELE = [1, 7, 14, 17, 26, 28, 31, 38];
const FAVORITOS_NUMEROS_ELA = [1, 2, 3, 5, 8, 10, 11, 12];

/**
 * Mix da raiz (LP unissex): 4 masc + 4 fem, curados manualmente (não
 * vem dos primeiros 4 de cada lista acima). Pedido do Leo em 2026-05-14:
 * tirar 14/28/31/38 do masc e usar 1-4 do feminino.
 */
const FAVORITOS_NUMEROS_RAIZ_ELE = [1, 7, 17, 26];
const FAVORITOS_NUMEROS_RAIZ_ELA = [1, 2, 3, 4];

type FiltroChave =
  | "todos"
  | "amadeirado"
  | "oriental"
  | "doce"
  | "assinatura"
  | "mais-vendidos";

const FILTROS: { key: FiltroChave; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "amadeirado", label: "Amadeirado" },
  { key: "oriental", label: "Oriental" },
  { key: "doce", label: "Doce" },
  { key: "assinatura", label: "Assinatura" },
  { key: "mais-vendidos", label: "Mais vendidos" },
];

/**
 * Versão compacta do catálogo pra home, 8 cards em destaque.
 *
 * Prop `mundo`:
 * - "ele" / undefined → favoritos masculinos curados, CTA → /catalogo
 * - "ela" → favoritos femininos curados, CTA → /ela/catalogo
 * - "raiz" → mix de 4 masc + 4 fem (preserva ordem das duas listas)
 */
export function CatalogoHighlight({
  mundo = "ele",
}: {
  mundo?: "ele" | "ela" | "raiz";
} = {}) {
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroChave>("todos");
  const [busca, setBusca] = useState("");

  const destaques = useMemo(() => {
    const buscarPorNumero = (
      numero: number,
      genero: "masculino" | "feminino",
    ) => {
      const pool = filtrarPorGenero(CATALOGO, genero);
      return pool.find((p) => p.numero === numero);
    };

    if (mundo === "raiz") {
      const masc = FAVORITOS_NUMEROS_RAIZ_ELE.map((n) =>
        buscarPorNumero(n, "masculino"),
      ).filter((p): p is NonNullable<typeof p> => p !== undefined);
      const fem = FAVORITOS_NUMEROS_RAIZ_ELA.map((n) =>
        buscarPorNumero(n, "feminino"),
      ).filter((p): p is NonNullable<typeof p> => p !== undefined);
      return [...masc, ...fem];
    }

    const genero = mundo === "ela" ? "feminino" : "masculino";
    const numeros =
      mundo === "ela" ? FAVORITOS_NUMEROS_ELA : FAVORITOS_NUMEROS_ELE;
    return numeros
      .map((n) => buscarPorNumero(n, genero))
      .filter((p): p is NonNullable<typeof p> => p !== undefined);
  }, [mundo]);

  const filtrados = useMemo(() => {
    return destaques.filter((p) => {
      // Filtro de família/destaque
      if (filtroAtivo !== "todos") {
        const familia = (p.familia ?? "").toLowerCase();
        if (filtroAtivo === "amadeirado" && !familia.includes("amadeir"))
          return false;
        if (filtroAtivo === "oriental" && !familia.includes("oriental"))
          return false;
        if (
          filtroAtivo === "doce" &&
          !familia.includes("gourmand") &&
          !familia.includes("baunilha") &&
          !familia.includes("doce")
        )
          return false;
        if (filtroAtivo === "assinatura" && p.destaque !== "curadoria")
          return false;
        if (filtroAtivo === "mais-vendidos" && p.destaque !== "mais-pedido")
          return false;
      }

      // Filtro de busca textual
      if (busca.trim()) {
        const q = busca.trim().toLowerCase();
        const haystack = [
          p.nome,
          p.marca ?? "",
          p.familia ?? "",
          ...(p.cloneDe ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [destaques, filtroAtivo, busca]);

  const catalogoHref = mundo === "ela" ? "/ela/catalogo" : "/catalogo";

  return (
    <section
      id="catalogo"
      className="section-veil-light relative border-t border-ink/5 px-6 py-24 md:px-12 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-[1440px]">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-amber" />
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            Catálogo
          </span>
        </motion.div>

        {/* Header: headline + descrição + cta comparador */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="grid gap-8 md:grid-cols-12 md:items-end"
        >
          <div className="md:col-span-6">
            <h2 className="font-display text-4xl font-light leading-[1.05] tracking-tight text-ink md:text-6xl">
              Alguns dos favoritos{" "}
              <em className="italic text-amber/90">da casa.</em>
            </h2>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm leading-relaxed text-ink/75 md:text-base">
              Uma curadoria Zahir com os perfumes mais desejados. Descubra,
              compare e escolha com confiança.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-sans uppercase tracking-[0.3em] text-ink/70">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-amber" />
                100% originais
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-amber" />
                Envio cuidadoso
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-amber" />
                Atendimento humano
              </span>
            </div>
          </div>

          {/* Bloco comparador */}
          <div className="md:col-span-3">
            <div className="rounded-md border border-amber/30 bg-cream-soft/80 p-5">
              <p className="text-xs leading-snug text-ink/75">
                Compare até 4 fragrâncias lado a lado e encontre a sua
                assinatura.
              </p>
              <Link
                href="/compare"
                className="mt-4 inline-flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-amber transition-colors hover:text-amber-bright"
              >
                Comparar agora
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Busca + chips de filtro */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
          className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center"
        >
          {/* Busca */}
          <div className="relative w-full lg:max-w-sm">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar fragrâncias, inspirações ou notas…"
              className="w-full rounded-full border border-ink/15 bg-cream-soft py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink/45 transition-colors focus:border-amber focus:outline-none"
            />
          </div>

          {/* Chips */}
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {FILTROS.map((f) => {
              const active = filtroAtivo === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFiltroAtivo(f.key)}
                  className={`rounded-full border px-4 py-2 text-[10px] font-sans uppercase tracking-[0.3em] transition-all ${
                    active
                      ? "border-amber bg-amber text-ink"
                      : "border-ink/15 text-ink/70 hover:border-amber/50 hover:text-amber"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
            <button
              type="button"
              className="ml-auto inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-[10px] font-sans uppercase tracking-[0.3em] text-ink/70 transition-all hover:border-amber/50 hover:text-amber"
              onClick={() => {
                // atalho pra /catalogo onde estão os filtros completos
                window.location.href = catalogoHref;
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="7" y1="12" x2="17" y2="12" />
                <line x1="10" y1="18" x2="14" y2="18" />
              </svg>
              Filtros
            </button>
          </div>
        </motion.div>

        {/* Grid: 4 cards claros */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtrados.length > 0 ? (
            filtrados.map((perfume, index) => (
              <PerfumeCardLight
                key={perfume.id}
                perfume={perfume}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center gap-4 py-16 text-center">
              <span className="font-display text-5xl italic text-amber/40">
                ∅
              </span>
              <p className="max-w-sm text-sm text-ink/70">
                Nenhum favorito encontrado nessa combinação. Limpe a busca ou
                tente outro filtro.
              </p>
              <button
                onClick={() => {
                  setFiltroAtivo("todos");
                  setBusca("");
                }}
                className="rounded-full border border-amber/40 px-5 py-2 text-[10px] font-sans uppercase tracking-[0.3em] text-amber transition-all hover:bg-amber/10"
              >
                Limpar
              </button>
            </div>
          )}
        </div>

        {/* CTA pro catálogo completo */}
        <div className="mt-12 flex justify-center">
          <Link
            href={catalogoHref}
            className="group inline-flex items-center gap-3 rounded-full border border-amber px-7 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-amber transition-all hover:bg-amber hover:text-ink"
          >
            Ver catálogo completo
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Faixa Compromissos Zahir */}
        <CompromissosZahir />

        {/* Bloco "Como escolher o seu perfume" */}
        <ComoEscolher />
      </div>
    </section>
  );
}

/* ---------------- Compromissos Zahir (4 ícones) ---------------- */

function CompromissosZahir() {
  const items = [
    {
      titulo: "Decants 100% originais",
      sub: "Diretamente das melhores casas.",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M9 2h6" />
          <path d="M10 2v4" />
          <path d="M14 2v4" />
          <path d="M8 6h8l1 4v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V10z" />
        </svg>
      ),
    },
    {
      titulo: "Frascos de vidro âmbar",
      sub: "Protegem o perfume da luz.",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M10 2h4v3h-4z" />
          <path d="M7 5h10v15a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
          <path d="M9 12h6" />
        </svg>
      ),
    },
    {
      titulo: "Envio cuidadoso e seguro",
      sub: "Embalagem premium e discreta.",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M1 8h14v9H1z" />
          <path d="M15 11h5l3 3v3h-8" />
          <circle cx="5" cy="20" r="2" />
          <circle cx="18" cy="20" r="2" />
        </svg>
      ),
    },
    {
      titulo: "Atendimento que orienta",
      sub: "Dúvidas? Fale com a nossa equipe.",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M5 21a7 7 0 0 1 14 0" />
        </svg>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      className="mt-20 grid grid-cols-1 gap-6 rounded-md border border-ink/8 bg-cream-soft/70 px-6 py-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:px-8"
    >
      {items.map((item) => (
        <div key={item.titulo} className="flex items-start gap-3">
          <span className="mt-0.5 text-amber">{item.icon}</span>
          <div className="flex flex-col">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-ink">
              {item.titulo}
            </span>
            <span className="mt-1 text-xs leading-snug text-ink/65">
              {item.sub}
            </span>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* ---------------- Bloco "Como escolher" (3 passos) ---------------- */

function ComoEscolher() {
  const passos = [
    {
      n: "1",
      titulo: "Explore",
      sub: "Descubra fragrâncias pela família olfativa ou inspiração.",
    },
    {
      n: "2",
      titulo: "Compare",
      sub: "Compare até 4 fragrâncias lado a lado e encontre o seu perfil.",
    },
    {
      n: "3",
      titulo: "Escolha com confiança",
      sub: "Peça seu decant, receba com cuidado e viva a experiência Zahir.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      className="mt-10 grid items-center gap-8 rounded-md border border-ink/8 bg-cream/60 px-6 py-8 lg:grid-cols-[1fr_2fr_auto] lg:gap-10 lg:px-10 lg:py-10"
    >
      <div>
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
          Como escolher
        </span>
        <h3 className="mt-3 font-display text-2xl font-light leading-[1.15] text-ink md:text-3xl">
          o seu perfume.
        </h3>
      </div>

      <ol className="grid gap-6 sm:grid-cols-3 lg:gap-4">
        {passos.map((p) => (
          <li key={p.n} className="flex flex-col gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-amber/50 text-[11px] font-sans font-bold text-amber">
              {p.n}
            </span>
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-ink">
              {p.titulo}
            </span>
            <span className="text-xs leading-snug text-ink/65">{p.sub}</span>
          </li>
        ))}
      </ol>

      <div className="hidden lg:block">
        <KitIllustration />
      </div>
    </motion.div>
  );
}

function KitIllustration() {
  // Mini ilustração SVG de uma caixa de decant — neutra, fica boa mesmo sem foto
  return (
    <div className="flex h-24 w-32 items-center justify-center rounded-md border border-amber/30 bg-cream">
      <svg
        width="72"
        height="56"
        viewBox="0 0 72 56"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-amber/80"
        aria-hidden
      >
        <path d="M6 18h60v32H6z" />
        <path d="M6 18l8-12h44l8 12" />
        <path d="M36 6v44" />
        <circle cx="20" cy="34" r="2.5" />
        <circle cx="36" cy="34" r="2.5" />
        <circle cx="52" cy="34" r="2.5" />
      </svg>
    </div>
  );
}
