import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zahir Parfums · Para Ela",
  description:
    "Perfumaria árabe feminina. Floral, gourmand, oriental. Curadoria em construção — cadastre seu e-mail pra ser a primeira a saber.",
};

export default function ElaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
