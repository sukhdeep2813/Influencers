export interface Testimonial {
  id: number;
  name: string;
  handle: string;
  role: string;
  content: string;
  type: "BRAND" | "CREATOR";
  avatar: string;
}

export const mockTestimonial: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    handle: "@technova_marketing",
    role: "Marketing Director, TechNova",
    content:
      "Finding the right creators used to take weeks. With the Smart Search and verified profiles, we launched our new product campaign in days.",
    type: "BRAND",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 2,
    name: "Sukhdeep",
    handle: "@firestormgaming",
    role: "Gaming & Tech Creator",
    content:
      "This platform changed how I handle sponsorships. Connecting with brands that actually fit my audience's vibe is effortless now, and the automated tracking saves me hours of admin work between streams.",
    type: "CREATOR",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  },
  {
    id: 3,
    name: "Marcus Thorne",
    handle: "@marcusthorne_fit",
    role: "Fitness Influencer",
    content:
      "The analytics tools are top-notch. Being able to showcase my true engagement rates transparently to brands has doubled my inbound deal flow this quarter.",
    type: "CREATOR",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
  },
  {
    id: 4,
    name: "Elena Rostova",
    handle: "@elena_design",
    role: "UI/UX & Lifestyle Creator",
    content:
      "The escrow payment system gives me complete peace of mind. I no longer have to chase down late invoices from brands after a campaign goes live.",
    type: "CREATOR",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  },
  {
    id: 5,
    name: "David Chen",
    handle: "@lumina_wear",
    role: "Founder, Lumina Apparel",
    content:
      "We scaled our influencer seeding program from 5 to 50 creators a month using the bulk messaging and contract templates. An absolute lifesaver for small teams.",
    type: "BRAND",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
  },
  {
    id: 6,
    name: "Aisha Rahman",
    handle: "@aishacodes",
    role: "Tech Educator & YouTuber",
    content:
      "I love how the platform suggests fair pricing tiers based on real market data. It helped me negotiate a long-term contract that reflects my true value.",
    type: "CREATOR",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 7,
    name: "Liam O'Connor",
    handle: "@vanguard_audio",
    role: "Growth Lead, Vanguard Sound",
    content:
      "The campaign ROI dashboard gives us clear, real-time data on clicks and conversions. We cut our wasted ad spend by nearly 40% in our first month.",
    type: "BRAND",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
  },
  {
    id: 8,
    name: "Chloe Dubois",
    handle: "@chloeeats_travel",
    role: "Culinary & Travel Vlogger",
    content:
      "The creative briefs on this platform are incredibly detailed. Brands clearly outline their deliverables up front, which completely eliminates scope creep.",
    type: "CREATOR",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
  },
  {
    id: 9,
    name: "Jonathan Vance",
    handle: "@vance_media",
    role: "PR Director, Horizon Global",
    content:
      "Managing multi-platform campaigns (TikTok, YouTube, and Instagram) used to be a fragmented mess. Having all communication and analytics in one place changes everything.",
    type: "BRAND",
   avatar: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random",
  },
];
