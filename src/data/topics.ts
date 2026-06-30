export interface Topic {
  slug: string;
  label: string;
}

export const TOPICS: Topic[] = [
  { slug: "receive-payments", label: "Receive Payments" },
  { slug: "send-payments-withdraw-to-bank", label: "Send Payments / Withdraw to Bank" },
  { slug: "my-payoneer-account", label: "My Payoneer Account" },
  { slug: "my-payoneer-card", label: "My Payoneer Card" },
  { slug: "refer-a-friend-mobile-app-and-more", label: "Refer a Friend, Mobile App and More" },
  { slug: "technical-support", label: "Technical Support" },
  { slug: "performance", label: "Performance" },
  { slug: "api-integrations", label: "API Integrations" },
  { slug: "live-chat", label: "Live Chat" },
  { slug: "documentation", label: "Documentation" }
];
