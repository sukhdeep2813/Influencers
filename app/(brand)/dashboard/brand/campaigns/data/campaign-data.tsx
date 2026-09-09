export type CampaignStatus =
  | "draft"
  | "review"
  | "live"
  | "paused"
  | "completed";
export type Platform = "Instagram" | "YouTube" | "TikTok";

// Change this one value if you move the campaigns folder.
export const CAMPAIGNS_PATH = "/dashboard/brand/campaigns";
export const platforms: Platform[] = ["Instagram", "YouTube", "TikTok"];
export const statuses: CampaignStatus[] = [
  "draft",
  "review",
  "live",
  "paused",
  "completed",
];
export const panel =
  "rounded-2xl border border-[#e5ddcf] bg-white p-5 shadow-sm";
export const control =
  "rounded-xl border border-[#ded6c8] bg-white px-3 py-2.5 text-sm text-[#342f2a] outline-none focus:ring-2 focus:ring-[#e99735]";
export const button =
  "inline-flex items-center justify-center rounded-xl border border-[#ded6c8] bg-white px-4 py-2.5 text-sm font-semibold text-[#342f2a] hover:bg-[#f5f1e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b67726]";

export type Application = {
  id: string;
  name: string;
  platform: Platform;
  followers: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
};

export const applications: Record<number, Application[]> = {
  1: [
    {
      id: "a1",
      name: "Kavya Sharma",
      platform: "Instagram",
      followers: 28000,
      status: "PENDING",
    },
    {
      id: "a2",
      name: "Riya Patel",
      platform: "Instagram",
      followers: 52000,
      status: "ACCEPTED",
    },
  ],
  2: [
    {
      id: "a3",
      name: "Anjali Rao",
      platform: "YouTube",
      followers: 81000,
      status: "PENDING",
    },
    {
      id: "a4",
      name: "Nisha Gupta",
      platform: "Instagram",
      followers: 19000,
      status: "REJECTED",
    },
  ],
};

export type Creator = {
  name: string;
  initials: string;
  status: string;
};

export type Campaign = {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: CampaignStatus;
  platforms: Platform[];
  budget: number;
  spent: number;
  creators: Creator[];
  reach: number;
  engagement: number | null;
  progress: number;
  deadline: string;
  daysLeft: number | null;
  updatedAt: string;
};

export const campaigns: Campaign[] = [
  {
    id: 1,
    title: "Monsoon skincare launch",
    description: "Reels, stories and honest product routines",
    icon: "✦",
    status: "live",
    platforms: ["Instagram"],
    budget: 62000,
    spent: 43400,
    reach: 18400,
    engagement: 4.9,
    progress: 70,
    deadline: "15 Sep 2026",
    daysLeft: 6,
    updatedAt: "2026-09-08",
    creators: [
      { name: "Riya Patel", initials: "RP", status: "Delivered · 8 Sep" },
      { name: "Aditi Kapoor", initials: "AK", status: "In review" },
      { name: "Sana Naik", initials: "SN", status: "Delivered · 7 Sep" },
      { name: "Tanya Shah", initials: "TS", status: "Due 12 Sep" },
    ],
  },
  {
    id: 2,
    title: "Sunscreen awareness week",
    description: "UGC explainers and product photography",
    icon: "☼",
    status: "review",
    platforms: ["Instagram", "YouTube"],
    budget: 95000,
    spent: 33300,
    reach: 9200,
    engagement: 5.2,
    progress: 35,
    deadline: "23 Sep 2026",
    daysLeft: 14,
    updatedAt: "2026-09-07",
    creators: [
      { name: "Meera Joshi", initials: "MJ", status: "Awaiting approval" },
      { name: "Priya Verma", initials: "PV", status: "Changes requested" },
      { name: "Tanya Shah", initials: "TS", status: "Awaiting approval" },
      { name: "Naina Bose", initials: "NB", status: "Draft submitted" },
      { name: "Dev Rana", initials: "DR", status: "Not started" },
      { name: "Isha Sen", initials: "IS", status: "Not started" },
    ],
  },
  {
    id: 3,
    title: "Festive gifting collab",
    description: "Premium gifting content for the festive season",
    icon: "◇",
    status: "draft",
    platforms: ["Instagram"],
    budget: 40000,
    spent: 0,
    reach: 0,
    engagement: null,
    progress: 8,
    deadline: "30 Sep 2026",
    daysLeft: 21,
    updatedAt: "2026-09-06",
    creators: [],
  },
  {
    id: 4,
    title: "Summer glow kit",
    description: "Creator-led launch for the summer essentials bundle",
    icon: "✓",
    status: "completed",
    platforms: ["Instagram"],
    budget: 78000,
    spent: 78000,
    reach: 42100,
    engagement: 4.6,
    progress: 100,
    deadline: "2 Jul 2026",
    daysLeft: null,
    updatedAt: "2026-07-02",
    creators: [
      { name: "Neha Kulkarni", initials: "NK", status: "5.0 rating" },
      { name: "Isha Shetty", initials: "IS", status: "4.8 rating" },
      { name: "Divya Verma", initials: "DV", status: "5.0 rating" },
      { name: "Maya Roy", initials: "MR", status: "4.9 rating" },
      { name: "Anya Das", initials: "AD", status: "4.8 rating" },
    ],
  },
  {
    id: 5,
    title: "Everyday hair ritual",
    description: "Short-form tutorials for a new repair range",
    icon: "≈",
    status: "live",
    platforms: ["Instagram", "TikTok"],
    budget: 54000,
    spent: 21600,
    reach: 28700,
    engagement: 6.1,
    progress: 42,
    deadline: "28 Sep 2026",
    daysLeft: 19,
    updatedAt: "2026-09-09",
    creators: [
      { name: "Zoya Ali", initials: "ZA", status: "Filming" },
      { name: "Kriti Jain", initials: "KJ", status: "Live" },
      { name: "Leena Paul", initials: "LP", status: "Brief accepted" },
    ],
  },
  {
    id: 6,
    title: "Hydration challenge",
    description: "Seven-day community challenge with daily shorts",
    icon: "◌",
    status: "paused",
    platforms: ["YouTube", "TikTok"],
    budget: 36000,
    spent: 12400,
    reach: 11600,
    engagement: 3.8,
    progress: 38,
    deadline: "5 Oct 2026",
    daysLeft: 26,
    updatedAt: "2026-09-04",
    creators: [
      { name: "Aarav Gill", initials: "AG", status: "Paused" },
      { name: "Diya Rao", initials: "DR", status: "Paused" },
    ],
  },
  {
    id: 7,
    title: "Clean beauty stories",
    description: "Founder stories and ingredient explainers",
    icon: "❋",
    status: "completed",
    platforms: ["Instagram", "YouTube"],
    budget: 68000,
    spent: 65500,
    reach: 63800,
    engagement: 5.4,
    progress: 100,
    deadline: "18 Aug 2026",
    daysLeft: null,
    updatedAt: "2026-08-18",
    creators: [
      { name: "Nikita Arora", initials: "NA", status: "4.9 rating" },
      { name: "Sia Mehta", initials: "SM", status: "5.0 rating" },
      { name: "Ruhani Jain", initials: "RJ", status: "4.7 rating" },
      { name: "Amrita Shah", initials: "AS", status: "4.9 rating" },
    ],
  },
];

export const statusLabels: Record<CampaignStatus, string> = {
  draft: "Draft",
  review: "In review",
  live: "Live",
  paused: "Paused",
  completed: "Completed",
};

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
