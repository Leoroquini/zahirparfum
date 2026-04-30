import { CATALOGO, type Perfume } from "@/data/catalogo";
import {
  OCASIOES,
  type Ocasiao,
  type RegistroDiario,
  type Sentimento,
} from "@/lib/diario-store";

/**
 * Funções puras pra calcular insights agregados a partir de uma
 * lista de registros do diário. Tudo determinístico, sem efeitos.
 */

const PESO_SENTIMENTO: Record<Sentimento, number> = {
  amei: 3,
  gostei: 2,
  neutro: 1,
  errou: -1,
};

/* ---------------- Filtros temporais ---------------- */

/** Registros do mês corrente */
export function registrosDoMes(registros: RegistroDiario[]): RegistroDiario[] {
  const agora = new Date();
  const mes = agora.getMonth();
  const ano = agora.getFullYear();
  return registros.filter((r) => {
    const d = new Date(r.data);
    return d.getMonth() === mes && d.getFullYear() === ano;
  });
}

/** Registros dos últimos N dias */
export function registrosUltimosDias(
  registros: RegistroDiario[],
  dias: number,
): RegistroDiario[] {
  const limite = Date.now() - dias * 24 * 60 * 60 * 1000;
  return registros.filter((r) => r.data >= limite);
}

/* ---------------- Top de família olfativa ---------------- */

export type ContagemFamilia = {
  familia: string;
  count: number;
  pct: number;
};

export function familiasMaisUsadas(
  registros: RegistroDiario[],
): ContagemFamilia[] {
  const counts = new Map<string, number>();
  for (const r of registros) {
    const p = CATALOGO.find((x) => x.id === r.perfumeId);
    if (!p?.familia) continue;
    counts.set(p.familia, (counts.get(p.familia) ?? 0) + 1);
  }
  const total = Array.from(counts.values()).reduce((s, n) => s + n, 0);
  return Array.from(counts.entries())
    .map(([familia, count]) => ({
      familia,
      count,
      pct: total > 0 ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);
}

/* ---------------- Top de ocasião ---------------- */

export type ContagemOcasiao = {
  ocasiao: Ocasiao;
  label: string;
  count: number;
  pct: number;
};

export function ocasioesMaisUsadas(
  registros: RegistroDiario[],
): ContagemOcasiao[] {
  const counts = new Map<Ocasiao, number>();
  for (const r of registros) {
    counts.set(r.ocasiao, (counts.get(r.ocasiao) ?? 0) + 1);
  }
  const total = registros.length;
  return Array.from(counts.entries())
    .map(([ocasiao, count]) => ({
      ocasiao,
      label: OCASIOES.find((o) => o.value === ocasiao)?.label ?? ocasiao,
      count,
      pct: total > 0 ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);
}

/* ---------------- Perfume mais usado ---------------- */

export type ContagemPerfume = {
  perfume: Perfume;
  count: number;
  scoreSentimento: number;
};

export function perfumesMaisUsados(
  registros: RegistroDiario[],
): ContagemPerfume[] {
  const counts = new Map<string, number>();
  const scores = new Map<string, number>();
  for (const r of registros) {
    counts.set(r.perfumeId, (counts.get(r.perfumeId) ?? 0) + 1);
    scores.set(
      r.perfumeId,
      (scores.get(r.perfumeId) ?? 0) + PESO_SENTIMENTO[r.sentimento],
    );
  }
  const result: ContagemPerfume[] = [];
  for (const [id, count] of counts.entries()) {
    const perfume = CATALOGO.find((p) => p.id === id);
    if (!perfume) continue;
    result.push({
      perfume,
      count,
      scoreSentimento: scores.get(id) ?? 0,
    });
  }
  return result.sort((a, b) => b.count - a.count);
}

/* ---------------- Hits (perfumes ganhadores) ---------------- */

/** Perfumes que receberam "amei" 2+ vezes OU score >= 5 */
export function hitsDoMes(registros: RegistroDiario[]): ContagemPerfume[] {
  const top = perfumesMaisUsados(registros);
  return top.filter((p) => p.scoreSentimento >= 5);
}

/* ---------------- Lacunas (ocasiões/famílias não exploradas) ---------------- */

export function ocasioesNaoExploradas(
  registros: RegistroDiario[],
): { ocasiao: Ocasiao; label: string }[] {
  const usadas = new Set(registros.map((r) => r.ocasiao));
  return OCASIOES.filter((o) => !usadas.has(o.value)).map((o) => ({
    ocasiao: o.value,
    label: o.label,
  }));
}

/* ---------------- Sugestão inteligente ---------------- */

/**
 * Sugere até 3 perfumes do catálogo que:
 *   1. são da família mais usada do cliente, MAS que ele nunca registrou ainda
 *   2. ou são versáteis (várias ocasiões), pra preencher lacunas
 */
export function sugestoesPersonalizadas(
  registros: RegistroDiario[],
  limite = 3,
): { perfume: Perfume; razao: string }[] {
  if (registros.length === 0) return [];

  const usadosIds = new Set(registros.map((r) => r.perfumeId));
  const familias = familiasMaisUsadas(registros);
  const familiaTop = familias[0]?.familia;

  const candidatos: { perfume: Perfume; razao: string }[] = [];

  // Razão 1: mesma família dominante, ainda não testou
  if (familiaTop) {
    for (const p of CATALOGO) {
      if (usadosIds.has(p.id)) continue;
      if (p.familia === familiaTop) {
        candidatos.push({
          perfume: p,
          razao: `Mesma família que você ama (${familiaTop})`,
        });
      }
    }
  }

  // Razão 2: lacunas de ocasião
  const lacunas = ocasioesNaoExploradas(registros);
  if (lacunas.length > 0 && candidatos.length < limite) {
    const lacuna = lacunas[0];
    for (const p of CATALOGO) {
      if (usadosIds.has(p.id)) continue;
      if (candidatos.some((c) => c.perfume.id === p.id)) continue;
      const cobre = p.ocasioes.some((o) =>
        o.toLowerCase().includes(lacuna.label.toLowerCase().split(" ")[0]),
      );
      if (cobre) {
        candidatos.push({
          perfume: p,
          razao: `Você nunca registrou nada pra "${lacuna.label}"`,
        });
        if (candidatos.length >= limite) break;
      }
    }
  }

  return candidatos.slice(0, limite);
}

/* ---------------- Resumo geral pra cards ---------------- */

export type ResumoDiario = {
  totalRegistros: number;
  totalMes: number;
  familiaTop: ContagemFamilia | null;
  ocasiaoTop: ContagemOcasiao | null;
  perfumeTop: ContagemPerfume | null;
  hitsCount: number;
};

export function resumoGeral(registros: RegistroDiario[]): ResumoDiario {
  const mes = registrosDoMes(registros);
  const familias = familiasMaisUsadas(registros);
  const ocasioes = ocasioesMaisUsadas(registros);
  const perfumes = perfumesMaisUsados(registros);
  const hits = hitsDoMes(registros);
  return {
    totalRegistros: registros.length,
    totalMes: mes.length,
    familiaTop: familias[0] ?? null,
    ocasiaoTop: ocasioes[0] ?? null,
    perfumeTop: perfumes[0] ?? null,
    hitsCount: hits.length,
  };
}
