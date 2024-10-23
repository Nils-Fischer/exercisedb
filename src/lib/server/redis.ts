// src/lib/server/redis.ts
import { Redis } from "@upstash/redis";
import { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } from "$env/static/private";

if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
  throw new Error("Missing Upstash Redis credentials");
}

export const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
});

// Type-safe wrapper functions
export async function setValue<T>(
  key: string,
  value: T,
  expirationSeconds?: number
): Promise<"OK" | Awaited<T> | null> {
  if (expirationSeconds) {
    return await redis.set(key, value, { ex: expirationSeconds });
  }
  return await redis.set(key, value);
}

export async function getValue<T>(key: string): Promise<T | null> {
  return await redis.get(key);
}

export async function deleteKey(key: string): Promise<number> {
  return await redis.del(key);
}
