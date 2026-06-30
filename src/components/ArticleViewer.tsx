import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, Info, Zap, CheckCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Category, Article, TableData, ReceivingAccountData } from '../data/categories';
import { InteractivePaymentForm } from './InteractivePaymentForm';

interface ArticleViewerProps {
  activeCategory: Category;
  activeArticle: Article | null;
  feedbackSubmitted: boolean;
  setFeedbackSubmitted: (val: boolean) => void;
}

export const ArticleViewer: React.FC<ArticleViewerProps> = ({
  activeCategory,
  activeArticle,
  feedbackSubmitted,
  setFeedbackSubmitted,
}) => {
  if (activeArticle === null) {
    /* CATEGORY VIEW: Lists all sub-items/articles as cards */
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">Articles in this section</h2>
          <p className="text-slate-500 text-sm mt-1">Select an article below to read detailed step-by-step instructions.</p>
        </div>

        {activeCategory.articles.map((art) => (
          <Link
            key={art.slug}
            href={`/article/${art.slug}`}
            className="group block bg-white rounded-2xl border border-slate-200 shadow-sm p-6 border-l-4 border-l-primary-500 hover:shadow-md transition-all hover:translate-x-1 duration-200 cursor-pointer"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                  {art.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {art.description}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  /* ARTICLE VIEW: Displays detailed step-by-step documentation */
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-8 md:p-10">
        <Link
          href={`/article/${activeCategory.slug}`}
          className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm mb-6 hover:text-primary-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {activeCategory.title}
        </Link>

        <h1 className="text-2xl md:text-3.5xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
          {activeArticle.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-8 pb-6 border-b border-slate-100">
          <span className="font-semibold text-slate-600 uppercase tracking-wider">{activeCategory.title}</span>
          <span>•</span>
          <span>Updated 2 days ago</span>
          <span>•</span>
          <span>5 min read</span>
        </div>

        {/* Article content container */}
        <div className="prose prose-slate max-w-none">
          <p className="text-base text-slate-600 leading-relaxed mb-6">
            Welcome to the comprehensive guide on <strong>{activeArticle.title.toLowerCase()}</strong>.
            Follow the steps below to complete the configuration or review related details.
          </p>

          {/* Prerequisites block */}
          {activeArticle.prerequisites && (
            <div className="flex items-start gap-3.5 p-5 bg-primary-50 rounded-2xl border border-primary-100 mb-8">
              <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-primary-900 text-sm mb-1">Prerequisites</h4>
                <p className="text-primary-700 text-sm leading-relaxed">
                  {activeArticle.prerequisites}
                </p>
              </div>
            </div>
          )}

          {/* Step list */}
          {activeArticle.steps && (
            <div className="space-y-6 mb-8">
              {activeArticle.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-slate-600 text-base leading-relaxed pt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Screenshot visual mockup */}
          {activeArticle.screenshot && (
            <div className="my-8 rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 p-2 shadow-inner">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100/85 rounded-t-xl border-b border-slate-200">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                <div className="text-xs text-slate-400 font-mono ml-2 truncate">https://console.nexus-platform.com/portal</div>
              </div>
              <div className="relative w-full h-[350px]">
                <Image
                  src={activeArticle.screenshot}
                  alt={activeArticle.screenshotCaption || activeArticle.title}
                  fill
                  className="object-cover rounded-b-xl border border-slate-200/50"
                  sizes="(max-width: 768px) 100vw, 800px"
                  unoptimized
                />
              </div>
              {activeArticle.screenshotCaption && (
                <p className="text-sm text-slate-500 text-center mt-2 italic">{activeArticle.screenshotCaption}</p>
              )}
            </div>
          )}

          {/* Explanation Points Block */}
          {activeArticle.explanationPoints && (
            <div className="my-8 p-6 bg-slate-50 rounded-2xl border border-slate-200/60">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary-500 fill-primary-100" /> Key Explanation Points
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeArticle.explanationPoints.map((point, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                      {point.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed pl-3.5">
                      {point.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Live Samples */}
          {activeArticle.sample && (
            <div className="my-8">
              {activeArticle.sample.type === 'form' && (
                <InteractivePaymentForm title={activeArticle.sample.title} />
              )}

              {activeArticle.sample.type === 'table' && activeArticle.sample.data && (
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                    <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">{activeArticle.sample.title}</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm md:text-base">
                      <thead>
                        <tr className="bg-slate-100/50 text-slate-600 font-semibold border-b border-slate-200">
                          {(activeArticle.sample.data as TableData).headers.map((h: string, i: number) => (
                            <th key={i} className="px-5 py-3">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {(activeArticle.sample.data as TableData).rows.map((row: string[], i: number) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            {row.map((cell: string, j: number) => (
                              <td key={j} className="px-5 py-3 text-slate-600 font-medium">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeArticle.sample.type === 'receiving-account' && activeArticle.sample.data && (
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{activeArticle.sample.title}</h4>
                      <p className="text-xs text-slate-400">Beneficiary: Payoneer Client Account</p>
                    </div>
                    <span className="text-xs font-bold bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full">USD</span>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(activeArticle.sample.data as ReceivingAccountData).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-mono text-slate-800 font-semibold">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeArticle.sample.type === 'json' && activeArticle.sample.data && (
                <div className="bg-slate-900 rounded-2xl p-5 overflow-hidden">
                  <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-800 text-sm font-mono text-slate-500">
                    <span>{activeArticle.sample.title}</span>
                    <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded">JSON</span>
                  </div>
                  <pre className="text-slate-300 text-sm font-mono overflow-x-auto m-0">
                    <code>{JSON.stringify(activeArticle.sample.data, null, 2)}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Code block */}
          {activeArticle.codeBlock && (
            <div className="bg-slate-900 rounded-xl p-5 mb-8 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600"></div>
              <pre className="text-slate-300 text-sm font-mono overflow-x-auto m-0">
                <code>{activeArticle.codeBlock}</code>
              </pre>
            </div>
          )}

          {/* Troubleshooting list */}
          {activeArticle.troubleshooting && (
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Troubleshooting Common Issues</h3>
              <ul className="space-y-4">
                {activeArticle.troubleshooting.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <span className="font-bold text-slate-800">{item.error}:</span>{' '}
                      <span className="text-slate-600">{item.solution}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Feedback bottom block */}
      <div className="bg-slate-50 border-t border-slate-100 p-8 md:p-10 flex flex-col items-center justify-center text-center">
        {feedbackSubmitted ? (
          <div className="space-y-2 py-4">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            <h4 className="text-lg font-bold text-green-900">Thank you for your feedback!</h4>
            <p className="text-slate-500 text-sm">Your vote helps us improve our support center resources.</p>
          </div>
        ) : (
          <>
            <h4 className="text-lg font-bold text-slate-900 mb-1">Was this article helpful?</h4>
            <p className="text-slate-500 text-sm mb-6">Your feedback helps us improve our support center.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setFeedbackSubmitted(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all shadow-sm cursor-pointer"
              >
                <ThumbsUp className="w-4 h-4" /> Yes, it helped
              </button>
              <Link
                href={`/contact?category=${activeCategory.slug}&article=${activeArticle.slug}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm cursor-pointer"
              >
                <ThumbsDown className="w-4 h-4" /> No, I need help
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ArticleViewer;
