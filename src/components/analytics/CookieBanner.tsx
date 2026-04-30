"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const STORAGE_KEY = "zahir-cookie-consent";
const HAS_ANALYTICS = Boolean(
  process.env.NEXT_PUBLIC_GA4_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID
);

type Consent = "accepted" | "rejected" | null;

/**
 * Banner LGPD, só aparece uma vez.
 * Salva preferência em localStorage.
 * Só renderiza quando existe ID de GA4 ou Meta Pixel (senão, nada a consentir).
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!HAS_ANALYTICS) {
      // Sem analytics ativos, banner não é necessário
      return;
    }

    // Checa consentimento prévio
    const saved = localStorage.getItem(STORAGE_KEY) as Consent;
    if (!saved) {
      // Pequeno delay pra não aparecer instantâneo
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const setConsent = (c: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, c);
    setVisible(false);
    // Recarrega pra aplicar o consent nos scripts
    if (c === "accepted") window.location.reload();
  };

  if (!HAS_ANALYTICS) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-x-4 bottom-4 z-[70] rounded-sm border border-amber/25 bg-cream/95 p-5 shadow-[0_-4px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md md:p-6"
          role="dialog"
          aria-labelledby="cookie-title"
        >
          <div className="flex flex-col gap-4">
            <div>
              <span
                id="cookie-title"
                className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber"
              >
                Cookies
              </span>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">
                Usamos cookies pra melhorar sua experiência e medir desempenho
                das campanhas. Você pode aceitar ou recusar os cookies
                opcionais. Leia a{" "}
                <Link
                  href="/privacidade"
                  className="italic text-amber underline-offset-4 hover:underline"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => setConsent("accepted")}
                className="rounded-full bg-amber px-5 py-2.5 text-[10px] font-sans uppercase tracking-[0.3em] text-ink transition-colors hover:bg-amber-bright"
              >
                Aceitar
              </button>
              <button
                type="button"
                onClick={() => setConsent("rejected")}
                className="rounded-full border border-ink/20 px-5 py-2.5 text-[10px] font-sans uppercase tracking-[0.3em] text-ink/70 transition-all hover:border-amber hover:text-amber"
              >
                Apenas essenciais
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
