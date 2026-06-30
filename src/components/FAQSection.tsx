import React from 'react';
import { HelpCircle, MessageCircle, ChevronDown, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
  helpfulCount: number;
  isCode?: boolean;
}

interface FAQSectionProps {
  faqCategory: string;
  setFaqCategory: (cat: string) => void;
  openFaq: string | null;
  setOpenFaq: (q: string | null) => void;
  helpfulFeedback: Record<string, 'up' | 'down'>;
  setHelpfulFeedback: React.Dispatch<React.SetStateAction<Record<string, 'up' | 'down'>>>;
  faqs: FaqItem[];
  categories: string[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqCategory,
  setFaqCategory,
  openFaq,
  setOpenFaq,
  helpfulFeedback,
  setHelpfulFeedback,
  faqs,
  categories,
}) => {
  const getFaqCount = (cat: string) => {
    return faqs.filter((f) => f.category === cat).length;
  };

  const filteredFaqs = faqs.filter((faq) => {
    return faq.category === faqCategory;
  });

  return (
    <div id="faq-section" className="w-full max-w-7xl scroll-mt-24">
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider mb-3">
          <HelpCircle className="w-3 h-3 text-primary-500" /> FAQ Desk
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3 flex items-center justify-center gap-3 text-slate-900">
          <MessageCircle className="text-primary-500 w-12 h-12" />
          Frequently Asked Questions
        </h2>
        <p className="text-slate-600 max-w-2xl text-base">
          Find answers to commonly asked questions about account settings, billing, API usage, limits, and service status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12 w-full">
        {/* Left Panel: Category List */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 sticky top-28">
            <h3 className="text-lg font-bold text-slate-900">Categories</h3>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = faqCategory === cat;
                const count = getFaqCount(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setFaqCategory(cat);
                      setOpenFaq(null); // Close active FAQ when changing categories
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap cursor-pointer transition-all duration-200 ${isActive
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200/60 text-slate-500'
                      }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel: Accordions */}
        <div className="lg:col-span-2 space-y-4">
          {filteredFaqs.map((faq, i) => {
            const isOpen = openFaq === faq.question;
            const feedback = helpfulFeedback[faq.question];
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                  ? 'border-primary-400 shadow-md shadow-primary-500/5'
                  : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                  }`}
              >
                {/* Question Header Button */}
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.question)}
                  className="w-full flex items-center justify-between p-6 cursor-pointer text-left focus:outline-none"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <h3 className={`text-base md:text-lg font-bold transition-colors ${isOpen ? 'text-primary-700' : 'text-slate-800'
                      }`}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-primary-100 text-primary-600' : 'bg-slate-50 text-slate-400'
                    }`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Answer Content - Smooth Transition Accordion */}
                <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}>
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 border-t border-slate-50 space-y-4">
                      {/* The Answer text */}
                      <div className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </div>

                      {/* Developer Mock Code Block */}
                      {faq.isCode && (
                        <pre className="bg-slate-900 rounded-xl p-4 overflow-x-auto border border-slate-800 shadow-inner font-mono text-xs text-slate-300 whitespace-pre">
                          {`fetch('https://api.nexus.com/v1/user', {
  headers: {
    'Authorization': 'Bearer <YOUR_API_KEY>'
  }
})
.then(res => res.json())
.then(data => console.log(data));`}
                        </pre>
                      )}

                      {/* Feedback row */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100/80 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-primary-500" />
                          {faq.helpfulCount + (feedback === 'up' ? 1 : 0)} people found this helpful
                        </span>
                        <div className="flex items-center gap-3">
                          {feedback ? (
                            <span className="text-primary-600 font-semibold animate-fade-in">Thanks for your feedback!</span>
                          ) : (
                            <>
                              <span>Was this helpful?</span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => setHelpfulFeedback(prev => ({ ...prev, [faq.question]: 'up' }))}
                                  className="p-1.5 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"
                                  title="Helpful"
                                >
                                  <ThumbsUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setHelpfulFeedback(prev => ({ ...prev, [faq.question]: 'down' }))}
                                  className="p-1.5 rounded-lg border border-slate-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                                  title="Not helpful"
                                >
                                  <ThumbsDown className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
