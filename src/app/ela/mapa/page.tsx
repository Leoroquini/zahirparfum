import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { MapaOlfativo } from "@/components/sections/MapaOlfativo";

export const metadata: Metadata = {
  title: "Mapa olfativo · Para Ela",
  description:
    "Cada perfume árabe feminino da Zahir posicionado em um plano 2D, eixos Floral↔Gourmand e Fresco↔Envolvente. Visualize a curadoria feminina por perfil olfativo.",
};

export default function MapaElaPage() {
  return (
    <>
      <PageHero
        eyebrow="Mapa olfativo · Para Ela"
        titulo={
          <>
            Toda a curadoria{" "}
            <em className="italic text-amber/90">em um só lugar.</em>
          </>
        }
        descricao="Cada fragrância feminina posicionada por perfil olfativo. Passa o mouse pra ver, clica pra abrir a ficha. Ideal pra entender visualmente como Floral, Gourmand e Oriental conversam no universo árabe feminino."
        backgroundGradient="radial-gradient(ellipse at 50% 50%, rgba(212,165,116,0.12), transparent 70%)"
      />

      {/* Como ler o mapa feminino */}
      <section className="section-veil-light border-b border-ink/5 px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
              Eixo horizontal
            </span>
            <p className="text-base text-ink/80">
              <span className="font-display italic text-ink">Fresco · Solar</span>{" "}
              (frutal-floral leve, almíscar) à esquerda → até{" "}
              <span className="font-display italic text-ink">Envolvente · Noite</span>{" "}
              (oriental, gourmand denso, oud rosé) à direita.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
              Eixo vertical
            </span>
            <p className="text-base text-ink/80">
              <span className="font-display italic text-ink">Floral · Romântico</span>{" "}
              (rosa, jasmim, tuberosa, flor de laranjeira) em cima → até{" "}
              <span className="font-display italic text-ink">Gourmand · Comestível</span>{" "}
              (baunilha, mel, dátil, praliné, café) embaixo.
            </p>
          </div>
        </div>
      </section>

      <MapaOlfativo hideIntro mundo="ela" />
    </>
  );
}
