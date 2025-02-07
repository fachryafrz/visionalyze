import { RateLimiter } from "limiter";
import { NextResponse } from "next/server";

export const limiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: "min",
  fireImmediately: true,
});

export const tokenExpired = async (request: Request) => {
  const origin = request.headers.get("origin");

  return NextResponse.json("Rate Limit Exceeded", {
    status: 429,
    statusText: "Too Many Requests",
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Content-Type": "text/plain",
    },
  });
};

export const notAllowed = () => {
  return NextResponse.json("Not allowed", {
    status: 403,
    statusText: "Forbidden",
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
