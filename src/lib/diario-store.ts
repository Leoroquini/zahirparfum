"use client";

import { useSyncExternalStore } from "react";

/**
 * Diário olfativo — registros de uso do cliente.
 *
 * - Persiste em localStorage (sem conta, sem login)
 * - Reativo via useSyncExternalStore
 * - Sincroniza entre abas via evento storage
 *
 * Trade-off conhecido: cliente que troca de celular perde os dados.
 * A página /diario avisa isso e oferece exportar.
 */

export type Sentimento = "amei" | "gostei" | "neutro" | "errou";

export const SENTIMENTOS: { value: Sentimento; label: string; emoji: string }[] = [
  { value: "amei", label: "Amei", emoji: "✦" },
  { value: "gostei", label: "Gostei", emoji: "•" },
  { value: "neutro", label: "Neutro", emoji: "○" },
  { value: "errou", label: "Errei a hora", emoji: "·" },
];

export type Ocasiao =
  | "trabalho"
  | "encontro"
  | "casual"
  | "noite"
  | "academia"
  | "casa"
  | "evento";

export const OCASIOES: { value: Ocasiao; label: string }[] = [
  { value: "trabalho", label: "Trabalho" },
  { value: "encontro", label: "Encontro" },
  { value: "casual", label: "Casual / dia" },
  { value: "noite", label: "Noite / festa" },
  { value: "academia", label: "Academia" },
  { value: "casa", label: "Em casa" },
  { value: "evento", label: "Evento formal" },
];

export type RegistroDiario = {
  id: string;
  perfumeId: string;
  /** Timestamp ms — quando o registro foi adicionado (ou data marcada pelo cliente) */
  data: number;
  ocasiao: Ocasiao;
  sentimento: Sentimento;
  /** Observação livre, opcional (até 240 caracteres) */
  observacao?: string;
};

const STORAGE_KEY = "zahir-diario-v1";

/* ---------------- Store ---------------- */

const listeners = new Set<() => void>();

function readStorage(): RegistroDiario[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

let cache: RegistroDiario[] =
  typeof window !== "undefined" ? readStorage() : [];

function writeStorage(items: RegistroDiario[]) {
  cache = items;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // quota exceeded — silencioso
    }
  }
  listeners.forEach((cb) => cb());
}

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

function getSnapshot(): RegistroDiario[] {
  return cache;
}

const EMPTY_SERVER_SNAPSHOT: RegistroDiario[] = [];
function getServerSnapshot(): RegistroDiario[] {
  return EMPTY_SERVER_SNAPSHOT;
}

/* ---------------- Hook ---------------- */

export function useDiario(): RegistroDiario[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* ---------------- Actions ---------------- */

function gerarId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function addRegistro(
  input: Omit<RegistroDiario, "id" | "data"> & { data?: number },
): RegistroDiario {
  const novo: RegistroDiario = {
    id: gerarId(),
    data: input.data ?? Date.now(),
    perfumeId: input.perfumeId,
    ocasiao: input.ocasiao,
    sentimento: input.sentimento,
    observacao: input.observacao?.trim() || undefined,
  };
  const current = readStorage();
  // Mais recente no topo
  writeStorage([novo, ...current]);
  return novo;
}

export function removeRegistro(id: string): void {
  const current = readStorage();
  writeStorage(current.filter((r) => r.id !== id));
}

export function clearDiario(): void {
  writeStorage([]);
}

/** Total de registros (independente de mês) */
export function totalRegistros(): number {
  return cache.length;
}
