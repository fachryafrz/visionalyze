import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: process.env.NEXT_PUBLIC_APP_NAME,
    short_name: process.env.NEXT_PUBLIC_APP_NAME,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/assets/maskable/transparent_maskable_icon_x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/assets/maskable/transparent_maskable_icon_x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
