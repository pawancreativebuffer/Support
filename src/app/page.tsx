"use client";

import { useState } from 'react';
import {
  Search, ArrowRight, MessageCircle, Settings, Shield,
  Zap, BookOpen, Layers, PlayCircle, Video, ChevronDown,
  HelpCircle, ThumbsUp, ThumbsDown, Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function SupportPage() {
  const tutorialVideos = [
    { id: 'M7lc1UVf-VE', title: "Getting Started with Nexus Platform", duration: "4:20", desc: "Learn the basics of setting up your Nexus account and navigating the dashboard." },
    { id: 'tgbNymZ7vqY', title: "API Integration Masterclass", duration: "12:15", desc: "A deep dive into connecting our endpoints with your existing architecture." },
    { id: 'JGwWNGJdvx8', title: "Advanced Billing Setup", duration: "6:10", desc: "How to manage invoices, configure usage alerts, and add payment methods." },
    { id: 'dQw4w9WgXcQ', title: "Team Roles & Permissions", duration: "3:45", desc: "Set up role-based access control for your organization members securely." },
  ];

  const [activeVideo, setActiveVideo] = useState(tutorialVideos[0]);
  const [heroSearch, setHeroSearch] = useState('');
  const [faqCategory, setFaqCategory] = useState('Account');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, 'up' | 'down'>>({});

  const faqs = [
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

  const categories = ['Account', 'Billing', 'Developers', 'Pricing', 'Usage', 'System'];

  const getFaqCount = (cat: string) => {
    return faqs.filter(f => f.category === cat).length;
  };

  const filteredFaqs = faqs.filter(faq => {
    return faq.category === faqCategory;
  });

  const handleTagClick = (tag: string) => {
    if (tag === 'API Keys' || tag === 'Webhooks') {
      setFaqCategory('Developers');
    } else if (tag === 'Billing') {
      setFaqCategory('Billing');
    } else if (tag === 'Reset Password') {
      setFaqCategory('Account');
    } else if (tag === 'Deployment') {
      setFaqCategory('System');
    }
    setTimeout(() => {
      document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleHeroSearch = () => {
    const query = heroSearch.toLowerCase();
    if (query.includes('api') || query.includes('key') || query.includes('webhook') || query.includes('developer') || query.includes('integrate')) {
      setFaqCategory('Developers');
    } else if (query.includes('bill') || query.includes('invoice') || query.includes('pay') || query.includes('tax')) {
      setFaqCategory('Billing');
    } else if (query.includes('pass') || query.includes('user') || query.includes('team') || query.includes('invite') || query.includes('mfa')) {
      setFaqCategory('Account');
    } else if (query.includes('plan') || query.includes('sub') || query.includes('trial') || query.includes('free') || query.includes('enterprise')) {
      setFaqCategory('Pricing');
    } else if (query.includes('limit') || query.includes('usage') || query.includes('alert')) {
      setFaqCategory('Usage');
    } else if (query.includes('status') || query.includes('server') || query.includes('patch') || query.includes('security')) {
      setFaqCategory('System');
    }
    setTimeout(() => {
      document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const services = [
    { title: "Technical Support", icon: <Settings className="w-6 h-6 text-white" />, description: "Get elite help with technical issues and system errors. We're here 24/7.", span: "col-span-1 lg:col-span-2", bg: "bg-slate-900 border-slate-800", text: "text-slate-300", titleColor: "text-white", iconBg: "bg-white/10 border-white/20" },
    { title: "Account & Billing", icon: <Shield className="w-6 h-6 text-primary-600" />, description: "Manage your invoices and payments securely.", span: "col-span-1 lg:col-span-1", bg: "bg-white border-slate-200", text: "text-slate-600", titleColor: "text-slate-900", iconBg: "bg-slate-50 border-slate-100" },
    { title: "Performance", icon: <Zap className="w-6 h-6 text-primary-700" />, description: "Optimize your app for maximum speed.", span: "col-span-1 lg:col-span-1", bg: "bg-primary-50 border-primary-100", text: "text-primary-700", titleColor: "text-primary-900", iconBg: "bg-white border-primary-200" },
    { title: "API Integrations", icon: <Layers className="w-6 h-6 text-primary-600" />, description: "Connect with third-party services smoothly.", span: "col-span-1 lg:col-span-2", bg: "bg-white border-slate-200", text: "text-slate-600", titleColor: "text-slate-900", iconBg: "bg-slate-50 border-slate-100" },
    { title: "Live Chat", icon: <MessageCircle className="w-6 h-6 text-white" />, description: "Chat directly with our team in real-time.", span: "col-span-1 lg:col-span-2", bg: "bg-primary-600 border-primary-500", text: "text-primary-100", titleColor: "text-white", iconBg: "bg-white/20 border-white/30" },
    { title: "Documentation", icon: <BookOpen className="w-6 h-6 text-primary-600" />, description: "Browse our detailed guides and tutorials.", span: "col-span-1 lg:col-span-1", bg: "bg-white border-slate-200", text: "text-slate-600", titleColor: "text-slate-900", iconBg: "bg-slate-50 border-slate-100" },
  ];

  const searchTags = ["API Keys", "Billing", "Reset Password", "Deployment", "Webhooks"];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero / Banner Section - Redesigned Asymmetric Layout */}
      <section className="relative w-full bg-slate-50 border-b border-slate-200 pt-16 pb-24 md:pt-24 md:pb-24 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/60 via-slate-50 to-slate-50 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="flex flex-col items-start text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 border border-primary-200 text-primary-700 text-sm font-bold shadow-sm shadow-primary-100 cursor-pointer">
              <Zap className="w-4 h-4 fill-primary-500" /> Fast & Intelligent Support
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Find answers. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                Fix problems.
              </span>
            </h1>
            <p className="text-base text-slate-600 max-w-lg leading-relaxed">
              Skip the wait. Search our intelligent knowledge base or browse our interactive guides to resolve issues instantly.
            </p>
          </div>

          {/* Right: Glassmorphism Search Console */}
          <div className="relative w-full max-w-xl mx-auto lg:ml-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-400 to-primary-200 rounded-[2.5rem] blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative bg-white/60 backdrop-blur-2xl border border-white rounded-[2rem] p-6 md:p-8 shadow-2xl shadow-primary-900/10">
              <div className="flex flex-col gap-6">
                <div className="relative flex items-center w-full bg-white border-2 border-primary-100 rounded-2xl overflow-hidden shadow-inner focus-within:border-primary-500 transition-colors">
                  <Search className="w-7 h-7 text-primary-500 ml-6" />
                  <input
                    type="text"
                    placeholder="Ask anything (e.g. API keys)..."
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleHeroSearch();
                      }
                    }}
                    className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-lg md:text-xl py-6 px-4 outline-none border-none font-medium"
                  />
                  <button
                    onClick={handleHeroSearch}
                    className="mr-3 px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-transform active:scale-95 shadow-lg shadow-primary-600/30 cursor-pointer"
                  >
                    Search
                  </button>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Trending searches</p>
                  <div className="flex flex-wrap gap-2">
                    {searchTags.map((tag, i) => (
                      <button
                        key={i}
                        onClick={() => handleTagClick(tag)}
                        className="px-4 py-2 text-sm font-semibold bg-white text-slate-600 cursor-pointer rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col items-center">

        {/* Services Bento Grid */}
        <div id="solutions" className="w-full max-w-7xl mb-32 scroll-mt-24">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider mb-3">
                <Layers className="w-3 h-3 text-primary-500" /> Solutions
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Explore specialized teams.
              </h2>
            </div>
            <button className="hidden lg:flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 cursor-pointer group px-5 py-2.5 bg-primary-50 rounded-full">
              View all services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Link
                key={i}
                href={`/article/${service.title.toLowerCase().replace(/ /g, '-')}`}
                className={`relative flex flex-col p-8 min-h-[280px] rounded-[2rem] border ${service.bg} ${service.span} hover:scale-[1.02] transition-transform duration-300 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-primary-900/10 group overflow-hidden`}
              >
                {/* Decorative element for the big dark card */}
                {i === 0 && <div className="absolute -right-20 -top-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />}

                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 shadow-sm relative z-10 ${service.iconBg}`}>
                  {service.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-3 relative z-10 ${service.titleColor}`}>{service.title}</h3>
                <p className={`leading-relaxed text-base relative z-10 ${service.text}`}>
                  {service.description}
                </p>
                <div className="mt-auto pt-4 flex justify-end relative z-10">
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 shadow-sm
                    ${i === 0 || i === 4 ? 'bg-white/10 border-white/20 text-white group-hover:bg-white group-hover:text-primary-900' : 'bg-primary-600 border-primary-600 text-white group-hover:bg-primary-700'}`}>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Video Tutorials Section */}
        <div className="w-full max-w-7xl mb-24">
          <div className="flex flex-col items-center mb-10 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3 flex items-center justify-center gap-3 text-slate-900">
              <Video className="text-primary-500 w-13 h-13" />
              How It Works
            </h2>
            <p className="text-slate-600 max-w-2xl">Watch our quick video tutorials to master the platform in minutes. Select a video from the playlist to start learning.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 bg-white p-4 md:p-6 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40">
            {/* Main Video Player (Left) */}
            <div className="w-full lg:w-2/3 flex flex-col gap-4">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-inner ring-1 ring-slate-200">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&mute=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="px-2 pb-2">
                <h3 className="text-2xl font-bold text-slate-900">{activeVideo.title}</h3>
                <p className="text-slate-600 mt-2 leading-relaxed">{activeVideo.desc}</p>
              </div>
            </div>

            {/* Video Playlist (Right) */}
            <div className="w-full lg:w-1/3 flex flex-col max-h-[500px] overflow-y-auto pr-2 rounded-xl">
              <h4 className="font-semibold text-slate-900 px-2 pb-3 mb-2 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                Playlist
                <span className="text-xs font-bold bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full">
                  {tutorialVideos.length} videos
                </span>
              </h4>
              <div className="flex flex-col gap-2">
                {tutorialVideos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className={`flex gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-300 border-2 ${activeVideo.id === video.id
                      ? 'border-primary-500 bg-primary-50 shadow-sm'
                      : 'border-transparent hover:bg-slate-50 hover:border-slate-200'
                      }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-32 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 group">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 flex items-center justify-center transition-colors ${activeVideo.id === video.id ? 'bg-black/10' : 'bg-black/30 group-hover:bg-black/20'}`}>
                        {activeVideo.id === video.id ? (
                          <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-md shadow-primary-600/50">
                            <PlayCircle className="w-4 h-4 fill-white" />
                          </div>
                        ) : (
                          <PlayCircle className="w-8 h-8 text-white opacity-90 drop-shadow-md group-hover:scale-110 transition-transform" />
                        )}
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded backdrop-blur-sm">
                        {video.duration}
                      </span>
                    </div>
                    {/* Info */}
                    <div className="flex flex-col justify-center flex-1">
                      <h4 className={`text-sm font-semibold line-clamp-2 leading-snug ${activeVideo.id === video.id ? 'text-primary-700' : 'text-slate-700'}`}>
                        {video.title}
                      </h4>
                      {activeVideo.id === video.id && (
                        <span className="text-xs text-primary-600 font-medium mt-1.5 flex items-center gap-1">
                          <PlayCircle className="w-3 h-3" /> Now Playing
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Predefined Questions / FAQ (Now Below Services) */}
        <div id="faq-section" className="w-full max-w-7xl scroll-mt-24">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3 h-3 text-primary-500" /> FAQ Desk
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3 flex items-center justify-center gap-3 text-slate-900">
              <MessageCircle className="text-primary-500 w-12 h-12" />
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 max-w-2xl text-base">
              Find answers to commonly asked questions about account settings, billing, API usage, limits, and service status.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12 w-full">
            {/* Left Panel: Category List */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 sticky top-28">
                <h3 className="text-lg font-bold text-slate-900">Categories</h3>
                <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
                  {categories.map((cat) => {
                    const isActive = faqCategory === cat;
                    const count = getFaqCount(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setFaqCategory(cat);
                          setOpenFaq(null); // Close active FAQ when changing categories
                        }}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap cursor-pointer transition-all duration-200 ${isActive
                          ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                      >
                        <span>{cat}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200/60 text-slate-500'
                          }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Panel: Accordions */}
            <div className="lg:col-span-2 space-y-4">
              {filteredFaqs.map((faq, i) => {
                const isOpen = openFaq === faq.question;
                const feedback = helpfulFeedback[faq.question];
                return (
                  <div
                    key={i}
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                      ? 'border-primary-400 shadow-md shadow-primary-500/5'
                      : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                      }`}
                  >
                    {/* Question Header Button */}
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.question)}
                      className="w-full flex items-center justify-between p-6 cursor-pointer text-left focus:outline-none"
                    >
                      <div className="flex items-center gap-3 pr-4">
                        <h3 className={`text-base md:text-lg font-bold transition-colors ${isOpen ? 'text-primary-700' : 'text-slate-800'
                          }`}>
                          {faq.question}
                        </h3>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-primary-100 text-primary-600' : 'bg-slate-50 text-slate-400'
                        }`}>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    {/* Answer Content - Smooth Transition Accordion */}
                    <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}>
                      <div className="overflow-hidden">
                        <div className="p-6 pt-0 border-t border-slate-50 space-y-4">
                          {/* The Answer text */}
                          <div className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </div>

                          {/* Developer Mock Code Block */}
                          {faq.isCode && (
                            <pre className="bg-slate-900 rounded-xl p-4 overflow-x-auto border border-slate-800 shadow-inner font-mono text-xs text-slate-300 whitespace-pre">
                              {`fetch('https://api.nexus.com/v1/user', {
  headers: {
    'Authorization': 'Bearer <YOUR_API_KEY>'
  }
})
.then(res => res.json())
.then(data => console.log(data));`}
                            </pre>
                          )}

                          {/* Feedback row */}
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100/80 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-primary-500" />
                              {faq.helpfulCount + (feedback === 'up' ? 1 : 0)} people found this helpful
                            </span>
                            <div className="flex items-center gap-3">
                              {feedback ? (
                                <span className="text-primary-600 font-semibold animate-fade-in">Thanks for your feedback!</span>
                              ) : (
                                <>
                                  <span>Was this helpful?</span>
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      onClick={() => setHelpfulFeedback(prev => ({ ...prev, [faq.question]: 'up' }))}
                                      className="p-1.5 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"
                                      title="Helpful"
                                    >
                                      <ThumbsUp className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => setHelpfulFeedback(prev => ({ ...prev, [faq.question]: 'down' }))}
                                      className="p-1.5 rounded-lg border border-slate-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                                      title="Not helpful"
                                    >
                                      <ThumbsDown className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
