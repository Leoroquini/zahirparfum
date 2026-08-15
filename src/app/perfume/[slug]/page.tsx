import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CATALOGO, getBySlug } from "@/data/catalogo";
import { BRAND } from "@/lib/brand";
import { getGenero } from "@/lib/genero";
import { PerfumeExperience } from "@/components/perfume-v3/PerfumeExperience";

type Props = { params: Promise<{ slug: string }> };

/**
 * Gera apenas slugs masculinos + unissex. Espelha a guarda que
 * /ela/perfume/[slug] já fazia no sentido oposto.
 *
 * Sem isso, os 45 SKUs femininos existiam nas DUAS rotas servindo o mesmo
 * componente — conteúdo duplicado sem canonical, e o sitemap ainda publicava
 * a versão /perfume/{slug} como se fosse a canônica deles.
 */
export async function generateStaticParams() {
  return CATALOGO.filter((p) => {
    const g = getGenero(p);
    return g === "masculino" || g === "unissex";
  }).map((p) => ({ slug: p.id }));
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

  // SKU estritamente feminino redireciona pro mundo /ela.
  // Preserva as URLs /perfume/{slug} femininas que já estavam indexadas —
  // elas passam a apontar pra rota canônica em vez de duplicar conteúdo.
  if (getGenero(perfume) === "feminino") {
    redirect(`/ela/perfume/${slug}`);
  }

  return <PerfumeExperience perfume={perfume} />;
}
