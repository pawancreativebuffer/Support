"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Search,
  ArrowRight,
  CheckCircle,
  Info,
  Home,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Settings,
  Shield,
  Zap,
  Layers,
  MessageCircle,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';

interface ExplanationPoint {
  title: string;
  detail: string;
}

interface SampleData {
  type: 'form' | 'table' | 'receiving-account' | 'json';
  title: string;
  data: any;
}

interface Article {
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

interface Category {
  id: string;
  title: string;
  slug: string;
  alternativeSlugs?: string[];
  articles: Article[];
}

const CATEGORIES: Category[] = [
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

const getCategoryIcon = (catId: string) => {
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

function InteractivePaymentForm({ title }: { title: string }) {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !amount) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="my-8 bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8">
      <h4 className="text-sm font-bold text-slate-800 mb-4">{title}</h4>
      {status === 'success' ? (
        <div className="bg-green-50/50 border border-green-200 rounded-2xl p-6 text-center space-y-3">
          <CheckCircle className="w-10 h-10 text-green-500 mx-auto" />
          <h5 className="font-bold text-green-900">Payment Initiated successfully!</h5>
          <p className="text-sm text-green-700">A transfer of ${amount} has been scheduled for {email}.</p>
          <button
            type="button"
            onClick={() => {
              setEmail('');
              setAmount('');
              setStatus('idle');
            }}
            className="text-sm font-semibold text-green-700 hover:text-green-800 underline cursor-pointer"
          >
            Send another payment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Recipient Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. supplier@example.com"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Amount (USD)</label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 500"
                min="1"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Transfer Speed</label>
              <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:outline-none">
                <option>Standard (1-2 days)</option>
                <option>Express (Instant)</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer disabled:bg-primary-400"
          >
            {status === 'loading' ? 'Processing...' : 'Send Payment'}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ArticleDetail({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  // Safe resolution of params for Next.js dynamic routing
  const resolvedParams = params instanceof Promise ? React.use(params) : params;
  const rawSlug = resolvedParams?.slug || 'how-to-setup-your-account';
  const normalizedSlug = decodeURIComponent(rawSlug).toLowerCase();

  // Find active category and article
  let activeCategory = CATEGORIES.find(c =>
    c.slug.toLowerCase() === normalizedSlug ||
    c.alternativeSlugs?.some(alt => alt.toLowerCase() === normalizedSlug)
  ) || null;

  let activeArticle: Article | null = null;

  if (activeCategory) {
    activeArticle = null;
  } else {
    for (const cat of CATEGORIES) {
      const art = cat.articles.find(a => a.slug.toLowerCase() === normalizedSlug);
      if (art) {
        activeCategory = cat;
        activeArticle = art;
        break;
      }
    }
  }

  // Fallback to first category if absolutely nothing matches
  if (!activeCategory) {
    activeCategory = CATEGORIES[0];
    activeArticle = null;
  }

  // Expand the active category by default
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    [activeCategory.id]: true
  });

  // Track if we need to auto-expand the category when URL slug changes
  useEffect(() => {
    if (activeCategory) {
      setExpandedCategories(prev => ({
        ...prev,
        [activeCategory.id]: true
      }));
    }
  }, [activeCategory]);

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* Sub-header Banner */}
      <div className="relative w-full bg-slate-50 border-b border-slate-200 py-8 mb-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/30 via-slate-50 to-slate-50 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm md:text-base text-slate-500 font-medium mb-3">
            <Link href="/" className="hover:text-primary-600 transition-colors">
              Support Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              href={`/article/${activeCategory.slug}`}
              className={`${!activeArticle ? 'text-slate-900 font-semibold' : 'hover:text-primary-600 transition-colors'}`}
            >
              {activeCategory.title}
            </Link>
            {activeArticle && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-900 font-semibold truncate max-w-[250px]">{activeArticle.title}</span>
              </>
            )}
          </nav>

          {/* Banner Title */}
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            {activeCategory.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Navigation Menu */}
          <aside className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
              {CATEGORIES.map((category) => {
                const isExpanded = !!expandedCategories[category.id];
                const isActiveCategory = activeCategory.id === category.id;

                return (
                  <div key={category.id} className="flex flex-col">
                    {/* Category Header Button */}
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className={`w-full flex items-center justify-between p-5 text-left transition-all hover:bg-slate-50 cursor-pointer ${isActiveCategory ? 'bg-primary-50/20' : ''
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isActiveCategory ? 'bg-primary-100 text-primary-700' : 'bg-slate-100 text-slate-500'
                          }`}>
                          {getCategoryIcon(category.id)}
                        </div>
                        <span className={`text-sm md:text-base font-bold transition-colors ${isActiveCategory ? 'text-primary-700' : 'text-slate-700'
                          }`}>
                          {category.title}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {/* Subcategories/Articles list under this category */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 flex flex-col gap-2.5 bg-slate-50/10 pl-16">
                        {category.articles.map((art) => {
                          const isActiveArticle = activeArticle?.slug === art.slug;
                          return (
                            <Link
                              key={art.slug}
                              href={`/article/${art.slug}`}
                              className={`text-sm py-1 pl-3 border-l transition-all ${isActiveArticle
                                ? 'font-bold text-primary-600 border-primary-500 pl-3'
                                : 'text-slate-500 hover:text-slate-900 border-slate-200 hover:border-slate-400'
                                }`}
                            >
                              {art.title}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Right Content Area */}
          <main className="lg:col-span-8">
            {activeArticle === null ? (
              /* CATEGORY VIEW: Lists all sub-items/articles as cards */
              <div className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Articles in this section</h2>
                  <p className="text-slate-500 text-sm mt-1">Select an article below to read detailed step-by-step instructions.</p>
                </div>

                {activeCategory.articles.map((art) => (
                  <Link
                    key={art.slug}
                    href={`/article/${art.slug}`}
                    className="group block bg-white rounded-2xl border border-slate-200 shadow-sm p-6 border-l-4 border-l-primary-500 hover:shadow-md transition-all hover:translate-x-1 duration-200 cursor-pointer"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                          {art.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {art.description}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              /* ARTICLE VIEW: Displays detailed step-by-step documentation */
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 md:p-10">
                  <Link
                    href={`/article/${activeCategory.slug}`}
                    className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm mb-6 hover:text-primary-700 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to {activeCategory.title}
                  </Link>

                  <h1 className="text-2xl md:text-3.5xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
                    {activeArticle.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-8 pb-6 border-b border-slate-100">
                    <span className="font-semibold text-slate-600 uppercase tracking-wider">{activeCategory.title}</span>
                    <span>•</span>
                    <span>Updated 2 days ago</span>
                    <span>•</span>
                    <span>5 min read</span>
                  </div>

                  {/* Article content container */}
                  <div className="prose prose-slate max-w-none">
                    <p className="text-base text-slate-600 leading-relaxed mb-6">
                      Welcome to the comprehensive guide on <strong>{activeArticle.title.toLowerCase()}</strong>.
                      Follow the steps below to complete the configuration or review related details.
                    </p>

                    {/* Prerequisites block */}
                    {activeArticle.prerequisites && (
                      <div className="flex items-start gap-3.5 p-5 bg-primary-50 rounded-2xl border border-primary-100 mb-8">
                        <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-primary-900 text-sm mb-1">Prerequisites</h4>
                          <p className="text-primary-700 text-sm leading-relaxed">
                            {activeArticle.prerequisites}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Step list */}
                    {activeArticle.steps && (
                      <div className="space-y-6 mb-8">
                        {activeArticle.steps.map((step, idx) => (
                          <div key={idx} className="flex gap-4 items-start">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
                              {idx + 1}
                            </div>
                            <p className="text-slate-600 text-base leading-relaxed pt-0.5">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Screenshot visual mockup */}
                    {activeArticle.screenshot && (
                      <div className="my-8 rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 p-2 shadow-inner">
                        <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100/85 rounded-t-xl border-b border-slate-200">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                          <div className="text-xs text-slate-400 font-mono ml-2 truncate">https://console.nexus-platform.com/portal</div>
                        </div>
                        <img
                          src={activeArticle.screenshot}
                          alt={activeArticle.screenshotCaption || activeArticle.title}
                          className="w-full object-cover max-h-[350px] rounded-b-xl border border-slate-200/50"
                        />
                        {activeArticle.screenshotCaption && (
                          <p className="text-sm text-slate-500 text-center mt-2 italic">{activeArticle.screenshotCaption}</p>
                        )}
                      </div>
                    )}

                    {/* Explanation Points Block */}
                    {activeArticle.explanationPoints && (
                      <div className="my-8 p-6 bg-slate-50 rounded-2xl border border-slate-200/60">
                        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-primary-500 fill-primary-100" /> Key Explanation Points
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {activeArticle.explanationPoints.map((point, idx) => (
                            <div key={idx} className="space-y-1">
                              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                                {point.title}
                              </h4>
                              <p className="text-sm text-slate-600 leading-relaxed pl-3.5">
                                {point.detail}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interactive Live Samples */}
                    {activeArticle.sample && (
                      <div className="my-8">
                        {activeArticle.sample.type === 'form' && (
                          <InteractivePaymentForm title={activeArticle.sample.title} />
                        )}

                        {activeArticle.sample.type === 'table' && (
                          <div className="overflow-hidden rounded-2xl border border-slate-200">
                            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">{activeArticle.sample.title}</h4>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse text-sm md:text-base">
                                <thead>
                                  <tr className="bg-slate-100/50 text-slate-600 font-semibold border-b border-slate-200">
                                    {activeArticle.sample.data.headers.map((h: string, i: number) => (
                                      <th key={i} className="px-5 py-3">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                  {activeArticle.sample.data.rows.map((row: string[], i: number) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                      {row.map((cell: string, j: number) => (
                                        <td key={j} className="px-5 py-3 text-slate-600 font-medium">{cell}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {activeArticle.sample.type === 'receiving-account' && (
                          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl pointer-events-none"></div>
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                              <div>
                                <h4 className="font-bold text-slate-900 text-sm">{activeArticle.sample.title}</h4>
                                <p className="text-xs text-slate-400">Beneficiary: Payoneer Client Account</p>
                              </div>
                              <span className="text-xs font-bold bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full">USD</span>
                            </div>
                            <div className="space-y-3">
                              {Object.entries(activeArticle.sample.data).map(([key, value]: [string, any]) => (
                                <div key={key} className="flex justify-between items-center text-sm">
                                  <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                  <span className="font-mono text-slate-800 font-semibold">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeArticle.sample.type === 'json' && (
                          <div className="bg-slate-900 rounded-2xl p-5 overflow-hidden">
                            <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-800 text-sm font-mono text-slate-500">
                              <span>{activeArticle.sample.title}</span>
                              <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded">JSON</span>
                            </div>
                            <pre className="text-slate-300 text-sm font-mono overflow-x-auto m-0">
                              <code>{JSON.stringify(activeArticle.sample.data, null, 2)}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Code block */}
                    {activeArticle.codeBlock && (
                      <div className="bg-slate-900 rounded-xl p-5 mb-8 relative group overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600"></div>
                        <pre className="text-slate-300 text-sm font-mono overflow-x-auto m-0">
                          <code>{activeArticle.codeBlock}</code>
                        </pre>
                      </div>
                    )}

                    {/* Troubleshooting list */}
                    {activeArticle.troubleshooting && (
                      <div className="mt-8 pt-8 border-t border-slate-100">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Troubleshooting Common Issues</h3>
                        <ul className="space-y-4">
                          {activeArticle.troubleshooting.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                              <div className="text-sm">
                                <span className="font-bold text-slate-800">{item.error}:</span>{' '}
                                <span className="text-slate-600">{item.solution}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Feedback bottom block */}
                <div className="bg-slate-50 border-t border-slate-100 p-8 md:p-10 flex flex-col items-center justify-center text-center">
                  {feedbackSubmitted ? (
                    <div className="space-y-2 py-4">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                      <h4 className="text-lg font-bold text-green-900">Thank you for your feedback!</h4>
                      <p className="text-slate-500 text-sm">Your vote helps us improve our support center resources.</p>
                    </div>
                  ) : (
                    <>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">Was this article helpful?</h4>
                      <p className="text-slate-500 text-sm mb-6">Your feedback helps us improve our support center.</p>
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => setFeedbackSubmitted(true)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all shadow-sm cursor-pointer"
                        >
                          <ThumbsUp className="w-4 h-4" /> Yes, it helped
                        </button>
                        <Link
                          href={`/contact?category=${activeCategory.slug}&article=${activeArticle.slug}`}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm cursor-pointer"
                        >
                          <ThumbsDown className="w-4 h-4" /> No, I need help
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
