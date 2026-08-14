import {
  FileCheck2,
  MessageCircle,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";

export type AttentionItem = {
  title: string;
  description: string;
  action: string;
  icon: LucideIcon;
};

export const attentionItems: AttentionItem[] = [
  {
    title: "Complete your creator profile",
    description:
      "Add your rates, portfolio and audience details to improve your profile visibility.",
    action: "Complete profile",
    icon: FileCheck2,
  },
  {
    title: "New brand message",
    description:
      "GlowFit has sent you a message about a potential fitness campaign.",
    action: "View message",
    icon: MessageCircle,
  },
  {
    title: "Campaign deadline approaching",
    description:
      "Your FitFuel campaign content is due in 2 days.",
    action: "View campaign",
    icon: CalendarClock,
  },
];