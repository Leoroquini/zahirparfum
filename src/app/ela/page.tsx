import dynamic from "next/dynamic";
import { HeroEla } from "@/components/sections/HeroEla";

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
const RitualEla = dynamic(() =>
  import("@/components/sections/RitualEla").then((m) => m.RitualEla),
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

/**
 * Home feminina /ela.
 * Espelha a estrutura do /ele com componentes adaptados ao universo
 * feminino (HeroEla, RitualEla, ComparadorPreview/CatalogoHighlight com
 * prop mundo="ela", MapaOlfativo com eixos femininos).
 *
 * Metadata definida em layout.tsx (server component irmão).
 */
export default function HomeEla() {
  return (
    <>
      <HeroEla />
      <CatalogoHighlight mundo="ela" />
      <Decants mundo="ela" />
      <KitsTrio mundo="ela" />
      <MapaOlfativo mundo="ela" />
      <ComparadorPreview mundo="ela" />
      <RitualEla />
      <ManifestoPreview mundo="ela" />
      <Depoimentos />
      <Newsletter />
    </>
  );
}
