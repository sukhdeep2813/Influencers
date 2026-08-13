import DashboardHeader from "@/app/(creator)/dashboard/creator/components/dashboard-header";
import DashboardHero from "@/app/(creator)/dashboard/creator/components/dashboard-hero";
import StatsGrid from "@/app/(creator)/dashboard/creator/components/stats-grid";
// import AttentionCard from "@/app/(creator)/dashboard/creator/components/attention-card";
// import EarningsCard from "@/app/(creator)/dashboard/creator/components/earnings-card";
// import CampaignsCard from "@/app/(creator)/dashboard/creator/components/campaigns-card";
// import AudienceCard from "@/app/(creator)/dashboard/creator/components/audience-card";
// import AvailabilityCard from "@/app/(creator)/dashboard/creator/components/availability-card";
// import PortfolioCard from "@/app/(creator)/dashboard/creator/components/PortfolioCard";
// import ReviewsCard from "@/app/(creator)/dashboard/creator/components/ReviewsCard";

export default function CreatorDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <DashboardHero />

        <div className="mt-6 space-y-6">
          <StatsGrid />

          {/* // <section className="grid gap-6 lg:grid-cols-2">
          //   <AttentionCard />
          //   <EarningsCard />
          // </section>

          // <section className="grid gap-6 lg:grid-cols-3">
          //   <CampaignsCard />
          //   <AudienceCard />
          //   <AvailabilityCard />
          // </section>

          // <section className="grid gap-6 lg:grid-cols-2">
          //   <PortfolioCard />
          //   <ReviewsCard />
          // </section> */}
        </div> 
      </main>
    </div>
  );
}
