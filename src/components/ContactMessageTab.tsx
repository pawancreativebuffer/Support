import React, { useState } from 'react';
import { CheckCircle, Send, Shield, Clock, Lock, Activity } from 'lucide-react';
import { Topic } from '../data/topics';

interface ContactMessageTabProps {
  topics: Topic[];
  initialTopic: string;
}

export const ContactMessageTab: React.FC<ContactMessageTabProps> = ({ topics, initialTopic }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [comment, setComment] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);

  // Sync initialTopic from props by tracking previous prop value in state
  const [prevInitialTopic, setPrevInitialTopic] = useState(initialTopic);
  if (initialTopic !== prevInitialTopic) {
    setTopic(initialTopic);
    setPrevInitialTopic(initialTopic);
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !comment) return;

    setFormStatus('loading');
    setTimeout(() => {
      setTicketNumber(Math.floor(Math.random() * 900000) + 100000);
      setFormStatus('success');
    }, 1500);
  };

  return (
    <div className="py-2">
      {formStatus === 'success' ? (
        <div className="text-center py-12 space-y-4 animate-fade-in">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-900">Message Submitted!</h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            Thank you for contacting customer care. We have created support ticket <strong>#NX-{ticketNumber}</strong>. Our agents will respond to your registered email address within 24 hours.
          </p>
          <button
            type="button"
            onClick={() => {
              setFirstName('');
              setLastName('');
              setEmail('');
              setComment('');
              setFormStatus('idle');
              setTicketNumber(null);
            }}
            className="mt-6 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form */}
          <form onSubmit={handleFormSubmit} className="lg:col-span-8 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-xl font-bold text-slate-800">Please fill in the form and describe your issue:</h3>
            </div>

            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">First Name (letters only)</label>
                <input
                  type="text"
                  required
                  pattern="[A-Za-z\s]+"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Jane"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Last Name (letters only)</label>
                <input
                  type="text"
                  required
                  pattern="[A-Za-z\s]+"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Email Address & Topic Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. customer@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Relevant Topic / Category</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:bg-white focus:outline-none transition-colors"
                >
                  <option value="">-- Choose a Category --</option>
                  {topics.map((t) => (
                    <option key={t.slug} value={t.label}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comment Area */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-slate-600">Your question or comment:</label>
                <span className="text-xs text-slate-400 font-mono">{comment.length} / 1000 characters</span>
              </div>
              <textarea
                required
                maxLength={1000}
                rows={6}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Please detail your inquiry here..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary-500 focus:bg-white focus:outline-none resize-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={formStatus === 'loading'}
              className="w-full sm:w-auto px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl transition-all cursor-pointer disabled:bg-primary-400 flex items-center justify-center gap-2 shadow-sm"
            >
              {formStatus === 'loading' ? 'Submitting...' : (
                <>
                  <Send className="w-4 h-4" /> Submit Inquiry
                </>
              )}
            </button>
          </form>

          {/* Right Column: Sidebar Info Cards */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 border-l-4 border-l-primary-600 shadow-md shadow-slate-100/50 rounded-2xl p-6 space-y-6">
              <h4 className="font-extrabold text-slate-900 text-[16px] flex items-center gap-2 border-b border-slate-100 pb-3">
                <Shield className="w-5 h-5 text-primary-600" />
                Security & Response SLA
              </h4>

              <div className="space-y-5 text-[14px] text-slate-600 font-medium">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 text-[14px]">SLA Timeline</p>
                    <p className="mt-1 text-slate-500 text-[14px] font-normal">Tickets are processed by chronological arrival. Average response time is under 24 hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 text-[14px]">Encrypted Transit</p>
                    <p className="mt-1 text-slate-500 text-[14px] font-normal">Forms are fully secure. Data payloads are encrypted using SHA-256 SSL transit protocols.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 text-[14px]">Include details</p>
                    <p className="mt-1 text-slate-500 text-[14px] font-normal">Help us speed up resolution by including transaction IDs, merchant references, and dates in your comments.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ContactMessageTab;
