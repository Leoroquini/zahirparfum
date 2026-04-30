"use client";

import { Manifesto } from "@/components/sections/Manifesto";

/**
 * Wrapper estável para evitar troca de árvore entre SSR e hidratação.
 */
export function ManifestoSection() {
  return <Manifesto hideIntro />;
}
