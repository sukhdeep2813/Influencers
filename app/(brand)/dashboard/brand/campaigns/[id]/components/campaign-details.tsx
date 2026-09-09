import { money, panel, type Campaign } from "../../data/campaign-data";
import CampaignStatusBadge from "../../components/campaign-status-badge";

export default function CampaignDetails({ campaign }: { campaign: Campaign }) {
  return (
    <section className={panel}>
      <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{campaign.title}</h1><CampaignStatusBadge status={campaign.status} /></div>
      <p className="mt-3 max-w-3xl whitespace-pre-wrap leading-relaxed text-[#746d63]">{campaign.description}</p>
      <dl className="mt-6 grid gap-5 border-t border-[#eee7dc] pt-5 sm:grid-cols-2 lg:grid-cols-4">
        {[["Platforms", campaign.platforms.join(", ")], ["Allocated budget", money(campaign.budget)], ["Deadline", campaign.deadline], ["Last updated", campaign.updatedAt]].map(([label, value]) => <div key={label}><dt className="text-sm text-[#746d63]">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div>)}
      </dl>
      <div className="mt-5"><label className="flex justify-between text-sm">Campaign completion<span>{campaign.progress}%</span><progress aria-label="Campaign completion" value={campaign.progress} max={100} className="sr-only" /></label><div className="mt-2 h-2 overflow-hidden rounded-full bg-[#efe9df]" aria-hidden="true"><div className="h-full rounded-full bg-[#23796e]" style={{ width: `${Math.min(100, Math.max(0, campaign.progress))}%` }} /></div></div>
    </section>
  );
}