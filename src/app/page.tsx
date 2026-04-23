import { Hero } from "@/components/sections/Hero";
import { CatalogoGrid } from "@/components/sections/CatalogoGrid";
import { MapaOlfativo } from "@/components/sections/MapaOlfativo";
import { Ritual } from "@/components/sections/Ritual";
import { ComparadorArabeDesigner } from "@/components/sections/ComparadorArabeDesigner";
import { CuradoriasSection } from "@/components/sections/Curadorias";
import { Decants } from "@/components/sections/Decants";
import { Manifesto } from "@/components/sections/Manifesto";
import { Newsletter } from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CatalogoGrid />
      <MapaOlfativo />
      <Ritual />
      <ComparadorArabeDesigner />
      <CuradoriasSection />
      <Decants />
      <Manifesto />
      <Newsletter />
    </>
  );
}
