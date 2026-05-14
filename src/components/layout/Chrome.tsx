"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TrustBar } from "@/components/layout/TrustBar";

/**
 * Mostra Navbar/TrustBar/Footer em todas as rotas — exceto na raiz `/`,
 * que é só o Vestíbulo de escolha entre /ele e /ela.
 */
export function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isVestibulo = pathname === "/";

  return (
    <>
      {!isVestibulo && <Navbar />}
      <main className="relative">{children}</main>
      {!isVestibulo && <TrustBar />}
      {!isVestibulo && <Footer />}
    </>
  );
}
