import { notAllowed } from "./api/config/limiter";

export const whitelist = [
  process.env.NEXT_PUBLIC_APP_URL,
  "https://visionalyze-git-feat-add-cors-to-middleware-fachryafrz-projects.vercel.app",
];

export function middleware(request: Request) {
  const origin = request.headers.get("origin");

  if ((origin && !whitelist.includes(origin)) || !origin) return notAllowed();
}

export const config = {
  matcher: "/api/:path",
};
