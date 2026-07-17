import React, { useState, useRef } from 'react';
import { Video, PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface TutorialVideo {
  id: string;
  title: string;
  duration: string;
  desc: string;
}

export const VideoSection: React.FC = () => {
  const tutorialVideos: TutorialVideo[] = [
    { id: 'M7lc1UVf-VE', title: "Getting Started with Ticket-it Platform", duration: "4:20", desc: "Learn the fundamentals of setting up your Ticket-it account. This comprehensive guide covers workspace creation, profile setup, and navigating the main support dashboard to get your team up and running in minutes." },
    { id: 'tgbNymZ7vqY', title: "API Integration Masterclass", duration: "12:15", desc: "A deep dive into connecting our secure REST endpoints with your existing architecture. We will cover authentication protocols, webhook configuration, and handling rate limits to ensure a seamless two-way data sync." },
    { id: 'JGwWNGJdvx8', title: "Advanced Billing Setup", duration: "6:10", desc: "Take control of your organization's finances. Discover how to manage monthly invoices, configure automated usage alerts to prevent overages, and add multiple payment methods for backup billing." },
    { id: 'dQw4w9WgXcQ', title: "Team Roles & Permissions", duration: "3:45", desc: "Set up granular, role-based access control for your organization. Learn how to assign admin, agent, and viewer roles to securely manage who can view, edit, or delete sensitive customer support tickets." },
    { id: 'jNQXAC9IVRw', title: "Customizing User Profiles", duration: "2:30", desc: "Enhance your team's presence by personalizing user avatars, updating display names, and configuring individual timezone preferences so your support hours are always accurately reflected." },
    { id: '3JZ_D3ELwOQ', title: "Setting up Automated Workflows", duration: "8:45", desc: "Save hours of manual work by building custom automated triggers and actions. We walk through setting up auto-replies, ticket routing based on keywords, and SLA breach escalations." },
    { id: 'LXb3EKWsInQ', title: "Understanding Analytics", duration: "5:15", desc: "Unlock the power of your data. Learn how to read your primary support metrics, generate custom performance reports, and export your dashboard data to CSV for external stakeholder review." },
    { id: 'V-_O7nl0Ii0', title: "Live Chat Integration", duration: "11:20", desc: "Embed our highly responsive live chat widget directly into your customer-facing website. We cover styling the widget to match your brand and setting up pre-chat forms to gather user context." },
    { id: 'aqz-KE-bpKQ', title: "Security Best Practices", duration: "7:10", desc: "Ensure your workspace remains compliant while protecting sensitive customer data. This video covers enabling Two-Factor Authentication (2FA), setting IP whitelists, and managing API key rotation." },
    { id: 'y8Yv4pnO7qc', title: "Mobile App Overview", duration: "4:05", desc: "Take your support operations on the go with our dedicated iOS and Android apps. Learn how to handle incoming tickets, receive push notifications for critical alerts, and collaborate with your team remotely." },
  ];

  const [activeVideo, setActiveVideo] = useState<TutorialVideo>(tutorialVideos[0]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-8 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-5">
          <Video className="text-primary-500 w-13 h-13" />
          How It Works
        </h2>
      </div>

      <div className="flex flex-col gap-10 bg-white p-4 md:p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/40">
        {/* Main Video Player (Left: Video, Right: Details) */}
        <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
          <div className="relative w-full lg:w-[60%] aspect-video rounded-[1.5rem] overflow-hidden bg-slate-900 shadow-inner ring-1 ring-slate-200 flex-shrink-0">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&mute=0`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-full lg:w-[40%] flex flex-col justify-center px-2 py-4">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">{activeVideo.title}</h3>
            <p className="text-slate-600 mt-3 text-base leading-relaxed">{activeVideo.desc}</p>
          </div>
        </div>

        {/* Video Playlist (Bottom Horizontal Slider) */}
        <div className="w-full">
          <div className="hidden">
             <div className="flex items-center gap-3">
               <h4 className="font-semibold text-slate-900 text-lg">
                 Up Next
               </h4>
               <span className="text-xs font-bold bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full">
                 {tutorialVideos.length} videos
               </span>
             </div>
          </div>
          
          <div className="relative group/slider w-full">
            <button 
              onClick={scrollLeft} 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-primary-600 transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex gap-3 overflow-x-auto py-1 px-4 snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden"
            >
              {tutorialVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className={`flex-shrink-0 relative w-[140px] sm:w-[170px] aspect-video rounded-xl cursor-pointer transition-all duration-300 border-2 snap-start overflow-hidden group ${
                    activeVideo.id === video.id
                      ? 'border-primary-500 scale-[1.03] z-10'
                      : 'border-transparent hover:border-slate-300 hover:scale-[1.03]'
                  }`}
                >
                  <Image
                    src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 140px, 170px"
                    unoptimized
                  />
                <div className={`absolute inset-0 flex items-center justify-center transition-colors ${activeVideo.id === video.id ? 'bg-black/10' : 'bg-black/30 group-hover:bg-black/10'}`}>
                  {activeVideo.id === video.id ? (
                    <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-600/50">
                      <PlayCircle className="w-5 h-5 fill-white" />
                    </div>
                  ) : (
                    <PlayCircle className="w-10 h-10 text-white opacity-90 drop-shadow-md group-hover:scale-110 transition-transform" />
                  )}
                </div>
                <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                  {video.duration}
                </span>
                {activeVideo.id === video.id && (
                  <span className="absolute top-1.5 left-1.5 bg-primary-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                    Playing
                  </span>
                )}
              </div>
            ))}
          </div>
            <button 
              onClick={scrollRight} 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-primary-600 transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
        </div>
        </div>
      </div>
    </div>
  );
};
