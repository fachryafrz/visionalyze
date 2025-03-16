import { siteConfig } from "@/config/site";
import { notAllowed } from "./api/config/limiter";

export const whitelist = [
  siteConfig.url,
  "https://preview-visionalyze.vercel.app",
];

export function middleware(request: Request) {
  const origin = request.headers.get("origin");

  if ((origin && !whitelist.includes(origin)) || !origin) return notAllowed();
}

export const config = {
  matcher: "/api/:path",
};
