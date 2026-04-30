"use client";

/**
 * Fundo de mármore, usa o mármore da Hero como fonte de identidade visual.
 *
 * Estratégia: pega a mesma imagem da Hero (hero-master.jpg) e usa como
 * fundo do site INTEIRO, mas com tratamento (zoom, blur, dessaturação,
 * vinheta) pra não competir com o conteúdo e dar coerência total.
 *
 * Camada extra: spotlight dinâmico que segue o cursor.
 */

import { useEffect, useRef } from "react";

export function MarbleBackground() {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = lightRef.current;
    if (!light) return;

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX / window.innerWidth;
      targetY = e.clientY / window.innerHeight;
    };

    const animate = () => {
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;
      light.style.background = `radial-gradient(
        circle 700px at ${mouseX * 100}% ${mouseY * 100}%,
        rgba(255, 248, 230, 0.22) 0%,
        rgba(255, 245, 220, 0.1) 30%,
        transparent 70%
      )`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      {/* Camada 1: imagem real de mármore travertino (base do site inteiro) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: -3,
          backgroundImage: "url('/textures/marble-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#ebe0c7",
        }}
      />

      {/* Camada 2: véu cream sobre a imagem (uniformiza e dá leveza) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: -2,
          background:
            "linear-gradient(135deg, rgba(244, 233, 212, 0.35) 0%, rgba(232, 218, 192, 0.25) 50%, rgba(220, 200, 175, 0.2) 100%)",
        }}
      />

      {/* Camada 3: vinheta sutil */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: -2,
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(120, 90, 60, 0.18) 100%)",
        }}
      />

      {/* Camada 4: luz dinâmica que segue o cursor (vida sutil) */}
      <div
        ref={lightRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 transition-opacity duration-300"
        style={{ zIndex: -1 }}
      />
    </>
  );
}
