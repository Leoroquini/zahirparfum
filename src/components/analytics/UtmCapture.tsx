"use client";

import { useEffect } from "react";
import { captureUtms } from "@/lib/track";

/**
 * Componente vazio que captura UTMs da URL no mount.
 * Renderizado no layout raiz — serve só pro side-effect.
 */
export function UtmCapture() {
  useEffect(() => {
    captureUtms();
  }, []);
  return null;
}
