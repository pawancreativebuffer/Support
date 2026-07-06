"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { VideoSection } from '../components/VideoSection';
import { FAQSection } from '../components/FAQSection';
import { faqs } from '../data/faqs';

export default function SupportPage() {
  const router = useRouter();
  const [heroSearch, setHeroSearch] = useState('');
  const [faqCategory, setFaqCategory] = useState('Account');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, 'up' | 'down'>>({});

  const categories = ['Account', 'Billing', 'Developers', 'Pricing', 'Usage', 'System', 'Security'];
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

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col items-center">
        {/* Services Bento Grid */}
        <ServicesSection />

        {/* Video Tutorials Section */}
        <VideoSection />

        {/* Predefined Questions / FAQ */}
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
