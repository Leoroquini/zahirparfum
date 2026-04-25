"use client";

import { useEffect, useState } from "react";
import { isLowEndDevice } from "@/lib/device";
import { Manifesto } from "@/components/sections/Manifesto";
import { ManifestoNarrativa } from "@/components/sections/ManifestoNarrativa";

/**
 * Wrapper: scrolltelling em desktop com hardware decente, manifesto
 * tradicional em mobile/low-end. SSR sempre serve a versão tradicional
 * pra TTI rápido — pós-hidratação troca pra narrativa quando aplicável.
 */
export function ManifestoSection() {
  const [usarNarrativa, setUsarNarrativa] = useState(false);

  useEffect(() => {
    if (!isLowEndDevice() && window.innerWidth >= 1024) {
      setUsarNarrativa(true);
    }
  }, []);

  if (usarNarrativa) return <ManifestoNarrativa />;
  return <Manifesto hideIntro />;
}
