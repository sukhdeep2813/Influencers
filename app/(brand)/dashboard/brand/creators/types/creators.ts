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

export interface Creator {
  id: string;
  name: string;
  handle: string;
  city: string;
  niche: string;
  platforms: Platform[];
  creatorTypes: CreatorType[];
  followers: number;
  engagement: number;
  price: number;
  avgViews: number;
  audience: Audience;
  ageGroups: AgeGroup[];
  verified: boolean;
  available: boolean;
  reviewCount: number;
  rating: number | null;
  matchScore: number;
  bio: string;
}

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
