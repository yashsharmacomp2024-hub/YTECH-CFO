import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import {
  LayoutDashboard,
  Brain,
  Receipt,
  FileSpreadsheet,
  Activity,
  PieChart,
  Users,
  IndianRupee,
  Bell,
  FileText,
  Plug,
  Settings,
  LogOut,
  ChevronDown,
  Building2,
  Sparkles,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { BusinessProfile } from '../../types';

export type ActiveTab =
  | 'overview'
  | 'ai-cfo'
  | 'transactions'
  | 'statements'
  | 'cash-flow'
  | 'profitability'
  | 'receivables-payables'
  | 'gst'
  | 'alerts'
  | 'reports'
  | 'integrations'
  | 'settings';

interface AppShellProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  businessProfile: BusinessProfile;
  onLogout: () => void;
  onResetDemo: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  onSelectTab,
  businessProfile,
  onLogout,
  onResetDemo,
  children,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navigationItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'ai-cfo', label: 'AI CFO Advisory', icon: Brain, badge: 'AI' },
    { id: 'transactions', label: 'Ledger & Transactions', icon: Receipt },
    { id: 'statements', label: 'Financial Statements', icon: FileSpreadsheet },
    { id: 'cash-flow', label: 'Cash Flow & Forecast', icon: Activity },
    { id: 'profitability', label: 'Profitability Analytics', icon: PieChart },
    { id: 'receivables-payables', label: 'Receivables & Aging', icon: Users },
    { id: 'gst', label: 'GST Intelligence', icon: IndianRupee },
    { id: 'alerts', label: 'CFO Alerts & Risks', icon: Bell, badge: '3' },
    { id: 'reports', label: 'Executive Dossier', icon: FileText },
    { id: 'integrations', label: 'Integrations & Sync', icon: Plug },
    { id: 'settings', label: 'Settings & Profile', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:w-64 lg:w-72 bg-slate-900 text-white flex-col justify-between border-r border-slate-800 flex-shrink-0">
        <div>
          {/* Brand header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Logo variant="white" size="md" />
          </div>

          {/* Current Business Identity Card */}
          <div className="p-3.5 mx-3 mt-3 rounded-xl bg-slate-800/80 border border-slate-700/70">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center font-black text-xs">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-black text-white truncate">
                  {businessProfile.name}
                </div>
                <div className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                  <span>{businessProfile.currency}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">Active Org</span>
                </div>
              </div>
            </div>
            {businessProfile.isDemo && (
              <div className="mt-2 text-[10px] text-blue-300 bg-blue-950/80 border border-blue-800/60 px-2 py-0.5 rounded flex items-center justify-between font-mono">
                <span>DEMO DATASET</span>
                <span className="text-[9px] text-slate-400">12 Mo Real Data</span>
              </div>
            )}
          </div>

          {/* Nav Items */}
          <nav className="px-3 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-280px)] custom-scrollbar">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                        item.badge === 'AI'
                          ? 'bg-blue-400 text-slate-950'
                          : isActive
                          ? 'bg-white text-blue-700'
                          : 'bg-rose-500 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3.5 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between px-2 text-xs text-slate-400">
            <span className="font-semibold">Engine Status</span>
            <span className="text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live v2.6
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetDemo}
              title="Reset Demo Dataset"
              className="flex-1 text-center py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold transition-colors"
            >
              Reset Data
            </button>
            <button
              onClick={onLogout}
              title="Sign Out / Back to Landing"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40">
        <Logo variant="white" size="sm" />
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 rounded-lg bg-slate-800 text-slate-300"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden bg-slate-900 text-white p-4 border-b border-slate-800 space-y-2 z-40 animate-in slide-in-from-top">
          <div className="p-2.5 rounded-lg bg-slate-800 mb-3 text-xs font-bold flex items-center justify-between">
            <span>{businessProfile.name}</span>
            <span className="text-emerald-400">{businessProfile.currency}</span>
          </div>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-500 text-white font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => {
                setMobileSidebarOpen(false);
                onResetDemo();
              }}
              className="flex-1 py-2 rounded bg-slate-800 text-xs font-semibold"
            >
              Reset Data
            </button>
            <button
              onClick={() => {
                setMobileSidebarOpen(false);
                onLogout();
              }}
              className="px-3 py-2 rounded bg-rose-900/40 text-rose-300 text-xs font-semibold"
            >
              Exit
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        {/* Top bar header in main area */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight">
              {navigationItems.find((n) => n.id === activeTab)?.label || 'Financial Management'}
            </h1>
            <p className="text-xs text-slate-500">
              YTech AI CFO • Real-time Financial Calculations & Analytics
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('ai-cfo')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Ask AI CFO</span>
            </button>

            <button
              onClick={() => onSelectTab('alerts')}
              className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="View Alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
          </div>
        </header>

        {/* Body content */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};
