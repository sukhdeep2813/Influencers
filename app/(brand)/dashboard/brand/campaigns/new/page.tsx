import DashboardHeader from "@/app/(brand)/dashboard/brand/components/dashboard-header";
import { campaigns } from "../data/campaign-data";
import CampaignForm from "@/app/(brand)/dashboard/brand/campaigns/[id]/components/campaign-form";

export default async function NewCampaignPage({
  searchParams,
}: {
  searchParams: Promise<{ duplicate?: string | string[] }>;
}) {
  const { duplicate } = await searchParams;
  const source =
    typeof duplicate === "string"
      ? campaigns.find((c) => String(c.id) === duplicate)
      : undefined;
  return (
    <div className="min-h-screen bg-[#f3efe6] text-[#1c1a20]">
      <DashboardHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <CampaignForm key={source?.id ?? "new"} source={source} />
      </main>
    </div>
  );
}
