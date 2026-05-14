import type { Metadata } from "next";
import { HeroVestibulo } from "@/components/sections/HeroVestibulo";

export const metadata: Metadata = {
  title: "Zahir Parfums · Perfumaria Árabe",
  description:
    "Perfumaria árabe pra quem quer cheirar bem — e saber por que cheira bem. Para ele e para ela.",
};

/**
 * LP raiz unissex — apenas o vestíbulo de escolha entre /ele e /ela.
 * Toda a navegação editorial vive dentro dos dois mundos.
 */
export default function HomeRaiz() {
  return <HeroVestibulo />;
}
