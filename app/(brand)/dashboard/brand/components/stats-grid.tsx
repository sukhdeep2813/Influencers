import type { DashboardStat } from "@/app/(brand)/dashboard/brand/data/dashboard-data";

type StatsGridProps = {
  monthlySpend: string;
  budgetUsed: number;
  activeCampaigns: number;
  stats: DashboardStat[];
};

const iconTone = {
  teal: {
    wrapper: "bg-emerald-50 text-emerald-600",
    note: "text-emerald-700",
  },
  blue: {
    wrapper: "bg-blue-50 text-blue-600",
    note: "text-blue-700",
  },
  coral: {
    wrapper: "bg-orange-50 text-orange-600",
    note: "text-orange-700",
  },
} as const;

export default function StatsGrid({
  monthlySpend,
  budgetUsed,
  activeCampaigns,
  stats,
}: StatsGridProps) {
  return (
    <section
      aria-label="Brand performance overview"
      className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-[1.35fr_repeat(3,1fr)]"
    >
      {/* ───────────────── Total Spend ───────────────── */}
      <article
        className="
          group relative overflow-hidden rounded-3xl
          bg-slate-950 p-5 text-white
          shadow-lg shadow-slate-950/10
          transition-all duration-300
          hover:-translate-y-0.5
          hover:shadow-xl hover:shadow-slate-950/15
          sm:col-span-2
          xl:col-span-1
        "
      >
        {/* Background decoration */}
        <div
          className="
            pointer-events-none absolute -right-16 -top-16
            h-48 w-48 rounded-full
            bg-orange-500/15 blur-3xl
            transition-all duration-500
            group-hover:bg-orange-500/25
          "
        />

        <div
          className="
            pointer-events-none absolute -bottom-20 -left-10
            h-40 w-40 rounded-full
            bg-orange-400/10 blur-3xl
          "
        />

        {/* Top row */}
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-slate-400">
              Total spend this month
            </p>

            <p className="mt-3 text-3xl font-bold tracking-tight sm:text-[34px]">
              {monthlySpend}
            </p>
          </div>

          <div
            className="
              grid h-10 w-10 shrink-0 place-items-center
              rounded-xl
              border border-white/10
              bg-white/10
              text-orange-400
              backdrop-blur-sm
            "
          >
            ₹
          </div>
        </div>

        {/* Description */}
        <p className="relative mt-3 text-xs leading-5 text-slate-400">
          Across{" "}
          <span className="font-semibold text-slate-200">
            {activeCampaigns} active campaigns
          </span>{" "}
          · {budgetUsed}% of monthly budget used
        </p>

        {/* Progress */}
        <div className="relative mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-medium text-slate-500">
              Budget usage
            </span>

            <span className="text-[10px] font-semibold text-orange-400">
              {budgetUsed}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="
                h-full rounded-full
                bg-gradient-to-r from-orange-500 to-orange-400
                transition-all duration-500
              "
              style={{
                width: `${Math.min(Math.max(budgetUsed, 0), 100)}%`,
              }}
            />
          </div>
        </div>
      </article>

      {/* ───────────────── Stat Cards ───────────────── */}
      {stats.map((stat) => {
        const tone = iconTone[stat.tone];

        return (
          <article
            key={stat.label}
            className="
              group relative overflow-hidden
              rounded-3xl
              border border-slate-200/80
              bg-white
              p-5
              shadow-sm
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-slate-300
              hover:shadow-lg hover:shadow-slate-200/60
            "
          >
            {/* Subtle hover glow */}
            <div
              className="
                pointer-events-none absolute
                -right-10 -top-10
                h-24 w-24
                rounded-full
                bg-slate-100
                opacity-0 blur-2xl
                transition-opacity duration-300
                group-hover:opacity-100
              "
            />

            <div className="relative">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-medium text-slate-500">
                  {stat.label}
                </p>

                <span
                  className={`
                    grid h-9 w-9 shrink-0 place-items-center
                    rounded-xl
                    text-xs font-bold
                    transition-transform duration-300
                    group-hover:scale-105
                    ${tone.wrapper}
                  `}
                >
                  {stat.icon}
                </span>
              </div>

              {/* Value */}
              <p className="mt-5 text-2xl font-bold tracking-tight text-slate-950 sm:text-[28px]">
                {stat.value}
              </p>

              {/* Note */}
              <div className="mt-3 flex items-center gap-1.5">
                <span
                  className={`
                    h-1.5 w-1.5 rounded-full
                    ${
                      stat.tone === "coral"
                        ? "bg-orange-500"
                        : stat.tone === "blue"
                          ? "bg-blue-500"
                          : "bg-emerald-500"
                    }
                  `}
                />

                <span className={`text-[11px] font-semibold ${tone.note}`}>
                  {stat.note}
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
