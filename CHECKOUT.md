# Checkout — Zahir Parfum

Integração com **Mercado Pago Checkout Pro**. O cliente clica em "Pagar agora"
no drawer da Lista, é redirecionado pro checkout do MP (Pix · cartão até 12x ·
boleto), e volta pra `/obrigado`, `/pagamento-pendente` ou `/pagamento-erro`.

## Por que Mercado Pago

- Aceita CPF (não exige CNPJ pra começar)
- Logo gera confiança no consumidor brasileiro (conversão maior em loja nova)
- Pix nativo, dinheiro disponível em segundos
- Antifraude e parcelamento inclusos
- Documentação e suporte em português

Quando passar de ~R$ 50k/mês, vale comparar Pagar.me. Antes disso é
prematuro otimizar.

## Como funciona uma venda — passo a passo

1. Cliente adiciona perfumes na Lista (botão flutuante âmbar)
2. Clica em "Pagar agora" → o site chama `POST /api/checkout/mercadopago`
3. A API valida itens contra o catálogo, calcula frete, cria uma **Preference**
   no Mercado Pago e devolve `init_point` (URL do checkout)
4. Cliente é redirecionado pro checkout MP (página com logo da Zahir)
5. Cliente paga com Pix / cartão / boleto
6. MP redireciona cliente pra `/obrigado` (a lista é limpa automaticamente)
7. **Em paralelo**, MP chama `POST /api/webhook/mercadopago` com o payment ID
8. Nosso webhook busca o pagamento na API do MP e loga
   (próxima fase: salva no banco + dispara email pro Leo + email pro cliente)

## Setup (uma vez só)

### 1. Criar aplicação no Mercado Pago

1. Acesse <https://www.mercadopago.com.br/developers/panel/app>
2. **Criar aplicação**
   - Nome: `Zahir Parfum Site`
   - Modelo: **Pagamentos online**
   - Produto: **Checkout Pro**
3. Dentro da aplicação, vá em **Credenciais**
4. Você terá 2 sets:
   - **Credenciais de teste** (`TEST-...`) → use durante desenvolvimento
   - **Credenciais de produção** (`APP_USR-...`) → use só quando for vender de verdade

### 2. Configurar `.env.local`

```bash
cp .env.example .env.local
```

Preencha:

```
MERCADOPAGO_MODE=test
MERCADOPAGO_ACCESS_TOKEN=TEST-1234...   # Access Token de TEST
MERCADOPAGO_PUBLIC_KEY=TEST-abc...      # Public Key de TEST
SITE_URL=http://localhost:3000          # local; em produção: https://zahirparfums.com.br
```

> ⚠️ `.env.local` NÃO vai pro git. Nunca commit credenciais.

### 3. Testar localmente

```bash
npm run dev
```

- Adicione perfumes na Lista
- Clique em "Pagar agora"
- Use cartões de teste do MP: <https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards>
  - Aprovado: `5031 4332 1540 6351` · CVV `123` · validade futura · nome `APRO`
  - Recusado: nome `OTHE`

### 4. Configurar webhook (produção)

Webhooks do MP **não chegam em localhost** sem túnel. Pra desenvolvimento,
use `ngrok`/`cloudflared` apontando pra `http://localhost:3000` e configure
a URL pública no painel MP.

Em produção:

1. No painel MP da aplicação → **Webhooks** → **Configurar notificações**
2. Aba **Modo de produção**
3. URL: `https://zahirparfum.com.br/api/webhook/mercadopago`
4. Eventos: marque **Pagamentos** (`payment`)
5. Copie a **"Assinatura secreta"** mostrada no painel
6. Cole em `MERCADOPAGO_WEBHOOK_SECRET` (no `.env.local` e na Vercel)
7. Salve as configurações no painel MP

A validação de assinatura (HMAC SHA256) está em `src/app/api/webhook/mercadopago/route.ts`.
Sem essa env var, em produção o webhook ainda processa mas loga erro forte.

### 5. Ativar produção

Quando estiver pronto pra vender:

```
MERCADOPAGO_MODE=production
MERCADOPAGO_ACCESS_TOKEN=APP_USR-...    # Access Token de PROD
MERCADOPAGO_PUBLIC_KEY=APP_USR-...      # Public Key de PROD
SITE_URL=https://zahirparfums.com.br
```

Reinicie o servidor (no host) pra carregar as novas vars.

## Frete

Regra atual (em `src/lib/checkout-config.ts`):

- R$ 25 fixo Brasil todo
- Grátis acima de R$ 400

Pra mudar pra cálculo dinâmico (Melhor Envio), refatore `calcularFrete()` —
o resto do fluxo já lida com `frete = 0` ou `frete > 0` corretamente.

## Onde cada coisa mora

| Arquivo                                              | O que faz                                         |
| ---------------------------------------------------- | ------------------------------------------------- |
| `src/lib/checkout-config.ts`                         | Regras de frete + helpers de env                  |
| `src/app/api/checkout/mercadopago/route.ts`          | Cria Preference no MP a partir da lista           |
| `src/app/api/webhook/mercadopago/route.ts`           | Recebe notificações de pagamento                  |
| `src/components/ui/ListaDrawer.tsx`                  | Botão "Pagar agora" no drawer da Lista            |
| `src/app/obrigado/`                                  | Pós-pagamento aprovado (limpa a lista)            |
| `src/app/pagamento-pendente/`                        | Boleto/Pix não confirmado ainda                   |
| `src/app/pagamento-erro/`                            | Cartão recusado / cliente desistiu                |

## O que ainda falta (próximas fases)

- [ ] Persistir pedidos num banco (Supabase ou Neon)
- [ ] Email transacional pro cliente (Resend) com resumo + endereço
- [ ] Notificação WhatsApp/email pro Leo a cada venda aprovada
- [ ] Captura de CEP no fluxo pra calcular frete dinâmico (Melhor Envio)
- [ ] Emissão automática de NF-e (via Bling / Tiny)
- [ ] Recuperação de carrinho abandonado (lembrete em 24h)
- [ ] Cupons de desconto

## Decisões de design

- **Checkout Pro** (redirect) e não Bricks (embed): mais simples, menos código,
  PCI fora do nosso scope. Custo: cliente sai do domínio na hora de pagar.
- **Frete como item na Preference**: Checkout Pro não tem campo `shipping`
  simples; tratar como item adicional é o jeito mais robusto.
- **Validação de preço server-side**: o cliente envia `precoSnapshot`, mas o
  servidor recalcula e usa `Math.max(precoServidor, precoSnapshot)`. Isso
  permite kits com preço fixo sem deixar ninguém comprar mais barato que o
  custo via DevTools.
- **Lista limpa em `/obrigado`** (não no webhook): cliente só vê obrigado se
  redirect aconteceu, então é o sinal mais confiável de "pagou e foi embora".
