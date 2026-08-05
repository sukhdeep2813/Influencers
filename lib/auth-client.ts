import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Make sure BETTER_AUTH_URL is set in your .env (e.g., http://localhost:3000)
  baseURL: process.env.BETTER_AUTH_URL,

});

export const { signIn, signUp, useSession } = authClient;
