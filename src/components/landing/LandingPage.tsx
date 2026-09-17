import React, { useState } from 'react';
import { LandingNavbar } from './LandingNavbar';
import { Logo } from '../common/Logo';
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Layers,
  BarChart3,
  Brain,
  Calculator,
  Building2,
  FileText,
  Clock,
  Zap,
  Lock,
  ArrowUpRight,
  ChevronRight,
  HelpCircle,
  IndianRupee,
  Activity,
  PieChart,
  Check,
  Server,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

interface LandingPageProps {
  onStartFree: () => void;
  onSignIn: () => void;
  onExploreDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartFree,
  onSignIn,
  onExploreDemo,
}) => {
  const [statementTab, setStatementTab] = useState<'pnl' | 'balanceSheet' | 'cashFlow' | 'trialBalance'>('pnl');
  const [pricingCycle, setPricingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 overflow-x-hidden">
      {/* Sticky Navigation */}
      <LandingNavbar
        onStartFree={onStartFree}
        onSignIn={onSignIn}
        onExploreDemo={onExploreDemo}
      />

      {/* SECTION 3 & 4: HERO SECTION WITH REALISTIC FINANCIAL DASHBOARD VISUAL */}
      <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Hero Copy & Actions */}
            <div className="lg:pr-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-blue-700">
                  Financial Operating System
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-slate-900 mb-6">
                Your Business Deserves a <span className="text-blue-600 italic">CFO.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-500 mb-8 leading-relaxed max-w-md">
                YTech AI CFO turns your financial data into decisions, forecasts, and actions. Built for ambitious businesses. Powered by financial intelligence.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  id="hero-start-free-btn"
                  onClick={onStartFree}
                  className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-explore-cfo-btn"
                  onClick={onExploreDemo}
                  className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Explore YTech CFO</span>
                </button>
              </div>

              <div className="mt-12 flex items-center gap-6 opacity-60">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Integrates with:</span>
                <div className="flex gap-4 font-bold text-xs text-slate-700">
                  <span>TALLY</span>
                  <span>ZOHO</span>
                  <span>SAP</span>
                  <span>EXCEL</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity Showcase Window */}
            <div className="relative flex justify-center lg:justify-end pt-6 lg:pt-0">
              <div className="w-full max-w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative">
                {/* Window Top Bar */}
                <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <div className="mx-auto text-[10px] font-medium text-slate-400">
                    YTech CFO — Demo Business Dashboard
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Financial Overview</h3>
                    <span className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 rounded text-slate-500">
                      LAST 30 DAYS
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                      <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase">Revenue</p>
                      <p className="text-xl font-bold text-slate-900">
                        ₹24.8L <span className="text-emerald-500 text-xs font-normal">↑ 12.4%</span>
                      </p>
                    </div>

                    <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                      <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase">Net Profit</p>
                      <p className="text-xl font-bold text-slate-900">
                        ₹4.6L <span className="text-emerald-500 text-xs font-normal">↑ 8.1%</span>
                      </p>
                    </div>

                    <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                      <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase">Cash on Hand</p>
                      <p className="text-xl font-bold text-slate-900">₹8.2L</p>
                    </div>

                    <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                      <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase">Receivables</p>
                      <p className="text-xl font-bold text-amber-600">₹4.2L</p>
                    </div>
                  </div>

                  {/* Forecast Bar Chart Elements */}
                  <div className="mb-6 bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-end mb-2 h-20 px-2">
                      <div className="h-14 w-7 bg-blue-100 rounded-sm" title="Jan: ₹18.2L" />
                      <div className="h-16 w-7 bg-blue-200 rounded-sm" title="Feb: ₹20.1L" />
                      <div className="h-12 w-7 bg-blue-100 rounded-sm" title="Mar: ₹19.4L" />
                      <div className="h-18 w-7 bg-blue-300 rounded-sm" title="Apr: ₹22.6L" />
                      <div className="h-20 w-7 bg-blue-600 rounded-sm shadow-md shadow-blue-200" title="May (Current): ₹24.8L" />
                      <div className="h-16 w-7 bg-blue-100 rounded-sm border-2 border-dashed border-blue-400 opacity-60" title="Jun Forecast: ₹26.5L" />
                      <div className="h-12 w-7 bg-blue-50 rounded-sm border-2 border-dashed border-blue-200 opacity-40" title="Jul Forecast: ₹28.2L" />
                    </div>
                    <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase tracking-tighter px-1">
                      <span>JAN</span>
                      <span>FEB</span>
                      <span>MAR</span>
                      <span>APR</span>
                      <span>MAY</span>
                      <span className="text-blue-600">JUN (FC)</span>
                      <span className="text-blue-600">JUL (FC)</span>
                    </div>
                  </div>

                  {/* AI CFO Callout Container */}
                  <div className="bg-slate-900 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold">
                        AI
                      </div>
                      <p className="text-xs font-bold uppercase tracking-wider text-white">AI CFO Insight</p>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      "Revenue is growing faster than expenses this month, improving your operating margin from 14.8% to 18.5%."
                    </p>
                    <div className="flex items-center justify-between text-[10px] font-bold text-blue-400">
                      <button
                        onClick={onExploreDemo}
                        className="hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>VIEW FULL ANALYSIS →</span>
                      </button>
                      <span className="text-slate-400">CONFIDENCE: 98%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating GST Liability badge */}
              <div className="absolute top-24 -left-6 sm:-left-10 p-4 bg-white rounded-xl shadow-2xl border border-slate-100 w-44 z-10 hidden sm:block">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">GST Liability</p>
                <p className="text-xl font-bold text-slate-900">₹1.24L</p>
                <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 w-3/4 rounded-full" />
                </div>
                <p className="mt-2 text-[8px] text-slate-400 uppercase font-semibold">Estimated for Q2</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: TRUST CATEGORY STRIP */}
      <section id="platform" className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              One Financial Intelligence Platform.
            </h2>
            <p className="text-slate-600 text-sm mt-1.5">
              The financial intelligence layer that sits above your accounting software.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Cash Flow</h3>
              <p className="text-xs text-slate-600 mt-1">Know where your money is going and predict runway 90 days out.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-emerald-300 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Profitability</h3>
              <p className="text-xs text-slate-600 mt-1">Understand what actually makes you money and which costs drag margin.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-indigo-300 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Forecasting</h3>
              <p className="text-xs text-slate-600 mt-1">See what's coming before it happens with predictive liquidity curves.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-3">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">AI CFO</h3>
              <p className="text-xs text-slate-600 mt-1">Turn complex financial data into clear, proactive business decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: PROBLEM SECTION (Traditional Accounting vs YTech CFO) */}
      <section className="py-20 lg:py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">The Intelligence Gap</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-2 text-white">
              Your Accounting Software Records.
              <br />
              <span className="text-blue-400">YTech CFO Understands.</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-3">
              Traditional accounting is backward-looking compliance. YTech CFO is forward-looking financial decision intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Traditional Accounting */}
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-semibold uppercase">
                  Traditional Accounting
                </div>
                <h3 className="text-xl font-bold text-slate-200 mt-3">Records transactions.</h3>
                <ul className="mt-6 space-y-3.5 text-sm text-slate-400">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>Outputs static debit-credit tables designed only for compliance</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>Tells you what happened last month after the bookkeeper reconciles</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>No cash flow forecasting or proactive threshold warning</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>Cannot answer strategic questions like "Why did my margin drop?"</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800 text-xs text-slate-500 font-mono">
                Status: Historical bookkeeping record
              </div>
            </div>

            {/* YTech CFO */}
            <div className="rounded-2xl bg-gradient-to-b from-blue-950/60 to-slate-900 border-2 border-blue-500/40 p-6 sm:p-8 flex flex-col justify-between relative shadow-xl shadow-blue-950/50">
              <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold border border-blue-500/30">
                Next-Gen
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-900/60 text-blue-300 text-xs font-semibold uppercase border border-blue-700/50">
                  YTech CFO
                </div>
                <h3 className="text-xl font-bold text-white mt-3">Understands the business.</h3>
                <ul className="mt-6 space-y-3.5 text-sm text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>Real-time executive dashboard with instant KPI visibility</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>90-day predictive cash flow model with safety threshold alerts</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>AI CFO that diagnoses root causes and calculates financial impact</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>Indian GST intelligence with liability estimations & ITC audits</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-blue-900/50 text-xs text-blue-300 font-mono flex items-center justify-between">
                <span>Data → Intelligence → Forecasts → Actions</span>
                <span className="text-emerald-400 font-bold">Active CFO Engine</span>
              </div>
            </div>
          </div>

          {/* Visual Intelligence Flow Pipeline (Section 8 visual requirement) */}
          <div className="mt-14 max-w-4xl mx-auto p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-slate-300">
              <span className="px-3 py-1.5 rounded-lg bg-slate-800">Accounting Data</span>
              <span className="text-blue-400 font-bold">↓</span>
              <span className="px-3 py-1.5 rounded-lg bg-blue-950 text-blue-300 border border-blue-800">YTech Intelligence</span>
              <span className="text-blue-400 font-bold">↓</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-800">Financial Insights</span>
              <span className="text-blue-400 font-bold">↓</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-800">Forecasts</span>
              <span className="text-blue-400 font-bold">↓</span>
              <span className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800">Recommended Actions</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: AI CFO SECTION */}
      <section id="ai-cfo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>YTech CFO AI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-2">
              Ask Your Finances Anything.
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Get senior CFO-level reasoning, financial root-cause analysis, and specific tactical recommendations in seconds.
            </p>
          </div>

          {/* AI CFO Dialogue Showcase (Section 9 exact requirement) */}
          <div className="max-w-3xl mx-auto bg-slate-50 rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-lg">
            {/* User Message */}
            <div className="flex items-start justify-end gap-3 mb-6">
              <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none px-4.5 py-3 text-sm sm:text-base font-medium max-w-md shadow-sm">
                "Why did my profit decrease this month?"
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                YOU
              </div>
            </div>

            {/* AI CFO Assistant Response */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Brain className="w-4 h-4" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none p-5 text-sm sm:text-base text-slate-800 border border-slate-200/80 shadow-sm w-full space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-extrabold text-blue-900 text-sm">YTech CFO AI</span>
                  <span className="text-xs font-bold text-slate-400">Diagnosis Ready</span>
                </div>

                <p className="leading-relaxed">
                  "Your revenue increased 9.8%, but operating expenses increased 18.6%. The largest increase came from logistics and employee costs. This reduced your net margin from 17.2% to 14.8%."
                </p>

                {/* Impact Card */}
                <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-200/70 text-rose-900 text-sm font-semibold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Impact:</span>
                  </div>
                  <span className="font-black text-rose-700">₹82,000 lower monthly profit</span>
                </div>

                {/* Recommended Action */}
                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/70 text-emerald-950 text-sm space-y-1">
                  <div className="font-bold text-xs uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Recommended Action
                  </div>
                  <p className="font-medium text-slate-800">
                    "Review logistics costs and compare supplier pricing before the next billing cycle."
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={onExploreDemo}
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800"
              >
                <span>Try asking YTech AI CFO live in Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: CASH FLOW SECTION */}
      <section id="cash-flow" className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-blue-800 text-xs font-bold">
                <Activity className="w-3.5 h-3.5 text-blue-600" />
                <span>Predictive Liquidity</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Know Your Cash Before It Becomes a Problem.
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Connect incoming receivables, planned vendor payables, payroll, and GST dues to see accurate 30-day and 90-day cash projections.
              </p>

              {/* Threshold insight badge (Section 10 requirement) */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-sm space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Proactive Alert</span>
                </div>
                <p className="text-slate-700">
                  "Projected cash balance may fall below your safety threshold in <strong>47 days</strong>."
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onExploreDemo}
                  className="px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm inline-flex items-center gap-2 text-sm"
                >
                  <span>Explore Cash Flow</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cash Flow Forecast Graph Visual (Section 10 requirement) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase">90-Day Cash Trajectory</div>
                  <div className="text-lg font-extrabold text-slate-900">Current Cash: ₹8.2L</div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="inline-flex items-center gap-1 text-slate-600">
                    <span className="w-3 h-1 bg-slate-800 rounded" /> Past Cash
                  </span>
                  <span className="inline-flex items-center gap-1 text-blue-600 font-semibold">
                    <span className="w-3 h-1 bg-blue-600 rounded border-b border-dashed" /> Forecast Area
                  </span>
                  <span className="inline-flex items-center gap-1 text-rose-600 font-semibold">
                    <span className="w-3 h-0.5 bg-rose-500 border-t border-dashed" /> Safety Buffer (₹5.0L)
                  </span>
                </div>
              </div>

              {/* Interactive Forecast Curve SVG */}
              <div className="h-56 w-full relative">
                <svg viewBox="0 0 600 200" className="w-full h-full">
                  {/* Grid Lines */}
                  <line x1="40" y1="30" x2="580" y2="30" stroke="#F1F5F9" />
                  <line x1="40" y1="80" x2="580" y2="80" stroke="#F1F5F9" />
                  <line x1="40" y1="130" x2="580" y2="130" stroke="#F1F5F9" />

                  {/* Safety Buffer Threshold Line (₹5.0L) */}
                  <line x1="40" y1="130" x2="580" y2="130" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="45" y="125" fill="#EF4444" fontSize="10" fontWeight="bold">Safety Buffer Threshold: ₹5.0L</text>

                  {/* Forecast Shaded Area (Beyond Day 0) */}
                  <rect x="270" y="20" width="310" height="150" fill="rgba(37,99,235,0.04)" rx="4" />
                  <text x="410" y="40" fill="#2563EB" fontSize="11" fontWeight="bold" textAnchor="middle">
                    FORECAST ZONE
                  </text>

                  {/* Historical Past Curve (Solid Line) */}
                  <polyline
                    points="50,120 110,105 170,125 220,95 270,70"
                    fill="none"
                    stroke="#0F172A"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Forecast Future Curve (Dashed & Colored) */}
                  <polyline
                    points="270,70 330,55 380,100 440,135 490,115 540,90 575,70"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="3"
                    strokeDasharray="5 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Today Marker */}
                  <circle cx="270" cy="70" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="270" y="60" fill="#0F172A" fontSize="10" fontWeight="bold" textAnchor="middle">Today (₹8.2L)</text>

                  {/* Day 47 Alert Marker */}
                  <circle cx="440" cy="135" r="6" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="440" y="160" fill="#EF4444" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Day 47 Dip: ₹4.85L
                  </text>

                  {/* Timeline labels */}
                  <text x="50" y="185" fill="#64748B" fontSize="10">Past (60d)</text>
                  <text x="270" y="185" fill="#0F172A" fontSize="10" fontWeight="bold">Current</text>
                  <text x="380" y="185" fill="#2563EB" fontSize="10">30-Day</text>
                  <text x="540" y="185" fill="#2563EB" fontSize="10">90-Day Forecast</text>
                </svg>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-mono border-t border-slate-100 pt-2">
                <span>Past Cash Flow → Current Cash → 30-Day Forecast → 90-Day Forecast</span>
                <span className="text-blue-600 font-bold">Linear + AR Predictive Model</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: PROFITABILITY SECTION */}
      <section id="profitability" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Unit Economics & Margins</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-1">
              Know Where Your Profit Comes From.
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Break down every rupee of revenue into COGS, operating overheads, and true bottom-line cash profit.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            {/* Profit Waterfall Row (Section 11 requirement) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center mb-8">
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <div className="text-xs font-semibold text-slate-500">Revenue</div>
                <div className="text-xl font-extrabold text-slate-900 mt-1">₹24.8L</div>
                <div className="text-[10px] text-blue-600 font-bold mt-0.5">100%</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <div className="text-xs font-semibold text-slate-500">COGS</div>
                <div className="text-xl font-extrabold text-slate-700 mt-1">₹13.1L</div>
                <div className="text-[10px] text-slate-500 font-semibold mt-0.5">52.8%</div>
              </div>

              <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 shadow-xs">
                <div className="text-xs font-semibold text-blue-800">Gross Profit</div>
                <div className="text-xl font-extrabold text-blue-900 mt-1">₹11.7L</div>
                <div className="text-[10px] text-blue-700 font-bold mt-0.5">47.2% Margin</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <div className="text-xs font-semibold text-slate-500">Op. Expenses</div>
                <div className="text-xl font-extrabold text-slate-700 mt-1">₹7.1L</div>
                <div className="text-[10px] text-slate-500 font-semibold mt-0.5">28.6%</div>
              </div>

              <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 shadow-xs col-span-2 sm:col-span-1">
                <div className="text-xs font-semibold text-emerald-800">Net Profit</div>
                <div className="text-xl font-extrabold text-emerald-900 mt-1">₹4.6L</div>
                <div className="text-[10px] text-emerald-700 font-extrabold mt-0.5">18.5% Net Margin</div>
              </div>
            </div>

            {/* Visual Waterfall Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Revenue Allocation Breakdown</span>
                <span className="text-emerald-700">Net Margin: 18.5%</span>
              </div>
              <div className="h-5 w-full bg-slate-200 rounded-lg overflow-hidden flex">
                <div style={{ width: '52.8%' }} className="bg-slate-400" title="COGS: ₹13.1L" />
                <div style={{ width: '28.6%' }} className="bg-indigo-400" title="OpEx: ₹7.1L" />
                <div style={{ width: '18.5%' }} className="bg-emerald-500" title="Net Profit: ₹4.6L" />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-slate-400 rounded-xs" /> Direct COGS (52.8%)
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-indigo-400 rounded-xs" /> Operating Overheads (28.6%)
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-xs" /> Net Cash Profit (18.5%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: FINANCIAL HEALTH SCORE */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Holistic Business Index</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
              How Healthy Is Your Business?
            </h2>
            <p className="text-slate-400 text-base mt-2">
              A comprehensive composite score evaluating margins, cash buffer, liquidity, collections velocity, and leverage.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-slate-950/80 rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl">
            {/* Circular Score (Section 12 requirement: 78 / 100) */}
            <div className="flex flex-col items-center justify-center flex-shrink-0">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#334155"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#10B981"
                    strokeWidth="10"
                    strokeDasharray={314.15}
                    strokeDashoffset={314.15 * (1 - 78 / 100)}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-white">78</span>
                  <span className="text-xs font-bold text-slate-400">/ 100</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mt-2">
                Strong Financial Health
              </span>
            </div>

            {/* Score Breakdown (Section 12 requirement) */}
            <div className="w-full space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-xs font-medium text-slate-300">Profitability</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Strong
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-xs font-medium text-slate-300">Cash Flow</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Healthy
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-xs font-medium text-slate-300">Liquidity</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Strong
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-xs font-medium text-slate-300">Receivables</span>
                <span className="text-xs font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  Needs Attention
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-xs font-medium text-slate-300">Debt</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Healthy
                </span>
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={onExploreDemo}
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                >
                  <span>See Financial Health Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13: GST INTELLIGENCE SECTION */}
      <section id="gst" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                <span>Indian FinTech Intelligence</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Built for the Way Indian Businesses Operate.
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Reconcile outward supplies and purchase invoices with live GSTR-1, GSTR-2B, and GSTR-3B liability calculations.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-semibold">GST Collected (Output)</div>
                  <div className="text-lg font-bold text-slate-900 mt-1">₹2,92,800</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-semibold">Input GST (ITC)</div>
                  <div className="text-lg font-bold text-emerald-700 mt-1">₹1,68,000</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-semibold">Taxable Sales</div>
                  <div className="text-lg font-bold text-slate-900 mt-1">₹24,80,000</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-semibold">Taxable Purchases</div>
                  <div className="text-lg font-bold text-slate-900 mt-1">₹13,10,000</div>
                </div>
              </div>
            </div>

            {/* GST Liability Card (Section 13 requirement) */}
            <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 text-white border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">GST Intelligence Summary</span>
                </div>
                <span className="text-[11px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">GSTR-3B Preview</span>
              </div>

              <div className="text-center py-5 bg-slate-900/90 rounded-xl border border-slate-800/80 mb-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estimated GST Liability</div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1 tracking-tight">
                  ₹1,24,800
                </div>
                <div className="text-xs text-slate-400 mt-1">Net payable after ₹1.68L Input Tax Credit deduction</div>
              </div>

              {/* Compliance Notice (Mandatory Requirement in Section 13) */}
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 text-center italic">
                "Estimate only — verify with your CA/tax professional."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 14: INTEGRATIONS SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Unified Architecture</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-1">
              Connect the Financial Data You Already Have.
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Sync accounting ledgers, parse bank PDFs, or import standard CSV spreadsheets in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {/* Tally */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-slate-900">Tally Prime</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Connected
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accounting data synchronization architecture via XML ODBC connector.
              </p>
            </div>

            {/* Zoho Books */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-slate-900">Zoho Books</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Connect
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accounting platform integration via OAuth 2.0 API bridge.
              </p>
            </div>

            {/* Excel / CSV */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-slate-900">Excel / CSV</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Importer
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload financial data instantly with automatic column auto-mapping.
              </p>
            </div>

            {/* Bank Statements */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-slate-900">Bank Statements</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Connect
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Import supported financial data via HDFC, ICICI, SBI, Axis statement feeds.
              </p>
            </div>

            {/* GSTN */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-slate-900">GST Portal</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Connected
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                GST intelligence architecture for GSTR-1, 2B, and 3B reconciliation.
              </p>
            </div>

            {/* Razorpay / Payment Gateway */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-slate-900">Payment Gateways</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Coming Soon
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated webhook settlement feeds for Stripe and Razorpay merchants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 15: FINANCIAL STATEMENTS SECTION */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Executive Accuracy</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-1">
              Dynamic Financial Statements.
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Instantly generated, mathematically balanced financial statements derived directly from underlying ledgers.
            </p>
          </div>

          {/* Statement Tabs (Section 15 requirement) */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setStatementTab('pnl')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    statementTab === 'pnl' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  P&L
                </button>
                <button
                  onClick={() => setStatementTab('balanceSheet')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    statementTab === 'balanceSheet' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Balance Sheet
                </button>
                <button
                  onClick={() => setStatementTab('cashFlow')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    statementTab === 'cashFlow' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Cash Flow
                </button>
                <button
                  onClick={() => setStatementTab('trialBalance')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    statementTab === 'trialBalance' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Trial Balance
                </button>
              </div>

              <button
                onClick={onExploreDemo}
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download Report</span>
              </button>
            </div>

            {/* Financial Table */}
            <div className="bg-slate-50 rounded-xl border border-slate-200/90 overflow-hidden shadow-xs">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Line Item</th>
                    <th className="py-3 px-4 text-right">Amount (₹)</th>
                    <th className="py-3 px-4 text-right">% of Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 font-mono text-xs">
                  {statementTab === 'pnl' && (
                    <>
                      <tr className="bg-white font-semibold">
                        <td className="py-2.5 px-4 text-slate-900">Revenue</td>
                        <td className="py-2.5 px-4 text-right text-slate-900">₹24,80,000</td>
                        <td className="py-2.5 px-4 text-right text-blue-600 font-bold">100.0%</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="py-2.5 px-4 text-slate-600 pl-8">Cost of Goods Sold (COGS)</td>
                        <td className="py-2.5 px-4 text-right text-slate-700">₹13,10,000</td>
                        <td className="py-2.5 px-4 text-right text-slate-500">52.8%</td>
                      </tr>
                      <tr className="bg-blue-50/50 font-bold">
                        <td className="py-2.5 px-4 text-blue-900">Gross Profit</td>
                        <td className="py-2.5 px-4 text-right text-blue-900">₹11,70,000</td>
                        <td className="py-2.5 px-4 text-right text-blue-700">47.2%</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="py-2.5 px-4 text-slate-600 pl-8">Operating Expenses (OpEx)</td>
                        <td className="py-2.5 px-4 text-right text-slate-700">₹7,10,000</td>
                        <td className="py-2.5 px-4 text-right text-slate-500">28.6%</td>
                      </tr>
                      <tr className="bg-emerald-50 font-extrabold text-sm border-t-2 border-emerald-300">
                        <td className="py-3 px-4 text-emerald-950 font-sans">Net Profit</td>
                        <td className="py-3 px-4 text-right text-emerald-950">₹4,60,000</td>
                        <td className="py-3 px-4 text-right text-emerald-700">18.5%</td>
                      </tr>
                    </>
                  )}

                  {statementTab === 'balanceSheet' && (
                    <>
                      <tr className="bg-white font-bold">
                        <td className="py-2.5 px-4 text-slate-900">Total Current & Fixed Assets</td>
                        <td className="py-2.5 px-4 text-right text-slate-900">₹24,18,000</td>
                        <td className="py-2.5 px-4 text-right text-emerald-600">Assets</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="py-2.5 px-4 text-slate-600 pl-8">Total Liabilities & Dues</td>
                        <td className="py-2.5 px-4 text-right text-slate-700">₹10,37,800</td>
                        <td className="py-2.5 px-4 text-right text-slate-500">Liabilities</td>
                      </tr>
                      <tr className="bg-blue-50/50 font-bold">
                        <td className="py-2.5 px-4 text-blue-900">Shareholder Equity & Reserves</td>
                        <td className="py-2.5 px-4 text-right text-blue-900">₹13,80,200</td>
                        <td className="py-2.5 px-4 text-right text-blue-700">Equity</td>
                      </tr>
                    </>
                  )}

                  {statementTab === 'cashFlow' && (
                    <>
                      <tr className="bg-white font-semibold">
                        <td className="py-2.5 px-4 text-slate-900">Net Cash from Operating Activities</td>
                        <td className="py-2.5 px-4 text-right text-emerald-700 font-bold">+₹4,85,000</td>
                        <td className="py-2.5 px-4 text-right text-slate-500">Operations</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="py-2.5 px-4 text-slate-600 pl-8">Net Cash from Investing Activities</td>
                        <td className="py-2.5 px-4 text-right text-slate-700">-₹50,000</td>
                        <td className="py-2.5 px-4 text-right text-slate-500">Capex</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="py-2.5 px-4 text-slate-600 pl-8">Net Cash from Financing Activities</td>
                        <td className="py-2.5 px-4 text-right text-slate-700">-₹70,000</td>
                        <td className="py-2.5 px-4 text-right text-slate-500">Financing</td>
                      </tr>
                      <tr className="bg-emerald-50 font-bold">
                        <td className="py-2.5 px-4 text-emerald-900">Closing Cash Balance</td>
                        <td className="py-2.5 px-4 text-right text-emerald-900 font-mono">₹8,20,000</td>
                        <td className="py-2.5 px-4 text-right text-emerald-700">Liquid</td>
                      </tr>
                    </>
                  )}

                  {statementTab === 'trialBalance' && (
                    <>
                      <tr className="bg-white">
                        <td className="py-2 px-4 text-slate-900">1010 - HDFC Bank Current A/c</td>
                        <td className="py-2 px-4 text-right text-slate-900 font-bold">₹5,40,000 (Dr)</td>
                        <td className="py-2 px-4 text-right text-slate-500">Asset</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="py-2 px-4 text-slate-900">4010 - Software Revenue</td>
                        <td className="py-2 px-4 text-right text-slate-900 font-bold">₹24,80,000 (Cr)</td>
                        <td className="py-2 px-4 text-right text-slate-500">Revenue</td>
                      </tr>
                      <tr className="bg-blue-50 font-bold">
                        <td className="py-2 px-4 text-blue-900">Trial Balance Equality</td>
                        <td className="py-2 px-4 text-right text-blue-900">₹44,38,000 = ₹44,38,000</td>
                        <td className="py-2 px-4 text-right text-emerald-600 font-bold">Matched</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 16: CFO ALERTS SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Proactive Monitoring</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-1">
              Don't Wait for the Month-End Review.
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Continuous real-time risk scanners detect margin leaks, overdue debtors, and liquidity threshold risks early.
            </p>
          </div>

          {/* CFO Alerts Cards (Section 16 exact requirement) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {/* High Alert */}
            <div className="p-5 bg-white rounded-xl border border-rose-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 mb-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>🔴 High Priority</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">₹4.2L Overdue Receivables</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Apex Logistics (₹1.3L) and Solaris (₹80K) past standard payment cycles.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-rose-600">
                Action: Issue reminder notice →
              </div>
            </div>

            {/* Medium Alert */}
            <div className="p-5 bg-white rounded-xl border border-amber-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>🟠 Medium Priority</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">Marketing Expenses +31%</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Ad campaign spend rose to ₹1.95L without proportional conversion velocity.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-amber-700">
                Action: Audit CAC by channel →
              </div>
            </div>

            {/* Attention Alert */}
            <div className="p-5 bg-white rounded-xl border border-yellow-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-yellow-800 mb-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span>🟡 Attention</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">Cash Threshold Risk</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Projected cash may dip to ₹4.85L in 47 days below your safety threshold.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-yellow-800">
                Action: Expedite collections →
              </div>
            </div>

            {/* Positive Alert */}
            <div className="p-5 bg-white rounded-xl border border-emerald-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>🟢 Positive Milestone</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">Revenue Increased 12.4%</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Top-line reached ₹24.8L led by enterprise software retainers.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700">
                Action: Re-invest in growth →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 17: FEATURES SECTION (6 Premium Cards) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Core Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-1">
              Engineered for Enterprise Financial Rigor.
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Everything high-growth founders and executive teams need to manage capital efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Feature 1: AI CFO */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">AI CFO</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Ask deep financial questions and receive root-cause analysis, cash impacts, and tactical actions.
              </p>
            </div>

            {/* Feature 2: Cash Flow Intelligence */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Cash Flow Intelligence</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Understand current liquidity, burn rates, runway length, and safety buffer thresholds in real time.
              </p>
            </div>

            {/* Feature 3: Profitability Analytics */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <PieChart className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Profitability Analytics</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Know what drives your profit with unit economics, COGS ratios, and department spend tracking.
              </p>
            </div>

            {/* Feature 4: Financial Forecasting */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center mb-4 shadow-sm">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Financial Forecasting</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Prepare for what's coming with 30-day and 90-day predictive revenue, expense, and tax models.
              </p>
            </div>

            {/* Feature 5: GST Intelligence */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <IndianRupee className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">GST Intelligence</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Understand estimated GST obligations, input tax credit eligibility, and GSTR-3B audit drafts.
              </p>
            </div>

            {/* Feature 6: CFO Reports */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center mb-4 shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">CFO Reports</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Generate branded, board-ready executive financial dossier PDFs for investors, banks, and leaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 18: HOW IT WORKS */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">The 4-Step Process</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-1">
              Data → Intelligence → Forecast → Action
            </h2>
            <p className="text-slate-600 text-base mt-2">
              From raw accounting records to decisive financial execution in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="text-2xl font-black text-blue-600 font-mono mb-2">01</div>
              <h3 className="text-base font-bold text-slate-900">Connect</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Connect your accounting data (Tally / Zoho) or upload bank / CSV statements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="text-2xl font-black text-blue-600 font-mono mb-2">02</div>
              <h3 className="text-base font-bold text-slate-900">Understand</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                YTech CFO organizes and analyzes unit margins, aging receivables, and spend velocity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="text-2xl font-black text-blue-600 font-mono mb-2">03</div>
              <h3 className="text-base font-bold text-slate-900">Predict</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Forecast cash flow, revenue, expenses, and liquidity risk points 90 days ahead.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="text-2xl font-black text-emerald-600 font-mono mb-2">04</div>
              <h3 className="text-base font-bold text-slate-900">Act</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Receive CFO-level recommendations, trigger automated collection notices, and optimize margins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 19: SECURITY SECTION */}
      <section id="security" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Institutional Trust</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
              Your Financial Data Deserves Serious Protection.
            </h2>
            <p className="text-slate-400 text-base mt-2">
              Engineered with zero-trust architecture, tenant isolation, and encrypted audit logging.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
              <ShieldCheck className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-sm font-bold text-white">Secure Authentication</h3>
              <p className="text-xs text-slate-400 mt-1">Multi-factor ready with cryptographic token session validation.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
              <Layers className="w-6 h-6 text-emerald-400 mb-3" />
              <h3 className="text-sm font-bold text-white">Organization Data Isolation</h3>
              <p className="text-xs text-slate-400 mt-1">Strict multi-tenant cryptographic partitioning of all ledgers.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
              <Lock className="w-6 h-6 text-indigo-400 mb-3" />
              <h3 className="text-sm font-bold text-white">Role-Based Access (RBAC)</h3>
              <p className="text-xs text-slate-400 mt-1">Granular permissions for Founders, Accountants, and Auditors.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
              <Clock className="w-6 h-6 text-amber-400 mb-3" />
              <h3 className="text-sm font-bold text-white">Immutable Audit Logs</h3>
              <p className="text-xs text-slate-400 mt-1">Comprehensive timestamped access and ledger modification histories.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
              <Zap className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-sm font-bold text-white">Encryption-Ready Architecture</h3>
              <p className="text-xs text-slate-400 mt-1">TLS 1.3 in transit and AES-256 data volume protection ready.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
              <Server className="w-6 h-6 text-emerald-400 mb-3" />
              <h3 className="text-sm font-bold text-white">Secure API Architecture</h3>
              <p className="text-xs text-slate-400 mt-1">Rate-limited, proxy-hardened endpoints with zero client key exposure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 20: PRICING SECTION */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Transparent Plans</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-1">
              Predictable Pricing for High-Growth Businesses.
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Start free today and upgrade as your transaction volume and advisory complexity grow.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="mt-6 inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setPricingCycle('monthly')}
                className={`px-4 py-1.5 rounded-lg transition-all ${
                  pricingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setPricingCycle('annual')}
                className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  pricingCycle === 'annual' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-1.5 py-0.2 bg-emerald-400 text-slate-950 text-[10px] rounded font-black">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Tier 1: Free */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Free</h3>
                <p className="text-xs text-slate-500 mt-1">For exploring YTech CFO & sample data.</p>
                <div className="my-5">
                  <span className="text-3xl font-black text-slate-900">₹0</span>
                  <span className="text-xs text-slate-500 ml-1">/ month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Up to 100 Transactions / mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Basic P&L and Balance Sheet</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>AI CFO — 10 queries / mo</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onStartFree}
                className="mt-6 w-full py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-800 hover:bg-slate-50"
              >
                Get Started
              </button>
            </div>

            {/* Tier 2: Growth */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Growth</h3>
                <p className="text-xs text-slate-500 mt-1">For growing businesses & early startups.</p>
                <div className="my-5">
                  <span className="text-3xl font-black text-slate-900">
                    {pricingCycle === 'annual' ? '₹2,499' : '₹2,999'}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">/ month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Up to 2,500 Transactions / mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>30-Day Cash Flow Forecasting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>AI CFO — 100 queries / mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Tally & CSV Sync Bridge</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onStartFree}
                className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
              >
                Start Growth Trial
              </button>
            </div>

            {/* Tier 3: Pro (Highlighted) */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-50/80 to-white border-2 border-blue-600 flex flex-col justify-between shadow-md relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                Most Popular
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-950">Pro</h3>
                <p className="text-xs text-slate-600 mt-1">For businesses needing advanced intelligence.</p>
                <div className="my-5">
                  <span className="text-3xl font-black text-blue-950">
                    {pricingCycle === 'annual' ? '₹5,999' : '₹6,999'}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">/ month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-800 border-t border-blue-100 pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span>Unlimited Transactions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span>90-Day Predictive Liquidity Curve</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span>Full Indian GST Intelligence & GSTR Drafts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span>Unlimited AI CFO Inquiries</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <span>Automated Executive Dossier PDFs</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onStartFree}
                className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-sm shadow-blue-500/20"
              >
                Start Pro Plan
              </button>
            </div>

            {/* Tier 4: Enterprise */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Enterprise</h3>
                <p className="text-xs text-slate-500 mt-1">For multi-entity organizations & CA firms.</p>
                <div className="my-5">
                  <span className="text-2xl font-black text-slate-900">Custom</span>
                  <span className="text-xs text-slate-500 ml-1">Volume Pricing</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Multi-Entity Consolidation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Custom ERP & Bank API Connectors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Dedicated CA / CFO Success Lead</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Custom SLA & Audit Isolation</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onExploreDemo}
                className="mt-6 w-full py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-800 hover:bg-slate-50"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 21: FINAL CTA */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <Logo variant="white" size="lg" className="justify-center mb-4" />

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Stop Guessing.
            <br />
            <span className="text-blue-400">Start Knowing.</span>
          </h2>

          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            "Your financial data already contains the answers. YTech CFO helps you find them."
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="final-cta-start-free"
              onClick={onStartFree}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 text-base"
            >
              <span>Start Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              id="final-cta-talk-cfo"
              onClick={onExploreDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all inline-flex items-center justify-center gap-2 text-base"
            >
              <Brain className="w-5 h-5 text-blue-400" />
              <span>Talk to YTech CFO</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 22: PROFESSIONAL POLISH FOOTER HIGHLIGHTS & SITEMAP */}
      <div className="bg-white border-t border-slate-200 px-6 sm:px-10 py-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12 w-full lg:w-auto">
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Cash Flow</h4>
              <p className="text-sm font-semibold text-slate-900">Predict future liquidity</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Profitability</h4>
              <p className="text-sm font-semibold text-slate-900">Understand unit margins</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Forecasting</h4>
              <p className="text-sm font-semibold text-slate-900">Scenario planning engine</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Indian SMB Focus</h4>
              <p className="text-sm font-semibold text-slate-900">GST Intelligence built-in</p>
            </div>
          </div>
          <div className="text-center lg:text-right border-t lg:border-t-0 pt-4 lg:pt-0 w-full lg:w-auto border-slate-100">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">© 2026 YTECH CFO</p>
            <p className="text-[10px] text-slate-400 font-medium">FINANCIAL INTELLIGENCE LAYER</p>
          </div>
        </div>
      </div>

      <footer className="bg-slate-900 text-slate-400 py-14 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand column */}
            <div className="col-span-2 space-y-4">
              <Logo variant="white" size="md" />
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                AI-powered financial intelligence for modern businesses. Converts complex accounting data into forecasts, profitability insights, and CFO-level actions.
              </p>
              <div className="text-xs text-slate-500">
                Primary Currency: <span className="text-slate-300 font-mono">INR (₹)</span> • Engine: <span className="text-blue-400 font-mono">YTech CFO v2.6</span>
              </div>
            </div>

            {/* Product */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Product</div>
              <ul className="space-y-2 text-xs">
                <li><a href="#platform" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#ai-cfo" className="hover:text-white transition-colors">AI CFO</a></li>
                <li><a href="#cash-flow" className="hover:text-white transition-colors">Forecasting</a></li>
                <li><a href="#profitability" className="hover:text-white transition-colors">Statements</a></li>
                <li><a href="#gst" className="hover:text-white transition-colors">GST Intelligence</a></li>
                <li><a href="#reports" className="hover:text-white transition-colors">Executive Reports</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Company</div>
              <ul className="space-y-2 text-xs">
                <li><span className="hover:text-white cursor-pointer transition-colors">About YTech CFO</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Careers</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Contact</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Partner Network</span></li>
              </ul>
            </div>

            {/* Resources & Legal */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Resources & Legal</div>
              <ul className="space-y-2 text-xs">
                <li><span className="hover:text-white cursor-pointer transition-colors">Financial Insights</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Help Center</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Documentation</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Security Architecture</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © 2026 YTech CFO. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Financial Intelligence Layer for Modern Businesses</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
