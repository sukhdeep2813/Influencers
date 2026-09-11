import type { Creator } from "../types/creators";
import { compact, money } from "../lib/filter-creators";
import { Dialog } from "./contact-dialog";

export default function CompareDialog({
  creators,
  onClose,
}: {
  creators: Creator[];
  onClose: () => void;
}) {
  const rows: [string, (creator: Creator) => string][] = [
    ["Location", (c) => c.city],
    ["Niche", (c) => c.niche],
    ["Platforms", (c) => c.platforms.join(", ")],
    ["Followers", (c) => compact(c.followers)],
    ["Engagement", (c) => `${c.engagement}%`],
    ["Per post", (c) => money(c.price)],
    ["Avg. views", (c) => compact(c.avgViews)],
    ["Audience", (c) => c.audience],
    ["Audience ages", (c) => c.ageGroups.join(", ")],
    ["Creator type", (c) => c.creatorTypes.join(", ")],
    ["Verified", (c) => (c.verified ? "Yes" : "No")],
    ["Available", (c) => (c.available ? "Yes" : "No")],
    [
      "Brand reviews",
      (c) =>
        c.reviewCount
          ? `${c.rating ?? "—"}/5 · ${c.reviewCount} reviews`
          : "No reviews",
    ],
  ];
  return (
    <Dialog title="Compare creators" onClose={onClose}>
      <div className="overflow-x-auto rounded-xl border border-[#e2dbc8] bg-white">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">Comparison of selected creators</caption>
          <thead className="bg-[#f3efe4]">
            <tr>
              <th scope="col" className="p-3">
                Metric
              </th>
              {creators.map((creator) => (
                <th scope="col" key={creator.id} className="p-3">
                  {creator.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label} className="border-t border-[#e2dbc8]">
                <th scope="row" className="p-3 font-medium text-[#6b6558]">
                  {label}
                </th>
                {creators.map((creator) => (
                  <td key={creator.id} className="p-3">
                    {value(creator)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dialog>
  );
}
