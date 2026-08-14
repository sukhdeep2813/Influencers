import { ArrowUpRight, Eye, Plus } from "lucide-react";
import { portfolio } from "@/app/(creator)/dashboard/creator/data/portfolio-data";
import { SectionHeader } from "./section-header";

const backgrounds = [
  "from-orange-400 via-orange-200 to-amber-100",
  "from-emerald-400 via-teal-200 to-emerald-50",
  "from-violet-400 via-purple-200 to-violet-50",
];

const categoryStyles = [
  "bg-orange-950/80 text-white",
  "bg-emerald-950/80 text-white",
  "bg-violet-950/80 text-white",
];

export default function PortfolioCard() {
  return (
    <article className="group rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/40 sm:p-6">
      <SectionHeader title="Portfolio highlights" action="Manage portfolio" />

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {portfolio.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className="
              group/card relative aspect-[4/5]
              overflow-hidden rounded-2xl
              bg-slate-100 text-left
              shadow-sm ring-1 ring-slate-200/70
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-xl hover:shadow-slate-300/40
            "
          >
            {/* Background artwork */}
            <div
              className={`
                absolute inset-0
                bg-gradient-to-br
                ${backgrounds[index % backgrounds.length]}
                transition-transform duration-500
                group-hover/card:scale-110
              `}
            />

            {/* Decorative shapes */}
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/30 blur-xl" />

            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />

            {/* Fake visual content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-[22px] border border-white/40 bg-white/25 text-2xl font-black text-white shadow-lg backdrop-blur-md transition-transform duration-300 group-hover/card:scale-110">
                  {item.title.charAt(0)}
                </div>

                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
                  {item.category}
                </p>
              </div>
            </div>

            {/* Top category badge */}
            <div className="absolute left-3 top-3">
              <span
                className={`
                  inline-flex rounded-full
                  px-2.5 py-1
                  text-[9px] font-bold
                  shadow-sm backdrop-blur-md
                  ${categoryStyles[index % categoryStyles.length]}
                `}
              >
                {item.category}
              </span>
            </div>

            {/* Hover arrow */}
            <div className="absolute right-3 top-3 grid h-8 w-8 translate-y-1 place-items-center rounded-full bg-white/80 text-slate-900 opacity-0 shadow-sm backdrop-blur-md transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
              <ArrowUpRight className="h-4 w-4" />
            </div>

            {/* Bottom glass information */}
            <div className="absolute inset-x-2.5 bottom-2.5 overflow-hidden rounded-xl border border-white/50 bg-white/80 p-3 shadow-lg backdrop-blur-xl transition-all duration-300 group-hover/card:bg-white/90">
              <p className="truncate text-xs font-bold text-slate-950">
                {item.title}
              </p>

              <div className="mt-1.5 flex items-center justify-between gap-2">
                <span className="truncate text-[10px] font-medium text-slate-500">
                  {item.brand}
                </span>

                <span className="flex shrink-0 items-center gap-1 text-[10px] font-semibold text-slate-500">
                  <Eye className="h-3 w-3" />
                  {item.views}
                </span>
              </div>
            </div>
          </button>
        ))}

        {/* Add work */}
        <button
          type="button"
          className="
            group/add
            relative flex aspect-[4/5]
            flex-col items-center justify-center
            overflow-hidden rounded-2xl
            border border-dashed border-slate-300
            bg-slate-50/60
            text-sm font-semibold text-slate-600
            transition-all duration-300
            hover:-translate-y-1
            hover:border-orange-300
            hover:bg-orange-50/40
            hover:text-orange-600
          "
        >
          <div
            className="
              mb-3 grid h-11 w-11
              place-items-center rounded-2xl
              bg-white
              text-slate-500
              shadow-sm ring-1 ring-slate-200
              transition-all duration-300
              group-hover/add:scale-110
              group-hover/add:rotate-90
              group-hover/add:text-orange-500
            "
          >
            <Plus className="h-5 w-5" />
          </div>

          <span>Add work</span>

          <span className="mt-1 text-[10px] font-medium text-slate-400 group-hover/add:text-orange-400">
            Showcase your latest work
          </span>
        </button>
      </div>

      {/* Bottom summary */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Portfolio performance
          </p>
          <p className="mt-1 text-sm font-bold text-slate-950">
            7.3K total views
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
        >
          View portfolio
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}
