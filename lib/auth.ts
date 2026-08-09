import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma"; // Ensure this imports your global Prisma client

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    // Optional: Require email verification before login
    // requireEmailVerification: true
  },
  user: {
    additionalFields: {
      role: {
        type: "string",

        required: false, // Ensures Better Auth doesn't block signups if missing
        returns: true, // Ensures this field is returned in the session
      },
    },
  },
});
