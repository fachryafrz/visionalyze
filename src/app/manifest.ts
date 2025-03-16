import { siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/assets/maskable/maskable_icon_x512.png",
        sizes: "512x512",
        purpose: "maskable",
        type: "image/png",
      },
      {
        src: "/assets/favicon/dark/android-chrome-192x192.png",
        sizes: "192x192",
        purpose: "any",
        type: "image/png",
      },
    ],
  };
}
