import Link from "next/link";
import { BRAND } from "@/lib/brand";

const NAVIGATE = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/mapa", label: "Mapa olfativo" },
  { href: "/ritual", label: "O Ritual, quiz olfativo" },
  { href: "/comparador", label: "Árabe × Designer" },
  { href: "/curadorias", label: "Curadorias" },
  { href: "/decants", label: "Decants, teste antes" },
  { href: "/notas", label: "Notas-assinatura" },
  { href: "/diario", label: "Diário olfativo" },
];

export function Footer() {
  return (
    <footer
      className="relative border-t border-ink/8 px-6 py-20 md:px-12"
    >
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="font-display text-3xl font-light tracking-tight text-ink">
              {BRAND.name}
              <span className="text-amber">.</span>
            </h3>
            <p className="mt-2 text-[10px] font-sans tracking-[0.4em] text-ink/70">
              PARFUMS · {BRAND.origin}
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink/75">
              {BRAND.manifesto}
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-ink/75">
            <span className="mb-1 text-[10px] font-sans uppercase tracking-[0.4em] text-ink/75">
              Navegar
            </span>
            {NAVIGATE.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-amber"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 text-sm text-ink/75">
            <span className="mb-1 text-[10px] font-sans uppercase tracking-[0.4em] text-ink/75">
              Ajuda
            </span>
            <a href="/como-comprar" className="transition-colors hover:text-amber">
              Como comprar
            </a>
            <a href="/entrega" className="transition-colors hover:text-amber">
              Entrega e frete
            </a>
            <a href="/trocas-e-devolucoes" className="transition-colors hover:text-amber">
              Trocas e devoluções
            </a>
            <a href="/faq" className="transition-colors hover:text-amber">
              FAQ
            </a>
            <a href="/contato" className="transition-colors hover:text-amber">
              Contato
            </a>
          </div>

          <div className="flex flex-col gap-3 text-sm text-ink/75">
            <span className="mb-1 text-[10px] font-sans uppercase tracking-[0.4em] text-ink/75">
              Siga
            </span>
            <a
              href={`https://instagram.com/${BRAND.handles.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-amber"
            >
              Instagram · @{BRAND.handles.instagram}
            </a>
            <a
              href={`https://tiktok.com/@${BRAND.handles.tiktok}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-amber"
            >
              TikTok · @{BRAND.handles.tiktok}
            </a>
            <span className="mt-3 text-[10px] font-sans uppercase tracking-[0.4em] text-ink/75">
              Legal
            </span>
            <a href="/termos" className="transition-colors hover:text-amber">
              Termos de uso
            </a>
            <a href="/privacidade" className="transition-colors hover:text-amber">
              Privacidade
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/5 pt-8 text-[10px] font-sans uppercase tracking-[0.35em] text-ink/70 md:flex-row md:justify-between">
          <span>
            © {BRAND.foundedYear} {BRAND.fullName}. Todos os direitos reservados.
          </span>
          <span>
            Marca independente · {BRAND.city}
          </span>
        </div>

        {/*
         * Manifesto, easter egg pra cliente fiel.
         * Frase poética em itálico, sem destaque óbvio. Quem clica
         * descobre o "porquê" da marca.
         */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/manifesto"
            className="group inline-flex items-center gap-2 text-center font-display text-sm italic text-ink/70 transition-colors hover:text-amber"
          >
            <span className="h-px w-6 bg-ink/20 transition-colors group-hover:bg-amber" />
            <span>Tudo isso, porque acreditamos em algo</span>
            <span className="h-px w-6 bg-ink/20 transition-colors group-hover:bg-amber" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
