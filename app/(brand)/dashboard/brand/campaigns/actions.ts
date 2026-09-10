"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCampaignAction(data: {
  title: string;
  description: string;
  budget: number;
  deadline: string;
  platforms: string[];
}) {
  // 1. Authenticate the session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "BRAND") {
    throw new Error("Unauthorized access");
  }

  // 2. Fetch the Brand Profile ID
  const brandProfile = await prisma.brandProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!brandProfile) {
    throw new Error("Brand profile not found");
  }

  // 3. Insert into the database
  const newCampaign = await prisma.campaign.create({
    data: {
      title: data.title,
      description: data.description,
      budget: data.budget,
      deadline: new Date(data.deadline),
      status: "DRAFT",
      deliverables: data.platforms.join(", "), // Storing platforms as a comma-separated string
      brandId: brandProfile.id,
    },
  });

  // 4. Clear the cache and navigate to the new campaign
  revalidatePath("/dashboard/brand/campaigns");
  redirect(`/dashboard/brand/campaigns/${newCampaign.id}`);
}
