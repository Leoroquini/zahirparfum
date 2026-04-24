"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { Perfume } from "@/data/catalogo";
import {
  addItem,
  isInLista,
  labelDa,
  precoDa,
  useLista,
  type VarianteReserva,
} from "@/lib/lista-store";
import { linkInstagram, mensagemPerfume } from "@/lib/reserva-dm";
import { events } from "@/lib/track";
import { toast } from "@/lib/toast-store";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Card de reserva da página de produto.
 * - Seletor Frasco / Decant 10ml / Decant 5ml
 * - Botão "Reservar via Instagram" com DM pré-preenchido
 * - Botão "Adicionar à lista"
 * - Usado inline (desktop) e na sticky bar (mobile) — ver StickyReservaBar.
 */
export function ReservaCard({ perfume }: { perfume: Perfume }) {
  const [variante, setVariante] = useState<VarianteReserva>("frasco");
  const lista = useLista();
  const naLista = lista.some(
    (i) => i.perfumeId === perfume.id && i.variante === variante
  );

  const preco = precoDa(perfume, variante);
  const isPending = !perfume.marca || perfume.precoVenda === null;

  const handleReservar = () => {
    events.reservaDireta(perfume.id, variante, preco);
    const msg = mensagemPerfume(perfume, variante);
    const url = linkInstagram(msg);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleAddLista = () => {
    if (naLista) return;
    events.adicionouNaLista(perfume.id, variante);
    addItem(perfume, variante);
    toast.success(
      `${perfume.nome} na sua lista`,
      "Quando terminar de escolher, envia tudo pro Instagram de uma vez."
    );
  };

  if (isPending) {
    return (
      <div className="rounded-sm border border-amber/30 bg-amber/5 p-6">
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
          Em breve
        </span>
        <p className="mt-3 text-sm italic text-cream/70">
          Esta fragrância ainda não está disponível pra reserva. Se quiser ser
          avisado, envia uma mensagem pelo Instagram.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-sm border border-cream/10 bg-ink-soft/70 p-6 md:p-8">
      {/* Seletor de variante */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
          Escolha o tamanho
        </span>
        <div className="grid grid-cols-3 gap-2">
          <VarianteOption
            label="5ml"
            sublabel="Decant"
            preco={precoDa(perfume, "decant-5")}
            active={variante === "decant-5"}
            onClick={() => setVariante("decant-5")}
          />
          <VarianteOption
            label="10ml"
            sublabel="Decant"
            preco={precoDa(perfume, "decant-10")}
            active={variante === "decant-10"}
            onClick={() => setVariante("decant-10")}
          />
          <VarianteOption
            label={perfume.volume}
            sublabel="Frasco"
            preco={precoDa(perfume, "frasco")}
            active={variante === "frasco"}
            onClick={() => setVariante("frasco")}
            highlight
          />
        </div>
      </div>

      {/* Preço em destaque */}
      <motion.div
        key={variante}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        className="flex items-baseline justify-between gap-3 border-t border-cream/5 pt-4"
      >
        <div className="flex flex-col">
          <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-cream/50">
            {labelDa(variante)}
          </span>
          <span className="font-display text-4xl font-light leading-none text-cream md:text-5xl">
            R$ {preco}
          </span>
        </div>
        {variante === "frasco" && perfume.precoMercado && (
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-cream/40">
              Mercado
            </span>
            <span className="text-xs text-cream/50 line-through">
              R$ {Math.round(perfume.precoMercado)}
            </span>
          </div>
        )}
      </motion.div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleReservar}
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-amber px-6 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all duration-500 hover:bg-amber-bright"
        >
          Reservar via Instagram
          <span className="transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </button>
        <button
          type="button"
          onClick={handleAddLista}
          disabled={naLista}
          className={`inline-flex items-center justify-center gap-3 rounded-full border px-6 py-4 text-[11px] font-sans uppercase tracking-[0.3em] transition-all duration-500 ${
            naLista
              ? "border-amber bg-amber/10 text-amber"
              : "border-cream/25 text-cream/85 hover:border-amber hover:text-amber"
          }`}
        >
          {naLista ? "✓ Na sua lista" : "Adicionar à lista"}
        </button>
      </div>

      {/* Informações de confiança */}
      <ul className="flex flex-col gap-2 border-t border-cream/5 pt-5 text-xs text-cream/60">
        <li className="flex items-start gap-2">
          <span className="text-amber">✦</span>
          <span>Envio em até 24h úteis depois do pagamento</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-amber">✦</span>
          <span>Troca garantida em 7 dias se o produto chegar lacrado</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-amber">✦</span>
          <span>Pix, cartão em até 12x ou boleto (confirmado no DM)</span>
        </li>
      </ul>
    </div>
  );
}

function VarianteOption({
  label,
  sublabel,
  preco,
  active,
  onClick,
  highlight = false,
}: {
  label: string;
  sublabel: string;
  preco: number;
  active: boolean;
  onClick: () => void;
  highlight?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-center gap-0.5 rounded-sm border px-2 py-3 transition-all duration-300 ${
        active
          ? "border-amber bg-amber/10"
          : "border-cream/15 bg-ink/40 hover:border-amber/40"
      }`}
    >
      {highlight && !active && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-amber/25 px-2 py-0.5 text-[8px] font-sans uppercase tracking-[0.3em] text-amber">
          Padrão
        </span>
      )}
      <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-amber/80">
        {sublabel}
      </span>
      <span
        className={`font-display text-lg leading-none ${
          active ? "text-amber" : "text-cream"
        }`}
      >
        {label}
      </span>
      <span
        className={`mt-1 text-[11px] tabular-nums ${
          active ? "text-amber" : "text-cream/60"
        }`}
      >
        R$ {preco}
      </span>
    </button>
  );
}
