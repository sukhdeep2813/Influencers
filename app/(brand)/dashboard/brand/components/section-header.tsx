import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type SectionHeaderProps = {
  title: string;
  action: string;
  href?: string;
};

export function SectionHeader({
  title,
  action,
  href = "#",
}: SectionHeaderProps) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      {/* Title */}
      <div className="min-w-0">
        <h2 className="truncate text-sm font-bold tracking-[-0.02em] text-slate-950 sm:text-[15px]">
          {title}
        </h2>
      </div>

      {/* Action */}
      <Link
        href={href}
        className="
          group inline-flex shrink-0 items-center gap-1.5
          rounded-lg px-2 py-1.5
          text-[10px] font-semibold
          text-slate-500
          transition-all duration-200
          hover:bg-orange-50
          hover:text-orange-600
          sm:text-[11px]
        "
      >
        <span>{action}</span>

        <ArrowUpRight
          className="
            h-3.5 w-3.5
            transition-transform duration-200
            group-hover:-translate-y-0.5
            group-hover:translate-x-0.5
          "
        />
      </Link>
    </div>
  );
}
