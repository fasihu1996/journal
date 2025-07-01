import { drizzle } from "drizzle-orm/libsql";
import { config } from "dotenv";

if (!process.env.VERCEL) {
    config({ path: ".env.local" });
}

export const db = drizzle({
    connection: {
        url: process.env.DATABASE_URL!,
        authToken: process.env.DATABASE_TOKEN!,
    },
});
