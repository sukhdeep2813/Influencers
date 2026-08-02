import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // Make sure NEXT_PUBLIC_APP_URL is set in your .env (e.g., http://localhost:3000)
    baseURL: process.env.NEXT_PUBLIC_APP_URL, 
});

export const { signIn, signUp, useSession } = authClient;