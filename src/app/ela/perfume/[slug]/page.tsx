import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CATALOGO, getBySlug } from "@/data/catalogo";
import { BRAND } from "@/lib/brand";
import { getGenero } from "@/lib/genero";
import { PerfumeExperience } from "@/components/perfume-v3/PerfumeExperience";

type Props = { params: Promise<{ slug: string }> };

/**
 * Gera apenas slugs femininos + unissex pra static generation de /ela.
 * SKUs estritamente masculinos redirecionam para /perfume/[slug] (mundo /ele).
 */
export async function generateStaticParams() {
  return CATALOGO.filter((p) => {
    const g = getGenero(p);
    return g === "feminino" || g === "unissex";
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
    title: `${perfume.nome} · Para Ela`,
    description: `${cloneText}${family}Curadoria feminina ${BRAND.fullName}.`,
  };
}

export default async function PerfumeElaPage({ params }: Props) {
  const { slug } = await params;
  const perfume = getBySlug(slug);
  if (!perfume) notFound();

  // Se for SKU estritamente masculino, redireciona pro mundo /ele
  // (evita conteúdo duplicado e mantém SEO claro)
  const genero = getGenero(perfume);
  if (genero === "masculino") {
    redirect(`/perfume/${slug}`);
  }

  return <PerfumeExperience perfume={perfume} />;
}
