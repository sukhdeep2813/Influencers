import { ChevronRight } from "lucide-react";

export function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <h2 className="text-base font-semibold tracking-tight text-slate-950 md:text-lg">{title}</h2>
      {action ? (
        <button className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-slate-950">
          {action}
          <ChevronRight className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
