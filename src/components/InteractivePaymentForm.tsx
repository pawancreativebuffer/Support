import React, { useState } from 'react';
import { CheckCircle, RefreshCw } from 'lucide-react';

interface InteractivePaymentFormProps {
  title: string;
}

export const InteractivePaymentForm: React.FC<InteractivePaymentFormProps> = ({ title }) => {
  const [appId, setAppId] = useState('tkt_live_987654');
  const [userEmail, setUserEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appId || !userEmail) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="my-8 bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 animate-fade-in">
      <h4 className="text-sm font-bold text-slate-800 mb-4">{title}</h4>
      {status === 'success' ? (
        <div className="bg-green-50/50 border border-green-200 rounded-2xl p-6 text-center space-y-3">
          <CheckCircle className="w-10 h-10 text-green-500 mx-auto" />
          <h5 className="font-bold text-green-900">Widget Connection Success!</h5>
          <p className="text-sm text-green-700">
            The Ticket-it widget successfully authenticated with App ID <code className="bg-green-100 px-1.5 py-0.5 rounded font-mono text-xs">{appId}</code> and identified visitor <code className="bg-green-100 px-1.5 py-0.5 rounded font-mono text-xs">{userEmail}</code>.
          </p>
          <button
            type="button"
            onClick={() => {
              setUserEmail('');
              setStatus('idle');
            }}
            className="text-sm font-semibold text-green-700 hover:text-green-800 underline cursor-pointer"
          >
            Reset Simulator
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-slate-700 mb-2 block">App ID</label>
            <input
              type="text"
              required
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              placeholder="e.g. tkt_live_987654"
              className="w-full h-[46px] px-3 bg-white border border-slate-200 rounded-[8px] text-sm text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-mono"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 block">Identify User Email</label>
              <input
                type="email"
                required
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="customer@example.com"
                className="w-full h-[46px] px-3 bg-white border border-slate-200 rounded-[8px] text-sm text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 block">Widget Theme Mode</label>
              <select className="w-full h-[46px] px-3 bg-white border border-slate-200 rounded-[8px] text-sm text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all">
                <option>System Default (Auto)</option>
                <option>Dark Glassmorphism</option>
                <option>Light Clean</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full h-[46px] bg-primary-600 hover:bg-primary-500 text-white border border-transparent text-sm font-medium rounded-[8px] transition-all duration-300 cursor-pointer shadow-sm disabled:bg-primary-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Testing connection...
              </>
            ) : 'Test Widget Connection'}
          </button>
        </form>
      )}
    </div>
  );
};
export default InteractivePaymentForm;
