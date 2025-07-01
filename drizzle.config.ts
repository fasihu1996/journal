import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

if (!process.env.VERCEL) {
    config({ path: ".env.local" });
}

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./migrations",
    dialect: "turso",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        authToken: process.env.DATABASE_TOKEN!,
    },
});
