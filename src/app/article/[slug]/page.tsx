"use client";

import * as React from 'react';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { CATEGORIES } from '../../../data/categories';
import { ArticleSidebar } from '../../../components/ArticleSidebar';
import { ArticleViewer } from '../../../components/ArticleViewer';

export default function ArticleDetail({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const resolvedParams = params instanceof Promise ? React.use(params) : params;
  const rawSlug = resolvedParams?.slug || 'how-to-setup-your-account';
  const normalizedSlug = decodeURIComponent(rawSlug).toLowerCase();

  const isNotFound = normalizedSlug === 'not-found';

  // Find active category and article
  let activeCategory = CATEGORIES.find(c =>
    c.slug.toLowerCase() === normalizedSlug ||
    c.alternativeSlugs?.some(alt => alt.toLowerCase() === normalizedSlug)
  ) || null;

  let activeArticle = null;

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

  if (!activeCategory) {
    activeCategory = CATEGORIES[0];
    activeArticle = null;
  }

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    [activeCategory.id]: true
  });

  // Keep track of the active category to update expanded categories state during render when page navigation occurs
  const [prevActiveCategoryId, setPrevActiveCategoryId] = useState(activeCategory.id);

  if (activeCategory.id !== prevActiveCategoryId) {
    setExpandedCategories(prev => ({
      ...prev,
      [activeCategory.id]: true
    }));
    setPrevActiveCategoryId(activeCategory.id);
  }

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  if (isNotFound) {
    return (
      <div className="bg-slate-50 min-h-[70vh] pb-12 flex flex-col items-center justify-center pt-24 px-6 text-center">
        <div className="max-w-lg bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">No Article Found</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            We couldn't find any articles matching your exact search query. Please try using different keywords or contact our technical support team directly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="flex items-center justify-center gap-2 text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 px-6 h-[46px] rounded-[8px] cursor-pointer w-full sm:w-auto">
              Back to Home
            </Link>
            <Link href="/contact" className="bg-primary-600 hover:bg-primary-500 text-white border border-transparent text-sm font-medium px-5 sm:px-8 h-[46px] flex items-center justify-center rounded-[8px] transition-all duration-300 cursor-pointer shadow-sm w-full sm:w-auto">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white pb-12">
      {/* Sub-header Banner */}
      <div className="relative w-full border-b border-primary-900/50 py-12 md:py-16 mb-10 overflow-hidden bg-slate-950">
        {/* Deep Theme-Colored Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-slate-950 to-blue-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900/40 via-transparent to-transparent" />

        {/* Elegant Grid Texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] pointer-events-none" />

        {/* Dynamic Theme Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] rounded-full bg-primary-600/25 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
        <div className="absolute top-[30%] left-[30%] w-[20%] h-[20%] rounded-full bg-primary-400/10 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-[15px]">
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs md:text-sm text-slate-400 font-medium mb-4">
            <Link href="/" className="hover:text-primary-400 transition-colors whitespace-nowrap">
              Support Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
            <Link
              href={`/article/${activeCategory.slug}`}
              className={`whitespace-nowrap ${!activeArticle ? 'text-white font-semibold' : 'hover:text-primary-400 transition-colors'}`}
            >
              {activeCategory.title}
            </Link>
            {activeArticle && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                <span className="text-white font-semibold truncate max-w-[140px] sm:max-w-[250px]">{activeArticle.title}</span>
              </>
            )}
          </nav>

          {/* Banner Title */}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {activeCategory.title}
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-[15px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Navigation Sidebar */}
          <ArticleSidebar
            categories={CATEGORIES}
            activeCategory={activeCategory}
            activeArticle={activeArticle}
            expandedCategories={expandedCategories}
            toggleCategory={toggleCategory}
          />

          {/* Right Viewer Content Area */}
          <main className="lg:col-span-8">
            <ArticleViewer
              activeCategory={activeCategory}
              activeArticle={activeArticle}
              feedbackSubmitted={feedbackSubmitted}
              setFeedbackSubmitted={setFeedbackSubmitted}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
