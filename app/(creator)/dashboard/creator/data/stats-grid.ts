import {
  FileText,
  BriefcaseBusiness,
  Wallet,
  Eye,
  type LucideIcon,
} from "lucide-react";

export type Stat = {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
};

export const stats: Stat[] = [
  {
    label: "Applications",
    value: "24",
    helper: "+6 this week",
    icon: FileText,
  },
  {
    label: "Active Campaigns",
    value: "3",
    helper: "1 ending this week",
    icon: BriefcaseBusiness,
  },
  {
    label: "Total Earnings",
    value: "₹48,500",
    helper: "₹12,000 pending",
    icon: Wallet,
  },
  {
    label: "Profile Views",
    value: "1,284",
    helper: "+18.6% this month",
    icon: Eye,
  },
];