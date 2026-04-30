"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CATALOGO } from "@/data/catalogo";
import {
  addRegistro,
  OCASIOES,
  SENTIMENTOS,
  type Ocasiao,
  type Sentimento,
} from "@/lib/diario-store";
import { toast } from "@/lib/toast-store";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Formulário de novo registro do diário olfativo.
 * Expande/colapsa via toggle pra não ocupar espaço quando não está em uso.
 */
export function DiarioRegistro() {
  const [aberto, setAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const [perfumeId, setPerfumeId] = useState<string>("");
  const [ocasiao, setOcasiao] = useState<Ocasiao | "">("");
  const [sentimento, setSentimento] = useState<Sentimento | "">("");
  const [observacao, setObservacao] = useState("");

  const perfumesFiltrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return CATALOGO.slice(0, 8);
    return CATALOGO.filter(
      (p) =>
        p.nome.toLowerCase().includes(q) ||
        (p.marca?.toLowerCase().includes(q) ?? false),
    ).slice(0, 8);
  }, [busca]);

  const podeSalvar = perfumeId && ocasiao && sentimento;

  const reset = () => {
    setBusca("");
    setPerfumeId("");
    setOcasiao("");
    setSentimento("");
    setObservacao("");
  };

  const handleSalvar = () => {
    if (!podeSalvar) return;
    addRegistro({
      perfumeId,
      ocasiao: ocasiao as Ocasiao,
      sentimento: sentimento as Sentimento,
      observacao: observacao.trim() || undefined,
    });
    const perfume = CATALOGO.find((p) => p.id === perfumeId);
    toast.success(
      "Registro salvo no diário",
      perfume ? `${perfume.nome} · ${ocasiao}` : "",
    );
    reset();
    setAberto(false);
  };

  const perfumeSelecionado = CATALOGO.find((p) => p.id === perfumeId);

  return (
    <section className="section-veil-light rounded-sm border border-amber/25 p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
            Novo registro
          </span>
          <p className="mt-2 font-display text-xl font-light text-ink md:text-2xl">
            {aberto ? (
              <>O que você usou hoje?</>
            ) : (
              <>Anota um uso de perfume, leva 15 segundos.</>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (aberto) reset();
            setAberto(!aberto);
          }}
          className="shrink-0 rounded-full border border-amber/50 bg-amber/10 px-5 py-2.5 text-[10px] font-sans uppercase tracking-[0.3em] text-amber transition-all hover:border-amber hover:bg-amber hover:text-ink md:px-6 md:py-3"
        >
          {aberto ? "Cancelar" : "+ Registrar"}
        </button>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="mt-8 flex flex-col gap-8">
              {/* Perfume */}
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-sans uppercase tracking-[0.3em] text-amber/80">
                  1. Qual perfume?
                </label>
                {perfumeSelecionado ? (
                  <div className="flex items-center justify-between gap-4 rounded-sm border border-amber/30 p-4">
                    <div className="flex flex-col">
                      <span className="font-display text-lg font-light text-ink">
                        {perfumeSelecionado.nome}
                      </span>
                      <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-amber/70">
                        {perfumeSelecionado.marca}
                        {perfumeSelecionado.familia
                          ? ` · ${perfumeSelecionado.familia}`
                          : ""}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPerfumeId("");
                        setBusca("");
                      }}
                      className="text-xs italic text-ink/70 underline-offset-4 hover:text-amber hover:underline"
                    >
                      trocar
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      placeholder="Procura por nome ou marca..."
                      className="w-full rounded-sm border border-ink/15 px-4 py-3 text-base text-ink placeholder:text-ink/35 focus:border-amber focus:outline-none"
                    />
                    <ul className="grid max-h-72 gap-2 overflow-y-auto md:grid-cols-2">
                      {perfumesFiltrados.map((p) => (
                        <li key={p.id}>
                          <button
                            type="button"
                            onClick={() => setPerfumeId(p.id)}
                            className="flex w-full items-baseline justify-between gap-3 rounded-sm border border-ink/8 px-4 py-3 text-left transition-all hover:border-amber/50 hover:"
                          >
                            <div className="flex min-w-0 flex-col">
                              <span className="truncate font-display text-base font-light text-ink">
                                {p.nome}
                              </span>
                              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-ink/70">
                                {p.marca}
                              </span>
                            </div>
                          </button>
                        </li>
                      ))}
                      {perfumesFiltrados.length === 0 && (
                        <li className="col-span-full text-xs italic text-ink/65">
                          Nada encontrado.
                        </li>
                      )}
                    </ul>
                  </>
                )}
              </div>

              {/* Ocasião */}
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-sans uppercase tracking-[0.3em] text-amber/80">
                  2. Pra qual ocasião?
                </label>
                <div className="flex flex-wrap gap-2">
                  {OCASIOES.map((o) => (
                    <Chip
                      key={o.value}
                      ativo={ocasiao === o.value}
                      onClick={() => setOcasiao(o.value)}
                    >
                      {o.label}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Sentimento */}
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-sans uppercase tracking-[0.3em] text-amber/80">
                  3. Como foi?
                </label>
                <div className="flex flex-wrap gap-2">
                  {SENTIMENTOS.map((s) => (
                    <Chip
                      key={s.value}
                      ativo={sentimento === s.value}
                      onClick={() => setSentimento(s.value)}
                    >
                      <span className="text-amber">{s.emoji}</span>{" "}
                      {s.label}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Observação */}
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-sans uppercase tracking-[0.3em] text-amber/80">
                  4. Observação <span className="lowercase italic text-ink/65">(opcional)</span>
                </label>
                <textarea
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value.slice(0, 240))}
                  placeholder="Algo importante a guardar pro futuro? Ex: recebi elogio..."
                  rows={2}
                  className="w-full resize-none rounded-sm border border-ink/15 px-4 py-3 text-base text-ink placeholder:text-ink/35 focus:border-amber focus:outline-none"
                />
                <span className="text-right text-[10px] text-ink/75">
                  {observacao.length}/240
                </span>
              </div>

              {/* Salvar */}
              <button
                type="button"
                onClick={handleSalvar}
                disabled={!podeSalvar}
                className="self-end rounded-full bg-amber px-8 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright disabled:cursor-not-allowed disabled:bg-cream/10 disabled:text-ink/70"
              >
                Salvar registro →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Chip({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs font-sans transition-all ${
        ativo
          ? "border-amber bg-amber text-ink"
          : "border-ink/20 text-ink/85 hover:border-amber/60 hover:text-amber"
      }`}
    >
      {children}
    </button>
  );
}
