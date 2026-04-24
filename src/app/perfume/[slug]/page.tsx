import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CATALOGO, getBySlug, type Perfume } from "@/data/catalogo";
import { BRAND } from "@/lib/brand";
import { PerfumePyramid } from "@/components/ui/PerfumePyramid";
import { ReservaCard } from "@/components/ui/ReservaCard";
import { StickyReservaBar } from "@/components/ui/StickyReservaBar";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PerfumeHeroShot } from "@/components/ui/PerfumeHeroShot";
import { EvolucaoTimeline } from "@/components/ui/EvolucaoTimeline";
import { DepoimentoInline } from "@/components/ui/DepoimentoInline";
import { CrossSellKit } from "@/components/ui/CrossSellKit";
import { arquetipoDe } from "@/data/arquetipos";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return CATALOGO.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const perfume = getBySlug(slug);
  if (!perfume) return { title: "Perfume não encontrado" };

  const cloneText =
    perfume.cloneDe && perfume.cloneDe.length > 0
      ? `Inspirado em ${perfume.cloneDe.join(", ")}. `
      : "";
  const family = perfume.familia ? `${perfume.familia}. ` : "";

  return {
    title: perfume.nome,
    description: `${cloneText}${family}Curadoria ${BRAND.fullName}.`,
  };
}

export default async function PerfumePage({ params }: Props) {
  const { slug } = await params;
  const perfume = getBySlug(slug);
  if (!perfume) notFound();

  const hasNotes =
    perfume.notas.topo.length +
      perfume.notas.coracao.length +
      perfume.notas.fundo.length >
    0;

  // JSON-LD estruturado pra rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: perfume.nomeCompleto,
    description: perfume.familia
      ? `${perfume.familia}${
          perfume.cloneDe?.[0] ? `. Inspirado em ${perfume.cloneDe[0]}.` : ""
        }`
      : undefined,
    brand: perfume.marca ? { "@type": "Brand", name: perfume.marca } : undefined,
    category: perfume.familia ?? undefined,
    offers:
      perfume.precoVenda !== null
        ? {
            "@type": "Offer",
            priceCurrency: "BRL",
            price: perfume.precoVenda,
            availability: perfume.status
              ? "https://schema.org/PreOrder"
              : "https://schema.org/InStock",
            seller: { "@type": "Organization", name: BRAND.fullName },
          }
        : undefined,
  };

  return (
    <article className="relative mx-auto max-w-5xl px-6 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40">
      {/* JSON-LD estruturado */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Catálogo", href: "/catalogo" },
          { label: perfume.nome },
        ]}
      />

      {/* Header */}
      <header className="mt-10">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-2xl italic text-amber/70">
            Nº {String(perfume.numero).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            {perfume.marca ?? "Fragrância · dados em breve"}
          </span>
        </div>

        <h1 className="mt-4 font-display text-5xl font-light leading-[1.02] tracking-tight text-cream md:text-7xl lg:text-8xl">
          {perfume.nome}
        </h1>

        {perfume.familia && (
          <p className="mt-5 text-base italic text-amber/80 md:text-lg">
            {perfume.familia}
          </p>
        )}

        {perfume.cloneDe && perfume.cloneDe.length > 0 && (
          <p className="mt-3 text-sm text-cream/60 md:text-base">
            <span className="italic">Inspirado em </span>
            <span className="text-cream/90">{perfume.cloneDe.join(" · ")}</span>
            {perfume.cloneFidelidade && (
              <span className="ml-2 text-cream/50">
                · fidelidade {perfume.cloneFidelidade}
              </span>
            )}
          </p>
        )}
      </header>

      {/* Status pendente — aviso no topo pros 2 SKUs incompletos */}
      {perfume.status && (
        <div className="mt-8 rounded-sm border border-amber/25 bg-amber/5 p-5">
          <span className="text-xs italic text-amber/90">
            {perfume.status}
          </span>
        </div>
      )}

      {/* Hero do produto — foto + reserva lado a lado */}
      <section className="mt-12 grid gap-8 border-b border-cream/5 pb-12 md:gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pb-16">
        <PerfumeHeroShot perfume={perfume} />
        <ReservaCard perfume={perfume} />
      </section>

      {/* Arquétipo — humaniza o perfume com cena editorial */}
      {arquetipoDe(perfume.id) && (
        <section className="mt-16 md:mt-20">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Arquétipo
          </span>
          <blockquote className="mt-6 max-w-4xl border-l-2 border-amber/50 pl-6 font-display text-2xl font-light italic leading-[1.35] text-cream md:pl-8 md:text-3xl lg:text-4xl">
            {arquetipoDe(perfume.id)}
          </blockquote>
          <p className="mt-4 text-[10px] font-sans uppercase tracking-[0.4em] text-cream/40">
            Curadoria editorial ZAHIR
          </p>
        </section>
      )}

      {/* Ficha técnica — grid 2 colunas */}
      <section className="mt-14 grid gap-8 md:grid-cols-2">
        <FichaItem label="Volume" value={perfume.volume} />
        <FichaItem label="Concentração" value={perfume.concentracao} />
        <FichaItem
          label="Projeção"
          value={perfume.projecao ?? "—"}
          obs={perfume.projecaoObs}
        />
        <FichaItem
          label="Fixação"
          value={perfume.fixacao ?? "—"}
          obs={perfume.fixacaoObs}
        />
        {perfume.perfumista && (
          <FichaItem label="Perfumista" value={perfume.perfumista} />
        )}
        {perfume.genero && perfume.genero !== "masculino" && (
          <FichaItem label="Gênero" value={perfume.genero} />
        )}
        {perfume.marcaGrupo && (
          <FichaItem label="Grupo" value={perfume.marcaGrupo} />
        )}
        {perfume.cloneTipo && (
          <FichaItem label="Tipo de inspiração" value={perfume.cloneTipo} />
        )}
      </section>

      {/* Pirâmide olfativa — SVG animada */}
      {hasNotes && (
        <section className="mt-20">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Pirâmide olfativa
          </span>

          <div className="mt-12">
            <PerfumePyramid
              topo={perfume.notas.topo}
              coracao={perfume.notas.coracao}
              fundo={perfume.notas.fundo}
            />
          </div>
        </section>
      )}

      {/* "Cheiro na pele" — evolução ao longo do dia */}
      {hasNotes && (
        <section className="mt-20">
          <EvolucaoTimeline
            topo={perfume.notas.topo}
            coracao={perfume.notas.coracao}
            fundo={perfume.notas.fundo}
          />
        </section>
      )}

      {/* Card de inspiração editorial (quando há clone de designer) */}
      {perfume.cloneDe && perfume.cloneDe.length > 0 && (
        <InspirationCard perfume={perfume} />
      )}

      {/* Depoimento inline (se houver) */}
      <DepoimentoInline perfumeId={perfume.id} />

      {/* Cross-sell: monta kit com esse + 2 complementares */}
      <CrossSellKit perfume={perfume} />

      {/* Ocasiões */}
      {perfume.ocasioes.length > 0 && (
        <section className="mt-20">
          <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
            Ocasiões sugeridas
          </span>
          <div className="mt-6 flex flex-wrap gap-2">
            {perfume.ocasioes.map((o) => (
              <span
                key={o}
                className="rounded-full border border-cream/15 px-4 py-1.5 text-xs text-cream/80"
              >
                {o}
              </span>
            ))}
          </div>
          {perfume.ocasioesObs && (
            <p className="mt-4 text-xs italic text-cream/50">
              {perfume.ocasioesObs}
            </p>
          )}
        </section>
      )}

      {/* Sticky bar mobile */}
      <StickyReservaBar perfume={perfume} />

      {/* CTA comparar */}
      <section className="mt-20 flex flex-col items-center gap-3 rounded-sm border border-cream/10 bg-ink-soft/40 p-8 text-center md:p-10">
        <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
          Em dúvida?
        </span>
        <p className="max-w-xl font-display text-xl font-light italic text-cream md:text-2xl">
          Compara esse perfume com outro{" "}
          <span className="not-italic text-amber">lado a lado.</span>
        </p>
        <Link
          href={`/compare?a=${perfume.id}`}
          className="mt-3 rounded-full border border-amber px-6 py-3 text-[10px] font-sans uppercase tracking-[0.35em] text-amber transition-all hover:bg-amber hover:text-ink"
        >
          Comparar 2 a 2
        </Link>
      </section>

      {/* Rodapé — outros da mesma família olfativa */}
      {perfume.familia && <RelacionadosPorFamilia perfume={perfume} />}

      {/* Rodapé — outros perfumes da mesma marca */}
      {perfume.marca && <RelacionadosPorMarca perfume={perfume} />}
    </article>
  );
}

/* ---------------- Card de inspiração designer ---------------- */

function InspirationCard({ perfume }: { perfume: Perfume }) {
  const fidelidade = perfume.cloneFidelidade;
  const clones = perfume.cloneDe ?? [];

  return (
    <section className="mt-16">
      <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
        <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
        Se você gosta de
      </span>

      <div className="mt-8 relative overflow-hidden rounded-sm border border-amber/25 bg-gradient-to-br from-ink-soft via-ink to-wine-deep/40 p-8 md:p-12">
        {/* Decorativo: texto gigante sombra */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-6 select-none font-display italic text-amber/[0.08]"
          style={{ fontSize: "clamp(8rem, 18vw, 16rem)", lineHeight: 0.8 }}
        >
          ×
        </div>

        <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-baseline gap-3">
              {clones.map((c, i) => (
                <span
                  key={c}
                  className="font-display text-2xl font-light italic text-amber md:text-3xl"
                >
                  {c}
                  {i < clones.length - 1 && (
                    <span className="ml-3 text-cream/40">·</span>
                  )}
                </span>
              ))}
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-cream/75">
              {buildInspirationText(perfume)}
            </p>
          </div>

          {fidelidade && (
            <div className="flex flex-col items-start gap-1 border-l-2 border-amber/30 pl-6 md:items-end md:border-l-0 md:border-r-0 md:pl-0">
              <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-cream/50">
                Fidelidade
              </span>
              <span className="font-display text-5xl font-light leading-none text-amber md:text-6xl">
                {fidelidade}
              </span>
            </div>
          )}
        </div>

        {perfume.cloneTipo && (
          <p className="relative mt-8 text-xs italic text-cream/50">
            {perfume.cloneTipo}
          </p>
        )}
      </div>
    </section>
  );
}

function buildInspirationText(perfume: Perfume): string {
  const name = perfume.nome;
  const fidelidade = perfume.cloneFidelidade;
  const price = perfume.precoVenda;

  if (fidelidade && price) {
    return `${name} entrega fidelidade ${fidelidade} do designer, por uma fração do preço (R$ ${Math.round(
      price
    )} versus o original). A projeção e fixação, na maioria dos casos, superam a versão europeia — porque fragrâncias árabes são formuladas com concentração maior.`;
  }
  if (fidelidade) {
    return `${name} entrega fidelidade ${fidelidade} do designer. Projeção e fixação geralmente superam a versão europeia — perfumarias árabes formulam com concentração maior.`;
  }
  return `${name} conversa com o DNA desse(s) designer(s) — seja como interpretação direta ou como referência olfativa. Decant de 10 ml permite testar antes de investir no frasco cheio.`;
}

/* ---------------- Relacionados por família ---------------- */

function RelacionadosPorFamilia({ perfume }: { perfume: Perfume }) {
  if (!perfume.familia) return null;
  const outros = CATALOGO.filter(
    (p) =>
      p.id !== perfume.id &&
      p.familia === perfume.familia &&
      p.marca !== perfume.marca // evita repetir com "mesma marca"
  ).slice(0, 3);

  if (outros.length === 0) return null;

  return (
    <section className="mt-24 border-t border-cream/5 pt-12">
      <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
        <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
        Mesma família olfativa
      </span>
      <p className="mt-3 text-xs italic text-cream/50">
        Outras fragrâncias {perfume.familia.toLowerCase()} na curadoria.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {outros.map((o) => (
          <li key={o.id}>
            <Link
              href={`/perfume/${o.id}`}
              className="group flex flex-col gap-2 rounded-sm border border-cream/5 bg-ink-soft p-5 transition-all hover:border-amber/40 hover:bg-ink-muted"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-amber/70">
                  Nº {String(o.numero).padStart(2, "0")}
                </span>
                <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-cream/40">
                  {o.marca ?? "—"}
                </span>
              </div>
              <span className="font-display text-xl font-light text-cream transition-colors group-hover:text-amber/95">
                {o.nome}
              </span>
              {o.cloneDe && o.cloneDe[0] && (
                <span className="text-xs italic text-cream/55">
                  inspirado em {o.cloneDe[0]}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- Subcomponentes ---------------- */

function FichaItem({
  label,
  value,
  obs,
}: {
  label: string;
  value: string;
  obs?: string;
}) {
  return (
    <div className="border-l-2 border-amber/40 pl-5">
      <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-cream/40">
        {label}
      </span>
      <p className="mt-1.5 font-display text-lg font-light capitalize text-cream">
        {value}
      </p>
      {obs && <p className="mt-1 text-xs italic text-cream/50">{obs}</p>}
    </div>
  );
}

function RelacionadosPorMarca({ perfume }: { perfume: Perfume }) {
  const outros = CATALOGO.filter(
    (p) => p.marca === perfume.marca && p.id !== perfume.id
  ).slice(0, 4);

  if (outros.length === 0) return null;

  return (
    <section className="mt-24 border-t border-cream/5 pt-12">
      <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
        <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
        Outras {perfume.marca}
      </span>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {outros.map((o) => (
          <li key={o.id}>
            <Link
              href={`/perfume/${o.id}`}
              className="group flex flex-col gap-3 rounded-sm border border-cream/5 bg-ink-soft transition-all hover:border-amber/40"
            >
              <div className="relative aspect-square overflow-hidden rounded-t-sm">
                <Image
                  src={`/perfumes/${o.id}.png`}
                  alt={o.nome}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1 px-4 pb-4">
                <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-amber/70">
                  Nº {String(o.numero).padStart(2, "0")}
                </span>
                <span className="font-display text-base font-light text-cream transition-colors group-hover:text-amber/90 md:text-lg">
                  {o.nome}
                </span>
                <span className="text-xs italic text-cream/50">
                  {o.familia ?? "—"}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function formatPrice(n: number | null): string {
  if (n === null) return "—";
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
