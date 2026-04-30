"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  useToasts,
  dismissToast,
  type Toast,
  type ToastKind,
} from "@/lib/toast-store";

const EASE = [0.19, 1, 0.22, 1] as const;

const KIND_COLOR: Record<ToastKind, string> = {
  success: "border-amber/50 bg-cream/95",
  info: "border-ink/20 bg-cream/95",
  error: "border-wine/60 bg-cream/95",
};

const KIND_ICON: Record<ToastKind, string> = {
  success: "✦",
  info: "·",
  error: "×",
};

const KIND_ICON_COLOR: Record<ToastKind, string> = {
  success: "text-amber",
  info: "text-ink/80",
  error: "text-ink",
};

/**
 * Stack de toasts, canto inferior central, empilha até 5.
 * Renderizado globalmente via layout.
 */
export function ToastStack() {
  const toasts = useToasts();

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex flex-col items-center gap-2 px-4 md:bottom-10"
    >
      <AnimatePresence initial={false}>
        {toasts.slice(-5).map((t) => (
          <ToastItem key={t.id} toast={t} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast }: { toast: Toast }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.96, transition: { duration: 0.25 } }}
      transition={{ duration: 0.4, ease: EASE }}
      className={`pointer-events-auto flex min-w-[260px] max-w-md items-start gap-3 rounded-sm border ${
        KIND_COLOR[toast.kind]
      } px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl md:min-w-[320px]`}
      role="status"
    >
      <span
        aria-hidden
        className={`mt-0.5 font-display text-lg italic leading-none ${
          KIND_ICON_COLOR[toast.kind]
        }`}
      >
        {KIND_ICON[toast.kind]}
      </span>
      <div className="flex-1">
        <p className="text-sm font-sans text-ink">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-xs italic text-ink/70">
            {toast.description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => dismissToast(toast.id)}
        className="shrink-0 text-xs text-ink/75 transition-colors hover:text-ink"
        aria-label="Fechar"
      >
        ×
      </button>
    </motion.div>
  );
}
