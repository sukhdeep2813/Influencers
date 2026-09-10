import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import DashboardHeader from "@/app/(brand)/dashboard/brand/components/dashboard-header";
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
  // 1. Authenticate the user
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "BRAND") {
    redirect("/login");
  }

  // 2. Fetch the specific Brand Profile
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

  const { id } = await params;

  // 3. Fetch the real campaign from the database
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      creators: {
        include: {
          creator: {
            include: { user: true },
          },
        },
      },
    },
  });

  // 4. 404 if the campaign doesn't exist OR doesn't belong to this brand
  if (!campaign || campaign.brandId !== brandProfile.id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f3efe6] text-[#1c1a20]">
      <DashboardHeader />
      <main className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        <CampaignActions campaign={campaign} />
        <CampaignDetails campaign={campaign} />
        <CampaignOverview campaigns={[campaign]} />

        <section className="grid items-start gap-6 xl:grid-cols-2">
          {/* Both components read from the junction table relation */}
          <CampaignCreators creators={campaign.creators} />
          <CampaignApplications applications={campaign.creators} />
        </section>
      </main>
    </div>
  );
}
