import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  IndianRupee,
  Users,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Brain,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  PieChart,
} from 'lucide-react';
import { FinancialKPIs, CFOAlert, MonthlyFinancialSummary } from '../../types';
import { ActiveTab } from './AppShell';
import { FinancialCharts } from './FinancialCharts';

interface DashboardOverviewProps {
  kpis: FinancialKPIs | null;
  alerts: CFOAlert[];
  monthlyData: MonthlyFinancialSummary[];
  onNavigate: (tab: ActiveTab) => void;
  onAskAIWithPrompt: (prompt: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  kpis,
  alerts,
  monthlyData,
  onNavigate,
  onAskAIWithPrompt,
}) => {
  const currentMonthRevenue = kpis?.currentMonthRevenue || kpis?.revenue || 2480000;
  const revenueGrowth = kpis?.revenueGrowth ?? 12.4;
  const currentMonthNetProfit = kpis?.currentMonthNetProfit || kpis?.netProfit || 460000;
  const netMargin = kpis?.netMargin || 18.5;
  const cashBalance = kpis?.currentCashBalance || kpis?.cashBalance || 820000;
  const runwayMonths = kpis?.runwayMonths || 4.8;
  const totalReceivables = kpis?.receivables || 420000;
  const overdueReceivables = kpis?.overdueReceivables || 210000;
  const healthScore = kpis?.healthScore || kpis?.financialHealthScore || 78;

  const quickPrompts = [
    'Why did my profit decrease this month?',
    'Will our cash balance drop below ₹5L in the next 90 days?',
    'Which clients have overdue receivables and what action should I take?',
    'What is our estimated GST liability for this month?',
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Quick Ask AI CFO bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-blue-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-extrabold text-white flex items-center gap-2">
              <span>YTech AI CFO Advisory</span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500 text-slate-950 font-black">
                READY
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Ask questions about margins, cash runway, tax dues, or capital allocation.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('ai-cfo')}
          className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs inline-flex items-center justify-center gap-2 transition-all flex-shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch AI Advisory Room</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue KPI */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue (Monthly)</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>+{revenueGrowth}%</span>
            </span>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
            ₹{(currentMonthRevenue / 100000).toFixed(1)}L
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Annual Run-Rate</span>
            <span className="font-semibold text-slate-700">₹{(currentMonthRevenue * 12 / 100000).toFixed(1)}L</span>
          </div>
        </div>

        {/* Net Profit KPI */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Net Profit</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {netMargin}% Margin
            </span>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
            ₹{(currentMonthNetProfit / 100000).toFixed(1)}L
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Gross Profit Margin</span>
            <span className="font-semibold text-slate-700">{kpis?.grossMargin || 47.2}%</span>
          </div>
        </div>

        {/* Cash Balance KPI */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cash & Bank</span>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              {runwayMonths} Mo Runway
            </span>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
            ₹{(cashBalance / 100000).toFixed(1)}L
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Safety Threshold</span>
            <span className="font-semibold text-slate-700">₹{((500000) / 100000).toFixed(1)}L</span>
          </div>
        </div>

        {/* Receivables KPI */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Receivables</span>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              ₹{(overdueReceivables / 100000).toFixed(1)}L Overdue
            </span>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
            ₹{(totalReceivables / 100000).toFixed(1)}L
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Days Sales Outstanding</span>
            <span className="font-semibold text-slate-700">{kpis?.dso || 42} days</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Charts, Health Score, and CFO Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Interactive Recharts Financial Performance */}
        <div className="lg:col-span-8 space-y-4">
          <FinancialCharts
            monthlyData={monthlyData}
            onSelectMonth={() => {}}
          />
        </div>

        {/* Right Column (4 cols): Financial Health Gauge & AI Insights */}
        <div className="lg:col-span-4 space-y-6">
          {/* Health Index Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-slate-900 tracking-tight">
                Financial Health Score
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Strong
              </span>
            </div>

            <div className="flex items-center justify-center py-2">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="#F1F5F9" strokeWidth="8" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#10B981"
                    strokeWidth="8"
                    strokeDasharray={263.89}
                    strokeDashoffset={263.89 * (1 - healthScore / 100)}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-900">{healthScore}</span>
                  <span className="text-[10px] font-bold text-slate-400">/ 100</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-2 text-xs">
              <div className="flex items-center justify-between p-1.5 rounded bg-slate-50">
                <span className="text-slate-600 font-medium">Profitability Ratio</span>
                <span className="font-bold text-emerald-700">Strong (84)</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-slate-50">
                <span className="text-slate-600 font-medium">Cash Buffer</span>
                <span className="font-bold text-emerald-700">Healthy (79)</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-slate-50">
                <span className="text-slate-600 font-medium">Receivables Aging</span>
                <span className="font-bold text-amber-700">Attention (62)</span>
              </div>
            </div>
          </div>

          {/* Quick Prompts Box */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Quick CFO Inquiries
              </span>
            </div>
            <div className="space-y-1.5">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onAskAIWithPrompt(prompt)}
                  className="w-full text-left text-xs p-2.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 text-slate-700 hover:text-blue-900 transition-all font-medium flex items-center justify-between group shadow-2xs"
                >
                  <span className="truncate pr-2">{prompt}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Critical CFO Alerts Strip */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                Active CFO Priority Scans
              </h3>
              <p className="text-xs text-slate-500">Continuous risk and opportunity analysis</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('alerts')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            Manage All Alerts →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {alerts.slice(0, 3).map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border flex flex-col justify-between ${
                alert.severity === 'high'
                  ? 'bg-rose-50/50 border-rose-200'
                  : alert.severity === 'medium'
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-emerald-50/50 border-emerald-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span
                    className={
                      alert.severity === 'high'
                        ? 'text-rose-700'
                        : alert.severity === 'medium'
                        ? 'text-amber-700'
                        : 'text-emerald-700'
                    }
                  >
                    {alert.severity.toUpperCase()} PRIORITY
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(alert.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{alert.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alert.description}</p>
              </div>

              {alert.actionRecommended && (
                <div className="mt-3 pt-2 border-t border-slate-200/60 text-xs font-semibold text-slate-800 flex items-center justify-between">
                  <span className="truncate pr-1">Action: {alert.actionRecommended}</span>
                  <button
                    onClick={() => {
                      if (alert.category === 'cash_flow') onNavigate('cash-flow');
                      else if (alert.category === 'receivables') onNavigate('receivables-payables');
                      else onNavigate('profitability');
                    }}
                    className="text-blue-600 font-bold hover:underline flex-shrink-0"
                  >
                    Act →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
