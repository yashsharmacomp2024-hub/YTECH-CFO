import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  IndianRupee,
  ShieldCheck,
  Calendar,
  Zap,
  ArrowRight,
  Sliders,
} from 'lucide-react';
import { CashFlowForecast } from '../../types';

interface CashFlowViewProps {
  forecast: CashFlowForecast | null;
  currentCash: number;
  safetyThreshold: number;
}

export const CashFlowView: React.FC<CashFlowViewProps> = ({
  forecast,
  currentCash = 820000,
  safetyThreshold: initialThreshold = 500000,
}) => {
  const [selectedHorizon, setSelectedHorizon] = useState<30 | 60 | 90>(90);
  const [safetyThreshold, setSafetyThreshold] = useState<number>(initialThreshold);

  const forecastData = forecast?.forecastDays || [];
  const currentRunway = forecast?.runwayMonths || 4.8;
  const currentBurn = forecast?.burnRateMonthly || 170000;
  const daysUntilThreshold = forecast?.daysUntilThreshold || 47;

  // Filter based on selected horizon
  const displayPoints = forecastData.slice(0, selectedHorizon);

  return (
    <div className="space-y-6">
      {/* Top Banner Alert (Section 10 requirement) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-900">
              CFO Predictive Liquidity Warning
            </div>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">
              Projected cash balance may fall below your safety threshold in{' '}
              <strong className="text-amber-800 font-extrabold">{daysUntilThreshold} days</strong>.
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Safety buffer is set at ₹{(safetyThreshold / 100000).toFixed(1)}L. Predicted lowest trough is ₹4.85L around Day 47.
            </p>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <div className="text-[11px] font-bold text-slate-500">Runway Duration</div>
          <div className="text-lg font-black text-slate-900 font-mono">{currentRunway} Months</div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Current Liquid Cash</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
            ₹{(currentCash / 100000).toFixed(2)}L
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Available in bank accounts</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Net Monthly Burn / Expansion</div>
          <div className="text-2xl font-black text-emerald-700 mt-1 font-mono">
            +₹{(currentBurn / 100000).toFixed(2)}L
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Net operational monthly cash accretion</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Safety Threshold</span>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Configurable</span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
            ₹{(safetyThreshold / 100000).toFixed(1)}L
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Minimum operating buffer</div>
        </div>
      </div>

      {/* Interactive Cash Forecast Chart Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Predictive Cash Runway Curve
            </h3>
            <p className="text-xs text-slate-500">
              Daily forecasted balance factoring receivables, payables, payroll & tax dues
            </p>
          </div>

          {/* Horizon Selector */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold flex">
              <button
                onClick={() => setSelectedHorizon(30)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedHorizon === 30 ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                30-Day
              </button>
              <button
                onClick={() => setSelectedHorizon(60)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedHorizon === 60 ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                60-Day
              </button>
              <button
                onClick={() => setSelectedHorizon(90)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedHorizon === 90 ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                90-Day Forecast
              </button>
            </div>
          </div>
        </div>

        {/* SVG Curve Forecast */}
        <div className="h-64 w-full relative pt-4">
          <svg viewBox="0 0 700 220" className="w-full h-full">
            {/* Horizontal Grid */}
            <line x1="40" y1="30" x2="680" y2="30" stroke="#F1F5F9" />
            <line x1="40" y1="80" x2="680" y2="80" stroke="#F1F5F9" />
            <line x1="40" y1="130" x2="680" y2="130" stroke="#F1F5F9" />
            <line x1="40" y1="180" x2="680" y2="180" stroke="#F1F5F9" />

            {/* Threshold Line (Safety Buffer) */}
            <line x1="40" y1="140" x2="680" y2="140" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" />
            <text x="50" y="134" fill="#EF4444" fontSize="11" fontWeight="bold">
              Safety Threshold (₹5.0L)
            </text>

            {/* Area fill under curve */}
            <path
              d="M 50,70 Q 150,50 250,90 T 450,150 T 650,80 L 650,180 L 50,180 Z"
              fill="rgba(37,99,235,0.05)"
            />

            {/* Trajectory Polyline */}
            <path
              d="M 50,70 Q 150,50 250,90 T 450,150 T 650,80"
              fill="none"
              stroke="#2563EB"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Day 0 Point */}
            <circle cx="50" cy="70" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
            <text x="50" y="60" fill="#0F172A" fontSize="10" fontWeight="bold" textAnchor="middle">
              Day 0 (₹8.2L)
            </text>

            {/* Day 47 Alert Dip Point */}
            <circle cx="450" cy="150" r="6" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
            <text x="450" y="175" fill="#EF4444" fontSize="11" fontWeight="bold" textAnchor="middle">
              Day 47 Dip: ₹4.85L (Below Buffer)
            </text>

            {/* Day 90 Point */}
            <circle cx="650" cy="80" r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
            <text x="650" y="70" fill="#10B981" fontSize="10" fontWeight="bold" textAnchor="middle">
              Day 90 (₹7.9L)
            </text>

            {/* X-axis labels */}
            <text x="50" y="205" fill="#64748B" fontSize="11" fontWeight="bold">Day 0 (Today)</text>
            <text x="250" y="205" fill="#64748B" fontSize="11">Day 30</text>
            <text x="450" y="205" fill="#64748B" fontSize="11">Day 60</text>
            <text x="650" y="205" fill="#64748B" fontSize="11">Day 90</text>
          </svg>
        </div>

        {/* Action Strategy Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700 space-y-2">
          <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>CFO Action to Mitigate Day 47 Cash Dip:</span>
          </div>
          <ul className="space-y-1 list-disc pl-5 text-slate-600">
            <li>Collect overdue ₹1.3L from Apex Logistics before Day 30 to elevate buffer by 18 days.</li>
            <li>Schedule Q2 capital asset procurement (₹50,000) after Day 60 when seasonal renewals clear.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
