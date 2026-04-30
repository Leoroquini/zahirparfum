"use client";

import { useSyncExternalStore } from "react";

/**
 * Store global de toasts, feedback visual pra ações do usuário.
 * Sem dep externa. Usa o mesmo padrão do lista-store.
 */

export type ToastKind = "success" | "info" | "error";

export type Toast = {
  id: number;
  kind: ToastKind;
  title: string;
  description?: string;
  /** ms até sumir (default 3500) */
  duration?: number;
};

const listeners = new Set<() => void>();
let cache: Toast[] = [];
let nextId = 1;

const EMPTY: Toast[] = [];

function notify() {
  listeners.forEach((cb) => cb());
}

export function pushToast(toast: Omit<Toast, "id">): number {
  const id = nextId++;
  const full: Toast = { id, duration: 3500, ...toast };
  cache = [...cache, full];
  notify();

  if (typeof window !== "undefined" && full.duration) {
    window.setTimeout(() => dismissToast(id), full.duration);
  }

  return id;
}

export function dismissToast(id: number) {
  cache = cache.filter((t) => t.id !== id);
  notify();
}

export function useToasts(): Toast[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => {
        listeners.delete(cb);
      };
    },
    () => cache,
    () => EMPTY
  );
}

/* ---------------- Atalhos semânticos ---------------- */

export const toast = {
  success: (title: string, description?: string) =>
    pushToast({ kind: "success", title, description }),
  info: (title: string, description?: string) =>
    pushToast({ kind: "info", title, description }),
  error: (title: string, description?: string) =>
    pushToast({ kind: "error", title, description, duration: 5000 }),
};
