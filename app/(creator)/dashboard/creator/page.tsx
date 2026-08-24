import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma"; // Adjust this path if your prisma client is located elsewhere

import DashboardHeader from "@/app/(creator)/dashboard/creator/components/dashboard-header";
import DashboardHero from "@/app/(creator)/dashboard/creator/components/dashboard-hero";
import StatsGrid from "@/app/(creator)/dashboard/creator/components/stats-grid";
import AttentionCard from "@/app/(creator)/dashboard/creator/components/attention-card";
import EarningsCard from "@/app/(creator)/dashboard/creator/components/earnings-card";
import CampaignsCard from "@/app/(creator)/dashboard/creator/components/campaigns-card";
import AudienceCard from "@/app/(creator)/dashboard/creator/components/audience-card";
import AvailabilityCard from "@/app/(creator)/dashboard/creator/components/availability-card";
import PortfolioCard from "@/app/(creator)/dashboard/creator/components/portfolio-card";
import ReviewsCard from "@/app/(creator)/dashboard/creator/components/reviews-card";

export default async function CreatorDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "CREATOR") {
    redirect("/login");
  }

  // Fetch creator profile along with their latest 4 portfolio items
  const creatorProfile = await prisma.creatorProfile.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      portfolioItems: {
        orderBy: {
          createdAt: "desc",
        },
        take: 4,
      },
    },
  });

  // Extract items safely (defaults to empty array if no profile or items exist yet)
  const portfolioData = creatorProfile?.portfolioItems ?? [];
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <DashboardHero />

        <div className="mt-6 space-y-6">
          <StatsGrid />

          <section className="grid gap-6 lg:grid-cols-2">
            <AttentionCard />
            <EarningsCard />
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <CampaignsCard />
            <AudienceCard />
          </section>

          <section className="grid gap-6">
            <AvailabilityCard />
          </section>

          <section className="grid gap-6">
            <PortfolioCard items={portfolioData} />
            <ReviewsCard />
          </section>
        </div>
      </main>
    </div>
  );
}
