import React, { useState } from 'react';
import {
  Users,
  AlertTriangle,
  Send,
  CheckCircle2,
  Clock,
  IndianRupee,
  FileText,
  Mail,
  X,
  Sparkles,
} from 'lucide-react';
import { AgingBucket } from '../../types';

interface ReceivablesPayablesViewProps {
  aging: {
    receivables: AgingBucket[];
    payables: AgingBucket[];
    dso: number;
    dpo: number;
  } | null;
}

export const ReceivablesPayablesView: React.FC<ReceivablesPayablesViewProps> = ({
  aging,
}) => {
  const [selectedDebtor, setSelectedDebtor] = useState<{
    name: string;
    amount: number;
    daysOverdue: number;
    invoiceNo?: string;
    contact?: string;
  } | null>(null);
  const [reminderCopied, setReminderCopied] = useState(false);

  const defaultReceivablesAging: AgingBucket[] = [
    { range: '0-30 Days (Current)', amount: 210000, count: 5 },
    { range: '31-60 Days', amount: 130000, count: 2 },
    { range: '61-90 Days', amount: 80000, count: 1 },
    { range: '90+ Days (Critical)', amount: 0, count: 0 },
  ];

  const defaultPayablesAging: AgingBucket[] = [
    { range: '0-30 Days (Current)', amount: 480000, count: 6 },
    { range: '31-60 Days', amount: 140000, count: 2 },
    { range: '61-90 Days', amount: 0, count: 0 },
    { range: '90+ Days', amount: 0, count: 0 },
  ];

  const receivables = aging?.receivables || defaultReceivablesAging;
  const payables = aging?.payables || defaultPayablesAging;
  const dso = aging?.dso || 42;
  const dpo = aging?.dpo || 28;

  const sampleDebtors = [
    { name: 'Apex Industrial Logistics', amount: 130000, invoiceNo: 'INV-4021', daysOverdue: 45, contact: 'accounts@apexlogistics.in' },
    { name: 'Solaris Media Works', amount: 80000, invoiceNo: 'INV-4033', daysOverdue: 62, contact: 'finance@solarismedia.com' },
    { name: 'Nexus Cyber Systems', amount: 120000, invoiceNo: 'INV-4089', daysOverdue: 14, contact: 'billing@nexuscyber.in' },
    { name: 'Zenith Retails Pvt Ltd', amount: 90000, invoiceNo: 'INV-4095', daysOverdue: 8, contact: 'pay@zenithretail.com' },
  ];

  const handleCopyReminder = () => {
    setReminderCopied(true);
    setTimeout(() => setReminderCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Total Receivables</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">₹4.20L</div>
          <div className="text-[11px] text-amber-700 font-bold mt-1">₹2.10L Overdue past 30 days</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Days Sales Outstanding (DSO)</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">{dso} Days</div>
          <div className="text-[11px] text-slate-500 mt-1">Target benchmark: &lt; 35 days</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Total Payables</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">₹6.20L</div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">All in active payment grace</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Days Payable Outstanding (DPO)</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">{dpo} Days</div>
          <div className="text-[11px] text-slate-500 mt-1">Healthy working capital ratio</div>
        </div>
      </div>

      {/* Receivables Aging Schedule */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Accounts Receivable Aging Schedule (Debtors)
            </h3>
            <p className="text-xs text-slate-500">
              Categorized by invoice maturity buckets
            </p>
          </div>
          <span className="text-xs font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Action Recommended
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {receivables.map((bucket, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${
                idx >= 2
                  ? 'bg-rose-50/70 border-rose-200'
                  : idx === 1
                  ? 'bg-amber-50/70 border-amber-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-slate-600">{bucket.range}</div>
              <div className="text-lg font-black text-slate-900 mt-1 font-mono">
                ₹{bucket.amount.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{bucket.count} Invoices</div>
            </div>
          ))}
        </div>
      </div>

      {/* Outstanding Debtors Table with 1-Click Reminder Notice Generator */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Debtor Collection Prioritization
            </h3>
            <p className="text-xs text-slate-500">
              Generate instant CFO payment follow-up notices
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-extrabold text-[10px] tracking-wider">
                <th className="py-3 px-4">Client / Counterparty</th>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4 text-right">Amount Due (₹)</th>
                <th className="py-3 px-4 text-center">Overdue Days</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {sampleDebtors.map((debtor, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{debtor.name}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{debtor.invoiceNo}</td>
                  <td className="py-3.5 px-4 text-right font-black font-mono text-slate-900 text-sm">
                    ₹{debtor.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        debtor.daysOverdue > 30
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {debtor.daysOverdue} Days
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedDebtor(debtor)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] shadow-xs inline-flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Generate Notice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Reminder Notice Modal */}
      {selectedDebtor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-black text-slate-900">
                  Payment Reminder Notice
                </h3>
              </div>
              <button onClick={() => setSelectedDebtor(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-sans text-xs text-slate-800 space-y-2.5 leading-relaxed">
              <p>
                <strong>To:</strong> {selectedDebtor.name} ({selectedDebtor.contact})
              </p>
              <p>
                <strong>Subject:</strong> Formal Payment Reminder — Invoice #{selectedDebtor.invoiceNo} (Overdue {selectedDebtor.daysOverdue} Days)
              </p>
              <p className="pt-2 border-t border-slate-200">
                Dear Finance Team at {selectedDebtor.name},
              </p>
              <p>
                This is a courtesy follow-up regarding outstanding Invoice <strong>#{selectedDebtor.invoiceNo}</strong> in the amount of <strong>₹{selectedDebtor.amount.toLocaleString('en-IN')}</strong>, which was due {selectedDebtor.daysOverdue} days ago.
              </p>
              <p>
                Kindly remit the settlement to our bank account or reply with the scheduled payment date.
              </p>
              <p className="pt-1">
                Warm regards,<br />
                <strong>Finance & Accounts Team</strong><br />
                YTech CFO Demo
              </p>
            </div>

            <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100 mt-4">
              <button
                onClick={() => setSelectedDebtor(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={handleCopyReminder}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                {reminderCopied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-3.5 h-3.5" />
                    <span>Copy Letter</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
