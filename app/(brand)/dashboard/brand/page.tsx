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

export default function CreatorDashboardPage() {
  return (
    <>
      <DashboardHeader />

      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
        <DashboardHero
          brandName="Acme"
          activeCampaigns={4}
          unreadMessages={12}
        />

        <StatsGrid
          monthlySpend="₹82,500"
          budgetUsed={64}
          activeCampaigns={8}
          stats={stats}
        />

        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <CampaignsCard campaigns={campaigns} />
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
