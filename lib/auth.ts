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
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.role === "BRAND") {
            await prisma.brandProfile.create({
              data: {
                userId: user.id,
                companyName: user.name,
              },
            });
          } else {
            await prisma.creatorProfile.create({
              data: {
                userId: user.id,
                name: user.name,
              },
            });
          }
        },
      },
    },
  },
});
