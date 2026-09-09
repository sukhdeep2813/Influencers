import Link from "next/link";
import {
  CAMPAIGNS_PATH,
  button,
  compact,
  money,
  panel,
  type Campaign,
} from "../data/campaign-data";
import CampaignStatusBadge from "./campaign-status-badge";
import CampaignCreators from "../[id]/components/campaign-creators";

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const used =
    campaign.budget > 0
      ? Math.min(100, (campaign.spent / campaign.budget) * 100)
      : 0;
  return (
    <article className={`${panel} transition hover:border-[#cbbba3]`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <span
            className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#f5eee2] text-xl text-[#805c2e]"
            aria-hidden="true"
          >
            {campaign.icon}
          </span>
          <div>
            <h2 className="text-lg font-semibold">
              <Link href={`${CAMPAIGNS_PATH}/${campaign.id}`}>
                {campaign.title}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-[#746d63]">
              {campaign.description}
            </p>
            <p className="mt-2 text-xs text-[#746d63]">
              {campaign.platforms.join(" · ")}
            </p>
          </div>
        </div>
        <CampaignStatusBadge status={campaign.status} />
      </div>
      <dl className="my-4 grid grid-cols-2 gap-4 border-y border-[#eee7dc] py-4 sm:grid-cols-4">
        {[
          ["Creators", campaign.creators.length],
          ["Reach", compact(campaign.reach)],
          [
            "Engagement",
            campaign.engagement === null ? "—" : `${campaign.engagement}%`,
          ],
          ["Complete", `${campaign.progress}%`],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs text-[#746d63]">{label}</dt>
            <dd className="mt-1 font-mono font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>Budget used</span>
        <span className="font-mono">
          {money(campaign.spent)} / {money(campaign.budget)}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label="Budget used"
        aria-valuenow={Math.round(used)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-2 h-2 overflow-hidden rounded-full bg-[#efe9df]"
      >
        <div
          className="h-full rounded-full bg-[#23796e]"
          style={{ width: `${used}%` }}
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#746d63]">
          {campaign.status === "completed" ? "Ended" : "Deadline"}:{" "}
          {campaign.deadline}
        </p>
        <Link className={button} href={`${CAMPAIGNS_PATH}/${campaign.id}`}>
          View details ↗
        </Link>
      </div>
      <details className="mt-4 border-t border-[#eee7dc] pt-3">
        <summary className="cursor-pointer text-sm font-semibold text-[#315f9f]">
          View {campaign.creators.length} creators
        </summary>
        <div className="mt-3">
          <CampaignCreators creators={campaign.creators} />
        </div>
      </details>
    </article>
  );
}
