"use client";

import { useMemo, useState } from "react";
import type {
  Creator,
  CreatorFilters,
  SortKey,
  ViewMode,
} from "../types/creators";
import { defaultFilters } from "../data/creator-data";
import {
  activeChips,
  filterCreators,
  filterError,
  toggleItem,
} from "../lib/filter-creators";
import FilterSidebar from "./filter-sidebar";
import ResultsToolbar from "./results-toolbar";
import ActiveFilters from "./active-filters";
import CreatorResults from "./creator-results";
import Pagination from "./pagination";
import CompareBar from "./compare-bar";
import CompareDialog from "./compare-dialog";
import ContactDialog from "./contact-dialog";
import { Button } from "./results-toolbar";

const PAGE_SIZE = 6;

export default function CreatorDiscovery({
  creators,
}: {
  creators: Creator[];
}) {
  const [filters, setFilters] = useState<CreatorFilters>(defaultFilters);
  const [sort, setSort] = useState<SortKey>("match");
  const [view, setView] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [contactId, setContactId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  function changeFilters(patch: Partial<CreatorFilters>) {
    setFilters((current) => ({ ...current, ...patch }));
    setPage(1);
  }

  function reset() {
    setFilters(defaultFilters);
    setSort("match");
    setPage(1);
  }

  function save(id: string) {
    setSavedIds((current) => toggleItem(current, id));
    if (filters.savedOnly) setPage(1);
  }

  function compare(id: string) {
    if (!comparedIds.includes(id) && comparedIds.length >= 3) {
      setNotice("Compare up to three creators at a time.");
      return;
    }
    setComparedIds((current) => toggleItem(current, id));
    setNotice("");
  }

  const results = useMemo(
    () => filterCreators(creators, filters, sort, savedIds),
    [creators, filters, sort, savedIds],
  );

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const visible = results.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const selected = creators.filter((creator) =>
    comparedIds.includes(creator.id),
  );

  const contact = creators.find((creator) => creator.id === contactId);

  // Safely filter out Prisma 'null' values before building the unique sets
  const cities = [
    ...new Set(creators.map((c) => c.city).filter(Boolean) as string[]),
  ].sort();
  const niches = [
    ...new Set(creators.map((c) => c.niche).filter(Boolean) as string[]),
  ].sort();

  const error = filterError(filters);

  return (
    <div className="pb-48">
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <Button
          aria-expanded={showFilters}
          aria-controls="creator-filter-panel"
          onClick={() => setShowFilters((open) => !open)}
          className="cursor-pointer"
        >
          {showFilters ? "Hide filters" : "Show filters"}
        </Button>
        <span className="text-sm text-[#6b6558]">{savedIds.length} saved</span>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div
          id="creator-filter-panel"
          className={showFilters ? "block" : "hidden lg:block"}
        >
          <FilterSidebar
            filters={filters}
            cities={cities}
            niches={niches}
            onChange={changeFilters}
            onReset={reset}
          />
        </div>

        <section className="min-w-0 space-y-5" aria-label="Creator results">
          <ResultsToolbar
            query={filters.query}
            sort={sort}
            view={view}
            count={results.length}
            onQuery={(query) => changeFilters({ query })}
            onSort={(next) => {
              setSort(next);
              setPage(1);
            }}
            onView={setView}
          />

          <ActiveFilters
            chips={activeChips(filters)}
            onRemove={changeFilters}
            onReset={reset}
          />

          {error && (
            <p
              role="alert"
              className="rounded-xl bg-[#fbeae5] p-3 text-sm text-[#7a2a19]"
            >
              {error}
            </p>
          )}

          <p role="status" className="text-sm text-[#6b6558]">
            {notice ||
              (selected.length === 3
                ? "Comparison limit reached. Remove a selection to choose another creator."
                : "")}
          </p>

          <CreatorResults
            creators={visible}
            view={view}
            savedIds={savedIds}
            comparedIds={comparedIds}
            onSave={save}
            onCompare={compare}
            onContact={setContactId}
            onReset={reset}
          />

          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPage={setPage}
          />
        </section>
      </div>

      <CompareBar
        creators={selected}
        onRemove={compare}
        onClear={() => setComparedIds([])}
        onCompare={() => setShowCompare(true)}
      />

      {showCompare && (
        <CompareDialog
          creators={selected}
          onClose={() => setShowCompare(false)}
        />
      )}

      {contact && (
        <ContactDialog
          key={contact.id}
          creator={contact}
          onClose={() => setContactId(null)}
        />
      )}
    </div>
  );
}
