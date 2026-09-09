import { notFound } from "next/navigation";
import DashboardHeader from "@/app/(brand)/dashboard/brand/components/dashboard-header";
import { applications, campaigns } from "../data/campaign-data";
import CampaignOverview from "@/app/(brand)/dashboard/brand/campaigns/[id]/components/campaign-overview";
import CampaignDetails from "./components/campaign-details";
import CampaignCreators from "./components/campaign-creators";
import CampaignApplications from "./components/campaign-applications";
import CampaignActions from "./components/campaign-actions";

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const campaign = campaigns.find((item) => String(item.id) === id);
  if (!campaign) notFound();

  return (
    <div className="min-h-screen bg-[#f3efe6] text-[#1c1a20]">
      <DashboardHeader />
      <main className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        <CampaignActions campaign={campaign} />
        <CampaignDetails campaign={campaign} />
        <CampaignOverview campaigns={[campaign]} />
        <section className="grid items-start gap-6 xl:grid-cols-2">
          <CampaignCreators creators={campaign.creators} />
          <CampaignApplications
            applications={applications[campaign.id] ?? []}
          />
        </section>
      </main>
    </div>
  );
}
