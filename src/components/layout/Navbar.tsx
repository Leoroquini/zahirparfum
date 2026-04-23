"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/mapa", label: "Mapa" },
  { href: "/ritual", label: "O Ritual" },
  { href: "/comparador", label: "Compare" },
  { href: "/curadorias", label: "Curadorias" },
  { href: "/decants", label: "Decants" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || menuOpen
            ? "border-b border-cream/5 bg-ink/75 py-4 backdrop-blur-xl"
            : "py-6"
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-12">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-3"
          >
            <span className="font-display text-xl font-medium tracking-[0.32em] text-cream transition-colors group-hover:text-amber">
              {BRAND.name}
            </span>
            <span className="hidden h-4 w-px bg-cream/20 md:block" />
            <span className="hidden text-[10px] font-sans tracking-[0.45em] text-cream/60 md:block">
              PARFUMS
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-[10px] font-sans uppercase tracking-[0.22em] text-cream/70 xl:gap-8 xl:text-[11px] xl:tracking-[0.25em] lg:flex">
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

          {/* Right side: Busca + Instagram link + Hamburger (mobile) */}
          <div className="flex items-center gap-4 md:gap-5">
            <Link
              href="/buscar"
              aria-label="Buscar"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/75 transition-all hover:border-amber hover:text-amber"
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
            </Link>
            <a
              href={`https://instagram.com/${BRAND.handles.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-[11px] font-sans uppercase tracking-[0.28em] text-cream/80 transition-colors hover:text-amber md:inline-block"
            >
              @{BRAND.handles.instagram}
            </a>

            {/* Hamburger — só mobile/tablet */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              className="group relative z-[60] flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 transition-colors hover:border-amber lg:hidden"
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
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink/95 pt-24 backdrop-blur-2xl lg:hidden"
          >
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
                    className="group block border-b border-cream/5 py-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-3xl font-light text-cream transition-colors group-hover:text-amber">
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
              className="mt-auto flex flex-col gap-3 border-t border-cream/5 px-6 py-8"
            >
              <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
                Siga
              </span>
              <a
                href={`https://instagram.com/${BRAND.handles.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-xl italic text-cream transition-colors hover:text-amber"
              >
                @{BRAND.handles.instagram}
              </a>
              <span className="mt-3 text-[10px] font-sans uppercase tracking-[0.35em] text-cream/40">
                {BRAND.fullName} · {BRAND.city}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
