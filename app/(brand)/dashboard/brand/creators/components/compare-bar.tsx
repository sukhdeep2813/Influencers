import type { Creator } from "../types/creators";
import { Button } from "./results-toolbar";

export default function CompareBar({
  creators,
  onRemove,
  onClear,
  onCompare,
}: {
  creators: Creator[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onCompare: () => void;
}) {
  if (!creators.length) return null;
  return (
    <div className="fixed inset-x-3 bottom-3 z-30 mx-auto max-w-5xl rounded-2xl bg-[#15141f] p-4 text-white shadow-xl sm:inset-x-6 sm:bottom-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm" aria-live="polite">
            <strong className="text-[#f2a648]">{creators.length} of 3</strong>{" "}
            creators selected
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {creators.map((creator) => (
              <button
                key={creator.id}
                type="button"
                aria-label={`Remove ${creator.name} from comparison`}
                onClick={() => onRemove(creator.id)}
                className="rounded-full bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
              >
                {creator.name} ×
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={onClear}>Clear</Button>
          <Button
            tone="primary"
            disabled={creators.length < 2}
            onClick={onCompare}
          >
            Compare now →
          </Button>
        </div>
      </div>
    </div>
  );
}
