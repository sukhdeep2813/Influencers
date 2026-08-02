"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail, Lock, User, Loader2 } from "lucide-react";
import { signUp } from "@/lib/auth-client";

type Role = "brand" | "creator";

type SignupFormProps = {
  defaultRole: Role;
  companyNameHint: string;
  creatorNameHint: string;
};

export default function SignupForm({
  defaultRole,
  companyNameHint,
  creatorNameHint,
}: SignupFormProps) {
  const router = useRouter();

  const [role, setRole] = useState<Role>(defaultRole);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameLabel = role === "brand" ? "Company name" : "Full name";
  const namePlaceholder = role === "brand" ? companyNameHint : creatorNameHint;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error: authError } = await signUp.email({
      email,
      password,
      name,
    });

    console.log("Signup response:", { data, authError });

    if (authError) {
      setError(authError.message || "Something went wrong. Please try again.");
      setIsLoading(false);
      return;
    }

    // TODO: If you want Better Auth to natively save the custom 'role' field to your DB
    // during this step, you will need to map it using the `additionalFields` config in lib/auth.ts.
    // Alternatively, make a quick fetch call here to update the user record with their role.

    // Route to the appropriate dashboard based on their selection
    if (role === "brand") {
      router.push("/brand");
    } else {
      router.push("/creator");
    }
  };

  return (
    <div className="w-full">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <aside className="hidden lg:flex flex-col justify-between rounded-[36px] border border-gray-100 bg-gradient-to-br from-white via-slate-50 to-white p-10 shadow-[var(--card-shadow)] animate-fade-up">
          <div>
            <p className="inline-flex items-center rounded-full border border-fuchsia-200 bg-fuchsia-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-600">
              Premium onboarding
            </p>
            <h2 className="mt-8 text-4xl font-bold tracking-tight text-gray-900">
              Build your brand with confidence
            </h2>
            <p className="mt-5 text-sm leading-7 text-gray-600">
              Join the creator economy with a polished platform built for fast
              onboarding, better visibility, and premium collaboration.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Trusted by top creator teams
              </p>
              <p className="mt-3 text-2xl font-semibold text-gray-900">96%</p>
              <p className="text-sm text-gray-500">
                growth in brand partnerships
              </p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Instant verification</p>
              <p className="mt-3 text-2xl font-semibold text-gray-900">24h</p>
              <p className="text-sm text-gray-500">
                average campaign approval time
              </p>
            </div>
          </div>
        </aside>

        <div className="rounded-[36px] border border-gray-100 bg-white p-8 shadow-[var(--card-shadow)]">
          <header className="text-center mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-600">
              Create your account
            </p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Welcome aboard.
            </h2>
            <p className="mt-4 text-gray-600 sm:text-base">
              Join Brandly and connect with top brands and creators faster than
              ever.
            </p>
          </header>

          <div
            role="radiogroup"
            aria-label="Select your role"
            className="flex p-1 mb-8 bg-slate-100 rounded-3xl border border-slate-200"
          >
            <button
              type="button"
              role="radio"
              aria-checked={role === "brand"}
              onClick={() => setRole("brand")}
              className={`flex-1 py-3 text-sm font-medium rounded-3xl transition-all ${
                role === "brand"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              I&apos;m a Brand
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={role === "creator"}
              onClick={() => setRole("creator")}
              className={`flex-1 py-3 text-sm font-medium rounded-3xl transition-all ${
                role === "creator"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              I&apos;m a Creator
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && (
              <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {nameLabel}
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 pl-10 bg-white border border-gray-100 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-300 transition-all disabled:opacity-60"
                  placeholder={namePlaceholder}
                />
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 pl-10 bg-white border border-gray-100 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-300 transition-all disabled:opacity-60"
                  placeholder="you@example.com"
                />
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 pl-10 bg-white border border-gray-100 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-300 transition-all disabled:opacity-60"
                  placeholder="••••••••"
                />
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                  aria-hidden="true"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 mt-6 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-semibold rounded-lg hover:opacity-95 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-violet-600 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
