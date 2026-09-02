import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import DashboardHeader from "@/app/(brand)/dashboard/brand/components/dashboard-header";
import DashboardHero from "@/app/(brand)/dashboard/brand/components/dashboard-hero";

import StatsGrid from "@/app/(brand)/dashboard/brand/components/stats-grid";
import { stats } from "@/app/(brand)/dashboard/brand/data/dashboard-data";

import CampaignsCard from "@/app/(brand)/dashboard/brand/components/campaigns-card";
import { campaigns } from "@/app/(brand)/dashboard/brand/data/campaign-data";

import { RecommendedCreatorsCard } from "@/app/(brand)/dashboard/brand/components/recommended-creators-card";
import { recommendedCreators } from "@/app/(brand)/dashboard/brand/data/recommended-creator-data";

import { SpendOverviewCard } from "@/app/(brand)/dashboard/brand/components/spend-overview-card";
import { spendHistory } from "@/app/(brand)/dashboard/brand/data/spend-overview-data";

import { MessagesCard } from "@/app/(brand)/dashboard/brand/components/messages-card";
import { messages } from "@/app/(brand)/dashboard/brand/data/message-card-data";

import { SavedCreatorsCard } from "@/app/(brand)/dashboard/brand/components/saved-creators-card";
import { savedCreators } from "@/app/(brand)/dashboard/brand/data/saved-creator-data";
import { prisma } from "@/lib/prisma";

export default async function CreatorDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "BRAND") {
    redirect("/login");
  }

  const brandProfile = await prisma.brandProfile.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      campaigns: {
        // ADD THIS INCLUDE BLOCK
        include: {
          creators: {
            include: {
              creator: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 4,
      },
    },
  });
  const campaignsData = brandProfile?.campaigns ?? [];
  console.log("My Campaigns Count:", campaignsData.length);
  const brandName = brandProfile?.companyName ?? session.user.name ?? "Acme";
  const activeCampaignsCount = campaignsData.filter(
    (c) => c.status === "LIVE",
  ).length;

  return (
    <>
      <DashboardHeader />

      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
        <DashboardHero
          brandName={brandName}
          activeCampaigns={activeCampaignsCount}
          unreadMessages={12}
        />

        <StatsGrid
          monthlySpend="₹82,500"
          budgetUsed={64}
          activeCampaigns={8}
          stats={stats}
        />

        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <CampaignsCard campaigns={campaignsData} />
          <RecommendedCreatorsCard creators={recommendedCreators} />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <SpendOverviewCard
            monthlySpend="₹1,24,800"
            monthlyBudget="₹1,85,000"
            history={spendHistory}
          />
          <MessagesCard messages={messages} />
        </section>

        <section className="mt-6">
          <SavedCreatorsCard creators={savedCreators} />
        </section>
      </main>
    </>
  );
}
