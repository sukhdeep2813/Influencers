import type { ButtonHTMLAttributes } from "react";
import type { SortKey, ViewMode } from "../types/creators";

type Props = {
  query: string;
  sort: SortKey;
  view: ViewMode;
  count: number;
  onQuery: (value: string) => void;
  onSort: (value: SortKey) => void;
  onView: (value: ViewMode) => void;
};

export default function ResultsToolbar({
  query,
  sort,
  view,
  count,
  onQuery,
  onSort,
  onView,
}: Props) {
  return (
    <div className="space-y-4">
      <header>
        <p className="text-sm text-[#8a5310]">Creator discovery</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Find & recruit creators
        </h1>
        <p className="mt-2 text-sm text-[#6b6558]" aria-live="polite">
          <strong className="text-[#1c1b1f]">{count}</strong> creators match
          your filters
        </p>
      </header>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 grow basis-64">
          <input
            aria-label="Search creators"
            placeholder="Search name, handle or keyword…"
            className={`${inputClass} pr-10`}
            value={query}
            onChange={(e) => onQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => onQuery("")}
              className="absolute right-2 top-1.5 size-8 rounded-lg hover:bg-[#f3efe4]"
            >
              ×
            </button>
          )}
        </div>
        <select
          aria-label="Sort creators"
          className={`${inputClass} sm:max-w-52`}
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
        >
          <option value="match">Best match</option>
          <option value="engagement">Highest engagement</option>
          <option value="followers">Most followers</option>
          <option value="price-low">Lowest price</option>
        </select>
        <div
          className="flex gap-1 rounded-xl border border-[#e2dbc8] bg-white p-1"
          aria-label="Results view"
        >
          {(["grid", "list"] as const).map((mode) => (
            <Button
              key={mode}
              aria-pressed={mode === view}
              onClick={() => onView(mode)}
              tone={mode === view ? "dark" : "neutral"}
            >
              {mode === "grid" ? "Grid" : "List"}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export const inputClass =
  "w-full min-w-0 rounded-xl border border-[#e2dbc8] bg-white px-3 py-2.5 text-sm text-[#1c1b1f] outline-none focus:border-[#b4782f] focus:ring-2 focus:ring-[#e7912b]/20";
export const buttonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b4782f] disabled:cursor-not-allowed disabled:opacity-40";

export function Button({
  className = "",
  tone = "neutral",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: "neutral" | "dark" | "primary";
}) {
  const tones = {
    neutral: "border-[#e2dbc8] bg-white text-[#403a32] hover:bg-[#f3efe4]",
    dark: "border-[#15141f] bg-[#15141f] text-white hover:bg-[#292735]",
    primary: "border-[#e7912b] bg-[#e7912b] text-[#241a05] hover:bg-[#efa64c]",
  };
  return (
    <button
      type="button"
      {...props}
      className={`${buttonClass} ${tones[tone]} ${className}`}
    />
  );
}
