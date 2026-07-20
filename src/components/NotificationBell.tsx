"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Bell, Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'ALERT' | 'SUCCESS';
  isRead: boolean;
  createdAt: string;
}

export const NotificationBell: React.FC<{ userId: number; userRole: string }> = ({ userId, userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock initial notifications based on role
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`/api/notifications?userId=${userId}`);
        const data = await res.json();
        if (data.notifications) {
          setNotifications(data.notifications);
        }
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    fetchNotifications();
    // Poll every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      clearInterval(interval);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userId, userRole]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    try {
      await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, markAllRead: true })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'SUCCESS': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'WARNING': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'ALERT': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button - Same height (46px) and transparent border as SignOut */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary-600 border border-transparent hover:bg-slate-50 transition-colors w-[46px] h-[46px] rounded-[8px] cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className={`w-5 h-5 ${unreadCount > 0 ? 'animate-pulse text-primary-600' : ''}`} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>

      {/* Dropdown Modal */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[350px] bg-white border border-slate-200 shadow-2xl rounded-xl z-50 overflow-hidden animate-fade-in">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h3 className="font-bold text-slate-900">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs font-medium text-primary-600 hover:text-primary-700 cursor-pointer"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-[350px] overflow-y-auto">
            {notifications.length > 0 ? (
              <ul className="divide-y divide-slate-100">
                {notifications.map((notif) => (
                  <li 
                    key={notif.id} 
                    className={`p-4 hover:bg-slate-50 transition-colors flex gap-3 ${!notif.isRead ? 'bg-primary-50/30' : ''}`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {getIcon(notif.type)}
                    </div>
                    <div>
                      <h4 className={`text-sm font-semibold ${!notif.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
                        {notif.title}
                      </h4>
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                        {notif.message}
                      </p>
                      <span className="text-xs text-slate-400 mt-2 block">
                        {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-slate-500 text-sm flex flex-col items-center">
                <Bell className="w-8 h-8 text-slate-300 mb-2" />
                No new notifications
              </div>
            )}
          </div>
          
          <div className="p-3 border-t border-slate-100 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
            <Link href="/notifications" className="text-xs font-bold text-primary-600 w-full block">
              View All History
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
