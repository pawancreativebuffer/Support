"use client";

import { useState, useEffect } from 'react';
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
  const [faqCategory, setFaqCategory] = useState(CATEGORIES[0]?.title || 'Retail Automation & ESL');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, 'up' | 'down'>>({});

  useEffect(() => {
    const categoryFaqs = faqs.filter(faq => 
      faq.category === faqCategory ||
      faqCategory.toLowerCase().includes(faq.category.toLowerCase()) || 
      faq.category.toLowerCase().includes(faqCategory.toLowerCase())
    );
    if (categoryFaqs && categoryFaqs.length > 0) {
      setOpenFaq(categoryFaqs[0].question);
    } else {
      setOpenFaq(null);
    }
  }, [faqCategory]);

  const categories = CATEGORIES.map(c => c.title);
  
  // Real Trending Searches pulled from DB
  const [searchTags, setSearchTags] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/search')
      .then(res => res.json())
      .then(data => {
        if (data.tags && data.tags.length > 0) {
          // Capitalize the first letter of each tag for better UI
          const formattedTags = data.tags.map((t: string) => t.charAt(0).toUpperCase() + t.slice(1));
          setSearchTags(formattedTags);
        }
      })
      .catch(err => console.error("Failed to load trending tags", err));
  }, []);

  const performSearch = async (queryStr: string) => {
    const query = queryStr.toLowerCase().trim();
    if (!query) return;

    // Track search asynchronously so it doesn't block navigation
    fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword: query })
    }).catch(console.error);

    const allArticles = CATEGORIES.flatMap((cat) => cat.articles);
    
    // 1. Try to find direct match in all article titles/descriptions
    const matchedArticle = allArticles.find(
      (art) =>
        art.title.toLowerCase().includes(query) ||
        art.description.toLowerCase().includes(query)
    );

    if (matchedArticle) {
      router.push(`/article/${matchedArticle.slug}?highlight=${encodeURIComponent(query)}`);
      return;
    }

    // 2. Try to match category title
    const matchedCategory = CATEGORIES.find((cat) => cat.title.toLowerCase().includes(query));
    if (matchedCategory && matchedCategory.articles.length > 0) {
      router.push(`/article/${matchedCategory.articles[0].slug}?highlight=${encodeURIComponent(query)}`);
      return;
    }

    // 3. Fallback to not-found page if completely lost
    router.push(`/article/not-found?q=${encodeURIComponent(query)}`);
  };

  const handleTagClick = (tag: string) => {
    setHeroSearch(tag);
    performSearch(tag);
  };

  const handleHeroSearch = () => {
    performSearch(heroSearch);
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
