"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { BRAND } from "@/lib/brand";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Bubble de ajuda flutuante.
 * Desktop: lateral direita, meio da tela (padrão chat de suporte).
 * Mobile: inferior direito, acima do ListaDrawer quando este estiver ativo.
 *
 * Clica → drawer lateral com as 4 páginas institucionais críticas
 * + atalhos de contato direto (IG/WhatsApp).
 */
export function AjudaFloat() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Botão flutuante */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1, ease: EASE_OUT }}
        className="fixed right-4 bottom-24 z-40 md:right-6 md:top-1/2 md:bottom-auto md:-translate-y-1/2"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir ajuda"
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-amber/40 bg-ink/90 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all hover:border-amber hover:bg-amber hover:shadow-[0_8px_28px_rgba(200,155,60,0.3)] md:h-14 md:w-14"
        >
          <span className="font-display text-2xl font-light italic text-amber transition-colors group-hover:text-ink md:text-3xl">
            ?
          </span>
        </button>
      </motion.div>

      {/* Drawer de ajuda */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm"
              aria-hidden
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-y-auto border-l border-cream/10 bg-ink-soft"
              role="dialog"
              aria-modal="true"
              aria-label="Ajuda"
            >
              {/* Header */}
              <header className="flex items-start justify-between gap-4 border-b border-cream/5 px-6 py-5 md:px-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
                    Ajuda rápida
                  </span>
                  <h2 className="font-display text-2xl font-light text-cream">
                    Como podemos te ajudar?
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-[11px] font-sans uppercase tracking-[0.3em] text-cream/60 transition-colors hover:text-amber"
                  aria-label="Fechar"
                >
                  Fechar ×
                </button>
              </header>

              {/* Links institucionais */}
              <nav className="flex flex-col gap-1 px-6 py-5 md:px-8">
                <AjudaLink
                  href="/como-comprar"
                  titulo="Como comprar"
                  descricao="Fluxo em 5 passos — da escolha à entrega."
                  onClick={() => setOpen(false)}
                />
                <AjudaLink
                  href="/entrega"
                  titulo="Entrega e frete"
                  descricao="Prazos, formas de envio, rastreamento."
                  onClick={() => setOpen(false)}
                />
                <AjudaLink
                  href="/trocas-e-devolucoes"
                  titulo="Trocas e devoluções"
                  descricao="7 dias pra arrepender — sem complicação."
                  onClick={() => setOpen(false)}
                />
                <AjudaLink
                  href="/faq"
                  titulo="Perguntas frequentes"
                  descricao="Sobre perfumes, decants, pagamento, entrega."
                  onClick={() => setOpen(false)}
                />
              </nav>

              {/* Contato direto */}
              <div className="border-t border-cream/5 px-6 py-6 md:px-8">
                <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
                  Falar direto
                </span>
                <p className="mt-2 text-xs italic text-cream/55">
                  Atendimento das 9h às 22h · tempo médio 10–20 min.
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={`https://instagram.com/${BRAND.handles.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-full bg-amber px-5 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-colors hover:bg-amber-bright"
                  >
                    <span>Instagram · @{BRAND.handles.instagram}</span>
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                  <span className="flex items-center justify-between gap-3 rounded-full border border-cream/15 px-5 py-3 text-[11px] font-sans uppercase tracking-[0.3em] text-cream/50">
                    <span>WhatsApp · em breve</span>
                  </span>
                </div>

                <Link
                  href="/contato"
                  onClick={() => setOpen(false)}
                  className="mt-4 block text-center text-[10px] font-sans uppercase tracking-[0.35em] text-amber underline-offset-4 hover:underline"
                >
                  Ver todos os canais de contato
                </Link>
              </div>

              {/* Legal */}
              <div className="mt-auto border-t border-cream/5 px-6 py-4 md:px-8">
                <div className="flex items-center justify-between gap-4 text-[10px] font-sans uppercase tracking-[0.35em] text-cream/40">
                  <Link
                    href="/termos"
                    onClick={() => setOpen(false)}
                    className="transition-colors hover:text-amber"
                  >
                    Termos
                  </Link>
                  <span className="text-cream/20">·</span>
                  <Link
                    href="/privacidade"
                    onClick={() => setOpen(false)}
                    className="transition-colors hover:text-amber"
                  >
                    Privacidade
                  </Link>
                  <span className="text-cream/20">·</span>
                  <Link
                    href="/manifesto"
                    onClick={() => setOpen(false)}
                    className="transition-colors hover:text-amber"
                  >
                    Manifesto
                  </Link>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function AjudaLink({
  href,
  titulo,
  descricao,
  onClick,
}: {
  href: string;
  titulo: string;
  descricao: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-start gap-4 rounded-sm border border-transparent px-3 py-3 transition-all hover:border-amber/30 hover:bg-ink/60"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="font-display text-lg font-light text-cream transition-colors group-hover:text-amber">
          {titulo}
        </span>
        <span className="text-xs italic text-cream/55">{descricao}</span>
      </div>
      <span className="mt-2 text-sm text-amber opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
        →
      </span>
    </Link>
  );
}
