import type { MetadataRoute } from "next";
import { siteUrlCanonico } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteUrlCanonico()}/sitemap.xml`,
  };
}
