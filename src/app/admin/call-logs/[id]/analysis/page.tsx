"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Sparkles, ArrowLeft, Loader2, X, RefreshCw, Check, Copy } from 'lucide-react';

const formatPhoneNumber = (phone: string | null | undefined) => {
  if (!phone) return 'N/A';
  const cleaned = ('' + phone).replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
};

const renderTranscript = (transcript: string) => {
  return transcript.split('\n').map((line, idx) => {
    if (!line.trim()) return null;
    const isAgent = line.startsWith('Agent:');
    const isCustomer = line.startsWith('Customer:');
    if (isAgent || isCustomer) {
      const parts = line.split(':');
      const speaker = parts[0];
      const text = parts.slice(1).join(':').trim();
      return (
        <div key={idx} className={`mb-4 ${isAgent ? 'pl-3 border-l-2 border-primary-500' : 'pl-3 border-l-2 border-slate-300'}`}>
          <span className={`text-[11px] font-bold uppercase tracking-wider ${isAgent ? 'text-primary-600' : 'text-slate-500'}`}>{speaker}</span>
          <p className="text-sm text-slate-700 mt-1 leading-relaxed">{text}</p>
        </div>
      );
    }
    return <p key={idx} className="text-sm text-slate-500 mb-4 italic">{line}</p>;
  });
};

export default function AIAnalysisPage() {
  const params = useParams();
  const router = useRouter();
  const callLogId = params.id as string;
  
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchAnalysis = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/call-logs/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callLogId })
      });
      const data = await res.json();
      
      if (res.ok) {
        setAnalysisData(data);
      } else {
        setError(data.error || 'Failed to load analysis.');
      }
    } catch (err) {
      setError('Error connecting to AI analysis server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (callLogId) {
      fetchAnalysis();
    }
  }, [callLogId]);

  return (
    <div className="flex flex-col font-sans">
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-[15px] py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary-600" />
              AI Call Analysis
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              {analysisData?.callLog ? 
                `${analysisData.callLog.customer?.firstName ? analysisData.callLog.customer.firstName + ' ' + (analysisData.callLog.customer.lastName||'').trim() : (analysisData.analysis?.customerName || 'Unknown Caller')} (${formatPhoneNumber(analysisData.callLog.callerNumber)}) • ${new Date(analysisData.callLog.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}` 
                : 'Deep AI-generated insights for your call logs.'}
            </p>
          </div>

          <button
            onClick={() => router.push('/admin/call-logs')}
            className="flex items-center justify-center gap-2 text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 px-6 h-[46px] rounded-[8px] cursor-pointer bg-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Call Logs
          </button>
        </div>

      {/* Main Content */}
      <div className="w-full">
        {isLoading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-slate-500 space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
            <p className="font-semibold text-sm animate-pulse text-slate-600">Running Deep AI Analysis...</p>
          </div>
        ) : error ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 flex items-center justify-center rounded-full border border-rose-100">
              <X className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Analysis Failed</h3>
              <p className="text-slate-500 mt-1 max-w-sm">{error}</p>
            </div>
            <button 
              onClick={fetchAnalysis}
              className="mt-4 flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-sm"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
          </div>
        ) : analysisData?.analysis ? (
          <div className="space-y-6 animate-fade-in">
            {/* Top Row: Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* CSAT */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">CSAT Score</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-800">{analysisData.analysis.csatScore}</span>
                  <span className="text-sm font-medium text-slate-400">/ 10</span>
                </div>
              </div>

              {/* Satisfaction % */}
              {analysisData.analysis.csatPercentage && (
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Satisfaction</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-emerald-600">{analysisData.analysis.csatPercentage}</span>
                    <span className="text-xl font-bold text-emerald-600/50">%</span>
                  </div>
                </div>
              )}
              
              {/* Sentiment */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Customer Sentiment</span>
                <div>
                  <span className={`inline-flex px-3 py-1 rounded-[8px] text-sm font-medium ${
                    analysisData.analysis.sentiment === 'Positive' ? 'bg-emerald-100 text-emerald-700' :
                    analysisData.analysis.sentiment === 'Negative' ? 'bg-rose-100 text-rose-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {analysisData.analysis.sentiment}
                  </span>
                </div>
              </div>

              {/* Resolution */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Resolution Status</span>
                <div>
                  <span className={`inline-flex px-3 py-1 rounded-[8px] text-sm font-medium ${
                    analysisData.analysis.resolutionStatus?.toLowerCase().includes('resolved') ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {analysisData.analysis.resolutionStatus}
                  </span>
                </div>
              </div>

              {/* Risk */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Churn Risk</span>
                <div>
                  <span className={`inline-flex px-3 py-1 rounded-[8px] text-sm font-medium ${
                    analysisData.analysis.churnRisk === 'High' || analysisData.analysis.churnRisk === 'Critical' ? 'bg-red-100 text-red-700 border border-red-200' :
                    analysisData.analysis.churnRisk === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {analysisData.analysis.churnRisk} Risk
                  </span>
                </div>
              </div>

              {/* Churn Probability */}
              {analysisData.analysis.churnProbability && (
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Churn Prob.</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-rose-600">{analysisData.analysis.churnProbability}</span>
                    <span className="text-xl font-bold text-rose-600/50">%</span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column (Main Analysis) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Customer Query */}
                {analysisData.analysis.customerQuery && (
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 text-primary-600">Customer Query / Intent</h3>
                    <p className="text-slate-700 font-normal leading-relaxed text-sm">
                      {analysisData.analysis.customerQuery}
                    </p>
                  </div>
                )}

                {/* Summary */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3">Executive Summary</h3>
                  <div className="text-slate-600 font-normal leading-relaxed text-sm space-y-4">
                    {analysisData.analysis.aiSummary?.split('\n').map((para: string, i: number) => (
                       <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Agent Performance */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3">Agent Performance & Empathy</h3>
                  <div className="text-slate-600 font-normal leading-relaxed text-sm space-y-4">
                    {analysisData.analysis.agentPerformance?.split('\n').map((para: string, i: number) => (
                       <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

{/* Suggested Email */}
                {analysisData.analysis.suggestedEmail && (
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3">Suggested Email Reply</h3>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                       <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed font-sans">{analysisData.analysis.suggestedEmail}</p>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(analysisData.analysis.suggestedEmail);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="mt-4 w-full bg-primary-50 text-primary-600 hover:bg-primary-100 font-medium py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                  </div>
                )}

                {/* Raw Transcript (Collapsible or Scrollable) */}
                {analysisData.callLog?.transcript && (
                  <div className="bg-slate-50 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                     <div className="p-4 bg-white border-b border-slate-200">
                       <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Call Transcript</h3>
                     </div>
                     <div className="p-6 max-h-[400px] overflow-y-auto">
                        <div>
                           {renderTranscript(analysisData.callLog.transcript)}
                        </div>
                     </div>
                  </div>
                )}
              </div>

              {/* Right Column (Meta & Actions) */}
              <div className="space-y-6">
                {/* Client Details */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3">Client Details</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Name</span>
                      <span className="text-sm font-medium text-slate-800">
                        {analysisData.callLog.customer?.firstName 
                          ? `${analysisData.callLog.customer.firstName} ${analysisData.callLog.customer.lastName || ''}`.trim() 
                          : (analysisData.analysis?.customerName || 'Unknown Customer')}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</span>
                      <span className="text-sm font-medium text-slate-800">
                        {formatPhoneNumber(analysisData.callLog.callerNumber)}
                      </span>
                    </div>
                    {analysisData.callLog.customer?.email && (
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</span>
                        <span className="text-sm font-medium text-slate-800 break-all">
                          {analysisData.callLog.customer.email}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Call Details */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3">Call Details</h3>
                  <div className="space-y-5">
                    <div>
                      <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Issue Category</span>
                      <span className="text-sm font-semibold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg inline-block">{analysisData.analysis.issueCategory}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Priority</span>
                      <span className={`text-sm font-semibold px-3 py-1.5 rounded-lg inline-block ${
                        analysisData.analysis.priority === 'High' || analysisData.analysis.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                        analysisData.analysis.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {analysisData.analysis.priority}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Retention Strategy */}
                {analysisData.analysis.retentionStrategy && (
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 bg-gradient-to-br from-indigo-50 to-white border-l-4 border-l-indigo-500">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">Retention Strategy</h3>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {analysisData.analysis.retentionStrategy}
                    </p>
                  </div>
                )}

                {/* Action Items */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3">Action Items</h3>
                  {analysisData.analysis.actionItems && analysisData.analysis.actionItems.length > 0 ? (
                    <ul className="space-y-4">
                      {analysisData.analysis.actionItems.map((item: string, idx: number) => (
                        <li key={idx} className="flex gap-3 text-sm text-slate-700 items-start p-3 bg-primary-50/50 rounded-xl border border-primary-100/50">
                          <div className="w-6 h-6 shrink-0 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mt-0.5 shadow-sm">
                            <span className="text-[11px] font-bold">{idx + 1}</span>
                          </div>
                          <span className="leading-relaxed font-normal">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                       <p className="text-sm text-slate-500 italic">No action items pending.</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
    </div>
  );
}
