"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { PageHero } from "@/components/layout/PageHero";
import { DiarioRegistro } from "@/components/sections/DiarioRegistro";
import { DiarioInsights } from "@/components/sections/DiarioInsights";
import { DiarioHistorico } from "@/components/sections/DiarioHistorico";
import { useDiario, clearDiario } from "@/lib/diario-store";
import { toast } from "@/lib/toast-store";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

export default function DiarioPage() {
  const registros = useDiario();
  const [confirmandoLimpeza, setConfirmandoLimpeza] = useState(false);

  const handleExportar = () => {
    if (registros.length === 0) return;
    const blob = new Blob([JSON.stringify(registros, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zahir-diario-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(
      "Diário exportado",
      "Arquivo JSON salvo no seu computador. Guarde se for trocar de celular.",
    );
  };

  const handleLimpar = () => {
    clearDiario();
    setConfirmandoLimpeza(false);
    toast.success("Diário limpo", "Todos os registros foram apagados.");
  };

  return (
    <>
      <PageHero
        eyebrow="Diário olfativo"
        titulo={
          <>
            Seu padrão olfativo,{" "}
            <em className="italic text-amber/90">com dados.</em>
          </>
        }
        descricao="Registra qual perfume você usou e em qual ocasião. Em algumas semanas, esta página vira um espelho do seu gosto, família dominante, ocasiões favoritas, lacunas. Sem cadastro, sem senha. Os dados ficam só neste celular."
        backgroundGradient="radial-gradient(ellipse at 30% 50%, rgba(200,155,60,0.1), transparent 60%)"
      />

      <section className="section-veil-light px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto flex max-w-4xl flex-col gap-12">
          {registros.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <DiarioInsights registros={registros} />
              <DiarioRegistro />
              <DiarioHistorico registros={registros} />
              <FerramentasGerenciamento
                onExportar={handleExportar}
                onSolicitarLimpeza={() => setConfirmandoLimpeza(true)}
              />
            </>
          )}

          {/* Modal de confirmação de limpeza */}
          {confirmandoLimpeza && (
            <ConfirmDialog
              onCancel={() => setConfirmandoLimpeza(false)}
              onConfirm={handleLimpar}
            />
          )}
        </div>
      </section>
    </>
  );
}

/* ---------------- Empty state ---------------- */

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="flex flex-col gap-12"
    >
      <div className="rounded-sm border border-amber/25 p-8 md:p-12">
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber">
          Como funciona
        </span>
        <p className="mt-4 font-display text-3xl font-light leading-[1.15] text-ink md:text-4xl">
          Em 15 segundos por dia, você constrói um espelho real do{" "}
          <em className="italic text-amber/90">seu gosto</em>.
        </p>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {PASSOS.map((p, i) => (
            <li key={p.titulo} className="flex flex-col gap-3">
              <span className="font-display text-2xl italic text-amber/70">
                0{i + 1}.
              </span>
              <span className="font-display text-lg font-light text-ink">
                {p.titulo}
              </span>
              <span className="text-sm leading-relaxed text-ink/65">
                {p.descricao}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <DiarioRegistro />

      <div className="rounded-sm border border-ink/8 p-6 md:p-8">
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber/80">
          Por quê isso ajuda
        </span>
        <p className="mt-3 text-base leading-relaxed text-ink/75 md:text-lg">
          A maioria das pessoas acha que sabe o próprio gosto olfativo. Em 30
          dias de registro, o cliente quase sempre descobre que o que ele{" "}
          <em className="italic text-ink">acha</em> que prefere é diferente
          do que ele usa de verdade. Esse desencontro é o lugar onde a
          curadoria começa a fazer sentido, porque agora você tem dado, não
          opinião.
        </p>
        <p className="mt-4 text-sm italic text-ink/70">
          Os dados ficam só neste celular. A ZAHIR não vê o seu diário a menos
          que você compartilhe.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <p className="text-sm text-ink/65">
          Quer ajuda escolhendo o primeiro perfume pra registrar?
        </p>
        <Link
          href="/ritual"
          className="rounded-full border border-amber/50 px-6 py-2.5 text-[10px] font-sans uppercase tracking-[0.3em] text-amber transition-all hover:border-amber hover:bg-amber hover:text-ink"
        >
          Faz O Ritual →
        </Link>
      </div>
    </motion.div>
  );
}

const PASSOS = [
  {
    titulo: "Registra um uso",
    descricao:
      "Escolhe o perfume, marca a ocasião e o sentimento. Pode adicionar uma observação curta.",
  },
  {
    titulo: "Acumula registros",
    descricao:
      "A partir do terceiro registro, a página começa a mostrar padrões reais do seu uso.",
  },
  {
    titulo: "Descobre o gosto",
    descricao:
      "Família dominante, ocasiões mais comuns, lacunas e sugestões certeiras pra próxima compra.",
  },
];

/* ---------------- Ferramentas (exportar / limpar) ---------------- */

function FerramentasGerenciamento({
  onExportar,
  onSolicitarLimpeza,
}: {
  onExportar: () => void;
  onSolicitarLimpeza: () => void;
}) {
  return (
    <div className="rounded-sm border border-ink/8 p-6 md:p-8">
      <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-amber/80">
        Gerenciar
      </span>
      <p className="mt-3 text-sm leading-relaxed text-ink/70">
        Os dados ficam só neste celular. Se você for trocar de aparelho, exporta
        antes pra não perder o histórico.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onExportar}
          className="rounded-full border border-amber/50 px-5 py-2 text-[10px] font-sans uppercase tracking-[0.3em] text-amber transition-all hover:border-amber hover:bg-amber/10"
        >
          Exportar diário (.json)
        </button>
        <button
          type="button"
          onClick={onSolicitarLimpeza}
          className="rounded-full border border-ink/15 px-5 py-2 text-[10px] font-sans uppercase tracking-[0.3em] text-ink/70 transition-all hover:border-wine hover:text-wine"
        >
          Apagar tudo
        </button>
      </div>
    </div>
  );
}

/* ---------------- Confirmação ---------------- */

function ConfirmDialog({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-cream/85 px-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        className="w-full max-w-md rounded-sm border border-wine/40 p-6 md:p-8"
      >
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-wine">
          Apagar diário?
        </span>
        <p className="mt-3 text-base leading-relaxed text-ink/85">
          Todos os registros desse celular serão apagados. Essa ação{" "}
          <em className="italic text-ink">não pode ser desfeita</em>.
        </p>
        <p className="mt-2 text-sm italic text-ink/70">
          Se quiser preservar, exporta antes.
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-ink/20 px-5 py-2 text-[10px] font-sans uppercase tracking-[0.3em] text-ink/85 transition-all hover:border-amber hover:text-amber"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-wine px-5 py-2 text-[10px] font-sans uppercase tracking-[0.3em] text-ink transition-all hover:bg-wine-deep"
          >
            Apagar tudo
          </button>
        </div>
      </motion.div>
    </div>
  );
}
