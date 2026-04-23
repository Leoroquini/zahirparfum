import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: `Termos de uso do site ${BRAND.fullName}.`,
};

export default function TermosPage() {
  return (
    <>
      <PageHero
        eyebrow="Termos de uso"
        titulo={
          <>
            Regras claras{" "}
            <em className="italic text-amber/90">de uso do site.</em>
          </>
        }
        descricao="Este documento rege a utilização do site e das ferramentas da ZAHIR PARFUMS. Use o site significa que você aceita estes termos."
        backgroundGradient="radial-gradient(ellipse at 50% 50%, rgba(200,155,60,0.08), transparent 60%)"
      />

      <section className="bg-ink px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto flex max-w-3xl flex-col gap-10 text-base leading-relaxed text-cream/80">
          <div className="rounded-sm border border-amber/25 bg-amber/5 p-5">
            <p className="text-xs italic text-amber/90">
              ⚠ Rascunho inicial. Este texto deve ser revisado por advogado
              especializado em e-commerce antes da entrada oficial em operação.
            </p>
          </div>

          <Topico n="1" t="Objeto">
            O site <strong className="text-cream">{BRAND.fullName}</strong>{" "}
            (&quot;Site&quot;) é uma plataforma de curadoria e venda de
            perfumes importados, com foco em perfumaria árabe masculina. A
            navegação, consulta de conteúdo e uso das ferramentas interativas
            são gratuitas.
          </Topico>

          <Topico n="2" t="Cadastro e uso">
            Não há cadastro obrigatório no Site. A reserva de produtos é
            iniciada pelo Site e finalizada via Instagram. Ao enviar mensagem
            pelo DM, você concorda com os termos aqui descritos e com a{" "}
            <a
              href="/privacidade"
              className="italic text-amber underline-offset-4 hover:underline"
            >
              Política de Privacidade
            </a>
            .
          </Topico>

          <Topico n="3" t="Produtos">
            Todas as fragrâncias vendidas são originais, importadas diretamente
            de casas árabes legalizadas. As fidelidades (ex: &quot;85% do Creed
            Aventus&quot;) são estimativas baseadas em consenso de comunidade
            olfativa (Fragrantica, Parfumo) e em testes próprios, não em
            análise química laboratorial.
          </Topico>

          <Topico n="4" t="Preços e disponibilidade">
            Preços exibidos estão em Reais (R$) e são válidos apenas no Site.
            Valores de frete e descontos de cupom são confirmados no
            Instagram antes da finalização do pagamento. Preços podem ser
            alterados sem aviso prévio, mas pedidos já confirmados no DM têm o
            valor acordado honrado.
          </Topico>

          <Topico n="5" t="Pedidos">
            O processo de compra acontece em duas etapas: (a) seleção no Site,
            e (b) conclusão via Instagram DM. A reserva só é considerada firme
            após a confirmação do pagamento. Antes disso, itens podem ser
            removidos da lista sem ônus.
          </Topico>

          <Topico n="6" t="Formas de pagamento">
            Aceitamos Pix (com 3% de desconto à vista), cartão de crédito em
            até 12x sem juros (via Pagar.me) e boleto bancário. Processadores
            de pagamento seguem padrões PCI-DSS próprios; a ZAHIR não armazena
            dados de cartão.
          </Topico>

          <Topico n="7" t="Troca e devolução">
            Seguimos o Art. 49 do Código de Defesa do Consumidor: prazo de 7
            (sete) dias corridos após o recebimento para arrependimento ou
            troca. Consulte a página{" "}
            <a
              href="/trocas-e-devolucoes"
              className="italic text-amber underline-offset-4 hover:underline"
            >
              Trocas e devoluções
            </a>{" "}
            para condições completas.
          </Topico>

          <Topico n="8" t="Quiz, mapa e ferramentas interativas">
            &quot;O Ritual&quot;, o Mapa Olfativo e o Comparador Árabe ×
            Designer são ferramentas indicativas, baseadas em heurísticas
            olfativas e dados públicos de perfumaria. Não constituem
            prescrição, recomendação médica nem garantia de satisfação —
            recomendamos sempre testar com decant antes de comprar frasco
            cheio.
          </Topico>

          <Topico n="9" t="Propriedade intelectual">
            Conteúdo, design, textos e elementos gráficos deste Site são
            protegidos por direito autoral e direito de marca. Reprodução
            total ou parcial sem autorização expressa é proibida. Nomes de
            terceiros citados (ex: Creed, Dior, Chanel) são marcas registradas
            de seus respectivos proprietários e são mencionados para fins
            comparativos conforme permitido pela Lei 9.279/96.
          </Topico>

          <Topico n="10" t="Responsabilidade">
            A ZAHIR PARFUMS não se responsabiliza por (a) uso indevido dos
            produtos, (b) reações alérgicas individuais — recomendamos teste
            na dobra do cotovelo antes do uso completo, (c) interrupções
            temporárias do Site por manutenção ou causas técnicas alheias.
          </Topico>

          <Topico n="11" t="Alterações">
            Estes Termos podem ser alterados a qualquer momento. Alterações
            relevantes serão comunicadas por e-mail (para quem estiver na
            lista de interesse) e pelo Instagram oficial.
          </Topico>

          <Topico n="12" t="Foro">
            As controvérsias decorrentes destes Termos serão dirimidas no foro
            da comarca da sede da empresa ({BRAND.city}/SP), renunciando-se a
            qualquer outro.
          </Topico>

          <p className="mt-6 text-sm italic text-cream/50">
            Última atualização: abril de {BRAND.foundedYear}.
          </p>
        </div>
      </section>
    </>
  );
}

function Topico({
  n,
  t,
  children,
}: {
  n: string;
  t: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-l-2 border-amber/40 pl-5">
      <span className="font-display text-xs italic text-amber/80">
        {n}. {t}
      </span>
      <div className="font-display text-base font-light leading-[1.55] text-cream/85 md:text-lg">
        {children}
      </div>
    </div>
  );
}
