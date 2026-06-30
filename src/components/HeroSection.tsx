import React from 'react';
import { Search, Zap } from 'lucide-react';

interface HeroSectionProps {
  heroSearch: string;
  setHeroSearch: (value: string) => void;
  onSearch: () => void;
  onTagClick: (tag: string) => void;
  searchTags: string[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroSearch,
  setHeroSearch,
  onSearch,
  onTagClick,
  searchTags,
}) => {
  return (
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
                      onSearch();
                    }
                  }}
                  className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-lg md:text-xl py-6 px-4 outline-none border-none font-medium"
                />
                <button
                  onClick={onSearch}
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
                      onClick={() => onTagClick(tag)}
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
  );
};
