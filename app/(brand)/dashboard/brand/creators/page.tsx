import DashboardHeader from "@/app/(brand)/dashboard/brand/components/dashboard-header";
import CreatorDiscovery from "./components/creator-discovery";
import { prisma } from "@/lib/prisma";
import type { Creator } from "./types/creators";

export default async function FindCreatorsPage() {

  const dbProfiles = await prisma.creatorProfile.findMany({
    include: {
      user: true,
      reviews: true,
      availability: true,
    },
  });


  const mappedCreators: Creator[] = dbProfiles.map((profile) => ({
    ...profile,

    // Injecting temporary default values for fields not yet in your Prisma schema
    // Once you update schema.prisma, you can replace these hardcoded fallbacks
    platforms: ["Instagram"],
    creatorTypes: ["UGC creator"],
    price: 15000,
    engagement: 4.2,
    audience: "Female",
    ageGroups: ["18–24"],
    matchScore: 90,
  }));

  return (
    <div className="min-h-screen bg-[#f3efe4] text-[#1c1b1f]">
      <DashboardHeader />
      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <CreatorDiscovery creators={mappedCreators} />
      </main>
    </div>
  );
}
