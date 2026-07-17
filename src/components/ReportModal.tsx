import React, { useState } from 'react';
import { X, FileText, Download, Filter } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { subDays, isAfter, parseISO } from 'date-fns';

interface TicketItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  category: string;
  description: string;
  status: string;
  agentId?: number | null;
  agent?: { id: number; name: string; email: string } | null;
  priority?: string;
  createdAt: string;
}

interface Agent {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: TicketItem[];
  agents: Agent[];
}

export default function ReportModal({ isOpen, onClose, tickets, agents }: ReportModalProps) {
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('all');
  const [status, setStatus] = useState<string>('All');
  const [priority, setPriority] = useState<string>('All');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  if (!isOpen) return null;

  const handleDownload = () => {
    let filtered = [...tickets];

    // Filter by Agent
    if (selectedAgent !== 'all') {
      const agentIdNum = parseInt(selectedAgent);
      filtered = filtered.filter(t => t.agentId === agentIdNum);
    }

    // Filter by Date Range
    const now = new Date();
    if (dateRange === 'weekly') {
      const oneWeekAgo = subDays(now, 7);
      filtered = filtered.filter(t => {
        const d = new Date(t.createdAt);
        return isAfter(d, oneWeekAgo);
      });
    } else if (dateRange === 'monthly') {
      const oneMonthAgo = subDays(now, 30);
      filtered = filtered.filter(t => {
        const d = new Date(t.createdAt);
        return isAfter(d, oneMonthAgo);
      });
    } else if (dateRange === 'custom' && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter(t => {
        const d = new Date(t.createdAt);
        return d >= start && d <= end;
      });
    }

    // Filter by Status
    if (status !== 'All') {
      filtered = filtered.filter(t => t.status === status);
    }

    // Filter by Priority
    if (priority !== 'All') {
      filtered = filtered.filter(t => t.priority === priority);
    }

    // Stats
    const total = filtered.length;
    const resolved = filtered.filter(t => t.status === 'Resolved' || t.status === 'Closed').length;
    const open = filtered.filter(t => t.status === 'Open').length;

    // Generate PDF
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text('Agent Performance & Ticket Report', 14, 22);

    // Summary
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    doc.setFontSize(11);
    doc.setTextColor(50);
    doc.text(`Filters Applied:`, 14, 40);
    doc.text(`- Agent: ${selectedAgent === 'all' ? 'All Agents' : agents.find(a => String(a.id) === selectedAgent)?.name || 'Unknown'}`, 20, 46);
    let dateRangeText = 'All Time';
    if (dateRange === 'weekly') dateRangeText = 'Last 7 Days';
    else if (dateRange === 'monthly') dateRangeText = 'Last 30 Days';
    else if (dateRange === 'custom') dateRangeText = `${startDate || 'Start'} to ${endDate || 'End'}`;

    doc.text(`- Date Range: ${dateRangeText}`, 20, 52);
    doc.text(`- Status: ${status}`, 20, 58);
    doc.text(`- Priority: ${priority}`, 20, 64);

    // Key Metrics
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(`Performance Summary`, 14, 76);

    doc.setFontSize(11);
    doc.text(`Total Tickets: ${total}`, 14, 84);
    doc.text(`Resolved/Closed: ${resolved}`, 60, 84);
    doc.text(`Open: ${open}`, 120, 84);

    // Table
    const tableColumn = ["Ticket ID", "Customer", "Date", "Priority", "Status"];
    const tableRows: any[] = [];

    filtered.forEach(ticket => {
      const ticketData = [
        ticket.id,
        `${ticket.firstName} ${ticket.lastName}`,
        new Date(ticket.createdAt).toLocaleDateString(),
        ticket.priority || 'N/A',
        ticket.status
      ];
      tableRows.push(ticketData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 94,
      theme: 'grid',
      styles: { fontSize: 9 },
      headStyles: { fillColor: [79, 70, 229] } // primary-600 roughly
    });

    doc.save('agent_performance_report.pdf');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 animate-fade-in">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center border border-primary-100">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Generate Report</h3>
              <p className="text-xs text-slate-500 mt-0.5">Download a filtered PDF report</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-700 rounded-[8px] transition-all cursor-pointer shadow-sm">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 flex-1 overflow-y-auto">
          {/* Agent Select */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium capitalize text-slate-700 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-primary-500" /> Select Agent
            </label>
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="w-full h-[46px] px-4 rounded-[8px] border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm text-slate-700"
            >
              <option value="all">All Agents</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name} ({agent.email})
                </option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div className="space-y-1.5">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium capitalize text-slate-700">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setDateRange('custom');
                  }}
                  className="w-full h-[46px] px-4 rounded-[8px] border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm text-slate-700"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium capitalize text-slate-700">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setDateRange('custom');
                  }}
                  className="w-full h-[46px] px-4 rounded-[8px] border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm text-slate-700"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium capitalize text-slate-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full h-[46px] px-4 rounded-[8px] border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="With Client">With Client</option>
              <option value="On Hold">On Hold</option>
              <option value="Escalated">Escalated</option>
              <option value="Closed">Closed</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Priority */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium capitalize text-slate-700">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full h-[46px] px-4 rounded-[8px] border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm text-slate-700"
            >
              <option value="All">All Priorities</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
          <button
            onClick={onClose}
            className="flex flex-1 items-center justify-center gap-2 text-sm text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 px-6 h-[46px] rounded-[8px] cursor-pointer bg-white disabled:opacity-50 disabled:cursor-not-allowed select-none"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            className="flex flex-1 items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white border border-transparent text-sm font-medium px-6 h-[46px] rounded-[8px] transition-all duration-300 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
