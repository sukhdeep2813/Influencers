export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  items: FAQItem[];
}

export const mockFaqData: FAQCategory[] = [
  {
    category: "For Brands",
    items: [
      {
        question: "How do you verify creators?",
        answer:
          'Every creator profile goes through a manual check — we verify follower authenticity, engagement patterns, and identity before the "Verified" badge is granted. Profiles with signs of bought followers or engagement pods are rejected.',
      },
      {
        question: "What if a creator doesn't deliver the content?",
        answer:
          "Every collaboration runs through a digital contract with clear deliverables and deadlines. If a creator doesn't deliver, your payment stays protected until the dispute is resolved through our support team.",
      },
      {
        question: "Is there a minimum budget to hire a creator?",
        answer:
          "No. You can find creators starting from a few thousand rupees per post, filtered by your exact budget range.",
      },
      {
        question: "Do I need an agency to use CreatorLink?",
        answer:
          "No — that's the point. You search, filter, and message creators directly. No agency layer, no markup.",
      },
      {
        question:
          "How is CreatorLink different from just DMing creators on Instagram?",
        answer:
          "You get verified data (real engagement rate, audience demographics, past brand reviews) instead of guessing from a follower count — plus contracts and payment protection DMs can't offer.",
      },
    ],
  },
  {
    category: "For Creators",
    items: [
      {
        question: "Is it free to join as a creator?",
        answer:
          "Yes, creating your profile, portfolio, and receiving collaboration requests is free. Creator Pro is optional and adds a verified badge, better ranking, and analytics.",
      },
      {
        question: "How and when do I get paid?",
        answer:
          'Payments are tracked in your dashboard from "pending" to "paid," released once deliverables are confirmed. No more chasing brands over DM.',
      },
      {
        question: "What if a brand doesn't pay after I post the content?",
        answer:
          "Every campaign is backed by a signed contract before content goes live. If a brand doesn't pay, you can raise a dispute and our team steps in.",
      },
      {
        question: "Do I need a minimum follower count to join?",
        answer:
          "No. We welcome nano and micro-creators (1K+ followers) alongside larger accounts — many brands specifically look for smaller, highly-engaged local creators.",
      },
    ],
  },
  {
    category: "On Money & Trust",
    items: [
      {
        question: "What commission does CreatorLink take?",
        answer:
          "A flat 5–10% platform fee on payments processed through the platform — no hidden charges beyond that.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes, all payments are processed through secure, encrypted payment infrastructure — CreatorLink never stores your card or bank details directly.",
      },
      {
        question:
          "What happens if there's a dispute between a brand and a creator?",
        answer:
          "Our support team reviews the contract, deliverables, and communication history to mediate — payments stay held until it's resolved.",
      },
    ],
  },
];
