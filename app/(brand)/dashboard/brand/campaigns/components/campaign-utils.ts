// /dashboard/brand/campaigns/components/campaign-utils.ts

import { CampaignStatus } from "../../../../../../generated/prisma";

// 1. UI Constants
export const CAMPAIGNS_PATH = "/dashboard/brand/campaigns";
export const platforms = ["Instagram", "YouTube", "TikTok"];

export const panel =
  "rounded-2xl border border-[#e5ddcf] bg-white p-5 shadow-sm";
export const control =
  "rounded-xl border border-[#ded6c8] bg-white px-3 py-2.5 text-sm text-[#342f2a] outline-none focus:ring-2 focus:ring-[#e99735]";
export const button =
  "inline-flex items-center justify-center rounded-xl border border-[#ded6c8] bg-white px-4 py-2.5 text-sm font-semibold text-[#342f2a] hover:bg-[#f5f1e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b67726]";

// 2. Prisma Enum Mapping
// Maps your uppercase Prisma database Enums to readable UI labels
export const statusLabels: Record<CampaignStatus, string> = {
  DRAFT: "Draft",
  IN_REVIEW: "In review", // Adjust key to match your exact Prisma Enum
  LIVE: "Live",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
};

// 3. Formatting Helpers
export const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const compact = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
