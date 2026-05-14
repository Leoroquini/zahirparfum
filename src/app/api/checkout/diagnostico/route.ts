import { mpAccessToken, mpMode, siteUrl } from "@/lib/checkout-config";

/**
 * Diagnóstico de configuração do checkout. NÃO cria cobrança.
 *
 * Valida:
 *  - Variáveis de env presentes
 *  - Access Token aceito pela API do MP (faz uma chamada inofensiva)
 *  - Modo configurado e URL do site
 *
 * Acesse em: http://localhost:PORT/api/checkout/diagnostico
 *
 * Em produção, esse endpoint vaza informação útil pra atacantes —
 * proteger ou remover antes de ir live.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, unknown> = {};

  let token = "";
  try {
    token = mpAccessToken();
    checks.access_token_presente = true;
    checks.access_token_tipo = token.startsWith("TEST-") ? "test" : "production";
    checks.access_token_prefix = token.slice(0, 12) + "…";
  } catch (e) {
    checks.access_token_presente = false;
    checks.erro_token = e instanceof Error ? e.message : String(e);
    return Response.json({ ok: false, checks }, { status: 500 });
  }

  checks.modo_declarado = mpMode();
  checks.site_url = siteUrl();
  checks.public_key_definida = !!process.env.MERCADOPAGO_PUBLIC_KEY;

  // Coerência: token TEST + modo production é inconsistente, e vice-versa
  const tipoTokenReal = token.startsWith("TEST-") ? "test" : "production";
  if (tipoTokenReal !== checks.modo_declarado) {
    checks.aviso_coerencia = `MERCADOPAGO_MODE=${checks.modo_declarado} mas token é ${tipoTokenReal}. Isso pode causar comportamento inesperado.`;
  }

  // Chama um endpoint inofensivo do MP pra validar credencial
  let mpResp: Response;
  try {
    mpResp = await fetch(
      "https://api.mercadopago.com/v1/payment_methods",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (e) {
    checks.api_mp_alcancavel = false;
    checks.erro_rede = e instanceof Error ? e.message : String(e);
    return Response.json({ ok: false, checks }, { status: 502 });
  }

  checks.api_mp_status = mpResp.status;
  if (!mpResp.ok) {
    const body = await mpResp.text();
    checks.api_mp_aceitou_token = false;
    checks.api_mp_erro = body.slice(0, 500);
    return Response.json({ ok: false, checks }, { status: 401 });
  }

  const metodos = (await mpResp.json()) as Array<{ id: string; name: string; payment_type_id: string }>;
  checks.api_mp_aceitou_token = true;
  checks.metodos_disponiveis = metodos.length;
  checks.tem_pix = metodos.some((m) => m.id === "pix" || m.payment_type_id === "bank_transfer");
  checks.tem_credit_card = metodos.some((m) => m.payment_type_id === "credit_card");
  checks.tem_boleto = metodos.some((m) => m.id === "bolbradesco");
  checks.todos_ids = metodos.map((m) => m.id);

  return Response.json({ ok: true, checks });
}
