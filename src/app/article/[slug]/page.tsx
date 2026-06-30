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

  return (
    <div className="bg-slate-50/50 pb-12">
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
