"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  familiasMaisUsadas,
  hitsDoMes,
  ocasioesMaisUsadas,
  ocasioesNaoExploradas,
  perfumesMaisUsados,
  registrosDoMes,
  resumoGeral,
  sugestoesPersonalizadas,
} from "@/lib/diario-insights";
import { type RegistroDiario } from "@/lib/diario-store";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Painel de insights, só renderiza com 3+ registros (senão dados são ruído).
 */
export function DiarioInsights({
  registros,
}: {
  registros: RegistroDiario[];
}) {
  if (registros.length < 3) {
    return (
      <section className="section-veil-light rounded-sm border border-ink/8 p-8 text-center md:p-10">
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber/70">
          Insights
        </span>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink/70 md:text-lg">
          A partir do{" "}
          <em className="text-ink">terceiro registro</em>, esse espaço começa
          a mostrar padrões do seu uso, família dominante, ocasiões favoritas,
          lacunas e sugestões.
        </p>
        <p className="mt-3 text-sm italic text-ink/65">
          Você está em {registros.length}{" "}
          {registros.length === 1 ? "registro" : "registros"}.
        </p>
      </section>
    );
  }

  const resumo = resumoGeral(registros);
  const familias = familiasMaisUsadas(registros).slice(0, 3);
  const ocasioes = ocasioesMaisUsadas(registros).slice(0, 3);
  const perfumes = perfumesMaisUsados(registros).slice(0, 3);
  const hits = hitsDoMes(registros);
  const lacunas = ocasioesNaoExploradas(registros);
  const sugestoes = sugestoesPersonalizadas(registros, 3);
  const mes = registrosDoMes(registros).length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="flex flex-col gap-8"
    >
      <div className="flex items-baseline gap-3">
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
          Insights
        </span>
        <span className="text-xs italic text-ink/70">
          {resumo.totalRegistros} registros · {mes} este mês
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Família dominante */}
        {resumo.familiaTop && (
          <Card label="Família dominante">
            <p className="font-display text-2xl font-light leading-tight text-ink md:text-3xl">
              {resumo.familiaTop.familia}
            </p>
            <p className="mt-2 text-sm text-ink/65">
              {resumo.familiaTop.pct}% dos seus registros
            </p>
            {familias.length > 1 && (
              <ul className="mt-4 space-y-1 text-xs text-ink/70">
                {familias.slice(1).map((f) => (
                  <li key={f.familia}>
                    {f.familia} <span className="text-ink/55">· {f.pct}%</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        )}

        {/* Ocasião dominante */}
        {resumo.ocasiaoTop && (
          <Card label="Ocasião favorita">
            <p className="font-display text-2xl font-light leading-tight text-ink md:text-3xl">
              {resumo.ocasiaoTop.label}
            </p>
            <p className="mt-2 text-sm text-ink/65">
              {resumo.ocasiaoTop.count}{" "}
              {resumo.ocasiaoTop.count === 1 ? "vez" : "vezes"} ·{" "}
              {resumo.ocasiaoTop.pct}%
            </p>
            {ocasioes.length > 1 && (
              <ul className="mt-4 space-y-1 text-xs text-ink/70">
                {ocasioes.slice(1).map((o) => (
                  <li key={o.ocasiao}>
                    {o.label} <span className="text-ink/55">· {o.pct}%</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        )}

        {/* Perfume mais usado */}
        {resumo.perfumeTop && (
          <Card label="Mais usado">
            <Link
              href={`/perfume/${resumo.perfumeTop.perfume.id}`}
              className="group flex items-center gap-3"
            >
              {hasFoto(resumo.perfumeTop.perfume) && (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm border border-ink/10">
                  <Image
                    src={fotoSrc(resumo.perfumeTop.perfume)}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex min-w-0 flex-col">
                <p className="truncate font-display text-xl font-light text-ink group-hover:text-amber md:text-2xl">
                  {resumo.perfumeTop.perfume.nome}
                </p>
                <p className="text-xs text-ink/65">
                  {resumo.perfumeTop.count}{" "}
                  {resumo.perfumeTop.count === 1 ? "uso" : "usos"} registrado
                  {resumo.perfumeTop.count === 1 ? "" : "s"}
                </p>
              </div>
            </Link>
            {perfumes.length > 1 && (
              <ul className="mt-4 space-y-1 text-xs text-ink/70">
                {perfumes.slice(1).map((p) => (
                  <li key={p.perfume.id} className="truncate">
                    {p.perfume.nome}{" "}
                    <span className="text-ink/35">
                     , {p.count}x
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        )}
      </div>

      {/* Hits e Lacunas */}
      {(hits.length > 0 || lacunas.length > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
          {hits.length > 0 && (
            <Card label="Seus hits">
              <p className="text-sm text-ink/85">
                Perfumes que você claramente ama, usos com avaliação alta.
              </p>
              <ul className="mt-4 flex flex-col divide-y divide-cream/8">
                {hits.slice(0, 3).map((h) => (
                  <li key={h.perfume.id}>
                    <Link
                      href={`/perfume/${h.perfume.id}`}
                      className="group flex items-baseline justify-between gap-3 py-2 transition-colors hover:bg-cream-soft/40"
                    >
                      <span className="truncate font-display text-base font-light text-ink group-hover:text-amber">
                        {h.perfume.nome}
                      </span>
                      <span className="shrink-0 text-[10px] font-sans uppercase tracking-[0.3em] text-amber/70">
                        {h.count}× · score {h.scoreSentimento}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {lacunas.length > 0 && (
            <Card label="Lacunas">
              <p className="text-sm text-ink/85">
                Ocasiões que você ainda não registrou nenhum uso. Cada uma é
                espaço pra explorar um perfume novo com propósito.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {lacunas.map((l) => (
                  <li
                    key={l.ocasiao}
                    className="rounded-full border border-amber/30 bg-amber/5 px-3 py-1 text-[11px] font-sans uppercase tracking-[0.25em] text-amber/85"
                  >
                    {l.label}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}

      {/* Sugestões */}
      {sugestoes.length > 0 && (
        <div className="rounded-sm border border-amber/25 p-6 md:p-8">
          <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
            Pra explorar
          </span>
          <p className="mt-2 font-display text-xl font-light text-ink md:text-2xl">
            Baseado nos seus padrões.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {sugestoes.map(({ perfume, razao }) => (
              <li key={perfume.id}>
                <Link
                  href={`/perfume/${perfume.id}`}
                  className="group flex h-full flex-col gap-3 rounded-sm border border-ink/8 p-4 transition-all hover:border-amber/50"
                >
                  {hasFoto(perfume) && (
                    <div className="relative aspect-square overflow-hidden rounded-sm border border-ink/8">
                      <Image
                        src={fotoSrc(perfume)}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <span className="font-display text-lg font-light text-ink group-hover:text-amber">
                      {perfume.nome}
                    </span>
                    <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-ink/70">
                      {perfume.marca}
                    </span>
                    <span className="mt-2 text-xs italic text-amber/80">
                      {razao}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.section>
  );
}

function Card({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-sm border border-ink/8 p-5 md:p-6">
      <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber/80">
        {label}
      </span>
      <div className="mt-3">{children}</div>
    </div>
  );
}
