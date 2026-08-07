"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function completeSignup(
  role: "BRAND" | "CREATOR",
  formName: string,
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { error: "Unauthorized access." };
    }

    const userId = session.user.id;

    await prisma.$transaction(async (tx) => {
      // 1. Update the User role
      await tx.user.update({
        where: { id: userId },
        data: { role },
      });

      // 2. Create the profile with only the required name
      if (role === "BRAND") {
        await tx.brandProfile.create({
          data: {
            userId,
            companyName: formName,
          },
        });
      } else {
        await tx.creatorProfile.create({
          data: {
            userId,
            name: formName,
          },
        });
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Signup completion failed:", error);
    return { error: "Failed to create profile. Please try again." };
  }
}
