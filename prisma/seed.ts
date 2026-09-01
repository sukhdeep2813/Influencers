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
}

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
