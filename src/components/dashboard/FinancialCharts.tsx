import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ReferenceLine,
} from 'recharts';
import {
  TrendingUp,
  Calendar,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  SlidersHorizontal,
  Info,
  Maximize2,
  Check,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { MonthlyFinancialSummary } from '../../types';

interface FinancialChartsProps {
  monthlyData: MonthlyFinancialSummary[];
  onSelectMonth?: (monthData: MonthlyFinancialSummary) => void;
}

export const FinancialCharts: React.FC<FinancialChartsProps> = ({
  monthlyData,
  onSelectMonth,
}) => {
  // Chart Visual Mode
  const [chartMode, setChartMode] = useState<'combo' | 'area' | 'breakdown'>('combo');

  // Timeframe filter: '1M' | '3M' | '6M' | '1Y' | 'ALL'
  const [timeframe, setTimeframe] = useState<'3M' | '6M' | '1Y' | 'ALL'>('1Y');

  // Active Category / Series Toggles
  const [visibleSeries, setVisibleSeries] = useState<{
    revenue: boolean;
    expenses: boolean;
    cogs: boolean;
    grossProfit: boolean;
    netProfit: boolean;
    cashBalance: boolean;
  }>({
    revenue: true,
    expenses: true,
    cogs: false,
    grossProfit: false,
    netProfit: true,
    cashBalance: true,
  });

  // Selected data point inspection
  const [inspectedMonth, setInspectedMonth] = useState<MonthlyFinancialSummary | null>(
    monthlyData.length > 0 ? monthlyData[monthlyData.length - 1] : null
  );

  // Brush / Zoom active toggle
  const [showBrush, setShowBrush] = useState(false);

  // Filtered dataset based on timeframe
  const filteredData = useMemo(() => {
    if (!monthlyData || monthlyData.length === 0) return [];
    
    // Ensure all required fields exist on each entry
    const formatted = monthlyData.map((d, index) => {
      const prev = index > 0 ? monthlyData[index - 1] : null;
      const revenue = d.revenue || 0;
      const opex = d.opex || 0;
      const cogs = d.cogs || 0;
      const totalExpenses = opex + cogs;
      const netProfit = d.netProfit || (revenue - totalExpenses);
      const grossProfit = d.grossProfit || (revenue - cogs);
      const cashBalance = d.cashBalance || 800000;
      const growthRate = prev && prev.revenue ? (((revenue - prev.revenue) / prev.revenue) * 100).toFixed(1) : '0';

      return {
        ...d,
        month: d.month,
        revenue,
        revenueInLakhs: Number((revenue / 100000).toFixed(2)),
        expenses: totalExpenses,
        expensesInLakhs: Number((totalExpenses / 100000).toFixed(2)),
        opex,
        opexInLakhs: Number((opex / 100000).toFixed(2)),
        cogs,
        cogsInLakhs: Number((cogs / 100000).toFixed(2)),
        grossProfit,
        grossProfitInLakhs: Number((grossProfit / 100000).toFixed(2)),
        netProfit,
        netProfitInLakhs: Number((netProfit / 100000).toFixed(2)),
        cashBalance,
        cashInLakhs: Number((cashBalance / 100000).toFixed(2)),
        netMargin: d.netMargin || Number(((netProfit / (revenue || 1)) * 100).toFixed(1)),
        grossMargin: d.grossMargin || Number(((grossProfit / (revenue || 1)) * 100).toFixed(1)),
        growthRate,
      };
    });

    switch (timeframe) {
      case '3M':
        return formatted.slice(-3);
      case '6M':
        return formatted.slice(-6);
      case '1Y':
        return formatted.slice(-12);
      case 'ALL':
      default:
        return formatted;
    }
  }, [monthlyData, timeframe]);

  // Toggle single category filter
  const toggleSeries = (key: keyof typeof visibleSeries) => {
    setVisibleSeries((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Custom high-contrast tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-xl border border-slate-700 shadow-2xl text-xs font-sans min-w-[240px] z-50">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2.5">
            <span className="font-extrabold text-sm text-white">{label}</span>
            <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
              Number(data.growthRate) >= 0 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
            }`}>
              {Number(data.growthRate) >= 0 ? `+${data.growthRate}%` : `${data.growthRate}%`} MoM
            </span>
          </div>

          <div className="space-y-1.5 font-mono">
            {payload.map((entry: any, index: number) => {
              let name = entry.name;
              let val = entry.value;
              let color = entry.color;

              return (
                <div key={index} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-slate-300 font-sans text-[11px]">{name}</span>
                  </div>
                  <span className="font-bold text-white">₹{val}L</span>
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-sans">
            <span>Net Margin: <strong className="text-emerald-400">{data.netMargin}%</strong></span>
            <span>Gross: <strong className="text-blue-400">{data.grossMargin}%</strong></span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
      {/* Header Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black text-slate-900 tracking-tight">
              Interactive Financial Trajectory & Performance
            </h2>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Live Interactive
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Hover for micro-metrics, toggle financial categories, and use zoom controls for granular inspection.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframe Presets */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-0.5 text-xs font-bold">
            {(['3M', '6M', '1Y', 'ALL'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  timeframe === tf
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Style Toggle */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-0.5 text-xs font-bold">
            <button
              onClick={() => setChartMode('combo')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                chartMode === 'combo'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bar & Line
            </button>
            <button
              onClick={() => setChartMode('area')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                chartMode === 'area'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Runway Area
            </button>
          </div>

          {/* Granular Brush / Zoom Slider Toggle */}
          <button
            onClick={() => setShowBrush(!showBrush)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
              showBrush
                ? 'bg-blue-50 border-blue-300 text-blue-700 ring-1 ring-blue-500'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Toggle timeline zoom slider"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>{showBrush ? 'Hide Zoom Slider' : 'Zoom Slider'}</span>
          </button>
        </div>
      </div>

      {/* Category / Series Filter Badges */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
        <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider mr-1 flex items-center gap-1">
          <SlidersHorizontal className="w-3 h-3" />
          Series:
        </span>

        {/* Revenue */}
        <button
          onClick={() => toggleSeries('revenue')}
          className={`px-3 py-1 rounded-full font-bold transition-all inline-flex items-center gap-1.5 ${
            visibleSeries.revenue
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-400 border border-slate-200 line-through'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-white" />
          <span>Revenue</span>
        </button>

        {/* Expenses */}
        <button
          onClick={() => toggleSeries('expenses')}
          className={`px-3 py-1 rounded-full font-bold transition-all inline-flex items-center gap-1.5 ${
            visibleSeries.expenses
              ? 'bg-slate-700 text-white shadow-xs'
              : 'bg-slate-100 text-slate-400 border border-slate-200 line-through'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span>Total Expenses</span>
        </button>

        {/* COGS */}
        <button
          onClick={() => toggleSeries('cogs')}
          className={`px-3 py-1 rounded-full font-bold transition-all inline-flex items-center gap-1.5 ${
            visibleSeries.cogs
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-400 border border-slate-200 line-through'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-white" />
          <span>COGS</span>
        </button>

        {/* Gross Profit */}
        <button
          onClick={() => toggleSeries('grossProfit')}
          className={`px-3 py-1 rounded-full font-bold transition-all inline-flex items-center gap-1.5 ${
            visibleSeries.grossProfit
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-400 border border-slate-200 line-through'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-white" />
          <span>Gross Profit</span>
        </button>

        {/* Net Profit */}
        <button
          onClick={() => toggleSeries('netProfit')}
          className={`px-3 py-1 rounded-full font-bold transition-all inline-flex items-center gap-1.5 ${
            visibleSeries.netProfit
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-400 border border-slate-200 line-through'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-white" />
          <span>Net Profit</span>
        </button>

        {/* Cash Balance */}
        <button
          onClick={() => toggleSeries('cashBalance')}
          className={`px-3 py-1 rounded-full font-bold transition-all inline-flex items-center gap-1.5 ${
            visibleSeries.cashBalance
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-slate-100 text-slate-400 border border-slate-200 line-through'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-slate-900" />
          <span>Cash on Hand</span>
        </button>
      </div>

      {/* Main Interactive SVG Recharts Canvas */}
      <div className="h-72 sm:h-80 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartMode === 'combo' ? (
            <ComposedChart
              data={filteredData}
              onClick={(e: any) => {
                if (e && e.activePayload && e.activePayload.length > 0) {
                  const clicked = e.activePayload[0].payload;
                  setInspectedMonth(clicked);
                  if (onSelectMonth) onSelectMonth(clicked);
                }
              }}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }}
                axisLine={{ stroke: '#E2E8F0' }}
                tickLine={false}
              />
              <YAxis
                unit="L"
                tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }}
                axisLine={{ stroke: '#E2E8F0' }}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '12px', fontSize: '11px', fontWeight: 600 }}
              />

              {/* Safety Threshold reference */}
              <ReferenceLine y={5} stroke="#F59E0B" strokeDasharray="3 3" label={{ value: 'Safety: ₹5L', fill: '#D97706', fontSize: 10 }} />

              {/* Series components based on visibility */}
              {visibleSeries.revenue && (
                <Bar
                  dataKey="revenueInLakhs"
                  name="Revenue"
                  fill="#2563EB"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />
              )}

              {visibleSeries.expenses && (
                <Bar
                  dataKey="expensesInLakhs"
                  name="Total Expenses"
                  fill="#64748B"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />
              )}

              {visibleSeries.cogs && (
                <Bar
                  dataKey="cogsInLakhs"
                  name="COGS"
                  fill="#F43F5E"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />
              )}

              {visibleSeries.grossProfit && (
                <Line
                  type="monotone"
                  dataKey="grossProfitInLakhs"
                  name="Gross Profit"
                  stroke="#6366F1"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#6366F1' }}
                  activeDot={{ r: 6 }}
                />
              )}

              {visibleSeries.netProfit && (
                <Line
                  type="monotone"
                  dataKey="netProfitInLakhs"
                  name="Net Profit"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10B981', stroke: '#FFFFFF', strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                />
              )}

              {visibleSeries.cashBalance && (
                <Line
                  type="monotone"
                  dataKey="cashInLakhs"
                  name="Cash on Hand"
                  stroke="#F59E0B"
                  strokeWidth={2.5}
                  strokeDasharray="4 4"
                  dot={{ r: 3, fill: '#F59E0B' }}
                />
              )}

              {showBrush && (
                <Brush
                  dataKey="month"
                  height={24}
                  stroke="#2563EB"
                  fill="#F8FAFC"
                  tickFormatter={(val) => val}
                />
              )}
            </ComposedChart>
          ) : (
            <ComposedChart
              data={filteredData}
              onClick={(e: any) => {
                if (e && e.activePayload && e.activePayload.length > 0) {
                  const clicked = e.activePayload[0].payload;
                  setInspectedMonth(clicked);
                  if (onSelectMonth) onSelectMonth(clicked);
                }
              }}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} axisLine={{ stroke: '#E2E8F0' }} />
              <YAxis unit="L" tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} axisLine={{ stroke: '#E2E8F0' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '12px', fontSize: '11px', fontWeight: 600 }} />

              <Area
                type="monotone"
                dataKey="cashInLakhs"
                name="Cash Liquidity"
                stroke="#2563EB"
                fillOpacity={1}
                fill="url(#colorCash)"
                strokeWidth={2.5}
              />

              <Area
                type="monotone"
                dataKey="netProfitInLakhs"
                name="Net Profit"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorProfit)"
                strokeWidth={2.5}
              />

              {showBrush && (
                <Brush
                  dataKey="month"
                  height={24}
                  stroke="#2563EB"
                  fill="#F8FAFC"
                />
              )}
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Interactive Micro-Inspection Box for Clicked/Hovered Month */}
      {inspectedMonth && (
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="px-3 py-1.5 bg-slate-900 text-white font-extrabold rounded-lg text-xs font-mono">
              {inspectedMonth.month}
            </div>
            <div>
              <div className="font-bold text-slate-800">
                Detailed Month Summary: ₹{(inspectedMonth.revenue / 100000).toFixed(2)}L Revenue
              </div>
              <div className="text-[11px] text-slate-500">
                COGS: ₹{((inspectedMonth.cogs || 0) / 100000).toFixed(2)}L • OpEx: ₹{((inspectedMonth.opex || 0) / 100000).toFixed(2)}L
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-bold w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
              ₹{(inspectedMonth.netProfit / 100000).toFixed(2)}L Profit ({inspectedMonth.netMargin}%)
            </span>
            <span className="text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
              ₹{((inspectedMonth.cashBalance || 820000) / 100000).toFixed(2)}L Cash
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
