import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Pagamento não concluído",
  robots: { index: false, follow: false },
};

export default function PagamentoErroPage() {
  return (
    <section className="section-veil-light flex min-h-screen items-center justify-center px-6 py-24 md:px-12">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="font-display text-[8rem] font-light italic leading-none text-wine/50 md:text-[12rem]">
          ⌀
        </span>
        <h1 className="mt-2 font-display text-3xl font-light tracking-tight text-ink md:text-5xl">
          Pagamento não foi concluído.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-ink/80">
          Pode ter sido cartão recusado, conexão caída ou desistência. Sua
          lista continua salva — é só voltar e tentar de novo, ou usar Pix
          que tem aprovação imediata.
        </p>
        <p className="mt-3 max-w-md text-sm italic leading-relaxed text-ink/65">
          Se preferir, finaliza pelo WhatsApp e a gente envia link de
          pagamento manualmente.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/catalogo"
            className="group inline-flex items-center gap-3 rounded-full bg-amber px-8 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
          >
            Voltar à lista
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <a
            href={`https://wa.me/${BRAND.whatsapp.number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-8 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink/80 transition-all hover:border-amber hover:text-amber"
          >
            Fechar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
