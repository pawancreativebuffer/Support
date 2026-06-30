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
    id: "receive-payments",
    title: "Receive Payments",
    slug: "receive-payments",
    articles: [
      {
        slug: "request-a-payment",
        title: "Request a Payment",
        description: "Send a payment request to your global clients and track when they pay you.",
        prerequisites: "Make sure you have completed your profile setup and verified your identity.",
        steps: [
          "Log in to your Support Dashboard and navigate to 'Receive' > 'Request a Payment'.",
          "Enter your client's email, name, and payment amount.",
          "Add payment terms, attach supporting documents (like invoices), and click 'Send'."
        ],
        screenshot: "/payment-setup-mockup.png",
        screenshotCaption: "Figure 1: Payment Request submission form.",
        explanationPoints: [
          { title: "Payment Links Life Span", detail: "Payment links expire after 30 days of generation for compliance reasons." },
          { title: "Supported Cards", detail: "Accepts Visa, Mastercard, American Express, and direct SEPA/ACH debit." },
          { title: "Automatic Reminders", detail: "The platform sends automated reminders to your clients 3 days before the invoice is due." }
        ],
        sample: {
          type: "table",
          title: "Payment Processing Fees",
          data: {
            headers: ["Payment Method", "Processing Time", "Fee"],
            rows: [
              ["Credit Card (Visa/MC)", "Instant", "2.9% + $0.30"],
              ["American Express", "Instant", "3.5% + $0.30"],
              ["ACH Bank Debit (US)", "3-5 Business Days", "1.0% (Cap $10)"],
              ["SEPA Bank Debit (EU)", "2-3 Business Days", "1.0% (Cap €10)"]
            ]
          }
        }
      },
      {
        slug: "receiving-accounts",
        title: "Global Receiving Accounts",
        description: "Get local bank details in multiple currencies to receive local bank transfers.",
        prerequisites: "Receiving accounts are available for EUR, USD, GBP, JSD, and AUD.",
        steps: [
          "Select 'Receiving Accounts' from the sidebar.",
          "Choose the currency account you wish to view details for.",
          "Provide these local account numbers to your buyers to receive funds easily."
        ],
        screenshot: "/dashboard-mockup.png",
        screenshotCaption: "Figure 2: Viewing global bank accounts in the console.",
        explanationPoints: [
          { title: "Zero Transfer Fees", detail: "Receiving payments via local bank transfer is 100% free of charge." },
          { title: "Direct Deposit Function", detail: "Functions like a normal domestic checking account for direct wire setups." },
          { title: "Local Clearing Networks", detail: "Settled natively via Fedwire/ACH (US), Faster Payments (UK), and SEPA (EU)." }
        ],
        sample: {
          type: "receiving-account",
          title: "US Receiving Account Details (ACH)",
          data: {
            bankName: "First Century Bank N.A.",
            routingNumber: "021000021",
            accountNumber: "987654321012",
            accountType: "Checking",
            beneficiary: "Payoneer Client Services"
          }
        }
      },
      {
        slug: "marketplace-payments",
        title: "Payments from Marketplaces",
        description: "Link your account to global freelancing and e-commerce marketplaces.",
        prerequisites: "You must check if the partner marketplace supports direct Payoneer integration.",
        steps: [
          "Log in to your marketplace seller dashboard.",
          "Navigate to payment settings and select Payoneer as the payout method.",
          "Enter your account details and authorize the sync."
        ]
      }
    ]
  },
  {
    id: "send-payments",
    title: "Send Payments / Withdraw to Bank",
    slug: "send-payments-withdraw-to-bank",
    alternativeSlugs: ["account-&-billing"],
    articles: [
      {
        slug: "send-payments",
        title: "Send Payments",
        description: "Pay a payment request from or initiate a payment to a Payoneer account holder. Whether you'd like to pay as an individual or on behalf of a company, learn how to pay vendors and manage your payments.",
        prerequisites: "Ensure you have sufficient balance in your wallet or a linked bank card.",
        steps: [
          "Go to 'Pay' > 'Send a Payment' in your main navigation panel.",
          "Enter the email of the recipient or select from your saved list.",
          "Input the amount, choose the funding source, and authorize the transaction using 2FA."
        ],
        screenshot: "/payment-setup-mockup.png",
        screenshotCaption: "Figure 3: Initiating a payment to external vendors.",
        explanationPoints: [
          { title: "Double-Verify Emails", detail: "Verify the exact email address to avoid routing funds to the wrong wallet." },
          { title: "Single-Limit Thresholds", detail: "Standard limits allow sending up to $10,000 per transaction." },
          { title: "2-Factor Security", detail: "All outgoing transactions require active SMS or App-based 2FA validation." }
        ],
        sample: {
          type: "form",
          title: "Live Interactive Payment Simulator",
          data: null
        }
      },
      {
        slug: "withdrawals-bank-accounts",
        title: "Withdrawals/Bank Accounts",
        description: "You can withdraw funds from your Payoneer account directly to your bank account. Learn how to add a bank account, make a withdrawal and more.",
        prerequisites: "Your bank account must be verified before making a withdrawal.",
        steps: [
          "Navigate to 'Withdraw' > 'To Bank Account'.",
          "Select the balance you wish to withdraw from and choose the verified bank account.",
          "Enter the amount to withdraw, review the conversion rate, and submit the request."
        ],
        screenshot: "/dashboard-mockup.png",
        screenshotCaption: "Figure 4: Balance withdrawal interface with live exchange rates.",
        explanationPoints: [
          { title: "Exchange Rate Spreads", detail: "Conversions use competitive mid-market rates with transparent, low spreads." },
          { title: "Cut-off Times", detail: "Withdrawals requested before 5 PM EST are processed next business day." },
          { title: "Security Hold Policy", detail: "First-time withdrawals to newly linked bank accounts may take up to 48 hours for compliance checks." }
        ],
        sample: {
          type: "table",
          title: "Withdrawal Timelines & Rates",
          data: {
            headers: ["Region", "Method", "Processing Speed", "Fee Spread"],
            rows: [
              ["United States", "ACH Direct Credit", "1-2 Business Days", "Up to 1.5%"],
              ["United Kingdom", "FPS Network", "1-2 Hours", "Up to 1.5%"],
              ["Eurozone countries", "SEPA Settlement", "1 Business Day", "Up to 1.5%"],
              ["Rest of the World", "Swift Wire Transfer", "3-5 Business Days", "Flat $15.00 fee"]
            ]
          }
        }
      },
      {
        slug: "pay-to-recipient-payoneer",
        title: "Pay to a recipient's Payoneer",
        description: "Instantly transfer funds to another Payoneer user free of charge.",
        prerequisites: "The recipient must have an active Payoneer account.",
        steps: [
          "Select the 'Pay' option from the main dashboard header.",
          "Select 'To Recipient's Payoneer Account'.",
          "Enter recipient details, select currency, and hit submit."
        ]
      },
      {
        slug: "pay-to-recipient-bank-account",
        title: "Pay to a recipient's bank account",
        description: "Send bank wire transfers directly to your suppliers, contractors, and partners.",
        prerequisites: "You need the recipient's full banking info, including IBAN/SWIFT code.",
        steps: [
          "Go to 'Pay' > 'To Supplier Bank Account'.",
          "Select or add the bank details of your recipient.",
          "Review the transfer fee and confirm the transaction."
        ]
      }
    ]
  },
  {
    id: "my-payoneer-account",
    title: "My Payoneer Account",
    slug: "my-payoneer-account",
    articles: [
      {
        slug: "account-verification",
        title: "Account Verification",
        description: "Submit documents to verify your identity and unlock full transaction limits.",
        prerequisites: "Have a government-issued photo ID ready.",
        steps: [
          "Go to Settings > Verification Center.",
          "Upload clear photos of your passport, driver's license, or national ID.",
          "Wait 2-3 business days for the compliance team to review."
        ]
      },
      {
        slug: "change-password-security",
        title: "Change Password & Security",
        description: "Update your password, enable two-factor authentication, and manage security questions.",
        prerequisites: "You must have access to your registered mobile number for SMS codes.",
        steps: [
          "Navigate to Security Settings.",
          "Click 'Change Password' or 'Enable 2FA'.",
          "Follow the prompts to verify your identity."
        ]
      },
      {
        slug: "update-profile-details",
        title: "Update Profile Details",
        description: "Change your registered email, home address, or phone number in your profile settings.",
        prerequisites: "Ensure you have supporting documents if changing your legal address.",
        steps: [
          "Open your Profile Settings page.",
          "Update the outdated fields with correct information.",
          "Upload utility bills or bank statements to confirm the new details."
        ]
      }
    ]
  },
  {
    id: "my-payoneer-card",
    title: "My Payoneer Card",
    slug: "my-payoneer-card",
    articles: [
      {
        slug: "order-a-card",
        title: "Order a Card",
        description: "Request a physical or virtual debit card to spend your funds worldwide.",
        prerequisites: "A minimum account balance of $30 (or equivalent) is required to order.",
        steps: [
          "Go to the Cards tab in the navigation menu.",
          "Select physical or virtual, and verify your shipping address.",
          "Submit the request; physical cards arrive in 10-15 business days."
        ]
      },
      {
        slug: "card-activation-pin",
        title: "Card Activation & PIN",
        description: "Activate your card online and set your secure 4-digit ATM PIN.",
        prerequisites: "You must have received the physical card in the mail before activation.",
        steps: [
          "Log in to the portal and go to your Cards list.",
          "Select 'Activate' and enter the 16-digit card number.",
          "Set a secure 4-digit PIN for ATM and retail usage."
        ]
      }
    ]
  },
  {
    id: "refer-a-friend-mobile-app-and-more",
    title: "Refer a Friend, Mobile App and More",
    slug: "refer-a-friend-mobile-app-and-more",
    articles: [
      {
        slug: "referral-program-rules",
        title: "Referral Program Rules",
        description: "Earn rewards by inviting other business owners to sign up and transact.",
        prerequisites: "Referrals must sign up using your unique link.",
        steps: [
          "Navigate to the Refer a Friend page.",
          "Copy your unique referral link.",
          "Share the link with colleagues. When they receive $1,000, both of you earn $25."
        ]
      },
      {
        slug: "using-the-mobile-app",
        title: "Using the Mobile App",
        description: "Manage your payments, check balances, and receive push notifications on the go.",
        prerequisites: "Compatible with iOS 14+ and Android 8.0+.",
        steps: [
          "Download the app from the Apple App Store or Google Play Store.",
          "Log in using your existing credentials.",
          "Set up biometrics (Face ID/Touch ID) for secure quick login."
        ]
      }
    ]
  },
  {
    id: "technical-support",
    title: "Technical Support",
    slug: "technical-support",
    articles: [
      {
        slug: "how-to-setup-your-account",
        title: "How to setup your account",
        description: "Learn how to configure your system, manage dashboard access, and start using our central hub.",
        prerequisites: "Before you begin, make sure you have active admin access to your workspace. If you do not see the settings tab, contact your organization owner.",
        steps: [
          "Navigate to the dashboard and log in to your account.",
          "Locate the navigation sidebar on the left side of your screen. This is your central hub for all configurations.",
          "Apply the configuration. Copy the environment variables configuration snippet below and paste it into your environment variables file (.env)."
        ],
        codeBlock: `# Environment Variables Configuration\nNEXUS_API_KEY="sk_live_123456789"\nNEXUS_PROJECT_ID="proj_abc987"\nENABLE_DEBUG_MODE=true`,
        screenshot: "/dashboard-mockup.png",
        screenshotCaption: "Figure 5: Environment variable management console.",
        explanationPoints: [
          { title: "Security Best Practices", detail: "Never push API keys directly to git repos. Always load them as runtime variables." },
          { title: "Environment Isolation", detail: "Use Sandbox credentials for local testing, and rotate live production keys frequently." }
        ],
        sample: {
          type: "json",
          title: "Mock System Registration Payload",
          data: {
            status: "active",
            projectId: "proj_abc987",
            environment: "production",
            allowedDomains: ["*.nexus-platform.com", "localhost:3000"],
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
        slug: "troubleshooting-connection-issues",
        title: "Troubleshooting connection issues",
        description: "Resolve latency, network timeouts, and firewall rules preventing communication with our servers.",
        prerequisites: "Ensure you have command-line access to run network diagnostics (like ping or traceroute).",
        steps: [
          "Verify your local internet connection and router settings.",
          "Run a traceroute to our API server at api.nexus-platform.com to identify network hops causing latency.",
          "Check your firewall or proxy server settings to ensure ports 80, 443, and 8080 are open for outbound traffic."
        ],
        troubleshooting: [
          { error: "DNS Resolution Failed", solution: "Flush your local DNS cache and configure fallback servers like 8.8.8.8." },
          { error: "SSL Certificate Error", solution: "Update your operating system's root certificates to ensure secure HTTPS handshakes." }
        ]
      },
      {
        slug: "system-status-and-downtime",
        title: "System status and downtime",
        description: "Check service health, scheduled maintenance updates, and operational status metrics.",
        prerequisites: "Subscribe to status alerts via email or SMS to stay informed on system uptime.",
        steps: [
          "Visit the status portal at status.nexus-platform.com.",
          "Review the historical uptime charts for each primary service area (API, Web Dashboard, and database clusters).",
          "Check the maintenance calendar for upcoming scheduled database upgrades and feature deployments."
        ]
      }
    ]
  },
  {
    id: "performance",
    title: "Performance",
    slug: "performance",
    articles: [
      {
        slug: "optimizing-page-load-speed",
        title: "Optimizing page load speed",
        description: "Maximize site speed by utilizing lazy loading, optimized imagery, and critical CSS rendering path.",
        prerequisites: "Familiarize yourself with Google Lighthouse or Web Vitals metrics.",
        steps: [
          "Audit your site using Lighthouse to locate major rendering bottlenecks.",
          "Implement lazy loading for images and non-critical components below the fold.",
          "Enable Gzip/Brotli compression and use modern image formats like WebP or AVIF."
        ]
      },
      {
        slug: "caching-strategies-for-databases",
        title: "Caching strategies for databases",
        description: "Improve database query speed using Redis, key-value stores, and query result caching configurations.",
        prerequisites: "You need a running Redis or Memcached instance connected to your database.",
        steps: [
          "Identify slow, frequently executed SQL queries using database query logs.",
          "Write cache middleware to check if the query result exists in Redis before querying the main database.",
          "Implement cache invalidation policies (TTL or manual purges) to prevent stale data."
        ]
      }
    ]
  },
  {
    id: "api-integrations",
    title: "API Integrations",
    slug: "api-integrations",
    articles: [
      {
        slug: "api-rate-limits-and-quotas",
        title: "API rate limits and quotas",
        description: "Avoid getting blocked by tracking your API requests per minute, burst tokens, and limit upgrades.",
        prerequisites: "All endpoints implement standard rate limits based on your API key's subscription tier.",
        steps: [
          "Inspect HTTP headers returned by the API (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset).",
          "Implement exponential backoff and retry logic in your API client when receiving HTTP 429 Too Many Requests.",
          "Distribute bulk operations over time to avoid spikes in API request volume."
        ]
      },
      {
        slug: "authenticating-api-requests",
        title: "Authenticating API requests",
        description: "Use OAuth 2.0, Bearer tokens, or secret keys to secure your API calls to our platforms.",
        prerequisites: "Generate API credentials from the developer settings tab before making requests.",
        steps: [
          "Retrieve your API key from the dashboard developer console.",
          "Attach the API key as an Authorization header (Authorization: Bearer YOUR_API_KEY) to every outgoing request.",
          "Ensure keys are never committed to version control systems or exposed in client-side code."
        ]
      },
      {
        slug: "migrating-from-v1-to-v2-api",
        title: "Migrating from v1 to v2 API",
        description: "Step-by-step migration guide to transition your codebase to our newer, faster v2 endpoints.",
        prerequisites: "Support for v1 API will end on December 31, 2026. Upgrading early is highly recommended.",
        steps: [
          "Review the v1 vs v2 breaking changes log in our developer portal.",
          "Update all endpoint base URLs from /v1/ to /v2/ in your client configuration.",
          "Modify request payloads to match the new nested JSON schema format required by v2 endpoints."
        ]
      }
    ]
  },
  {
    id: "live-chat",
    title: "Live Chat",
    slug: "live-chat",
    articles: [
      {
        slug: "how-to-start-a-live-chat-session",
        title: "How to start a live chat session",
        description: "Get real-time answers by connecting to one of our expert support agents via live chat widget.",
        prerequisites: "Log in to your account to link your chat session with your customer profile for faster resolution.",
        steps: [
          "Click the blue chat bubble in the bottom right corner of any page.",
          "Select a help category and type a short summary of your issue.",
          "Wait 1-2 minutes to be automatically connected with the next available support representative."
        ]
      },
      {
        slug: "chat-support-hours-and-availability",
        title: "Chat support hours and availability",
        description: "View working hours, active time zones, and average response times for chat queues.",
        prerequisites: "Live chat is available for Professional and Enterprise plan subscribers.",
        steps: [
          "Check standard support hours: Monday through Friday, 8:00 AM to 8:00 PM EST.",
          "For out-of-hours inquiries, submit an email ticket which will be prioritized at the start of the next business day.",
          "View current queue wait times displayed at the top of the chat widget interface."
        ]
      }
    ]
  },
  {
    id: "documentation",
    title: "Documentation",
    slug: "documentation",
    articles: [
      {
        slug: "getting-started-guide",
        title: "Getting started guide",
        description: "Read through our quickstart tutorial to configure your workspace and deploy your first app.",
        prerequisites: "Basic familiarity with node package managers and terminal commands is assumed.",
        steps: [
          "Install the client library using npm install @nexus/platform.",
          "Initialize the SDK with your API key inside your app's entry file.",
          "Test the connection by making a simple ping call and verify the success response."
        ]
      },
      {
        slug: "developer-api-reference",
        title: "Developer API reference",
        description: "Explore full endpoints, schemas, parameters, and request-response payloads.",
        prerequisites: "Read the authentication guide to acquire keys before calling reference endpoints.",
        steps: [
          "Visit reference.nexus-platform.com or view local Swagger documentation.",
          "Browse endpoints grouped by resource (e.g. Users, Teams, Transactions, Logs).",
          "Use the interactive console to run test queries and view response structures live."
        ]
      }
    ]
  }
];

export const getCategoryIcon = (catId: string) => {
  switch (catId) {
    case 'receive-payments':
      return <BookOpen className="w-4 h-4" />;
    case 'send-payments':
      return <Layers className="w-4 h-4" />;
    case 'my-payoneer-account':
      return <Shield className="w-4 h-4" />;
    case 'my-payoneer-card':
      return <Zap className="w-4 h-4" />;
    case 'refer-a-friend-mobile-app-and-more':
      return <MessageCircle className="w-4 h-4" />;
    case 'technical-support':
      return <Settings className="w-4 h-4" />;
    case 'performance':
      return <Zap className="w-4 h-4" />;
    case 'api-integrations':
      return <Layers className="w-4 h-4" />;
    case 'live-chat':
      return <MessageCircle className="w-4 h-4" />;
    case 'documentation':
      return <BookOpen className="w-4 h-4" />;
    default:
      return <BookOpen className="w-4 h-4" />;
  }
};
