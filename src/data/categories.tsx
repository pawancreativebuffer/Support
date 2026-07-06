import React from 'react';
import { BookOpen, Layers, Shield, Zap, MessageCircle, Settings } from 'lucide-react';

export interface ExplanationPoint {
  title: string;
  detail: string;
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface ReceivingAccountData {
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: string;
  beneficiary: string;
}

export interface JsonData {
  status: string;
  projectId: string;
  environment: string;
  allowedDomains: string[];
  limits: {
    dailyRequests: number;
    rateLimitPerMinute: number;
  };
}

export interface SampleData {
  type: 'form' | 'table' | 'receiving-account' | 'json';
  title: string;
  data: TableData | ReceivingAccountData | JsonData | null;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  prerequisites?: string;
  steps?: string[];
  codeBlock?: string;
  troubleshooting?: { error: string; solution: string }[];
  screenshot?: string;
  screenshotCaption?: string;
  explanationPoints?: ExplanationPoint[];
  sample?: SampleData;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  alternativeSlugs?: string[];
  articles: Article[];
}

export const CATEGORIES: Category[] = [
  {
    id: "ticketing-helpdesk",
    title: "Ticketing & Help Desk",
    slug: "ticketing-helpdesk",
    articles: [
      {
        slug: "request-a-payment", // Keeping slug to maintain resource page link in header / article/request-a-payment
        title: "Creating and Managing Tickets",
        description: "Learn how to submit, view, and track support tickets via email, the web portal, or the embedded support widget.",
        prerequisites: "Verify your email address to log in and access your tickets dashboard.",
        steps: [
          "Go to the Ticket-it Home page and click 'Contact' or 'Sign In'.",
          "Fill in the ticket creation form with your subject, category, and issue description.",
          "Click 'Submit Ticket'. You will receive an automated email response with your ticket reference number."
        ],
        screenshot: "/payment-setup-mockup.png",
        screenshotCaption: "Figure 1: Ticket creation submission form.",
        explanationPoints: [
          { title: "Ticket Lifespan", detail: "Resolved tickets are automatically closed after 3 days if no response is received." },
          { title: "Allowed File Attachments", detail: "You can attach logs, screenshots, and PDFs up to 10MB in size per ticket." },
          { title: "SLA Targets", detail: "Response times depend on your plan: Basic (24h), Pro (8h), and Enterprise (1h/Urgent)." }
        ],
        sample: {
          type: "table",
          title: "Ticket Priority SLA Matrix",
          data: {
            headers: ["Priority Tier", "Target Response Time", "Resolution SLA"],
            rows: [
              ["Urgent (Enterprise only)", "Within 1 Hour", "Under 4 Hours"],
              ["High Priority", "Within 4 Hours", "Under 12 Hours"],
              ["Medium Priority", "Within 8 Hours", "Under 24 Hours"],
              ["Low / Inquiry", "Within 24 Hours", "Under 48 Hours"]
            ]
          }
        }
      },
      {
        slug: "understanding-ticket-statuses",
        title: "Understanding Ticket Statuses",
        description: "Understand the lifecycle of a ticket, from creation to final resolution.",
        prerequisites: "Access is available to both ticket submitters and assigned support agents.",
        steps: [
          "New tickets are placed in the 'Open' state waiting for agent pickup.",
          "Once an agent starts working, status changes to 'In Progress'.",
          "If we need your input, status changes to 'Pending Customer'. Click reply to resume activity."
        ],
        screenshot: "/dashboard-mockup.png",
        screenshotCaption: "Figure 2: Tracking active ticket statuses in the console.",
        explanationPoints: [
          { title: "Open Status", detail: "Tickets newly submitted and waiting in queue for dispatcher routing." },
          { title: "Pending Customer", detail: "Clock pauses on internal SLAs while awaiting user replies." },
          { title: "Resolved vs Closed", detail: "Resolved tickets can be reopened by replying, closed tickets cannot." }
        ]
      },
      {
        slug: "customizing-ticket-forms",
        title: "Customizing Ticket Forms",
        description: "Admins can configure custom fields like dropdowns, checkboxes, and text inputs to gather context before routing.",
        prerequisites: "You must have Admin access rights to change forms.",
        steps: [
          "Navigate to Admin Dashboard > Settings > Ticket Forms.",
          "Drag and drop custom field types into the ticket editor layout.",
          "Set validation rules and map fields to routing categories, then click Save."
        ]
      },
      {
        slug: "setting-up-sla-policies",
        title: "Setting Up SLA Policies",
        description: "Define service level agreement (SLA) response and resolution rules to guarantee timely customer support.",
        prerequisites: "You must have Manager or Administrator credentials.",
        steps: [
          "Navigate to Admin Dashboard > Settings > SLAs and click 'New Policy'.",
          "Set the scope conditions (e.g., Ticket Source is Email, Priority is High).",
          "Specify the target response time (e.g., within 4 hours) and resolution time (e.g., within 12 hours).",
          "Define escalation paths, such as notifying team leads via Slack if the ticket is close to breaching SLA."
        ],
        explanationPoints: [
          { title: "SLA Targets", detail: "SLAs can be configured to run on business operational hours or calendar hours." },
          { title: "Escalation Triggers", detail: "Automated alerts can be configured for 30 minutes, 1 hour, or 2 hours prior to a breach." }
        ]
      },
      {
        slug: "managing-csat-surveys",
        title: "Managing Customer Satisfaction (CSAT) Surveys",
        description: "Gather feedback from users automatically after their tickets are resolved to monitor agent performance.",
        prerequisites: "Ensure Ticket Status Settings has a 'Resolved' state configured.",
        steps: [
          "Go to Admin Settings > Workflows > Satisfaction Surveys.",
          "Enable 'Send survey link upon ticket resolution'.",
          "Customize the rating scale (e.g., Good/Bad or 1-5 stars) and add a custom feedback comment box.",
          "Analyze feedback scores and trends in the Reports & Analytics tab."
        ]
      }
    ]
  },
  {
    id: "live-chat-widgets",
    title: "Live Chat & Widgets",
    slug: "live-chat-widgets",
    alternativeSlugs: ["account-&-billing"],
    articles: [
      {
        slug: "embedding-chat-widget",
        title: "Embedding Chat Widget",
        description: "Add the Ticket-it live chat widget to your website or single-page app to assist visitors in real-time.",
        prerequisites: "Generate your unique widget snippet from the Ticket-it developer panel.",
        steps: [
          "Go to Developer Settings > Widget and copy the HTML snippet.",
          "Paste the script tag directly before the closing </body> tag of your website template.",
          "Refresh your website; the Ticket-it chat bubble will appear in the bottom-right corner."
        ],
        screenshot: "/payment-setup-mockup.png",
        screenshotCaption: "Figure 3: Interactive chat widget placement configurations.",
        explanationPoints: [
          { title: "CORS Constraints", detail: "Make sure to whitelist your website domain in the Ticket-it panel before testing." },
          { title: "Custom Branding", detail: "Pro plans allow customizing colors, agent avatars, and welcome triggers." },
          { title: "Mobile Responsiveness", detail: "Widget dynamically scales for optimal presentation on iOS and Android devices." }
        ],
        sample: {
          type: "form",
          title: "Live Interactive Widget Simulator",
          data: null
        }
      },
      {
        slug: "converting-chats-to-tickets",
        title: "Converting Chats to Tickets",
        description: "If a chat session requires offline follow-up, agents can easily transform the conversation into a standard support ticket.",
        prerequisites: "Required by active agents responding to live chats.",
        steps: [
          "Inside the Agent Chat panel, click the 'Convert to Ticket' button in the toolbar.",
          "Confirm customer details and assign the ticket to the appropriate department.",
          "The chat history is attached as the starting log, and a notification is emailed to the client."
        ],
        screenshot: "/dashboard-mockup.png",
        screenshotCaption: "Figure 4: Chat session management panel with 'Convert' action.",
        explanationPoints: [
          { title: "Transcript Attachment", detail: "Conversations are saved and appended as markdown text inside the ticket notes." },
          { title: "Automatic Follow-up", detail: "Emails are dispatched immediately containing ticket credentials." },
          { title: "Agent Assignments", detail: "Tickets default to the agent handling the live chat unless reassigned manually." }
        ],
        sample: {
          type: "table",
          title: "Chat Resolution Guidelines",
          data: {
            headers: ["Chat Condition", "Recommended Action", "Target Hand-off Time"],
            rows: [
              ["Simple Q&A", "Resolve on call", "Under 5 Minutes"],
              ["Vulnerability Report", "Convert to Urgent Ticket", "Instant Transition"],
              ["Billing Discrepancy", "Convert & Route to Finance", "Under 2 Minutes"],
              ["Feature Request", "Log to Product Backlog", "Under 3 Minutes"]
            ]
          }
        }
      },
      {
        slug: "chat-triggers-and-routing",
        title: "Chat Triggers & Routing",
        description: "Initiate proactive chats with customers based on browsing actions or duration.",
        prerequisites: "Requires widget script v2.4+ deployed on site.",
        steps: [
          "Select 'Live Chat' from the sidebar settings.",
          "Choose triggers and configure rules (e.g., user spends 30s on Pricing).",
          "Set up automatic messages and route to appropriate agents."
        ]
      },
      {
        slug: "configuring-whatsapp-business",
        title: "Configuring WhatsApp Business Integration",
        description: "Connect your official WhatsApp Business number to Ticket-it to answer customer messages from the unified agent inbox.",
        prerequisites: "Verify your business account credentials in Meta Business Suite.",
        steps: [
          "Go to Settings > Integrations > Channels and click 'Add WhatsApp'.",
          "Log in to your Meta account to connect your WhatsApp Business Profile.",
          "Configure the message router and select default agent queues to handle incoming WhatsApp chats."
        ]
      }
    ]
  },
  {
    id: "agent-team-routing",
    title: "Agent & Team Routing",
    slug: "agent-team-routing",
    articles: [
      {
        slug: "roles-and-permissions",
        title: "Roles and Permissions",
        description: "Manage your help desk team size and restrict access to tickets by configuring user roles.",
        prerequisites: "You must have Owner permissions to invite new Admins.",
        steps: [
          "Go to Admin Dashboard > Settings > Team & Agents.",
          "Click 'Invite Agent' and specify their email address.",
          "Choose a role: Owner, Admin, Manager, Agent, or Light Agent."
        ]
      },
      {
        slug: "automatic-ticket-routing",
        title: "Automatic Ticket Routing",
        description: "Build rules to automatically assign incoming tickets to specific agent groups or departments.",
        prerequisites: "Configure target agent groups before assigning routing rules.",
        steps: [
          "Navigate to Settings > Routing Rules and click 'Add Rule'.",
          "Define condition parameters (e.g., if Ticket Category equals 'Billing').",
          "Set the action to assign the ticket to the 'Billing & Finance Group'."
        ]
      },
      {
        slug: "creating-canned-responses",
        title: "Creating Canned Responses",
        description: "Set up macros/canned responses for frequent agent answers to streamline support workflow.",
        prerequisites: "Agents can create personal shortcuts; managers can create global team shortcuts.",
        steps: [
          "Open your Profile Settings page or Admin settings.",
          "Select Canned Responses and click 'New Template'.",
          "Input the trigger key (e.g., '/greet') and write the template text."
        ]
      },
      {
        slug: "configuring-agent-shifts",
        title: "Configuring Agent Shifts & Out of Office Status",
        description: "Manage agent availability, timezone coverage, and automatic scheduling.",
        prerequisites: "You must have Manager-level permissions or higher.",
        steps: [
          "Navigate to Admin Dashboard > Settings > Team Settings > Working Hours.",
          "Set timezone, define start/end operational hours for each weekday, and assign agents to the schedule.",
          "Agents can set their status to 'Away' or 'Out of Office' from their profile menu to pause auto-routing."
        ]
      }
    ]
  },
  {
    id: "api-integrations",
    title: "API & Developer Tools",
    slug: "api-integrations",
    articles: [
      {
        slug: "authenticating-api-requests",
        title: "Authenticating API Requests",
        description: "Securely authenticate your API requests to the Ticket-it platform using Bearer tokens.",
        prerequisites: "Generate API credentials from the developer settings tab before making requests.",
        steps: [
          "Retrieve your API key from the dashboard developer console.",
          "Attach the API key as an Authorization header (Authorization: Bearer YOUR_API_KEY) to every outgoing request.",
          "Ensure keys are never committed to version control systems or exposed in client-side code."
        ],
        codeBlock: `# API Authentication Header\ncurl -X GET https://api.ticket-it.com/v1/tickets \\\n  -H "Authorization: Bearer tkt_sk_123456789" \\\n  -H "Content-Type: application/json"`,
        screenshot: "/dashboard-mockup.png",
        screenshotCaption: "Figure 5: API credentials management console.",
        explanationPoints: [
          { title: "Security Best Practices", detail: "Never push API keys directly to git repos. Always load them as runtime variables." },
          { title: "Environment Isolation", detail: "Use Sandbox credentials for local testing, and rotate live production keys frequently." }
        ],
        sample: {
          type: "json",
          title: "Get Ticket API Response",
          data: {
            status: "success",
            projectId: "tkt_proj_abc987",
            environment: "production",
            allowedDomains: ["*.ticket-it.com", "localhost:3000"],
            limits: {
              dailyRequests: 100000,
              rateLimitPerMinute: 600
            }
          }
        },
        troubleshooting: [
          { error: "Invalid Token Error", solution: "Ensure there are no trailing spaces in your API key." },
          { error: "Timeout Issues", solution: "Check your firewall settings to allow outbound connections to our IP addresses." }
        ]
      },
      {
        slug: "webhook-event-subscriptions",
        title: "Webhook Event Subscriptions",
        description: "Subscribe to real-time events to sync ticket state changes with external CRMs or messaging apps.",
        prerequisites: "Ensure you have command-line access or a backend endpoint to test callbacks.",
        steps: [
          "Navigate to Developer Settings > Webhooks.",
          "Click 'Create Webhook Endpoint' and enter your listener URL.",
          "Select the events to subscribe to, such as ticket.created or ticket.updated, and click Save."
        ],
        troubleshooting: [
          { error: "Webhook Handshake Failed", solution: "Verify that your server returns a 200 OK response within 3 seconds of receiving the handshake ping." },
          { error: "SSL Certificate Error", solution: "Verify that your callback URL uses a valid SSL certificate signed by a recognized root authority." }
        ]
      },
      {
        slug: "widget-javascript-api",
        title: "Widget JavaScript API",
        description: "Control the live chat widget programmatically from your site's frontend scripts.",
        prerequisites: "Load the Ticket-it loader script before running custom API calls.",
        steps: [
          "Call TicketIt('show') or TicketIt('hide') to trigger visibility.",
          "Pass user identities using TicketIt('identify', { email: 'user@example.com' }) to log them in automatically.",
          "Listen to frontend events using TicketIt('on', 'chat:started', callback)."
        ]
      },
      {
        slug: "syncing-contacts-crm-api",
        title: "Syncing Contacts with Salesforce/HubSpot API",
        description: "Configure real-time automated contact sync between your CRM and Ticket-it databases.",
        prerequisites: "A valid CRM Developer/Admin login credential.",
        steps: [
          "Go to Developer Settings > Integrations and select your CRM (Salesforce or HubSpot).",
          "Click 'Connect Account' and authorize the connection using OAuth 2.0.",
          "Map contact fields (e.g., Email, Phone, Company) and enable bidirectional sync to keep accounts updated."
        ],
        codeBlock: `# Synchronize contact via API PATCH request\ncurl -X PATCH https://api.ticket-it.com/v1/contacts/usr_987654 \\\n  -H "Authorization: Bearer tkt_sk_123456789" \\\n  -d '{"crm_id": "sf_contact_88772", "company": "Acme Corp"}'`
      }
    ]
  },
  {
    id: "status-performance",
    title: "System Status & Uptime",
    slug: "status-performance",
    articles: [
      {
        slug: "system-health-monitoring",
        title: "System Health & Uptime Monitoring",
        description: "Check current operational status of the Ticket-it API, mail delivery gateway, and chat servers.",
        prerequisites: "Subscribe to status alerts via email or SMS to stay informed on system uptime.",
        steps: [
          "Visit the status portal at status.ticket-it.com.",
          "Review the historical uptime charts for each primary service area (API, Web Dashboard, and database clusters).",
          "Check the maintenance calendar for upcoming scheduled database upgrades and feature deployments."
        ]
      },
      {
        slug: "troubleshooting-connection-issues",
        title: "Troubleshooting Connection Issues",
        description: "Diagnose network drops, firewall rules, or DNS resolution issues preventing connections to Ticket-it.",
        prerequisites: "Ensure you have CLI access to run diagnostics (ping, traceroute).",
        steps: [
          "Verify your local internet connection and router settings.",
          "Run a traceroute to our API server at api.ticket-it.com to identify network hops causing latency.",
          "Check your firewall or proxy server settings to ensure ports 80, 443, and 8080 are open for outbound traffic."
        ]
      },
      {
        slug: "database-backup-exports",
        title: "Database Backup Exports & Retention Schedules",
        description: "Configure automated database backup cycles and export raw data packages for compliance auditing.",
        prerequisites: "You must have Owner permissions to access databases.",
        steps: [
          "Navigate to Admin Settings > System & Data > Database Backups.",
          "Choose backup frequency (6h, 12h, 24h) and set your target AWS S3 or Azure Blob storage bucket.",
          "Under exports, click 'Generate Export' to download ticket archives, agent logs, and client directories in ZIP format."
        ]
      }
    ]
  },
  {
    id: "security-compliance",
    title: "Security & Compliance",
    slug: "security-compliance",
    articles: [
      {
        slug: "configuring-sso-saml",
        title: "Configuring SSO & SAML Authentication",
        description: "Integrate Ticket-it with identity providers like Okta, Microsoft Azure AD, or OneLogin for unified user authentication.",
        prerequisites: "You must have Owner permissions in Ticket-it to configure Single Sign-On (SSO).",
        steps: [
          "Navigate to Admin Dashboard > Settings > Security > SSO Settings.",
          "Select your Identity Provider (IdP) and copy the Ticket-it Assertion Consumer Service (ACS) URL.",
          "In your IdP admin panel, create a new SAML integration, enter the ACS URL, and download the Metadata XML.",
          "Upload the IdP Metadata XML file to Ticket-it, toggle 'Enable SAML SSO', and click Save."
        ],
        screenshot: "/dashboard-mockup.png",
        screenshotCaption: "Figure 6: SSO and SAML identity provider configuration portal.",
        explanationPoints: [
          { title: "Just-In-Time Provisioning", detail: "When enabled, new users logging in via SSO automatically have agent profiles created." },
          { title: "SAML Metadata auto-sync", detail: "Ticket-it fetches updated IdP certificates automatically every 7 days." }
        ],
        sample: {
          type: "json",
          title: "SAML User Profile Mapping JSON Schema",
          data: {
            status: "active",
            projectId: "tkt_proj_sso",
            environment: "production",
            allowedDomains: ["saml.ticket-it.com"],
            limits: {
              dailyRequests: 5000,
              rateLimitPerMinute: 100
            }
          }
        }
      },
      {
        slug: "data-privacy-gdpr-compliance",
        title: "Data Privacy & GDPR Compliance",
        description: "Learn how Ticket-it handles customer data encryption, data residency, and GDPR automated right-to-be-forgotten requests.",
        prerequisites: "General compliance policies apply to all active workspaces.",
        steps: [
          "To trigger a customer right-to-be-forgotten request, go to Settings > Privacy & Compliance.",
          "Enter the user's email address and select 'Permanently Delete User Data'.",
          "The system will scrub all chat transcripts, support tickets, and contact records associated with that email within 48 hours."
        ]
      },
      {
        slug: "enforcing-ip-whitelisting-mfa",
        title: "Enforcing IP Whitelisting & MFA Policies",
        description: "Enforce strict security guardrails to restrict dashboard access to recognized corporate networks and require MFA for all agents.",
        prerequisites: "Enterprise plan is required to configure IP whitelist controls.",
        steps: [
          "Go to Admin Settings > Security > Security Policies.",
          "Add trusted CIDR blocks (e.g. 192.168.1.0/24) to the allowed IP Whitelist interface.",
          "Toggle 'Enforce Multi-Factor Authentication (MFA)' to mandate authenticator verification on the next login attempt."
        ]
      }
    ]
  }
];

export const getCategoryIcon = (catId: string) => {
  switch (catId) {
    case 'ticketing-helpdesk':
      return <BookOpen className="w-4 h-4" />;
    case 'live-chat-widgets':
      return <MessageCircle className="w-4 h-4" />;
    case 'agent-team-routing':
      return <Settings className="w-4 h-4" />;
    case 'api-integrations':
      return <Layers className="w-4 h-4" />;
    case 'status-performance':
      return <Zap className="w-4 h-4" />;
    case 'security-compliance':
      return <Shield className="w-4 h-4" />;
    default:
      return <BookOpen className="w-4 h-4" />;
  }
};
