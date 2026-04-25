"use client";

import { useEffect, useState } from "react";
import { isLowEndDevice } from "@/lib/device";
import { EvolucaoTimeline } from "@/components/ui/EvolucaoTimeline";
import { EvolucaoNarrativa } from "@/components/ui/EvolucaoNarrativa";

type Props = {
  topo: string[];
  coracao: string[];
  fundo: string[];
};

/**
 * Wrapper que escolhe entre versão scrolltelling (desktop com
 * hardware decente) e timeline tradicional com slider manual
 * (mobile ou hardware fraco).
 *
 * SSR sempre renderiza a timeline tradicional — em hidratação,
 * desktop suficiente troca pra narrativa. Evita FOUC visível porque
 * o layout interno é semelhante.
 */
export function EvolucaoSection({ topo, coracao, fundo }: Props) {
  const [usarNarrativa, setUsarNarrativa] = useState(false);

  useEffect(() => {
    // Scrolltelling exige tela larga + hardware com folga
    if (!isLowEndDevice() && window.innerWidth >= 1024) {
      setUsarNarrativa(true);
    }
  }, []);

  if (usarNarrativa) {
    return <EvolucaoNarrativa topo={topo} coracao={coracao} fundo={fundo} />;
  }
  return <EvolucaoTimeline topo={topo} coracao={coracao} fundo={fundo} />;
}
