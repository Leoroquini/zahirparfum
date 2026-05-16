import type { Metadata } from "next";
import { Ritual } from "@/components/sections/Ritual";
import { RitualHero } from "@/components/sections/RitualHero";

export const metadata: Metadata = {
  title: "O Ritual, quiz olfativo",
  description:
    "Seis perguntas pra descobrir seu perfil olfativo. Sem jargão técnico. Diálogo curto pra te indicar fragrâncias do catálogo que conversam com quem você é hoje.",
};

export default function RitualPage() {
  return (
    <>
      <RitualHero />
      <Ritual hideIntro />
    </>
  );
}
