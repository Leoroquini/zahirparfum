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
 * Preço de decant/frasco em reais (pode ter decimais — ex: 59.90).
 *
 * Para decants: usa precoDecant5Cent/precoDecant10Cent quando presentes
 * (preços fixos por SKU em centavos). Fallback: 30% (10ml) / 20% (5ml) do
 * frasco cheio, com pisos de 40/25 reais.
 *
 * Para frasco: usa precoPromoCentavos quando disponível (preço promocional
 * individual do SKU lacrado).
 */
export function precoDa(perfume: Perfume, variante: VarianteReserva): number {
  const base = perfume.precoVenda ?? 0;
  if (variante === "frasco") {
    if (perfume.precoPromoCentavos !== undefined) {
      return perfume.precoPromoCentavos / 100;
    }
    return base;
  }
  if (variante === "decant-10") {
    if (perfume.precoDecant10Cent !== undefined) {
      return perfume.precoDecant10Cent / 100;
    }
    return Math.max(40, Math.round(base * 0.3));
  }
  if (variante === "decant-5") {
    if (perfume.precoDecant5Cent !== undefined) {
      return perfume.precoDecant5Cent / 100;
    }
    return Math.max(25, Math.round(base * 0.2));
  }
  return base;
}

/**
 * Diz se o preço desta variante existe DE VERDADE no catálogo, ou se
 * `precoDa()` vai cair no cálculo automático.
 *
 * Isso importa porque o fallback de `precoDa()` (20%/30% do frasco, com pisos
 * de R$ 25 e R$ 40) produz números que ninguém definiu. Hoje 44 dos 45 SKUs
 * femininos não têm `precoDecant5Cent`/`precoDecant10Cent` — só a Khamrah
 * Qahwa tem. No masculino falta só 1.
 *
 * Sem esta checagem o valor calculado não ficava só na tela: ele virava
 * `precoSnapshot` no `addItem()` e era enviado ao cliente dentro da mensagem
 * de reserva do WhatsApp, como se fosse preço fechado.
 *
 * É derivado do catálogo a cada leitura, não persistido — assim, no dia em
 * que o fundador preencher os preços, as listas que já estão no localStorage
 * dos visitantes passam a exibir valor sozinhas.
 */
export function precoDefinido(
  perfume: Perfume,
  variante: VarianteReserva,
): boolean {
  if (variante === "frasco") return perfume.precoVenda !== null;
  if (variante === "decant-10") return perfume.precoDecant10Cent !== undefined;
  if (variante === "decant-5") return perfume.precoDecant5Cent !== undefined;
  return false;
}

export function labelDa(variante: VarianteReserva): string {
  if (variante === "frasco") return "Frasco cheio";
  if (variante === "decant-10") return "Decant 10ml";
  if (variante === "decant-5") return "Decant 5ml";
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
      // quota exceeded etc, silent
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

/**
 * Adiciona um item com preço customizado (usado por kits de preço fixo).
 * Se o item ja existe (mesmo perfume+variante), atualiza o preçoSnapshot
 * pra refletir o preço do kit (mais barato em geral).
 */
export function addItemComPreco(
  perfume: Perfume,
  variante: VarianteReserva,
  preco: number
): void {
  const current = readStorage();
  const idx = current.findIndex(
    (i) => i.perfumeId === perfume.id && i.variante === variante
  );
  if (idx >= 0) {
    const next = [...current];
    next[idx] = { ...next[idx], precoSnapshot: preco };
    writeStorage(next);
    return;
  }
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
