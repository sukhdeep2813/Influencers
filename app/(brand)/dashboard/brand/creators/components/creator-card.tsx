import type { Creator, ViewMode } from "../types/creators";
import { compact, initials, money } from "../lib/filter-creators";
import { Button } from "./results-toolbar";

type Props = {
  creator: Creator;
  view: ViewMode;
  saved: boolean;
  compared: boolean;
  compareDisabled: boolean;
  onSave: () => void;
  onCompare: () => void;
  onContact: () => void;
};

export default function CreatorCard({
  creator: c,
  view,
  saved,
  compared,
  compareDisabled,
  onSave,
  onCompare,
  onContact,
}: Props) {
  const list = view === "list";

  // Calculate dynamic data from Prisma relations
  const isAvailable =
    c.availability?.some((a) => a.status === "AVAILABLE") ?? false;
  const reviewCount = c.reviews?.length ?? 0;

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-[#e2dbc8] bg-white shadow-[0_2px_14px_rgba(21,20,31,.04)] transition hover:border-[#cbb99d] ${list ? "lg:flex lg:items-center" : ""}`}
    >
      <div
        className={`relative bg-linear-to-br from-[#fdf1de] to-[#e7f4f1] ${list ? "h-24 lg:h-auto lg:w-40 lg:shrink-0 lg:self-stretch" : "h-28"}`}
      >
        <label className="absolute left-3 top-3 flex cursor-pointer items-center gap-1.5 rounded-lg bg-white/95 px-2 py-1.5 text-xs">
          <input
            type="checkbox"
            className="size-4 accent-[#15141f] cursor-pointer"
            checked={compared}
            disabled={!compared && compareDisabled}
            onChange={onCompare}
            aria-label={`Compare ${c.name}`}
          />
          Compare
        </label>
        <button
          type="button"
          aria-label={`${saved ? "Unsave" : "Save"} ${c.name}`}
          aria-pressed={saved}
          onClick={onSave}
          className={`absolute right-3 top-3 grid size-9 cursor-pointer place-items-center rounded-full bg-white/95 text-xl ${saved ? "text-[#a7412c]" : "text-[#6b6558]"}`}
        >
          {saved ? "♥" : "♡"}
        </button>
        <span
          className={`absolute bottom-0 left-5 grid size-14 translate-y-1/2 place-items-center rounded-full border-4 border-white bg-[#15141f] font-semibold text-[#e7912b] ${list ? "lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-0" : ""}`}
          aria-hidden="true"
        >
          {initials(c.name)}
        </span>
      </div>

      <div className={`min-w-0 flex-1 p-5 pt-9 ${list ? "lg:pt-5" : ""}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold tracking-tight">{c.name}</h2>
          {c.verified && (
            <span className="rounded-full bg-[#e7f4f1] px-2 py-1 text-xs font-medium text-[#0e463e]">
              ✓ Verified
            </span>
          )}
        </div>

        {/* Safely handle null handles and cities */}
        <p className="mt-1 break-words text-sm text-[#6b6558]">
          {c.handle || "No handle"} {c.city ? `· ${c.city}` : ""}
        </p>

        <div className="my-3 flex flex-wrap gap-1.5">
          {/* Filter out null values before rendering tags */}
          {[c.niche, ...c.platforms, ...c.creatorTypes]
            .filter(Boolean)
            .map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-[#f3efe4] px-2 py-1 text-xs text-[#6b6558]"
              >
                {tag}
              </span>
            ))}
        </div>

        <dl className="grid grid-cols-3 gap-2 border-y border-[#e2dbc8] py-3 text-center">
          {[
            // Safely fall back to 0 if followers is null in the database
            ["Followers", compact(c.followers ?? 0)],
            ["Engagement", `${c.engagement}%`],
            ["Per post", money(c.price)],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-[#6b6558]">{label}</dt>
              <dd className="mt-1 font-mono text-sm font-semibold">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="my-3 text-xs text-[#6b6558]">
          {isAvailable ? "Available this month" : "Currently unavailable"} ·{" "}
          {reviewCount > 0
            ? `${reviewCount} brand review${reviewCount !== 1 ? "s" : ""}`
            : "No brand reviews yet"}
        </p>

        <div className="flex gap-2">
          <Button
            className="flex-1 cursor-pointer"
            onClick={onSave}
            aria-pressed={saved}
          >
            {saved ? "Saved ♥" : "Save"}
          </Button>
          <Button
            className="flex-1 cursor-pointer"
            tone="primary"
            onClick={onContact}
          >
            Contact
          </Button>
        </div>
      </div>
    </article>
  );
}
