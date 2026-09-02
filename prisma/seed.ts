import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, AvailabilityStatus } from "../generated/prisma";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Fetch existing creator
  const creator = await prisma.creatorProfile.findFirst();

  if (!creator) {
    throw new Error(
      "No CreatorProfile found. Please create or log into a creator account first.",
    );
  }

  // 2. Portfolio Check (Skips automatically if already seeded)
  const existingPortfolioCount = await prisma.portfolioItem.count({
    where: { creatorId: creator.id },
  });

  if (existingPortfolioCount === 0) {
    console.log("Seeding portfolio items...");
    // portfolio creation code here
  } else {
    console.log(
      `ℹ️ Portfolio items already exist (${existingPortfolioCount} found). Skipping.`,
    );
  }

  // 3. Availability Data to Seed
  const today = new Date();
  const availability = [
    {
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      status: AvailabilityStatus.AVAILABLE,
      slots: 3,
    },
    {
      date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
      ),
      status: AvailabilityStatus.AVAILABLE,
      slots: 2,
    },
    {
      date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 2,
      ),
      status: AvailabilityStatus.BUSY,
      slots: 0,
    },
    {
      date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 3,
      ),
      status: AvailabilityStatus.AVAILABLE,
      slots: 4,
    },
    {
      date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 4,
      ),
      status: AvailabilityStatus.BOOKED,
      slots: 0,
    },
    {
      date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 5,
      ),
      status: AvailabilityStatus.BOOKED,
      slots: 0,
    },
    {
      date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 6,
      ),
      status: AvailabilityStatus.AVAILABLE,
      slots: 2,
    },
  ];

  // 4. Insert availability records safely
  const result = await prisma.creatorAvailability.createMany({
    data: availability.map((item) => ({
      creatorId: creator.id,
      ...item,
    })),
    skipDuplicates: true,
  });

  console.log(
    `✅ Availability seed complete! Added ${result.count} new dates.`,
  );

  // -------------------------------------------------------------------
  // 5. NEW: SEED REVIEWS
  // -------------------------------------------------------------------
  let brand = await prisma.brandProfile.findFirst();

  if (!brand) {
    console.log("No BrandProfile found. Creating a default brand...");
    const dummyBrandUser = await prisma.user.create({
      data: {
        email: "contact@glowskincare.com",
        name: "Glow Skincare",
        role: "BRAND",
        brandProfile: {
          create: {
            companyName: "Glow Skincare",
            industry: "Beauty",
          },
        },
      },
      include: { brandProfile: true },
    });
    // Use the newly created brand profile
    brand = dummyBrandUser.brandProfile!;
  }

  const existingReviewsCount = await prisma.review.count({
    where: { creatorId: creator.id },
  });

  if (existingReviewsCount === 0) {
    console.log("Seeding reviews...");
    await prisma.review.createMany({
      data: [
        {
          creatorId: creator.id,
          brandId: brand.id,
          rating: 5,
          comment:
            "Absolutely incredible to work with! The content was perfectly aligned with our brand guidelines.",
        },
        {
          creatorId: creator.id,
          brandId: brand.id,
          rating: 4,
          comment:
            "Great communication throughout the campaign. The audience engagement was exactly what we were hoping for.",
        },
      ],
    });
    console.log("✅ Reviews seed complete!");
  } else {
    console.log(
      `ℹ️ Reviews already exist (${existingReviewsCount} found). Skipping.`,
    );
  }

  const existingCampaignsCount = await prisma.campaign.count({
    where: {
      brandId: brand.id,
    },
  });

  let campaigns = await prisma.campaign.findMany({
    where: {
      brandId: brand.id,
    },
  });

  if (existingCampaignsCount === 0) {
    console.log("Seeding campaigns...");

    await prisma.campaign.createMany({
      data: [
        {
          brandId: brand.id,
          title: "Summer Glow Campaign",
          description:
            "Promote our new summer skincare collection through authentic creator content.",
          deliverables:
            "2 Instagram Reels, 3 Instagram Stories, 1 product review",
          budget: 50000,
          deadline: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 14,
          ),
          status: "LIVE",
        },
        {
          brandId: brand.id,
          title: "Instagram Product Launch",
          description:
            "Launch our latest skincare product with engaging creator-led content.",
          deliverables:
            "1 Instagram Reel, 2 Instagram Stories, product photography",
          budget: 75000,
          deadline: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 21,
          ),
          status: "IN_REVIEW",
        },
        {
          brandId: brand.id,
          title: "Diwali Beauty Campaign",
          description:
            "A festive campaign focused on beauty, skincare and gifting.",
          deliverables:
            "3 Instagram Reels, 5 Instagram Stories, 1 YouTube Short",
          budget: 100000,
          deadline: new Date(
            today.getFullYear(),
            today.getMonth() + 2,
            today.getDate(),
          ),
          status: "DRAFT",
        },
        {
          brandId: brand.id,
          title: "Winter Skincare Campaign",
          description:
            "Seasonal skincare campaign highlighting hydration and winter care.",
          deliverables:
            "2 Instagram Reels, 2 Instagram Stories, 1 product demonstration",
          budget: 60000,
          deadline: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 10,
          ),
          status: "COMPLETED",
        },
      ],
    });

    console.log("✅ Campaigns seed complete!");

    // Fetch the newly created campaigns
    campaigns = await prisma.campaign.findMany({
      where: {
        brandId: brand.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  } else {
    console.log(
      `ℹ️ Campaigns already exist (${existingCampaignsCount} found). Skipping.`,
    );
  }

  // -------------------------------------------------------------------
  // 7. SEED CAMPAIGN CREATOR RELATIONSHIPS
  // -------------------------------------------------------------------

  const existingCampaignCreatorsCount = await prisma.campaignCreator.count({
    where: {
      creatorId: creator.id,
    },
  });

  if (existingCampaignCreatorsCount === 0) {
    console.log("Seeding campaign creators...");

    if (campaigns.length === 0) {
      throw new Error(
        "No campaigns found. Cannot create CampaignCreator records.",
      );
    }

    const campaignCreatorData = [];

    // Summer Glow Campaign → Accepted
    if (campaigns[0]) {
      campaignCreatorData.push({
        campaignId: campaigns[0].id,
        creatorId: creator.id,
        status: "ACCEPTED" as const,
        progress: 65,
      });
    }

    // Instagram Product Launch → Pending
    if (campaigns[1]) {
      campaignCreatorData.push({
        campaignId: campaigns[1].id,
        creatorId: creator.id,
        status: "PENDING" as const,
        progress: 0,
      });
    }

    // Diwali Beauty Campaign → Rejected
    if (campaigns[2]) {
      campaignCreatorData.push({
        campaignId: campaigns[2].id,
        creatorId: creator.id,
        status: "REJECTED" as const,
        progress: 0,
      });
    }

    // Winter Skincare Campaign → Completed
    if (campaigns[3]) {
      campaignCreatorData.push({
        campaignId: campaigns[3].id,
        creatorId: creator.id,
        status: "ACCEPTED" as const,
        progress: 100,
      });
    }

    await prisma.campaignCreator.createMany({
      data: campaignCreatorData,
      skipDuplicates: true,
    });

    console.log("✅ Campaign creator seed complete!");
  } else {
    console.log(
      `ℹ️ Campaign creator records already exist (${existingCampaignCreatorsCount} found). Skipping.`,
    );
  } // <--- Notice the closing brace is now here!
}
main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
