"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Lock, User } from "lucide-react";

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

    const payload = {
      role,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      // TODO: Call your server action / API here
      // const result = await signupAction(payload);
      console.log("Signing up as:", payload);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <header className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Create your account
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          Join Brandly and start connecting instantly.
        </p>
      </header>

      {/* Role Toggle */}
      <div
        role="radiogroup"
        aria-label="Select your role"
        className="flex p-1 mb-8 bg-gray-100 rounded-lg border border-gray-200"
      >
        <button
          type="button"
          role="radio"
          aria-checked={role === "brand"}
          onClick={() => setRole("brand")}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            role === "brand"
              ? "bg-white text-black shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          I&apos;m a Brand
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={role === "creator"}
          onClick={() => setRole("creator")}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            role === "creator"
              ? "bg-white text-black shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          I&apos;m a Creator
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <div className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
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
          {isLoading ? "Creating account..." : "Create account"}
          {!isLoading && <ArrowRight size={16} />}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-violet-600 hover:underline font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
}
