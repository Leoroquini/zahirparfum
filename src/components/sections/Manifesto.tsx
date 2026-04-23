"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE_OUT = [0.19, 1, 0.22, 1] as const;

export function Manifesto({ hideIntro = false }: { hideIntro?: boolean } = {}) {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden border-t border-cream/5 bg-ink-soft"
    >
      {/* Background fotográfico muito escuro pra dar textura */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-20">
        <Image
          src="/hero/ingredients.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: "blur(30px) brightness(0.35) saturate(0.7)" }}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-soft via-ink-soft/80 to-ink-soft"
      />

      <div className="relative mx-auto max-w-[1440px] px-6 py-28 md:px-12 md:py-40">
        {/* ---------- Bloco 1: Título + eyebrow ---------- */}
        {!hideIntro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: EASE_OUT }}
            className="flex flex-col gap-8"
          >
            <span className="inline-flex items-center gap-3 text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="h-px w-8 bg-amber" />
              Manifesto
            </span>
            <h2 className="max-w-5xl font-display text-5xl font-light leading-[0.98] tracking-tight text-cream md:text-7xl lg:text-8xl">
              Perfume é{" "}
              <em className="italic text-amber/90">memória</em>
              <br />
              que não se vê.
            </h2>
          </motion.div>
        )}

        {/* ---------- Divisor ornamental ---------- */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE_OUT }}
          className="mt-16 h-px w-full origin-left bg-gradient-to-r from-amber/60 via-amber/20 to-transparent"
        />

        {/* ---------- Bloco 2: Pull quote dramático ---------- */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
          className="mx-auto mt-16 max-w-4xl text-center md:mt-24"
        >
          <span
            aria-hidden
            className="block font-display text-6xl italic leading-none text-amber/40 md:text-8xl"
          >
            &ldquo;
          </span>
          <p className="mt-4 font-display text-2xl font-light leading-[1.3] text-cream md:text-4xl lg:text-5xl">
            Todo homem deixa um rastro.
            <br />
            <em className="italic text-amber">Mesmo sem querer.</em>
          </p>
        </motion.blockquote>

        {/* ---------- Bloco 3: Rejeita × Defende (2 colunas) ---------- */}
        <div className="mt-24 grid gap-12 border-y border-cream/10 py-16 md:mt-32 md:grid-cols-2 md:gap-20 md:py-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="flex flex-col gap-6"
          >
            <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-wine/80">
              <span className="mr-2 text-wine">×</span> O que a gente rejeita
            </span>
            <ul className="flex flex-col gap-4 font-display text-xl font-light leading-[1.3] text-cream/65 md:text-2xl">
              <li className="border-l border-wine/40 pl-4">
                Catálogo inflado piscando desconto
              </li>
              <li className="border-l border-wine/40 pl-4">
                Vendedor que decora preço mas não conhece nota
              </li>
              <li className="border-l border-wine/40 pl-4">
                Promessa barata de &ldquo;ser notado&rdquo;
              </li>
              <li className="border-l border-wine/40 pl-4">
                Homem de terno segurando frasco. Cara séria. Nada atrás.
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
            className="flex flex-col gap-6"
          >
            <span className="text-[10px] font-sans uppercase tracking-[0.45em] text-amber">
              <span className="mr-2">✦</span> O que a gente defende
            </span>
            <ul className="flex flex-col gap-4 font-display text-xl font-light leading-[1.3] text-cream md:text-2xl">
              <li className="border-l border-amber pl-4">
                Curadoria feroz, catálogo compacto
              </li>
              <li className="border-l border-amber pl-4">
                Nota explicada em português, sem jargão
              </li>
              <li className="border-l border-amber pl-4">
                Decant antes do frasco — testa, depois investe
              </li>
              <li className="border-l border-amber pl-4">
                Fidelidade em número. Não em promessa.
              </li>
            </ul>
          </motion.div>
        </div>

        {/* ---------- Bloco 4: Big quote central ---------- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.5, ease: EASE_OUT }}
          className="relative mx-auto mt-24 max-w-5xl text-center md:mt-32"
        >
          {/* Ornamento de fundo gigante */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center select-none font-display italic text-amber/[0.06]"
            style={{ fontSize: "clamp(18rem, 45vw, 40rem)", lineHeight: 1 }}
          >
            ·
          </span>

          <p className="relative font-display text-3xl font-light leading-[1.15] tracking-tight text-cream md:text-5xl lg:text-6xl">
            Perfume é{" "}
            <em className="italic text-amber">linguagem</em>
            {" "}— a mais discreta
            <br className="hidden md:block" />
            {" "}das vozes masculinas.
          </p>
          <p className="relative mx-auto mt-8 max-w-xl text-base italic text-cream/55 md:text-lg">
            Quem entende, usa pra se revelar. Quem não entende, usa porque
            alguém mandou. Entre os dois: só informação.
          </p>
        </motion.div>

        {/* ---------- Bloco 5: Menos × Mais (tipográfico) ---------- */}
        <div className="mt-24 grid gap-x-8 gap-y-4 md:mt-32 md:grid-cols-3 md:gap-12">
          {[
            { menos: "catálogo", mais: "curadoria" },
            { menos: "desconto", mais: "contexto" },
            { menos: "empurrão", mais: "ritual" },
          ].map((pair, i) => (
            <motion.div
              key={pair.mais}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: EASE_OUT,
              }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className="font-display text-xs italic tracking-tight text-cream/40 md:text-sm">
                menos
              </span>
              <span className="font-display text-3xl font-light italic leading-none text-cream/50 md:text-5xl">
                {pair.menos}
              </span>
              <span className="my-2 h-px w-10 bg-amber/60" />
              <span className="font-display text-xs italic tracking-tight text-amber/80 md:text-sm">
                mais
              </span>
              <span className="font-display text-4xl font-light leading-none text-amber md:text-6xl">
                {pair.mais}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ---------- Bloco 6: Fechamento editorial ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
          className="mx-auto mt-24 max-w-4xl md:mt-32"
        >
          <div className="relative rounded-sm border-l-4 border-amber bg-ink/60 px-8 py-10 backdrop-blur-sm md:px-14 md:py-14">
            <p className="font-display text-xl font-light italic leading-[1.4] text-cream md:text-3xl lg:text-4xl">
              Se você vai ser lembrado por alguma coisa hoje, que seja{" "}
              <em className="not-italic font-normal text-amber">
                pelo que você é.
              </em>
            </p>
            <p className="mt-6 text-sm italic leading-relaxed text-cream/60 md:text-base">
              A gente só ajuda você a escrever isso no ar — com as letras
              certas.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
