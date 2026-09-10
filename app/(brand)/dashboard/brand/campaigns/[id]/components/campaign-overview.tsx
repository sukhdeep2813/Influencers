import { Prisma } from "../../../../../../../generated/prisma";
import { money, compact, panel } from "../../components/campaign-utils";

// Define the expected Prisma shape based on your page.tsx query
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
  // Temporary fallbacks in case these aren't in  Prisma schema yet
  spent?: number;
  reach?: number;
  engagement?: number | null;
};

export default function CampaignOverview({
  campaigns,
}: {
  campaigns: CampaignWithData[];
}) {
  const budget = campaigns.reduce((sum, c) => sum + c.budget, 0);

  // Using fallbacks (|| 0) for the fields that might not exist yet
  const spent = campaigns.reduce((sum, c) => sum + (c.spent || 0), 0);
  const reach = campaigns.reduce((sum, c) => sum + (c.reach || 0), 0);

  const rates = campaigns.flatMap((c) => (c.engagement ? [c.engagement] : []));
  const average = rates.length
    ? `${(rates.reduce((a, b) => a + b, 0) / rates.length).toFixed(1)}%`
    : "—";

  const metrics = [
    {
      label: "Total budget",
      value: money(budget),
      note: `${money(spent)} spent`,
    },
    // Updated "live" to match your exact Prisma Enum "LIVE"
    {
      label: "Live campaigns",
      value: campaigns.filter((c) => c.status === "LIVE").length,
      note: `${campaigns.length} campaigns in this overview`,
    },
    {
      label: "Total reach",
      value: compact(reach),
      note: "Reported campaign reach",
    },
    {
      label: "Avg. engagement",
      value: average,
      note: "Unweighted campaign average",
    },
  ];

  return (
    <section
      aria-label="Campaign overview"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {metrics.map((metric) => (
        <article key={metric.label} className={panel}>
          <p className="text-sm text-[#746d63]">{metric.label}</p>
          <p className="mt-4 font-mono text-2xl font-semibold">
            {metric.value}
          </p>
          <p className="mt-2 text-xs text-[#746d63]">{metric.note}</p>
        </article>
      ))}
    </section>
  );
}
