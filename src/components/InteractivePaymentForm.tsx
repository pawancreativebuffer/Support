import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface InteractivePaymentFormProps {
  title: string;
}

export const InteractivePaymentForm: React.FC<InteractivePaymentFormProps> = ({ title }) => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !amount) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="my-8 bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8">
      <h4 className="text-sm font-bold text-slate-800 mb-4">{title}</h4>
      {status === 'success' ? (
        <div className="bg-green-50/50 border border-green-200 rounded-2xl p-6 text-center space-y-3">
          <CheckCircle className="w-10 h-10 text-green-500 mx-auto" />
          <h5 className="font-bold text-green-900">Payment Initiated successfully!</h5>
          <p className="text-sm text-green-700">A transfer of ${amount} has been scheduled for {email}.</p>
          <button
            type="button"
            onClick={() => {
              setEmail('');
              setAmount('');
              setStatus('idle');
            }}
            className="text-sm font-semibold text-green-700 hover:text-green-800 underline cursor-pointer"
          >
            Send another payment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Recipient Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. supplier@example.com"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Amount (USD)</label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 500"
                min="1"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Transfer Speed</label>
              <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:outline-none">
                <option>Standard (1-2 days)</option>
                <option>Express (Instant)</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer disabled:bg-primary-400"
          >
            {status === 'loading' ? 'Processing...' : 'Send Payment'}
          </button>
        </form>
      )}
    </div>
  );
};
export default InteractivePaymentForm;
