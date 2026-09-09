import Link from "next/link";
import {
  CAMPAIGNS_PATH,
  money,
  statuses,
  statusLabels,
  type Campaign,
} from "../data/campaign-data";
import CampaignStatusBadge from "./campaign-status-badge";

export default function CampaignTable({
  campaigns,
}: {
  campaigns: Campaign[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#e5ddcf] bg-white">
      <table className="w-full min-w-[780px] text-left text-sm">
        <caption className="sr-only">
          Campaigns matching the current filters
        </caption>
        <thead className="bg-[#f8f4ea] text-[#746d63]">
          <tr>
            {[
              "Campaign",
              "Status",
              "Creators",
              "Budget",
              "Progress",
              "Deadline",
            ].map((label) => (
              <th scope="col" key={label} className="px-5 py-4 font-medium">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr
              key={campaign.id}
              className="border-t border-[#eee7dc] hover:bg-[#fcfaf6]"
            >
              <th scope="row" className="px-5 py-4 font-semibold">
                <Link
                  href={`${CAMPAIGNS_PATH}/${campaign.id}`}
                  className="hover:underline"
                >
                  {campaign.title}
                </Link>
                <p className="mt-1 text-xs font-normal text-[#746d63]">
                  {campaign.platforms.join(" · ")}
                </p>
              </th>
              <td className="px-5 py-4">
                <CampaignStatusBadge status={campaign.status} />
              </td>
              <td className="px-5 py-4">{campaign.creators.length}</td>
              <td className="px-5 py-4 font-mono">{money(campaign.budget)}</td>
              <td className="px-5 py-4">{campaign.progress}%</td>
              <td className="px-5 py-4">{campaign.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CampaignBoard({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <div className="overflow-x-auto pb-3">
      <div className="grid min-w-[1100px] grid-cols-5 gap-3">
        {statuses.map((status) => {
          const items = campaigns.filter(
            (campaign) => campaign.status === status,
          );
          return (
            <section key={status} className="rounded-2xl bg-[#ece6db] p-3">
              <h2 className="mb-3 flex justify-between text-sm font-semibold">
                {statusLabels[status]}
                <span>{items.length}</span>
              </h2>
              <div className="space-y-3">
                {items.map((campaign) => (
                  <Link
                    key={campaign.id}
                    href={`${CAMPAIGNS_PATH}/${campaign.id}`}
                    className="block rounded-xl border border-[#e5ddcf] bg-white p-4 hover:border-[#bfa989]"
                  >
                    <h3 className="font-semibold">{campaign.title}</h3>
                    <p className="mt-2 text-sm text-[#746d63]">
                      {campaign.creators.length} creators
                    </p>
                    <progress
                      aria-label="Campaign completion"
                      value={campaign.progress}
                      max={100}
                      className="mt-3 h-2 w-full accent-[#23796e]"
                    />
                    <p className="mt-2 text-xs">
                      {money(campaign.spent)} spent · {campaign.progress}%
                      complete
                    </p>
                  </Link>
                ))}
                {!items.length && (
                  <p className="py-8 text-center text-sm text-[#746d63]">
                    No campaigns
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
