import React from 'react';
import Link from 'next/link';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Category, Article, getCategoryIcon } from '../data/categories';

interface ArticleSidebarProps {
  categories: Category[];
  activeCategory: Category;
  activeArticle: Article | null;
  expandedCategories: Record<string, boolean>;
  toggleCategory: (catId: string) => void;
}

export const ArticleSidebar: React.FC<ArticleSidebarProps> = ({
  categories,
  activeCategory,
  activeArticle,
  expandedCategories,
  toggleCategory,
}) => {
  return (
    <aside className="lg:col-span-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {categories.map((category) => {
          const isExpanded = !!expandedCategories[category.id];
          const isActiveCategory = activeCategory.id === category.id;

          return (
            <div key={category.id} className="flex flex-col">
              {/* Category Header Button */}
              <button
                type="button"
                onClick={() => toggleCategory(category.id)}
                className={`w-full flex items-center justify-between p-5 text-left transition-all hover:bg-slate-50 cursor-pointer ${
                  isActiveCategory ? 'bg-primary-50/20' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isActiveCategory ? 'bg-primary-100 text-primary-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {getCategoryIcon(category.id)}
                  </div>
                  <span className={`text-sm md:text-base font-bold transition-colors ${
                    isActiveCategory ? 'text-primary-700' : 'text-slate-700'
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
                        className={`text-sm py-1 pl-3 border-l transition-all ${
                          isActiveArticle
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
  );
};
export default ArticleSidebar;
