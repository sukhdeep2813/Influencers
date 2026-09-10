import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

import DashboardHeader from "@/app/(brand)/dashboard/brand/components/dashboard-header";
import CampaignsHeader from "./components/campaigns-header";
import CampaignFilters from "./components/campaign-filters";
import CampaignOverview from "./[id]/components/campaign-overview";
import { campaigns } from "./data/campaign-data";

export default async function BrandCampaignsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "BRAND") {
    redirect("/login");
  }

  const brandProfile = await prisma.brandProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!brandProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3efe6]">
        Please complete your brand profile first.
      </div>
    );
  }

  const campaigns = await prisma.campaign.findMany({
    where: { brandId: brandProfile.id },
    include: {
      creators: {
        include: {
          creator: {
            include: { user: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

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
