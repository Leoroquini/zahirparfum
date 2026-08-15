import type { MetadataRoute } from "next";
import { CATALOGO } from "@/data/catalogo";
import { CURADORIAS } from "@/data/curadorias";
import { NOTAS } from "@/data/notas";
import { rotaPerfume } from "@/lib/genero";
import { siteUrlCanonico } from "@/lib/site";

const BASE = siteUrlCanonico();

/** Seções do mundo masculino (rotas na raiz). */
const SECOES_ELE = [
  "catalogo",
  "mapa",
  "ritual",
  "comparador",
  "curadorias",
  "decants",
  "notas",
  "manifesto",
];

/**
 * Seções do mundo feminino. Estavam TODAS fora do sitemap — o site inteiro
 * de /ela era invisível pro Google no nível de seção, apesar de ter 45 SKUs.
 * `curadorias` e `notas` não entram aqui: são hubs editoriais únicos, sem
 * rota espelhada em /ela.
 */
const SECOES_ELA = [
  "ela/catalogo",
  "ela/mapa",
  "ela/ritual",
  "ela/comparador",
  "ela/decants",
  "ela/manifesto",
];

const INSTITUCIONAIS = [
  "como-comprar",
  "entrega",
  "trocas-e-devolucoes",
  "faq",
  "contato",
  "termos",
  "privacidade",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home = {
    url: BASE,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  // Entradas dos mundos (LP raiz unissex aponta pra ambos via cards Ele/Ela)
  const mundos = [
    {
      url: `${BASE}/ele`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${BASE}/ela`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  const secoes = [...SECOES_ELE, ...SECOES_ELA].map((s) => ({
    url: `${BASE}/${s}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const institucionais = INSTITUCIONAIS.map((s) => ({
    url: `${BASE}/${s}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // rotaPerfume() manda cada SKU pra sua rota canônica: feminino →
  // /ela/perfume/{slug}, masculino e unissex → /perfume/{slug}. Antes daqui
  // saíam 86 URLs todas em /perfume/, inclusive as dos 45 femininos, cuja
  // rota real é /ela/perfume/.
  const perfumes = CATALOGO.map((p) => ({
    url: `${BASE}${rotaPerfume(p)}`,
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

  const notasIndividuais = NOTAS.map((n) => ({
    url: `${BASE}/nota/${n.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    home,
    ...mundos,
    ...secoes,
    ...institucionais,
    ...perfumes,
    ...curadoriasIndividuais,
    ...notasIndividuais,
  ];
}
