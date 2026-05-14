"use client";

import { usePathname } from "next/navigation";

/**
 * "Mundo" do site — qual universo o usuário está navegando.
 *
 * - "ele" → rotas masculinas em /ele/*
 * - "ela" → rotas femininas em /ela/*
 * - "raiz" → home unissex e páginas neutras (contato, faq, entrega, etc)
 *
 * Usado pela Navbar/Footer contextuais e pra cross-sell entre mundos.
 */

export type Mundo = "ele" | "ela" | "raiz";

export function detectarMundo(pathname: string | null): Mundo {
  if (!pathname) return "raiz";
  if (pathname === "/ele" || pathname.startsWith("/ele/")) return "ele";
  if (pathname === "/ela" || pathname.startsWith("/ela/")) return "ela";
  return "raiz";
}

export function useMundo(): Mundo {
  const pathname = usePathname();
  return detectarMundo(pathname);
}

/** Devolve o prefixo do mundo atual ("/ele", "/ela", ""). Útil pra montar links contextuais. */
export function prefixoMundo(mundo: Mundo): string {
  if (mundo === "ele") return "/ele";
  if (mundo === "ela") return "/ela";
  return "";
}

/** Devolve o "outro" mundo para o toggle Ele↔Ela. Raiz vira "ele" por default. */
export function mundoOposto(mundo: Mundo): "ele" | "ela" {
  if (mundo === "ela") return "ele";
  return "ela";
}
