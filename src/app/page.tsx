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
  const [faqCategory, setFaqCategory] = useState('ESL');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, 'up' | 'down'>>({});

  const categories = ['ESL', 'Paper Ticketing', 'Store Configuration', 'Ticket-Builder', 'Batches', 'Campaigns', 'LCD Management', 'General'];
  const searchTags = ["ESL", "Paper Ticketing", "Store Configuration", "Ticket-Builder", "Batches", "Campaigns", "LCD Management"];

  const handleTagClick = (tag: string) => {
    const slugMap: Record<string, string> = {
      "ESL": "esl-setup",
      "Paper Ticketing": "paper-ticketing",
      "Store Configuration": "store-configuration",
      "Ticket-Builder": "ticket-builder-guide",
      "Batches": "managing-batches",
      "Campaigns": "campaigns-management",
      "LCD Management": "lcd-management"
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
    if (query.includes('esl') || query.includes('electronic')) {
      router.push('/article/esl-setup');
    } else if (query.includes('paper') || query.includes('print')) {
      router.push('/article/paper-ticketing');
    } else if (query.includes('store') || query.includes('config')) {
      router.push('/article/store-configuration');
    } else if (query.includes('campaign') || query.includes('promo')) {
      router.push('/article/campaigns-management');
    } else if (query.includes('builder') || query.includes('template')) {
      router.push('/article/ticket-builder-guide');
    } else if (query.includes('lcd') || query.includes('display')) {
      router.push('/article/lcd-management');
    } else if (query.includes('batch')) {
      router.push('/article/managing-batches');
    } else {
      router.push('/article/getting-started');
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
