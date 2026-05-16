import type { Metadata } from "next";
import { MapaHero } from "@/components/sections/MapaHero";
import { MapaOlfativo } from "@/components/sections/MapaOlfativo";

export const metadata: Metadata = {
  title: "Mapa olfativo",
  description:
    "Cada fragrância da ZAHIR PARFUMS posicionada em um plano 2D, eixos Fresco↔Intenso e Seco↔Doce. Visualize o catálogo inteiro por perfil olfativo.",
};

export default function MapaPage() {
  return (
    <>
      <MapaHero />
      <MapaOlfativo hideIntro />
    </>
  );
}
