"use client";

import { useSession } from "@/lib/auth-client";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function DashboardHero() {
  const { data: session } = useSession();

  const userName = session?.user?.name || "Creator";
  const profileStrength = 80;

  return (
    <section className="mb-8 flex flex-col gap-6 border-b border-slate-200 pb-8 xl:flex-row xl:items-end xl:justify-between">
      {/* Greeting */}
      <div className="max-w-3xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
          <Sparkles className="h-3.5 w-3.5" />
          Creator workspace
        </div>

        <h1 className="text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl">
         Welcome, {userName.split("@")[0]}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Here&apos;s what is happening with your campaigns, brand requests,
          audience and payments today.
        </p>
      </div>

      {/* Profile completion */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="min-w-[220px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between gap-6 text-sm">
            <span className="font-medium text-slate-600">Profile strength</span>

            <span className="font-bold text-slate-950">{profileStrength}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-orange-500 transition-all duration-700"
              style={{ width: `${profileStrength}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-[58px] items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
        >
          Complete profile
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
