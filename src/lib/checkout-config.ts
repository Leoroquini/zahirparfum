/**
 * Configuração do checkout (Mercado Pago Checkout Pro).
 *
 * Frete: regra fixa enquanto não houver Melhor Envio.
 *  - Brasil todo: R$ 25 fixo
 *  - Grátis acima de R$ 400
 *
 * Env vars (ver .env.local.example):
 *  - MERCADOPAGO_ACCESS_TOKEN  → secreto, server-side, criação de Preference + webhook
 *  - MERCADOPAGO_PUBLIC_KEY    → público, opcional (Bricks no futuro)
 *  - MERCADOPAGO_MODE          → "test" | "production" (afeta logs e validação)
 *  - SITE_URL                  → base pública usada nos back_urls/notification_url
 *  - PEDIDO_NOTIFICA_EMAIL     → email pra onde cai notificação de venda (futuro)
 */

export const FRETE = {
  valorPadrao: 25,
  freteGratisAcima: 400,
} as const;

export function calcularFrete(subtotal: number): number {
  if (subtotal >= FRETE.freteGratisAcima) return 0;
  return FRETE.valorPadrao;
}

export function freteLabel(subtotal: number): string {
  const v = calcularFrete(subtotal);
  return v === 0 ? "Frete grátis" : `Frete R$ ${v}`;
}

/* ---------------- env helpers ---------------- */

export function mpAccessToken(): string {
  const t = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!t) {
    throw new Error(
      "MERCADOPAGO_ACCESS_TOKEN ausente. Defina em .env.local (ver .env.local.example)."
    );
  }
  return t;
}

export function mpMode(): "test" | "production" {
  return process.env.MERCADOPAGO_MODE === "production" ? "production" : "test";
}

export function siteUrl(): string {
  return (
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
  );
}

/**
 * "Assinatura secreta" do webhook do MP. Usada pra validar que a notificação
 * veio do MP, não de um atacante. Configurada no painel:
 *   Aplicação > Webhooks > "Assinatura secreta" (campo gerado pelo MP)
 *
 * Retorna null quando não configurada — nesse caso o webhook aceita tudo
 * (modo dev). Em produção sempre defina.
 */
export function mpWebhookSecret(): string | null {
  return process.env.MERCADOPAGO_WEBHOOK_SECRET || null;
}
