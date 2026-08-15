"use client";

import Link from "next/link";
import { motion } from "motion/react";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/**
 * Seção 2 da home — "Três começos".
 *
 * Separa a intenção de quem chegou em três portas e SÓ três: descobrir,
 * testar e buscar algo específico. Mapa, comparador, curadorias, notas e
 * catálogo não aparecem aqui como escolha de primeira ordem — o catálogo
 * entra só como saída discreta da terceira porta.
 *
 * Prop `mundo` define o par de rotas espelhadas. As duas árvores existem e
 * continuam separadas: nada aqui unifica ou redireciona.
 */
export function TresComecos({ mundo = "ele" }: { mundo?: "ele" | "ela" }) {
  const isEla = mundo === "ela";

  // Rotas montadas uma vez, no topo. Nunca hardcoded no meio do JSX.
  const ritualHref = isEla ? "/ela/ritual" : "/ritual";
  const decantsHref = isEla ? "/ela/decants" : "/decants";
  const catalogoHref = isEla ? "/ela/catalogo" : "/catalogo";

  /**
   * PORTA 3 — decisão explícita sobre a busca.
   *
   * /buscar existe só na raiz (não tem espelho em /ela) e varre CATALOGO
   * inteiro, masculino e feminino juntos. Se o mundo feminino usasse o
   * formulário, a visitante cairia num resultado misturado — pior que não
   * buscar. Por isso:
   *   - mundo "ele"  → formulário GET real apontando pra /buscar
   *   - mundo "ela"  → sem formulário; a porta abre /ela/catalogo, que já é
   *                    filtrado por gênero e tem filtros de família e ocasião.
   * Não dá pra mandar o `q` pro catálogo: /ela/catalogo (CatalogoGrid) não lê
   * searchParams, então o termo seria silenciosamente descartado.
   */
  const buscaComFormulario = !isEla;

  return (
    <section
      id="tres-comecos"
      className="section-veil-light relative border-t border-ink/5 px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="flex flex-col gap-6"
        >
          <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="h-px w-8 bg-amber" />
            Três começos
          </span>

          <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight text-ink md:text-6xl">
            Comece por onde{" "}
            <em className="italic text-amber/90">você já está.</em>
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
            Três portas, nada além disso. Escolha a frase que descreve você
            agora — o resto do acervo continua aqui depois, sem pressa.
          </p>
        </motion.div>

        {/* As três portas */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {/* PORTA 1 — descobrir */}
          <PortaCard
            numero="01"
            kicker="Descobrir"
            titulo="Não sei por onde começar"
            descricao="Seis perguntas sobre o que você já amou, quando quer usar o perfume, como sua pele se comporta e o que você não suporta. No fim, um perfil olfativo com nome — e fragrâncias do acervo escolhidas pra ele, cada uma com o motivo da escolha."
            chips={["Seis perguntas", "Termina em recomendações"]}
            cta="Fazer o Ritual"
            href={ritualHref}
            delay={0}
          />

          {/* PORTA 2 — testar. Peso visual maior: é a porta principal. */}
          <PortaCard
            destaque
            badge="Comece por aqui"
            numero="02"
            kicker="Testar"
            titulo="Quero testar antes de escolher"
            descricao="Decant é o mesmo perfume original, fracionado num vial de 5ml ou 10ml. Você usa por dias, sente o que a sua pele faz com ele e só então decide se vale um frasco inteiro. É o menor compromisso possível com uma fragrância."
            chips={["5ml ou 10ml", "Sem compra às cegas"]}
            cta="Ver os decants"
            href={decantsHref}
            delay={0.08}
          />

          {/* PORTA 3 — buscar algo específico */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.16, ease: EASE_OUT }}
            className="h-full"
          >
            <div className="flex h-full flex-col gap-5 rounded-sm border border-ink/10 bg-cream-soft/60 p-6 shadow-editorial transition-all hover:border-amber/50 hover:shadow-product md:p-8">
              <CabecaDaPorta numero="03" kicker="Buscar" />

              <h3 className="font-display text-2xl font-light leading-[1.1] text-ink md:text-3xl">
                Já sei o que procuro
              </h3>

              {buscaComFormulario ? (
                <>
                  <p className="text-sm leading-relaxed text-ink/75 md:text-[15px]">
                    Procure por nome, marca, família olfativa, nota ou pelo
                    designer que a fragrância lembra.
                  </p>

                  {/*
                    Formulário GET nativo, de propósito: sem next/form e sem
                    onSubmit. Assim a porta funciona com JavaScript desligado —
                    /buscar já lê o parâmetro `q` de searchParams. (next/form
                    daria prefetch, mas remove o atributo `method`; aqui a
                    garantia de funcionar sem JS vale mais.)
                  */}
                  <form
                    action="/buscar"
                    method="get"
                    role="search"
                    className="mt-auto flex flex-col gap-3"
                  >
                    <label htmlFor="tres-comecos-q" className="sr-only">
                      Buscar no acervo
                    </label>

                    {/*
                      text-base (16px) evita o zoom automático do iOS ao focar.
                      min-h-[44px] no campo e no botão garante o alvo de toque.
                    */}
                    <input
                      id="tres-comecos-q"
                      name="q"
                      type="search"
                      inputMode="search"
                      enterKeyHint="search"
                      autoComplete="off"
                      placeholder="Aventus, oud, Lattafa, baunilha…"
                      className="min-h-[44px] w-full rounded-full border border-ink/20 bg-cream px-5 py-3 font-sans text-base text-ink placeholder:text-ink/60 transition-colors hover:border-amber/50 focus-visible:border-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/40"
                    />

                    <button
                      type="submit"
                      className="group inline-flex min-h-[44px] items-center justify-center gap-3 rounded-full border border-ink/20 bg-cream px-6 py-3 text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-ink transition-all hover:border-amber hover:bg-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                    >
                      Buscar
                      <span
                        aria-hidden
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </button>
                  </form>

                  {/* Saída discreta pra quem prefere folhear */}
                  <Link
                    href={catalogoHref}
                    className="inline-flex min-h-[44px] items-center gap-2 self-start text-[11px] font-sans uppercase tracking-[0.28em] text-ink/70 transition-colors hover:text-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                  >
                    ou abrir o catálogo completo
                    <span aria-hidden>→</span>
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-sm leading-relaxed text-ink/75 md:text-[15px]">
                    A busca do site percorre o acervo inteiro de uma vez, então
                    aqui ela abriria resultados misturados. Pra manter a
                    curadoria feminina limpa, esta porta leva direto ao catálogo
                    de Ela, com filtros por família e ocasião.
                  </p>

                  <Link
                    href={catalogoHref}
                    className="group mt-auto inline-flex min-h-[44px] items-center justify-center gap-3 rounded-full border border-ink/20 bg-cream px-6 py-3 text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-ink transition-all hover:border-amber hover:bg-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                  >
                    Abrir o catálogo completo
                    <span
                      aria-hidden
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Cabeçalho comum das portas ---------------- */

function CabecaDaPorta({
  numero,
  kicker,
}: {
  numero: string;
  kicker: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-lg italic text-amber/70">
        {numero}
      </span>
      <span aria-hidden className="h-px w-6 bg-amber/40" />
      <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
        {kicker}
      </span>
    </div>
  );
}

/* ---------------- Porta clicável inteira (1 e 2) ---------------- */

/**
 * Card inteiro é um Link do next/link — abre em nova aba, dá prefetch e
 * navega por teclado. Nada aqui depende de hover: o hover só enfeita.
 */
function PortaCard({
  numero,
  kicker,
  titulo,
  descricao,
  chips,
  cta,
  href,
  delay,
  destaque = false,
  badge,
}: {
  numero: string;
  kicker: string;
  titulo: string;
  descricao: string;
  chips: string[];
  cta: string;
  href: string;
  delay: number;
  destaque?: boolean;
  badge?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay, ease: EASE_OUT }}
      className="h-full"
    >
      <Link
        href={href}
        className={`group relative flex h-full flex-col gap-5 rounded-sm border p-6 transition-all hover:-translate-y-1 hover:border-amber/50 hover:shadow-product focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-cream md:p-8 ${
          destaque
            ? "border-amber/40 bg-cream-soft ring-1 ring-amber/15 shadow-product md:py-10"
            : "border-ink/10 bg-cream-soft/60 shadow-editorial"
        }`}
      >
        {badge && (
          <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-amber px-3 py-1 text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-ink shadow-[0_8px_22px_-6px_rgba(140,107,38,0.55)] md:left-8">
            <span aria-hidden className="text-ink/70">
              ✦
            </span>
            {badge}
          </span>
        )}

        <CabecaDaPorta numero={numero} kicker={kicker} />

        <h3
          className={`font-display font-light leading-[1.1] text-ink transition-colors group-hover:text-amber-bright ${
            destaque ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
          }`}
        >
          {titulo}
        </h3>

        <p className="text-sm leading-relaxed text-ink/75 md:text-[15px]">
          {descricao}
        </p>

        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center rounded-full bg-ink/[0.05] px-2.5 py-1 text-[10px] font-sans text-ink/70"
            >
              {chip}
            </span>
          ))}
        </div>

        <span
          className={`mt-auto inline-flex min-h-[44px] items-center gap-3 ${
            destaque
              ? "justify-center rounded-full bg-amber px-6 py-3 text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-ink transition-colors group-hover:bg-amber-bright"
              : "text-[11px] font-sans uppercase tracking-[0.3em] text-amber"
          }`}
        >
          {cta}
          <span
            aria-hidden
            className="transition-transform duration-500 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
