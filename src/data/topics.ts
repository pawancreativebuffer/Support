export interface Topic {
  slug: string;
  label: string;
}

export const TOPICS: Topic[] = [
  { slug: "ticketing-helpdesk", label: "Ticketing & Help Desk" },
  { slug: "live-chat-widgets", label: "Live Chat & Widgets" },
  { slug: "agent-team-routing", label: "Agent & Team Routing" },
  { slug: "api-integrations", label: "API & Developer Tools" },
  { slug: "status-performance", label: "System Status & Uptime" },
  { slug: "security-compliance", label: "Security & Compliance" }
];
