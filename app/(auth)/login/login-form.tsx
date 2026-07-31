"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LoginForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Auth Provider
    console.log("Logging in...");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">
          Email address
        </label>
        <input
          type="email"
          required
          className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-zinc-700 transition-all"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-zinc-300">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <input
          type="password"
          required
          className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-zinc-700 transition-all"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 mt-6 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
      >
        Sign in
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
