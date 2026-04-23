import type { MetadataRoute } from "next";
import { CATALOGO } from "@/data/catalogo";
import { CURADORIAS } from "@/data/curadorias";

const BASE = "https://zahirparfums.com.br";

const SECOES_DEDICADAS = [
  "catalogo",
  "mapa",
  "ritual",
  "comparador",
  "curadorias",
  "decants",
  "manifesto",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home = {
    url: BASE,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  const secoes = SECOES_DEDICADAS.map((s) => ({
    url: `${BASE}/${s}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const perfumes = CATALOGO.map((p) => ({
    url: `${BASE}/perfume/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const curadoriasIndividuais = CURADORIAS.map((c) => ({
    url: `${BASE}/curadoria/${c.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [home, ...secoes, ...perfumes, ...curadoriasIndividuais];
}
