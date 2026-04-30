"use client";

import { useEffect } from "react";
import { useLista } from "@/lib/lista-store";
import { pushToast, dismissToast } from "@/lib/toast-store";

/**
 * Quando o cliente retorna ao site com itens ainda na lista,
 * mostra um toast de lembrança. Uma vez por sessão.
 */
const SESSION_KEY = "zahir-lista-retorno-shown";

export function ListaRetornoNudge() {
  const items = useLista();

  useEffect(() => {
    // Só mostra uma vez por sessão do navegador
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    // Espera um pouco após carregar pra não ser intrusivo
    const timer = setTimeout(() => {
      if (items.length > 0 && !sessionStorage.getItem(SESSION_KEY)) {
        sessionStorage.setItem(SESSION_KEY, "1");
        const nomeSimplificado =
          items.length === 1
            ? "1 fragrância"
            : `${items.length} fragrâncias`;
        const id = pushToast({
          kind: "info",
          title: `${nomeSimplificado} esperando você`,
          description:
            "Sua lista do último acesso tá guardada. Abre o botão no canto direito pra revisar ou enviar pro Instagram.",
          duration: 8000,
        });
        // segurança: força dismiss se não sumir
        setTimeout(() => dismissToast(id), 9000);
      }
    }, 2500);

    return () => clearTimeout(timer);
    // intencional, checa só na montagem inicial
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
