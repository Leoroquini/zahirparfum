"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { CATALOGO, type Perfume } from "@/data/catalogo";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";
import { precoDa, type VarianteReserva } from "@/lib/lista-store";
import {
  mensagemKitMontador,
  linkInstagram,
  linkWhatsApp,
} from "@/lib/reserva-dm";
import {
  detectarKit,
  fmtPrecoCent,
  type TamanhoDecant,
} from "@/lib/promo";
import { events } from "@/lib/track";
import { toast } from "@/lib/toast-store";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

type Tamanho = TamanhoDecant;

const VARIANTE_POR_TAMANHO: Record<Tamanho, VarianteReserva> = {
  "5ml": "decant-5",
  "10ml": "decant-10",
};

type ItemLocal = {
  perfumeId: string;
  tamanho: Tamanho;
  preco: number;
};

/**
 * Montador livre de kit de decants.
 *
 * - Estado local (não polui a lista global ate o cliente fechar)
 * - Cliente pode adicionar mesmo perfume em 5ml E 10ml separadamente
 * - Soma em tempo real
 * - Ao fechar, envia direto pelo WhatsApp/Instagram com todos os itens
 *
 * Decisao consciente: nao usa o lista-store global porque o cliente pode
 * estar montando varios cenarios e nao quer poluir a lista de reserva. Se
 * decidir, fecha aqui mesmo via DM/WA.
 */
export function MontadorKit() {
  const searchParams = useSearchParams();
  const tamanhoInicial: Tamanho =
    searchParams.get("tamanho") === "5ml" ? "5ml" : "10ml";
  const [itens, setItens] = useState<ItemLocal[]>([]);
  const [busca, setBusca] = useState("");
  const [marcaFiltro, setMarcaFiltro] = useState<string | null>(null);
  const [apenasSelecionados, setApenasSelecionados] = useState(false);
  const [tamanhoPadrao, setTamanhoPadrao] = useState<Tamanho>(tamanhoInicial);

  // Mantem tamanho da URL caso usuario navegue por links de kit
  useEffect(() => {
    const t = searchParams.get("tamanho");
    if (t === "5ml" || t === "10ml") setTamanhoPadrao(t);
  }, [searchParams]);

  const adicionar = (perfume: Perfume, tamanho: Tamanho) => {
    if (perfume.precoVenda === null) return;
    const variante = VARIANTE_POR_TAMANHO[tamanho];
    const preco = precoDa(perfume, variante);
    setItens((prev) => {
      const exists = prev.some(
        (i) => i.perfumeId === perfume.id && i.tamanho === tamanho,
      );
      if (exists) return prev;
      return [...prev, { perfumeId: perfume.id, tamanho, preco }];
    });
  };

  const remover = (perfumeId: string, tamanho: Tamanho) => {
    setItens((prev) =>
      prev.filter((i) => !(i.perfumeId === perfumeId && i.tamanho === tamanho)),
    );
  };

  const totalSomado = itens.reduce((sum, i) => sum + i.preco, 0);
  const totalUnidades = itens.length;

  // Detecta se o kit virou promo automatica
  const itensComPerfume = useMemo(
    () =>
      itens
        .map((i) => {
          const perfume = CATALOGO.find((p) => p.id === i.perfumeId);
          return perfume ? { perfume, tamanho: i.tamanho, preco: i.preco } : null;
        })
        .filter((x): x is { perfume: Perfume; tamanho: Tamanho; preco: number } => !!x),
    [itens],
  );

  const kitDetectado = useMemo(
    () =>
      detectarKit(
        itensComPerfume.map((i) => ({ perfume: i.perfume, tamanho: i.tamanho })),
      ),
    [itensComPerfume],
  );

  // Preço final: kit-promo > kit-completo (preço cheio do kit) > soma avulsa
  const totalFinalCent =
    kitDetectado.tipo === "kit-promo"
      ? kitDetectado.kit.precoPromo
      : kitDetectado.tipo === "kit-completo"
      ? kitDetectado.kit.precoCheio
      : totalSomado * 100;

  // Catálogo filtrado
  const catalogoFiltrado = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return CATALOGO.filter((p) => {
      if (p.precoVenda === null) return false;
      if (apenasSelecionados && !p.selecionadoSemana) return false;
      if (marcaFiltro && p.marca !== marcaFiltro) return false;
      if (!q) return true;
      return (
        p.nome.toLowerCase().includes(q) ||
        (p.marca?.toLowerCase().includes(q) ?? false) ||
        (p.familia?.toLowerCase().includes(q) ?? false) ||
        (p.cloneDe?.some((c) => c.toLowerCase().includes(q)) ?? false)
      );
    });
  }, [busca, marcaFiltro, apenasSelecionados]);

  const marcasDisponiveis = useMemo(() => {
    const set = new Set<string>();
    CATALOGO.forEach((p) => p.marca && set.add(p.marca));
    return Array.from(set).sort();
  }, []);

  const handleEnviarWa = () => {
    const url = linkWhatsApp(mensagemKitMontador(itensComPerfume));
    if (!url) return;
    events.enviouListaWa(itens.length, totalFinalCent / 100);
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success(
      kitDetectado.tipo === "kit-promo"
        ? `${kitDetectado.kit.titulo} promocional enviado!`
        : "Conversa aberta no WhatsApp",
      "Confere a lista, envia e a gente responde em minutos.",
    );
  };

  const handleEnviarIg = () => {
    events.enviouListaDm(itens.length, totalFinalCent / 100);
    const url = linkInstagram(mensagemKitMontador(itensComPerfume));
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success(
      "Mensagem aberta no Instagram",
      "Confere a lista no DM e envia.",
    );
  };

  return (
    <section className="section-veil-light relative px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1fr_400px] lg:gap-12">
        {/* Coluna esquerda — catálogo */}
        <div className="flex flex-col gap-6">
          {/* Filtros + busca */}
          <div className="flex flex-col gap-4 border-b border-ink/10 pb-6">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Procura por nome, marca, família ou clone..."
                className="flex-1 rounded-sm border border-ink/15 bg-cream/60 px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-amber focus:outline-none"
              />
              <div className="flex shrink-0 items-center gap-1 rounded-full border border-ink/15 bg-cream/60 p-1">
                {(["5ml", "10ml"] as Tamanho[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTamanhoPadrao(t)}
                    className={`rounded-full px-4 py-1.5 text-[10px] font-sans uppercase tracking-[0.3em] transition-colors ${
                      tamanhoPadrao === t
                        ? "bg-amber text-ink"
                        : "text-ink/60 hover:text-ink"
                    }`}
                    aria-pressed={tamanhoPadrao === t}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setApenasSelecionados((v) => !v)}
                aria-pressed={apenasSelecionados}
                className={`flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-sans uppercase tracking-[0.3em] transition-colors ${
                  apenasSelecionados
                    ? "border-amber bg-amber text-ink"
                    : "border-amber/40 text-amber hover:border-amber hover:bg-amber/10"
                }`}
              >
                <span className="text-[11px]">★</span>
                Apenas Seleção
              </button>
              <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber-dim">
                · Marca
              </span>
              <button
                type="button"
                onClick={() => setMarcaFiltro(null)}
                className={`rounded-full border px-3 py-1 text-[10px] font-sans uppercase tracking-[0.3em] transition-colors ${
                  marcaFiltro === null
                    ? "border-ink/40 bg-ink/85 text-cream"
                    : "border-ink/15 text-ink/70 hover:border-amber/50 hover:text-amber"
                }`}
              >
                Todas
              </button>
              {marcasDisponiveis.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMarcaFiltro(m === marcaFiltro ? null : m)}
                  className={`rounded-full border px-3 py-1 text-[10px] font-sans uppercase tracking-[0.3em] transition-colors ${
                    marcaFiltro === m
                      ? "border-amber bg-amber text-ink"
                      : "border-ink/15 text-ink/70 hover:border-amber/50 hover:text-amber"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <p className="text-xs italic text-ink/65">
              Toca em qualquer perfume pra adicionar em <strong>{tamanhoPadrao}</strong>.
              Pode trocar pro outro tamanho a qualquer momento.
            </p>
          </div>

          {/* Grid de perfumes */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {catalogoFiltrado.map((p) => {
              const variante = VARIANTE_POR_TAMANHO[tamanhoPadrao];
              const preco = precoDa(p, variante);
              const jaAdicionado = itens.some(
                (i) => i.perfumeId === p.id && i.tamanho === tamanhoPadrao,
              );
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => adicionar(p, tamanhoPadrao)}
                  disabled={jaAdicionado}
                  className={`group relative flex aspect-square flex-col overflow-hidden rounded-sm border bg-ink text-left transition-all ${
                    jaAdicionado
                      ? "cursor-default border-amber/60 opacity-75"
                      : "border-ink/20 hover:-translate-y-1 hover:border-amber/60 hover:shadow-product"
                  }`}
                  aria-label={`Adicionar ${p.nome} em ${tamanhoPadrao}`}
                >
                  {hasFoto(p) ? (
                    <Image
                      src={fotoSrc(p)}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg, #1a0a0e 0%, #3d1a22 50%, #8c6b26 100%)",
                      }}
                    />
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ink/95 via-ink/60 to-transparent"
                  />
                  {/* Badge Seleção da Semana (canto sup. esquerdo) */}
                  {p.selecionadoSemana && (
                    <span className="absolute left-2 top-2 z-10 rounded-full border border-amber bg-amber/85 px-2 py-0.5 text-[8px] font-sans font-bold uppercase tracking-[0.2em] text-ink shadow-[0_4px_10px_-2px_rgba(140,107,38,0.6)]">
                      ★ Seleção
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1 p-3">
                    <span className="text-[8px] font-sans uppercase tracking-[0.35em] text-amber/80">
                      {p.marca}
                    </span>
                    <span className="font-display text-sm font-light leading-tight text-cream md:text-base">
                      {p.nome}
                    </span>
                    <div className="mt-1 flex items-baseline justify-between gap-2">
                      <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-cream/55">
                        {tamanhoPadrao}
                      </span>
                      <span className="font-display text-base text-cream md:text-lg">
                        R$ {preco}
                      </span>
                    </div>
                  </div>
                  {/* Estado adicionado */}
                  {jaAdicionado && (
                    <div className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-amber text-[11px] text-ink">
                      ✓
                    </div>
                  )}
                  {!jaAdicionado && (
                    <div className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-cream/30 bg-ink/60 text-[14px] font-light text-cream/85 backdrop-blur-sm transition-all group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
                      +
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {catalogoFiltrado.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <span className="font-display text-5xl italic text-amber/40">∅</span>
              <p className="text-sm italic text-ink/70">
                Nenhum perfume bate com esses filtros.
              </p>
              <button
                type="button"
                onClick={() => {
                  setBusca("");
                  setMarcaFiltro(null);
                }}
                className="rounded-full border border-amber/40 px-5 py-2 text-[10px] font-sans uppercase tracking-[0.3em] text-amber hover:border-amber hover:bg-amber/10"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>

        {/* Coluna direita — kit em montagem */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="flex flex-col rounded-sm border border-ink/15 bg-cream-soft/70 backdrop-blur-sm shadow-editorial">
            <header className="flex items-center justify-between gap-3 border-b border-ink/10 px-5 py-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
                  Seu kit
                </span>
                <span className="font-display text-xl font-light text-ink">
                  {totalUnidades === 0
                    ? "Vazio"
                    : totalUnidades === 1
                    ? "1 decant"
                    : `${totalUnidades} decants`}
                </span>
              </div>
              {totalUnidades > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Limpar tudo?")) setItens([]);
                  }}
                  className="text-[10px] font-sans uppercase tracking-[0.3em] text-ink/65 hover:text-wine"
                >
                  Limpar
                </button>
              )}
            </header>

            <div className="max-h-[55vh] overflow-y-auto">
              {totalUnidades === 0 ? (
                <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
                  <span className="font-display text-4xl italic text-amber/40">
                    ∅
                  </span>
                  <p className="text-xs italic leading-relaxed text-ink/65">
                    Toca nos perfumes ao lado pra adicionar.
                    <br />
                    Sem mínimo, sem desconto, sem regra.
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col">
                  <AnimatePresence initial={false}>
                    {itens.map((i) => {
                      const p = CATALOGO.find((x) => x.id === i.perfumeId);
                      if (!p) return null;
                      return (
                        <motion.li
                          key={`${i.perfumeId}-${i.tamanho}`}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: EASE_OUT }}
                          className="border-b border-ink/5 last:border-b-0"
                        >
                          <div className="flex items-start gap-3 px-5 py-3">
                            {hasFoto(p) && (
                              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm border border-ink/10">
                                <Image
                                  src={fotoSrc(p)}
                                  alt=""
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                              <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-amber/80">
                                {p.marca} · {i.tamanho}
                              </span>
                              <span className="truncate font-display text-sm font-light text-ink">
                                {p.nome}
                              </span>
                            </div>
                            <div className="flex shrink-0 flex-col items-end gap-1">
                              <span className="font-display text-base text-ink">
                                R$ {i.preco}
                              </span>
                              <button
                                type="button"
                                onClick={() => remover(i.perfumeId, i.tamanho)}
                                className="text-[9px] font-sans uppercase tracking-[0.25em] text-ink/55 hover:text-wine"
                                aria-label={`Remover ${p.nome} ${i.tamanho}`}
                              >
                                Remover
                              </button>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Painel de status do Kit (promo automática) */}
            {totalUnidades > 0 && (
              <KitStatusPanel
                detect={kitDetectado}
                itens={itensComPerfume}
                totalUnidades={totalUnidades}
                tamanhoPadrao={tamanhoPadrao}
              />
            )}

            <footer className="border-t border-ink/10 bg-cream/50 px-5 py-5">
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="mt-3 text-[10px] font-sans uppercase tracking-[0.35em] text-ink/65">
                  Total
                </span>
                <TotalDisplay detect={kitDetectado} totalSomado={totalSomado} />
              </div>
              <p className="mb-4 text-[11px] italic leading-relaxed text-ink/60">
                Frete grátis SP capital acima de R$ 99. Demais regiões confirmamos no atendimento.
              </p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleEnviarWa}
                  disabled={totalUnidades === 0}
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-amber px-6 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Fechar pelo WhatsApp
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleEnviarIg}
                  disabled={totalUnidades === 0}
                  className="group flex w-full items-center justify-center gap-3 rounded-full border border-ink/25 bg-cream/40 px-6 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-ink/85 transition-all hover:border-amber hover:text-amber disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Fechar pelo Instagram
                  <span className="opacity-60 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </button>
              </div>
            </footer>
          </div>

          <div className="mt-4 px-2 text-center">
            <Link
              href="/decants"
              className="text-[10px] font-sans uppercase tracking-[0.3em] text-ink/60 hover:text-amber"
            >
              ← voltar para os kits
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ---------------- Painel de status do Kit ---------------- */

type KitStatusProps = {
  detect: ReturnType<typeof detectarKit>;
  itens: { perfume: Perfume; tamanho: Tamanho; preco: number }[];
  totalUnidades: number;
  tamanhoPadrao: Tamanho;
};

function KitStatusPanel({ detect, itens }: KitStatusProps) {
  // kit-promo (3 da Selecao, mesmo tamanho)
  if (detect.tipo === "kit-promo") {
    return (
      <div className="border-t border-amber/30 bg-gradient-to-r from-amber/15 via-amber/25 to-amber/15 px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-lg text-amber">★</span>
          <div className="flex-1">
            <p className="font-display text-base leading-tight text-ink">
              <strong>{detect.kit.titulo} promocional</strong>
            </p>
            <p className="text-[11px] leading-relaxed text-ink/75">
              3 perfumes da Seleção da Semana · economia total de{" "}
              <strong className="text-wine">{fmtPrecoCent(detect.economiaTotalCent)}</strong>{" "}
              sobre decants avulsos
            </p>
          </div>
        </div>
      </div>
    );
  }

  // kit-completo (3 do mesmo tamanho, mas nem todos da Selecao)
  if (detect.tipo === "kit-completo") {
    const fora = detect.foraDaSelecao;
    const foraDaSelecaoQtd = fora.length;
    const economia = fmtPrecoCent(detect.economiaProximoNivelCent);
    return (
      <div className="border-t border-wine/30 bg-wine/10 px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-lg text-wine">!</span>
          <div className="flex-1">
            <p className="font-display text-base leading-tight text-ink">
              <strong>{detect.kit.titulo}</strong> fechado
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink/80">
              {foraDaSelecaoQtd === 1 ? (
                <>
                  Troque{" "}
                  <strong className="text-wine">{fora[0].perfume.nome}</strong> por
                  outro da Seleção e ganhe <strong>{economia}</strong> de desconto.
                </>
              ) : (
                <>
                  Troque os {foraDaSelecaoQtd} perfumes fora da Seleção por modelos
                  selecionados e ganhe <strong>{economia}</strong> de desconto.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // parcial (1 ou 2 itens)
  if (detect.tipo === "parcial") {
    const { kitProjetado, faltam, jaSelecionados } = detect;
    const economia = fmtPrecoCent(kitProjetado.precoCheio - kitProjetado.precoPromo);
    const faltamSelecao = 3 - jaSelecionados; // quantos da Selecao precisaria adicionar pra promo
    return (
      <div className="border-t border-amber/25 bg-amber/10 px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-lg text-amber">→</span>
          <div className="flex-1 space-y-1.5">
            <p className="text-[11px] leading-relaxed text-ink">
              Falta{faltam === 1 ? "" : "m"}{" "}
              <strong>
                {faltam} decant{faltam === 1 ? "" : "s"}
              </strong>{" "}
              {faltam === 1 ? "" : "iguais "}pra fechar o{" "}
              <strong className="text-ink">{kitProjetado.titulo}</strong> por{" "}
              <strong>{fmtPrecoCent(kitProjetado.precoCheio)}</strong>.
            </p>
            <p className="text-[11px] leading-relaxed text-ink/75">
              {jaSelecionados === 3 ? (
                <>Os 3 atuais já são da Seleção — basta adicionar.</>
              ) : (
                <>
                  Se {faltamSelecao === 1 ? "o próximo" : `os ${faltamSelecao} restantes`}{" "}
                  for{faltamSelecao === 1 ? "" : "em"} da{" "}
                  <em className="italic text-amber">Seleção da Semana</em>, sai por{" "}
                  <strong className="text-amber">{fmtPrecoCent(kitProjetado.precoPromo)}</strong>{" "}
                  (economia de {economia}).
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // sem-kit (>3 itens ou tamanhos misturados)
  if (detect.tipo === "sem-kit") {
    return (
      <div className="border-t border-ink/10 bg-cream/40 px-5 py-3.5">
        <p className="text-[11px] leading-relaxed text-ink/70">
          Pra virar Kit Estreia (5ml) ou Kit Coleção (10ml), deixe exatamente 3 decants
          do mesmo tamanho. Os 3 sendo da Seleção, aplica o preço promocional.
        </p>
      </div>
    );
  }

  return null; // vazio: nao renderiza nada (lista vazia ja tem mensagem propria)
}

/* ---------------- Display de Total (3 niveis quando aplicavel) ---------------- */

function TotalDisplay({
  detect,
  totalSomado,
}: {
  detect: ReturnType<typeof detectarKit>;
  totalSomado: number;
}) {
  // 3/3 da Selecao: soma riscada + kit cheio riscado + kit promo destacado
  if (detect.tipo === "kit-promo") {
    return (
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-[11px] text-ink/50 line-through tabular-nums">
          {fmtPrecoCent(detect.somaIndividualCent)}
        </span>
        <span className="text-xs text-ink/55 line-through tabular-nums">
          {fmtPrecoCent(detect.kit.precoCheio)}
        </span>
        <span className="font-display text-3xl font-light text-amber tabular-nums">
          {fmtPrecoCent(detect.kit.precoPromo)}
        </span>
      </div>
    );
  }

  // 3 do mesmo tamanho sem 3 da Selecao: soma riscada + kit cheio destacado
  if (detect.tipo === "kit-completo") {
    return (
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-[11px] text-ink/50 line-through tabular-nums">
          {fmtPrecoCent(detect.somaIndividualCent)}
        </span>
        <span className="font-display text-3xl font-light text-ink tabular-nums">
          {fmtPrecoCent(detect.kit.precoCheio)}
        </span>
      </div>
    );
  }

  // parcial / sem-kit / vazio: mostra soma simples
  return (
    <span className="font-display text-3xl font-light text-ink tabular-nums">
      R$ {totalSomado}
    </span>
  );
}
