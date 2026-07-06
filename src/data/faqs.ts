export interface FaqItem {
  question: string;
  answer: string;
  category: string;
  helpfulCount: number;
  isCode?: boolean;
}

export const faqs: FaqItem[] = [
  // --- ACCOUNT CATEGORY ---
  {
    question: "How do I reset my password?",
    answer: "To reset your password, click on your profile avatar in the top-right corner, navigate to Settings, and select the Security tab. Click 'Change Password', enter your current password, and choose a new secure password. If you are locked out, click the 'Forgot Password' link on the login page, enter your registered email address, and we will send you a secure link to reset it.",
    category: "Account",
    helpfulCount: 142
  },
  {
    question: "How do I enable Multi-Factor Authentication (MFA)?",
    answer: "We highly recommend securing your account with MFA. To enable it, go to Settings > Security and click 'Configure MFA'. You can use any authenticator app (like Google Authenticator, Authy, or Microsoft Authenticator) to scan the QR code and enter the 6-digit confirmation code.",
    category: "Security",
    helpfulCount: 89
  },
  {
    question: "Can I invite support agents or team members to my account?",
    answer: "Yes, organization admins can invite team members to Ticket-it. Go to Settings > Team and click 'Invite Member'. Enter their email address and select a role (Admin, Agent, Manager, or Billing). They will receive an email invitation to create their account and join your Ticket-it workspace.",
    category: "Account",
    helpfulCount: 120
  },
  {
    question: "How do I configure Role-Based Access Control (RBAC)?",
    answer: "Under Settings > Roles & Permissions, you can define custom roles or assign default ones (Admin, Manager, Agent, Billing). Admins have complete system control, Managers can view reports and reassign tickets, Agents handle tickets and chats, and Billing manages invoices.",
    category: "Security",
    helpfulCount: 94
  },
  {
    question: "How do I set up agent shifts and operational hours?",
    answer: "Go to Settings > Team > Working Hours. You can define timezone-specific business hours for each group or individual agent. Automatic ticket assignment (e.g. round-robin) respects these schedules and routes incoming tickets only to active, clocked-in agents.",
    category: "Security",
    helpfulCount: 73
  },
  {
    question: "Can I create custom ticket statuses?",
    answer: "Yes. Ticket-it allows you to customize the default ticket lifecycle. Navigate to Settings > Workflow > Ticket Statuses, where you can add new statuses (e.g., 'Awaiting Customer Response', 'Pending Developer Fix') and categorize them into Open, In-Progress, or Closed groups.",
    category: "Account",
    helpfulCount: 68
  },
  {
    question: "How do I update my profile details and email address?",
    answer: "To update your profile details, navigate to Settings > Profile. Here, you can change your first name, last name, and display name. If you need to change your registered email address, click 'Change Email', enter your new email, and confirm your password. We will send verification links to both your old and new email addresses to secure the change.",
    category: "Account",
    helpfulCount: 54
  },
  {
    question: "Can I delete or temporarily disable my account?",
    answer: "Yes. You can deactivate your account temporarily under Settings > Security. If you wish to permanently delete your Ticket-it account and all associated data, scroll to the Danger Zone at the bottom of the Account Settings page and click 'Delete Account'. Please note this action is irreversible and deletes all configurations, agent assignments, and ticket logs.",
    category: "Account",
    helpfulCount: 38
  },
  {
    question: "How do I download my personal data audit logs?",
    answer: "To comply with GDPR and CCPA, you can request a complete archive of your personal data. Go to Settings > Privacy & Data and click 'Request Data Export'. A download link containing your profile, audit logs, and ticket history in JSON format will be sent to your registered email address within 24 hours.",
    category: "Security",
    helpfulCount: 42
  },

  // --- BILLING CATEGORY ---
  {
    question: "Where can I find my billing history?",
    answer: "You can view and download all past invoices and billing statements by navigating to Billing & Subscription from your account menu. There, you can filter invoices by date, see pending charges, update payment methods, and download full PDF receipts. For custom tax invoicing details, contact our finance team.",
    category: "Billing",
    helpfulCount: 98
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards including Visa, Mastercard, American Express, and Discover. For Enterprise plans, we also support bank wire transfers, ACH payments, and purchase orders. You can update your payment method at any time in Settings > Billing.",
    category: "Billing",
    helpfulCount: 75
  },
  {
    question: "How is billing calculated for additional agent seats?",
    answer: "Ticket-it charges a flat rate per agent seat per month. If you add a seat mid-cycle, we prorate the cost for the remainder of the billing period. If you deactivate a seat, the seat credit remains on your account and will be applied to your next renewal cycle.",
    category: "Billing",
    helpfulCount: 88
  },
  {
    question: "Is there a limit on how many organizations can be billed under one parent account?",
    answer: "Our Enterprise Plan allows multi-tenant organizational billing. You can create child workspaces for sub-brands or distinct organizations and manage their billing centrally under one parent billing profile with detailed per-organization usage reports.",
    category: "Billing",
    helpfulCount: 62
  },
  {
    question: "Do you charge extra for custom domains on the customer help center?",
    answer: "Custom domains (e.g., support.yourcompany.com) are free and included in both our Pro and Enterprise tiers. You will need to configure a CNAME record pointing to our server and we will provision an SSL certificate automatically.",
    category: "Billing",
    helpfulCount: 57
  },
  {
    question: "How do I update my tax ID or invoice information?",
    answer: "To add your VAT, GST, or local business tax ID to your invoices, go to Settings > Billing and edit your billing details. The updated tax ID will be displayed on all future invoices automatically. If you need it applied to a past invoice, please contact support.",
    category: "Billing",
    helpfulCount: 56
  },
  {
    question: "Can I set up multiple backup payment methods?",
    answer: "Yes, you can configure multiple credit cards or bank accounts. Go to Settings > Billing and click 'Add Payment Method'. Once added, you can designate one as 'Primary' and others as 'Backup'. If a payment attempt fails on your primary card, our system will automatically try the backup methods to prevent service disruption.",
    category: "Billing",
    helpfulCount: 31
  },
  {
    question: "How do I receive monthly invoices via email automatically?",
    answer: "To receive billing invoices directly in your inbox, navigate to Settings > Billing and locate the Billing Contacts section. You can add up to five email addresses that will automatically receive PDF copies of all invoices and receipts as soon as they are generated.",
    category: "Billing",
    helpfulCount: 48
  },

  // --- DEVELOPERS CATEGORY ---
  {
    question: "How to integrate the Ticket-it API?",
    answer: "API integration can be completed in a few quick steps:\n\n1. Go to Developer Settings and generate an API key.\n2. Set the Authorization header as Bearer YOUR_API_KEY.\n3. Send requests to our base URL https://api.ticket-it.com/v1.\n\nCheck out the simple JS Fetch code example below to start querying our endpoints. See our full API reference for complete SDK packages.",
    category: "Developers",
    helpfulCount: 215,
    isCode: true
  },
  {
    question: "How do I implement secure customer identity verification (HMAC) for the widget?",
    answer: "To prevent spoofing, enable Identity Verification under Settings > Developer > Widget. Generate a secret key and compute a SHA-256 HMAC hash of the customer's email and user ID on your backend server. Pass this signature to the widget init function:\n\nticketit('identify', {\n  email: 'customer@example.com',\n  userId: 'usr_123456',\n  signature: 'computed_signature_hash'\n});",
    category: "Developers",
    helpfulCount: 167
  },
  {
    question: "What are the IP addresses we need to whitelist for incoming webhooks?",
    answer: "All Ticket-it webhooks originate from a static set of IP addresses: 52.28.16.4, 52.28.16.5, and 3.120.44.18. Ensure your firewall/load balancer allows incoming POST requests from these IPs on port 443.",
    category: "Developers",
    helpfulCount: 112
  },
  {
    question: "How can I programmatically update a ticket status via the API?",
    answer: "You can update ticket fields using our PATCH endpoint: PATCH /v1/tickets/{id} with a JSON body specifying the fields to modify (e.g., { \"status\": \"Resolved\" }). The request must include your Bearer API key in the authorization header.",
    category: "Developers",
    helpfulCount: 95
  },
  {
    question: "What is the rate limit for API requests?",
    answer: "Standard API keys are limited to 60 requests per minute. Pro plans support up to 600 requests per minute, and Enterprise accounts can be configured for custom limits. If you exceed the rate limit, the API will return a 429 Too Many Requests status code with a Retry-After header.",
    category: "Developers",
    helpfulCount: 134
  },
  {
    question: "Where can I find the API Webhook logs?",
    answer: "Webhook delivery history and payloads can be monitored in the Webhooks tab under Developer Settings. You can view the status of each sent webhook (success or retry), check response latency, and trigger manual redeliveries of failed events.",
    category: "Developers",
    helpfulCount: 92
  },
  {
    question: "How do I rotate my API keys safely without downtime?",
    answer: "To rotate your API keys safely, go to Developer Settings > API Keys. Click 'Generate New Key' to create a secondary active key. Deploy this new key to your production environment. Once you verify that traffic is successfully routing through the new key, return to the dashboard and safely delete the old key.",
    category: "Developers",
    helpfulCount: 84
  },
  {
    question: "Do you offer SDKs for specific programming languages?",
    answer: "Yes, we maintain official SDK libraries for Node.js, Python, Go, and Ruby. You can find installation instructions, code repositories, and quickstart guides in our Developer Center. We also provide a community-supported PHP SDK.",
    category: "Developers",
    helpfulCount: 77
  },
  {
    question: "How can I verify the signature of webhooks?",
    answer: "Every webhook sent by our system contains a 'X-TicketIt-Signature' header. You can verify this signature using your webhook signing secret (found in Developer Settings > Webhooks). Compute the HMAC hex digest of the request payload using SHA-256 and confirm that it matches the signature header.",
    category: "Developers",
    helpfulCount: 65
  },

  // --- PRICING CATEGORY ---
  {
    question: "Do you offer a discount for open-source projects or academic institutions?",
    answer: "Yes, Ticket-it is proud to support the open-source community and academic work. We offer a 50% discount on the Pro tier for registered non-profits, verified students/teachers, and open-source project leads. Submit a request to our billing team with your documentation.",
    category: "Pricing",
    helpfulCount: 81
  },
  {
    question: "What is the difference between the Free, Pro, and Enterprise tiers?",
    answer: "The Free tier supports up to 3 agents and 100 tickets/month. Pro features unlimited tickets, advanced routing, Slack/Teams integrations, custom SLA rules, and live chat widgets. Enterprise adds SOC2 compliance, HIPAA enablement, custom data residency, dedicated support managers, and 1-hour priority SLAs.",
    category: "Pricing",
    helpfulCount: 124
  },
  {
    question: "Can I change my subscription plan?",
    answer: "Yes, you can upgrade, downgrade, or switch billing cycles (monthly/yearly) at any time. Go to Settings > Billing and click 'Change Plan'. Plan upgrades take effect immediately with prorated charges applied. Downgrades or cancellations remain active on your current tier until the end of your billing cycle.",
    category: "Pricing",
    helpfulCount: 64
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes! New accounts receive a 14-day free trial of our Pro plan with no credit card required. During the trial, you have access to all Pro features and 5 active agent seats to test our services. After the trial, you can choose to subscribe or downgrade to our free tier.",
    category: "Pricing",
    helpfulCount: 110
  },
  {
    question: "Are there custom enterprise plans available?",
    answer: "Absolutely. We offer customized enterprise plans for high-volume users, custom compliance requirements (HIPAA, SOC2), dedicated support options, and custom SLAs. Please contact our sales team to discuss your needs.",
    category: "Pricing",
    helpfulCount: 45
  },
  {
    question: "Is there a discount for annual billing subscriptions?",
    answer: "Yes! If you select our Annual billing option, you receive a 20% discount compared to monthly billing. This discount is applied automatically during checkout. You can switch from monthly to annual billing at any time through the Billing Settings page.",
    category: "Pricing",
    helpfulCount: 58
  },

  // --- USAGE CATEGORY ---
  {
    question: "How is agent capacity calculated for auto-assignment?",
    answer: "Under Settings > Assignment, you can define maximum concurrent ticket capacities for agents (e.g. 5 active chats or 15 open email tickets). Once an agent reaches their capacity threshold, the system skips them in the round-robin queue until they close or resolve a ticket.",
    category: "Usage",
    helpfulCount: 91
  },
  {
    question: "Can I set up auto-archive rules for dormant tickets?",
    answer: "Yes. In Settings > Workflow > Automation, you can create a rule: 'If a ticket has been in Resolved status for more than 7 days, automatically change status to Archived.' Archived tickets are removed from daily search indexes but remain exportable for audit logs.",
    category: "Usage",
    helpfulCount: 79
  },
  {
    question: "What happens if I exceed my usage limits?",
    answer: "We send automated email warnings when your ticket volume reaches 80% and 100% of your plan limits. If you exceed 100%, we apply soft limits initially. To avoid service interruptions or automatic overages, you can enable auto-scaling on your account settings, which will automatically scale your plan up as needed.",
    category: "Usage",
    helpfulCount: 83
  },
  {
    question: "How can I monitor my real-time usage?",
    answer: "You can track your API calls and active support tickets in real-time on the Usage Dashboard. The dashboard features daily and monthly ticket volume charts, breakdowns by agent group, and detailed metrics for each endpoint.",
    category: "Usage",
    helpfulCount: 71
  },
  {
    question: "Can I set billing alerts for my usage?",
    answer: "Yes, you can set custom email alerts for usage spending thresholds under Settings > Billing > Alerts. You can configure multiple threshold alerts to stay informed of your usage trends.",
    category: "Usage",
    helpfulCount: 52
  },
  {
    question: "What are soft limits versus hard limits on usage?",
    answer: "A soft limit triggers email notifications to inform you that your ticket or seat volume is high, but does not block requests. A hard limit is the absolute ceiling where API requests will start failing with a 429 error and new tickets will be paused. You can adjust these limits in Settings > Usage to prevent unexpected costs.",
    category: "Usage",
    helpfulCount: 41
  },

  // --- SYSTEM CATEGORY ---
  {
    question: "How do I configure SLA escalation alerts?",
    answer: "Navigate to Settings > SLAs. You can create target policies based on ticket priority (Low, Medium, High, Urgent). Set response and resolution time targets. If a target is breached, you can set escalation actions such as alerting a channel in Slack or auto-reassigning the ticket to a tier-2 queue.",
    category: "System",
    helpfulCount: 104
  },
  {
    question: "How do you handle data backups and disaster recovery?",
    answer: "We perform automated, encrypted database backups every 6 hours with a multi-region failover configuration. In case of a major cloud outage, our recovery point objective (RPO) is 6 hours, and our recovery time objective (RTO) is under 30 minutes. Uptime statuses are posted live on our status page.",
    category: "System",
    helpfulCount: 89
  },
  {
    question: "Is there a status page for services?",
    answer: "Yes! We maintain 99.99% uptime and post live status reports of all system operations, API latency, and email delivery networks at status.ticket-it.com. You can also sign up for email or SMS notifications regarding scheduled maintenance.",
    category: "System",
    helpfulCount: 112
  },
  {
    question: "Where are your servers located?",
    answer: "Our cloud infrastructure is hosted across secure AWS and Azure data centers in North America, Europe, and Asia-Pacific. By default, requests are routed to the nearest regional endpoint to minimize latency and ensure compliance with local data residency laws.",
    category: "System",
    helpfulCount: 95
  },
  {
    question: "How do you handle security updates and patches?",
    answer: "We deploy security updates and OS patches automatically without downtime. Critical vulnerability checks are run daily, and maintenance windows are scheduled during low-traffic periods. System status updates are published on our status page.",
    category: "System",
    helpfulCount: 68
  },
  {
    question: "What is your Service Level Agreement (SLA) percentage?",
    answer: "We guarantee a 99.99% monthly uptime SLA for all paid and enterprise tier accounts. In the unlikely event that uptime falls below this threshold, you are eligible to receive service credits. Detailed SLA terms and claim procedures are available in our Terms of Service.",
    category: "System",
    helpfulCount: 49
  },
  {
    question: "Are your services compliant with SOC2 and HIPAA?",
    answer: "Yes, our ticketing platform is SOC2 Type II certified and compliant with HIPAA regulations. We undergo annual third-party audits to verify our security practices. Enterprise customers can sign a Business Associate Agreement (BAA) with us.",
    category: "Security",
    helpfulCount: 76
  },
  {
    question: "How do I report a security vulnerability or bug?",
    answer: "We take security very seriously. If you discover a vulnerability, please do not disclose it publicly. Report it directly to our security team via security@ticket-it.com. We operate a bug bounty program and reward verified findings in accordance with our disclosure guidelines.",
    category: "Security",
    helpfulCount: 55
  }
];
