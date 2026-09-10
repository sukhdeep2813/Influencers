"use client";

import { useEffect, useMemo, useState } from "react";
import { Prisma, CampaignStatus } from "../../../../../../generated/prisma";
import { button, control, platforms, statusLabels } from "./campaign-utils";
import CampaignCard from "./campaign-card";
import CampaignTable, { CampaignBoard } from "./campaign-table";

// Define the Prisma payload matching your page.tsx fetch
type CampaignWithData = Prisma.CampaignGetPayload<{
  include: {
    creators: {
      include: {
        creator: {
          include: { user: true };
        };
      };
    };
  };
}> & {
  platforms?: string[];
  progress?: number;
};

type View = "cards" | "table" | "board";
type Sort = "recent" | "budget" | "creators" | "progress";

const PRISMA_STATUSES: CampaignStatus[] = [
  "DRAFT",
  "IN_REVIEW",
  "LIVE",
  "CANCELLED",
  "COMPLETED",
];

export default function CampaignFilters({
  campaigns,
}: {
  campaigns: CampaignWithData[];
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<CampaignStatus | "all">("all");
  const [platform, setPlatform] = useState<string | "all">("all");
  const [budget, setBudget] = useState("all");
  const [dueSoon, setDueSoon] = useState(false);
  const [sort, setSort] = useState<Sort>("recent");
  const [view, setView] = useState<View>("cards");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("creatorlink-campaign-view");
      if (saved === "cards" || saved === "table" || saved === "board")
        setView(saved);
    } catch {
      /* View switching still works if storage is unavailable. */
    }
  }, []);

  function changeView(next: View) {
    setView(next);
    try {
      localStorage.setItem("creatorlink-campaign-view", next);
    } catch {
      /* Optional preference. */
    }
  }

  function reset() {
    setQuery("");
    setStatus("all");
    setPlatform("all");
    setBudget("all");
    setDueSoon(false);
    setSort("recent");
  }

  const filtered = useMemo(
    () =>
      campaigns
        .filter((campaign) => {
          // Fallback array for platforms search
          const activePlatforms = campaign.platforms || [];

          const text =
            `${campaign.title} ${campaign.description || ""} ${activePlatforms.join(" ")} ${campaign.deliverables || ""}`.toLowerCase();

          // Calculate dynamic days left
          const daysLeft = campaign.deadline
            ? Math.ceil(
                (new Date(campaign.deadline).getTime() - new Date().getTime()) /
                  (1000 * 3600 * 24),
              )
            : null;

          return (
            text.includes(query.trim().toLowerCase()) &&
            (status === "all" || campaign.status === status) &&
            (platform === "all" ||
              activePlatforms.includes(platform) ||
              (campaign.deliverables &&
                campaign.deliverables.includes(platform))) &&
            (budget === "all" ||
              (budget === "under"
                ? campaign.budget < 50000
                : campaign.budget >= 50000)) &&
            (!dueSoon ||
              (campaign.status !== "COMPLETED" &&
                daysLeft !== null &&
                daysLeft >= 0 &&
                daysLeft <= 7))
          );
        })
        .sort((a, b) => {
          if (sort === "budget") return b.budget - a.budget;
          if (sort === "creators") return b.creators.length - a.creators.length;
          if (sort === "progress") return (b.progress || 0) - (a.progress || 0);
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        }),
    [campaigns, query, status, platform, budget, dueSoon, sort],
  );

  const chips = [
    ...(query
      ? [{ label: `Search: ${query}`, clear: () => setQuery("") }]
      : []),
    ...(status !== "all"
      ? [
          {
            label: statusLabels[status as CampaignStatus] || status,
            clear: () => setStatus("all"),
          },
        ]
      : []),
    ...(platform !== "all"
      ? [{ label: platform, clear: () => setPlatform("all") }]
      : []),
    ...(budget !== "all"
      ? [
          {
            label: budget === "under" ? "Under ₹50,000" : "₹50,000 and above",
            clear: () => setBudget("all"),
          },
        ]
      : []),
    ...(dueSoon
      ? [{ label: "Due within 7 days", clear: () => setDueSoon(false) }]
      : []),
  ];

  return (
    <section className="space-y-4">
      <div
        className="flex gap-1 overflow-x-auto rounded-xl border border-[#e5ddcf] bg-white p-1.5"
        aria-label="Filter by status"
      >
        <button
          type="button"
          aria-pressed={status === "all"}
          onClick={() => setStatus("all")}
          className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ${status === "all" ? "bg-[#1b1923] text-white" : "text-[#746d63] hover:bg-[#f5f1e9]"}`}
        >
          All <span className="ml-1.5 opacity-70">{campaigns.length}</span>
        </button>

        {PRISMA_STATUSES.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={status === item}
            onClick={() => setStatus(item)}
            className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ${status === item ? "bg-[#1b1923] text-white" : "text-[#746d63] hover:bg-[#f5f1e9]"}`}
          >
            {statusLabels[item]}{" "}
            <span className="ml-1.5 opacity-70">
              {campaigns.filter((c) => c.status === item).length}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#e5ddcf] bg-[#f8f4ea] p-4">
        <input
          aria-label="Search campaigns"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search campaigns…"
          className={`${control} min-w-0 grow basis-64`}
        />
        <select
          aria-label="Platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className={control}
        >
          <option value="all">All platforms</option>
          {platforms.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <select
          aria-label="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className={control}
        >
          <option value="all">All budgets</option>
          <option value="under">Under ₹50,000</option>
          <option value="over">₹50,000 and above</option>
        </select>
        <select
          aria-label="Sort campaigns"
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className={control}
        >
          <option value="recent">Recently updated</option>
          <option value="budget">Highest budget</option>
          <option value="creators">Most creators</option>
          <option value="progress">Most complete</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={dueSoon}
            onChange={(e) => setDueSoon(e.target.checked)}
            className="size-4 accent-[#23796e]"
          />
          Due in 7 days
        </label>
      </div>

      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={chip.clear}
              aria-label={`Remove ${chip.label} filter`}
              className="rounded-full bg-[#fff0d8] px-3 py-1.5 text-sm text-[#91530d]"
            >
              {chip.label} ×
            </button>
          ))}
          <button type="button" onClick={reset} className="text-sm underline">
            Clear all
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-[#746d63]">
          {filtered.length} campaigns found
        </p>
        <div className="flex gap-1 rounded-xl border border-[#e5ddcf] bg-white p-1">
          {(["cards", "table", "board"] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={view === item}
              onClick={() => changeView(item)}
              className={`rounded-lg px-3 py-2 text-sm capitalize ${view === item ? "bg-[#1b1923] text-white" : "text-[#746d63]"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d8cfbf] bg-white p-12 text-center">
          <h2 className="text-lg font-semibold">No matching campaigns</h2>
          <p className="my-3 text-sm text-[#746d63]">
            Change your search or clear the filters.
          </p>
          <button type="button" onClick={reset} className={button}>
            Clear filters
          </button>
        </div>
      ) : view === "table" ? (
        <CampaignTable campaigns={filtered} />
      ) : view === "board" ? (
        <CampaignBoard campaigns={filtered} />
      ) : (
        <div className="space-y-4">
          {filtered.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </section>
  );
}
