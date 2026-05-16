import type { Metadata } from "next";
import { ComparadorHero } from "@/components/sections/ComparadorHero";
import { ComparadorArabeDesigner } from "@/components/sections/ComparadorArabeDesigner";

export const metadata: Metadata = {
  title: "Árabe × Designer",
  description:
    "Alternativas árabes com caminhos olfativos próximos aos grandes designers. Compare Creed Aventus, Sauvage, Bleu de Chanel e outros com referências do catálogo.",
};

export default function ComparadorPage() {
  return (
    <>
      <ComparadorHero />
      <ComparadorArabeDesigner hideIntro />
    </>
  );
}
