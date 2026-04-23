import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Ritual } from "@/components/sections/Ritual";
import { PERGUNTAS } from "@/data/quiz";

export const metadata: Metadata = {
  title: "O Ritual — quiz olfativo",
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
        descricao="Sem jargão. Sem checklist técnico. Um diálogo curto pra te indicar três fragrâncias do catálogo que conversam com quem você é hoje — baseadas em momentos, memórias e preferências, não em fórmulas químicas."
        backgroundGradient="radial-gradient(ellipse at 30% 40%, rgba(231,182,89,0.12), transparent 60%)"
      />

      {/* Como funciona */}
      <section className="border-b border-cream/5 bg-ink-soft px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Como funciona
          </span>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            <Passo
              numero="01"
              titulo="Responde"
              descricao="Seis perguntas em tela cheia. Cada uma tem quatro respostas. Não existe certo ou errado — só o que combina mais com você."
            />
            <Passo
              numero="02"
              titulo="Recebe um perfil"
              descricao="Um nome próprio pra seu DNA olfativo (tipo 'O Noturno Árabe' ou 'O Fresco Urbano') + as três dimensões que mais te representam."
            />
            <Passo
              numero="03"
              titulo="Vê três sugestões"
              descricao="Perfumes do catálogo que casam com seu perfil, ordenados por compatibilidade. Clica pra abrir a ficha completa."
            />
          </div>

          <p className="mt-12 max-w-2xl text-sm italic text-cream/55">
            O Ritual tem {PERGUNTAS.length} perguntas. Leva entre 90 segundos e 2
            minutos — tempo de pegar um café.
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
      <span className="font-display text-2xl font-light text-cream">
        {titulo}
      </span>
      <p className="text-sm leading-relaxed text-cream/65">{descricao}</p>
    </div>
  );
}
