import type { CreatorFilters, FilterChip } from "../types/creators";

export default function ActiveFilters({
  chips,
  onRemove,
  onReset,
}: {
  chips: FilterChip[];
  onRemove: (patch: Partial<CreatorFilters>) => void;
  onReset: () => void;
}) {
  if (!chips.length) return null;
  return (
    <div
      className="flex flex-wrap items-center gap-2"
      aria-label="Active filters"
    >
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={() => onRemove(chip.patch)}
          aria-label={`Remove ${chip.label} filter`}
          className="cursor-pointer rounded-full bg-[#e7f4f1] px-3 py-2 text-sm font-medium text-[#0e463e] hover:bg-[#d5ece6]"
        >
          {chip.label} <span aria-hidden="true">×</span>
        </button>
      ))}
      <button
        type="button"
        onClick={onReset}
        className="cursor-pointer px-2 py-1 text-sm text-[#7a2a19] underline"
      >
        Clear all
      </button>
    </div>
  );
}
