import { Prisma } from "../../../../../../generated/prisma";

// ------------------------------------------------------
// 1. STATIC UI ENUMS
// ------------------------------------------------------
export type Platform = "Instagram" | "YouTube" | "TikTok";
export type Audience = "Male" | "Female" | "Mixed";
export type AgeGroup = "13–17" | "18–24" | "25–34" | "35+";
export type CreatorType =
  | "UGC creator"
  | "Product photographer"
  | "Event creator"
  | "Family creator"
  | "Luxury creator";

export type SortKey = "match" | "engagement" | "followers" | "price-low";
export type ViewMode = "grid" | "list";

// ------------------------------------------------------
// 2. PRISMA PAYLOAD GENERATION
// ------------------------------------------------------
// We tell Prisma to include the reviews and availability so we can calculate
// dynamic stats (like rating, reviewCount, and available status) later.
export type CreatorProfileWithRelations = Prisma.CreatorProfileGetPayload<{
  include: {
    reviews: true;
    availability: true;
    user: true;
  };
}>;

// ------------------------------------------------------
// 3. THE HYBRID CREATOR TYPE
// ------------------------------------------------------
// This combines your real database schema with the mock fields your UI needs.
// As you add these missing fields to your Prisma schema in the future,
// you can just delete them from this list!
export type Creator = CreatorProfileWithRelations & {
  platforms: Platform[];
  creatorTypes: CreatorType[];
  price: number;
  engagement: number;
  audience: Audience;
  ageGroups: AgeGroup[];
  matchScore: number;
};

// ------------------------------------------------------
// 4. FILTER STATE TYPES (Unchanged)
// ------------------------------------------------------
export interface CreatorFilters {
  query: string;
  city: string;
  niche: string;
  platforms: Platform[];
  minFollowers: string;
  maxFollowers: string;
  minEngagement: number;
  minBudget: string;
  maxBudget: string;
  audience: Audience | "all";
  ageGroups: AgeGroup[];
  minViews: number;
  creatorTypes: CreatorType[];
  verifiedOnly: boolean;
  availableOnly: boolean;
  hasReviews: boolean;
  savedOnly: boolean;
}

export type FilterChip = {
  id: string;
  label: string;
  patch: Partial<CreatorFilters>;
};
