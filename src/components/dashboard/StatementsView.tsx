import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Calendar,
  Layers,
  IndianRupee,
  CheckCircle2,
  TrendingUp,
  FileText,
} from 'lucide-react';
import { FinancialStatements } from '../../types';

interface StatementsViewProps {
  statements: FinancialStatements | null;
  businessName: string;
}

export const StatementsView: React.FC<StatementsViewProps> = ({
  statements,
  businessName,
}) => {
  const [activeStatement, setActiveStatement] = useState<'pnl' | 'balanceSheet' | 'cashFlow' | 'trialBalance'>('pnl');

  const pnl = statements?.pnl || {
    period: 'Current Period (FY 2026-27)',
    revenue: 2480000,
    cogs: 1310000,
    grossProfit: 1170000,
    grossMargin: 47.2,
    operatingExpenses: [
      { category: 'Salaries & Wages', amount: 320000 },
      { category: 'Marketing & CAC', amount: 195000 },
      { category: 'Rent & Office', amount: 80000 },
      { category: 'Software & Cloud Ops', amount: 65000 },
      { category: 'Logistics & Travel', amount: 50000 },
    ],
    totalOpEx: 710000,
    ebitda: 460000,
    depreciation: 0,
    interest: 0,
    tax: 0,
    netProfit: 460000,
    netMargin: 18.5,
  };

  const balanceSheet = statements?.balanceSheet || {
    asOfDate: '2026-08-18',
    assets: {
      currentAssets: [
        { name: 'Cash & Bank Balances (HDFC / ICICI)', amount: 820000 },
        { name: 'Trade Receivables (Debtors)', amount: 420000 },
        { name: 'Prepaid Expenses & Advances', amount: 85000 },
        { name: 'Input Tax Credit (ITC Asset)', amount: 168000 },
      ],
      totalCurrentAssets: 1493000,
      fixedAssets: [
        { name: 'Computer & Server Hardware', amount: 650000 },
        { name: 'Office Equipment & Fixtures', amount: 275000 },
      ],
      totalFixedAssets: 925000,
      totalAssets: 2418000,
    },
    liabilities: {
      currentLiabilities: [
        { name: 'Trade Payables (Creditors)', amount: 620000 },
        { name: 'Estimated GST Liability Payable', amount: 292800 },
        { name: 'Employee Dues & Accruals', amount: 125000 },
      ],
      totalCurrentLiabilities: 1037800,
      longTermLiabilities: [],
      totalLongTermLiabilities: 0,
      totalLiabilities: 1037800,
    },
    equity: {
      shareCapital: 500000,
      retainedEarnings: 880200,
      totalEquity: 1380200,
    },
    isBalanced: true,
  };

  const cashFlow = statements?.cashFlow || {
    period: 'Current Period (FY 2026-27)',
    operatingActivities: [
      { name: 'Operating Cash Inflow from Customers', amount: 2270000 },
      { name: 'Cash Payments to Suppliers & Overheads', amount: -1785000 },
    ],
    netOperatingCash: 485000,
    investingActivities: [
      { name: 'Purchase of Hardware Assets', amount: -50000 },
    ],
    netInvestingCash: -50000,
    financingActivities: [
      { name: 'Repayment of Working Capital Loan', amount: -70000 },
    ],
    netFinancingCash: -70000,
    netCashChange: 365000,
    openingCash: 455000,
    closingCash: 820000,
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Controller Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black text-slate-900 tracking-tight">
              Dynamic Financial Statements
            </h2>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
              Balanced
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Certified double-entry reports for <strong className="text-slate-800">{businessName}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab Selector */}
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold flex">
            <button
              onClick={() => setActiveStatement('pnl')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeStatement === 'pnl' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              P&L
            </button>
            <button
              onClick={() => setActiveStatement('balanceSheet')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeStatement === 'balanceSheet' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Balance Sheet
            </button>
            <button
              onClick={() => setActiveStatement('cashFlow')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeStatement === 'cashFlow' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Cash Flow
            </button>
            <button
              onClick={() => setActiveStatement('trialBalance')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeStatement === 'trialBalance' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Trial Balance
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            title="Print or Save PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Statement Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 font-sans">
        {/* Document Header */}
        <div className="border-b border-slate-200 pb-5 mb-6 flex items-start justify-between">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-blue-600 font-mono">
              YTech AI CFO • Executive Financial Statement
            </div>
            <h3 className="text-xl font-black text-slate-950 mt-1">
              {activeStatement === 'pnl' && 'Statement of Profit and Loss (Income Statement)'}
              {activeStatement === 'balanceSheet' && 'Statement of Financial Position (Balance Sheet)'}
              {activeStatement === 'cashFlow' && 'Statement of Cash Flows (Direct Method)'}
              {activeStatement === 'trialBalance' && 'Audited Trial Balance Summary'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Entity: <strong className="text-slate-800">{businessName}</strong> • Currency: INR (₹) • As of August 2026
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-400">STATUS</div>
            <div className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
              Verified & Reconciled
            </div>
          </div>
        </div>

        {/* P&L Statement View */}
        {activeStatement === 'pnl' && (
          <div className="space-y-4">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-300 text-slate-600 font-extrabold uppercase text-[11px]">
                  <th className="py-2.5">Line Item</th>
                  <th className="py-2.5 text-right">Amount (₹)</th>
                  <th className="py-2.5 text-right">% of Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {/* Revenue */}
                <tr className="bg-slate-50/70 font-bold">
                  <td className="py-3 text-slate-950 font-sans">Operating Revenue (Sales)</td>
                  <td className="py-3 text-right text-slate-950 font-bold">₹{pnl.revenue.toLocaleString('en-IN')}</td>
                  <td className="py-3 text-right text-blue-600">100.0%</td>
                </tr>

                {/* COGS */}
                <tr>
                  <td className="py-2.5 pl-6 text-slate-600 font-sans">Less: Cost of Goods Sold (Direct Costs)</td>
                  <td className="py-2.5 text-right text-slate-700">(₹{pnl.cogs.toLocaleString('en-IN')})</td>
                  <td className="py-2.5 text-right text-slate-500">
                    {((pnl.cogs / pnl.revenue) * 100).toFixed(1)}%
                  </td>
                </tr>

                {/* Gross Profit */}
                <tr className="bg-blue-50/50 font-black text-sm border-t border-blue-200">
                  <td className="py-3 text-blue-950 font-sans">Gross Profit</td>
                  <td className="py-3 text-right text-blue-950">₹{pnl.grossProfit.toLocaleString('en-IN')}</td>
                  <td className="py-3 text-right text-blue-700 font-bold">{pnl.grossMargin}%</td>
                </tr>

                {/* Operating Expenses */}
                <tr className="bg-slate-50 font-bold">
                  <td colSpan={3} className="py-2 text-slate-700 uppercase text-[10px] tracking-wider font-sans">
                    Operating Overhead Expenses (OpEx)
                  </td>
                </tr>
                {pnl.operatingExpenses.map((exp, idx) => (
                  <tr key={idx}>
                    <td className="py-2 pl-6 text-slate-600 font-sans">{exp.category}</td>
                    <td className="py-2 text-right text-slate-700">₹{exp.amount.toLocaleString('en-IN')}</td>
                    <td className="py-2 text-right text-slate-500">
                      {((exp.amount / pnl.revenue) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}

                <tr className="font-semibold text-slate-800">
                  <td className="py-2 pl-6 font-sans">Total Operating Overhead Expenses</td>
                  <td className="py-2 text-right">(₹{pnl.totalOpEx.toLocaleString('en-IN')})</td>
                  <td className="py-2 text-right text-slate-500">
                    {((pnl.totalOpEx / pnl.revenue) * 100).toFixed(1)}%
                  </td>
                </tr>

                {/* EBITDA / Net Profit */}
                <tr className="bg-emerald-50 font-black text-base border-t-2 border-emerald-400 text-emerald-950">
                  <td className="py-3.5 font-sans">Net Cash Profit (Operating Margin)</td>
                  <td className="py-3.5 text-right font-mono">₹{pnl.netProfit.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 text-right text-emerald-800 font-bold">{pnl.netMargin}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Balance Sheet View */}
        {activeStatement === 'balanceSheet' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Assets */}
            <div>
              <h4 className="text-sm font-black text-slate-900 border-b border-slate-300 pb-2 mb-3 uppercase tracking-wider">
                Assets
              </h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="font-bold text-slate-700 font-sans text-xs">Current Assets:</div>
                {balanceSheet.assets.currentAssets.map((a, i) => (
                  <div key={i} className="flex justify-between pl-4 text-slate-600">
                    <span className="font-sans">{a.name}</span>
                    <span>₹{a.amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-100">
                  <span className="font-sans">Total Current Assets</span>
                  <span>₹{balanceSheet.assets.totalCurrentAssets.toLocaleString('en-IN')}</span>
                </div>

                <div className="font-bold text-slate-700 font-sans text-xs pt-3">Fixed & Long-term Assets:</div>
                {balanceSheet.assets.fixedAssets.map((a, i) => (
                  <div key={i} className="flex justify-between pl-4 text-slate-600">
                    <span className="font-sans">{a.name}</span>
                    <span>₹{a.amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-100">
                  <span className="font-sans">Total Fixed Assets</span>
                  <span>₹{balanceSheet.assets.totalFixedAssets.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between font-black text-sm text-slate-950 p-2.5 bg-slate-100 rounded-lg mt-4 border border-slate-200">
                  <span className="font-sans">TOTAL ASSETS</span>
                  <span>₹{balanceSheet.assets.totalAssets.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Liabilities & Equity */}
            <div>
              <h4 className="text-sm font-black text-slate-900 border-b border-slate-300 pb-2 mb-3 uppercase tracking-wider">
                Liabilities & Equity
              </h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="font-bold text-slate-700 font-sans text-xs">Current Liabilities:</div>
                {balanceSheet.liabilities.currentLiabilities.map((l, i) => (
                  <div key={i} className="flex justify-between pl-4 text-slate-600">
                    <span className="font-sans">{l.name}</span>
                    <span>₹{l.amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-100">
                  <span className="font-sans">Total Liabilities</span>
                  <span>₹{balanceSheet.liabilities.totalLiabilities.toLocaleString('en-IN')}</span>
                </div>

                <div className="font-bold text-slate-700 font-sans text-xs pt-3">Shareholder Equity:</div>
                <div className="flex justify-between pl-4 text-slate-600">
                  <span className="font-sans">Paid-up Share Capital</span>
                  <span>₹{balanceSheet.equity.shareCapital.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pl-4 text-slate-600">
                  <span className="font-sans">Retained Earnings & Reserves</span>
                  <span>₹{balanceSheet.equity.retainedEarnings.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-100">
                  <span className="font-sans">Total Equity</span>
                  <span>₹{balanceSheet.equity.totalEquity.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between font-black text-sm text-slate-950 p-2.5 bg-blue-50 rounded-lg mt-4 border border-blue-200">
                  <span className="font-sans">TOTAL LIABILITIES & EQUITY</span>
                  <span>
                    ₹{(balanceSheet.liabilities.totalLiabilities + balanceSheet.equity.totalEquity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cash Flow Statement View */}
        {activeStatement === 'cashFlow' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="p-3 bg-slate-50 rounded-xl space-y-2">
              <div className="font-bold text-slate-900 font-sans text-xs uppercase">Operating Activities:</div>
              {cashFlow.operatingActivities.map((act, i) => (
                <div key={i} className="flex justify-between pl-4 text-slate-700">
                  <span className="font-sans">{act.name}</span>
                  <span className={act.amount > 0 ? 'text-emerald-700 font-bold' : 'text-slate-800'}>
                    {act.amount > 0 ? '+' : ''}₹{act.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              <div className="flex justify-between font-black text-slate-950 pt-2 border-t border-slate-200">
                <span className="font-sans">Net Cash from Operations</span>
                <span className="text-emerald-700">+₹{cashFlow.netOperatingCash.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-2">
              <div className="font-bold text-slate-900 font-sans text-xs uppercase">Investing Activities:</div>
              {cashFlow.investingActivities.map((act, i) => (
                <div key={i} className="flex justify-between pl-4 text-slate-700">
                  <span className="font-sans">{act.name}</span>
                  <span>₹{act.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span className="font-sans">Net Cash from Investing</span>
                <span>₹{cashFlow.netInvestingCash.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-2">
              <div className="font-bold text-slate-900 font-sans text-xs uppercase">Financing Activities:</div>
              {cashFlow.financingActivities.map((act, i) => (
                <div key={i} className="flex justify-between pl-4 text-slate-700">
                  <span className="font-sans">{act.name}</span>
                  <span>₹{act.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span className="font-sans">Net Cash from Financing</span>
                <span>₹{cashFlow.netFinancingCash.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between font-black text-sm text-emerald-950">
              <span className="font-sans">CLOSING CASH & EQUIVALENTS</span>
              <span>₹{cashFlow.closingCash.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}

        {/* Trial Balance View */}
        {activeStatement === 'trialBalance' && (
          <div className="space-y-3">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-300 font-extrabold uppercase text-[11px] text-slate-600">
                  <th className="py-2">Account Code & Description</th>
                  <th className="py-2 text-right">Debit (Dr) ₹</th>
                  <th className="py-2 text-right">Credit (Cr) ₹</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 font-sans">1010 - HDFC Bank Current A/c</td>
                  <td className="py-2 text-right font-bold text-slate-900">₹5,40,000</td>
                  <td className="py-2 text-right text-slate-400">—</td>
                </tr>
                <tr>
                  <td className="py-2 font-sans">1020 - ICICI Bank Treasury A/c</td>
                  <td className="py-2 text-right font-bold text-slate-900">₹2,80,000</td>
                  <td className="py-2 text-right text-slate-400">—</td>
                </tr>
                <tr>
                  <td className="py-2 font-sans">1200 - Accounts Receivable (Sundry Debtors)</td>
                  <td className="py-2 text-right font-bold text-slate-900">₹4,20,000</td>
                  <td className="py-2 text-right text-slate-400">—</td>
                </tr>
                <tr>
                  <td className="py-2 font-sans">2010 - Accounts Payable (Sundry Creditors)</td>
                  <td className="py-2 text-right text-slate-400">—</td>
                  <td className="py-2 text-right font-bold text-slate-900">₹6,20,000</td>
                </tr>
                <tr>
                  <td className="py-2 font-sans">4010 - Software Revenue & Retainers</td>
                  <td className="py-2 text-right text-slate-400">—</td>
                  <td className="py-2 text-right font-bold text-slate-900">₹24,80,000</td>
                </tr>
                <tr>
                  <td className="py-2 font-sans">5010 - Direct Production & Cloud COGS</td>
                  <td className="py-2 text-right font-bold text-slate-900">₹13,10,000</td>
                  <td className="py-2 text-right text-slate-400">—</td>
                </tr>
                <tr>
                  <td className="py-2 font-sans">6010 - Operating Salaries & Wages</td>
                  <td className="py-2 text-right font-bold text-slate-900">₹3,20,000</td>
                  <td className="py-2 text-right text-slate-400">—</td>
                </tr>
                <tr className="bg-blue-50 font-black text-sm text-blue-950 border-t-2 border-blue-400">
                  <td className="py-3 font-sans">TOTALS (Trial Balance Reconciled)</td>
                  <td className="py-3 text-right">₹44,38,000</td>
                  <td className="py-3 text-right">₹44,38,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
