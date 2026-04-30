"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="section-veil-light flex min-h-screen items-center justify-center px-6 py-24 md:px-12">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <span className="font-display text-5xl italic text-amber/70">⚠</span>
        <h1 className="mt-6 font-display text-3xl font-light tracking-tight text-ink md:text-4xl">
          Algo desandou desse lado.
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/75">
          Um erro inesperado aconteceu ao carregar esta parte do site. A gente
          já foi notificado.
        </p>
        {error?.digest && (
          <p className="mt-2 text-[10px] font-sans uppercase tracking-[0.3em] text-ink/70">
            id · {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-amber px-7 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
          >
            Tentar novamente
          </button>
          <Link
            href="/"
            className="rounded-full border border-ink/20 px-7 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-ink/80 transition-all hover:border-amber hover:text-amber"
          >
            Voltar à home
          </Link>
        </div>
      </div>
    </section>
  );
}
