import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const creator = await prisma.creatorProfile.findFirst();

  if (!creator) {
    throw new Error(
      "No CreatorProfile found. Create a creator account/profile first.",
    );
  }

  await prisma.portfolioItem.createMany({
    data: [
      {
        creatorId: creator.id,
        title: "Summer Skincare Campaign",
        description:
          "Short-form beauty content created for a summer skincare campaign.",
        mediaUrl: "https://example.com/portfolio/summer-skincare",
        thumbnailUrl: "https://example.com/images/summer-skincare.jpg",
        views: 18400,
      },
      {
        creatorId: creator.id,
        title: "Morning Routine Reel",
        description:
          "Lifestyle reel focused on a natural morning skincare routine.",
        mediaUrl: "https://example.com/portfolio/morning-routine",
        thumbnailUrl: "https://example.com/images/morning-routine.jpg",
        views: 12600,
      },
      {
        creatorId: creator.id,
        title: "Product Photography",
        description:
          "Clean product-focused photography for a beauty product launch.",
        mediaUrl: "https://example.com/portfolio/product-photography",
        thumbnailUrl: "https://example.com/images/product-photography.jpg",
        views: 8700,
      },
      {
        creatorId: creator.id,
        title: "Festival Beauty Look",
        description:
          "Creative beauty content created around a festive makeup campaign.",
        mediaUrl: "https://example.com/portfolio/festival-look",
        thumbnailUrl: "https://example.com/images/festival-look.jpg",
        views: 21300,
      },
    ],
  });

  console.log("✅ Portfolio seed data created");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
