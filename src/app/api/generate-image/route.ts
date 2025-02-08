import {
  experimental_generateImage as generateImage,
  NoImageGeneratedError,
} from "ai";
import { NextResponse } from "next/server";
import { notAllowed, tokenExpired } from "../config/limiter";
import { whitelist } from "@/app/middleware";
import { togetherai } from "@ai-sdk/togetherai";
import { RateLimiter } from "limiter";

const limiter = new RateLimiter({
  tokensPerInterval: 6,
  interval: "min",
  fireImmediately: true,
});

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const { prompt } = await request.json();

  const remainingToken = await limiter.removeTokens(1);
  if (remainingToken < 0) return tokenExpired(request);
  if ((origin && !whitelist.includes(origin)) || !origin) return notAllowed();

  try {
    const { image } = await generateImage({
      model: togetherai.image("black-forest-labs/FLUX.1-schnell-Free"),
      prompt,
    });

    return NextResponse.json({ image });
  } catch (error) {
    if (NoImageGeneratedError.isInstance(error)) {
      console.log("NoImageGeneratedError");
      console.log("Cause:", error.cause);
      console.log("Responses:", error.responses);
    }
  }
}
