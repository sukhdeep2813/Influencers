import { createAuthClient } from "better-auth/react";
import { auth } from "./auth";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  // Make sure BETTER_AUTH_URL is set in your .env (e.g., http://localhost:3000)
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
  plugins: [inferAdditionalFields<typeof auth>()],
});

export const { signIn, signUp, useSession } = authClient;
