export type SavedCreator = {
  id: string;
  name: string;
  initials: string;
  details: string;
  accent: "gold" | "teal" | "blue" | "coral";
};

export const savedCreators: SavedCreator[] = [
  {
    id: "creator-1",
    name: "Riya Sharma",
    initials: "RS",
    details: "Beauty · 128K followers",
    accent: "gold",
  },
  {
    id: "creator-2",
    name: "Arjun Kapoor",
    initials: "AK",
    details: "Fitness · 86K followers",
    accent: "teal",
  },
  {
    id: "creator-3",
    name: "Meera Joshi",
    initials: "MJ",
    details: "Fashion · 214K followers",
    accent: "blue",
  },
  {
    id: "creator-4",
    name: "Kabir Malhotra",
    initials: "KM",
    details: "Lifestyle · 72K followers",
    accent: "coral",
  },
];