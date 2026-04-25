"use client";

/**
 * Detecta hardware fraco ou preferência do usuário por menos animação.
 * Usado pra desativar Lenis, GrainOverlay e outros efeitos pesados em
 * dispositivos que não aguentam sem perder frames.
 *
 * Regras:
 *   - prefers-reduced-motion: reduce → SEMPRE retorna true
 *   - deviceMemory < 4 GB → fraco
 *   - hardwareConcurrency < 4 cores → fraco
 *   - largura da tela < 768 px (mobile) → fraco por default (pior GPU)
 */
export function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return false;

  // Prefere reduzir movimento
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return true;
  }

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    hardwareConcurrency?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };

  // RAM disponível reportada pelo navegador (Chrome/Edge)
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return true;

  // Número de núcleos lógicos
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 4)
    return true;

  // Data saver ligado ou conexão ruim
  if (nav.connection?.saveData) return true;
  if (
    nav.connection?.effectiveType &&
    ["slow-2g", "2g", "3g"].includes(nav.connection.effectiveType)
  ) {
    return true;
  }

  // Mobile por viewport — GPU costuma ser mais fraca
  if (window.innerWidth < 768) return true;

  return false;
}
