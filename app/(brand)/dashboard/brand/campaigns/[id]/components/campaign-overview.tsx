import { compact, money, panel, type Campaign } from "../../data/campaign-data";

export default function CampaignOverview({ campaigns }: { campaigns: Campaign[] }) {
  const budget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const spent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const reach = campaigns.reduce((sum, c) => sum + c.reach, 0);
  const rates = campaigns.flatMap((c) => c.engagement === null ? [] : [c.engagement]);
  const average = rates.length ? `${(rates.reduce((a, b) => a + b, 0) / rates.length).toFixed(1)}%` : "—";
  const metrics = [
    { label: "Total budget", value: money(budget), note: `${money(spent)} spent` },
    { label: "Live campaigns", value: campaigns.filter((c) => c.status === "live").length, note: `${campaigns.length} campaigns in this overview` },
    { label: "Total reach", value: compact(reach), note: "Reported campaign reach" },
    { label: "Avg. engagement", value: average, note: "Unweighted campaign average" },
  ];
  return (
    <section aria-label="Campaign overview" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => <article key={metric.label} className={panel}>
        <p className="text-sm text-[#746d63]">{metric.label}</p>
        <p className="mt-4 font-mono text-2xl font-semibold">{metric.value}</p>
        <p className="mt-2 text-xs text-[#746d63]">{metric.note}</p>
      </article>)}
    </section>
  );
}