export type RecommendedCreator = {
  id: string;
  name: string;
  initials: string;
  details: string;
  match: number;
};

export const recommendedCreators: RecommendedCreator[] = [
  {
    id: "creator-1",
    name: "Aarav Mehta",
    initials: "AM",
    details: "Fashion · 128K followers · Delhi",
    match: 96,
  },
  {
    id: "creator-2",
    name: "Riya Sharma",
    initials: "RS",
    details: "Beauty & Lifestyle · 84K followers · Mumbai",
    match: 92,
  },
  {
    id: "creator-3",
    name: "Kabir Kapoor",
    initials: "KK",
    details: "Fitness · 156K followers · Bengaluru",
    match: 89,
  },
  {
    id: "creator-4",
    name: "Ananya Verma",
    initials: "AV",
    details: "Skincare · 67K followers · Gurugram",
    match: 87,
  },
];
