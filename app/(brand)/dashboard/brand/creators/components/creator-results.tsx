import type { Creator, ViewMode } from "../types/creators";
import CreatorCard from "./creator-card";
import { Button } from "./results-toolbar";

type Props = {
  creators: Creator[];
  view: ViewMode;
  savedIds: string[];
  comparedIds: string[];
  onSave: (id: string) => void;
  onCompare: (id: string) => void;
  onContact: (id: string) => void;
  onReset: () => void;
};

export default function CreatorResults({
  creators,
  view,
  savedIds,
  comparedIds,
  onSave,
  onCompare,
  onContact,
  onReset,
}: Props) {
  if (!creators.length)
    return (
      <div className="rounded-2xl border border-dashed border-[#cbb99d] bg-white p-10 text-center">
        <h2 className="text-xl font-semibold">No matching creators</h2>
        <p className="my-3 text-sm text-[#6b6558]">
          Try a broader search or remove a filter.
        </p>
        <Button onClick={onReset}>Clear filters</Button>
      </div>
    );
  return (
    <div
      className={
        view === "grid"
          ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          : "space-y-4"
      }
    >
      {creators.map((creator) => (
        <CreatorCard
          key={creator.id}
          creator={creator}
          view={view}
          saved={savedIds.includes(creator.id)}
          compared={comparedIds.includes(creator.id)}
          compareDisabled={comparedIds.length >= 3}
          onSave={() => onSave(creator.id)}
          onCompare={() => onCompare(creator.id)}
          onContact={() => onContact(creator.id)}
        />
      ))}
    </div>
  );
}
