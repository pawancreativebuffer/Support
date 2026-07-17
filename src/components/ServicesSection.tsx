import React from 'react';
import { Ticket, MessageCircle, Users, Code, Activity, BookOpen, ArrowRight, Layers, Shield } from 'lucide-react';
import Link from 'next/link';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      title: "Ticketing & Help Desk",
      slug: "ticketing-helpdesk",
      icon: <Ticket className="w-7 h-7" />,
      description: "Manage, prioritize, and track customer support queries from creation to final resolution.",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      textColor: "text-orange-500 hover:text-orange-600",
    },
    {
      title: "Live Chat & Widgets",
      slug: "live-chat-widgets",
      icon: <MessageCircle className="w-7 h-7" />,
      description: "Embed responsive chat widgets and convert visitor chats directly to tickets in real-time.",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-500",
      textColor: "text-emerald-500 hover:text-emerald-600",
    },
    {
      title: "Agent & Team Routing",
      slug: "agent-team-routing",
      icon: <Users className="w-7 h-7" />,
      description: "Configure role access permissions, group departments, and establish round-robin routing rules.",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      textColor: "text-blue-500 hover:text-blue-600",
    },
    {
      title: "API & Developer Tools",
      slug: "api-integrations",
      icon: <Code className="w-7 h-7" />,
      description: "Integrate custom workflows using webhooks, REST API keys, and rate-limited developer channels.",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
      textColor: "text-rose-500 hover:text-rose-600",
    },
    {
      title: "System Status & Uptime",
      slug: "status-performance",
      icon: <Activity className="w-7 h-7" />,
      description: "Monitor service operational status and track response times against service level agreements.",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500",
      textColor: "text-purple-500 hover:text-purple-600",
    },
    {
      title: "Security & Compliance",
      slug: "security-compliance",
      icon: <Shield className="w-7 h-7" />,
      description: "Configure single sign-on, manage data retention policies, and verify HIPAA/SOC2 compliance configurations.",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      textColor: "text-cyan-600 hover:text-cyan-700",
    },
  ];

  return (
    <div id="solutions" className="w-full scroll-mt-24">
      <div className="flex flex-col items-center text-center mb-16 gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-normal shadow-sm">
          <Layers className="w-4 h-4 fill-primary-50 text-primary-500" /> Solutions
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight max-w-2xl mx-auto">
          Explore Specialized Teams.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <Link
            key={i}
            href={`/article/${service.slug}`}
            className="relative flex flex-col pt-24 pb-8 px-8 min-h-[260px] rounded-[2rem] bg-white border border-slate-100 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 group overflow-hidden"
          >
            {/* Top-Left Corner Icon Tab */}
            <div className={`absolute top-0 left-0 w-20 h-20 rounded-tl-[2rem] rounded-br-[2.5rem] flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${service.iconBg} ${service.iconColor}`}>
              <div className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                {service.icon}
              </div>
            </div>

            <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-slate-800 transition-colors duration-300 tracking-tight">
              {service.title}
            </h3>

            <p className="leading-relaxed text-base text-slate-500 mb-6 flex-grow">
              {service.description}
            </p>

            <div className="mt-auto flex items-center gap-1.5 text-base font-medium text-slate-900 transition-all duration-300 group-hover:gap-2 group-hover:text-black">
              Read more <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Link
          href="/article/ticketing-helpdesk"
          className="bg-primary-600 hover:bg-primary-500 text-white border border-transparent text-sm font-medium px-5 sm:px-8 h-[46px] inline-flex items-center justify-center gap-2 rounded-[8px] transition-all duration-300 cursor-pointer shadow-sm group"
        >
          View all services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
