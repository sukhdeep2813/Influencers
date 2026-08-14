import { Clock3, TrendingUp } from "lucide-react";
import { stats } from "@/app/(creator)/dashboard/creator/data/stats-grid";

const iconStyles = [
  {
    wrapper: "bg-orange-50 text-orange-600",
    glow: "group-hover:shadow-orange-200/70",
    accent: "from-orange-400 to-amber-400",
  },
  {
    wrapper: "bg-blue-50 text-blue-600",
    glow: "group-hover:shadow-blue-200/70",
    accent: "from-blue-400 to-cyan-400",
  },
  {
    wrapper: "bg-violet-50 text-violet-600",
    glow: "group-hover:shadow-violet-200/70",
    accent: "from-violet-400 to-fuchsia-400",
  },
  {
    wrapper: "bg-emerald-50 text-emerald-600",
    glow: "group-hover:shadow-emerald-200/70",
    accent: "from-emerald-400 to-teal-400",
  },
];

export default function StatsGrid() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const positive = index === 0 || index === 3;
        const style = iconStyles[index];

        return (
          <article
            key={stat.label}
            className="
              group relative overflow-hidden
              rounded-2xl border border-slate-200/80
              bg-white p-5
              transition-all duration-300 ease-out
              hover:-translate-y-1
              hover:border-slate-300
              hover:shadow-xl hover:shadow-slate-200/50
            "
          >
            {/* Top gradient accent */}
            <div
              className={`
                absolute inset-x-0 top-0 h-[2px]
                bg-gradient-to-r ${style.accent}
                opacity-0 transition-opacity duration-300
                group-hover:opacity-100
              `}
            />

            {/* Very subtle background glow */}
            <div
              className="
                pointer-events-none absolute -right-10 -top-10
                h-28 w-28 rounded-full
                bg-slate-100/70 blur-2xl
                transition-all duration-500
                group-hover:scale-150 group-hover:bg-slate-100
              "
            />

            <div className="relative">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>

                  <p
                    className="
                      mt-2 text-[30px] font-bold
                      tracking-[-0.03em] text-slate-950
                      transition-transform duration-300
                      group-hover:translate-x-0.5
                    "
                  >
                    {stat.value}
                  </p>
                </div>

                {/* Icon */}
                <div
                  className={`
                    grid h-11 w-11 shrink-0 place-items-center
                    rounded-xl ${style.wrapper}
                    shadow-sm
                    transition-all duration-300
                    group-hover:scale-110
                    group-hover:rotate-2
                    ${style.glow}
                  `}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </div>
              </div>

              {/* Bottom information */}
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {positive ? (
                    <span
                      className="
                        flex items-center gap-1
                        rounded-full bg-emerald-50
                        px-2 py-1
                        text-[11px] font-semibold text-emerald-700
                      "
                    >
                      <TrendingUp className="h-3 w-3" />
                      Growing
                    </span>
                  ) : (
                    <span
                      className="
                        flex items-center gap-1
                        rounded-full bg-slate-100
                        px-2 py-1
                        text-[11px] font-semibold text-slate-600
                      "
                    >
                      <Clock3 className="h-3 w-3" />
                      Current
                    </span>
                  )}
                </div>

                <span className="text-xs text-slate-400 transition-colors duration-300 group-hover:text-slate-500">
                  {stat.helper}
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
