import { CampaignStatus } from "../../../../../../generated/prisma"; // Updated import path
import { statusLabels } from "./campaign-utils"; // Updated import path

const colors: Record<CampaignStatus, string> = {
  LIVE: "bg-[#dcf3ed] text-[#17685d]",
  IN_REVIEW: "bg-[#fff0d8] text-[#91530d]",
  DRAFT: "bg-[#eeebe4] text-[#655f56]",
  CANCELLED: "bg-[#f9e7e2] text-[#91402f]", // Swapped 'paused' for 'CANCELLED'
  COMPLETED: "bg-[#e4ecfa] text-[#31598e]",
};

export default function CampaignStatusBadge({
  status,
}: {
  status: CampaignStatus;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${colors[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
