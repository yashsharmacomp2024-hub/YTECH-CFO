import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  ArrowRight,
  Filter,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { CFOAlert } from '../../types';
import { ActiveTab } from './AppShell';

interface AlertsViewProps {
  alerts: CFOAlert[];
  onNavigate: (tab: ActiveTab) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({ alerts, onNavigate }) => {
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high' | 'medium' | 'low' | 'positive'>('all');

  const filtered = alerts.filter((a) => {
    if (filterSeverity === 'all') return true;
    return a.severity === filterSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight">
            CFO Risk Scanners & Intelligence Alerts
          </h2>
          <p className="text-xs text-slate-500">
            Real-time triggers watching liquidity dips, customer overdue invoices, margin leaks, and tax deadlines.
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setFilterSeverity('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterSeverity === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            All ({alerts.length})
          </button>
          <button
            onClick={() => setFilterSeverity('high')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterSeverity === 'high' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            High Priority
          </button>
          <button
            onClick={() => setFilterSeverity('medium')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterSeverity === 'medium' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setFilterSeverity('positive')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterSeverity === 'positive' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            Positive
          </button>
        </div>
      </div>

      {/* Alert List Cards */}
      <div className="space-y-3.5">
        {filtered.map((alert) => (
          <div
            key={alert.id}
            className={`p-5 rounded-2xl border transition-all ${
              alert.severity === 'high'
                ? 'bg-rose-50/60 border-rose-200 shadow-xs'
                : alert.severity === 'medium'
                ? 'bg-amber-50/60 border-amber-200 shadow-xs'
                : alert.severity === 'positive'
                ? 'bg-emerald-50/60 border-emerald-200 shadow-xs'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    alert.severity === 'high'
                      ? 'bg-rose-600 text-white'
                      : alert.severity === 'medium'
                      ? 'bg-amber-500 text-white'
                      : alert.severity === 'positive'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {alert.severity === 'positive' ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.2 rounded-full ${
                        alert.severity === 'high'
                          ? 'bg-rose-200 text-rose-900'
                          : alert.severity === 'medium'
                          ? 'bg-amber-200 text-amber-900'
                          : alert.severity === 'positive'
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-blue-200 text-blue-900'
                      }`}
                    >
                      {alert.severity.toUpperCase()} PRIORITY
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      Category: {alert.category.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 mt-1">{alert.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-3xl">
                    {alert.description}
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-slate-400 font-mono flex-shrink-0">
                {new Date(alert.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Recommended Action Bar */}
            {alert.actionRecommended && (
              <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Recommended Action: {alert.actionRecommended}</span>
                </div>

                <button
                  onClick={() => {
                    if (alert.category === 'cash_flow') onNavigate('cash-flow');
                    else if (alert.category === 'receivables') onNavigate('receivables-payables');
                    else if (alert.category === 'gst') onNavigate('gst');
                    else onNavigate('profitability');
                  }}
                  className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-1 self-start sm:self-auto shadow-2xs"
                >
                  <span>Take Action</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
