export type DashboardStat = {
  label: string;
  value: string;
  note: string;
  icon: string;
  tone: "teal" | "blue" | "coral";
};

export const stats: DashboardStat[] = [
  {
    label: "Active campaigns",
    value: "8",
    note: "+2 this month",
    icon: "↗",
    tone: "teal",
  },
  {
    label: "Creators hired",
    value: "24",
    note: "+18% from last month",
    icon: "◎",
    tone: "blue",
  },
  {
    label: "Applications",
    value: "42",
    note: "12 need review",
    icon: "!",
    tone: "coral",
  },
];
