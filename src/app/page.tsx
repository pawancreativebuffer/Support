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
    { title: "Technical Support", icon: <Settings className="w-6 h-6 text-primary-600" />, description: "Get help with technical issues, bugs, and system errors from our engineering team." },
    { title: "Account & Billing", icon: <Shield className="w-6 h-6 text-primary-500" />, description: "Manage your subscription, invoices, and payment methods securely." },
    { title: "Performance Optimization", icon: <Zap className="w-6 h-6 text-primary-400" />, description: "Expert advice on optimizing your application for maximum speed and efficiency." },
    { title: "API Integrations", icon: <Layers className="w-6 h-6 text-primary-700" />, description: "Connect your app with third-party services smoothly with our dedicated integration support." },
    { title: "Live Chat Assistance", icon: <MessageCircle className="w-6 h-6 text-primary-500" />, description: "Chat directly with our support team in real-time for quick resolutions." },
    { title: "Developer Documentation", icon: <BookOpen className="w-6 h-6 text-primary-600" />, description: "Browse our detailed guides, tutorials, and comprehensive API references." },
  ];

  const searchTags = ["API Keys", "Billing", "Reset Password", "Deployment", "Webhooks"];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Banner Section with distinct background */}
      <section className="relative w-full bg-slate-50 border-b border-slate-200 pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden flex flex-col items-center">
        {/* Background Decorative Gradients (Light/Pastel) restricted to banner */}
        <div className="absolute top-[0%] left-[0%] w-[40%] h-[100%] rounded-full bg-primary-100/50 blur-[100px] pointer-events-none" />
        <div className="absolute top-[0%] right-[0%] w-[30%] h-[100%] rounded-full bg-primary-50/50 blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center mb-10 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 pb-2">
            How can we help you?
          </h1>
          <p className="text-lg text-slate-600 max-w-[600px] m-auto">
            Search our knowledge base or browse categories below to find exactly what you need.
          </p>
        </div>

        {/* Search Bar & Tags */}
        <div className="w-full max-w-2xl relative z-10 px-6">
          <div className="absolute -inset-2 bg-gradient-to-r from-primary-50 via-primary-100 to-primary-200 rounded-3xl blur-lg opacity-70"></div>
          <div className="relative flex items-center w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 focus-within:ring-2 focus-within:ring-primary-500/50 transition-all">
            <Search className="w-6 h-6 text-slate-400 ml-6" />
            <input
              type="text"
              placeholder="Search for articles, guides, or keywords..."
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-lg py-5 px-4 outline-none border-none"
            />
            <button className="mr-3 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors shadow-md shadow-primary-200 cursor-pointer">
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
      </section>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col items-center">

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
                className="relative flex flex-col p-6 rounded-3xl bg-white border border-slate-200 hover:border-primary-300 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-primary-100/50 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm mb-6">
                  {service.description}
                </p>
                <div className="mt-auto pt-4 flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white transition-all duration-300 shadow-md group-hover:bg-primary-700">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Tutorials Section */}
        <div className="w-full max-w-6xl mb-24">
          <div className="flex flex-col items-center mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 flex items-center justify-center gap-3 text-slate-900">
              <Video className="text-primary-500 w-8 h-8" />
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
                    className={`flex gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                      activeVideo.id === video.id 
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
        <div className="w-full max-w-6xl mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center justify-center gap-3 text-slate-900">
            <MessageCircle className="text-primary-500" />
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
