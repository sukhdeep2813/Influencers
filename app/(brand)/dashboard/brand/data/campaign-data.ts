export type CampaignStatus = "Live" | "In review" | "Draft";

export type Campaign = {
  id: string;
  title: string;
  description: string;
  deliverables: string;
  status: CampaignStatus;
  creators: string[];
  date: string;
  budget: string;
  spent: string;
  progress: number;
};

export const campaigns: Campaign[] = [
  {
    id: "camp-1",
    title: "Summer Skincare Launch",
    description: "Promote the new vitamin C skincare collection.",
    deliverables: "3 Reels · 2 Stories · 1 Post",
    status: "Live",
    creators: ["AS", "RK", "MP"],
    date: "Due Aug 18",
    budget: "₹75,000",
    spent: "₹48,500",
    progress: 65,
  },
  {
    id: "camp-2",
    title: "Monsoon Beauty Campaign",
    description: "UGC campaign focused on everyday skincare routines.",
    deliverables: "5 Reels · 5 Stories",
    status: "In review",
    creators: ["NK", "PS"],
    date: "Due Aug 24",
    budget: "₹55,000",
    spent: "₹12,000",
    progress: 35,
  },
  {
    id: "camp-3",
    title: "Creator Spotlight",
    description: "Long-term creator partnership campaign.",
    deliverables: "2 Reels · 4 Stories · 1 YouTube",
    status: "Live",
    creators: ["AM", "SJ", "VT", "RK"],
    date: "Due Sep 02",
    budget: "₹1,20,000",
    spent: "₹61,000",
    progress: 52,
  },
  {
    id: "camp-4",
    title: "Festive Collection 2026",
    description: "Upcoming festive product launch campaign.",
    deliverables: "4 Reels · 3 Stories",
    status: "Draft",
    creators: [],
    date: "Starts Sep 15",
    budget: "₹90,000",
    spent: "₹0",
    progress: 0,
  },
];
