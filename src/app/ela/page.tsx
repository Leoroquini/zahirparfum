import { HeroEla } from "@/components/sections/HeroEla";
import { TresComecos } from "@/components/sections/TresComecos";
import { DecantsResumo } from "@/components/sections/DecantsResumo";
import { CatalogoHighlight } from "@/components/sections/CatalogoHighlight";
import { FerramentasDescoberta } from "@/components/sections/FerramentasDescoberta";
import { CuradoriasSection } from "@/components/sections/Curadorias";
import { ManifestoPreview } from "@/components/sections/ManifestoPreview";

/**
 * Home feminina /ela — espelho exato de /ele na estrutura, com os componentes
 * recebendo mundo="ela" pra trocar rotas, copy e eixos do mapa.
 *
 * Ver o comentário de app/ele/page.tsx para a ordem da Arquitetura §3, o que
 * saiu daqui e por que os imports são estáticos.
 *
 * RitualEla saiu da home junto com o Ritual masculino — continua sendo o
 * motor de /ela/ritual, pra onde a primeira porta de TresComecos aponta.
 *
 * CuradoriasSection não recebe mundo: /curadoria/[slug] é hub editorial único,
 * sem espelho em /ela — mesmo caso de /notas e /compare. Os quatro recortes
 * puxam do catálogo inteiro, e a contagem no card reflete exatamente a página
 * pra onde ele leva.
 *
 * Metadata definida em layout.tsx (server component irmão).
 */
export default function HomeEla() {
  return (
    <>
      <HeroEla />
      <TresComecos mundo="ela" />
      <DecantsResumo mundo="ela" />
      <CatalogoHighlight mundo="ela" />
      <FerramentasDescoberta mundo="ela" />
      <CuradoriasSection />
      <ManifestoPreview mundo="ela" />
    </>
  );
}
