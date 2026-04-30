#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const MD_PATH = path.join(__dirname, '../informações novas/catalogo-zahir.md');
const OUT_PATH = path.join(__dirname, '../src/data/catalogo.ts');

function parseYaml(str) {
  const result = {};
  const lines = str.split('\n');

  let parentKey = null; // chave pai quando estamos dentro de um bloco aninhado (ex: notas:)

  for (const line of lines) {
    if (!line.trim()) continue;

    // Conta indentação (pra detectar nesting)
    const indent = line.match(/^(\s*)/)[1].length;
    const trimmed = line.trim();

    // Match chave: valor
    const match = trimmed.match(/^(\w+):\s*(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;

    function parseValue(raw) {
      if (raw.startsWith('[')) {
        const content = raw.slice(1, -1);
        return content ? content.split(',').map(s => s.trim()) : [];
      }
      if (raw === 'null' || raw === '') return null;
      if (!isNaN(raw)) return Number(raw);
      return raw;
    }

    // Linha sem indentação ou indentação base = chave raiz
    if (indent === 0) {
      if (rawValue === '') {
        // Chave que abre bloco aninhado (ex: "notas:")
        result[key] = {};
        parentKey = key;
      } else {
        result[key] = parseValue(rawValue);
        parentKey = null;
      }
    } else {
      // Linha indentada → propriedade do parentKey
      if (parentKey && result[parentKey] && typeof result[parentKey] === 'object' && !Array.isArray(result[parentKey])) {
        result[parentKey][key] = parseValue(rawValue);
      } else {
        // Fallback: trata como chave raiz se não há contexto
        result[key] = parseValue(rawValue);
      }
    }
  }

  return result;
}

function parseSections(content) {
  const sections = content.split('\n---\n').slice(1, -1); // Skip intro and summary
  const perfumes = [];

  for (const section of sections) {
    const lines = section.trim().split('\n');
    const titleLine = lines[0];

    // Extract numero from "## NN · Nome"
    const titleMatch = titleLine.match(/^#+\s*(\d+)\s*·\s*(.+)$/);
    if (!titleMatch) continue;

    const numero = parseInt(titleMatch[1]);
    const nome = titleMatch[2].trim();

    // Find YAML block (between ``` markers)
    const yamlStart = section.indexOf('```yaml');
    const yamlEnd = section.indexOf('```', yamlStart + 7);

    if (yamlStart === -1) continue;

    const yamlStr = section.substring(yamlStart + 7, yamlEnd);
    const data = parseYaml(yamlStr);

    // Convert snake_case keys to camelCase
    const camelCased = {
      numero,
      nome,
      nomeCompleto: `${nome} ${data.concentracao} ${data.volume}`,
      marca: data.marca,
      marcaGrupo: data.marca_grupo,
      volume: data.volume,
      concentracao: data.concentracao,
      familia: data.familia,
      cloneDe: data.clone_de,
      cloneFidelidade: data.clone_fidelidade,
      cloneTipo: data.clone_tipo,
      projecao: data.projecao,
      projecaoObs: data.projecao_obs,
      fixacao: data.fixacao,
      fixacaoObs: data.fixacao_obs,
      precoMercado: data.preco_mercado,
      precoVenda: data.preco_venda,
      ocasioes: data.ocasioes || [],
      ocasioesObs: data.ocasioes_obs,
      notas: data.notas || { topo: [], coracao: [], fundo: [] },
      perfumista: data.perfumista,
      genero: data.genero,
      status: data.status,
    };

    // Generate slug from nome
    camelCased.id = nome
      .toLowerCase()
      .replace(/[çãáéíóúâôê]/g, c => {
        const map = { ç: 'c', ã: 'a', á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', â: 'a', ô: 'o', ê: 'e' };
        return map[c] || c;
      })
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // Keep required fields that can be null, remove truly optional ones
    const requiredFields = ['id', 'numero', 'nome', 'nomeCompleto', 'volume', 'concentracao', 'familia', 'marca', 'cloneDe', 'projecao', 'fixacao', 'precoMercado', 'precoVenda', 'ocasioes', 'notas'];
    Object.keys(camelCased).forEach(k => {
      if (requiredFields.includes(k)) {
        // Keep required fields even if null
        return;
      }
      if (camelCased[k] === undefined) {
        delete camelCased[k];
      } else if (camelCased[k] === null && !requiredFields.includes(k)) {
        delete camelCased[k];
      } else if (Array.isArray(camelCased[k]) && camelCased[k].length === 0 && !requiredFields.includes(k)) {
        delete camelCased[k];
      }
    });

    perfumes.push(camelCased);
  }

  return perfumes.sort((a, b) => a.numero - b.numero);
}

const mdContent = fs.readFileSync(MD_PATH, 'utf-8');
const perfumes = parseSections(mdContent);

console.log(`✓ Parsed ${perfumes.length} perfumes`);

// Generate perfume entries
const perfumeEntries = perfumes.map(p => {
  const lines = ['  {'];

  // Order fields consistently
  const fields = [
    'id', 'numero', 'nome', 'nomeCompleto', 'marca', 'marcaGrupo',
    'volume', 'concentracao', 'familia', 'cloneDe', 'cloneFidelidade', 'cloneTipo',
    'projecao', 'projecaoObs', 'fixacao', 'fixacaoObs',
    'precoMercado', 'precoVenda', 'ocasioes', 'ocasioesObs',
    'notas', 'perfumista', 'genero', 'status', 'destaque', 'decantDisponivel', 'arquetipo'
  ];

  for (const field of fields) {
    if (!(field in p)) continue;

    const value = p[field];
    if (value === undefined) continue;

    if (field === 'notas') {
      lines.push('    notas: {');
      lines.push('      topo: [' + value.topo.map(n => '"' + n + '"').join(', ') + '],');
      lines.push('      coracao: [' + value.coracao.map(n => '"' + n + '"').join(', ') + '],');
      lines.push('      fundo: [' + value.fundo.map(n => '"' + n + '"').join(', ') + '],');
      lines.push('    },');
    } else if (Array.isArray(value)) {
      lines.push('    ' + field + ': [' + value.map(v => '"' + v + '"').join(', ') + '],');
    } else if (field === 'cloneDe' && typeof value === 'string') {
      // Ensure cloneDe is always an array
      lines.push('    ' + field + ': ["' + value + '"],');
    } else if (typeof value === 'string') {
      lines.push('    ' + field + ': "' + value.replace(/"/g, '\\"') + '",');
    } else if (value === null) {
      lines.push('    ' + field + ': null,');
    } else {
      lines.push('    ' + field + ': ' + value + ',');
    }
  }

  const lastLine = lines[lines.length - 1];
  if (lastLine.endsWith(',')) {
    lines[lines.length - 1] = lastLine.slice(0, -1);
  }
  lines.push('  },');
  return lines.join('\n');
}).join('\n');

const typeScriptCode = `/**
 * CATÁLOGO ZAHIR PARFUMS
 * Fonte: informações novas/catalogo-zahir.md (${new Date().toLocaleDateString('pt-BR')})
 * Preços de venda com margem bruta ~30% (custo ÷ 0.7, arredondado pra múltiplo de 5).
 * \`precoMercado\` = referência do designer original / custo de boutique no Brasil.
 */

export type Projecao =
  | "discreta"
  | "moderada"
  | "moderada-alta"
  | "alta"
  | "nuclear";

export type Concentracao = "EDT" | "EDP" | "Extrait" | "Elixir";

export type Perfume = {
  id: string;                    // slug estável, usado em URLs
  numero: number;                // 1..28 (posição no catálogo inicial)
  nome: string;                  // "Club de Nuit Intense"
  nomeCompleto: string;          // "Club de Nuit Intense EDT 105ml"
  marca: string | null;          // "Armaf", "Lattafa", etc — null quando a verificar
  marcaGrupo?: string;           // "Fragrance World" para French Avenue
  volume: string;                // "100ml", "60ml", "105ml"
  concentracao: Concentracao;
  familia: string | null;        // "Amadeirado Aromático" etc
  cloneDe: string[] | null;      // ["Creed Aventus"] — null quando DNA próprio
  cloneFidelidade?: string;      // "85-90%" — só quando explícito
  cloneTipo?: string;            // "DNA próprio", "referência", etc
  projecao: Projecao | null;
  projecaoObs?: string;          // "máx. 2 borrifadas"
  fixacao: string | null;        // "8-10h", "10h+", null
  fixacaoObs?: string;           // "melhora após maceração"
  precoMercado: number | null;   // referência do mercado brasileiro
  precoVenda: number | null;     // preço da Zahir
  ocasioes: string[];            // [noite, inverno, encontro, trabalho, etc]
  ocasioesObs?: string;
  notas: {
    topo: string[];
    coracao: string[];
    fundo: string[];
  };
  perfumista?: string;           // "Quentin Bisch" etc
  genero?: "masculino" | "unissex" | "feminino";  // default: masculino
  status?: string;               // "dados pendentes" para SKUs incompletos
  /** Badge de destaque visível no card (curadoria editorial) */
  destaque?: "mais-pedido" | "novidade" | "ultimas-unidades" | "curadoria";
  /** Se decant deste SKU está disponível pra reserva (default true; marcar false quando não rola) */
  decantDisponivel?: boolean;
  /**
   * Arquétipo de persona — frase editorial curta que humaniza o perfume.
   * Padrão: "Usado pelo cara que…" + comportamento concreto.
   * Foca em cena/atitude, não em adjetivo vago.
   */
  arquetipo?: string;
};

export const CATALOGO: Perfume[] = [
${perfumeEntries}
];

/** Lista única de marcas usadas (útil pra filtros) */
export const MARCAS: string[] = Array.from(
  new Set(CATALOGO.map((p) => p.marca).filter(Boolean) as string[])
).sort();

/** Lista única de famílias olfativas usadas (útil pra filtros) */
export const FAMILIAS: string[] = Array.from(
  new Set(CATALOGO.map((p) => p.familia).filter(Boolean) as string[])
).sort();

/** Lista única de ocasiões usadas (útil pra filtros) */
export const OCASIOES: string[] = Array.from(
  new Set(CATALOGO.flatMap((p) => p.ocasioes))
).sort();

/** Todos os perfumes designer referenciados como "clone de" */
export const REFERENCIAS_DESIGNER: string[] = Array.from(
  new Set(CATALOGO.flatMap((p) => p.cloneDe ?? []))
).sort();

/* ---------------- Helpers de consulta ---------------- */

export function getBySlug(slug: string): Perfume | undefined {
  return CATALOGO.find((p) => p.id === slug);
}

export function getByFamilia(familia: string): Perfume[] {
  return CATALOGO.filter(
    (p) => p.familia?.toLowerCase().includes(familia.toLowerCase())
  );
}

export function getByMarca(marca: string): Perfume[] {
  return CATALOGO.filter((p) => p.marca === marca);
}

export function getByOcasiao(ocasiao: string): Perfume[] {
  return CATALOGO.filter((p) =>
    p.ocasioes.some((o) => o.toLowerCase() === ocasiao.toLowerCase())
  );
}

export function getPrimeirosPerfumes(limit = 5): Perfume[] {
  // Curadoria "primeiros perfumes": entrada com preço acessível + projeção alta + versatilidade
  return CATALOGO.filter(
    (p) =>
      p.precoVenda !== null &&
      p.precoVenda <= 230 &&
      (p.projecao === "alta" || p.projecao === "moderada-alta") &&
      p.ocasioes.some((o) => ["versátil", "dia", "noite", "todas as estações"].includes(o))
  )
    .sort((a, b) => (a.precoVenda ?? 0) - (b.precoVenda ?? 0))
    .slice(0, limit);
}

export function temDadosCompletos(p: Perfume): boolean {
  return (
    !!p.marca &&
    !!p.familia &&
    p.notas.topo.length + p.notas.coracao.length + p.notas.fundo.length > 0
  );
}
`;

fs.writeFileSync(OUT_PATH, typeScriptCode);
console.log(`✓ Wrote ${OUT_PATH}`);
