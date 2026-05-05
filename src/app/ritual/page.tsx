import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Ritual } from "@/components/sections/Ritual";
import { PERGUNTAS } from "@/data/quiz";

export const metadata: Metadata = {
  title: "O Ritual, quiz olfativo",
  description:
    "Seis perguntas pra descobrir seu perfil olfativo. Sem jargão técnico. Diálogo curto pra te indicar fragrâncias do catálogo que conversam com quem você é hoje.",
};

export default function RitualPage() {
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
        descricao="Sem jargão. Sem clichê. Curador de verdade pergunta o que você já amou, o que evita, e como sua pele se comporta — depois cruza com o catálogo. Você sai daqui com 3 fragrâncias da sua zona + 1 pra arriscar."
        backgroundGradient="radial-gradient(ellipse at 30% 40%, rgba(231,182,89,0.12), transparent 60%)"
      />

      {/* Como funciona */}
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
              descricao="Pergunto o que você já amou (Sauvage? Aventus?), o que evita, como sua pele se comporta e como você compra perfume. Sem clichê de revista."
            />
            <Passo
              numero="02"
              titulo="Recebe seu perfil + afinidade %"
              descricao="Um nome pro seu DNA olfativo + as 3 dimensões que mais te representam. Cada perfume vem com nota de afinidade e o porquê foi escolhido."
            />
            <Passo
              numero="03"
              titulo="3 da sua zona + 1 pra arriscar"
              descricao="Curador real não recomenda só o seguro. Você recebe 3 fragrâncias alinhadas e 1 fora da curva — pra quando quiser abrir o repertório."
            />
          </div>

          <p className="mt-12 max-w-2xl text-sm italic text-ink/70">
            O Ritual tem {PERGUNTAS.length} perguntas. Leva entre 90 segundos e 2
            minutos, tempo de pegar um café.
          </p>
        </div>
      </section>

      <Ritual hideIntro />
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
      <span className="font-display text-sm italic text-amber/70">
        Passo {numero}
      </span>
      <span className="font-display text-2xl font-light text-ink">
        {titulo}
      </span>
      <p className="text-sm leading-relaxed text-ink/65">{descricao}</p>
    </div>
  );
}
