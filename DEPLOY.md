# Deploy do ZAHIR PARFUMS — guia rápido

O site é **estático** (39 páginas pré-renderizadas). Deploy na Vercel é gratuito e sai em 3 minutos.

## Caminho recomendado — Vercel (grátis, CDN global, SSL automático)

### Opção A — Via interface web (mais fácil)

1. Entra em [vercel.com/signup](https://vercel.com/signup) e loga com seu e-mail ou GitHub
2. No dashboard, clica em **Add New → Project**
3. Escolhe **Import Git Repository** e sobe o projeto (se você ainda não tem Git, use a Opção B)
4. Na tela de configuração, não muda nada — Vercel detecta Next.js automaticamente
5. Clica em **Deploy**
6. Em 2 minutos você tem uma URL pública tipo `zahir-parfums.vercel.app`
7. Pra domínio próprio (`zahirparfums.com.br`): aba **Domains → Add Domain**, aponta os DNS no Registro.br conforme instruções

### Opção B — Via CLI (mais rápido se você não usa Git)

Com o Node já instalado no seu computador:

```bash
cd "site"
npx vercel login       # uma vez: escolhe seu método de login
npx vercel --prod      # sobe a versão de produção
```

Cada `npx vercel --prod` subsequente atualiza o site em segundos.

## Variáveis de ambiente (analytics)

Quando você criar as contas de Google Analytics e Meta Pixel, adiciona na Vercel:

- Dashboard do projeto → **Settings → Environment Variables**
- Adiciona `NEXT_PUBLIC_GA4_ID` com o ID do GA4 (formato `G-XXXXXXXXXX`)
- Adiciona `NEXT_PUBLIC_META_PIXEL_ID` com o ID do Pixel Meta
- Dê **Redeploy** pra aplicar

Se o site já está rodando sem esses IDs, nada quebra — os scripts de tracking só carregam quando os IDs existem.

## Domínio próprio — passo a passo

1. Compra `zahirparfums.com.br` no [Registro.br](https://registro.br) (~R$ 40/ano)
2. Na Vercel: **Project Settings → Domains → Add**, digita `zahirparfums.com.br`
3. A Vercel te dá dois registros DNS (tipo A e CNAME) pra configurar no Registro.br
4. Vai no **Registro.br → DNS** do seu domínio e cola os registros
5. Propagação leva 5 minutos a 24 horas. SSL é automático.

## O que vem pré-configurado no site

- **sitemap.xml** gerado automaticamente com todas as URLs (home, 28 perfumes, 5 curadorias)
- **robots.txt** liberando indexação geral, bloqueando `/api/`
- **JSON-LD estruturado** em cada perfume (rich snippets no Google)
- **Open Graph** tags pra compartilhamento em redes sociais
- **Meta tags em pt-BR** com título e descrição adequados
- **404** customizada na estética da marca
- **Error boundary** pra erros inesperados
- **Responsividade** completa — mobile, tablet, desktop
- **Páginas estáticas** — CDN cache sem cold start

## Manutenção

- **Novo perfume:** edita `src/data/catalogo.ts`, rebuilds automático na Vercel
- **Ajustar texto:** edita o arquivo do componente correspondente
- **Nova curadoria:** adiciona entrada em `src/data/curadorias.ts`
- **Imagens:** adiciona em `public/hero/` ou `public/perfumes/`

## Suporte

O código é padrão Next.js 16 + React 19 + Tailwind 4 + Framer Motion. Qualquer dev familiar com essa stack consegue dar manutenção. Este arquivo fica junto do projeto pra referência.
