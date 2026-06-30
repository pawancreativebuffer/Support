import React, { useState } from 'react';
import { Video, PlayCircle } from 'lucide-react';
import Image from 'next/image';

interface TutorialVideo {
  id: string;
  title: string;
  duration: string;
  desc: string;
}

export const VideoSection: React.FC = () => {
  const tutorialVideos: TutorialVideo[] = [
    { id: 'M7lc1UVf-VE', title: "Getting Started with Nexus Platform", duration: "4:20", desc: "Learn the basics of setting up your Nexus account and navigating the dashboard." },
    { id: 'tgbNymZ7vqY', title: "API Integration Masterclass", duration: "12:15", desc: "A deep dive into connecting our endpoints with your existing architecture." },
    { id: 'JGwWNGJdvx8', title: "Advanced Billing Setup", duration: "6:10", desc: "How to manage invoices, configure usage alerts, and add payment methods." },
    { id: 'dQw4w9WgXcQ', title: "Team Roles & Permissions", duration: "3:45", desc: "Set up role-based access control for your organization members securely." },
  ];

  const [activeVideo, setActiveVideo] = useState<TutorialVideo>(tutorialVideos[0]);

  return (
    <div className="w-full max-w-7xl mb-24">
      <div className="flex flex-col items-center mb-10 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3 flex items-center justify-center gap-3">
          <Video className="text-primary-500 w-13 h-13" />
          How It Works
        </h2>
        <p className="text-slate-600 max-w-2xl">
          Watch our quick video tutorials to master the platform in minutes. Select a video from the playlist to start learning.
        </p>
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
                  <Image
                    src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
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
  );
};
