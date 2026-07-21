"use client";

import React, { useEffect, useState } from 'react';
import { BarChart3, Users, Calendar, CheckCircle, Clock, AlertTriangle, Loader2, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function AgentAnalytics({ email }: { email: string }) {
  const [data, setData] = useState<any>(null);
  
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
      const res = await fetch(`/api/analytics?role=Agent&email=${email}&start=${startDate}T00:00:00Z&end=${endDate}T23:59:59Z`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const performanceData = data ? [
    { name: 'Previous Period', resolved: data.prevResolvedCount },
    { name: 'Current Period', resolved: data.myResolvedCount }
  ] : [];

  return (
    <div className="space-y-6 animate-fade-in border-t border-slate-200 pt-6">
      {/* Header & Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary-600" /> My Performance Dashboard
          </h3>
          <p className="text-sm text-slate-500 mt-1">Track your resolution efficiency and monitor frequent clients.</p>
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
          <p className="text-sm font-semibold">Aggregating your performance data...</p>
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <div className="bg-white border border-slate-200 rounded-[8px] p-6 shadow-sm flex flex-col">
            <h4 className="text-base font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" /> Period Comparison (Resolved Tickets)
            </h4>
            <div className="grid grid-cols-3 gap-4 mb-8 mt-4">
               <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-100/60 shadow-sm flex flex-col items-center justify-center">
                  <p className="text-[11px] tracking-wider font-bold uppercase text-emerald-600 mb-1">Current</p>
                  <p className="text-3xl font-black">{data.myResolvedCount}</p>
               </div>
               <div className="bg-slate-50 text-slate-700 p-4 rounded-xl border border-slate-200/60 shadow-sm flex flex-col items-center justify-center">
                  <p className="text-[11px] tracking-wider font-bold uppercase text-slate-500 mb-1">Previous</p>
                  <p className="text-3xl font-black">{data.prevResolvedCount}</p>
               </div>
               <div className="bg-amber-50 text-amber-700 p-4 rounded-xl border border-amber-100/60 shadow-sm flex flex-col items-center justify-center">
                  <p className="text-[11px] tracking-wider font-bold uppercase text-amber-600 mb-1">Open Queue</p>
                  <p className="text-3xl font-black">{data.myOpenCount}</p>
               </div>
            </div>
            
            <div className="h-64 w-full mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="resolved" radius={[6, 6, 0, 0]} maxBarSize={80}>
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#cbd5e1' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Frequent Flyers (Clients) */}
          <div className="bg-white border border-slate-200 rounded-[8px] p-6 shadow-sm flex flex-col">
            <h4 className="text-base font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-rose-500" /> Frequent Flyers (Watchlist)
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
      ) : null}
    </div>
  );
}
