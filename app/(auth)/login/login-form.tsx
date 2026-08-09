"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail, Lock, Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // UI State
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMessage("");



    const { data, error } = await signIn.email({
      email,
      password,
      rememberMe,
    });
    console.log("signIn response:", { data, error });
    

    if (error) {
      setErrorMessage(error.message || "Invalid email or password");
      setIsPending(false);
      return;
    }

    // Redirect to the appropriate dashboard on success
    // You can refine this later to redirect based on the user's role
    router.push("/brand/dashboard");
  };

  const handleSocialLogin = async (provider: "google" | "apple") => {
    await signIn.social({
      provider,
      callbackURL: "/brand/dashboard",
    });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Promo Side */}
        <div className="hidden md:flex flex-col justify-center rounded-3xl p-8 bg-linear-to-br from-white via-sky-50 to-white shadow-[var(--card-shadow)] transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-up">
          <h3 className="text-3xl font-bold text-gray-900">Welcome back</h3>
          <p className="mt-2 text-gray-600">
            Sign in to continue managing creators, contracts and payments in one
            place.
          </p>

          <div className="mt-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="h-3 w-3 rounded-full bg-sky-500 mt-2" />
                Secure payments
              </li>
              <li className="flex items-start gap-3">
                <span className="h-3 w-3 rounded-full bg-sky-500 mt-2" />
                Verified creators
              </li>
              <li className="flex items-start gap-3">
                <span className="h-3 w-3 rounded-full bg-sky-500 mt-2" />
                Instant proposals
              </li>
            </ul>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            Need an account?{" "}
            <Link
              href="/signup"
              className="text-violet-600 font-medium hover:underline"
            >
              Create one
            </Link>
          </div>
        </div>

        {/* Form Side */}
        <div className="rounded-3xl p-8 bg-white shadow-[var(--card-shadow)] transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-up">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
            <p className="text-gray-600 text-sm mt-2">
              Welcome back — sign in to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                  className="w-full px-4 py-3 pl-10 bg-white border border-gray-100 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-300 transition-all disabled:opacity-50"
                  placeholder="you@example.com"
                />
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                  className="w-full px-4 py-3 pl-10 bg-white border border-gray-100 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-300 transition-all disabled:opacity-50"
                  placeholder="••••••••"
                />
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            {/* Error Message Display */}
            {errorMessage && (
              <div className="text-sm text-red-500 bg-red-50 p-2 rounded-md border border-red-100">
                {errorMessage}
              </div>
            )}

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isPending}
                  className="rounded border-gray-200 text-violet-600 focus:ring-violet-500"
                />
                Remember me
              </label>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                Need help?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 mt-2 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-semibold rounded-lg hover:opacity-95 transition-colors shadow-md disabled:opacity-70"
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in <ArrowRight size={16} />
                </>
              )}
            </button>

            {/* Social Login Dividers */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <div className="text-xs text-gray-400">or</div>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                disabled={isPending}
                className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-100 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
              >
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("apple")}
                disabled={isPending}
                className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-100 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
              >
                Apple
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
