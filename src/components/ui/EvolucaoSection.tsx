"use client";

import { EvolucaoTimeline } from "@/components/ui/EvolucaoTimeline";

type Props = {
  topo: string[];
  coracao: string[];
  fundo: string[];
};

/**
 * Wrapper estável para manter a mesma árvore no SSR e no cliente.
 */
export function EvolucaoSection({ topo, coracao, fundo }: Props) {
  return <EvolucaoTimeline topo={topo} coracao={coracao} fundo={fundo} />;
}
