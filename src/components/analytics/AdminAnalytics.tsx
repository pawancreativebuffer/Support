"use client";

import React, { useEffect, useState } from 'react';
import { BarChart3, Users, Calendar, Award, AlertTriangle, Loader2, PieChart as PieChartIcon, ArrowRight, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#0ea5e9', '#f59e0b', '#10b981', '#f43f5e', '#8b5cf6'];

export default function AdminAnalytics({ email }: { email: string }) {
  const [data, setData] = useState<any>(null);

  // Date filter state (default 30 days ago to today)
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics?role=Admin&email=${email}&start=${startDate}T00:00:00Z&end=${endDate}T23:59:59Z`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-fade-in border-t border-slate-200 pt-6">
      {/* Header & Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary-600" /> Team Performance & Insights
          </h3>
          <p className="text-sm text-slate-500 mt-1">Real-time metrics on agent efficiency and client activity.</p>
        </div>
        <div className="flex items-center bg-white border border-slate-200 rounded-[8px] px-3 h-[46px] shadow-sm">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-transparent border-none text-sm font-medium text-slate-700 focus:ring-0 p-0 outline-none"
          />
          <div className="px-3 border-x border-slate-100 mx-3 h-full flex items-center">
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-transparent border-none text-sm font-medium text-slate-700 focus:ring-0 p-0 outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 text-slate-400">
          <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary-500" />
          <p className="text-sm font-semibold">Aggregating comprehensive insights...</p>
        </div>
      ) : data ? (
        <>
          {/* Top Row: Agent Leaderboard & Frequent Flyers */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {/* Agent Leaderboard */}
            <div className="bg-white border border-slate-200 rounded-[8px] p-6 shadow-sm">
              <h4 className="text-base font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-amber-500" /> Agent Leaderboard
              </h4>
              <div className="space-y-0 divide-y divide-slate-100">
                {data.agentStats?.map((agent: any, i: number) => (
                  <div key={agent.id} className="flex items-center justify-between py-4 hover:bg-slate-50 px-2 -mx-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 ${i === 0 ? 'bg-amber-50 text-amber-600 border-amber-200' : i === 1 ? 'bg-slate-50 text-slate-600 border-slate-200' : i === 2 ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-primary-50 text-primary-600 border-primary-100'}`}>
                        #{i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{agent.name}</p>
                        <p className="text-xs font-medium text-slate-500">{agent.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-6 text-center shrink-0">
                      <div>
                        <p className="text-xl font-bold text-slate-800">{agent.activeCount}</p>
                        <p className="text-[10px] uppercase font-bold text-slate-400">Active</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-emerald-600">{agent.resolvedCount}</p>
                        <p className="text-[10px] uppercase font-bold text-emerald-600/70">Resolved</p>
                      </div>
                    </div>
                  </div>
                ))}
                {data.agentStats?.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-8">No agents found.</p>
                )}
              </div>
            </div>

            {/* Frequent Flyers (Clients) */}
            <div className="bg-white border border-slate-200 rounded-[8px] p-6 shadow-sm flex flex-col">
              <h4 className="text-base font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-6">
                <AlertTriangle className="w-5 h-5 text-rose-500" /> Top Clients (Watchlist)
              </h4>
              <div className="space-y-0 divide-y divide-slate-100 flex-1 mt-[-8px]">
                {data.frequentClients?.map((client: any, i: number) => (
                  <div key={i} className="flex items-center justify-between py-4 hover:bg-slate-50 px-2 -mx-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold shrink-0">
                        {client.name.charAt(0)}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-slate-800 truncate">{client.name}</p>
                        <p className="text-xs font-medium text-slate-500 truncate">{client.email}</p>
                      </div>
                    </div>
                    <div className="text-center shrink-0 min-w-[3rem]">
                      <p className="text-xl font-bold text-rose-600">{client.ticketCount}</p>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Tickets</p>
                    </div>
                  </div>
                ))}
                {data.frequentClients?.length === 0 && (
                  <div className="flex items-center justify-center h-full text-sm text-slate-400 font-medium">No client tickets found.</div>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Row: Satisfaction & Categories & Status */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Satisfaction Metrics */}
            <div className="bg-white border border-slate-200 rounded-[8px] p-6 shadow-sm">
              <h4 className="text-base font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-6">
                <PieChartIcon className="w-5 h-5 text-primary-500" /> Channel Satisfaction (CSAT %)
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.satisfactionStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 100]} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="satisfaction" radius={[6, 6, 0, 0]} maxBarSize={40}>
                      {data.satisfactionStats?.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Priority Breakdown (Pie Chart) */}
            <div className="bg-white border border-slate-200 rounded-[8px] p-6 shadow-sm flex flex-col">
              <h4 className="text-base font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-1">
                <BarChart3 className="w-5 h-5 text-indigo-500" /> Tickets By Priority
              </h4>
              <p className="text-xs text-slate-500 mb-6">Distribution of tickets based on their urgency level.</p>
              <div className="flex-1 w-full flex items-center justify-center min-h-[250px]">
                {data.categoryData?.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {data.categoryData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-sm text-slate-400 font-medium">No priority data available.</p>
                )}
              </div>
            </div>

            {/* Status Breakdown (Pie Chart) */}
            <div className="bg-white border border-slate-200 rounded-[8px] p-6 shadow-sm flex flex-col">
              <h4 className="text-base font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-1">
                <Activity className="w-5 h-5 text-emerald-500" /> Tickets By Status
              </h4>
              <p className="text-xs text-slate-500 mb-6">Current operational state of support requests.</p>
              <div className="flex-1 w-full flex items-center justify-center min-h-[250px]">
                {data.statusData?.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {data.statusData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={['#3b82f6', '#f59e0b', '#10b981', '#64748b'][index % 4]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-sm text-slate-400 font-medium">No status data available.</p>
                )}
              </div>
            </div>

          </div>
        </>
      ) : null}
    </div>
  );
}
