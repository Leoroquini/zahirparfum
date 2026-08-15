# Auditoria pré-redesign — Zahir Parfums

> Executada em 15/08/2026, antes de qualquer alteração de código.
> Base: `Ajuda manus/Brief definitivo para o Claude Code` + `Arquitetura final — Zahir Parfum`.
> Estado do repo no momento da auditoria: branch `main`, working tree limpo, sincronizado com `origin/main`,
> último commit `c1e22a6`.

---

## 1. Estado técnico

| Item | Valor |
|---|---|
| Framework | Next.js 16.2.4 (App Router) · React 19.2.4 · TypeScript |
| Estilo | Tailwind v4 · `motion` v12 · Lenis (smooth scroll) |
| Hospedagem | Vercel · domínio `zahirparfums.com.br` |
| Rotas (arquivos `page/route`) | 50 |
| SKUs no catálogo | **86** (41 masculinos · 45 femininos · 0 unissex) |
| Seleção da Semana | 24 SKUs |
| SKUs com `status: "dados pendentes"` | **0** — a pendência citada no resumo antigo já foi resolvida |
| SKUs com notas olfativas vazias | **0** — a lacuna de "15 femininos sem notas" já foi fechada |

### Correções ao `resumo_projeto_zahir.md`

Três afirmações do resumo estão desatualizadas:

- "15 SKUs femininos com lacunas de notas" → **não há mais lacunas**; todos os 86 SKUs têm topo/coração/fundo preenchidos.
- "Várias SKUs (Tier 3) com `status: dados pendentes`" → **zero ocorrências** hoje.
- "`NEXT_PUBLIC_GA4_ID` vazio" → **já configurado** (`G-QPZ9X5Y8KD`). Só o Meta Pixel continua vazio.

---

## 2. Conflitos entre o brief e o site atual

Estes são os pontos onde o brief pede uma coisa e o código faz outra. São decisões estruturais,
não bugs.

### 2.1 A raiz `/` é uma barreira, não uma proposta de valor

`src/app/page.tsx` renderiza só `HeroVestibulo` — uma tela cheia que obriga a escolher
"Para ela" / "Para ele" antes de qualquer explicação. A navbar fica **oculta até 600px de scroll**
(`Navbar.tsx:94`).

O brief diz o oposto, em dois lugares:

- *"A primeira dobra precisa dizer, em poucas linhas, que a Zahir ajuda a encontrar e testar perfumes
  árabes antes de investir no frasco. O CTA dominante deve ser montar um kit de decants."*
- *"Ela / Ele — alternância de universo, **não uma barreira anterior à proposta de valor**."*

Um visitante frio de anúncio hoje cai numa tela que não diz o que a Zahir faz, não oferece busca e
não oferece decant. **É o conflito de maior impacto no funil.**

### 2.2 Todo o site existe duas vezes

Cada ferramenta tem rota masculina e rota feminina espelhada:

```
/catalogo   /mapa   /ritual   /comparador   /decants   /decants/montar   /perfume/[slug]
/ela/catalogo   /ela/mapa   /ela/ritual   /ela/comparador   /ela/decants   /ela/decants/montar   /ela/perfume/[slug]
```

O modelo de navegação do brief trata Ela/Ele como **controle contextual dentro do catálogo e da home**,
não como bifurcação de rota. Unificar é o caminho arquitetural correto, mas envolve redirects 301 de
URLs já indexadas — precisa de decisão explícita antes de executar.

### 2.3 As homes de mundo carregam o site inteiro

`/ele` (e `/ela`) renderizam 10 seções: Hero, CatalogoHighlight, Decants, KitsTrio, MapaOlfativo,
ComparadorPreview, Ritual, ManifestoPreview, Depoimentos, Newsletter.

O brief: *"A home encaminha; ela não substitui as páginas de profundidade"* e *"Não exponha mapa,
comparador, curadorias, notas e catálogo como escolhas de primeira ordem ao mesmo tempo."*

### 2.4 Nenhuma home tem CTA de decant dominante

O brief define o CTA primário da home como **"montar um kit de decants"** e o secundário como
**"não sei por onde começar" → Ritual**. Hoje `Hero.tsx` não tem essa hierarquia.

---

## 3. Conteúdo fabricado — precisa sair

O brief é categórico: *"Não crie … reviews, depoimentos, urgência, contadores ou avaliações.
Não inclua placeholder disfarçado de prova social."*

| Onde | O que é | Situação |
|---|---|---|
| `components/sections/Depoimentos.tsx` | 3 depoimentos com autor `"PLACEHOLDER · cliente"` e perfume `"Substituir pelo perfume real"` | **Renderizado em produção** em `/ele` e `/ela`. Prova social inventada. |
| `components/marketing/CupomBanner.tsx` | Cupom `RITUAL10` | Renderizado **globalmente** via `app/layout.tsx`. Remoção já decidida pelo fundador. |
| `components/sections/Ritual.tsx` · `RitualEla.tsx` | Mesmo cupom `RITUAL10` no resultado do quiz | Idem. |

A auditar na fase de execução (podem conter urgência ou promessa não sustentada):
`ExitIntentCapture.tsx`, `FreteSPBanner.tsx`, `TrustBar.tsx`, `ListaRetornoNudge.tsx`.

---

## 4. Medição — lacuna contra a lista do brief

`lib/track.ts` existe e funciona (GA4 + Meta Pixel), mas usa nomenclatura própria em PT-BR.
Cruzando com os 15 eventos que o brief exige:

| Evento do brief | Existe hoje |
|---|---|
| `product_view` | ✅ como `perfume_visto` |
| `site_search` | ✅ como `busca` |
| `ritual_start` / `ritual_complete` | ✅ como `ritual_iniciado` / `ritual_completo` |
| `list_add` | ✅ como `adicionou_lista` |
| `checkout_or_contact_start` | ✅ parcial (`enviou_lista_wa`, `enviou_lista_dm`, `iniciou_checkout_mp`) |
| `compare_open` | ⚠️ parcial (só `comparador_designer`) |
| `note_view` | ❌ ausente |
| `map_point_open` | ❌ ausente |
| `ritual_recommendation_open` | ❌ ausente |
| `decant_kit_view` | ❌ ausente |
| `decant_builder_change` | ❌ ausente |
| `list_open` | ❌ ausente |
| `order_confirmed` | ❌ ausente |
| `sample_to_full_return` | ❌ ausente |

**8 eventos faltando, 1 parcial.** Sem eles não dá pra responder "por que ninguém comprou" —
a pergunta central do replanejamento.

Meta Pixel: `NEXT_PUBLIC_META_PIXEL_ID` continua vazio, então metade do `track()` é no-op.

---

## 5. Integrações reais a preservar

Nada disto pode quebrar no redesenho:

| Integração | Estado | Onde |
|---|---|---|
| Fluxo de pedido via WhatsApp / Instagram DM | **Ativo — é o único canal real de venda** | `lib/reserva-dm.ts` (monta `wa.me` e `ig.me` com a lista pré-preenchida) |
| Lista persistente | Ativa | `lib/lista-store.ts` |
| Mercado Pago Checkout Pro | **Codado e dormente** (`CHECKOUT_MP_ATIVO = false`) | `lib/checkout-config.ts:21` + 3 rotas de API |
| Promo de kit / Seleção da Semana | Ativa | `lib/promo.ts` |
| SEO | Ativo | `sitemap.ts` (8 blocos de URL), `robots.ts`, `opengraph-image.tsx`, JSON-LD |
| Analytics | Ativo (GA4 só) | `components/analytics/` |

**Credenciais de produção do Mercado Pago** (access token + webhook secret) estão em `.env.local`
com `MERCADOPAGO_MODE=production`. Verificado: o arquivo **está coberto pelo `.gitignore`**
(`.gitignore:34`), não vazou pro repositório. Mantê-lo fora do git.

---

## 6. Dívida técnica

| Item | Detalhe |
|---|---|
| `public/_backup_pre_optimize/` | **94 MB** de imagens pré-otimização. Não está versionado (0 arquivos no git), logo não vai pro deploy — é peso morto local. |
| `lib/brand.ts:10` | `audience: "Perfumaria árabe masculina"` — ignora os 45 SKUs femininos. |
| Campo `arquetipo` | Definido no tipo `Perfume`, documentado, **usado em 0 SKUs**. |
| Campo `parMasculino` | Preenchido em 11 SKUs — o cross-sell ParMundo cobre pouco do catálogo feminino. |
| Lighthouse / Search Console | Nunca rodados. |

---

## 7. O que NÃO está quebrado (e o brief manda preservar)

Vale registrar, porque o instinto de redesenho é apagar demais:

- **Pirâmide olfativa clicável** (`ui/PerfumePyramid.tsx`) e **Relógio na pele** (`perfume-v3/RelogioPele.tsx`) — os dois módulos que o brief manda "manter e aprofundar".
- **Mapa olfativo** com fallback de toque para mobile (`ui/MapaMobileAlt.tsx`) — a dependência de hover já foi tratada.
- **Dois comparadores distintos**, não duplicados: `/comparador` (Árabe × Designer) e `/compare` (2 a 2, com deep-link por query param).
- **Glossário de notas** (`data/notas-glossario.ts`, 22 KB) alimentando `/nota/[slug]` e `NotaModal`.
- **Quiz Ritual** completo nos dois mundos (`data/quiz.ts`, `data/quiz-ela.ts`).
- Páginas institucionais completas: FAQ, Termos, Privacidade, Trocas, Contato, Como Comprar, Entrega.

O site tem mais inteligência de produto do que o brief assume. O trabalho é de **hierarquia e rota**,
não de reconstrução.

---

## 7b. Segunda passada: componentes de marketing e coerência de frete/canal

Auditados depois da primeira leva de limpeza. Resultado melhor do que o esperado — mas
apareceram duas incoerências reais.

### Frete: a regra codada nunca chega ao visitante (e isso é bom)

`checkout-config.ts` define `R$ 25 fixo / grátis acima de R$ 400`. Rastreando os usos,
`calcularFrete()` é chamado **em um único lugar**: `app/api/checkout/mercadopago/route.ts:119`
— a rota do checkout dormente. **Nenhuma tela mostra esse número ao visitante.**

O que o site realmente promete hoje, em `/entrega` e `/faq`, é: *"Calculamos por CEP depois que
você envia a lista. O valor depende do endereço, peso e modalidade."* Isso é honesto e compatível
com a operação manual. Não há promessa de frete fabricada em produção.

### `FreteSPBanner.tsx` — código morto que contradiz a política real

Anuncia *"Frete grátis · São Paulo capital · acima de R$ 99"*. Isso contradiz tanto o
`checkout-config.ts` (grátis acima de R$ 400, Brasil todo) quanto o `/entrega` (frete calculado
por CEP, sem valor prometido).

**Não está renderizado em lugar nenhum** — `grep` não acha nenhum import. É código morto, então
não chegou a enganar ninguém. Mas não pode ser ligado do jeito que está: seria exatamente a
"condição que não existe na operação real" que o brief proíbe.

→ **Decisão necessária do fundador:** a promoção de frete grátis em SP acima de R$ 99 existe
de verdade? Se sim, `/entrega`, `/faq` e `checkout-config.ts` precisam refletir. Se não, o
componente deve ser apagado.

### Canal de pedido: as páginas institucionais dizem Instagram, a operação escolheu WhatsApp

Contagem de menções:

| Página | "Instagram" | "WhatsApp" |
|---|---|---|
| `/entrega` | 2 | **0** |
| `/faq` | 2 | **0** |
| `/como-comprar` | 6 | **0** |

As três páginas que explicam como comprar instruem a pessoa a **enviar a lista pelo Instagram
DM**. Mas `reserva-dm.ts` oferece os dois canais, e a decisão do fundador (15/08/2026) é que o
canal único é o **WhatsApp**.

O brief exige: *"escolha um único canal prioritário e deixe claro, antes de a pessoa montar a
lista, o que acontecerá em seguida."* Hoje a pessoa lê "mande no Instagram" e encontra um botão
de WhatsApp. → Precisa alinhar as três páginas + os CTAs.

### `TrustBar.tsx` — aprovado

Renderizado em todas as rotas exceto `/`. As quatro afirmações se sustentam:
"Curadoria original / Fornecedores verificados" bate com `brand.ts`; "Decant pra testar" é real;
"Troca garantida · 7 dias, art. 49 CDC" é direito legal, não promessa inventada; "Atendimento
humano · 9h–22h" é consistente com o que a `/faq` já declara. Nada a mudar.

### `ListaRetornoNudge.tsx` — aprovado com ressalva

O toast "N fragrâncias esperando você" usa a lista real do próprio visitante — não é contador
fabricado nem urgência inventada. Só a copy diz "enviar pro Instagram", que entra no
realinhamento de canal acima.

---

## 8. Riscos da execução

1. **SEO** — unificar `/ela/*` sem redirect 301 mata URLs indexadas de produto, nota e curadoria.
2. **Regressão de funcionalidade** — as 10 seções das homes têm estado interno (Ritual, Montador, Mapa); mover é mais arriscado que reordenar.
3. **Sem cobertura de teste** — o projeto não tem suíte de testes. Toda validação será manual (`next build` + navegação real).
4. **Credenciais MP em produção** — qualquer mexida em `checkout-config.ts` com `CHECKOUT_MP_ATIVO = true` passa a cobrar de verdade.
