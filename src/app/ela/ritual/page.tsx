import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { RitualEla } from "@/components/sections/RitualEla";

export const metadata: Metadata = {
  title: "O Ritual · Para Ela",
  description:
    "Seis perguntas pra descobrir seu perfil olfativo feminino. Sem jargão, sem clichê. Curador real cruza suas respostas com a curadoria árabe feminina e te entrega 3 fragrâncias da sua zona + 1 pra arriscar.",
};

export default function RitualElaPage() {
  return (
    <>
      <PageHero
        eyebrow="O Ritual · Quiz olfativo"
        titulo={
          <>
            Seis perguntas pra descobrir{" "}
            <em className="italic text-amber/90">seu perfil olfativo.</em>
          </>
        }
        descricao="Sem jargão. Sem clichê. Curadora real pergunta sua memória olfativa, designer que você já amou, como quer ser percebida e o que NÃO suporta — depois cruza com a curadoria feminina árabe. Você sai com 3 fragrâncias da sua zona + 1 pra arriscar."
        backgroundGradient="radial-gradient(ellipse at 30% 40%, rgba(212,165,116,0.14), transparent 60%)"
      />

      <section className="section-veil-light border-b border-ink/5 px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Como funciona
          </span>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            <Passo
              numero="01"
              titulo="Responde com honestidade"
              descricao="Pergunto sua memória olfativa, qual designer você já amou (La Vie Est Belle? Good Girl?), como quer ser percebida e o que NÃO quer cheirar. Sem clichê de revista."
            />
            <Passo
              numero="02"
              titulo="Recebe seu arquétipo + afinidade %"
              descricao="A Amante. A Romântica. A Solar. A Misteriosa. Um nome pro seu universo olfativo + as 3 dimensões que mais te representam. Cada perfume vem com afinidade e o porquê."
            />
            <Passo
              numero="03"
              titulo="3 da sua zona + 1 pra arriscar"
              descricao="Curadora real não recomenda só o seguro. Você recebe 3 fragrâncias alinhadas e 1 fora da curva — pra quando quiser abrir o repertório."
            />
          </div>
        </div>
      </section>

      <RitualEla hideIntro />
    </>
  );
}

function Passo({
  numero,
  titulo,
  descricao,
}: {
  numero: string;
  titulo: string;
  descricao: string;
}) {
  return (
    <div className="flex flex-col gap-3 border-l-2 border-amber/40 pl-5">
      <span className="font-display text-sm italic text-amber/80">{numero}</span>
      <span className="font-display text-xl font-light italic text-ink md:text-2xl">
        {titulo}
      </span>
      <p className="text-sm leading-relaxed text-ink/70">{descricao}</p>
    </div>
  );
}
