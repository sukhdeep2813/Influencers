import { TrendingUp, UsersRound, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./section-header";

const ageGroups = [
  { label: "18–24", percentage: 38 },
  { label: "25–34", percentage: 44 },
  { label: "35–44", percentage: 18 },
];

export default function AudienceCard() {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 sm:p-6">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-100/50 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <SectionHeader title="Audience snapshot" action="Full report" />

        {/* Highlight stats */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {/* Female audience */}
          <div className="group/stat relative overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-4 transition-all duration-300 hover:border-orange-100 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-orange-50 text-orange-600">
                <UsersRound className="h-[18px] w-[18px]" />
              </div>

              <ArrowUpRight className="h-4 w-4 text-slate-300 transition-transform duration-300 group-hover/stat:-translate-y-0.5 group-hover/stat:translate-x-0.5" />
            </div>

            <p className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
              64%
            </p>

            <p className="mt-1 text-xs font-medium text-slate-500">
              Female audience
            </p>

            <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              +4.2% this month
            </div>
          </div>

          {/* Age */}
          <div className="group/stat relative overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-4 transition-all duration-300 hover:border-violet-100 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-violet-50 text-violet-600">
                <TrendingUp className="h-[18px] w-[18px]" />
              </div>

              <ArrowUpRight className="h-4 w-4 text-slate-300 transition-transform duration-300 group-hover/stat:-translate-y-0.5 group-hover/stat:translate-x-0.5" />
            </div>

            <p className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
              44%
            </p>

            <p className="mt-1 text-xs font-medium text-slate-500">
              Age 25–34
            </p>

            <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              Highest segment
            </div>
          </div>
        </div>

        {/* Age distribution */}
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-950">
                Age distribution
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                Your audience by age group
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
              Audience
            </span>
          </div>

          <div className="space-y-4">
            {ageGroups.map((group) => (
              <div key={group.label}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">
                    {group.label}
                  </span>

                  <span className="text-xs font-bold text-slate-950">
                    {group.percentage}%
                  </span>
                </div>

                <div className="relative h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-slate-950 to-slate-600 transition-all duration-700 group-hover:from-orange-500 group-hover:to-orange-400"
                    style={{ width: `${group.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-[11px] font-medium text-slate-400">
              Total audience
            </p>
            <p className="mt-0.5 text-sm font-bold text-slate-950">
              48.2K followers
            </p>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Growing
          </div>
        </div>
      </div>
    </article>
  );
}