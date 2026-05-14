import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";

const CatalogoHighlight = dynamic(() =>
  import("@/components/sections/CatalogoHighlight").then(
    (m) => m.CatalogoHighlight,
  ),
);
const Decants = dynamic(() =>
  import("@/components/sections/Decants").then((m) => m.Decants),
);
const KitsTrio = dynamic(() =>
  import("@/components/sections/KitsTrio").then((m) => m.KitsTrio),
);
const MapaOlfativo = dynamic(() =>
  import("@/components/sections/MapaOlfativo").then((m) => m.MapaOlfativo),
);
const ComparadorPreview = dynamic(() =>
  import("@/components/sections/ComparadorPreview").then(
    (m) => m.ComparadorPreview,
  ),
);
const Ritual = dynamic(() =>
  import("@/components/sections/Ritual").then((m) => m.Ritual),
);
const ManifestoPreview = dynamic(() =>
  import("@/components/sections/ManifestoPreview").then(
    (m) => m.ManifestoPreview,
  ),
);
const Depoimentos = dynamic(() =>
  import("@/components/sections/Depoimentos").then((m) => m.Depoimentos),
);
const Newsletter = dynamic(() =>
  import("@/components/sections/Newsletter").then((m) => m.Newsletter),
);

export const metadata: Metadata = {
  title: "Zahir Parfums · Para Ele",
  description:
    "Perfumaria árabe masculina. Madeira, especiaria, oud, couro. Decants pra experimentar antes do frasco cheio.",
};

/**
 * Home masculina /ele.
 * Ordem definida em 2026-05-12 (Leo): Curadorias removidas das homes,
 * KitsTrio mantido logo depois de Decants.
 */
export default function HomeEle() {
  return (
    <>
      <Hero />
      <CatalogoHighlight />
      <Decants />
      <KitsTrio />
      <MapaOlfativo />
      <ComparadorPreview />
      <Ritual />
      <ManifestoPreview />
      <Depoimentos />
      <Newsletter />
    </>
  );
}
