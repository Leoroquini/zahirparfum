import { Hero } from "@/components/sections/Hero";
import { CatalogoHighlight } from "@/components/sections/CatalogoHighlight";
import { CuradoriasSection } from "@/components/sections/Curadorias";
import { Ritual } from "@/components/sections/Ritual";
import { KitDescobridor } from "@/components/sections/KitDescobridor";
import { Decants } from "@/components/sections/Decants";
import { ComparadorPreview } from "@/components/sections/ComparadorPreview";
import { MapaOlfativo } from "@/components/sections/MapaOlfativo";
import { ManifestoPreview } from "@/components/sections/ManifestoPreview";
import { Newsletter } from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — impacto cinematográfico */}
      <Hero />

      {/* 2. Catálogo — 4 destaques + CTA */}
      <CatalogoHighlight />

      {/* 3. Curadorias — entrada alternativa pra indeciso */}
      <CuradoriasSection />

      {/* 4. O Ritual — quiz olfativo */}
      <Ritual />

      {/* 5. Kit Descobridor — oferta concreta primeira compra */}
      <KitDescobridor />

      {/* 6. Decants — quebra a objeção "e se eu não gostar" */}
      <Decants />

      {/* 7. Comparador — prévia com 1 exemplo forte */}
      <ComparadorPreview />

      {/* 8. Mapa olfativo — visual "uau" */}
      <MapaOlfativo />

      {/* 9. Manifesto — versão curta */}
      <ManifestoPreview />

      {/* 10. Newsletter — captura */}
      <Newsletter />
    </>
  );
}
