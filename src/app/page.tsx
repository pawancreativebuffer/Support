"use client";

import { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { VideoSection } from '../components/VideoSection';
import { FAQSection } from '../components/FAQSection';
import { faqs } from '../data/faqs';

export default function SupportPage() {
  const [heroSearch, setHeroSearch] = useState('');
  const [faqCategory, setFaqCategory] = useState('Account');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, 'up' | 'down'>>({});

  const categories = ['Account', 'Billing', 'Developers', 'Pricing', 'Usage', 'System'];
  const searchTags = ["API Keys", "Billing", "Reset Password", "Deployment", "Webhooks"];

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
