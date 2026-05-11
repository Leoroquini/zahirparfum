"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "zahir-frete-sp-banner-v1";

/**
 * Faixa fina de comunicação visual: frete grátis em SP capital acima de R$ 99.
 * - Fechável (X), persiste no localStorage por 30 dias.
 * - Apenas comunicação, NÃO calcula nada automaticamente — atendimento aplica
 *   manual no WhatsApp.
 */
export function FreteSPBanner() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setVisivel(true);
        return;
      }
      const fechadoEm = Number(raw);
      const trintaDias = 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - fechadoEm > trintaDias) {
        setVisivel(true);
      }
    } catch {
      setVisivel(true);
    }
  }, []);

  if (!visivel) return null;

  const fechar = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // quota etc, silencioso
    }
    setVisivel(false);
  };

  return (
    <div
      role="status"
      className="relative w-full bg-gradient-to-r from-amber/85 via-amber-bright to-amber/85 text-ink"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-3 px-6 py-2 text-center text-[10px] font-sans uppercase tracking-[0.35em] md:text-[11px]">
        <span className="hidden text-base md:inline">·</span>
        <span>
          <strong className="font-bold">Frete grátis</strong> · São Paulo capital · acima de R$ 99
        </span>
        <span className="hidden text-base md:inline">·</span>
      </div>
      <button
        type="button"
        onClick={fechar}
        aria-label="Fechar aviso de frete"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-base font-light text-ink/70 transition-colors hover:bg-ink/10 hover:text-ink md:right-4"
      >
        ×
      </button>
    </div>
  );
}
