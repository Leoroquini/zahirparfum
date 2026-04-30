import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";

export const alt = `${BRAND.fullName}, ${BRAND.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(ellipse at 70% 35%, rgba(231,182,89,0.25), transparent 55%), linear-gradient(135deg, #0A0A0A 0%, #1a0a0e 50%, #2e0e10 100%)",
          color: "#F4E9D4",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Top: brand eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 14,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "#C89B3C",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ width: 48, height: 1, background: "#C89B3C" }} />
          Perfumaria Árabe · Edição Brasil
        </div>

        {/* Center: big Z */}
        <div
          style={{
            position: "absolute",
            right: 90,
            top: 120,
            fontSize: 480,
            fontStyle: "italic",
            fontWeight: 300,
            color: "rgba(231,182,89,0.08)",
            lineHeight: 1,
            display: "flex",
          }}
        >
          Z
        </div>

        {/* Main title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 300,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Perfume é</span>
            <span>
              <span style={{ fontStyle: "italic", color: "#C89B3C" }}>
                memória
              </span>{" "}
              que não se vê.
            </span>
          </div>
        </div>

        {/* Bottom: brand signature */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                fontSize: 28,
                letterSpacing: "0.4em",
                color: "#F4E9D4",
                fontWeight: 500,
                display: "flex",
              }}
            >
              {BRAND.name}
            </div>
            <div style={{ width: 1, height: 24, background: "rgba(244,233,212,0.3)" }} />
            <div
              style={{
                fontSize: 14,
                letterSpacing: "0.5em",
                color: "rgba(244,233,212,0.65)",
                fontFamily: "sans-serif",
                display: "flex",
              }}
            >
              PARFUMS
            </div>
          </div>
          <div
            style={{
              fontSize: 14,
              color: "rgba(244,233,212,0.55)",
              fontFamily: "sans-serif",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            @{BRAND.handles.instagram}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
