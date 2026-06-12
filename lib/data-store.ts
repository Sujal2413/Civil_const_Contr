import { homeContent, type HomeContent } from "@/lib/content";

const CACHE_KEY = "buildings:home";
const CACHE_SECONDS = 300;

let memoryCache:
  | {
      expiresAt: number;
      value: HomeContent;
    }
  | null = null;

async function readFromRedis() {
  if (!process.env.REDIS_URL) {
    return null;
  }

  try {
    const { createClient } = await import("redis");
    const client = createClient({ url: process.env.REDIS_URL });
    await client.connect();
    const payload = await client.get(CACHE_KEY);
    await client.disconnect();
    return payload ? (JSON.parse(payload) as HomeContent) : null;
  } catch {
    return null;
  }
}

async function writeToRedis(value: HomeContent) {
  if (!process.env.REDIS_URL) {
    return;
  }

  try {
    const { createClient } = await import("redis");
    const client = createClient({ url: process.env.REDIS_URL });
    await client.connect();
    await client.setEx(CACHE_KEY, CACHE_SECONDS, JSON.stringify(value));
    await client.disconnect();
  } catch {
    // The site should remain fast and available even when Redis is absent locally.
  }
}

async function readFromPostgres() {
  if (!process.env.DATABASE_URL) {
    return homeContent;
  }

  try {
    const { Pool } = await import("pg");
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const result = await pool.query(
      "select payload from site_content where slug = $1 limit 1",
      ["buildings-home"]
    );
    await pool.end();
    return (result.rows[0]?.payload as HomeContent | undefined) ?? homeContent;
  } catch {
    return homeContent;
  }
}

export async function getBuildingsContent() {
  if (memoryCache && memoryCache.expiresAt > Date.now()) {
    return memoryCache.value;
  }

  const redisValue = await readFromRedis();
  if (redisValue) {
    memoryCache = {
      value: redisValue,
      expiresAt: Date.now() + CACHE_SECONDS * 1000
    };
    return redisValue;
  }

  const value = await readFromPostgres();
  memoryCache = {
    value,
    expiresAt: Date.now() + CACHE_SECONDS * 1000
  };
  await writeToRedis(value);
  return value;
}
