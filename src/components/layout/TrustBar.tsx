/**
 * Barra de confiança — fica acima do footer em todas as páginas.
 * Transmite os quatro pilares de segurança/qualidade em 1 linha visual.
 */
export function TrustBar() {
  return (
    <div className="border-t border-cream/5 bg-ink-soft/50 px-6 py-8 md:px-12">
      <ul className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-10 gap-y-4 md:justify-between">
        <Pilar
          icone={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="9" cy="9" r="7" />
              <path d="M5 9l2.5 2.5L13 6.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          t="Originais importados"
          s="Direto dos Emirados"
        />
        <Pilar
          icone={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="3" y="5" width="12" height="10" rx="1" />
              <path d="M5 8h8M5 10h6" strokeLinecap="round" />
              <path d="M7 5V3.5a1.5 1.5 0 113 0V5" />
            </svg>
          }
          t="Decant pra testar"
          s="Erre barato se errar"
        />
        <Pilar
          icone={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M9 2v14M4 6h10M3 10l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          t="Troca garantida"
          s="7 dias, art. 49 CDC"
        />
        <Pilar
          icone={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M3 9l2 2 4-4 5 5M3 13l2 2 4-4 5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          t="Atendimento humano"
          s="9h–22h · IG e WhatsApp"
        />
      </ul>
    </div>
  );
}

function Pilar({
  icone,
  t,
  s,
}: {
  icone: React.ReactNode;
  t: string;
  s: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-amber/30 text-amber">
        {icone}
      </span>
      <div className="flex flex-col">
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-cream/85">
          {t}
        </span>
        <span className="text-[10px] italic text-cream/50">{s}</span>
      </div>
    </li>
  );
}
