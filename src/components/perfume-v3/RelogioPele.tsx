"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Relógio na Pele — Ato 4.
 *
 * Sundial árabe de 12 horas. Mostra como o perfume evolui na pele
 * conforme o tempo passa. Cada momento tem:
 * - Notas ativas naquele instante
 * - Intensidade (forte → sussurro)
 * - "Quem te abraça vai sentir..." (texto contextual)
 *
 * Você arrasta o ponteiro ou clica em qualquer hora pra ir direto.
 */

type Props = {
  topo: string[];
  coracao: string[];
  fundo: string[];
};

type Momento = {
  hora: number; // 0 a 11 (12 etapas)
  tempo: string;
  titulo: string;
  descricao: string;
  pesos: { topo: number; coracao: number; fundo: number };
  cenario: string; // contexto sensorial
};

const MOMENTOS: Momento[] = [
  {
    hora: 0,
    tempo: "Aplicação",
    titulo: "O Sopro",
    descricao: "O álcool evapora. Por 30 segundos, só o etanol fala. Espera.",
    pesos: { topo: 0.3, coracao: 0.1, fundo: 0.1 },
    cenario: "Acabou de borrifar.",
  },
  {
    hora: 1,
    tempo: "5 min",
    titulo: "A Explosão",
    descricao: "As notas voláteis dominam. É o que quem cruza você no elevador vai sentir.",
    pesos: { topo: 1, coracao: 0.3, fundo: 0.1 },
    cenario: "Você sai de casa.",
  },
  {
    hora: 2,
    tempo: "20 min",
    titulo: "A Transição",
    descricao: "O topo começa a desaparecer e o coração assume. A pele esquenta o perfume.",
    pesos: { topo: 0.5, coracao: 1, fundo: 0.3 },
    cenario: "Chega no trabalho.",
  },
  {
    hora: 3,
    tempo: "1 h",
    titulo: "A Assinatura",
    descricao: "O coração está em plenitude. Esta é a fase em que quem te abraça vai se lembrar.",
    pesos: { topo: 0.1, coracao: 1, fundo: 0.6 },
    cenario: "Reunião da manhã.",
  },
  {
    hora: 4,
    tempo: "2 h",
    titulo: "A Persistência",
    descricao: "Coração no auge. Projeção começa a suavizar. Mais íntimo, menos gritante.",
    pesos: { topo: 0, coracao: 0.95, fundo: 0.7 },
    cenario: "Almoço com cliente.",
  },
  {
    hora: 5,
    tempo: "3 h",
    titulo: "A Maturação",
    descricao: "Coração começa a ceder pro fundo. Madeiras, âmbar, musks assumem.",
    pesos: { topo: 0, coracao: 0.7, fundo: 0.95 },
    cenario: "Tarde da tarde.",
  },
  {
    hora: 6,
    tempo: "4 h",
    titulo: "A Pele",
    descricao: "O perfume colou na pele. Projeção menor, intimidade maior.",
    pesos: { topo: 0, coracao: 0.4, fundo: 1 },
    cenario: "Café da tarde.",
  },
  {
    hora: 7,
    tempo: "5 h",
    titulo: "O Casulo",
    descricao: "Quem te abraça sente. Quem cruza, não. Skin-scent perfeito.",
    pesos: { topo: 0, coracao: 0.2, fundo: 1 },
    cenario: "Final de tarde.",
  },
  {
    hora: 8,
    tempo: "6 h",
    titulo: "O Fundo",
    descricao: "Só base. Madeiras, âmbar, musks. A identidade central da fragrância.",
    pesos: { topo: 0, coracao: 0.1, fundo: 1 },
    cenario: "Saindo do escritório.",
  },
  {
    hora: 9,
    tempo: "7 h",
    titulo: "O Sussurro",
    descricao: "Já está mais perto da pele do que do ar. Mas ainda está lá, persistente.",
    pesos: { topo: 0, coracao: 0, fundo: 0.85 },
    cenario: "Jantar.",
  },
  {
    hora: 10,
    tempo: "8 h",
    titulo: "O Rastro",
    descricao: "Só quem te abraça mesmo sente. É a memória que fica.",
    pesos: { topo: 0, coracao: 0, fundo: 0.65 },
    cenario: "Noite.",
  },
  {
    hora: 11,
    tempo: "10 h+",
    titulo: "O Que Fica",
    descricao: "É o que alguém vai sentir no seu casaco amanhã. A memória olfativa que o perfume deixa em você e em quem passou.",
    pesos: { topo: 0, coracao: 0, fundo: 0.4 },
    cenario: "Madrugada.",
  },
];

export function RelogioPele({ topo, coracao, fundo }: Props) {
  const [hora, setHora] = useState(1);
  const [arrastando, setArrastando] = useState(false);
  const relogioRef = useRef<HTMLDivElement>(null);

  const momento = MOMENTOS[hora];

  // Calcula notas ativas baseado nos pesos
  const notasAtivas = useMemo(() => {
    return [
      ...topo.map((n) => ({ nome: n, intensidade: momento.pesos.topo, nivel: "topo" as const })),
      ...coracao.map((n) => ({ nome: n, intensidade: momento.pesos.coracao, nivel: "coracao" as const })),
      ...fundo.map((n) => ({ nome: n, intensidade: momento.pesos.fundo, nivel: "fundo" as const })),
    ].filter((n) => n.intensidade > 0.05);
  }, [topo, coracao, fundo, momento]);

  // Drag handler do ponteiro
  const handleDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!relogioRef.current) return;
    const rect = relogioRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    let angle = Math.atan2(dy, dx) + Math.PI / 2; // 0 no topo
    if (angle < 0) angle += Math.PI * 2;
    const novaHora = Math.round((angle / (Math.PI * 2)) * 12) % 12;
    setHora(novaHora);
  };

  if (topo.length + coracao.length + fundo.length === 0) return null;

  // Ângulo do ponteiro: hora 0 (no topo) = 0°, hora 6 (embaixo) = 180°
  const anguloPonteiro = (hora / 12) * 360;

  // Cor de fundo do relógio muda com o tempo
  const corFundo = useMemo(() => {
    if (hora < 3) return "rgba(255, 245, 220, 0.3)"; // manhã
    if (hora < 6) return "rgba(255, 230, 195, 0.3)"; // meio
    if (hora < 9) return "rgba(220, 195, 165, 0.3)"; // tarde
    return "rgba(180, 145, 110, 0.3)"; // noite
  }, [hora]);

  return (
    <div className="grid gap-12 md:grid-cols-[auto_1fr] md:gap-16">
      {/* RELÓGIO SUNDIAL */}
      <div className="flex flex-col items-center gap-6">
        <div
          ref={relogioRef}
          className="relative h-[320px] w-[320px] cursor-grab active:cursor-grabbing select-none md:h-[380px] md:w-[380px]"
          onPointerDown={(e) => {
            setArrastando(true);
            handleDrag(e);
          }}
          onPointerMove={(e) => {
            if (arrastando) handleDrag(e);
          }}
          onPointerUp={() => setArrastando(false)}
          onPointerLeave={() => setArrastando(false)}
        >
          {/* Círculo externo (mostrador) */}
          <div
            className="absolute inset-0 rounded-full border-2 border-amber-dim/40 transition-colors duration-1000"
            style={{ background: corFundo }}
          />

          {/* Círculo interno */}
          <div className="absolute inset-8 rounded-full border border-amber-dim/25" />

          {/* Marcações de hora (12 traços) */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * 360 - 90;
            const ativo = i === hora;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setHora(i)}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `translate(-50%, -50%) rotate(${a + 90}deg) translateY(-${
                    relogioRef.current?.offsetWidth ? relogioRef.current.offsetWidth / 2 - 14 : 160
                  }px)`,
                }}
                aria-label={`Ir para ${MOMENTOS[i].tempo}`}
              >
                <div
                  className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${
                    ativo ? "scale-110" : "opacity-50 hover:opacity-100"
                  }`}
                  style={{ transform: `rotate(${-(a + 90)}deg)` }}
                >
                  <div
                    className={`h-2 w-px transition-colors ${
                      ativo ? "bg-amber-dim" : "bg-ink/30"
                    }`}
                  />
                  <span
                    className={`text-[8px] font-sans uppercase tracking-[0.2em] transition-colors ${
                      ativo ? "text-amber-dim font-medium" : "text-ink/55"
                    }`}
                  >
                    {MOMENTOS[i].tempo}
                  </span>
                </div>
              </button>
            );
          })}

          {/* PONTEIRO */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{
              rotate: anguloPonteiro,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          >
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: "50%",
                width: 2,
                height: "42%",
                background: "linear-gradient(to top, transparent, #8C6B26, #C89B3C)",
              }}
            />
          </motion.div>

          {/* Centro */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-4 w-4 rounded-full border-2 border-amber-dim bg-cream" />
            <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-dim" />
          </div>

          {/* Indicador atual no centro */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 mt-12 -translate-x-1/2 text-center">
            <span className="block text-[9px] font-sans uppercase tracking-[0.3em] text-ink/55">
              Tempo na pele
            </span>
            <span className="mt-1 block font-display text-2xl italic text-amber-dim">
              {momento.tempo}
            </span>
          </div>
        </div>

        <p className="text-center text-[10px] font-sans uppercase tracking-[0.3em] text-ink/55">
          Arraste o ponteiro · ou toque no tempo
        </p>
      </div>

      {/* PAINEL DE INFORMAÇÕES */}
      <div className="flex flex-col gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={hora}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-[10px] font-sans font-medium uppercase tracking-[0.4em] text-amber-dim">
                {momento.cenario}
              </span>
            </div>

            <h3 className="font-display text-3xl font-light leading-[1.05] tracking-tight text-ink md:text-5xl">
              {momento.titulo}
              <span className="text-amber-dim">.</span>
            </h3>

            <p className="max-w-md text-base leading-relaxed text-ink/85 md:text-lg">
              {momento.descricao}
            </p>

            {/* NOTAS ATIVAS — animadas individualmente */}
            <div className="mt-4 flex flex-col gap-3 border-l-2 border-amber-dim/40 pl-5">
              <p className="text-[10px] font-sans font-medium uppercase tracking-[0.4em] text-amber-dim">
                Você cheira a
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {notasAtivas.map((n, i) => (
                  <motion.span
                    key={`${n.nome}-${hora}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{
                      opacity: n.intensidade,
                      y: 0,
                      scale: 0.85 + n.intensidade * 0.25,
                    }}
                    transition={{ duration: 0.6, delay: i * 0.04 }}
                    className={`text-base ${
                      n.intensidade > 0.7
                        ? "font-medium text-ink"
                        : "text-ink/85"
                    }`}
                    style={{
                      filter: `blur(${(1 - n.intensidade) * 0.5}px)`,
                    }}
                  >
                    {n.nome}
                  </motion.span>
                ))}
              </div>
              {notasAtivas.length === 0 && (
                <p className="text-sm italic text-ink/65">
                  O perfume já se foi. Mas a memória dele em quem te abraçou ainda está.
                </p>
              )}
            </div>

            {/* Barras de intensidade por camada */}
            <div className="mt-2 flex flex-col gap-2">
              <BarraIntensidade label="Topo" valor={momento.pesos.topo} />
              <BarraIntensidade label="Coração" valor={momento.pesos.coracao} />
              <BarraIntensidade label="Fundo" valor={momento.pesos.fundo} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function BarraIntensidade({ label, valor }: { label: string; valor: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 shrink-0 text-[9px] font-sans font-medium uppercase tracking-[0.3em] text-ink/65">
        {label}
      </span>
      <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-amber-dim"
          animate={{ width: `${valor * 100}%` }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        />
      </div>
      <span className="w-10 shrink-0 text-right text-[9px] font-sans tabular-nums text-ink/65">
        {Math.round(valor * 100)}%
      </span>
    </div>
  );
}
