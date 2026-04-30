import dynamic from "next/dynamic";
import { HeroNarrativo } from "@/components/sections/HeroNarrativo";
import { CatalogoHighlight } from "@/components/sections/CatalogoHighlight";

const CuradoriasHighlight = dynamic(() =>
  import("@/components/sections/CuradoriasHighlight").then(
    (m) => m.CuradoriasHighlight,
  ),
);
const Ritual = dynamic(() =>
  import("@/components/sections/Ritual").then((m) => m.Ritual),
);
const KitDescobridor = dynamic(() =>
  import("@/components/sections/KitDescobridor").then((m) => m.KitDescobridor),
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

/**
 * Versão EXPERIMENTAL da home — hero narrativo scrolltelling em
 * cima do mesmo conteúdo regular abaixo. Pra comparar com a
 * home padrão em / antes de decidir se troca.
 *
 * Não está no menu, não tem SEO. Acessível só via URL direta.
 */
export default function HomeScrollPage() {
  return (
    <>
      {/* 1. Hero scrolltelling — 4 cenas */}
      <HeroNarrativo />

      {/* Resto do conteúdo igual à home atual */}
      <CatalogoHighlight />
      <CuradoriasHighlight />
      <Ritual />
      <KitDescobridor />
      <Decants />
      <ComparadorPreview />
      <MapaOlfativo />
      <ManifestoPreview />
      <Newsletter />
    </>
  );
}
