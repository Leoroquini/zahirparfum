/**
 * Loading skeleton editorial, mantém estética ZAHIR enquanto
 * conteúdo está sendo buscado. Usado por loading.tsx nas rotas.
 */
export function PageLoading({ label }: { label?: string }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="flex flex-col items-center gap-5 text-center">
        {/* Pulse dot */}
        <span
          className="inline-block h-2 w-2 animate-pulse rounded-full bg-amber"
          aria-hidden
        />
        <span className="font-display text-2xl italic text-ink/80 md:text-3xl">
          {label ?? "Um instante"}
          <span className="animate-pulse text-amber">…</span>
        </span>
        <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-ink/70">
          carregando
        </span>
      </div>
    </div>
  );
}
