import React from 'react';
import {
  TrendingUp,
  PieChart,
  Layers,
  ArrowRight,
  Sparkles,
  IndianRupee,
  Activity,
} from 'lucide-react';
import { ProfitabilityMetrics } from '../../types';

interface ProfitabilityViewProps {
  metrics: ProfitabilityMetrics | null;
}

export const ProfitabilityView: React.FC<ProfitabilityViewProps> = ({ metrics }) => {
  const revenue = metrics?.revenue || 2480000;
  const cogs = metrics?.cogs || 1310000;
  const grossProfit = metrics?.grossProfit || 1170000;
  const grossMargin = metrics?.grossMargin || 47.2;
  const opex = metrics?.opex || 710000;
  const netProfit = metrics?.netProfit || 460000;
  const netMargin = metrics?.netMargin || 18.5;

  const topExpenses = metrics?.topExpenses || [
    { category: 'Salaries & Engineering Wages', amount: 320000, percentage: 45.1 },
    { category: 'Customer Acquisition & Ads', amount: 195000, percentage: 27.5 },
    { category: 'Office Infrastructure & Rent', amount: 80000, percentage: 11.3 },
    { category: 'Cloud Hosting & SaaS Subscriptions', amount: 65000, percentage: 9.2 },
    { category: 'Logistics & Operational Freight', amount: 50000, percentage: 7.0 },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Gross Profit Margin</div>
          <div className="text-2xl font-black text-blue-900 mt-1 font-mono">{grossMargin}%</div>
          <div className="text-[11px] text-slate-500 mt-1">₹{(grossProfit / 100000).toFixed(1)}L Gross Profit</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Net Profit Margin</div>
          <div className="text-2xl font-black text-emerald-700 mt-1 font-mono">{netMargin}%</div>
          <div className="text-[11px] text-slate-500 mt-1">₹{(netProfit / 100000).toFixed(1)}L Net Cash Profit</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Operating Expense Ratio</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
            {((opex / revenue) * 100).toFixed(1)}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">₹{(opex / 100000).toFixed(1)}L Monthly Overheads</div>
        </div>
      </div>

      {/* Waterfall Visual Breakdown (Section 11 requirement) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div>
          <h3 className="text-base font-black text-slate-900 tracking-tight">
            Revenue Allocation Waterfall
          </h3>
          <p className="text-xs text-slate-500">
            How ₹24.8 Lakhs of total monthly revenue converts into bottom-line profit
          </p>
        </div>

        {/* Step-by-Step Waterfall Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500">1. Revenue</div>
            <div className="text-lg font-black text-slate-900 mt-1">₹{(revenue / 100000).toFixed(1)}L</div>
            <div className="text-[10px] text-blue-600 font-bold mt-0.5">100% Base</div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500">2. COGS (Direct)</div>
            <div className="text-lg font-black text-slate-700 mt-1">₹{(cogs / 100000).toFixed(1)}L</div>
            <div className="text-[10px] text-slate-500 font-semibold mt-0.5">52.8% of Rev</div>
          </div>

          <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200">
            <div className="text-xs font-bold text-blue-800">3. Gross Margin</div>
            <div className="text-lg font-black text-blue-900 mt-1">₹{(grossProfit / 100000).toFixed(1)}L</div>
            <div className="text-[10px] text-blue-700 font-bold mt-0.5">47.2% Margin</div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500">4. Operating Overheads</div>
            <div className="text-lg font-black text-slate-700 mt-1">₹{(opex / 100000).toFixed(1)}L</div>
            <div className="text-[10px] text-slate-500 font-semibold mt-0.5">28.6% of Rev</div>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-300 col-span-2 sm:col-span-1">
            <div className="text-xs font-bold text-emerald-800">5. Net Profit</div>
            <div className="text-lg font-black text-emerald-950 mt-1">₹{(netProfit / 100000).toFixed(1)}L</div>
            <div className="text-[10px] text-emerald-700 font-black mt-0.5">18.5% Margin</div>
          </div>
        </div>

        {/* Stacked Proportional Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="h-6 w-full bg-slate-100 rounded-lg overflow-hidden flex shadow-inner">
            <div style={{ width: '52.8%' }} className="bg-slate-400" title="Direct COGS: 52.8%" />
            <div style={{ width: '28.6%' }} className="bg-indigo-400" title="OpEx Overheads: 28.6%" />
            <div style={{ width: '18.5%' }} className="bg-emerald-500" title="Net Cash Profit: 18.5%" />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 font-medium">
            <span>Direct COGS (52.8%)</span>
            <span>Operating Overheads (28.6%)</span>
            <span className="font-bold text-emerald-700">Net Profit (18.5%)</span>
          </div>
        </div>
      </div>

      {/* Top Overhead Expenditure Categories */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-black text-slate-900 tracking-tight">
          Overhead Cost Center Breakdown
        </h3>

        <div className="space-y-3">
          {topExpenses.map((exp, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>{exp.category}</span>
                <span className="font-mono">₹{exp.amount.toLocaleString('en-IN')} ({exp.percentage}%)</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  style={{ width: `${exp.percentage}%` }}
                  className={`h-full rounded-full ${
                    idx === 0 ? 'bg-blue-600' : idx === 1 ? 'bg-indigo-500' : 'bg-slate-400'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
