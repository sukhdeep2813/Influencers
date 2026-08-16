import { ArrowUpRight, TrendingUp } from "lucide-react";
import { SectionHeader } from "./section-header";

type SpendPoint = {
  month: string;
  value: number;
  highlight?: boolean;
};

type SpendOverviewCardProps = {
  monthlySpend: string;
  monthlyBudget: string;
  history: SpendPoint[];
};

export function SpendOverviewCard({
  monthlySpend,
  monthlyBudget,
  history,
}: SpendOverviewCardProps) {
  return (
    <section
      id="spend"
      className="
        scroll-mt-24
        group relative overflow-hidden
        rounded-3xl
        border border-slate-200/80
        bg-white
        p-5
        shadow-sm
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-slate-300
        hover:shadow-xl hover:shadow-slate-200/50
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
          bg-blue-100/50
          blur-3xl
          transition-all duration-500
          group-hover:bg-blue-100/70
        "
      />

      <div className="relative">
        {/* Header */}
        <SectionHeader
          title="Spend overview"
          action="Full report"
          href="/dashboard/brand/payments"
        />

        {/* Main metrics */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Total spend this month
            </p>

            <div className="mt-2 flex items-baseline gap-2">
              <strong className="text-3xl font-bold tracking-tight text-slate-950 sm:text-[34px]">
                {monthlySpend}
              </strong>

              <span
                className="
                  inline-flex items-center gap-1
                  rounded-full
                  bg-emerald-50
                  px-2 py-1
                  text-[10px] font-bold
                  text-emerald-700
                "
              >
                <TrendingUp className="h-3 w-3" />
                12.4%
              </span>
            </div>

            <p className="mt-1 text-[11px] text-slate-400">
              of {monthlyBudget} monthly budget
            </p>
          </div>

          {/* Budget percentage */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
            <p className="text-[10px] font-medium text-slate-400">
              Budget used
            </p>

            <p className="mt-1 text-lg font-bold text-slate-950">68%</p>
          </div>
        </div>

        {/* Budget progress */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-medium text-slate-400">
              Monthly budget
            </span>

            <span className="text-[10px] font-bold text-slate-600">
              68% used
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="
                h-full w-[68%]
                rounded-full
                bg-gradient-to-r
                from-blue-600 to-blue-400
                transition-all duration-700
              "
            />
          </div>
        </div>

        {/* Chart */}
        <div className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-semibold text-slate-600">
              Spending trend
            </p>

            <span className="text-[10px] text-slate-400">Last 7 months</span>
          </div>

          <div
            className="
              grid
              h-32
              min-w-0
              grid-cols-7
              items-end
              gap-2
              sm:h-36
              sm:gap-3
            "
            aria-label="Campaign spending over the last seven months"
          >
            {history.map((point) => {
              const isHighlighted = point.highlight;

              return (
                <div
                  key={point.month}
                  className="group/bar flex h-full min-w-0 flex-col justify-end"
                >
                  {/* Bar area */}
                  <div className="relative flex h-[108px] items-end justify-center sm:h-[120px]">
                    {/* Tooltip */}
                    <div
                      className="
                        pointer-events-none
                        absolute bottom-full left-1/2
                        z-10 mb-2
                        -translate-x-1/2
                        translate-y-1
                        whitespace-nowrap
                        rounded-lg
                        bg-slate-950
                        px-2 py-1
                        text-[9px] font-semibold
                        text-white
                        opacity-0
                        shadow-lg
                        transition-all duration-200
                        group-hover/bar:translate-y-0
                        group-hover/bar:opacity-100
                      "
                    >
                      {point.value}%
                    </div>

                    {/* Bar background */}
                    <div
                      className="
                        absolute inset-x-0 bottom-0
                        h-full
                        rounded-xl
                        bg-slate-50
                      "
                    />

                    {/* Actual bar */}
                    <div
                      className={`
                        relative z-[1]
                        w-full
                        max-w-[34px]
                        rounded-t-xl rounded-b-md
                        transition-all duration-300
                        group-hover/bar:-translate-y-1
                        ${
                          isHighlighted
                            ? "bg-gradient-to-t from-blue-600 to-blue-400 shadow-lg shadow-blue-500/20"
                            : "bg-blue-100 group-hover/bar:bg-blue-200"
                        }
                      `}
                      style={{
                        height: `${Math.min(Math.max(point.value, 5), 100)}%`,
                      }}
                    />
                  </div>

                  {/* Month */}
                  <span
                    className={`
                      mt-2
                      text-center
                      text-[9px]
                      font-semibold
                      ${isHighlighted ? "text-slate-950" : "text-slate-400"}
                    `}
                  >
                    {point.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom insight */}
        <div
          className="
            mt-6 flex items-center justify-between gap-3
            rounded-2xl
            border border-blue-100
            bg-gradient-to-r
            from-blue-50/80
            to-white
            p-4
          "
        >
          <div className="min-w-0">
            <p className="text-[10px] font-medium text-slate-500">
              Spending insight
            </p>

            <p className="mt-1 text-xs font-semibold text-slate-950">
              Your campaign spend is trending upward.
            </p>
          </div>

          <button
            type="button"
            aria-label="View spending report"
            className="
              grid h-9 w-9 shrink-0
              place-items-center
              rounded-xl
              bg-white
              text-slate-500
              shadow-sm
              ring-1 ring-slate-100
              transition-all
              hover:-translate-y-0.5
              hover:text-blue-600
              hover:shadow-md
            "
          >
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
