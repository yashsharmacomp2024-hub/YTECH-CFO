import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import {
  Building2,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  IndianRupee,
  Upload,
  Plug,
  FileText,
  AlertCircle,
  RefreshCw,
  Sliders,
  Database,
  Layers,
  Check,
  HelpCircle,
} from 'lucide-react';
import { BusinessProfile } from '../../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: Partial<BusinessProfile>) => void;
  onUseDemo: () => void;
  onClose?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
  onUseDemo,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Business Profile
  const [businessName, setBusinessName] = useState('Acme Industrial Tech');
  const [legalName, setLegalName] = useState('Acme Industrial Tech Pvt Ltd');
  const [entityType, setEntityType] = useState('Private Limited (Pvt Ltd)');
  const [industry, setIndustry] = useState('B2B Technology & Services');
  const [gstin, setGstin] = useState('27AAECY9876Q1Z5');
  const [financialYear, setFinancialYear] = useState('April - March (India Standard)');
  const [cashSafetyThreshold, setCashSafetyThreshold] = useState('500000');

  // Step 2: Accounting Connector
  const [selectedConnector, setSelectedConnector] = useState<'tally' | 'zoho' | 'quickbooks' | 'bank' | 'none'>('tally');
  const [connectorStatus, setConnectorStatus] = useState<'idle' | 'testing' | 'connected' | 'error'>('idle');
  const [tallyPort, setTallyPort] = useState('9000');
  const [tallyCompany, setTallyCompany] = useState('Acme Industrial Tech FY 26-27');
  const [zohoOrgId, setZohoOrgId] = useState('781928341');

  // Step 3: CSV / File Upload & Mapping
  const [uploadedFileName, setUploadedFileName] = useState<string | null>('acme_general_ledger_fy26.csv');
  const [recordCount, setRecordCount] = useState<number>(148);
  const [isMappingConfirmed, setIsMappingConfirmed] = useState(true);
  const [columnMappings, setColumnMappings] = useState({
    date: 'Txn_Date',
    description: 'Particulars_Narration',
    amount: 'Net_Amount_INR',
    category: 'Ledger_Head',
    type: 'Voucher_Type',
    party: 'Party_Name',
  });

  if (!isOpen) return null;

  // Handle live connector test
  const handleTestConnector = () => {
    setConnectorStatus('testing');
    setTimeout(() => {
      setConnectorStatus('connected');
    }, 1200);
  };

  // Handle final completion
  const handleFinish = () => {
    onComplete({
      name: businessName || 'My Business',
      legalName: legalName || `${businessName} Pvt Ltd`,
      industry,
      gstin: gstin || '27AAECY9876Q1Z5',
      currency: 'INR (₹)',
      financialYear,
      cashSafetyThreshold: Number(cashSafetyThreshold) || 500000,
      isDemo: false,
    });
  };

  const steps = [
    { num: 1, label: 'Profile & Tax' },
    { num: 2, label: 'ERP Connect' },
    { num: 3, label: 'Data & CSV' },
    { num: 4, label: 'AI Baseline' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Top Header & Wizard Progress */}
        <div className="bg-slate-900 text-white p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <Logo variant="white" size="md" />
            <span className="text-[11px] font-mono font-bold text-blue-400 bg-blue-950 border border-blue-800/80 px-2.5 py-1 rounded-full">
              WIZARD: STEP {currentStep} OF 4
            </span>
          </div>

          <h2 className="text-xl font-extrabold tracking-tight">
            Configure Your Financial Operating System
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Connect accounting ledgers, configure Indian GST parameters, and initialize AI CFO intelligence.
          </p>

          {/* Stepper Indicator */}
          <div className="grid grid-cols-4 gap-2 mt-6 pt-4 border-t border-slate-800 text-xs">
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs mb-1 transition-all ${
                    currentStep === s.num
                      ? 'bg-blue-600 text-white ring-4 ring-blue-500/20'
                      : currentStep > s.num
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {currentStep > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span
                  className={`text-[10px] font-semibold text-center truncate ${
                    currentStep === s.num
                      ? 'text-blue-400 font-bold'
                      : currentStep > s.num
                      ? 'text-emerald-400'
                      : 'text-slate-500'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Progress bar line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Business Profile & Entity Setup */}
        {currentStep === 1 && (
          <div className="p-6 sm:p-8 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900">
                1. Organization Profile & Fiscal Structure
              </h3>
              <p className="text-xs text-slate-500">
                Establish corporate entity details, industry sector, and working capital thresholds.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Brand / Trade Name *
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Acme Industrial Tech"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Registered Legal Entity Name
                </label>
                <input
                  type="text"
                  value={legalName}
                  onChange={(e) => setLegalName(e.target.value)}
                  placeholder="e.g. Acme Industrial Tech Pvt Ltd"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Entity Legal Structure
                </label>
                <select
                  value={entityType}
                  onChange={(e) => setEntityType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                >
                  <option value="Private Limited (Pvt Ltd)">Private Limited Company (Pvt Ltd)</option>
                  <option value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</option>
                  <option value="Partnership Firm">Partnership Firm</option>
                  <option value="Sole Proprietorship">Sole Proprietorship</option>
                  <option value="Public Limited (Ltd)">Public Limited Company</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Industry & Business Model
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                >
                  <option value="B2B Technology & Services">B2B Technology & IT Services</option>
                  <option value="Manufacturing & Industrial">Industrial Manufacturing</option>
                  <option value="Logistics & Supply Chain">Logistics, Freight & Fleet</option>
                  <option value="Retail & D2C Commerce">Retail, D2C & Ecommerce</option>
                  <option value="Healthcare & Life Sciences">Healthcare & Pharmaceuticals</option>
                  <option value="Financial Services & FinTech">FinTech & Advisory</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                  <span>GSTIN Number</span>
                  <span className="text-[10px] text-emerald-600 font-bold">15-digit validated</span>
                </label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value.toUpperCase())}
                  placeholder="27AAECY9876Q1Z5"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Financial Year Cycle
                </label>
                <select
                  value={financialYear}
                  onChange={(e) => setFinancialYear(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                >
                  <option value="April - March (India Standard)">April 1 – March 31 (India FY)</option>
                  <option value="January - December (Calendar Year)">January 1 – December 31 (Calendar Year)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Minimum Cash Safety Buffer (₹)
              </label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="number"
                  value={cashSafetyThreshold}
                  onChange={(e) => setCashSafetyThreshold(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                YTech CFO alerts executive leadership whenever 90-day cash curve forecasts dip below this buffer.
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: Accounting Software & Connectors */}
        {currentStep === 2 && (
          <div className="p-6 sm:p-8 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900">
                2. Connect Accounting Software & Live Ledgers
              </h3>
              <p className="text-xs text-slate-500">
                Select your primary accounting tool for continuous sync or automated voucher fetching.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Tally Prime Option */}
              <div
                onClick={() => setSelectedConnector('tally')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedConnector === 'tally'
                    ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">Tally Prime / ERP 9</span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    XML Bridge
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                  Direct ODBC/HTTP integration for Indian chart of accounts, GST ledgers & balance sheets.
                </p>
              </div>

              {/* Zoho Books Option */}
              <div
                onClick={() => setSelectedConnector('zoho')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedConnector === 'zoho'
                    ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">Zoho Books</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    OAuth API
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                  Real-time invoice sync, automated debtor tracking & GST e-way bills.
                </p>
              </div>

              {/* QuickBooks Option */}
              <div
                onClick={() => setSelectedConnector('quickbooks')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedConnector === 'quickbooks'
                    ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">QuickBooks Online</span>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    Cloud API
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                  Synchronize multi-currency journals, payroll expenses & accounts payable.
                </p>
              </div>

              {/* Bank Direct Gateway */}
              <div
                onClick={() => setSelectedConnector('bank')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedConnector === 'bank'
                    ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">HDFC / ICICI Bank Feed</span>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Open Banking
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                  Direct daily statement fetch and automated transaction reconciliation.
                </p>
              </div>
            </div>

            {/* Selected Connector Configuration Card */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Plug className="w-4 h-4 text-blue-600" />
                  Configure {selectedConnector === 'tally' ? 'Tally Bridge' : selectedConnector === 'zoho' ? 'Zoho Books API' : 'Connector'}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Status: {connectorStatus}</span>
              </div>

              {selectedConnector === 'tally' && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Tally HTTP Gateway Port
                    </label>
                    <input
                      type="text"
                      value={tallyPort}
                      onChange={(e) => setTallyPort(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Company File in Tally
                    </label>
                    <input
                      type="text"
                      value={tallyCompany}
                      onChange={(e) => setTallyCompany(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
                    />
                  </div>
                </div>
              )}

              {selectedConnector === 'zoho' && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Zoho Organization ID
                    </label>
                    <input
                      type="text"
                      value={zohoOrgId}
                      onChange={(e) => setZohoOrgId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      API Token / Scope
                    </label>
                    <input
                      type="password"
                      value="••••••••••••••••"
                      readOnly
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono bg-slate-100"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleTestConnector}
                  disabled={connectorStatus === 'testing'}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${connectorStatus === 'testing' ? 'animate-spin' : ''}`} />
                  <span>{connectorStatus === 'testing' ? 'Testing Gateway...' : 'Test Connection'}</span>
                </button>

                {connectorStatus === 'connected' && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified & Ready
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: CSV & Data Upload */}
        {currentStep === 3 && (
          <div className="p-6 sm:p-8 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900">
                3. Financial Data Ingestion & Column Mapping
              </h3>
              <p className="text-xs text-slate-500">
                Upload historical spreadsheets or verify automated column mapping for accounting ledgers.
              </p>
            </div>

            {/* Upload Box */}
            <div className="p-6 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl bg-slate-50/70 text-center space-y-2 transition-all">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-900">
                {uploadedFileName ? uploadedFileName : 'Drag & drop transaction CSV / Excel ledger'}
              </div>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                Supports Tally XML exports, Zoho CSV ledgers, Bank Statements (CSV/XLSX), and standard double-entry formats.
              </p>
              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setUploadedFileName('acme_general_ledger_fy26.csv');
                    setRecordCount(148);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs shadow-xs"
                >
                  Use Sample Dataset (148 Rows)
                </button>
              </div>
            </div>

            {/* Schema Mapping Table */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  Intelligent Schema Column Mapping
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  100% Auto-Detected
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Date</span>
                  <span className="font-mono font-bold text-slate-800">{columnMappings.date}</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Description</span>
                  <span className="font-mono font-bold text-slate-800">{columnMappings.description}</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Amount (INR)</span>
                  <span className="font-mono font-bold text-slate-800">{columnMappings.amount}</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Ledger Category</span>
                  <span className="font-mono font-bold text-slate-800">{columnMappings.category}</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Voucher Type</span>
                  <span className="font-mono font-bold text-slate-800">{columnMappings.type}</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Customer / Vendor</span>
                  <span className="font-mono font-bold text-slate-800">{columnMappings.party}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: AI Financial Baseline & Launch */}
        {currentStep === 4 && (
          <div className="p-6 sm:p-8 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900">
                4. AI Financial Baseline & Setup Summary
              </h3>
              <p className="text-xs text-slate-500">
                Review calibrated metrics and launch the executive dashboard.
              </p>
            </div>

            {/* Discovered Baseline Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Monthly Revenue</span>
                <span className="text-lg font-black text-slate-900 font-mono">₹24.8L</span>
                <span className="text-[10px] text-emerald-600 font-bold block">+12.4% MoM</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Net Margin</span>
                <span className="text-lg font-black text-slate-900 font-mono">18.5%</span>
                <span className="text-[10px] text-emerald-600 font-bold block">₹4.6L Profit</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Discovered Cash</span>
                <span className="text-lg font-black text-slate-900 font-mono">₹8.2L</span>
                <span className="text-[10px] text-blue-600 font-bold block">4.8 Mo Runway</span>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-[10px] text-emerald-800 font-bold uppercase block">Health Score</span>
                <span className="text-lg font-black text-emerald-950 font-mono">78 / 100</span>
                <span className="text-[10px] text-emerald-700 font-bold block">Strong Position</span>
              </div>
            </div>

            {/* AI Diagnosis Callout */}
            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                <Sparkles className="w-4 h-4" />
                <span>AI CFO INITIAL CALIBRATION</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "{businessName} has been initialized with clean general ledger data. Your top-line revenue momentum is robust, operating profit margins stand at 18.5%, and GST liabilities are calculated at ₹1.24L for the upcoming filing period."
              </p>
            </div>

            {/* Verification checklist */}
            <div className="space-y-1.5 text-xs text-slate-700 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>General ledger & double-entry balances verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>GSTIN & tax rates matched with Indian HSN/SAC schedules</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>90-day cash curve forecasting engine initialized</span>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-white inline-flex items-center gap-1.5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onUseDemo}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
              >
                Explore with Demo Business
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev + 1) as any)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-xs inline-flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
              >
                <span>Launch YTech CFO Workspace</span>
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
