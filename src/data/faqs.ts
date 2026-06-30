export interface FaqItem {
  question: string;
  answer: string;
  category: string;
  helpfulCount: number;
  isCode?: boolean;
}

export const faqs: FaqItem[] = [
  {
    question: "How do I reset my password?",
    answer: "To reset your password, click on your profile avatar in the top-right corner, navigate to Settings, and select the Security tab. Click 'Change Password', enter your current password, and choose a new secure password. If you are locked out, click the 'Forgot Password' link on the login page, enter your registered email address, and we will send you a secure link to reset it.",
    category: "Account",
    helpfulCount: 142
  },
  {
    question: "How do I enable Multi-Factor Authentication (MFA)?",
    answer: "We highly recommend securing your account with MFA. To enable it, go to Settings > Security and click 'Configure MFA'. You can use any authenticator app (like Google Authenticator, Authy, or Microsoft Authenticator) to scan the QR code and enter the 6-digit confirmation code.",
    category: "Account",
    helpfulCount: 89
  },
  {
    question: "Can I invite team members to my account?",
    answer: "Yes, organization admins can invite team members. Go to Settings > Team and click 'Invite Member'. Enter their email address and select a role (Admin, Developer, or Billing). They will receive an email invitation to create their account and join your workspace.",
    category: "Account",
    helpfulCount: 120
  },
  {
    question: "How do I update my profile details and email address?",
    answer: "To update your profile details, navigate to Settings > Profile. Here, you can change your first name, last name, and display name. If you need to change your registered email address, click 'Change Email', enter your new email, and confirm your password. We will send verification links to both your old and new email addresses to secure the change.",
    category: "Account",
    helpfulCount: 54
  },
  {
    question: "Can I delete or temporarily disable my account?",
    answer: "Yes. You can deactivate your account temporarily under Settings > Security. If you wish to permanently delete your account and all associated data, scroll to the Danger Zone at the bottom of the Account Settings page and click 'Delete Account'. Please note this action is irreversible and deletes all configurations and logs.",
    category: "Account",
    helpfulCount: 38
  },
  {
    question: "How do I download my personal data audit logs?",
    answer: "To comply with GDPR and CCPA, you can request a complete archive of your personal data. Go to Settings > Privacy & Data and click 'Request Data Export'. A download link containing your profile, audit logs, and account history in JSON format will be sent to your registered email address within 24 hours.",
    category: "Account",
    helpfulCount: 42
  },
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
  {
    question: "What is your refund policy for unused credits?",
    answer: "We offer a 30-day money-back guarantee for all plan subscriptions. If you are unsatisfied with our service, you can request a refund within 30 days of your initial purchase. Unused API and usage credits are non-refundable but remain valid on your account for up to 12 months.",
    category: "Billing",
    helpfulCount: 22
  },
  {
    question: "How to integrate the API?",
    answer: "API integration can be completed in a few quick steps:\n\n1. Go to Developer Settings and generate an API key.\n2. Set the Authorization header as Bearer YOUR_API_KEY.\n3. Send requests to our base URL https://api.nexus.com/v1.\n\nCheck out the simple JS Fetch code example below to start querying our endpoints. See our full API reference for complete SDK packages.",
    category: "Developers",
    helpfulCount: 215,
    isCode: true
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
    answer: "Every webhook sent by our system contains a 'X-Nexus-Signature' header. You can verify this signature using your webhook signing secret (found in Developer Settings > Webhooks). Compute the HMAC hex digest of the request payload using SHA-256 and confirm that it matches the signature header.",
    category: "Developers",
    helpfulCount: 65
  },
  {
    question: "Can I change my subscription plan?",
    answer: "Yes, you can upgrade, downgrade, or switch billing cycles (monthly/yearly) at any time. Go to Settings > Billing and click 'Change Plan'. Plan upgrades take effect immediately with prorated charges applied. Downgrades or cancellations remain active on your current tier until the end of your billing cycle.",
    category: "Pricing",
    helpfulCount: 64
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes! New accounts receive a 14-day free trial of our Pro plan with no credit card required. During the trial, you have access to all Pro features and $10 in API credits to test our services. After the trial, you can choose to subscribe or downgrade to our free tier.",
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
  {
    question: "Do you offer discounts for non-profits or educational institutions?",
    answer: "Yes, we support non-profit organizations, students, and educational institutions by offering a 50% discount on all Pro plans. Please contact our support team with proof of your organization status or student enrollment to apply.",
    category: "Pricing",
    helpfulCount: 39
  },
  {
    question: "What happens if I cancel my subscription mid-cycle?",
    answer: "If you cancel your subscription, your account will remain on the paid plan with all features active until the end of the current billing cycle. At the end of the cycle, your plan will automatically downgrade to the Free tier, and no further charges will be made.",
    category: "Pricing",
    helpfulCount: 47
  },
  {
    question: "What happens if I exceed my usage limits?",
    answer: "We send automated email warnings when your usage reaches 80% and 100% of your plan limits. If you exceed 100%, we apply soft limits initially. To avoid service interruptions or automatic overages, you can enable auto-scaling on your account settings, which will automatically scale your plan up as needed.",
    category: "Usage",
    helpfulCount: 83
  },
  {
    question: "How can I monitor my real-time usage?",
    answer: "You can track your API calls and data usage in real-time on the Usage Dashboard. The dashboard features daily and monthly consumption charts, breakdowns by API key, and detailed metrics for each endpoint.",
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
    question: "How is API usage calculated for nested queries?",
    answer: "API usage is calculated based on the total number of resolved nodes in a query. Simple REST requests count as 1 request, while nested or batch queries count based on the number of records retrieved. You can see a breakdown of usage weights in the API docs.",
    category: "Usage",
    helpfulCount: 29
  },
  {
    question: "What are soft limits versus hard limits on usage?",
    answer: "A soft limit triggers email notifications to inform you that your usage is high, but does not block requests. A hard limit is the absolute ceiling where requests will start failing with a 429 error. You can adjust these limits in Settings > Usage to prevent unexpected costs.",
    category: "Usage",
    helpfulCount: 41
  },
  {
    question: "How often is usage dashboard data updated?",
    answer: "Usage dashboards are updated in near real-time, typically within 60 seconds of request execution. Some aggregated metrics, like monthly trends and geo-routing statistics, are compiled hourly.",
    category: "Usage",
    helpfulCount: 33
  },
  {
    question: "Is there a status page for services?",
    answer: "Yes! We maintain 99.99% uptime and post live status reports of all system operations, API latency, and database health at status.nexus.com. You can also sign up for email or SMS notifications regarding scheduled maintenance.",
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
    answer: "Yes, our platform is SOC2 Type II certified and compliant with HIPAA regulations. We undergo annual third-party audits to verify our security practices. Enterprise customers can sign a Business Associate Agreement (BAA) with us.",
    category: "System",
    helpfulCount: 76
  },
  {
    question: "How do I report a security vulnerability or bug?",
    answer: "We take security very seriously. If you discover a vulnerability, please do not disclose it publicly. Report it directly to our security team via security@nexus.com. We operate a bug bounty program and reward verified findings in accordance with our disclosure guidelines.",
    category: "System",
    helpfulCount: 55
  }
];
