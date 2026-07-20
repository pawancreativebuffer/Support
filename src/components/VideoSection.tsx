import React, { useState, useRef } from 'react';
import { Video, PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface TutorialVideo {
  id: string;
  title: string;
  duration: string;
  desc: string;
  platform?: 'youtube' | 'vimeo';
  thumbnailUrl?: string;
}

export const VideoSection: React.FC = () => {
  const tutorialVideos: TutorialVideo[] = [
    { id: '468744105', platform: 'vimeo', thumbnailUrl: '/thumbnails/468744105.png', title: "Four Reasons to Provide Ticket-IT To Your Stores", duration: "1:30", desc: "There are more than 4 reasons to provide Ticket-IT to your stores; but these are the ones that are most noteworthy. We hope that this quick video gives you a little bit more of an insight on the benefits of using our product." },
    { id: '409572495', platform: 'vimeo', thumbnailUrl: '/thumbnails/409572495.png', title: "Managing Product Lists", duration: "2:15", desc: "Using Ticket-IT is incredibly simple and efficient and we pride ourselves on that. Our product list editing allows users to influence the types of ticket templates in their batches with large amounts of control, while still keeping the data accurate and brand relevant." },
    { id: '364180087', platform: 'vimeo', thumbnailUrl: '/thumbnails/364180087.png', title: "Make In store Ticketing Simple", duration: "1:45", desc: "At Ticket-IT, this is what we do. We keep ticketing simple. We receive minimal support requests from our users. We have a simple solution that takes minimal training." },
    { id: '321384163', platform: 'vimeo', thumbnailUrl: '/thumbnails/321384163.png', title: "Getting Started With Your Datasource", duration: "3:20", desc: "Here’s a quick demonstration of how easy it is for your brand to use Ticket-IT to send batches to 100’s and 1000’s of stores in a very short amount of time. Ticket-IT’s accurate, effective workflow allows for our users to really get the most out of our system." }
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
          Ticket-IT Video Library
        </h2>
      </div>

      <div className="flex flex-col gap-10 bg-white p-4 md:p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/40">
        <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left: Main Video & Details */}
          <div className="w-full lg:w-[65%] flex flex-col gap-6">
            <div className="relative w-full aspect-video rounded-[1.5rem] overflow-hidden bg-slate-900 shadow-inner ring-1 ring-slate-200">
              {activeVideo.platform === 'vimeo' ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://player.vimeo.com/video/${activeVideo.id}?autoplay=1&muted=0`}
                  title={activeVideo.title}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&mute=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">{activeVideo.title}</h3>
              <p className="text-slate-600 mt-3 text-base leading-relaxed">{activeVideo.desc}</p>
            </div>
          </div>

          {/* Right: Vertical Playlist */}
          {/* Right: Vertical Playlist */}
          <div className="w-full lg:w-[35%] flex flex-col">
            <div className="px-2 pb-5 mb-5 border-b border-slate-200">
              <h4 className="font-semibold text-slate-900 text-lg flex items-center justify-between">
                Up Next
                <span className="text-xs font-bold bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full border border-primary-100">
                  {tutorialVideos.length} Videos
                </span>
              </h4>
            </div>
            
            <div className="flex flex-col gap-1.5 max-h-[480px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              {tutorialVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className={`flex gap-4 items-center p-2 rounded-2xl cursor-pointer transition-all duration-300 border-2 group ${
                    activeVideo.id === video.id
                      ? 'border-primary-500 bg-primary-50/50 shadow-sm'
                      : 'border-transparent hover:bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className="relative w-[120px] sm:w-[140px] aspect-video rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 ring-1 ring-slate-200/50">
                    <Image
                      src={video.thumbnailUrl || `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 120px, 140px"
                      unoptimized
                    />
                    <div className={`absolute inset-0 flex items-center justify-center transition-colors ${activeVideo.id === video.id ? 'bg-black/10' : 'bg-black/20 group-hover:bg-black/10'}`}>
                      {activeVideo.id === video.id ? (
                        <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-600/50">
                          <PlayCircle className="w-4 h-4 fill-white" />
                        </div>
                      ) : (
                        <PlayCircle className="w-8 h-8 text-white opacity-90 drop-shadow-md group-hover:scale-110 transition-transform" />
                      )}
                    </div>
                    <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                      {video.duration}
                    </span>
                  </div>
                  
                  <div className="flex flex-col justify-center py-1 pr-2">
                    <h5 className={`font-semibold text-sm line-clamp-2 leading-snug transition-colors ${activeVideo.id === video.id ? 'text-primary-700' : 'text-slate-800 group-hover:text-primary-600'}`}>
                      {video.title}
                    </h5>
                    {activeVideo.id === video.id && (
                      <span className="text-xs font-bold text-primary-500 mt-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                        Playing Now
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
