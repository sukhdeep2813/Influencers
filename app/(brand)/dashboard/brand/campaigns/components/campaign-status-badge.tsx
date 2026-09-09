import { statusLabels, type CampaignStatus } from "../data/campaign-data";

const colors: Record<CampaignStatus, string> = {
  live: "bg-[#dcf3ed] text-[#17685d]",
  review: "bg-[#fff0d8] text-[#91530d]",
  draft: "bg-[#eeebe4] text-[#655f56]",
  paused: "bg-[#f9e7e2] text-[#91402f]",
  completed: "bg-[#e4ecfa] text-[#31598e]",
};

export default function CampaignStatusBadge({ status }: { status: CampaignStatus }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${colors[status]}`}>{statusLabels[status]}</span>;
}