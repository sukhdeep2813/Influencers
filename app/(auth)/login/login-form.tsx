"use client";

import Link from "next/link";
import { ArrowRight, Mail, Lock } from "lucide-react";

export default function LoginForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Auth Provider
    console.log("Logging in...");
  };
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Promo */}
        <div className="hidden md:flex flex-col justify-center rounded-3xl p-8 bg-gradient-to-br from-white via-sky-50 to-white shadow-[var(--card-shadow)] transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-up">
          <h3 className="text-3xl font-bold text-gray-900">Welcome back</h3>
          <p className="mt-2 text-gray-600">Sign in to continue managing creators, contracts and payments in one place.</p>
          <div className="mt-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3"><span className="h-3 w-3 rounded-full bg-sky-500 mt-2" />Secure payments</li>
              <li className="flex items-start gap-3"><span className="h-3 w-3 rounded-full bg-sky-500 mt-2" />Verified creators</li>
              <li className="flex items-start gap-3"><span className="h-3 w-3 rounded-full bg-sky-500 mt-2" />Instant proposals</li>
            </ul>
          </div>
          <div className="mt-6 text-sm text-gray-500">Need an account? <Link href="/signup" className="text-violet-600 font-medium">Create one</Link></div>
        </div>
        {/* Form */}
        <div className="rounded-3xl p-8 bg-white shadow-[var(--card-shadow)] transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-up">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
            <p className="text-gray-600 text-sm mt-2">Welcome back — sign in to continue.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <div className="relative">
                <input type="email" required className="w-full px-4 py-3 pl-10 bg-white border border-gray-100 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-300 transition-all" placeholder="you@example.com" />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link href="/forgot-password" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <input type="password" required className="w-full px-4 py-3 pl-10 bg-white border border-gray-100 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-300 transition-all" placeholder="••••••••" />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" className="rounded border-gray-200" /> Remember me</label>
              <a className="text-sm text-gray-500">Need help?</a>
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 px-4 mt-2 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-semibold rounded-lg hover:opacity-95 transition-colors shadow-md">Sign in <ArrowRight size={16} /></button>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <div className="text-xs text-gray-400">or</div>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-100 rounded-lg text-gray-700 hover:shadow-md hover:-translate-y-1 transition-transform duration-200">Continue with Google</button>
              <button type="button" className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-100 rounded-lg text-gray-700 hover:shadow-md hover:-translate-y-1 transition-transform duration-200">Continue with Apple</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}