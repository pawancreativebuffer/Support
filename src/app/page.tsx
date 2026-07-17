"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { VideoSection } from '../components/VideoSection';
import { FAQSection } from '../components/FAQSection';
import { faqs } from '../data/faqs';
import { CATEGORIES } from '../data/categories';

export default function SupportPage() {
  const router = useRouter();
  const [heroSearch, setHeroSearch] = useState('');
  const [faqCategory, setFaqCategory] = useState('Billing');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, 'up' | 'down'>>({});

  const categories = ['Billing', 'Account', 'Developers', 'Pricing', 'Usage', 'System', 'Security'];
  const searchTags = ["SSO & SAML", "API Authentication", "WhatsApp Integration", "SLA Policies", "Agent Roles"];

  const handleTagClick = (tag: string) => {
    const slugMap: Record<string, string> = {
      "SSO & SAML": "configuring-sso-saml",
      "API Authentication": "authenticating-api-requests",
      "WhatsApp Integration": "configuring-whatsapp-business",
      "SLA Policies": "setting-up-sla-policies",
      "Agent Roles": "roles-and-permissions"
    };
    const targetSlug = slugMap[tag];
    if (targetSlug) {
      router.push(`/article/${targetSlug}`);
    }
  };

  const handleHeroSearch = () => {
    const query = heroSearch.toLowerCase().trim();
    if (!query) return;

    // 1. Try to find direct match in all article titles/descriptions
    const allArticles = CATEGORIES.flatMap((cat) => cat.articles);
    const matchedArticle = allArticles.find(
      (art) =>
        art.title.toLowerCase().includes(query) ||
        art.description.toLowerCase().includes(query)
    );

    if (matchedArticle) {
      router.push(`/article/${matchedArticle.slug}`);
      return;
    }

    // 2. Fallback to hardcoded query groups
    if (query.includes('sso') || query.includes('saml')) {
      router.push('/article/configuring-sso-saml');
    } else if (query.includes('api') || query.includes('key') || query.includes('token') || query.includes('auth')) {
      router.push('/article/authenticating-api-requests');
    } else if (query.includes('whatsapp')) {
      router.push('/article/configuring-whatsapp-business');
    } else if (query.includes('sla') || query.includes('policy')) {
      router.push('/article/setting-up-sla-policies');
    } else if (query.includes('role') || query.includes('permission') || query.includes('member') || query.includes('team')) {
      router.push('/article/roles-and-permissions');
    } else if (query.includes('status') || query.includes('uptime') || query.includes('health') || query.includes('latency')) {
      router.push('/article/system-health-monitoring');
    } else if (query.includes('widget') || query.includes('embed') || query.includes('chat')) {
      router.push('/article/embedding-chat-widget');
    } else if (query.includes('survey') || query.includes('csat') || query.includes('satisfaction')) {
      router.push('/article/managing-csat-surveys');
    } else if (query.includes('shift') || query.includes('hours') || query.includes('schedule')) {
      router.push('/article/configuring-agent-shifts');
    } else if (query.includes('backup') || query.includes('export') || query.includes('retention') || query.includes('db')) {
      router.push('/article/database-backup-exports');
    } else if (query.includes('gdpr') || query.includes('privacy') || query.includes('delete') || query.includes('scrub')) {
      router.push('/article/data-privacy-gdpr-compliance');
    } else if (query.includes('ip') || query.includes('whitelist') || query.includes('mfa')) {
      router.push('/article/enforcing-ip-whitelisting-mfa');
    } else {
      router.push('/article/ticketing-helpdesk');
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero / Banner Section */}
      <HeroSection
        heroSearch={heroSearch}
        setHeroSearch={setHeroSearch}
        onSearch={handleHeroSearch}
        onTagClick={handleTagClick}
        searchTags={searchTags}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-[15px] py-16 flex flex-col items-center">
        {/* Services Bento Grid */}
        <ServicesSection />
      </div>

      {/* Video Tutorials Section - Full Width */}
      <div className="relative w-full bg-slate-50 py-20 border-y border-slate-200 overflow-hidden">
        {/* Technical Square Grid Texture & Gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] [background-size:48px_48px] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-100/90"></div>
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-[15px] flex flex-col items-center">
          <VideoSection />
        </div>
      </div>

      {/* Predefined Questions / FAQ */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-[15px] py-16 flex flex-col items-center">
        <FAQSection
          faqCategory={faqCategory}
          setFaqCategory={setFaqCategory}
          openFaq={openFaq}
          setOpenFaq={setOpenFaq}
          helpfulFeedback={helpfulFeedback}
          setHelpfulFeedback={setHelpfulFeedback}
          faqs={faqs}
          categories={categories}
        />
      </div>
    </div>
  );
}
