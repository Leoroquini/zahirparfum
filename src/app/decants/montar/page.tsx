import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { MontadorKit } from "@/components/sections/MontadorKit";

export const metadata: Metadata = {
  title: "Montar meu kit",
  description:
    "Monte seu próprio kit de decants. Escolha quantos quiser, misture 5ml e 10ml, veja o total somar em tempo real e feche pelo WhatsApp.",
};

export default function MontarKitPage() {
  return (
    <>
      <PageHero
        eyebrow="Decants · Montador livre"
        titulo={
          <>
            Monte do{" "}
            <em className="italic text-amber/90">seu jeito.</em>
          </>
        }
        descricao="Escolha qualquer perfume do catálogo, em 5ml ou 10ml. Total soma em tempo real. Quando estiver pronto, manda pelo WhatsApp."
        backgroundGradient="radial-gradient(ellipse at 40% 50%, rgba(200,155,60,0.15), transparent 60%)"
      />

      <MontadorKit />
    </>
  );
}
