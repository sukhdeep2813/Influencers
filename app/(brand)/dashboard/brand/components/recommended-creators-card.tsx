import { ArrowRight, Sparkles } from "lucide-react";
import type { RecommendedCreator } from "@/app/(brand)/dashboard/brand/data/recommended-creator-data";
import { SectionHeader } from "@/app/(brand)/dashboard/brand/components/section-header";

export function RecommendedCreatorsCard({
  creators,
}: {
  creators: RecommendedCreator[];
}) {
  return (
    <section
      id="recommended-creators"
      className="
        scroll-mt-24
        relative overflow-hidden
        rounded-3xl
        border border-slate-200/80
        bg-white
        p-5
        shadow-sm
        transition-all duration-300
        hover:border-slate-300
        hover:shadow-lg hover:shadow-slate-200/50
        sm:p-6
      "
    >
      {/* Subtle background glow */}
      <div
        className="
          pointer-events-none absolute
          -right-20 -top-20
          h-48 w-48
          rounded-full
          bg-orange-100/60
          blur-3xl
        "
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-orange-50 text-orange-500">
                <Sparkles className="h-3.5 w-3.5" />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-orange-600">
                Smart matching
              </span>
            </div>

            <SectionHeader title="Recommended creators" action="See more" />
          </div>
        </div>

        {/* Creator list */}
        <div className="mt-5 divide-y divide-slate-100">
          {creators.map((creator) => (
            <article
              key={creator.id}
              className="
                group flex min-w-0
                flex-col gap-3
                py-4
                first:pt-0
                last:pb-0
                sm:flex-row sm:items-center
              "
            >
              {/* Avatar */}
              <div className="flex items-center gap-3 sm:min-w-0 sm:flex-1">
                <div
                  className="
                    relative grid h-11 w-11
                    shrink-0 place-items-center
                    overflow-hidden
                    rounded-2xl
                    bg-gradient-to-br
                    from-violet-100
                    via-purple-50
                    to-orange-50
                    text-xs font-extrabold
                    text-violet-600
                    ring-1 ring-slate-200/70
                    transition-transform duration-300
                    group-hover:scale-105
                  "
                >
                  {creator.initials}

                  {/* Online indicator */}
                  <span
                    className="
                      absolute bottom-0.5 right-0.5
                      h-2.5 w-2.5
                      rounded-full
                      border-2 border-white
                      bg-emerald-500
                    "
                  />
                </div>

                {/* Creator information */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-bold text-slate-950">
                      {creator.name}
                    </h3>

                    <span className="hidden rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-500 sm:inline-flex">
                      Creator
                    </span>
                  </div>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {creator.details}
                  </p>
                </div>
              </div>

              {/* Match + action */}
              <div className="flex items-center justify-between gap-3 sm:shrink-0">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-14 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                      style={{
                        width: `${Math.min(Math.max(creator.match, 0), 100)}%`,
                      }}
                    />
                  </div>

                  <span className="whitespace-nowrap text-[11px] font-bold text-emerald-700">
                    {creator.match}% match
                  </span>
                </div>

                <button
                  type="button"
                  aria-label={`View ${creator.name}`}
                  className="
                    grid h-8 w-8
                    shrink-0 place-items-center
                    rounded-lg
                    border border-slate-200
                    bg-white
                    text-slate-400
                    opacity-100
                    transition-all
                    hover:border-slate-300
                    hover:bg-slate-50
                    hover:text-slate-950
                    sm:opacity-0
                    sm:group-hover:opacity-100
                  "
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-5 border-t border-slate-100 pt-5">
          <a
            href="/dashboard/brand/search"
            className="
              group flex min-h-11
              w-full items-center justify-center
              gap-2 rounded-xl
              bg-slate-950
              px-4
              text-xs font-bold
              text-white
              no-underline
              shadow-sm
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-slate-800
              hover:shadow-md
            "
          >
            Browse creator marketplace
            <ArrowRight
              className="
                h-3.5 w-3.5
                transition-transform
                group-hover:translate-x-0.5
              "
            />
          </a>
        </div>
      </div>
    </section>
  );
}
