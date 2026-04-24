"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Atalho de teclado global:
 * - `/` ou `Cmd/Ctrl+K` → vai pra página de busca
 * Ignora quando o foco está num input (pra não atrapalhar digitação).
 */
export function BuscaShortcut() {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignora se está em input/textarea/contentEditable
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) {
          return;
        }
      }

      const isSlash = e.key === "/";
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";

      if (isSlash || isCmdK) {
        e.preventDefault();
        router.push("/buscar");
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return null;
}
