"use client";

import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, AlertTriangle, AlertCircle, Info, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'ALERT' | 'SUCCESS';
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsHistoryPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: number; role: string; email: string } | null>(null);

  // Date filters
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('nexus_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser({ ...parsed, id: parsed.id || 1 });
      } catch {
        // Handle error
      }
    }
  }, []);

  const fetchNotifications = async () => {
    if (!user) return;
    setLoading(true);
    try {
      let url = `/api/notifications?userId=${user.id}`;
      if (fromDate) url += `&from=${fromDate}`;
      if (toDate) url += `&to=${toDate}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.notifications) {
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user, fromDate, toDate]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'WARNING': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'ALERT': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="flex flex-col font-sans">

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-[15px] py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-6 h-6 text-primary-600" />
              Notification History
            </h1>
            <p className="text-slate-500 mt-1 text-sm">View all your alerts, messages, and warnings.</p>
          </div>

          <Link
            href={user?.role === 'Admin' ? '/admin' : user?.role === 'Agent' ? '/agent' : '/dashboard'}
            className="flex items-center justify-center gap-2 text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 px-6 h-[46px] rounded-[8px] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">Date From</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full pl-9 pr-4 h-[46px] bg-slate-50 border border-slate-300 rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">Date To</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full pl-9 pr-4 h-[46px] bg-slate-50 border border-slate-300 rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>
          <button
            onClick={() => { setFromDate(''); setToDate(''); }}
            className="bg-primary-600 hover:bg-primary-500 text-white border border-transparent text-sm font-medium px-6 h-[46px] flex items-center justify-center rounded-[8px] transition-all duration-300 cursor-pointer shadow-sm"
          >
            Clear Filters
          </button>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-500">Loading history...</div>
          ) : notifications.length > 0 ? (
            <ul className="divide-y divide-slate-100">
              {notifications.map((notif) => (
                <li key={notif.id} className={`p-6 flex gap-4 ${!notif.isRead ? 'bg-primary-50/20' : ''}`}>
                  <div className="flex-shrink-0 mt-1 bg-slate-50 w-10 h-10 rounded-full flex items-center justify-center border border-slate-100">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`text-base font-semibold ${!notif.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
                        {notif.title}
                      </h3>
                      <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded-full whitespace-nowrap">
                        {new Date(notif.createdAt).toLocaleDateString()} at {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                      {notif.message}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-16 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No notifications found</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                {fromDate || toDate
                  ? "There are no notifications matching your selected date range."
                  : "You don't have any notification history yet."}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
