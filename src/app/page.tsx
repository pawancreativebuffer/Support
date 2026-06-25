"use client";

import { Search, ChevronRight, MessageCircle, Settings, Shield, Zap, BookOpen, Layers } from 'lucide-react';

export default function SupportPage() {
  const faqs = [
    { question: "How do I reset my password?", category: "Account" },
    { question: "Where can I find my billing history?", category: "Billing" },
    { question: "How to integrate the API?", category: "Developers" },
    { question: "Can I change my subscription plan?", category: "Pricing" },
    { question: "What happens if I exceed my usage limits?", category: "Usage" },
    { question: "Is there a status page for services?", category: "System" }
  ];

  const services = [
    { title: "Technical Support", icon: <Settings className="w-6 h-6 text-primary-600" />, description: "Get help with technical issues, bugs, and system errors from our engineering team." },
    { title: "Account & Billing", icon: <Shield className="w-6 h-6 text-blue-500" />, description: "Manage your subscription, invoices, and payment methods securely." },
    { title: "Performance Optimization", icon: <Zap className="w-6 h-6 text-sky-500" />, description: "Expert advice on optimizing your application for maximum speed and efficiency." },
    { title: "API Integrations", icon: <Layers className="w-6 h-6 text-indigo-500" />, description: "Connect your app with third-party services smoothly with our dedicated integration support." },
    { title: "Live Chat Assistance", icon: <MessageCircle className="w-6 h-6 text-primary-500" />, description: "Chat directly with our support team in real-time for quick resolutions." },
    { title: "Developer Documentation", icon: <BookOpen className="w-6 h-6 text-cyan-600" />, description: "Browse our detailed guides, tutorials, and comprehensive API references." },
  ];

  const searchTags = ["API Keys", "Billing", "Reset Password", "Deployment", "Webhooks"];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Decorative Gradients (Light/Pastel) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[100px] pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-[30%] h-[50%] rounded-full bg-sky-100/50 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center w-full mb-10 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 pb-2">
            How can we help you?
          </h1>
          <p className="text-md text-slate-600  max-w-[600px] m-auto">
            Search our knowledge base or browse categories below to find exactly what you need.
          </p>
        </div>

        {/* Search Bar & Tags */}
        <div className="w-full max-w-2xl mb-24 relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 via-primary-100 to-sky-100 rounded-3xl blur-lg opacity-70"></div>
          <div className="relative flex items-center w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 focus-within:ring-2 focus-within:ring-primary-500/50 transition-all">
            <Search className="w-6 h-6 text-slate-400 ml-6" />
            <input
              type="text"
              placeholder="Search for articles, guides, or keywords..."
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-lg py-5 px-4 outline-none border-none"
            />
            <button className="mr-3 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors shadow-md shadow-primary-200">
              Search
            </button>
          </div>

          {/* Predefined Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 relative z-5">
            {searchTags.map((tag, i) => (
              <button
                key={i}
                className="px-4 py-1.5 text-sm font-medium bg-white text-slate-600 cursor-pointer rounded-full border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 hover:scale-105 transition-all duration-300"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Services Section (Now Above FAQs) */}
        <div className="w-full max-w-6xl mb-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center justify-center gap-3 text-slate-900">
            <Layers className="text-primary-500" />
            Explore Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="relative p-6 rounded-3xl bg-white border border-slate-200 hover:border-primary-300 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-primary-100/50"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Predefined Questions / FAQ (Now Below Services) */}
        <div className="w-full max-w-4xl mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center justify-center gap-3 text-slate-900">
            <MessageCircle className="text-primary-500" />
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="group flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-200 hover:border-primary-300 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-primary-50"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold tracking-wider text-primary-600 uppercase">{faq.category}</span>
                  <h3 className="text-slate-800 font-medium group-hover:text-primary-900 transition-colors">{faq.question}</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
