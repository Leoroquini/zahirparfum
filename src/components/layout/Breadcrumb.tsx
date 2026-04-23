import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

/**
 * Breadcrumb navegacional discreto pra páginas profundas.
 * Renderizado em cima do PageHero ou do conteúdo principal.
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Caminho"
      className="flex flex-wrap items-center gap-2 text-[10px] font-sans uppercase tracking-[0.32em] text-cream/50"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-amber"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-amber/80" : ""}>
                {item.label}
              </span>
            )}
            {!isLast && <span className="text-cream/25">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
