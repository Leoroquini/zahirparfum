import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ComparadorArabeDesigner } from "@/components/sections/ComparadorArabeDesigner";

export const metadata: Metadata = {
  title: "Árabe × Designer · Para Ela",
  description:
    "Alternativas árabes femininas com caminhos olfativos próximos a designers conhecidos. Compare La Vie Est Belle, Good Girl, Libre, Black Opium e outros com referências da curadoria.",
};

export default function ComparadorElaPage() {
  return (
    <>
      <PageHero
        eyebrow="Comparador · Árabe × Designer"
        titulo={
          <>
            Árabe <span className="text-amber/90">×</span>{" "}
            <em className="italic">Designer</em>.
          </>
        }
        descricao="Escolha um designer feminino que você conhece — La Vie Est Belle, Good Girl, Libre, Black Opium, Coco Mademoiselle. Mostramos alternativas árabes da curadoria que conversam com o mesmo caminho olfativo."
        backgroundGradient="radial-gradient(ellipse at 70% 50%, rgba(122,45,50,0.15), transparent 60%)"
      />

      <section className="section-veil-light border-b border-ink/5 px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Por que compensa
          </span>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            <Motivo
              titulo="Mesma ideia olfativa"
              descricao="Muitas casas árabes femininas criam interpretações inspiradas em designers. O objetivo é comparar família, notas, ocasião e sensação geral — não prometer cópia idêntica."
            />
            <Motivo
              titulo="Performance árabe"
              descricao="Perfumes árabes femininos tendem a ter projeção e fixação maiores que os designers equivalentes. Khamrah dura 10h+ vs. La Vie Est Belle que dá 5-6h em pele média."
            />
            <Motivo
              titulo="Preço justo"
              descricao="Boa experiência olfativa por uma fração do preço de boutique. Sem transformar comparação de preço em garantia de equivalência — a referência é editorial, não promessa."
            />
          </div>
        </div>
      </section>

      <ComparadorArabeDesigner hideIntro />
    </>
  );
}

function Motivo({ titulo, descricao }: { titulo: string; descricao: string }) {
  return (
    <div className="flex flex-col gap-3 border-l-2 border-amber/40 pl-5">
      <span className="font-display text-xl font-light italic text-ink md:text-2xl">
        {titulo}
      </span>
      <p className="text-sm leading-relaxed text-ink/70">{descricao}</p>
    </div>
  );
}
