import type { NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { mpAccessToken, mpWebhookSecret } from "@/lib/checkout-config";

/**
 * Webhook do Mercado Pago.
 *
 * Recebe notificações de mudança de pagamento. O MP envia
 * `{ type: "payment", data: { id: "<paymentId>" } }` (entre outros eventos).
 *
 * Validação de assinatura (https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks):
 *  - Header `x-signature` no formato `ts=<timestamp>,v1=<hash>`
 *  - Header `x-request-id`
 *  - Manifest: `id:<dataId>;request-id:<requestId>;ts:<ts>;`
 *  - HMAC SHA256 do manifest com a "Assinatura secreta" do painel
 *
 * Se a assinatura não bater, devolve 401 — protege contra atacante forjando
 * pedidos pra esse endpoint público.
 *
 * O MP repete o webhook se a gente não responder 200/201. Em erros não-críticos
 * (ex: payment já processado), responder 200 e logar evita tempestade de retries.
 */

export const runtime = "nodejs";

type Notif = {
  type?: string;
  action?: string;
  data?: { id?: string };
  // Formatos antigos / via query também:
  topic?: string;
  resource?: string;
};

function validarAssinatura(
  secret: string,
  signatureHeader: string | null,
  requestId: string | null,
  dataId: string | null
): boolean {
  if (!signatureHeader) return false;

  // Header: "ts=1700000000,v1=abcdef..."
  const parts = signatureHeader.split(",").map((p) => p.trim());
  const ts = parts.find((p) => p.startsWith("ts="))?.slice(3);
  const v1 = parts.find((p) => p.startsWith("v1="))?.slice(3);
  if (!ts || !v1) return false;

  // Manifest precisa do dataId. Se não houver (eventos sem data.id), só valida ts+request-id.
  const manifest = `id:${dataId ?? ""};request-id:${requestId ?? ""};ts:${ts};`;
  const expected = createHmac("sha256", secret).update(manifest).digest("hex");

  // timingSafeEqual exige buffers do mesmo tamanho
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(v1, "hex");
  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  let payload: Notif = {};
  try {
    payload = (await request.json()) as Notif;
  } catch {
    // MP às vezes manda querystring sem body — tudo bem, pega de nextUrl
  }

  const url = request.nextUrl;
  const topic =
    payload.type ||
    payload.topic ||
    url.searchParams.get("type") ||
    url.searchParams.get("topic");
  const id =
    payload.data?.id ||
    url.searchParams.get("data.id") ||
    url.searchParams.get("id");

  // Validação de assinatura. Em dev (sem secret configurado) aceita tudo.
  const secret = mpWebhookSecret();
  if (secret) {
    const ok = validarAssinatura(
      secret,
      request.headers.get("x-signature"),
      request.headers.get("x-request-id"),
      id ?? null
    );
    if (!ok) {
      console.warn("[webhook] assinatura inválida — request rejeitado", {
        topic,
        id,
        request_id: request.headers.get("x-request-id"),
      });
      return new Response("invalid signature", { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    // Em produção sem secret é erro de configuração — loga forte mas
    // ainda processa pra não derrubar pedidos enquanto a env var é ajustada.
    console.error(
      "[webhook] MERCADOPAGO_WEBHOOK_SECRET ausente em produção. Configure no painel da Vercel."
    );
  }

  if (topic !== "payment" || !id) {
    // Outros eventos (merchant_order, etc) — ignorar por enquanto
    console.log("[webhook] evento não-tratado:", { topic, id });
    return new Response("ok", { status: 200 });
  }

  try {
    const r = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: { Authorization: `Bearer ${mpAccessToken()}` },
    });
    if (!r.ok) {
      console.error("[webhook] falha ao buscar payment", id, r.status);
      return new Response("ok", { status: 200 });
    }
    const payment = (await r.json()) as {
      id: number;
      status: string;
      status_detail: string;
      transaction_amount: number;
      payer?: { email?: string; first_name?: string; last_name?: string };
      additional_info?: {
        items?: Array<{ title: string; quantity: number; unit_price: number }>;
      };
      metadata?: Record<string, unknown>;
    };

    console.log("[webhook] payment recebido:", {
      id: payment.id,
      status: payment.status,
      detail: payment.status_detail,
      valor: payment.transaction_amount,
      email: payment.payer?.email,
      nome: [payment.payer?.first_name, payment.payer?.last_name]
        .filter(Boolean)
        .join(" "),
      itens: payment.additional_info?.items?.map((i) => i.title),
      metadata: payment.metadata,
    });

    // TODO (próxima iteração):
    //  - if (payment.status === "approved") { salvarPedido(payment); enviarEmail(payment); }
    //  - if (payment.status === "refunded") { marcarReembolsado(payment); }
  } catch (e) {
    console.error("[webhook] erro processando payment:", e);
  }

  return new Response("ok", { status: 200 });
}

// Aceita GET também — MP às vezes faz health check
export async function GET() {
  return new Response("ok", { status: 200 });
}
