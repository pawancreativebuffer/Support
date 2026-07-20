import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import Link from 'next/link';
import { CATEGORIES, getCategoryIcon } from '../data/categories';

export const ServicesSection: React.FC = () => {
  return (
    <div id="solutions" className="w-full scroll-mt-24">
      <div className="flex flex-col items-center text-center mb-16 gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-normal shadow-sm">
          <Layers className="w-4 h-4 fill-primary-50 text-primary-500" /> Solutions
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight max-w-2xl mx-auto">
          Browse Ticket-IT Solutions.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {CATEGORIES.slice(0, 9).map((category) => (
          <Link
            key={category.id}
            href={`/article/${category.articles[0]?.slug || category.slug}`}
            className="relative flex flex-col pt-24 pb-8 px-8 min-h-[260px] rounded-[2rem] bg-white border border-slate-100 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 group overflow-hidden"
          >
            {/* Top-Left Corner Icon Tab */}
            <div className={`absolute top-0 left-0 w-20 h-20 rounded-tl-[2rem] rounded-br-[2.5rem] flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${category.theme.iconBg} ${category.theme.iconColor}`}>
              <div className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                {getCategoryIcon(category.iconName, "w-7 h-7")}
              </div>
            </div>

            <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-slate-800 transition-colors duration-300 tracking-tight">
              {category.title}
            </h3>

            <p className="leading-relaxed text-base text-slate-500 mb-6 flex-grow">
              {category.description}
            </p>

            <div className="mt-auto flex items-center gap-1.5 text-base font-medium text-slate-900 transition-all duration-300 group-hover:gap-2 group-hover:text-black">
              Read more <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Link
          href={`/article/${CATEGORIES[0]?.articles[0]?.slug || 'esl-setup'}`}
          className="bg-primary-600 hover:bg-primary-500 text-white border border-transparent text-sm font-medium px-5 sm:px-8 h-[46px] inline-flex items-center justify-center gap-2 rounded-[8px] transition-all duration-300 cursor-pointer shadow-sm group"
        >
          View all topics <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
