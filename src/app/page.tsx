import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

// Seções abaixo da dobra carregam sob demanda pra não travar o 1º paint.
const CatalogoHighlight = dynamic(() =>
  import("@/components/sections/CatalogoHighlight").then(
    (m) => m.CatalogoHighlight,
  ),
);
const CuradoriasHighlight = dynamic(() =>
  import("@/components/sections/CuradoriasHighlight").then(
    (m) => m.CuradoriasHighlight,
  ),
);
const Ritual = dynamic(() =>
  import("@/components/sections/Ritual").then((m) => m.Ritual),
);
const KitsTrio = dynamic(() =>
  import("@/components/sections/KitsTrio").then((m) => m.KitsTrio),
);
const Decants = dynamic(() =>
  import("@/components/sections/Decants").then((m) => m.Decants),
);
const ComparadorPreview = dynamic(() =>
  import("@/components/sections/ComparadorPreview").then(
    (m) => m.ComparadorPreview,
  ),
);
const MapaOlfativo = dynamic(() =>
  import("@/components/sections/MapaOlfativo").then((m) => m.MapaOlfativo),
);
const ManifestoPreview = dynamic(() =>
  import("@/components/sections/ManifestoPreview").then(
    (m) => m.ManifestoPreview,
  ),
);
const Newsletter = dynamic(() =>
  import("@/components/sections/Newsletter").then((m) => m.Newsletter),
);

export default function HomePage() {
  return (
    <>
      {/* 1. Hero, impacto cinematográfico */}
      <Hero />

      {/* 2. Catálogo, 4 destaques + CTA */}
      <CatalogoHighlight />

      {/* 3. Curadorias, 3 destaques + CTA ver todas */}
      <CuradoriasHighlight />

      {/* 4. O Ritual, quiz olfativo */}
      <Ritual />

      {/* 5. Decants, educa o conceito antes da oferta */}
      <Decants />

      {/* 6. Trios curados, dois preços fixos como porta de entrada */}
      <KitsTrio />

      {/* 7. Comparador, prévia com 1 exemplo forte */}
      <ComparadorPreview />

      {/* 8. Mapa olfativo, visual "uau" */}
      <MapaOlfativo />

      {/* 9. Manifesto, versão curta */}
      <ManifestoPreview />

      {/* 10. Newsletter, captura */}
      <Newsletter />
    </>
  );
}
