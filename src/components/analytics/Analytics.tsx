import Script from "next/script";

/**
 * Analytics stubs, só renderiza quando os IDs estão definidos como env vars.
 * Pra ativar, edite `.env.local` (ou `.env.production`) e adicione:
 *   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
 *   NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXX
 */
export function Analytics() {
  const ga4 = process.env.NEXT_PUBLIC_GA4_ID;
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {ga4 && (
        <>
          <Script
            id="ga4-lib"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {pixel && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixel}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}

/**
 * Helper client-side pra disparar eventos customizados.
 * Uso:
 *   trackEvent("ritual_completed", { perfil: "O Noturno Árabe" });
 */
export function trackEvent(
  name: string,
  params: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined") return;

  // GA4
  const w = window as unknown as {
    gtag?: (cmd: string, name: string, params: Record<string, unknown>) => void;
    fbq?: (cmd: string, name: string, params: Record<string, unknown>) => void;
  };
  if (typeof w.gtag === "function") {
    w.gtag("event", name, params);
  }
  // Meta Pixel (custom event)
  if (typeof w.fbq === "function") {
    w.fbq("trackCustom", name, params);
  }
}
