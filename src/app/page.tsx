import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium text-indigo-300 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md">
          <span className="flex w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          Next.js + Tailwind CSS v4 Boilerplate
        </div>

        {/* Hero Title */}
        <h1 className="max-w-4xl mb-8 text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
          Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Beautiful</span> Web Apps Faster.
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-2xl mb-12 text-lg text-slate-400 sm:text-xl">
          Start your next project with a stunning foundation. Engineered with modern aesthetics, dark mode perfection, and smooth micro-interactions out of the box.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] active:scale-95"
          >
            Get Started Now
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-slate-300 transition-all duration-200 bg-slate-900/50 border border-slate-700/50 rounded-full backdrop-blur-md hover:bg-slate-800 hover:text-white hover:scale-105 active:scale-95"
          >
            Read Documentation
          </a>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 gap-6 mt-32 sm:grid-cols-3 max-w-5xl w-full">
          {[
            { title: "Next.js App Router", desc: "Leverage the latest routing features of React and Next.js." },
            { title: "Tailwind CSS v4", desc: "Lightning fast styling with the newest utility-first framework." },
            { title: "Premium Design", desc: "Pre-configured gradients, blur effects, and micro-animations." },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-start p-6 text-left transition-colors bg-slate-900/50 border border-slate-800/60 rounded-2xl backdrop-blur-sm hover:bg-slate-800/50 hover:border-slate-700/80">
              <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-lg bg-indigo-500/20 text-indigo-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-200">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
