import { Redis } from "@upstash/redis";
import { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } from "$env/static/private";

export const EXERCISE_CACHE_DURATION = 7 * 24 * 60 * 60;

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
  try {
    if (expirationSeconds) {
      return await redis.set(key, value, { ex: expirationSeconds });
    }
    return await redis.set(key, value);
  } catch (error) {
    console.error(`Error while trying to cache key: ${key}`, error);
    return null;
  }
}

export async function getValue<T>(key: string): Promise<T | null> {
  try {
    return await redis.get(key);
  } catch (error) {
    console.error(`Error while trying to get key: ${key}`, error);
    return null;
  }
}

export async function deleteKey(key: string): Promise<number> {
  try {
    return await redis.del(key);
  } catch (error) {
    console.error(`Error while trying to delete key: ${key}`, error);
    return 0;
  }
}

export async function clearExerciseCache(): Promise<number> {
  try {
    const keys = await redis.keys("exercises*");
    if (keys.length === 0) {
      return 0;
    }
    const num = await redis.del(...keys);
    console.log(`Cleared exercise cache: ${num} entries`);
    return num;
  } catch (error) {
    console.error("Error while trying to invalidate exercise cache:", error);
    return 0;
  }
}
