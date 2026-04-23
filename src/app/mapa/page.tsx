import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { MapaOlfativo } from "@/components/sections/MapaOlfativo";

export const metadata: Metadata = {
  title: "Mapa olfativo",
  description:
    "Cada fragrância da ZAHIR PARFUMS posicionada em um plano 2D — eixos Fresco↔Intenso e Seco↔Doce. Visualize o catálogo inteiro por perfil olfativo.",
};

export default function MapaPage() {
  return (
    <>
      <PageHero
        eyebrow="Mapa olfativo"
        titulo={
          <>
            Todo o catálogo{" "}
            <em className="italic text-amber/90">em um só lugar.</em>
          </>
        }
        descricao="Cada fragrância posicionada por perfil olfativo. Passa o mouse pra ver, clica pra abrir a ficha. Ideal pra entender visualmente como as famílias se relacionam."
        backgroundGradient="radial-gradient(ellipse at 50% 50%, rgba(200,155,60,0.1), transparent 70%)"
      />

      {/* Como ler o mapa */}
      <section className="border-b border-cream/5 bg-ink-soft px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
              Eixo horizontal
            </span>
            <p className="text-base text-cream/80">
              <span className="font-display italic text-cream">Fresco</span>{" "}
              (cítricos, aquáticos, aromáticos leves) à esquerda → até{" "}
              <span className="font-display italic text-cream">Intenso</span>{" "}
              (amadeirados densos, orientais, oud) à direita.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
              Eixo vertical
            </span>
            <p className="text-base text-cream/80">
              <span className="font-display italic text-cream">Seco</span>{" "}
              (especiados, fougères, amadeirados austeros) em cima → até{" "}
              <span className="font-display italic text-cream">Doce</span>{" "}
              (gourmands, baunilha, praliné) embaixo.
            </p>
          </div>
        </div>
      </section>

      <MapaOlfativo hideIntro />
    </>
  );
}
