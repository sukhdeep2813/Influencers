import Link from "next/link";
import LoginForm from "@/app/(auth)/login/login-form";
import { BackgroundGlows } from "@/components/marketing/BackgroundGlows";

export default function LoginPage() {
  return (
    // min-h-[calc(100vh-80px)] accounts for your top navigation bar height
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <div className="w-full max-w-md">
        {" "}
        {/* Restricts form width */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Welcome back
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Log in to your Brandly account.
          </p>
        </div>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-white hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
