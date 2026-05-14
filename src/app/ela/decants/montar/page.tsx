import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { MontadorKit } from "@/components/sections/MontadorKit";

export const metadata: Metadata = {
  title: "Montar meu kit · Para Ela",
  description:
    "Monte seu próprio kit de decants femininos. Escolha quantos quiser, misture 5ml e 10ml, veja o total somar em tempo real e feche pelo WhatsApp.",
};

export default function MontarKitElaPage() {
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
        descricao="Escolha qualquer perfume feminino do catálogo, em 5ml ou 10ml. Quando os 3 forem da Seleção da Semana, o preço promocional aplica automático."
        backgroundGradient="radial-gradient(ellipse at 40% 50%, rgba(212,165,116,0.15), transparent 60%)"
      />

      <Suspense fallback={null}>
        <MontadorKit mundo="ela" />
      </Suspense>
    </>
  );
}
