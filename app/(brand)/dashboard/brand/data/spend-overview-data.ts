export type SpendPoint = {
  month: string;
  value: number;
  highlight?: boolean;
};

export const spendHistory: SpendPoint[] = [
  {
    month: "Feb",
    value: 38,
  },
  {
    month: "Mar",
    value: 52,
  },
  {
    month: "Apr",
    value: 44,
  },
  {
    month: "May",
    value: 67,
  },
  {
    month: "Jun",
    value: 58,
  },
  {
    month: "Jul",
    value: 76,
  },
  {
    month: "Aug",
    value: 88,
    highlight: true,
  },
];