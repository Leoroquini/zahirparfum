import type { Metadata } from "next";
import { ObrigadoView } from "./ObrigadoView";

export const metadata: Metadata = {
  title: "Pedido confirmado",
  description: "Obrigado pelo seu pedido na Zahir Parfum.",
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return <ObrigadoView />;
}
