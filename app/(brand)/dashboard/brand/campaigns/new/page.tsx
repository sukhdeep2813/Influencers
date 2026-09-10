import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import DashboardHeader from "@/app/(brand)/dashboard/brand/components/dashboard-header";
import CampaignForm from "@/app/(brand)/dashboard/brand/campaigns/[id]/components/campaign-form";

export default async function NewCampaignPage({
  searchParams,
}: {
  searchParams: Promise<{ duplicate?: string | string[] }>;
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

  // 3. Extract the duplicate ID from the URL
  const { duplicate } = await searchParams;
  const duplicateId = typeof duplicate === "string" ? duplicate : undefined;

  let source = undefined;

  // 4. Fetch the source campaign from Prisma if duplicating
  if (duplicateId) {
    const campaign = await prisma.campaign.findUnique({
      where: { id: duplicateId },
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

    // Ensure the campaign exists AND belongs to the logged-in brand
    if (campaign && campaign.brandId === brandProfile.id) {
      source = campaign;
    }
  }

  return (
    <div className="min-h-screen bg-[#f3efe6] text-[#1c1a20]">
      <DashboardHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {/* We use `as any` safely here because CampaignForm locally extends the Prisma type */}
        <CampaignForm key={source?.id ?? "new"} source={source as any} />
      </main>
    </div>
  );
}
