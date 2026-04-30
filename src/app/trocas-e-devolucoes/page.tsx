import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Trocas e devoluções",
  description:
    "Política de troca em 7 dias, condições e instruções de envio reverso.",
};

export default function TrocasPage() {
  return (
    <>
      <PageHero
        eyebrow="Trocas · Devoluções"
        titulo={
          <>
            Sete dias pra{" "}
            <em className="italic text-amber/90">mudar de ideia.</em>
          </>
        }
        descricao="Seguimos o Código de Defesa do Consumidor (art. 49): você tem até 7 dias corridos após receber o produto pra solicitar troca ou devolução sem precisar justificar."
        backgroundGradient="radial-gradient(ellipse at 50% 60%, rgba(200,155,60,0.1), transparent 60%)"
      />

      <section className="section-veil-light px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Quando aceitamos troca */}
            <div className="flex flex-col gap-5">
              <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
                <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
                Aceitamos troca quando
              </span>
              <ul className="flex flex-col gap-4 font-display text-lg font-light leading-[1.3] text-ink/85 md:text-xl">
                <li className="border-l border-amber/60 pl-4">
                  Você pediu em até 7 dias corridos depois de receber
                </li>
                <li className="border-l border-amber/60 pl-4">
                  O frasco chegou lacrado (selo original intacto)
                </li>
                <li className="border-l border-amber/60 pl-4">
                  O produto ainda está na embalagem original de envio
                </li>
                <li className="border-l border-amber/60 pl-4">
                  A caixinha externa do perfume não foi descartada
                </li>
              </ul>
            </div>

            {/* Quando não aceitamos */}
            <div className="flex flex-col gap-5">
              <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-wine/80">
                <span className="mr-3 inline-block h-px w-8 align-middle bg-wine/70" />
                Não aceitamos quando
              </span>
              <ul className="flex flex-col gap-4 font-display text-lg font-light leading-[1.3] text-ink/70 md:text-xl">
                <li className="border-l border-wine/50 pl-4">
                  O frasco foi aberto ou borrifado
                </li>
                <li className="border-l border-wine/50 pl-4">
                  O lacre original foi rompido
                </li>
                <li className="border-l border-wine/50 pl-4">
                  Passaram mais de 7 dias desde o recebimento
                </li>
                <li className="border-l border-wine/50 pl-4">
                  Decant já aberto (por razão sanitária)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fluxo da troca */}
      <section className="section-veil-light border-t border-ink/5 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Fluxo da troca
          </span>
          <div className="mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
            <Passo n="01" t="Avisa no DM" d="Manda uma mensagem no Instagram com o número do pedido e o motivo." />
            <Passo n="02" t="Recebe orientação" d="Te passamos o endereço e a forma de envio reverso (Correios ou motoboy)." />
            <Passo n="03" t="Envia de volta" d="Reembalado com cuidado, com o cartão de agradecimento incluso ajuda a identificar." />
            <Passo n="04" t="Ressarcimento" d="Assim que recebemos e conferimos, devolvemos em até 5 dias úteis pelo mesmo método do pagamento." />
          </div>
        </div>
      </section>

      {/* Frete reverso */}
      <section className="section-veil-light border-t border-ink/5 px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Quem paga o frete reverso
          </span>
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col gap-2">
              <span className="font-display text-2xl font-light text-ink">
                Defeito do produto ou erro nosso
              </span>
              <p className="text-sm leading-relaxed text-ink/65">
                A gente paga o frete reverso completo. Perfume errado, frasco
                danificado na viagem, tamanho diferente do pedido, nossa
                culpa, nossa responsabilidade.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-display text-2xl font-light text-ink/70">
                Arrependimento (art. 49 CDC)
              </span>
              <p className="text-sm leading-relaxed text-ink/75">
                A política de frete reverso é combinada no atendimento,
                conforme o caso e a legislação aplicável. Depois que a
                mercadoria chegar e estiver íntegra, fazemos o ressarcimento
                conforme a forma de pagamento usada.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-veil-light border-t border-ink/5 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 text-center">
          <p className="max-w-2xl text-sm italic text-ink/70 md:text-base">
            Dúvida específica sobre uma troca? Chama no Instagram com o número
            do pedido, a gente resolve caso a caso.
          </p>
          <Link
            href="/contato"
            className="rounded-full border border-amber px-8 py-3.5 text-[11px] font-sans uppercase tracking-[0.3em] text-amber transition-all hover:bg-amber hover:text-ink"
          >
            Falar no DM
          </Link>
        </div>
      </section>
    </>
  );
}

function Passo({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="flex flex-col gap-3 border-l-2 border-amber/40 pl-5">
      <span className="font-display text-xs italic text-amber/80">
        Passo {n}
      </span>
      <span className="font-display text-xl font-light leading-[1.15] text-ink">
        {t}
      </span>
      <p className="text-sm leading-relaxed text-ink/65">{d}</p>
    </div>
  );
}
