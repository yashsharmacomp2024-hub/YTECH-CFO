import React from 'react';
import {
  IndianRupee,
  Calculator,
  ShieldCheck,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Download,
  Building2,
} from 'lucide-react';
import { GSTSummary } from '../../types';

interface GSTIntelligenceViewProps {
  gst: GSTSummary | null;
  gstin?: string;
}

export const GSTIntelligenceView: React.FC<GSTIntelligenceViewProps> = ({
  gst,
  gstin = '27AAECY9876Q1Z5',
}) => {
  const taxableSales = gst?.taxableSales || 2480000;
  const taxablePurchases = gst?.taxablePurchases || 1310000;
  const gstCollected = gst?.gstCollected || 292800; // Output GST
  const itcAvailable = gst?.itcAvailable || 168000; // Input Tax Credit
  const netPayable = gst?.netGstPayable || 124800; // Net Liability

  const hsnBreakdown = gst?.hsnSummary || [
    { hsnCode: '998313', description: 'IT Consulting & SaaS Software Retainer', taxableValue: 1850000, rate: 18, igst: 166500, cgst: 83250, sgst: 83250 },
    { hsnCode: '998314', description: 'Cloud Infrastructure & Engineering Support', taxableValue: 630000, rate: 18, igst: 56700, cgst: 28350, sgst: 28350 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner with Net GST Liability Card (Section 13 requirement) */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono font-bold">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>GSTIN: {gstin}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            GSTR-3B Tax Intelligence & Liability Audit
          </h2>
          <p className="text-xs text-slate-400 max-w-lg">
            Real-time output GST on sales minus eligible Input Tax Credit (ITC) from verified supplier invoices.
          </p>
        </div>

        <div className="text-center bg-slate-900/90 px-8 py-5 rounded-2xl border border-slate-800 flex-shrink-0">
          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Estimated Net GST Payable
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1 font-mono tracking-tight">
            ₹{netPayable.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Due on 20th of the month</div>
        </div>
      </div>

      {/* Mandatory Statutory Notice (Section 13 requirement) */}
      <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 text-center font-medium italic">
        "Estimate only — verify with your CA/tax professional."
      </div>

      {/* 4 Key Pillars Grid (Section 13 exact values) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Output GST */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">GST Collected (Output Tax)</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
            ₹{gstCollected.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">From outward sales invoices</div>
        </div>

        {/* Input GST */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Input GST (ITC Credit)</div>
          <div className="text-2xl font-black text-emerald-700 mt-1 font-mono">
            ₹{itcAvailable.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Eligible under GSTR-2B</div>
        </div>

        {/* Taxable Sales */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Total Taxable Sales</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
            ₹{taxableSales.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">18% standard rate applied</div>
        </div>

        {/* Taxable Purchases */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Total Taxable Purchases</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
            ₹{taxablePurchases.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Verified vendor bills</div>
        </div>
      </div>

      {/* HSN Code Summary Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              HSN / SAC Outward Supplies Summary (GSTR-1 Draft)
            </h3>
            <p className="text-xs text-slate-500">Service accounting code classification</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-extrabold text-[10px]">
                <th className="py-3 px-4 font-sans">HSN/SAC</th>
                <th className="py-3 px-4 font-sans">Description</th>
                <th className="py-3 px-4 text-right font-sans">Taxable Value (₹)</th>
                <th className="py-3 px-4 text-center font-sans">Rate</th>
                <th className="py-3 px-4 text-right font-sans">IGST / CGST+SGST (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {hsnBreakdown.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-blue-700">{item.hsnCode}</td>
                  <td className="py-3 px-4 font-sans text-slate-700">{item.description}</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">
                    ₹{item.taxableValue.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center font-bold">{item.rate}%</td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-700">
                    ₹{(item.igst || (item.cgst + item.sgst)).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
