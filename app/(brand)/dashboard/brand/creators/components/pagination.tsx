import { Button } from "./results-toolbar";

export default function Pagination({
  page,
  totalPages,
  onPage,
}: {
  page: number;
  totalPages: number;
  onPage: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  // Keep the control compact even when the API returns hundreds of pages.
  const pages = [...new Set([1, page - 1, page, page + 1, totalPages])]
    .filter((value) => value >= 1 && value <= totalPages)
    .sort((a, b) => a - b);
  return (
    <nav
      aria-label="Creator results pages"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <Button disabled={page === 1} onClick={() => onPage(page - 1)}>
        Previous
      </Button>
      {pages.map((value, index) => (
        <span key={value} className="flex items-center gap-2">
          {index > 0 && value - pages[index - 1] > 1 && (
            <span aria-hidden="true">…</span>
          )}
          <Button
            aria-label={`Page ${value}`}
            aria-current={page === value ? "page" : undefined}
            tone={page === value ? "dark" : "neutral"}
            onClick={() => onPage(value)}
          >
            {value}
          </Button>
        </span>
      ))}
      <Button disabled={page === totalPages} onClick={() => onPage(page + 1)}>
        Next
      </Button>
    </nav>
  );
}
