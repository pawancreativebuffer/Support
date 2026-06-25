"use client";

import { useState } from 'react';
import { Search, ChevronRight, ArrowRight, MessageCircle, Settings, Shield, Zap, BookOpen, Layers, PlayCircle, Video } from 'lucide-react';

export default function SupportPage() {
  const tutorialVideos = [
    { id: 'M7lc1UVf-VE', title: "Getting Started with Nexus Platform", duration: "4:20", desc: "Learn the basics of setting up your Nexus account and navigating the dashboard." },
    { id: 'tgbNymZ7vqY', title: "API Integration Masterclass", duration: "12:15", desc: "A deep dive into connecting our endpoints with your existing architecture." },
    { id: 'JGwWNGJdvx8', title: "Advanced Billing Setup", duration: "6:10", desc: "How to manage invoices, configure usage alerts, and add payment methods." },
    { id: 'dQw4w9WgXcQ', title: "Team Roles & Permissions", duration: "3:45", desc: "Set up role-based access control for your organization members securely." },
  ];

  const [activeVideo, setActiveVideo] = useState(tutorialVideos[0]);

  const faqs = [
    { question: "How do I reset my password?", category: "Account" },
    { question: "Where can I find my billing history?", category: "Billing" },
    { question: "How to integrate the API?", category: "Developers" },
    { question: "Can I change my subscription plan?", category: "Pricing" },
    { question: "What happens if I exceed my usage limits?", category: "Usage" },
    { question: "Is there a status page for services?", category: "System" }
  ];

  const services = [
    { title: "Technical Support", icon: <Settings className="w-6 h-6 text-white" />, description: "Get elite help with technical issues and system errors. We're here 24/7.", span: "col-span-1 lg:col-span-2", bg: "bg-slate-900 border-slate-800", text: "text-slate-300", titleColor: "text-white", iconBg: "bg-white/10 border-white/20" },
    { title: "Account & Billing", icon: <Shield className="w-6 h-6 text-primary-600" />, description: "Manage your invoices and payments securely.", span: "col-span-1 lg:col-span-1", bg: "bg-white border-slate-200", text: "text-slate-600", titleColor: "text-slate-900", iconBg: "bg-slate-50 border-slate-100" },
    { title: "Performance", icon: <Zap className="w-6 h-6 text-primary-700" />, description: "Optimize your app for maximum speed.", span: "col-span-1 lg:col-span-1", bg: "bg-primary-50 border-primary-100", text: "text-primary-700", titleColor: "text-primary-900", iconBg: "bg-white border-primary-200" },
    { title: "API Integrations", icon: <Layers className="w-6 h-6 text-primary-600" />, description: "Connect with third-party services smoothly.", span: "col-span-1 lg:col-span-2", bg: "bg-white border-slate-200", text: "text-slate-600", titleColor: "text-slate-900", iconBg: "bg-slate-50 border-slate-100" },
    { title: "Live Chat", icon: <MessageCircle className="w-6 h-6 text-white" />, description: "Chat directly with our team in real-time.", span: "col-span-1 lg:col-span-2", bg: "bg-primary-600 border-primary-500", text: "text-primary-100", titleColor: "text-white", iconBg: "bg-white/20 border-white/30" },
    { title: "Documentation", icon: <BookOpen className="w-6 h-6 text-primary-600" />, description: "Browse our detailed guides and tutorials.", span: "col-span-1 lg:col-span-1", bg: "bg-white border-slate-200", text: "text-slate-600", titleColor: "text-slate-900", iconBg: "bg-slate-50 border-slate-100" },
  ];

  const searchTags = ["API Keys", "Billing", "Reset Password", "Deployment", "Webhooks"];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero / Banner Section - Redesigned Asymmetric Layout */}
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
                    className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-lg md:text-xl py-6 px-4 outline-none border-none font-medium"
                  />
                  <button className="mr-3 px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-transform active:scale-95 shadow-lg shadow-primary-600/30 cursor-pointer">
                    Search
                  </button>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Trending searches</p>
                  <div className="flex flex-wrap gap-2">
                    {searchTags.map((tag, i) => (
                      <button
                        key={i}
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

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col items-center">

        {/* Services Bento Grid */}
        <div className="w-full max-w-7xl mb-32">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider mb-3">
                <Layers className="w-3 h-3 text-primary-500" /> Solutions
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Explore specialized teams.
              </h2>
            </div>
            <button className="hidden lg:flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 cursor-pointer group px-5 py-2.5 bg-primary-50 rounded-full">
              View all services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className={`relative flex flex-col p-8 min-h-[280px] rounded-[2rem] border ${service.bg} ${service.span} hover:scale-[1.02] transition-transform duration-300 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-primary-900/10 group overflow-hidden`}
              >
                {/* Decorative element for the big dark card */}
                {i === 0 && <div className="absolute -right-20 -top-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />}

                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 shadow-sm relative z-10 ${service.iconBg}`}>
                  {service.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-3 relative z-10 ${service.titleColor}`}>{service.title}</h3>
                <p className={`leading-relaxed text-base relative z-10 ${service.text}`}>
                  {service.description}
                </p>
                <div className="mt-auto pt-4 flex justify-end relative z-10">
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 shadow-sm
                    ${i === 0 || i === 4 ? 'bg-white/10 border-white/20 text-white group-hover:bg-white group-hover:text-primary-900' : 'bg-primary-600 border-primary-600 text-white group-hover:bg-primary-700'}`}>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Tutorials Section */}
        <div className="w-full max-w-7xl mb-24">
          <div className="flex flex-col items-center mb-10 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3 flex items-center justify-center gap-3 text-slate-900">
              <Video className="text-primary-500 w-13 h-13" />
              How It Works
            </h2>
            <p className="text-slate-600 max-w-2xl">Watch our quick video tutorials to master the platform in minutes. Select a video from the playlist to start learning.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 bg-white p-4 md:p-6 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40">
            {/* Main Video Player (Left) */}
            <div className="w-full lg:w-2/3 flex flex-col gap-4">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-inner ring-1 ring-slate-200">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&mute=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="px-2 pb-2">
                <h3 className="text-2xl font-bold text-slate-900">{activeVideo.title}</h3>
                <p className="text-slate-600 mt-2 leading-relaxed">{activeVideo.desc}</p>
              </div>
            </div>

            {/* Video Playlist (Right) */}
            <div className="w-full lg:w-1/3 flex flex-col max-h-[500px] overflow-y-auto pr-2 rounded-xl">
              <h4 className="font-semibold text-slate-900 px-2 pb-3 mb-2 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                Playlist
                <span className="text-xs font-bold bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full">
                  {tutorialVideos.length} videos
                </span>
              </h4>
              <div className="flex flex-col gap-2">
                {tutorialVideos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className={`flex gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-300 border-2 ${activeVideo.id === video.id
                      ? 'border-primary-500 bg-primary-50 shadow-sm'
                      : 'border-transparent hover:bg-slate-50 hover:border-slate-200'
                      }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-32 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 group">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 flex items-center justify-center transition-colors ${activeVideo.id === video.id ? 'bg-black/10' : 'bg-black/30 group-hover:bg-black/20'}`}>
                        {activeVideo.id === video.id ? (
                          <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-md shadow-primary-600/50">
                            <PlayCircle className="w-4 h-4 fill-white" />
                          </div>
                        ) : (
                          <PlayCircle className="w-8 h-8 text-white opacity-90 drop-shadow-md group-hover:scale-110 transition-transform" />
                        )}
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded backdrop-blur-sm">
                        {video.duration}
                      </span>
                    </div>
                    {/* Info */}
                    <div className="flex flex-col justify-center flex-1">
                      <h4 className={`text-sm font-semibold line-clamp-2 leading-snug ${activeVideo.id === video.id ? 'text-primary-700' : 'text-slate-700'}`}>
                        {video.title}
                      </h4>
                      {activeVideo.id === video.id && (
                        <span className="text-xs text-primary-600 font-medium mt-1.5 flex items-center gap-1">
                          <PlayCircle className="w-3 h-3" /> Now Playing
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Predefined Questions / FAQ (Now Below Services) */}
        <div className="w-full max-w-7xl mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-8 flex items-center justify-center gap-3 text-slate-900">
            <MessageCircle className="text-primary-500 w-13 h-13" />
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
