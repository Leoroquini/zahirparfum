import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TresComecos } from "@/components/sections/TresComecos";
import { DecantsResumo } from "@/components/sections/DecantsResumo";
import { CatalogoHighlight } from "@/components/sections/CatalogoHighlight";
import { FerramentasDescoberta } from "@/components/sections/FerramentasDescoberta";
import { CuradoriasSection } from "@/components/sections/Curadorias";
import { ManifestoPreview } from "@/components/sections/ManifestoPreview";

export const metadata: Metadata = {
  title: "Zahir Parfums · Para Ele",
  description:
    "Encontre seu perfume árabe e teste na pele antes de investir no frasco. Decants de 5 ml e 10 ml, catálogo curado e ferramentas pra escolher com informação.",
};

/**
 * Home masculina /ele.
 *
 * Ordem definida pela Arquitetura §3 — a home ENCAMINHA, não substitui as
 * páginas de profundidade:
 *   1 Hero               proposta + CTA de decants
 *   2 Três Começos       separa intenção: descobrir / testar / já sei
 *   3 Decants (resumo)   os três níveis de compromisso
 *   4 Curadoria curta    seleção de entrada do catálogo
 *   5 Ferramentas        mapa, comparadores e notas como encaminhamento
 *   6 Curadorias         quatro recortes por momento
 *   7 Manifesto          a tese da casa, curto
 *
 * SAÍRAM DAQUI (continuam existindo nas próprias rotas):
 *   MapaOlfativo (546 linhas), ComparadorPreview (452) e Ritual (1462) eram
 *   renderizados inteiros nesta página. O brief: "Não exponha mapa,
 *   comparador, curadorias, notas e catálogo como escolhas de primeira ordem
 *   ao mesmo tempo." Agora entram como cards em FerramentasDescoberta.
 *   Decants e KitsTrio também saíram — a explicação longa e os kits são
 *   trabalho de /decants, e o brief proíbe repetir esses blocos.
 *
 * IMPORTS ESTÁTICOS, não dynamic(). A doc do Next 16
 * (node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md) diz:
 * "When a Server Component dynamically imports a Client Component, automatic
 * code splitting is currently not supported." Esta página é Server Component
 * e todas as seções são "use client" — os dynamic() antigos não dividiam
 * bundle nenhum, só adicionavam indireção.
 */
export default function HomeEle() {
  return (
    <>
      <Hero />
      <TresComecos mundo="ele" />
      <DecantsResumo mundo="ele" />
      <CatalogoHighlight />
      <FerramentasDescoberta mundo="ele" />
      <CuradoriasSection />
      <ManifestoPreview />
    </>
  );
}
