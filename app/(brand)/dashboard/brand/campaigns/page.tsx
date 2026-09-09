import DashboardHeader from "@/app/(brand)/dashboard/brand/components/dashboard-header";
import CampaignsHeader from "./components/campaigns-header";
import CampaignFilters from "./components/campaign-filters";
import CampaignOverview from "./[id]/components/campaign-overview";
import { campaigns } from "./data/campaign-data";

export default function BrandCampaignsPage() {
  return (
    <div className="min-h-screen bg-[#f3efe6] text-[#1c1a20]">
      <DashboardHeader />
      <main className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        <CampaignsHeader count={campaigns.length} />
        <CampaignOverview campaigns={campaigns} />
        <CampaignFilters campaigns={campaigns} />
      </main>
    </div>
  );
}
