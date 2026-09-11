import type {
  Creator,
  CreatorFilters,
  FilterChip,
  SortKey,
} from "../types/creators";

export const compact = (value: number) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

export const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

export const toggleItem = <T>(items: T[], value: T): T[] =>
  items.includes(value)
    ? items.filter((item) => item !== value)
    : [...items, value];

export function filterError(filters: CreatorFilters): string | null {
  for (const [label, low, high] of [
    ["Followers", filters.minFollowers, filters.maxFollowers],
    ["Budget", filters.minBudget, filters.maxBudget],
  ]) {
    if (
      [low, high].some(
        (value) =>
          value !== "" &&
          (!Number.isFinite(Number(value)) || Number(value) < 0),
      )
    )
      return `${label} must contain non-negative numbers.`;
    if (low !== "" && high !== "" && Number(low) > Number(high))
      return `${label}: minimum cannot exceed maximum.`;
  }
  return null;
}

export function filterCreators(
  creators: Creator[],
  filters: CreatorFilters,
  sort: SortKey,
  savedIds: string[] = [],
): Creator[] {
  if (filterError(filters)) return [];

  // Updated to safely handle nullable numbers from Prisma by defaulting to 0
  const within = (value: number | null, low: string, high: string) => {
    const val = value ?? 0;
    return (
      (low === "" || val >= Number(low)) && (high === "" || val <= Number(high))
    );
  };

  const query = filters.query.trim().toLowerCase();

  const results = creators.filter((creator) => {
    // Safely concatenate strings, falling back to empty strings if Prisma returns null
    const searchableText =
      `${creator.name} ${creator.handle || ""} ${creator.niche || ""} ${creator.bio || ""} ${creator.creatorTypes.join(" ")}`.toLowerCase();

    return (
      searchableText.includes(query) &&
      (filters.city === "all" || creator.city === filters.city) &&
      (filters.niche === "all" || creator.niche === filters.niche) &&
      (!filters.platforms.length ||
        filters.platforms.some((p) => creator.platforms.includes(p))) &&
      within(creator.followers, filters.minFollowers, filters.maxFollowers) &&
      creator.engagement >= filters.minEngagement &&
      within(creator.price, filters.minBudget, filters.maxBudget) &&
      (filters.audience === "all" || creator.audience === filters.audience) &&
      (!filters.ageGroups.length ||
        filters.ageGroups.some((age) => creator.ageGroups.includes(age))) &&
      (creator.avgViews ?? 0) >= filters.minViews &&
      (!filters.creatorTypes.length ||
        filters.creatorTypes.some((type) =>
          creator.creatorTypes.includes(type),
        )) &&
      (!filters.verifiedOnly || creator.verified) &&
      // Check Prisma relation array for availability status
      (!filters.availableOnly ||
        (creator.availability &&
          creator.availability.some((a) => a.status === "AVAILABLE"))) &&
      // Check Prisma relation array length for reviews
      (!filters.hasReviews ||
        (creator.reviews && creator.reviews.length > 0)) &&
      (!filters.savedOnly || savedIds.includes(creator.id))
    );
  });

  return results.sort((a, b) => {
    const difference =
      sort === "engagement"
        ? b.engagement - a.engagement
        : sort === "followers"
          ? (b.followers ?? 0) - (a.followers ?? 0)
          : sort === "price-low"
            ? a.price - b.price
            : b.matchScore - a.matchScore;
    return difference || a.name.localeCompare(b.name);
  });
}

export function activeChips(f: CreatorFilters): FilterChip[] {
  const chips: FilterChip[] = [];
  const add = (id: string, label: string, patch: Partial<CreatorFilters>) =>
    chips.push({ id, label, patch });
  if (f.query) add("query", `Search: ${f.query}`, { query: "" });
  if (f.city !== "all") add("city", f.city, { city: "all" });
  if (f.niche !== "all") add("niche", f.niche, { niche: "all" });
  f.platforms.forEach((p) =>
    add(`platform-${p}`, p, { platforms: f.platforms.filter((v) => v !== p) }),
  );
  if (f.minFollowers || f.maxFollowers)
    add(
      "followers",
      `Followers: ${f.minFollowers || "0"}–${f.maxFollowers || "Any"}`,
      { minFollowers: "", maxFollowers: "" },
    );
  if (f.minEngagement)
    add("engagement", `Engagement ≥ ${f.minEngagement}%`, { minEngagement: 0 });
  if (f.minBudget || f.maxBudget)
    add("budget", `Budget: ₹${f.minBudget || "0"}–${f.maxBudget || "Any"}`, {
      minBudget: "",
      maxBudget: "",
    });
  if (f.audience !== "all")
    add("audience", `${f.audience} audience`, { audience: "all" });
  f.ageGroups.forEach((age) =>
    add(`age-${age}`, `Age ${age}`, {
      ageGroups: f.ageGroups.filter((v) => v !== age),
    }),
  );
  if (f.minViews)
    add("views", `Views ≥ ${compact(f.minViews)}`, { minViews: 0 });
  f.creatorTypes.forEach((type) =>
    add(`type-${type}`, type, {
      creatorTypes: f.creatorTypes.filter((v) => v !== type),
    }),
  );
  if (f.verifiedOnly) add("verified", "Verified", { verifiedOnly: false });
  if (f.availableOnly)
    add("available", "Available this month", { availableOnly: false });
  if (f.hasReviews) add("reviews", "Has brand reviews", { hasReviews: false });
  if (f.savedOnly) add("saved", "Saved only", { savedOnly: false });
  return chips;
}
