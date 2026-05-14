import type { NextRequest } from "next/server";
import { CATALOGO } from "@/data/catalogo";
import {
  calcularFrete,
  mpAccessToken,
  mpMode,
  siteUrl,
} from "@/lib/checkout-config";

/** Variantes de venda. Espelha lib/lista-store.ts (que é "use client"). */
type VarianteReserva = "frasco" | "decant-10" | "decant-5";

function labelVariante(v: VarianteReserva): string {
  if (v === "frasco") return "Frasco cheio";
  if (v === "decant-10") return "Decant 10ml";
  return "Decant 5ml";
}

/**
 * Cria uma Preference de Checkout Pro no Mercado Pago.
 *
 * Recebe: { items: [{ perfumeId, variante, precoSnapshot }] }
 * Retorna: { initPoint, sandboxInitPoint, preferenceId }
 *
 * Validações server-side:
 *  - perfume existe no catálogo
 *  - precoSnapshot bate com calculo do servidor (anti-tampering simples)
 *  - subtotal positivo
 *
 * Frete vai como item adicional (Checkout Pro não tem campo "shipping"
 * nativo simples; tratar como item é o jeito mais robusto).
 */

export const runtime = "nodejs";

type ItemBody = {
  perfumeId: string;
  variante: VarianteReserva;
  precoSnapshot: number;
};

type Body = {
  items: ItemBody[];
};

const MP_API = "https://api.mercadopago.com";

function precoServidor(perfumeId: string, variante: VarianteReserva): number | null {
  const p = CATALOGO.find((x) => x.id === perfumeId);
  if (!p || p.precoVenda === null) return null;
  const base = p.precoVenda;
  if (variante === "frasco") return base;
  if (variante === "decant-10") return Math.max(40, Math.round(base * 0.3));
  if (variante === "decant-5") return Math.max(25, Math.round(base * 0.2));
  return null;
}

export async function POST(request: NextRequest) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return Response.json(
      { error: "Lista vazia. Adicione perfumes antes de pagar." },
      { status: 400 }
    );
  }

  // Monta itens validados pra Preference
  const mpItems: Array<{
    id: string;
    title: string;
    quantity: number;
    unit_price: number;
    currency_id: "BRL";
    description?: string;
    category_id: string;
  }> = [];

  let subtotal = 0;

  for (const it of body.items) {
    const perfume = CATALOGO.find((p) => p.id === it.perfumeId);
    if (!perfume) {
      return Response.json(
        { error: `Perfume ${it.perfumeId} não encontrado.` },
        { status: 400 }
      );
    }
    const precoOk = precoServidor(it.perfumeId, it.variante);
    if (precoOk === null) {
      return Response.json(
        { error: `Variante inválida pra ${perfume.nome}.` },
        { status: 400 }
      );
    }
    // Anti-tampering: aceita o snapshot só se for >= preço servidor.
    // (>= permite kits com preço promocional aplicado por outros fluxos —
    // mas nunca aceita preço menor que o calculado.)
    const precoFinal = Math.max(precoOk, it.precoSnapshot);

    mpItems.push({
      id: `${it.perfumeId}::${it.variante}`,
      title: `${perfume.nome} — ${labelVariante(it.variante)}`,
      quantity: 1,
      unit_price: precoFinal,
      currency_id: "BRL",
      description: perfume.familia ?? undefined,
      category_id: "fragrances",
    });
    subtotal += precoFinal;
  }

  // Frete como item adicional
  const frete = calcularFrete(subtotal);
  if (frete > 0) {
    mpItems.push({
      id: "frete-padrao",
      title: "Frete (Brasil)",
      quantity: 1,
      unit_price: frete,
      currency_id: "BRL",
      category_id: "shipping",
    });
  }

  const base = siteUrl();
  const isHttps = base.startsWith("https://");

  // MP exige back_urls públicos com HTTPS pra usar auto_return.
  // Em localhost (HTTP), omitimos auto_return — cliente clica em "voltar
  // ao site" manualmente. notification_url também só faz sentido com URL
  // pública: localhost não recebe webhook do MP.
  const preference: Record<string, unknown> = {
    items: mpItems,
    back_urls: {
      success: `${base}/obrigado`,
      pending: `${base}/pagamento-pendente`,
      failure: `${base}/pagamento-erro`,
    },
    statement_descriptor: "ZAHIR PARFUM",
    metadata: {
      origem: "site-zahir",
      modo: mpMode(),
      itens_count: body.items.length,
      subtotal,
      frete,
    },
    // Parcelamento: até 12x. Sem juros por padrão (Mercado Pago absorve
    // ou repassa conforme regra da conta — o vendedor vê na configuração MP).
    payment_methods: {
      installments: 12,
    },
  };

  if (isHttps) {
    preference.auto_return = "approved";
    preference.notification_url = `${base}/api/webhook/mercadopago`;
  }

  let mpResp: Response;
  try {
    mpResp = await fetch(`${MP_API}/checkout/preferences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mpAccessToken()}`,
      },
      body: JSON.stringify(preference),
    });
  } catch (e) {
    console.error("[checkout] erro de rede chamando MP:", e);
    return Response.json(
      { error: "Não foi possível contatar o Mercado Pago. Tente novamente." },
      { status: 502 }
    );
  }

  if (!mpResp.ok) {
    const text = await mpResp.text();
    console.error("[checkout] MP retornou erro:", mpResp.status, text);
    return Response.json(
      { error: "Falha ao criar pagamento.", detalhe: text },
      { status: 502 }
    );
  }

  const data = (await mpResp.json()) as {
    id: string;
    init_point: string;
    sandbox_init_point: string;
  };

  return Response.json({
    preferenceId: data.id,
    initPoint: data.init_point,
    sandboxInitPoint: data.sandbox_init_point,
    mode: mpMode(),
  });
}
