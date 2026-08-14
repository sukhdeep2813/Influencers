import { ArrowUpRight, TrendingUp } from "lucide-react";

const chartData = [
  { day: "M", value: 34 },
  { day: "T", value: 48 },
  { day: "W", value: 40 },
  { day: "T", value: 72 },
  { day: "F", value: 58 },
  { day: "S", value: 46 },
  { day: "S", value: 88 },
];

export default function EarningsCard() {
  return (
    <article
      className="
        group relative overflow-hidden
        rounded-3xl
        border border-slate-800
        bg-slate-950
        p-5 text-white
        shadow-[0_10px_40px_rgba(15,23,42,0.12)]
        transition-all duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_18px_50px_rgba(15,23,42,0.18)]
        sm:p-6
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none absolute
          -right-20 -top-20
          h-48 w-48
          rounded-full
          bg-orange-500/10
          blur-3xl
        "
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-slate-400">
                Earnings this month
              </p>

              <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                +18.4%
              </span>
            </div>

            <p className="mt-2 text-3xl font-bold tracking-tight">
              ₹28,400
            </p>

            <p className="mt-1 text-xs text-slate-500">
              3 completed · 1 campaign in progress
            </p>
          </div>

          <div
            className="
              grid h-11 w-11 place-items-center
              rounded-2xl
              border border-orange-400/10
              bg-orange-400/10
              text-orange-400
              transition-transform duration-300
              group-hover:scale-105
            "
          >
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>

        {/* Chart */}
        <div className="relative mt-8 h-40">
          {/* Horizontal grid */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
            <span className="border-t border-white/[0.06]" />
            <span className="border-t border-white/[0.06]" />
            <span className="border-t border-white/[0.06]" />
            <span className="border-t border-white/[0.06]" />
            <span className="border-t border-white/[0.10]" />
          </div>

          {/* Bars */}
          <div className="absolute inset-0 flex items-end gap-2 sm:gap-3">
            {chartData.map((item, index) => {
              const highlighted = index === 3 || index === 6;

              return (
                <div
                  key={`${item.day}-${index}`}
                  className="group/bar relative flex h-full flex-1 items-end"
                >
                  {/* Tooltip */}
                  <div
                    className="
                      pointer-events-none absolute
                      bottom-[calc(var(--bar-height)+8px)]
                      left-1/2
                      z-10
                      -translate-x-1/2
                      translate-y-1
                      whitespace-nowrap
                      rounded-lg
                      bg-white
                      px-2 py-1
                      text-[10px]
                      font-semibold
                      text-slate-950
                      opacity-0
                      shadow-lg
                      transition-all duration-200
                      group-hover/bar:translate-y-0
                      group-hover/bar:opacity-100
                    "
                    style={
                      {
                        "--bar-height": `${item.value}%`,
                      } as React.CSSProperties
                    }
                  >
                    ₹{Math.round(item.value * 320)}
                  </div>

                  {/* Bar */}
                  <div
                    className={`
                      relative w-full overflow-hidden
                      rounded-t-lg
                      transition-all duration-300
                      group-hover/bar:brightness-125
                      ${
                        highlighted
                          ? "bg-gradient-to-t from-orange-600 to-orange-300"
                          : "bg-gradient-to-t from-slate-700 to-slate-500"
                      }
                    `}
                    style={{
                      height: `${item.value}%`,
                    }}
                  >
                    {/* Shine */}
                    <div className="absolute inset-x-0 top-0 h-px bg-white/30" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Days */}
        <div className="mt-3 grid grid-cols-7 gap-2 text-center text-[10px] font-semibold text-slate-500">
          {chartData.map((item, index) => (
            <span
              key={`${item.day}-${index}`}
              className={
                index === 3 || index === 6
                  ? "text-orange-400"
                  : undefined
              }
            >
              {item.day}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-5">
          <div>
            <p className="text-xs text-slate-500">
              Available balance
            </p>

            <p className="mt-1 text-lg font-semibold">
              ₹21,200
            </p>
          </div>

          <button
            type="button"
            className="
              inline-flex items-center gap-2
              rounded-xl
              bg-white
              px-4 py-2.5
              text-sm font-semibold
              text-slate-950
              shadow-sm
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-orange-50
              hover:text-orange-700
              hover:shadow-lg
              active:scale-[0.98]
            "
          >
            View payments
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}