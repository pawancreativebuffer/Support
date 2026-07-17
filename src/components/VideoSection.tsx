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
    { id: 'M7lc1UVf-VE', title: "Getting Started with Ticket-it Platform", duration: "4:20", desc: "Learn the basics of setting up your Ticket-it account and navigating the support dashboard." },
    { id: 'tgbNymZ7vqY', title: "API Integration Masterclass", duration: "12:15", desc: "A deep dive into connecting our endpoints with your existing architecture." },
    { id: 'JGwWNGJdvx8', title: "Advanced Billing Setup", duration: "6:10", desc: "How to manage invoices, configure usage alerts, and add payment methods." },
    { id: 'dQw4w9WgXcQ', title: "Team Roles & Permissions", duration: "3:45", desc: "Set up role-based access control for your organization members securely." },
    { id: 'jNQXAC9IVRw', title: "Customizing User Profiles", duration: "2:30", desc: "How to personalize user avatars and preferences." },
    { id: '3JZ_D3ELwOQ', title: "Setting up Automated Workflows", duration: "8:45", desc: "A guide to building custom automated triggers and actions." },
  ];

  const [activeVideo, setActiveVideo] = useState<TutorialVideo>(tutorialVideos[0]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-10 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3 flex items-center justify-center gap-3">
          <Video className="text-primary-500 w-13 h-13" />
          How It Works
        </h2>
        <p className="text-slate-600 max-w-2xl">
          Watch our quick video tutorials to master the platform in minutes. Select a video from the playlist to start learning.
        </p>
      </div>

      <div className="flex flex-col gap-10 bg-white p-4 md:p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/40">
        {/* Main Video Player (Left: Video, Right: Details) */}
        <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
          <div className="relative w-full lg:w-2/3 aspect-video rounded-[1.5rem] overflow-hidden bg-slate-900 shadow-inner ring-1 ring-slate-200 flex-shrink-0">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&mute=0`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-full lg:w-1/3 flex flex-col justify-center px-2 py-4">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">{activeVideo.title}</h3>
            <p className="text-slate-600 mt-4 text-base md:text-lg leading-relaxed">{activeVideo.desc}</p>
          </div>
        </div>

        {/* Video Playlist (Bottom Horizontal Slider) */}
        <div className="w-full">
          <div className="flex items-center justify-between px-2 pb-4 mb-4 border-b border-slate-100">
             <div className="flex items-center gap-3">
               <h4 className="font-semibold text-slate-900 text-lg">
                 Up Next
               </h4>
               <span className="text-xs font-bold bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full">
                 {tutorialVideos.length} videos
               </span>
             </div>
             
             <div className="flex items-center gap-2">
               <button 
                 onClick={scrollLeft} 
                 className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-primary-600 transition-colors shadow-sm"
                 aria-label="Scroll left"
               >
                 <ChevronLeft className="w-5 h-5" />
               </button>
               <button 
                 onClick={scrollRight} 
                 className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-primary-600 transition-colors shadow-sm"
                 aria-label="Scroll right"
               >
                 <ChevronRight className="w-5 h-5" />
               </button>
             </div>
          </div>
          
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-6 pt-2 px-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
          >
            {tutorialVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`flex-shrink-0 relative w-[160px] sm:w-[200px] aspect-video rounded-xl cursor-pointer transition-all duration-300 border-[3px] snap-start overflow-hidden group ${
                  activeVideo.id === video.id
                    ? 'border-primary-500 shadow-lg shadow-primary-500/20 scale-[1.02]'
                    : 'border-transparent hover:border-slate-300 shadow-sm hover:scale-[1.02]'
                }`}
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 160px, 200px"
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
        </div>
      </div>
    </div>
  );
};
