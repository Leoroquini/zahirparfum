"use client";

import { useEffect } from "react";
import Link from "next/link";
import { clearLista } from "@/lib/lista-store";
import { BRAND } from "@/lib/brand";

/**
 * Tela de pós-pagamento aprovado (back_urls.success do Mercado Pago).
 * Limpa a lista local — o pedido virou pagamento, não faz mais sentido
 * deixar os itens reservados no carrinho do navegador.
 */
export function ObrigadoView() {
  useEffect(() => {
    clearLista();
  }, []);

  return (
    <section className="section-veil-light flex min-h-screen items-center justify-center px-6 py-24 md:px-12">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="font-display text-[8rem] font-light italic leading-none text-amber/50 md:text-[12rem]">
          ✦
        </span>
        <h1 className="mt-2 font-display text-3xl font-light tracking-tight text-ink md:text-5xl">
          Pedido recebido.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-ink/80">
          Em alguns minutos você recebe a confirmação por email. Quando o
          pagamento for aprovado, separamos seu perfume e enviamos o código de
          rastreio pelo WhatsApp.
        </p>
        <p className="mt-3 max-w-md text-sm italic leading-relaxed text-ink/65">
          Prazo de envio: 1 a 2 dias úteis após confirmação. Qualquer dúvida,
          fala com a gente.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={`https://wa.me/${BRAND.whatsapp.number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-amber px-8 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
          >
            Falar no WhatsApp
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-8 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink/80 transition-all hover:border-amber hover:text-amber"
          >
            Voltar ao catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
