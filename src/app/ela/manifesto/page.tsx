import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Manifesto · Para Ela",
  description:
    "Perfume é memória que não se vê. O manifesto feminino da Zahir Parfums e o pacto com a mulher que escolhe perfume árabe com informação.",
};

/**
 * Manifesto feminino — copy adaptada.
 * TODO Leo: refinar voz pessoal. Estrutura espelha /manifesto masculino mas
 * com adaptação de tom (envolvente, com agência, sem "objeto de desejo").
 */
export default function ManifestoElaPage() {
  return (
    <>
      <PageHero
        eyebrow="Manifesto"
        titulo={
          <>
            Perfume é <em className="italic text-amber/90">memória</em> que
            não se vê.
          </>
        }
        descricao="Este é o pacto com a mulher que chega aqui. Não é sobre quem fundou a marca — é sobre quem vai levar a Zahir pro próprio guarda-roupa, pro próprio rastro, pra própria história."
        backgroundGradient="radial-gradient(ellipse at 40% 60%, rgba(212,165,116,0.12), transparent 60%)"
      />

      {/* Manifesto principal */}
      <section className="section-veil relative overflow-hidden border-t border-ink/5 px-6 py-24 md:px-12 md:py-32">
        <div className="relative mx-auto flex max-w-3xl flex-col gap-10">
          <p className="font-display text-2xl font-light leading-[1.4] text-ink md:text-4xl">
            Perfume árabe pra mulher{" "}
            <em className="italic text-amber/90">
              que sabe que cheirar bem
            </em>{" "}
            não é só borrifar e sair — é decidir o que fica depois.
          </p>
          <p className="font-display text-lg font-light leading-[1.55] text-ink/85 md:text-xl">
            A perfumaria árabe feminina não é o reverso da masculina. É um
            universo próprio — de rosa de Taif densa, açafrão doce, mel, jasmim
            que dura horas, oud rosé. Notas que o Ocidente descobriu agora mas
            o mundo árabe trabalha há séculos.
          </p>
          <p className="font-display text-lg font-light leading-[1.55] text-ink/85 md:text-xl">
            A gente acredita que perfume pra mulher é{" "}
            <em className="italic text-amber/90">agência</em>, não decoração.
            Não é sobre agradar — é sobre decidir. O que você quer que fique
            depois que você sair da sala. Isso é o que a curadoria entrega.
          </p>
          <p className="font-display text-lg font-light leading-[1.55] text-ink/85 md:text-xl">
            Não somos mais um catálogo com cupom piscando. Somos a curadoria
            que respeita seu tempo, sua pele e sua história — e te dá a
            informação que você merece pra escolher com confiança.
          </p>
        </div>
      </section>

      {/* Compromissos */}
      <section className="section-veil-light border-t border-ink/5 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            O que isso significa pra você
          </span>
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-light leading-[1.1] tracking-tight text-ink md:text-5xl">
            Quatro coisas que a gente{" "}
            <em className="italic text-amber/90">promete</em> e cumpre.
          </h2>

          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
            <Compromisso
              numero="01"
              titulo="Você nunca compra um perfume que a curadoria não validou."
              descricao="Cada SKU feminino passa por teste antes de entrar no catálogo. Curadoria não é argumento de marketing, é filtro real — tem perfume árabe feminino lindo que a gente recusou."
            />
            <Compromisso
              numero="02"
              titulo="Você descobre. Ninguém te empurra."
              descricao="Quiz olfativo feminino, mapa do catálogo, comparador com La Vie Est Belle e Good Girl — antes de qualquer carrinho. A compra vem depois, quando você já sabe o que quer e por quê."
            />
            <Compromisso
              numero="03"
              titulo="Você testa antes de investir."
              descricao="Decants de 5 e 10 ml nos principais. Se não gostou, gastou pouco pra aprender sobre seu gosto. Se gostou, volta pelo frasco cheio com confiança."
            />
            <Compromisso
              numero="04"
              titulo="Você pergunta sem vergonha."
              descricao="WhatsApp em horário estendido, sem script de vendedor. Se você não entendeu o que é projeção, fixação ou extrait — a culpa é do site, não sua. Pergunta. A gente explica."
            />
          </div>
        </div>
      </section>

      {/* Por que árabe feminino, por que agora */}
      <section className="section-veil-light border-t border-ink/5 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Por que árabe feminino, por que agora
          </span>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
            <div className="flex flex-col gap-3">
              <span className="font-display text-6xl font-light italic leading-none text-amber md:text-8xl">
                40<span className="text-amber/60">%</span>
              </span>
              <span className="text-sm italic text-ink/75">
                das vendas árabes femininas são gourmand (baunilha, mel, dátil)
              </span>
            </div>

            <div className="flex max-w-2xl flex-col gap-5 font-display text-lg font-light leading-[1.55] text-ink/80 md:text-xl">
              <p>
                O perfume árabe feminino chega na mulher brasileira em um
                momento específico: ela cresceu vendo campanha de Lancôme no
                intervalo da novela e agora descobre fragrâncias com presença
                de boutique a uma fração do preço.
              </p>
              <p>
                Yara, Khamrah, Kismet, Crystal Rose — nomes que dominam
                discussões em grupos de WhatsApp e Instagram, mas raramente
                explicados com profundidade. Curadoria preenche essa lacuna.
              </p>
              <p className="text-ink/70">
                A pergunta não é se a mulher brasileira vai adotar perfume
                árabe feminino. É se ela vai adotar com informação ou sem.{" "}
                <em className="italic text-amber">{BRAND.fullName}</em> existe
                pra que a resposta seja{" "}
                <em className="italic text-ink">com</em>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section-veil-light border-t border-ink/5 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-8 text-center">
          <span className="font-display text-3xl italic text-amber/50">·</span>
          <h2 className="max-w-3xl font-display text-3xl font-light leading-[1.1] tracking-tight text-ink md:text-5xl lg:text-6xl">
            Seu rastro no ar começa com{" "}
            <em className="italic text-amber/90">uma escolha consciente.</em>
          </h2>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/ela/ritual"
              className="group inline-flex items-center gap-3 rounded-full bg-amber px-8 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-amber-bright"
            >
              Fazer o Ritual
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/ela/catalogo"
              className="inline-flex items-center gap-3 rounded-full border border-ink/25 px-8 py-4 text-[11px] font-sans uppercase tracking-[0.3em] text-ink/80 transition-all hover:border-amber hover:text-amber"
            >
              Explorar catálogo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Compromisso({
  numero,
  titulo,
  descricao,
}: {
  numero: string;
  titulo: string;
  descricao: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-l-2 border-amber/40 pl-6">
      <span className="font-display text-sm italic text-amber/80">{numero}</span>
      <span className="font-display text-2xl font-light leading-[1.15] text-ink md:text-3xl">
        {titulo}
      </span>
      <p className="text-sm leading-relaxed text-ink/70 md:text-base">
        {descricao}
      </p>
    </div>
  );
}
