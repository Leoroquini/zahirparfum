"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/cn";
import { useMundo } from "@/lib/mundo";

/**
 * NAV_LINKS_ELE — masculino (rotas atuais). Curadorias removidas a pedido do
 * Leo em 2026-05-12: vão aparecer só na página /curadorias dedicada.
 */
const NAV_LINKS_ELE = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/mapa", label: "Mapa" },
  { href: "/ritual", label: "O Ritual" },
  { href: "/comparador", label: "Comparar" },
  { href: "/decants", label: "Decants" },
];

const NAV_LINKS_ELA = [
  { href: "/ela/catalogo", label: "Catálogo" },
  { href: "/ela/mapa", label: "Mapa" },
  { href: "/ela/ritual", label: "O Ritual" },
  { href: "/ela/comparador", label: "Comparar" },
  { href: "/ela/decants", label: "Decants" },
];

const NAV_LINKS_RAIZ = NAV_LINKS_ELE;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mundo = useMundo();
  const NAV_LINKS =
    mundo === "ela"
      ? NAV_LINKS_ELA
      : mundo === "ele"
        ? NAV_LINKS_ELE
        : NAV_LINKS_RAIZ;

  // Na LP raiz (vestíbulo), navbar só aparece quando rola pra baixo do hero.
  // Hero é 100vh, então usa threshold maior pra esconder durante o vestíbulo.
  const isRaiz = mundo === "raiz";
  const scrollThreshold = isRaiz ? 600 : 40;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > scrollThreshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollThreshold]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
    };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Em /, navbar fica oculta enquanto vestíbulo está visível
  // (early return DEPOIS de todos os hooks pra respeitar rules-of-hooks)
  if (isRaiz && !scrolled && !menuOpen) {
    return null;
  }

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || menuOpen
            ? "border-b border-ink/5 bg-cream/75 py-4 backdrop-blur-xl"
            : "py-6"
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-12">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-3"
          >
            <span className="font-display text-xl font-medium tracking-[0.32em] text-ink transition-colors group-hover:text-amber">
              {BRAND.name}
            </span>
            <span className="hidden h-4 w-px bg-cream/20 md:block" />
            <span className="hidden text-[10px] font-sans tracking-[0.45em] text-ink/75 md:block">
              PARFUMS
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-[10px] font-sans uppercase tracking-[0.22em] text-ink/70 xl:gap-8 xl:text-[11px] xl:tracking-[0.25em] lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-amber"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Toggle Ele/Ela + Busca + Instagram + Hamburger */}
          <div className="flex items-center gap-3 md:gap-4">
            {mundo !== "raiz" && (
              <div
                role="group"
                aria-label="Trocar entre linha masculina e feminina"
                className="hidden items-center rounded-full border border-ink/15 p-0.5 text-[10px] font-sans uppercase tracking-[0.28em] sm:flex"
              >
                <Link
                  href="/ele"
                  aria-current={mundo === "ele" ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-1 transition-colors",
                    mundo === "ele"
                      ? "bg-amber text-ink"
                      : "text-ink/75 hover:text-amber",
                  )}
                >
                  Ele
                </Link>
                <Link
                  href="/ela"
                  aria-current={mundo === "ela" ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-1 transition-colors",
                    mundo === "ela"
                      ? "bg-amber text-ink"
                      : "text-ink/75 hover:text-amber",
                  )}
                >
                  Ela
                </Link>
              </div>
            )}
            <Link
              href="/buscar"
              aria-label="Buscar (atalho: tecla /)"
              title="Buscar · atalho /"
              className="group flex items-center gap-2 rounded-full border border-ink/15 py-1.5 pl-3 pr-2 text-ink/75 transition-all hover:border-amber hover:text-amber md:pl-3.5 md:pr-2.5"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              >
                <circle cx="6" cy="6" r="4.5" />
                <line x1="9.5" y1="9.5" x2="12.5" y2="12.5" />
              </svg>
              <kbd className="hidden rounded border border-ink/20 bg-cream/60 px-1.5 py-px text-[10px] font-sans tabular-nums text-ink/75 md:inline-block">
                /
              </kbd>
            </Link>
            <a
              href={`https://instagram.com/${BRAND.handles.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-[11px] font-sans uppercase tracking-[0.28em] text-ink/80 transition-colors hover:text-amber md:inline-block"
            >
              @{BRAND.handles.instagram}
            </a>

            {/* Hamburger, só mobile/tablet */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              className="group relative z-[60] flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 transition-colors hover:border-amber lg:hidden"
            >
              <span className="flex flex-col gap-1.5">
                <motion.span
                  animate={
                    menuOpen
                      ? { rotate: 45, y: 5, backgroundColor: "#E7B659" }
                      : { rotate: 0, y: 0, backgroundColor: "#F4E9D4" }
                  }
                  transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                  className="block h-px w-4"
                />
                <motion.span
                  animate={
                    menuOpen
                      ? { rotate: -45, y: -2, backgroundColor: "#E7B659" }
                      : { rotate: 0, y: 0, backgroundColor: "#F4E9D4" }
                  }
                  transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                  className="block h-px w-4"
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-cream/95 pt-24 backdrop-blur-2xl lg:hidden"
          >
            {/* Toggle Ele/Ela no topo do menu mobile */}
            <div className="flex justify-center gap-2 px-6 pb-3">
              <Link
                href="/ele"
                onClick={() => setMenuOpen(false)}
                aria-current={mundo === "ele" ? "page" : undefined}
                className={cn(
                  "flex-1 rounded-full border py-2.5 text-center text-[11px] font-sans uppercase tracking-[0.3em] transition-colors",
                  mundo === "ele"
                    ? "border-amber bg-amber text-ink"
                    : "border-ink/15 text-ink/75",
                )}
              >
                Para ele
              </Link>
              <Link
                href="/ela"
                onClick={() => setMenuOpen(false)}
                aria-current={mundo === "ela" ? "page" : undefined}
                className={cn(
                  "flex-1 rounded-full border py-2.5 text-center text-[11px] font-sans uppercase tracking-[0.3em] transition-colors",
                  mundo === "ela"
                    ? "border-amber bg-amber text-ink"
                    : "border-ink/15 text-ink/75",
                )}
              >
                Para ela
              </Link>
            </div>

            <nav className="flex flex-col gap-1 px-6 py-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.06,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group block border-b border-ink/5 py-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-3xl font-light text-ink transition-colors group-hover:text-amber">
                        {link.label}
                      </span>
                      <span className="text-amber opacity-60 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                        →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-auto flex flex-col gap-3 border-t border-ink/5 px-6 py-8"
            >
              <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
                Siga
              </span>
              <a
                href={`https://instagram.com/${BRAND.handles.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-xl italic text-ink transition-colors hover:text-amber"
              >
                @{BRAND.handles.instagram}
              </a>
              <span className="mt-3 text-[10px] font-sans uppercase tracking-[0.35em] text-ink/75">
                {BRAND.fullName} · {BRAND.city}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
