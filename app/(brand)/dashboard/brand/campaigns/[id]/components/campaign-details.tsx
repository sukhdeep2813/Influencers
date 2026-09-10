import { Prisma } from "../../../../../../../generated/prisma";
import { money, panel } from "../../components/campaign-utils";
import CampaignStatusBadge from "../../components/campaign-status-badge";

// Define the expected Prisma shape
type CampaignWithData = Prisma.CampaignGetPayload<{}> & {
  platforms?: string[];
  progress?: number;
  spent?: number;
};

export default function CampaignDetails({
  campaign,
}: {
  campaign: CampaignWithData;
}) {
  // Safely format Prisma DateTime objects
  const deadlineString = campaign.deadline
    ? new Date(campaign.deadline).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "No deadline set";

  const updatedString = campaign.updatedAt
    ? new Date(campaign.updatedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Recently";

  // Safe fallbacks for missing mock properties
  const progress = campaign.progress || 0;
  const platformsList = campaign.platforms
    ? campaign.platforms.join(", ")
    : campaign.deliverables || "None specified";

  return (
    <section className={panel}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {campaign.title}
        </h1>
        <CampaignStatusBadge status={campaign.status} />
      </div>
      <p className="mt-3 max-w-3xl whitespace-pre-wrap leading-relaxed text-[#746d63]">
        {campaign.description}
      </p>
      <dl className="mt-6 grid gap-5 border-t border-[#eee7dc] pt-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Platforms", platformsList],
          ["Allocated budget", money(campaign.budget)],
          ["Deadline", deadlineString],
          ["Last updated", updatedString],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-sm text-[#746d63]">{label}</dt>
            <dd className="mt-1 font-medium">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5">
        <label className="flex justify-between text-sm">
          Campaign completion<span>{progress}%</span>
          <progress
            aria-label="Campaign completion"
            value={progress}
            max={100}
            className="sr-only"
          />
        </label>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-[#efe9df]"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-[#23796e]"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      </div>
    </section>
  );
}
