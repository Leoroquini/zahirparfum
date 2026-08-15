/**
 * URL pública do site.
 *
 * CUIDADO COM A GRAFIA — o domínio é SINGULAR e o Instagram é PLURAL:
 *   domínio  → zahirparfum.com.br
 *   handle   → @zahirparfums  (ver BRAND.handles.instagram em lib/brand.ts)
 *
 * Até 15/08/2026 o código tinha o handle no lugar do domínio: `sitemap.ts`,
 * `robots.ts` e o `metadataBase` do layout declaravam
 * "https://zahirparfums.com.br", que não é um domínio deste projeto na Vercel
 * (os domínios reais são zahirparfum.com.br e www.zahirparfum.com.br).
 * Na prática o site era servido num endereço e dizia ao Google que suas
 * páginas canônicas estavam em outro.
 *
 * Agora existe um só lugar para essa string, e ele lê da env var — trocar de
 * domínio vira uma mudança no painel da Vercel, não no código.
 */

/** Domínio de produção. Usado quando a env var não está definida. */
const PRODUCAO = "https://zahirparfum.com.br";

function limpar(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

/**
 * Base para `metadataBase`, OpenGraph e canonical.
 *
 * Respeita `NEXT_PUBLIC_SITE_URL` inclusive quando ela aponta pra localhost,
 * porque em desenvolvimento é isso que faz a prévia de OG funcionar.
 */
export function siteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  return env ? limpar(env) : PRODUCAO;
}

/**
 * Base para `sitemap.xml` e `robots.txt`.
 *
 * Diferente de `siteUrl()`, esta IGNORA localhost. Sitemap e robots são
 * artefatos de SEO: se um build local vazasse "http://localhost:3002" pra
 * dentro deles, o arquivo publicado ficaria inútil. Como o `.env.local` do
 * projeto aponta pra localhost:3002, essa proteção não é hipotética.
 */
export function siteUrlCanonico(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (!env) return PRODUCAO;
  const limpo = limpar(env);
  if (limpo.includes("localhost") || limpo.includes("127.0.0.1")) {
    return PRODUCAO;
  }
  return limpo;
}
