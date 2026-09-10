import Link from "next/link";
import { Prisma } from "../../../../../../generated/prisma";
import {
  CAMPAIGNS_PATH,
  button,
  compact,
  money,
  panel,
} from "./campaign-utils"; // Updated import path
import CampaignStatusBadge from "./campaign-status-badge";
import CampaignCreators from "../[id]/components/campaign-creators";

// Define the Prisma payload matching your page.tsx fetch
type CampaignWithData = Prisma.CampaignGetPayload<{
  include: {
    creators: {
      include: {
        creator: {
          include: { user: true };
        };
      };
    };
  };
}> & {
  // Temporary fallbacks for UI fields not yet in your DB schema
  spent?: number;
  reach?: number;
  engagement?: number | null;
  progress?: number;
  icon?: string;
  platforms?: string[];
};

export default function CampaignCard({
  campaign,
}: {
  campaign: CampaignWithData;
}) {
  // Safely fallback undefined values to 0
  const spent = campaign.spent || 0;
  const budget = campaign.budget || 0;
  const reach = campaign.reach || 0;
  const progress = campaign.progress || 0;

  const used = budget > 0 ? Math.min(100, (spent / budget) * 100) : 0;

  // Safely format Prisma's DateTime object
  const deadlineString = campaign.deadline
    ? new Date(campaign.deadline).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "No deadline set";

  return (
    <article className={`${panel} transition hover:border-[#cbbba3]`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <span
            className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#f5eee2] text-xl text-[#805c2e]"
            aria-hidden="true"
          >
            {campaign.icon || "✦"}
          </span>
          <div>
            <h2 className="text-lg font-semibold">
              <Link href={`${CAMPAIGNS_PATH}/${campaign.id}`}>
                {campaign.title}
              </Link>
            </h2>
            <p className="mt-1 line-clamp-1 text-sm text-[#746d63]">
              {campaign.description}
            </p>
            <p className="mt-2 text-xs text-[#746d63]">
              {campaign.platforms
                ? campaign.platforms.join(" · ")
                : campaign.deliverables || "Content Deliverables"}
            </p>
          </div>
        </div>
        <CampaignStatusBadge status={campaign.status} />
      </div>
      <dl className="my-4 grid grid-cols-2 gap-4 border-y border-[#eee7dc] py-4 sm:grid-cols-4">
        {[
          ["Creators", campaign.creators.length],
          ["Reach", compact(reach)],
          [
            "Engagement",
            campaign.engagement == null ? "—" : `${campaign.engagement}%`,
          ],
          ["Complete", `${progress}%`],
        ].map(([label, value]) => (
          <div key={label as string}>
            <dt className="text-xs text-[#746d63]">{label}</dt>
            <dd className="mt-1 font-mono font-semibold">
              {value as React.ReactNode}
            </dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>Budget used</span>
        <span className="font-mono">
          {money(spent)} / {money(budget)}
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
          {campaign.status === "COMPLETED" ? "Ended" : "Deadline"}:{" "}
          {deadlineString}
        </p>
        <Link className={button} href={`${CAMPAIGNS_PATH}/${campaign.id}`}>
          View details ↗
        </Link>
      </div>

      {/* Conditionally render the details toggle only if creators exist */}
      {campaign.creators.length > 0 && (
        <details className="mt-4 border-t border-[#eee7dc] pt-3">
          <summary className="cursor-pointer text-sm font-semibold text-[#315f9f]">
            View {campaign.creators.length} creator
            {campaign.creators.length !== 1 ? "s" : ""}
          </summary>
          <div className="mt-3">
            <CampaignCreators creators={campaign.creators} />
          </div>
        </details>
      )}
    </article>
  );
}
