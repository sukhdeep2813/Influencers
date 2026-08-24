import Link from "next/link";
import { ArrowUpRight, Eye, Plus } from "lucide-react";
import { SectionHeader } from "./section-header";
import { PortfolioItem } from "../../../../../generated/prisma";

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

interface PortfolioCardProps {
  items: PortfolioItem[];
}

function formatViews(views: number) {
  if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M`;
  }

  if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}K`;
  }

  return views.toString();
}

export default function PortfolioCard({ items = [] }: PortfolioCardProps) {
  const totalViews = items.reduce((sum, item) => sum + (item.views ?? 0), 0);

  return (
    <article className="group rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/40 sm:p-6">
      <SectionHeader title="Portfolio highlights" action="Manage portfolio" />

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((item, index) => {
          const title = item.title?.trim() || "Untitled work";
          const description = item.description?.trim() || "Portfolio Item";

          return (
            <Link
              key={item.id}
              href={`/dashboard/creator/portfolio/${item.id}`}
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
              {/* Background */}
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

              {/* Center artwork */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="
                      mx-auto grid h-16 w-16 place-items-center
                      rounded-[22px]
                      border border-white/40
                      bg-white/25
                      text-2xl font-black text-white
                      shadow-lg backdrop-blur-md
                      transition-transform duration-300
                      group-hover/card:scale-110
                    "
                  >
                    {title.charAt(0).toUpperCase()}
                  </div>

                  <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
                    WORK
                  </p>
                </div>
              </div>

              {/* Category */}
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
                  MEDIA
                </span>
              </div>

              {/* Hover arrow */}
              <div
                className="
                  absolute right-3 top-3
                  grid h-8 w-8
                  translate-y-1
                  place-items-center
                  rounded-full
                  bg-white/80
                  text-slate-900
                  opacity-0
                  shadow-sm
                  backdrop-blur-md
                  transition-all duration-300
                  group-hover/card:translate-y-0
                  group-hover/card:opacity-100
                "
              >
                <ArrowUpRight className="h-4 w-4" />
              </div>

              {/* Bottom information */}
              <div
                className="
                  absolute inset-x-2.5 bottom-2.5
                  overflow-hidden rounded-xl
                  border border-white/50
                  bg-white/80
                  p-3
                  shadow-lg
                  backdrop-blur-xl
                  transition-all duration-300
                  group-hover/card:bg-white/90
                "
              >
                <p className="truncate text-xs font-bold text-slate-950">
                  {title}
                </p>

                <div className="mt-1.5 flex items-center justify-between gap-2">
                  <span className="truncate text-[10px] font-medium text-slate-500">
                    {description}
                  </span>

                  <span className="flex shrink-0 items-center gap-1 text-[10px] font-semibold text-slate-500">
                    <Eye className="h-3 w-3" />
                    {formatViews(item.views ?? 0)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}

        {/* Add work */}
        <Link
          href="/dashboard/creator/portfolio/new"
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
        </Link>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-5 text-center">
          <p className="text-sm font-semibold text-slate-700">
            No portfolio work yet
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Add your first project to start showcasing your work.
          </p>
        </div>
      )}

      {/* Summary */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Portfolio performance
          </p>

          <p className="mt-1 text-sm font-bold text-slate-950">
            {formatViews(totalViews)} total views
          </p>
        </div>

        <Link
          href="/dashboard/creator/portfolio"
          className="
            inline-flex items-center gap-1.5
            rounded-xl px-3 py-2
            text-xs font-bold text-slate-600
            transition
            hover:bg-slate-50
            hover:text-slate-950
          "
        >
          View portfolio
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
