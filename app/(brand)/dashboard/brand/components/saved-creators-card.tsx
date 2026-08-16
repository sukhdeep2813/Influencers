import type { SavedCreator } from "@/app/(brand)/dashboard/brand/data/saved-creator-data";
import { ArrowUpRight, Bookmark, MoreHorizontal } from "lucide-react";
import { SectionHeader } from "./section-header";

const avatarStyles = {
  gold: {
    avatar: "bg-orange-100 text-orange-700",
    glow: "bg-orange-200/50",
  },
  teal: {
    avatar: "bg-emerald-50 text-emerald-700",
    glow: "bg-emerald-200/40",
  },
  blue: {
    avatar: "bg-blue-50 text-blue-700",
    glow: "bg-blue-200/40",
  },
  coral: {
    avatar: "bg-rose-50 text-rose-700",
    glow: "bg-rose-200/40",
  },
} as const;

export function SavedCreatorsCard({ creators }: { creators: SavedCreator[] }) {
  return (
    <section
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
          bg-orange-100/50
          blur-3xl
          transition-all duration-500
          group-hover:bg-orange-200/60
        "
      />

      <div className="relative">
        {/* Header */}
        <SectionHeader
          title="Saved creators"
          action="View creator lists"
          href="/dashboard/brand/saved"
        />

        {/* Small summary */}
        <div
          className="
            mb-5 flex items-center justify-between gap-4
            rounded-2xl
            border border-slate-100
            bg-slate-50/70
            p-3.5
            sm:p-4
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                grid h-10 w-10 shrink-0 place-items-center
                rounded-xl
                bg-white
                text-orange-500
                shadow-sm
                ring-1 ring-slate-100
              "
            >
              <Bookmark className="h-[18px] w-[18px]" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-950">
                Your creator shortlist
              </p>

              <p className="mt-0.5 text-[11px] text-slate-500">
                Creators you've saved for future campaigns
              </p>
            </div>
          </div>

          <span
            className="
              shrink-0 rounded-full
              bg-slate-950
              px-2.5 py-1
              text-[10px] font-bold
              text-white
            "
          >
            {creators.length} saved
          </span>
        </div>

        {/* Creator grid */}
        <div
          className="
            grid grid-cols-1 gap-3
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          {creators.map((creator) => {
            const style = avatarStyles[creator.accent];

            return (
              <article
                key={creator.id}
                className="
                  group/creator relative overflow-hidden
                  rounded-2xl
                  border border-slate-200/80
                  bg-white
                  p-4
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:border-slate-300
                  hover:bg-slate-50/50
                  hover:shadow-md
                "
              >
                {/* Avatar glow */}
                <div
                  className={`
                    pointer-events-none absolute
                    -right-6 -top-6
                    h-20 w-20
                    rounded-full
                    ${style.glow}
                    opacity-0 blur-2xl
                    transition-opacity duration-300
                    group-hover/creator:opacity-100
                  `}
                />

                <div className="relative">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`
                        grid h-11 w-11 shrink-0
                        place-items-center
                        rounded-full
                        text-[10px] font-extrabold
                        ring-4 ring-white
                        shadow-sm
                        ${style.avatar}
                        transition-transform duration-200
                        group-hover/creator:scale-105
                      `}
                    >
                      {creator.initials}
                    </div>

                    <button
                      type="button"
                      aria-label={`More options for ${creator.name}`}
                      className="
                        grid h-8 w-8 shrink-0
                        place-items-center
                        rounded-lg
                        text-slate-400
                        transition-all
                        hover:bg-white
                        hover:text-slate-900
                        hover:shadow-sm
                      "
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Creator information */}
                  <div className="mt-4 min-w-0">
                    <h3
                      className="
                        truncate
                        text-sm font-bold
                        text-slate-950
                      "
                    >
                      {creator.name}
                    </h3>

                    <p
                      className="
                        mt-1 truncate
                        text-[11px]
                        leading-5
                        text-slate-500
                      "
                    >
                      {creator.details}
                    </p>
                  </div>

                  {/* Bottom action */}
                  <div
                    className="
                      mt-4 flex items-center
                      justify-between
                      border-t border-slate-100
                      pt-3
                    "
                  >
                    <span
                      className="
                        inline-flex items-center gap-1.5
                        text-[10px]
                        font-semibold
                        text-emerald-600
                      "
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Saved
                    </span>

                    <button
                      type="button"
                      className="
                        inline-flex items-center gap-1
                        text-[10px]
                        font-bold
                        text-slate-500
                        transition-colors
                        hover:text-orange-500
                      "
                    >
                      View
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty state */}
        {creators.length === 0 && (
          <div
            className="
              flex flex-col items-center justify-center
              rounded-2xl
              border border-dashed border-slate-200
              bg-slate-50/50
              px-6 py-10
              text-center
            "
          >
            <div
              className="
                grid h-12 w-12
                place-items-center
                rounded-2xl
                bg-white
                text-slate-400
                shadow-sm
              "
            >
              <Bookmark className="h-5 w-5" />
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-950">
              No saved creators
            </p>

            <p className="mt-1 max-w-sm text-xs text-slate-500">
              Save creators you like while browsing the marketplace to build
              your campaign shortlist.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
