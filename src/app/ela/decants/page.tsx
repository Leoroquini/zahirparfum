import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Decants } from "@/components/sections/Decants";
import { KitsTrio } from "@/components/sections/KitsTrio";
import { SelecaoDaSemana } from "@/components/sections/SelecaoDaSemana";

export const metadata: Metadata = {
  title: "Decants · Para Ela",
  description:
    "Frascos menores (5ml, 10ml) dos perfumes árabes femininos da Zahir. Teste antes de investir no frasco cheio. Florais, gourmands, orientais.",
};

export default function DecantsElaPage() {
  return (
    <>
      <PageHero
        eyebrow="Decants · Antes de pertencer, conheça"
        titulo={
          <>
            Você lembra do cheiro de quem te marcou.{" "}
            <em className="italic text-amber/90">
              Quem te encontra hoje, lembra do seu?
            </em>
          </>
        }
        descricao="Decant é como o perfume vira o seu antes de virar gasto. 5ml ou 10ml do mesmo perfume original — tempo pra ele se misturar com a sua pele e descobrir como evolui ao longo do dia. Decida com a informação que você merece."
        backgroundGradient="radial-gradient(ellipse at 60% 50%, rgba(212,165,116,0.15), transparent 60%)"
      />

      {/* FAQ rápido — adaptado pra feminino */}
      <section className="section-veil-light border-b border-ink/5 px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Perguntas frequentes
          </span>
          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
            <Pergunta
              p="É o mesmo perfume do frasco cheio?"
              r="É. Exato. O que muda é só a quantidade de líquido — envasamos do frasco original da casa, com atomizador próprio."
            />
            <Pergunta
              p="Quanto dura um decant?"
              r="Um decant de 10ml dá entre 80 e 120 borrifadas. Com 2 borrifadas por dia, são 40 a 60 dias. 5ml dá metade — perfeito pra testar antes de comprometer."
            />
            <Pergunta
              p="Por que testar antes?"
              r="Perfume feminino árabe tem camadas que abrem ao longo do dia. O que cheira floral nos primeiros minutos pode virar gourmand denso 2h depois. Decant te dá tempo de descobrir antes de investir no frasco cheio."
            />
            <Pergunta
              p="E se eu não gostar?"
              r="É exatamente pra isso que o decant existe. Você testou por uma fração do frasco e descobriu que não é pra você. Melhor descobrir aqui do que depois de comprar o frasco inteiro."
            />
            <Pergunta
              p="Quanto custa?"
              r="O valor do decant varia por perfume e é confirmado no atendimento, junto com o frete, antes do pagamento. Kits de 3 (Estreia ou Coleção) têm preço promocional quando os três são da Seleção da Semana."
            />
            <Pergunta
              p="Frasco do decant é transparente?"
              r="Escuro (vidro âmbar ou preto) pra proteger da luz. Perfume oxida quando fica exposto — nossos decants foram pensados pra durar igual ao frasco original."
            />
          </div>
        </div>
      </section>

      {/* Seleção da Semana do mundo feminino — antes não existia aqui, e a
          seleção feminina aparecia por engano na página masculina. */}
      <SelecaoDaSemana mundo="ela" />

      <Decants hideIntro mundo="ela" />

      <KitsTrio mundo="ela" />

      <MontarKitCallout />

      <section className="section-veil-light border-t border-ink/5 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 text-center">
          <span className="font-display text-3xl italic text-amber/50">·</span>
          <h2 className="max-w-2xl font-display text-3xl font-light leading-[1.1] tracking-tight text-ink md:text-5xl">
            Sua coleção começa com{" "}
            <em className="italic text-amber/90">decants testados.</em>
          </h2>
          <Link
            href="/ela/catalogo"
            className="group mt-2 inline-flex items-center gap-3 rounded-full bg-amber px-8 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
          >
            Explorar catálogo
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}

function Pergunta({ p, r }: { p: string; r: string }) {
  return (
    <div className="flex flex-col gap-3 border-l-2 border-amber/40 pl-5">
      <span className="font-display text-xl font-light italic text-ink md:text-2xl">
        {p}
      </span>
      <p className="text-sm leading-relaxed text-ink/70">{r}</p>
    </div>
  );
}

function MontarKitCallout() {
  return (
    <section className="section-veil-light relative overflow-hidden border-t border-ink/5 px-6 py-20 md:px-12 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(212,165,116,0.18), transparent 55%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20">
        <div className="flex flex-col gap-5">
          <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="h-px w-8 bg-amber" />
            Monte o seu
          </span>
          <h2 className="max-w-2xl font-display text-3xl font-light leading-[1.05] tracking-tight text-ink md:text-5xl">
            Quer escolher do{" "}
            <em className="italic text-amber/90">zero?</em>
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-ink/70 md:text-lg">
            Os trios fechados são curadoria. Mas se você já sabe o que quer,
            ou quer testar combinações que ninguém montou, abre o montador
            livre. Escolhe quantos decants quiser, mistura 5ml e 10ml.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/ela/decants/montar"
            className="group flex items-center justify-between gap-3 rounded-sm border border-amber/40 bg-cream/50 p-6 transition-all hover:-translate-y-1 hover:border-amber hover:shadow-product"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber-dim">
                Sem desconto, total liberdade
              </span>
              <span className="font-display text-2xl font-light text-ink md:text-3xl">
                Abrir montador livre
              </span>
            </div>
            <span className="text-2xl text-amber transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
