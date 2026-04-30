"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  useLista,
  removeItem,
  clearLista,
  labelDa,
  type ItemLista,
} from "@/lib/lista-store";
import { CATALOGO } from "@/data/catalogo";
import { mensagemLista, linkInstagram, linkWhatsApp } from "@/lib/reserva-dm";
import { events } from "@/lib/track";
import { fotoSrc, hasFoto } from "@/lib/perfume-foto";
import { toast } from "@/lib/toast-store";
import { BRAND } from "@/lib/brand";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Drawer lateral + botão flutuante da "Minha Lista de Reserva".
 * Renderizado globalmente no layout, sempre disponível no canto direito.
 */
export function ListaDrawer() {
  const items = useLista();
  const [open, setOpen] = useState(false);
  const [ajudaOpen, setAjudaOpen] = useState(false);

  const total = items.reduce((sum, i) => sum + i.precoSnapshot, 0);

  // Lock scroll quando drawer aberto
  useEffect(() => {
    if (!open) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleEnviarWa = () => {
    const mensagem = mensagemLista(items);
    const url = linkWhatsApp(mensagem);
    if (!url) return;
    events.enviouListaWa(items.length, total);
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success(
      "Conversa aberta no WhatsApp",
      "Confere a lista, envia e a gente responde em minutos."
    );
    setOpen(false);
  };

  const handleEnviarIg = () => {
    events.enviouListaDm(items.length, total);
    const mensagem = mensagemLista(items);
    const url = linkInstagram(mensagem);
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success(
      "Mensagem aberta no Instagram",
      "Confere a lista no DM e envia."
    );
    setOpen(false);
  };

  return (
    <>
      {/* Botão flutuante, sempre visível, mostra contador se tiver itens */}
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-amber px-5 py-3.5 shadow-[0_8px_32px_rgba(200,155,60,0.35)] transition-all hover:bg-amber-bright hover:shadow-[0_12px_40px_rgba(200,155,60,0.5)] md:bottom-10 md:right-10"
            aria-label="Abrir lista de reserva"
          >
            {items.length > 0 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink/15 text-[11px] font-sans font-medium tabular-nums text-ink">
                {items.length}
              </span>
            )}
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-ink">
              {items.length > 0 ? "Minha lista" : "Lista"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Overlay + drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-cream/70 backdrop-blur-sm"
              aria-hidden
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-hidden border-l border-ink/10 md:max-w-lg"
              role="dialog"
              aria-modal="true"
              aria-label="Minha lista de reserva"
            >
              {/* Header */}
              <header className="flex items-start justify-between gap-4 border-b border-ink/5 px-6 py-5 md:px-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
                    Minha lista de reserva
                  </span>
                  <h2 className="font-display text-2xl font-light text-ink">
                    {items.length === 0
                      ? "Sua lista"
                      : items.length === 1
                      ? "1 fragrância"
                      : `${items.length} fragrâncias`}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-[11px] font-sans uppercase tracking-[0.3em] text-ink/75 transition-colors hover:text-amber"
                  aria-label="Fechar"
                >
                  Fechar ×
                </button>
              </header>

              {/* Corpo */}
              <div className="flex-1 overflow-y-auto px-6 py-4 md:px-8">
                {items.length === 0 ? (
                  <EmptyState />
                ) : (
                  <ul className="flex flex-col gap-3">
                    {items.map((item) => (
                      <ListaItemRow key={`${item.perfumeId}-${item.variante}`} item={item} />
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer, ações */}
              {items.length > 0 && (
                <footer className="border-t border-ink/5 bg-cream/60 px-6 py-6 md:px-8">
                  <div className="mb-4 flex items-baseline justify-between gap-2">
                    <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-ink/70">
                      Total estimado
                    </span>
                    <span className="font-display text-3xl font-light text-ink">
                      R${" "}
                      {total.toLocaleString("pt-BR", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <p className="mb-5 text-[11px] italic leading-relaxed text-ink/65">
                    Frete não incluso. O valor final é confirmado no DM depois
                    do seu CEP, ou no Pix.
                  </p>

                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={handleEnviarWa}
                      className="group flex w-full items-center justify-center gap-3 rounded-full bg-amber px-6 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
                    >
                      Fechar pelo WhatsApp
                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={handleEnviarIg}
                      className="group flex w-full items-center justify-center gap-3 rounded-full border border-ink/25 bg-cream/40 px-6 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-ink/85 transition-all hover:border-amber hover:text-amber"
                    >
                      Fechar pelo Instagram
                      <span className="opacity-60 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                        →
                      </span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (
                        confirm("Limpar toda a lista?")
                      ) {
                        clearLista();
                      }
                    }}
                    className="mt-5 w-full text-center text-[10px] font-sans uppercase tracking-[0.3em] text-ink/75 transition-colors hover:text-wine"
                  >
                    Limpar lista
                  </button>
                </footer>
              )}

              {/* Ajuda, disponível independente de ter itens na lista */}
              <AjudaSection
                open={ajudaOpen}
                onToggle={() => setAjudaOpen((p) => !p)}
                onCloseDrawer={() => setOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Empty state ---------------- */

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-5 py-10 text-center">
      <span className="font-display text-5xl italic text-amber/40">∅</span>
      <div className="flex flex-col gap-2">
        <p className="font-display text-xl font-light text-ink">
          Sua lista está vazia.
        </p>
        <p className="max-w-xs text-sm leading-relaxed text-ink/75">
          Adicione perfumes pelo{" "}
          <Link
            href="/catalogo"
            className="italic text-amber underline-offset-4 hover:underline"
          >
            catálogo
          </Link>{" "}
          e envie tudo de uma vez pro Instagram.
        </p>
      </div>
    </div>
  );
}

/* ---------------- Item row ---------------- */

function ListaItemRow({ item }: { item: ItemLista }) {
  const perfume = CATALOGO.find((p) => p.id === item.perfumeId);
  if (!perfume) return null;

  return (
    <li className="group relative flex items-start gap-4 rounded-sm border border-ink/10 bg-cream/40 p-3 transition-colors hover:border-amber/40">
      {/* Thumb */}
      {hasFoto(perfume) && (
        <Link
          href={`/perfume/${perfume.id}`}
          className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-sm border border-ink/10"
          aria-hidden
          tabIndex={-1}
        >
          <Image
            src={fotoSrc(perfume)}
            alt=""
            fill
            sizes="80px"
            className="object-cover"
          />
        </Link>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5">
        <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-amber/80">
          Nº {String(perfume.numero).padStart(2, "0")} ·{" "}
          {labelDa(item.variante)}
        </span>
        <Link
          href={`/perfume/${perfume.id}`}
          className="font-display text-base font-light leading-tight text-ink transition-colors hover:text-amber md:text-lg"
        >
          {perfume.nome}
        </Link>
        {perfume.marca && (
          <span className="text-xs italic text-ink/70">{perfume.marca}</span>
        )}
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
        <span className="font-display text-lg font-light text-ink md:text-xl">
          R$ {item.precoSnapshot}
        </span>
        <button
          type="button"
          onClick={() => removeItem(item.perfumeId, item.variante)}
          className="text-[9px] font-sans uppercase tracking-[0.3em] text-ink/75 transition-colors hover:text-wine"
          aria-label={`Remover ${perfume.nome} da lista`}
        >
          Remover
        </button>
      </div>
    </li>
  );
}

/* ---------------- Ajuda Section (integrada ao drawer) ---------------- */

function AjudaSection({
  open,
  onToggle,
  onCloseDrawer,
}: {
  open: boolean;
  onToggle: () => void;
  onCloseDrawer: () => void;
}) {
  return (
    <div className="border-t border-ink/5">
      {/* Toggle "Precisa de ajuda?" */}
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-3 px-6 py-4 text-left transition-colors hover:bg-cream/40 md:px-8"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-amber/40 font-display text-base italic text-amber transition-colors group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
            ?
          </span>
          <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-ink/75 group-hover:text-ink">
            Precisa de ajuda?
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs text-ink/70 group-hover:text-amber"
        >
          ▾
        </motion.span>
      </button>

      {/* Conteúdo expansível */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-6 pb-6 md:px-8">
              {/* Links institucionais (mais compacto) */}
              <nav className="flex flex-col gap-1">
                <AjudaLink
                  href="/como-comprar"
                  titulo="Como comprar"
                  descricao="Fluxo em 5 passos."
                  onClick={onCloseDrawer}
                />
                <AjudaLink
                  href="/entrega"
                  titulo="Entrega e frete"
                  descricao="Prazos e rastreamento."
                  onClick={onCloseDrawer}
                />
                <AjudaLink
                  href="/trocas-e-devolucoes"
                  titulo="Trocas e devoluções"
                  descricao="7 dias pra arrepender."
                  onClick={onCloseDrawer}
                />
                <AjudaLink
                  href="/faq"
                  titulo="Perguntas frequentes"
                  descricao="Sobre perfumes e decants."
                  onClick={onCloseDrawer}
                />
              </nav>

              {/* Contato direto */}
              <div className="border-t border-ink/5 pt-4">
                <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
                  Falar direto
                </span>
                <p className="mt-1 text-[11px] italic text-ink/70">
                  Atendimento das 9h às 22h · resposta em 10–20 min.
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/${BRAND.whatsapp.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-full border border-amber/40 px-4 py-2.5 text-[10px] font-sans uppercase tracking-[0.3em] text-ink transition-colors hover:border-amber hover:bg-amber hover:text-ink"
                  >
                    <span>WhatsApp · {BRAND.whatsapp.display}</span>
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                  <a
                    href={`https://instagram.com/${BRAND.handles.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-full border border-ink/20 px-4 py-2.5 text-[10px] font-sans uppercase tracking-[0.3em] text-ink/80 transition-colors hover:border-amber hover:text-amber"
                  >
                    <span>Instagram · @{BRAND.handles.instagram}</span>
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
      className="group flex items-start gap-3 rounded-sm border border-transparent py-2 transition-colors hover:border-amber/30"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="font-display text-base font-light text-ink transition-colors group-hover:text-amber">
          {titulo}
        </span>
        <span className="text-[11px] italic text-ink/70">{descricao}</span>
      </div>
      <span className="mt-1 text-xs text-amber opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
        →
      </span>
    </Link>
  );
}
