"use client";

import { useSyncExternalStore } from "react";
import type { Perfume } from "@/data/catalogo";

/**
 * Loja/sistema "Minha Lista de Reserva".
 * Cliente adiciona perfumes (frasco ou decant) → ao final, gera mensagem
 * pré-preenchida pro Instagram DM do @zahirparfums.
 *
 * - Persiste em localStorage
 * - Reativo via useSyncExternalStore (SSR-safe, zero deps)
 * - Sincroniza entre abas via evento storage
 */

export type VarianteReserva = "frasco" | "decant-10" | "decant-5";

export type ItemLista = {
  perfumeId: string;
  variante: VarianteReserva;
  /** Preço calculado no momento da adição (pra não variar se a gente mexer) */
  precoSnapshot: number;
  addedAt: number;
};

const STORAGE_KEY = "zahir-lista-reserva-v1";

/* ---------------- Calc de preço por variante ---------------- */

/**
 * Preço de decant baseado no frasco cheio.
 * Pisos: 25 (5ml) e 40 (10ml) pra não ficar abaixo do custo da embalagem.
 */
export function precoDa(perfume: Perfume, variante: VarianteReserva): number {
  const base = perfume.precoVenda ?? 0;
  if (variante === "frasco") return base;
  if (variante === "decant-10") return Math.max(40, Math.round(base * 0.3));
  if (variante === "decant-5") return Math.max(25, Math.round(base * 0.2));
  return base;
}

export function labelDa(variante: VarianteReserva): string {
  if (variante === "frasco") return "Frasco cheio";
  if (variante === "decant-10") return "Decant 10ml";
  if (variante === "decant-5") return "Decant 5ml";
  return variante;
}

export function labelCurtoDa(variante: VarianteReserva): string {
  if (variante === "frasco") return "Frasco";
  if (variante === "decant-10") return "10ml";
  if (variante === "decant-5") return "5ml";
  return variante;
}

/* ---------------- Store ---------------- */

const listeners = new Set<() => void>();

function readStorage(): ItemLista[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

let cache: ItemLista[] = typeof window !== "undefined" ? readStorage() : [];

function writeStorage(items: ItemLista[]) {
  cache = items;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // quota exceeded etc — silent
    }
  }
  listeners.forEach((cb) => cb());
}

// Sincronização entre abas
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      cache = readStorage();
      listeners.forEach((cb) => cb());
    }
  });
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): ItemLista[] {
  return cache;
}

// Referência estável pra SSR (evita infinite loop do useSyncExternalStore)
const EMPTY_SERVER_SNAPSHOT: ItemLista[] = [];

function getServerSnapshot(): ItemLista[] {
  return EMPTY_SERVER_SNAPSHOT;
}

/* ---------------- Hook ---------------- */

export function useLista(): ItemLista[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* ---------------- Actions ---------------- */

export function addItem(
  perfume: Perfume,
  variante: VarianteReserva = "frasco"
): void {
  const current = readStorage();
  const exists = current.some(
    (i) => i.perfumeId === perfume.id && i.variante === variante
  );
  if (exists) return;

  const preco = precoDa(perfume, variante);
  writeStorage([
    ...current,
    {
      perfumeId: perfume.id,
      variante,
      precoSnapshot: preco,
      addedAt: Date.now(),
    },
  ]);
}

export function removeItem(
  perfumeId: string,
  variante: VarianteReserva
): void {
  const current = readStorage();
  writeStorage(
    current.filter(
      (i) => !(i.perfumeId === perfumeId && i.variante === variante)
    )
  );
}

export function clearLista(): void {
  writeStorage([]);
}

export function isInLista(
  perfumeId: string,
  variante?: VarianteReserva
): boolean {
  const items = cache;
  if (variante) {
    return items.some(
      (i) => i.perfumeId === perfumeId && i.variante === variante
    );
  }
  return items.some((i) => i.perfumeId === perfumeId);
}

export function totalLista(): number {
  return cache.reduce((sum, i) => sum + i.precoSnapshot, 0);
}
