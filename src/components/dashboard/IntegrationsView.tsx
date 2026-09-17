import React, { useState } from 'react';
import {
  Plug,
  CheckCircle2,
  RefreshCw,
  FileSpreadsheet,
  Building2,
  IndianRupee,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const IntegrationsView: React.FC = () => {
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const integrations = [
    {
      id: 'tally',
      name: 'Tally Prime / ERP 9',
      category: 'Accounting Software',
      status: 'connected',
      lastSync: '10 mins ago',
      description: 'Continuous XML ODBC sync architecture for general ledger vouchers, sales invoices, and vendor bills.',
    },
    {
      id: 'zoho',
      name: 'Zoho Books',
      category: 'Cloud Accounting',
      status: 'ready',
      lastSync: 'Not connected',
      description: 'REST API 2-way data bridge for real-time contact books and sales journal synchronization.',
    },
    {
      id: 'gstn',
      name: 'GST Portal (GSTN)',
      category: 'Tax & Compliance',
      status: 'connected',
      lastSync: '1 hour ago',
      description: 'Direct GSTR-1, GSTR-2B, and GSTR-3B tax return filing & ITC reconciliation pipeline.',
    },
    {
      id: 'bank-hdfc',
      name: 'HDFC Corporate Bank Feed',
      category: 'Banking & Liquidity',
      status: 'connected',
      lastSync: '25 mins ago',
      description: 'Automated bank statement feeds and treasury balance monitoring.',
    },
    {
      id: 'bank-icici',
      name: 'ICICI Bank Current Account',
      category: 'Banking & Liquidity',
      status: 'connected',
      lastSync: '40 mins ago',
      description: 'Corporate API integration for daily settlements and overdraft alerts.',
    },
    {
      id: 'csv',
      name: 'Excel / CSV Ledger Importer',
      category: 'File Import',
      status: 'connected',
      lastSync: 'Active',
      description: 'Drag & drop parser supporting standard accounting spreadsheets and custom bank statement layouts.',
    },
  ];

  const handleTriggerSync = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setSyncingId(null);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight">
            Financial Connectors & Integrations
          </h2>
          <p className="text-xs text-slate-500">
            Connect accounting software, corporate bank feeds, and tax portals into one central CFO layer.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Zero-Knowledge Encryption Active</span>
        </div>
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  {item.category}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === 'connected'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {item.status === 'connected' ? 'Connected' : 'Available'}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">{item.name}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.description}</p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono">Sync: {item.lastSync}</span>

              {item.status === 'connected' ? (
                <button
                  onClick={() => handleTriggerSync(item.id)}
                  disabled={syncingId === item.id}
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center gap-1 transition-all"
                >
                  <RefreshCw
                    className={`w-3 h-3 text-slate-600 ${syncingId === item.id ? 'animate-spin' : ''}`}
                  />
                  <span>{syncingId === item.id ? 'Syncing...' : 'Sync Now'}</span>
                </button>
              ) : (
                <button
                  onClick={() => handleTriggerSync(item.id)}
                  className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
