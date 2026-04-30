import Link from "next/link";
import { BRAND } from "@/lib/brand";

export default function NotFound() {
  return (
    <section className="section-veil-light flex min-h-screen items-center justify-center px-6 py-24 md:px-12">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="font-display text-[10rem] font-light italic leading-none text-amber/40 md:text-[16rem]">
          404
        </span>
        <h1 className="-mt-6 font-display text-3xl font-light tracking-tight text-ink md:text-5xl">
          Perfume não encontrado.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-ink/75">
          A página que você procurou não existe ou foi retirada do catálogo.
          Volta pra home e começa de novo, tem{" "}
          <em className="italic text-amber">{BRAND.fullName}</em> inteira
          esperando.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full bg-amber px-8 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
          >
            Voltar à home
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/#catalogo"
            className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-8 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink/80 transition-all hover:border-amber hover:text-amber"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
