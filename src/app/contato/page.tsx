import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a ZAHIR PARFUMS via Instagram, TikTok ou e-mail. Atendimento das 9h às 22h.",
};

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        titulo={
          <>
            Chama a gente{" "}
            <em className="italic text-amber/90">onde for mais confortável.</em>
          </>
        }
        descricao="A maneira mais rápida de falar conosco é pelo Instagram. Respondemos entre 9h e 22h, com tempo médio de resposta de 10 a 20 minutos."
        backgroundGradient="radial-gradient(ellipse at 50% 50%, rgba(200,155,60,0.1), transparent 60%)"
      />

      <section className="bg-ink px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <CanalCard
              titulo="Instagram"
              value={`@${BRAND.handles.instagram}`}
              descricao="Canal principal. Pedidos, dúvidas, curadoria personalizada — tudo acontece aqui."
              href={`https://instagram.com/${BRAND.handles.instagram}`}
              primary
            />
            <CanalCard
              titulo="TikTok"
              value={`@${BRAND.handles.tiktok}`}
              descricao="Conteúdo educativo sobre perfumaria árabe, unboxing, reviews honestas."
              href={`https://tiktok.com/@${BRAND.handles.tiktok}`}
            />
            <CanalCard
              titulo="WhatsApp"
              value="Em breve"
              descricao="Número oficial está sendo configurado. Por enquanto, Instagram é a via mais rápida."
              disabled
            />
            <CanalCard
              titulo="E-mail"
              value="contato@zahirparfums.com.br"
              descricao="Pra assuntos formais — parcerias, imprensa, jurídico. Respondemos em até 48h úteis."
              href="mailto:contato@zahirparfums.com.br"
              disabled
            />
          </div>
        </div>
      </section>

      {/* Horário */}
      <section className="border-t border-cream/5 bg-ink-soft px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              Horário de atendimento
            </span>
            <span className="font-display text-3xl font-light text-cream md:text-4xl">
              9h às 22h
            </span>
            <p className="text-sm italic text-cream/55">
              Todos os dias — inclusive fins de semana.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              Tempo médio de resposta
            </span>
            <span className="font-display text-3xl font-light text-cream md:text-4xl">
              10 a 20 min
            </span>
            <p className="text-sm italic text-cream/55">
              Nas horas de pico (18h–22h), pode demorar um pouco mais — mas
              a fila é respondida em ordem.
            </p>
          </div>
        </div>
      </section>

      {/* Info institucional (vazia por enquanto) */}
      <section className="border-t border-cream/5 bg-ink px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Informações da empresa
          </span>
          <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-12 text-sm leading-relaxed text-cream/70">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-cream/40">
                Razão social
              </span>
              <span className="text-cream">{BRAND.fullName}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-cream/40">
                CNPJ
              </span>
              <span className="italic text-cream/50">
                em processo de registro
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-cream/40">
                Sede
              </span>
              <span className="text-cream">{BRAND.city} — Brasil</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CanalCard({
  titulo,
  value,
  descricao,
  href,
  primary = false,
  disabled = false,
}: {
  titulo: string;
  value: string;
  descricao: string;
  href?: string;
  primary?: boolean;
  disabled?: boolean;
}) {
  const content = (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
          {titulo}
        </span>
        {!disabled && (
          <span className="text-amber transition-transform duration-400 group-hover:translate-x-1">
            →
          </span>
        )}
      </div>
      <span
        className={`mt-3 font-display text-2xl font-light leading-[1.2] md:text-3xl ${
          disabled ? "text-cream/50" : "text-cream"
        }`}
      >
        {value}
      </span>
      <p className="mt-3 text-sm leading-relaxed text-cream/65">{descricao}</p>
    </>
  );

  const classes = `group relative flex flex-col rounded-sm border p-6 md:p-8 transition-all ${
    primary
      ? "border-amber/40 bg-amber/5 hover:border-amber hover:bg-amber/10"
      : disabled
      ? "border-cream/10 bg-ink-soft/40 opacity-60"
      : "border-cream/10 bg-ink-soft hover:border-amber/40"
  }`;

  if (disabled || !href) {
    return <div className={classes}>{content}</div>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {content}
    </a>
  );
}
