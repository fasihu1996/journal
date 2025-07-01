import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "../db/schema";
import { config } from "dotenv";

if (!process.env.VERCEL) {
    config({ path: ".env.local" });
}

// Use Turso for production, SQLite for local
export const db = drizzle(
    createClient({
        url: process.env.DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
    }),
    { schema }
);
