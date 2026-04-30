import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATALOGO, getBySlug } from "@/data/catalogo";
import { BRAND } from "@/lib/brand";
import { PerfumeExperience } from "@/components/perfume-v3/PerfumeExperience";

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

  return <PerfumeExperience perfume={perfume} />;
}
