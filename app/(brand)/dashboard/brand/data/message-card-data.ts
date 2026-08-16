export type MessagePreview = {
  id: string;
  name: string;
  initials: string;
  preview: string;
  time: string;
  unread: boolean;
};

export const messages: MessagePreview[] = [
  {
    id: "msg-1",
    name: "Aarav Mehta",
    initials: "AM",
    preview: "Hey! I've sent over the revised campaign concept.",
    time: "8m",
    unread: true,
  },
  {
    id: "msg-2",
    name: "Priya Sharma",
    initials: "PS",
    preview: "Would Thursday work for the product shoot?",
    time: "42m",
    unread: true,
  },
  {
    id: "msg-3",
    name: "Kabir Malhotra",
    initials: "KM",
    preview: "Thanks for the campaign brief. Everything looks good.",
    time: "2h",
    unread: false,
  },
  {
    id: "msg-4",
    name: "Ananya Kapoor",
    initials: "AK",
    preview: "I've uploaded the final Instagram reel.",
    time: "Yesterday",
    unread: false,
  },
];