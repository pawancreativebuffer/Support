import React, { useState } from 'react';
import { Search, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CATEGORIES } from '../data/categories';

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
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const allArticles = CATEGORIES.flatMap((cat) => cat.articles);
  const filteredArticles =
    heroSearch.trim() === ''
      ? []
      : allArticles.filter(
        (art) =>
          art.title.toLowerCase().includes(heroSearch.toLowerCase()) ||
          art.description.toLowerCase().includes(heroSearch.toLowerCase())
      );

  const handleArticleSelect = (article: typeof allArticles[0]) => {
    setHeroSearch(article.title);
    router.push(`/article/${article.slug}`);
  };

  const borderClass = isFocused ? 'border-primary-500' : 'border-slate-200';
  const isDropdownVisible = showDropdown && heroSearch.trim() !== '';

  return (
    <section className="relative w-full border-b border-primary-900/50 py-20 md:py-24 overflow-hidden bg-slate-950">
      {/* Deep Theme-Colored Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-slate-950 to-blue-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900/40 via-transparent to-transparent" />

      {/* Elegant Grid Texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] pointer-events-none" />

      {/* Dynamic Theme Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] rounded-full bg-primary-600/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] left-[30%] w-[20%] h-[20%] rounded-full bg-primary-400/10 blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-[15px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-sm font-normal shadow-sm shadow-slate-900 cursor-pointer backdrop-blur-sm">
            <Zap className="w-4 h-4 fill-primary-400 text-primary-400" /> Fast & Intelligent Support
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Find answers. <br />
            <span className="text-primary-500">
              Fix problems.
            </span>
          </h1>
          <p className="text-base text-slate-300 max-w-lg leading-relaxed">
            Skip the wait. Search our intelligent knowledge base or browse our interactive guides to resolve issues instantly.
          </p>
        </div>

        {/* Right: Glassmorphism Search Console */}
        <div className="relative w-full max-w-2xl lg:max-w-full mx-auto lg:ml-auto">
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 md:p-8 shadow-2xl shadow-black/50">
            <div className="flex flex-col gap-6">
              <div
                className={`relative w-full bg-white border-2 transition-all duration-200 z-20 p-2.5 sm:p-3 ${borderClass} ${isDropdownVisible ? 'rounded-t-2xl' : 'rounded-2xl shadow-inner'
                  }`}
              >
                {/* Input Wrapper */}
                <div className="relative flex items-center w-full bg-transparent">
                  <Search className="w-7 h-7 text-slate-400 ml-3 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Ask anything (e.g. API keys)..."
                    value={heroSearch}
                    onChange={(e) => {
                      setHeroSearch(e.target.value);
                      setShowDropdown(true);
                    }}
                    onFocus={() => {
                      setIsFocused(true);
                      setShowDropdown(true);
                    }}
                    onBlur={() => {
                      setIsFocused(false);
                      setTimeout(() => setShowDropdown(false), 250);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onSearch();
                      }
                    }}
                    className="no-global-style flex-1 bg-transparent text-slate-900 placeholder-slate-400 text-lg md:text-xl py-2 px-2 outline-none border-none font-medium min-w-0"
                  />
                  <button
                    onClick={onSearch}
                    className="bg-primary-600 hover:bg-primary-500 text-white border border-transparent text-sm font-medium px-8 h-[48px] flex items-center justify-center rounded-[8px] transition-all duration-300 cursor-pointer shadow-md shrink-0"
                  >
                    Search
                  </button>
                </div>

                {/* Suggestions Dropdown */}
                {isDropdownVisible && (
                  <div
                    className={`absolute left-[-2px] right-[-2px] top-full bg-white border-2 border-t-0 ${borderClass} rounded-b-2xl shadow-2xl z-50 overflow-hidden transition-all duration-200`}
                  >
                    <div className="max-h-60 overflow-y-auto">
                      {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => (
                          <button
                            key={article.slug}
                            onMouseDown={() => handleArticleSelect(article)}
                            className="w-full text-left px-5 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 flex flex-col gap-1 cursor-pointer"
                          >
                            <span className="font-semibold text-slate-800">{article.title}</span>
                            <span className="text-xs text-slate-500 line-clamp-1">{article.description}</span>
                          </button>
                        ))
                      ) : (
                        <div className="px-5 py-6 text-slate-500 text-sm font-semibold bg-white text-center">
                          No results found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Trending searches</p>
                <div className="flex flex-wrap gap-2">
                  {searchTags.map((tag, i) => (
                    <button
                      key={i}
                      onClick={() => onTagClick(tag)}
                      className="px-4 py-2 text-sm font-normal bg-white text-slate-900 cursor-pointer rounded-[8px] border border-transparent shadow-sm hover:shadow-md hover:bg-slate-100 hover:-translate-y-0.5 transition-all duration-300"
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
