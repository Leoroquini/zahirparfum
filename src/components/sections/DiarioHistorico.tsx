"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { CATALOGO } from "@/data/catalogo";
import {
  OCASIOES,
  removeRegistro,
  SENTIMENTOS,
  type RegistroDiario,
} from "@/lib/diario-store";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

const FORMATADOR_DATA = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function DiarioHistorico({
  registros,
}: {
  registros: RegistroDiario[];
}) {
  if (registros.length === 0) return null;

  return (
    <section className="section-veil-light flex flex-col gap-6">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
          Histórico
        </span>
        <span className="text-xs italic text-ink/70">
          {registros.length}{" "}
          {registros.length === 1 ? "registro" : "registros"}
        </span>
      </div>

      <ul className="flex flex-col divide-y divide-cream/8 border-y border-ink/8">
        <AnimatePresence initial={false}>
          {registros.map((r) => (
            <motion.li
              key={r.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="overflow-hidden"
            >
              <Linha registro={r} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
}

function Linha({ registro }: { registro: RegistroDiario }) {
  const perfume = CATALOGO.find((p) => p.id === registro.perfumeId);
  const sentimento = SENTIMENTOS.find((s) => s.value === registro.sentimento);
  const ocasiao = OCASIOES.find((o) => o.value === registro.ocasiao);

  if (!perfume) {
    return (
      <div className="flex items-center justify-between gap-4 py-4">
        <span className="text-sm italic text-ink/70">
          (perfume removido do catálogo)
        </span>
        <button
          type="button"
          onClick={() => removeRegistro(registro.id)}
          className="text-xs italic text-ink/65 underline-offset-4 hover:text-amber hover:underline"
        >
          remover
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 py-5 md:flex-row md:items-start md:gap-5">
      {/* Foto + nome */}
      <Link
        href={`/perfume/${perfume.id}`}
        className="group flex shrink-0 items-center gap-3 md:w-64"
      >
        {hasFoto(perfume) && (
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm border border-ink/10">
            <Image
              src={fotoSrc(perfume)}
              alt=""
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex min-w-0 flex-col">
          <span className="truncate font-display text-base font-light text-ink group-hover:text-amber">
            {perfume.nome}
          </span>
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-ink/70">
            {perfume.marca}
          </span>
        </div>
      </Link>

      {/* Metadados (ocasião, sentimento, data) */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {ocasiao && (
            <span className="rounded-full border border-ink/15 px-2.5 py-0.5 text-ink/80">
              {ocasiao.label}
            </span>
          )}
          {sentimento && (
            <span className="rounded-full border border-amber/35 bg-amber/5 px-2.5 py-0.5 text-amber/90">
              <span className="mr-1">{sentimento.emoji}</span>
              {sentimento.label}
            </span>
          )}
          <span className="text-ink/65">
            {FORMATADOR_DATA.format(new Date(registro.data))}
          </span>
        </div>
        {registro.observacao && (
          <p className="text-sm italic leading-relaxed text-ink/75">
            “{registro.observacao}”
          </p>
        )}
      </div>

      {/* Remover */}
      <button
        type="button"
        onClick={() => removeRegistro(registro.id)}
        aria-label="Remover registro"
        className="shrink-0 self-start text-xs italic text-ink/65 underline-offset-4 hover:text-amber hover:underline"
      >
        remover
      </button>
    </div>
  );
}
