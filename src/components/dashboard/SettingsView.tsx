import React, { useState } from 'react';
import {
  Building2,
  Save,
  RotateCcw,
  ShieldCheck,
  IndianRupee,
  Lock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { BusinessProfile } from '../../types';

interface SettingsViewProps {
  profile: BusinessProfile;
  onUpdateProfile: (updated: Partial<BusinessProfile>) => void;
  onResetDemo: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  onUpdateProfile,
  onResetDemo,
}) => {
  const [name, setName] = useState(profile.name);
  const [legalName, setLegalName] = useState(profile.legalName || `${profile.name} Pvt Ltd`);
  const [industry, setIndustry] = useState(profile.industry);
  const [gstin, setGstin] = useState(profile.gstin || '27AAECY9876Q1Z5');
  const [cashSafetyThreshold, setCashSafetyThreshold] = useState(
    profile.cashSafetyThreshold?.toString() || '500000'
  );
  const [currency] = useState(profile.currency || 'INR (₹)');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      legalName,
      industry,
      gstin,
      cashSafetyThreshold: parseFloat(cashSafetyThreshold) || 500000,
      currency,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight">
            Organization Profile & Financial Parameters
          </h2>
          <p className="text-xs text-slate-500">
            Configure entity details, tax IDs, and automated cash threshold alerts.
          </p>
        </div>

        {profile.isDemo && (
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
            Active Org: YTech CFO Demo
          </span>
        )}
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Company Display Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Registered Legal Entity Name
            </label>
            <input
              type="text"
              value={legalName}
              onChange={(e) => setLegalName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Industry Sector
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              GSTIN (Tax Identifier)
            </label>
            <input
              type="text"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Minimum Cash Safety Buffer Threshold (₹)
            </label>
            <input
              type="number"
              value={cashSafetyThreshold}
              onChange={(e) => setCashSafetyThreshold(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Triggers predictive liquidity alerts whenever 90-day cash curve approaches this value.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Base Reporting Currency
            </label>
            <input
              type="text"
              disabled
              value={currency}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onResetDemo}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-300 inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Demo Dataset</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs shadow-blue-500/20 inline-flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>{savedNotice ? 'Saved Successfully!' : 'Save Organization Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
