"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { CATALOGO, type Perfume } from "@/data/catalogo";
import { addItemComPreco } from "@/lib/lista-store";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";
import { toast } from "@/lib/toast-store";
import { events } from "@/lib/track";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Dois trios curados com preço fixo, sem narrativa de desconto:
 *  - Estreia    R$ 120 — 3 decants 10ml de perfumes ate R$ 250
 *  - Colecao    R$ 150 — 3 decants 10ml de perfumes acima de R$ 250
 *
 * Cliente pode trocar qualquer slot dentro da faixa do kit (mantem coerencia
 * de preco fixo). Ao adicionar, os 3 vao pra lista de reserva como decant-10
 * com precoSnapshot dividido = preco_kit / 3 arredondado.
 */

type TipoKit = "estreia" | "colecao";

type KitConfig = {
  tipo: TipoKit;
  titulo: string;
  subtitulo: string;
  preco: number;
  pitch: string;
  /** Filtro pra elegibilidade dentro do kit */
  precoMax?: number;
  precoMin?: number;
  defaultIds: [string, string, string];
};

const ESTREIA_MAX = 250;

const KITS: Record<TipoKit, KitConfig> = {
  estreia: {
    tipo: "estreia",
    titulo: "Estreia",
    subtitulo: "Sua entrada na perfumaria árabe",
    preco: 120,
    pitch:
      "Três decants de 10ml pra conhecer três famílias diferentes sem se comprometer com nenhuma. Curadoria pensada pra primeira compra: equilíbrio entre fresco, oriental e gourmand.",
    precoMax: ESTREIA_MAX,
    defaultIds: ["salvo", "asad-preto", "al-noble-safeer"],
  },
  colecao: {
    tipo: "colecao",
    titulo: "Coleção",
    subtitulo: "Pra quem já conhece e quer subir o nível",
    preco: 150,
    pitch:
      "Três decants de 10ml entre os mais densos do catálogo. Coleção de quem já passou pelos clones óbvios e quer entender o que torna um perfume árabe memorável.",
    precoMin: ESTREIA_MAX + 1,
    defaultIds: ["liquid-brun", "his-confession", "hawas-elixir"],
  },
};

function isElegivel(p: Perfume, kit: KitConfig): boolean {
  if (p.precoVenda === null) return false;
  if (kit.precoMax !== undefined && p.precoVenda > kit.precoMax) return false;
  if (kit.precoMin !== undefined && p.precoVenda < kit.precoMin) return false;
  return true;
}

export function KitsTrio() {
  return (
    <section
      id="kits"
      className="section-veil-light relative overflow-hidden border-t border-ink/5 px-6 py-24 md:px-12 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(200,155,60,0.18), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="flex flex-col items-center gap-5 text-center"
        >
          <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="h-px w-8 bg-amber" />
            Trios curados
            <span className="h-px w-8 bg-amber" />
          </span>
          <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
            Três decants,{" "}
            <em className="italic text-amber/90">um preço.</em>
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
            Dois caminhos pra começar: um pra você que tá descobrindo agora,
            outro pra você que já conhece e quer um nível acima. Você pode
            trocar qualquer um dos três pelos seus favoritos.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <KitCard kit={KITS.estreia} />
          <KitCard kit={KITS.colecao} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Card de kit ---------------- */

function KitCard({ kit }: { kit: KitConfig }) {
  const [ids, setIds] = useState<string[]>(kit.defaultIds);
  const [editandoIdx, setEditandoIdx] = useState<number | null>(null);

  const perfumes = useMemo(
    () =>
      ids
        .map((id) => CATALOGO.find((p) => p.id === id))
        .filter((p): p is Perfume => !!p),
    [ids],
  );

  const customizado = ids.some((id, i) => id !== kit.defaultIds[i]);

  const trocar = (idx: number, novoId: string) => {
    setIds((prev) => {
      const next = [...prev];
      next[idx] = novoId;
      return next;
    });
    setEditandoIdx(null);
  };

  const resetar = () => {
    setIds(kit.defaultIds);
    setEditandoIdx(null);
  };

  const handleAdicionar = () => {
    if (perfumes.length === 0) return;
    // Distribui o preço do kit entre os 3 decants. O total bate exato com kit.preco
    // ajustando o último item pra absorver o resto da divisão inteira.
    const base = Math.floor(kit.preco / perfumes.length);
    const resto = kit.preco - base * perfumes.length;
    perfumes.forEach((p, i) => {
      const preco = i === perfumes.length - 1 ? base + resto : base;
      addItemComPreco(p, "decant-10", preco);
    });
    events.kitTrioAdicionado(kit.tipo);
    toast.success(
      `Trio ${kit.titulo} na sua lista`,
      `3 decants 10ml por R$ ${kit.preco}. Fecha pelo WhatsApp ou Instagram no canto da tela.`,
    );
  };

  const isEstreia = kit.tipo === "estreia";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      className={`relative flex flex-col overflow-hidden rounded-sm border bg-cream-soft/60 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-product ${
        isEstreia
          ? "border-ink/15 shadow-editorial"
          : "border-amber/40 shadow-product"
      }`}
    >
      {!isEstreia && (
        <div className="absolute right-5 top-5 z-10 rounded-full bg-amber px-3 py-1 text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-ink">
          Coleção
        </div>
      )}

      {/* Header com nome + preço */}
      <div className="flex flex-col gap-4 px-7 pb-2 pt-8 md:px-9 md:pt-10">
        <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber-dim">
          Trio · {kit.subtitulo}
        </span>
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-5xl font-light leading-[0.95] tracking-tight text-ink md:text-6xl">
            {kit.titulo}
            <span className="text-amber-dim">.</span>
          </h3>
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-ink/65">
              3 decants 10ml
            </span>
            <span className="font-display text-4xl font-light leading-none text-ink md:text-5xl">
              R$ {kit.preco}
            </span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-ink/75 md:text-base">
          {kit.pitch}
        </p>
      </div>

      <div className="my-6 mx-7 h-px bg-ink/10 md:mx-9" />

      {/* 3 slots */}
      <div className="flex flex-col gap-3 px-7 pb-2 md:px-9">
        {ids.map((id, idx) => {
          const p = CATALOGO.find((x) => x.id === id);
          const editando = editandoIdx === idx;
          return (
            <AnimatePresence mode="wait" key={`slot-${kit.tipo}-${idx}`}>
              {editando ? (
                <SeletorPerfume
                  key={`editor-${idx}`}
                  idx={idx}
                  kit={kit}
                  idsJaNoKit={ids}
                  onCancelar={() => setEditandoIdx(null)}
                  onEscolher={(novoId) => trocar(idx, novoId)}
                />
              ) : p ? (
                <SlotPerfume
                  key={`slot-card-${idx}`}
                  idx={idx}
                  perfume={p}
                  onTrocar={() => setEditandoIdx(idx)}
                />
              ) : null}
            </AnimatePresence>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-auto flex flex-col gap-3 px-7 pb-8 pt-8 md:px-9 md:pb-10">
        <button
          type="button"
          onClick={handleAdicionar}
          className={`group flex w-full items-center justify-center gap-3 rounded-full px-7 py-4 text-[11px] font-sans uppercase tracking-[0.3em] transition-all ${
            isEstreia
              ? "border border-ink/25 bg-cream/40 text-ink hover:border-amber hover:bg-amber hover:text-ink"
              : "bg-amber text-ink hover:bg-amber-bright"
          }`}
        >
          Adicionar trio à lista
          <span className="transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </button>
        {customizado && (
          <button
            type="button"
            onClick={resetar}
            className="text-[10px] font-sans uppercase tracking-[0.3em] text-ink/60 underline-offset-4 transition-colors hover:text-amber hover:underline"
          >
            Voltar pra sugestão original
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ---------------- Slot individual de perfume ---------------- */

function SlotPerfume({
  idx,
  perfume,
  onTrocar,
}: {
  idx: number;
  perfume: Perfume;
  onTrocar: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="group relative flex items-center gap-4 rounded-sm border border-ink/10 bg-cream/40 p-3 transition-colors hover:border-amber/40 md:p-4"
    >
      {hasFoto(perfume) && (
        <Link
          href={`/perfume/${perfume.id}`}
          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm border border-ink/10 md:h-24 md:w-24"
        >
          <Image
            src={fotoSrc(perfume)}
            alt={perfume.nome}
            fill
            sizes="96px"
            className="object-cover transition-transform duration-700 hover:scale-110"
          />
        </Link>
      )}
      <Link
        href={`/perfume/${perfume.id}`}
        className="flex min-w-0 flex-1 flex-col gap-1"
      >
        <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-amber-dim">
          0{idx + 1} · {perfume.marca}
        </span>
        <span className="font-display text-base font-light leading-tight text-ink transition-colors hover:text-amber/95 md:text-lg">
          {perfume.nome}
        </span>
        {perfume.cloneDe?.[0] && (
          <span className="text-[11px] italic text-ink/65">
            inspirado em {perfume.cloneDe[0]}
          </span>
        )}
      </Link>
      <button
        type="button"
        onClick={onTrocar}
        className="shrink-0 text-[10px] font-sans uppercase tracking-[0.3em] text-amber/70 underline-offset-4 transition-colors hover:text-amber hover:underline"
        aria-label={`Trocar ${perfume.nome} por outro perfume`}
      >
        Trocar
      </button>
    </motion.div>
  );
}

/* ---------------- Seletor inline (modo edicao) ---------------- */

function SeletorPerfume({
  idx,
  kit,
  idsJaNoKit,
  onCancelar,
  onEscolher,
}: {
  idx: number;
  kit: KitConfig;
  idsJaNoKit: string[];
  onCancelar: () => void;
  onEscolher: (id: string) => void;
}) {
  const [busca, setBusca] = useState("");

  const opcoes = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return CATALOGO.filter((p) => {
      if (!isElegivel(p, kit)) return false;
      const usadoEmOutroSlot = idsJaNoKit.some(
        (id, i) => i !== idx && id === p.id,
      );
      if (usadoEmOutroSlot) return false;
      if (!q) return true;
      return (
        p.nome.toLowerCase().includes(q) ||
        (p.marca?.toLowerCase().includes(q) ?? false) ||
        (p.familia?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [busca, idsJaNoKit, idx, kit]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-sm border border-amber/40 bg-cream/60 p-4"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-amber">
          Trocar slot 0{idx + 1}
        </span>
        <button
          type="button"
          onClick={onCancelar}
          className="text-xs italic text-ink/70 underline-offset-4 hover:text-amber hover:underline"
        >
          cancelar
        </button>
      </div>

      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Procura por nome, marca ou família..."
        autoFocus
        className="mt-3 w-full rounded-sm border border-ink/15 bg-cream/80 px-3 py-2 text-sm text-ink placeholder:text-ink/35 focus:border-amber focus:outline-none"
      />

      <ul className="mt-3 flex max-h-72 flex-col gap-1 overflow-y-auto pr-1">
        {opcoes.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onEscolher(p.id)}
              className="flex w-full items-center gap-3 rounded-sm border border-transparent px-3 py-2 text-left transition-all hover:border-amber/40 hover:bg-cream-soft/80"
            >
              {hasFoto(p) && (
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm border border-ink/10">
                  <Image
                    src={fotoSrc(p)}
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-display text-sm font-light text-ink">
                  {p.nome}
                </span>
                <span className="truncate text-[10px] font-sans uppercase tracking-[0.3em] text-ink/70">
                  {p.marca}
                  {p.familia ? ` · ${p.familia}` : ""}
                </span>
              </div>
              <span className="shrink-0 text-[10px] font-sans uppercase tracking-[0.3em] text-amber/70">
                R$ {p.precoVenda}
              </span>
            </button>
          </li>
        ))}
        {opcoes.length === 0 && (
          <li className="px-3 py-4 text-xs italic text-ink/65">
            Nenhum perfume encontrado nessa faixa.
          </li>
        )}
      </ul>
    </motion.div>
  );
}
