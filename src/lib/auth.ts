import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";
import Google from "next-auth/providers/google";

export const { handlers, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google],
    session: { strategy: "database" }, // Stores sessions in SQLite
});
