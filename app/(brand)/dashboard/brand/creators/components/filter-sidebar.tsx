import type { ReactNode } from "react";
import {
  ageGroups,
  audiences,
  creatorTypes,
  platforms,
} from "../data/creator-data";
import { toggleItem } from "../lib/filter-creators";
import type { CreatorFilters } from "../types/creators";
import { Button, inputClass } from "./results-toolbar";

type Props = {
  filters: CreatorFilters;
  cities: string[];
  niches: string[];
  onChange: (patch: Partial<CreatorFilters>) => void;
  onReset: () => void;
};

export default function FilterSidebar({
  filters: f,
  cities,
  niches,
  onChange,
  onReset,
}: Props) {
  const chip = (selected: boolean) =>
    `rounded-full border px-3 py-2 text-sm transition ${selected ? "border-[#15141f] bg-[#15141f] text-white" : "border-[#e2dbc8] bg-white text-[#6b6558] hover:bg-[#f3efe4]"}`;
  return (
    <aside
      className="space-y-5 rounded-2xl border border-[#e2dbc8] bg-white p-5"
      aria-label="Filter creators"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Filter creators</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-[#9b412d] underline-offset-4 hover:underline"
        >
          Clear all
        </button>
      </div>
      <p className="text-xs text-[#6b6558]">
        Results update as you change filters.
      </p>
      <FilterGroup title="Location">
        <select
          aria-label="Location"
          className={inputClass}
          value={f.city}
          onChange={(e) => onChange({ city: e.target.value })}
        >
          <option value="all">Any city</option>
          {cities.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </FilterGroup>
      <FilterGroup title="Platform">
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => (
            <button
              key={platform}
              type="button"
              aria-pressed={f.platforms.includes(platform)}
              className={chip(f.platforms.includes(platform))}
              onClick={() =>
                onChange({ platforms: toggleItem(f.platforms, platform) })
              }
            >
              {platform}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Industry / niche">
        <select
          aria-label="Industry or niche"
          className={inputClass}
          value={f.niche}
          onChange={(e) => onChange({ niche: e.target.value })}
        >
          <option value="all">Any niche</option>
          {niches.map((niche) => (
            <option key={niche}>{niche}</option>
          ))}
        </select>
      </FilterGroup>
      <FilterGroup title="Followers">
        <div className="grid grid-cols-2 gap-2">
          <label className="text-xs text-[#6b6558]">
            Minimum
            <input
              className={`${inputClass} mt-1`}
              type="number"
              min="0"
              step="1000"
              placeholder="0"
              value={f.minFollowers}
              onChange={(e) => onChange({ minFollowers: e.target.value })}
            />
          </label>
          <label className="text-xs text-[#6b6558]">
            Maximum
            <input
              className={`${inputClass} mt-1`}
              type="number"
              min="0"
              step="1000"
              placeholder="Any"
              value={f.maxFollowers}
              onChange={(e) => onChange({ maxFollowers: e.target.value })}
            />
          </label>
        </div>
      </FilterGroup>
      <FilterGroup title="Minimum engagement">
        <label className="block text-sm text-[#6b6558]">
          {f.minEngagement.toFixed(1)}%
          <input
            aria-label="Minimum engagement rate"
            className="mt-3 w-full accent-[#e7912b]"
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={f.minEngagement}
            onChange={(e) =>
              onChange({ minEngagement: Number(e.target.value) })
            }
          />
        </label>
      </FilterGroup>
      <FilterGroup title="Budget per post (₹)">
        <div className="grid grid-cols-2 gap-2">
          <label className="text-xs text-[#6b6558]">
            Minimum
            <input
              aria-label="Minimum budget"
              className={`${inputClass} mt-1`}
              type="number"
              min="0"
              placeholder="0"
              value={f.minBudget}
              onChange={(e) => onChange({ minBudget: e.target.value })}
            />
          </label>
          <label className="text-xs text-[#6b6558]">
            Maximum
            <input
              aria-label="Maximum budget"
              className={`${inputClass} mt-1`}
              type="number"
              min="0"
              placeholder="Any"
              value={f.maxBudget}
              onChange={(e) => onChange({ maxBudget: e.target.value })}
            />
          </label>
        </div>
      </FilterGroup>
      <FilterGroup title="Audience gender">
        <select
          aria-label="Audience gender"
          value={f.audience}
          className={inputClass}
          onChange={(e) =>
            onChange({ audience: e.target.value as CreatorFilters["audience"] })
          }
        >
          <option value="all">Any audience</option>
          {audiences.map((audience) => (
            <option key={audience}>{audience}</option>
          ))}
        </select>
      </FilterGroup>
      <FilterGroup title="Audience age">
        <div className="flex flex-wrap gap-2">
          {ageGroups.map((age) => (
            <button
              key={age}
              type="button"
              aria-pressed={f.ageGroups.includes(age)}
              className={chip(f.ageGroups.includes(age))}
              onClick={() =>
                onChange({ ageGroups: toggleItem(f.ageGroups, age) })
              }
            >
              {age}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Average reel / short views">
        <select
          aria-label="Minimum average views"
          value={f.minViews}
          onChange={(e) => onChange({ minViews: Number(e.target.value) })}
          className={inputClass}
        >
          {[
            [0, "Any"],
            [1000, "1K+"],
            [10000, "10K+"],
            [50000, "50K+"],
            [100000, "100K+"],
          ].map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </FilterGroup>
      <FilterGroup title="Creator type">
        <div className="flex flex-wrap gap-2">
          {creatorTypes.map((type) => (
            <button
              key={type}
              type="button"
              aria-pressed={f.creatorTypes.includes(type)}
              className={chip(f.creatorTypes.includes(type))}
              onClick={() =>
                onChange({ creatorTypes: toggleItem(f.creatorTypes, type) })
              }
            >
              {type}
            </button>
          ))}
        </div>
      </FilterGroup>
      <div className="space-y-3">
        {(
          [
            ["verifiedOnly", "Verified creators only"],
            ["availableOnly", "Available this month"],
            ["hasReviews", "Has brand reviews"],
            ["savedOnly", "Saved creators only"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="size-4 accent-[#1f8073]"
              checked={f[key]}
              onChange={(e) => onChange({ [key]: e.target.checked })}
            />
            {label}
          </label>
        ))}
      </div>
      <Button className="w-full" onClick={onReset}>
        Reset filters
      </Button>
    </aside>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="space-y-3 border-b border-[#e2dbc8] pb-5">
      <legend className="mb-3 text-sm font-semibold">{title}</legend>
      {children}
    </fieldset>
  );
}
