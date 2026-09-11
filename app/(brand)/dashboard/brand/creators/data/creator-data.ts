import type { CreatorFilters } from "../types/creators";

// Keep these static arrays for your UI dropdowns and chips!
export const platforms = ["Instagram", "YouTube", "TikTok"] as const;
export const audiences = ["Male", "Female", "Mixed"] as const;
export const ageGroups = ["13–17", "18–24", "25–34", "35+"] as const;
export const creatorTypes = [
  "UGC creator",
  "Product photographer",
  "Event creator",
  "Family creator",
  "Luxury creator",
] as const;

// Keep your initial filter state!
export const defaultFilters: CreatorFilters = {
  query: "",
  city: "all",
  niche: "all",
  platforms: [],
  minFollowers: "",
  maxFollowers: "",
  minEngagement: 0,
  minBudget: "",
  maxBudget: "",
  audience: "all",
  ageGroups: [],
  minViews: 0,
  creatorTypes: [],
  verifiedOnly: false,
  availableOnly: false,
  hasReviews: false,
  savedOnly: false,
};
