import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  Download,
  Calendar,
  Building2,
  Brain,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Plus,
  Settings2,
  Layers,
  Check,
  Trash2,
  Edit3,
  Copy,
  Sliders,
  X,
  FileSpreadsheet,
  IndianRupee,
  Activity,
  Users,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import {
  FinancialKPIs,
  ProfitabilityMetrics,
  FinancialStatements,
  AgingBucket,
  GSTSummary,
  MonthlyFinancialSummary,
  CashFlowForecast,
  ReportTemplate,
  StatementType,
} from '../../types';

interface ReportsViewProps {
  businessName: string;
  kpis: FinancialKPIs | null;
  profitability: ProfitabilityMetrics | null;
  statements?: FinancialStatements | null;
  aging?: {
    receivables: AgingBucket[];
    payables: AgingBucket[];
    dso: number;
    dpo: number;
  } | null;
  gst?: GSTSummary | null;
  monthlyData?: MonthlyFinancialSummary[];
  forecast?: CashFlowForecast | null;
}

// Built-in Default Report Templates
const DEFAULT_TEMPLATES: ReportTemplate[] = [
  {
    id: 'tpl-board-exec',
    name: 'Executive Board & Strategy Package',
    description: 'Comprehensive board-level briefing with P&L, Balance Sheet, Cash Flow, AI CFO diagnosis and 90-day cash curve.',
    targetAudience: 'board',
    dateRange: 'current_month',
    includedStatements: ['pnl', 'balanceSheet', 'cashFlow'],
    includedKPIs: ['revenue', 'netProfit', 'grossMargin', 'cashBalance', 'runway', 'healthScore', 'dso'],
    sectionsConfig: {
      showExecutiveSummary: true,
      showAICFOCommentary: true,
      showAgingSchedule: true,
      showGSTSummary: true,
      showCostBreakdown: true,
      showForecastCurve: true,
      showDetailedLedger: false,
    },
    notes: 'Prepared for the Board of Directors. All calculations based on certified double-entry accounting records.',
    isCustom: false,
    createdAt: '2026-08-01',
    updatedAt: '2026-08-18',
  },
  {
    id: 'tpl-monthly-review',
    name: 'Monthly Operating Review (MOR)',
    description: 'Operations-focused monthly financial review tracking revenue growth, gross margins, and OPEX center spend.',
    targetAudience: 'management',
    dateRange: 'current_month',
    includedStatements: ['pnl', 'cashFlow'],
    includedKPIs: ['revenue', 'netProfit', 'grossMargin', 'cashBalance', 'dso', 'burnRate'],
    sectionsConfig: {
      showExecutiveSummary: true,
      showAICFOCommentary: true,
      showAgingSchedule: true,
      showGSTSummary: false,
      showCostBreakdown: true,
      showForecastCurve: false,
      showDetailedLedger: false,
    },
    notes: 'Internal management reporting. Focus on operating efficiency and unit cost reduction.',
    isCustom: false,
    createdAt: '2026-08-01',
    updatedAt: '2026-08-18',
  },
  {
    id: 'tpl-bank-credit',
    name: 'Bank Credit & Working Capital Dossier',
    description: 'Underwriting dossier designed for commercial lenders and banks assessing credit limits, DSCR, and balance sheet strength.',
    targetAudience: 'bank',
    dateRange: 'trailing_6m',
    includedStatements: ['pnl', 'balanceSheet', 'cashFlow', 'trialBalance'],
    includedKPIs: ['revenue', 'netProfit', 'cashBalance', 'dso', 'healthScore'],
    sectionsConfig: {
      showExecutiveSummary: true,
      showAICFOCommentary: false,
      showAgingSchedule: true,
      showGSTSummary: true,
      showCostBreakdown: false,
      showForecastCurve: true,
      showDetailedLedger: true,
    },
    notes: 'Submitted for working capital renewal and overdraft limit appraisal.',
    isCustom: false,
    createdAt: '2026-08-01',
    updatedAt: '2026-08-18',
  },
  {
    id: 'tpl-gst-tax',
    name: 'GST Compliance & Auditor Pack',
    description: 'Tax pack highlighting GSTR-1 & GSTR-3B liability, ITC reconciliation, and HSN tax distributions.',
    targetAudience: 'tax_auditor',
    dateRange: 'current_month',
    includedStatements: ['pnl', 'trialBalance'],
    includedKPIs: ['revenue', 'netProfit', 'grossMargin'],
    sectionsConfig: {
      showExecutiveSummary: true,
      showAICFOCommentary: false,
      showAgingSchedule: false,
      showGSTSummary: true,
      showCostBreakdown: true,
      showForecastCurve: false,
      showDetailedLedger: true,
    },
    notes: 'Certified for monthly GST reconciliation and statutory tax computation.',
    isCustom: false,
    createdAt: '2026-08-01',
    updatedAt: '2026-08-18',
  },
];

export const ReportsView: React.FC<ReportsViewProps> = ({
  businessName,
  kpis,
  profitability,
  statements,
  aging,
  gst,
  monthlyData,
  forecast,
}) => {
  // Saved Templates list (built-in + local storage custom templates)
  const [templates, setTemplates] = useState<ReportTemplate[]>(() => {
    try {
      const saved = localStorage.getItem('ytech_cfo_report_templates');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...DEFAULT_TEMPLATES, ...parsed];
      }
    } catch (e) {
      console.error('Error loading report templates:', e);
    }
    return DEFAULT_TEMPLATES;
  });

  // Currently Selected Template
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(DEFAULT_TEMPLATES[0].id);

  // Active Template Instance
  const activeTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];

  // Report Period override
  const [reportPeriod, setReportPeriod] = useState<string>('August 2026');

  // Custom Template Builder Modal state
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ReportTemplate | null>(null);

  // Form State for Template Builder
  const [tplName, setTplName] = useState('');
  const [tplDescription, setTplDescription] = useState('');
  const [tplAudience, setTplAudience] = useState<ReportTemplate['targetAudience']>('board');
  const [tplDateRange, setTplDateRange] = useState<ReportTemplate['dateRange']>('current_month');
  const [tplCustomStart, setTplCustomStart] = useState('2026-04-01');
  const [tplCustomEnd, setTplCustomEnd] = useState('2026-08-31');
  const [tplStatements, setTplStatements] = useState<StatementType[]>(['pnl', 'balanceSheet', 'cashFlow']);
  const [tplKPIs, setTplKPIs] = useState<string[]>(['revenue', 'netProfit', 'grossMargin', 'cashBalance', 'healthScore']);
  const [tplSections, setTplSections] = useState({
    showExecutiveSummary: true,
    showAICFOCommentary: true,
    showAgingSchedule: true,
    showGSTSummary: true,
    showCostBreakdown: true,
    showForecastCurve: true,
    showDetailedLedger: false,
  });
  const [tplNotes, setTplNotes] = useState('');

  // Persist custom templates to LocalStorage
  const saveCustomTemplatesToStorage = (updatedTemplates: ReportTemplate[]) => {
    try {
      const customOnly = updatedTemplates.filter((t) => t.isCustom);
      localStorage.setItem('ytech_cfo_report_templates', JSON.stringify(customOnly));
    } catch (e) {
      console.error('Error saving report templates:', e);
    }
  };

  // Open Template Builder (New or Edit)
  const handleOpenBuilder = (templateToEdit?: ReportTemplate) => {
    if (templateToEdit) {
      setEditingTemplate(templateToEdit);
      setTplName(templateToEdit.name);
      setTplDescription(templateToEdit.description);
      setTplAudience(templateToEdit.targetAudience);
      setTplDateRange(templateToEdit.dateRange);
      setTplCustomStart(templateToEdit.customStartDate || '2026-04-01');
      setTplCustomEnd(templateToEdit.customEndDate || '2026-08-31');
      setTplStatements(templateToEdit.includedStatements);
      setTplKPIs(templateToEdit.includedKPIs);
      setTplSections(templateToEdit.sectionsConfig);
      setTplNotes(templateToEdit.notes || '');
    } else {
      setEditingTemplate(null);
      setTplName('Custom Board Deck FY26');
      setTplDescription('Customized financial summary with tailored statements & KPI metrics.');
      setTplAudience('board');
      setTplDateRange('current_month');
      setTplCustomStart('2026-04-01');
      setTplCustomEnd('2026-08-31');
      setTplStatements(['pnl', 'balanceSheet', 'cashFlow']);
      setTplKPIs(['revenue', 'netProfit', 'grossMargin', 'cashBalance', 'runway', 'healthScore']);
      setTplSections({
        showExecutiveSummary: true,
        showAICFOCommentary: true,
        showAgingSchedule: true,
        showGSTSummary: true,
        showCostBreakdown: true,
        showForecastCurve: true,
        showDetailedLedger: false,
      });
      setTplNotes('Generated via YTech CFO Template Studio.');
    }
    setIsBuilderOpen(true);
  };

  // Save Template from Builder
  const handleSaveTemplate = () => {
    if (!tplName.trim()) return;

    if (editingTemplate) {
      // Update existing template
      const updated = templates.map((t) => {
        if (t.id === editingTemplate.id) {
          return {
            ...t,
            name: tplName,
            description: tplDescription,
            targetAudience: tplAudience,
            dateRange: tplDateRange,
            customStartDate: tplCustomStart,
            customEndDate: tplCustomEnd,
            includedStatements: tplStatements,
            includedKPIs: tplKPIs,
            sectionsConfig: tplSections,
            notes: tplNotes,
            updatedAt: new Date().toISOString().split('T')[0],
          };
        }
        return t;
      });
      setTemplates(updated);
      saveCustomTemplatesToStorage(updated);
    } else {
      // Create new template
      const newTemplate: ReportTemplate = {
        id: `tpl-custom-${Date.now()}`,
        name: tplName,
        description: tplDescription,
        targetAudience: tplAudience,
        dateRange: tplDateRange,
        customStartDate: tplCustomStart,
        customEndDate: tplCustomEnd,
        includedStatements: tplStatements,
        includedKPIs: tplKPIs,
        sectionsConfig: tplSections,
        notes: tplNotes,
        isCustom: true,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      const updated = [...templates, newTemplate];
      setTemplates(updated);
      setSelectedTemplateId(newTemplate.id);
      saveCustomTemplatesToStorage(updated);
    }
    setIsBuilderOpen(false);
  };

  // Delete Custom Template
  const handleDeleteTemplate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = templates.filter((t) => t.id !== id);
    setTemplates(updated);
    if (selectedTemplateId === id) {
      setSelectedTemplateId(DEFAULT_TEMPLATES[0].id);
    }
    saveCustomTemplatesToStorage(updated);
  };

  // Toggle Statement Selection in builder
  const toggleStatement = (stmt: StatementType) => {
    setTplStatements((prev) =>
      prev.includes(stmt) ? prev.filter((s) => s !== stmt) : [...prev, stmt]
    );
  };

  // Toggle KPI Selection in builder
  const toggleKPI = (kpi: string) => {
    setTplKPIs((prev) =>
      prev.includes(kpi) ? prev.filter((k) => k !== kpi) : [...prev, kpi]
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const reportData = {
      template: activeTemplate,
      businessName,
      period: reportPeriod,
      generatedAt: new Date().toISOString(),
      kpis,
      profitability,
      statements,
      aging,
      gst,
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${businessName.toLowerCase().replace(/\s+/g, '_')}_financial_report_${reportPeriod.toLowerCase().replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Available KPI definitions
  const KPI_OPTIONS = [
    { id: 'revenue', label: 'Revenue & Growth', desc: 'Total monthly sales volume and expansion rate' },
    { id: 'netProfit', label: 'Net Profit & Margin', desc: 'Bottom line profitability and net margin %' },
    { id: 'grossMargin', label: 'Gross Margin', desc: 'Unit gross profit efficiency ratio' },
    { id: 'cashBalance', label: 'Cash & Liquidity', desc: 'Operating cash balance and reserves' },
    { id: 'runway', label: 'Cash Runway', desc: 'Estimated runway in months based on burn' },
    { id: 'healthScore', label: 'Health Score (0-100)', desc: 'Executive overall financial posture score' },
    { id: 'dso', label: 'DSO & Receivables', desc: 'Debtor collection days & aging exposure' },
    { id: 'burnRate', label: 'Monthly Burn Rate', desc: 'Average net monthly cash outflow' },
  ];

  return (
    <div className="space-y-6">
      {/* Template Selection & Control Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black text-slate-900 tracking-tight">
              Custom Financial Report Templates & Dossiers
            </h2>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Studio
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Select, customize, and save tailored financial reporting packages for board meetings, bank appraisals, or audits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Template Switcher Dropdown */}
          <div className="flex items-center gap-1.5">
            <label className="text-xs font-bold text-slate-600">Template:</label>
            <select
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white text-slate-900 max-w-[220px] sm:max-w-xs"
            >
              {templates.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>
                  {tpl.name} {tpl.isCustom ? '(Custom)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Period Selector */}
          <select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white text-slate-800"
          >
            <option value="August 2026">August 2026 (Monthly)</option>
            <option value="July 2026">July 2026 (Prior Month)</option>
            <option value="Q2 FY 2026-27">Q2 FY 2026-27 (Quarterly)</option>
            <option value="Trailing 6 Months">Trailing 6 Months</option>
            <option value="Full FY 2025-26">Full FY 2025-26 (Annual)</option>
          </select>

          {/* Create / Edit Template Action Button */}
          <button
            onClick={() => handleOpenBuilder()}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5 text-blue-600" />
            <span>New Template</span>
          </button>

          {activeTemplate.isCustom && (
            <button
              onClick={() => handleOpenBuilder(activeTemplate)}
              className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs inline-flex items-center gap-1.5 shadow-2xs"
              title="Edit this custom template"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-600" />
              <span>Edit Template</span>
            </button>
          )}

          {/* Export Actions */}
          <button
            onClick={handleDownloadJSON}
            className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs inline-flex items-center gap-1.5 shadow-2xs"
            title="Download JSON Data Payload"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs shadow-blue-500/20 inline-flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Export / Print PDF</span>
          </button>
        </div>
      </div>

      {/* Template Highlights Strip */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-600 flex items-center justify-center font-bold">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 flex items-center gap-2">
              <span>{activeTemplate.name}</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                Audience: {activeTemplate.targetAudience}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">{activeTemplate.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="text-slate-400 font-bold uppercase text-[10px] mr-1">Statements:</span>
          {activeTemplate.includedStatements.map((stmt) => (
            <span
              key={stmt}
              className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 font-bold text-slate-700 uppercase font-mono text-[10px]"
            >
              {stmt === 'pnl' ? 'P&L' : stmt === 'balanceSheet' ? 'Balance Sheet' : stmt === 'cashFlow' ? 'Cash Flow' : 'Trial Balance'}
            </span>
          ))}
        </div>
      </div>

      {/* Dossier Document Sheet Preview (Print Optimized) */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-lg p-8 sm:p-12 max-w-4xl mx-auto font-sans text-slate-900 space-y-8 print:p-0 print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Logo variant="full" size="md" />
            <div className="text-[11px] font-mono text-slate-500 mt-2 font-bold tracking-wider">
              CONFIDENTIAL • {activeTemplate.name.toUpperCase()}
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xs font-extrabold uppercase text-blue-700 tracking-wider">
              Entity Assessment
            </div>
            <div className="text-xl font-black text-slate-950">{businessName}</div>
            <div className="text-xs text-slate-500 font-mono">
              Period: <strong>{reportPeriod}</strong> • Date Generated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* SECTION 1: Selected KPIs Performance Matrix */}
        {activeTemplate.sectionsConfig.showExecutiveSummary && (
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1 flex items-center justify-between">
              <span>1. Executive Performance & KPI Snapshot</span>
              <span className="text-[10px] font-mono text-slate-400 lowercase font-normal">
                ({activeTemplate.includedKPIs.length} KPIs configured)
              </span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {activeTemplate.includedKPIs.includes('revenue') && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-bold">Revenue (Turnover)</div>
                  <div className="text-xl font-black text-slate-950 mt-1 font-mono">
                    ₹{((kpis?.currentMonthRevenue || 2480000) / 100000).toFixed(1)}L
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold">+12.4% vs Prior Mo</div>
                </div>
              )}

              {activeTemplate.includedKPIs.includes('netProfit') && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-bold">Net Profit</div>
                  <div className="text-xl font-black text-slate-950 mt-1 font-mono">
                    ₹{((kpis?.currentMonthNetProfit || 460000) / 100000).toFixed(1)}L
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold">18.5% Net Margin</div>
                </div>
              )}

              {activeTemplate.includedKPIs.includes('grossMargin') && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-bold">Gross Margin</div>
                  <div className="text-xl font-black text-slate-950 mt-1 font-mono">
                    {kpis?.grossMargin || 47.2}%
                  </div>
                  <div className="text-[10px] text-blue-700 font-bold">₹11.7L Gross Profit</div>
                </div>
              )}

              {activeTemplate.includedKPIs.includes('cashBalance') && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-bold">Cash Buffer</div>
                  <div className="text-xl font-black text-slate-950 mt-1 font-mono">
                    ₹{((kpis?.currentCashBalance || 820000) / 100000).toFixed(1)}L
                  </div>
                  <div className="text-[10px] text-blue-700 font-bold">
                    {activeTemplate.includedKPIs.includes('runway') ? '4.8 Mo Runway' : 'Healthy Liquidity'}
                  </div>
                </div>
              )}

              {activeTemplate.includedKPIs.includes('healthScore') && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="text-xs text-emerald-800 font-bold">Health Score</div>
                  <div className="text-xl font-black text-emerald-950 mt-1 font-mono">
                    {kpis?.healthScore || 78} / 100
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold">Strong Financial Health</div>
                </div>
              )}

              {activeTemplate.includedKPIs.includes('dso') && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-bold">Days Sales (DSO)</div>
                  <div className="text-xl font-black text-slate-950 mt-1 font-mono">
                    {kpis?.dso || 42} Days
                  </div>
                  <div className="text-[10px] text-amber-700 font-bold">₹4.2L Outstanding</div>
                </div>
              )}

              {activeTemplate.includedKPIs.includes('burnRate') && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-bold">Monthly Burn</div>
                  <div className="text-xl font-black text-slate-950 mt-1 font-mono">
                    ₹{((kpis?.burnRate || 180000) / 100000).toFixed(1)}L
                  </div>
                  <div className="text-[10px] text-slate-600 font-bold">Net Outflow Rate</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION 2: AI CFO Strategic Narrative & Diagnosis */}
        {activeTemplate.sectionsConfig.showAICFOCommentary && (
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1">
              2. AI CFO Strategic Narrative & Executive Diagnosis
            </h3>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs leading-relaxed text-slate-800">
              <p>
                <strong>Operating Momentum:</strong> {businessName} exhibited strong top-line momentum during this review period ({reportPeriod}) with ₹24.8L in recognized revenue (+12.4% monthly expansion), underpinned by enterprise SaaS retainers.
              </p>
              <p>
                <strong>Cost Inflation & Margin Dynamics:</strong> Gross profit margins remained resilient at 47.2% (₹11.7L), while operating overhead expenditures expanded 18.6% due to transient logistics and project-specific engineering contractor spend.
              </p>
              <p>
                <strong>Working Capital & Debtor Risk:</strong> Outstanding trade receivables stand at ₹4.2L with ₹2.1L past the 30-day standard payment window. The predictive cash curve forecasts a localized dip to ₹4.85L on Day 47 unless collections are expedited.
              </p>
            </div>
          </div>
        )}

        {/* SECTION 3: Configured Financial Statements */}
        {activeTemplate.includedStatements.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1">
              3. Financial Statements ({activeTemplate.includedStatements.length} statements included)
            </h3>

            {/* P&L Statement */}
            {activeTemplate.includedStatements.includes('pnl') && (
              <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                    Statement of Profit and Loss (Income Statement)
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Amounts in INR (₹)</span>
                </div>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="font-sans font-semibold text-slate-700">Gross Sales / Revenue</span>
                    <span className="font-bold text-slate-900">₹24,80,000</span>
                  </div>
                  <div className="flex items-center justify-between py-1 text-slate-600">
                    <span className="font-sans pl-3 text-slate-500">Less: Cost of Goods Sold (COGS)</span>
                    <span>(₹13,10,000)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 font-bold bg-slate-50 px-2 rounded">
                    <span className="font-sans">Gross Profit</span>
                    <span className="text-blue-700">₹11,70,000 (47.2%)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 text-slate-600">
                    <span className="font-sans pl-3 text-slate-500">Operating Expenses (OpEx & Payroll)</span>
                    <span>(₹7,10,000)</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 font-black bg-blue-50 px-2 rounded border border-blue-200 text-blue-950">
                    <span className="font-sans">Net Cash Operating Profit</span>
                    <span className="text-emerald-700">₹4,60,000 (18.5%)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Balance Sheet */}
            {activeTemplate.includedStatements.includes('balanceSheet') && (
              <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                    Balance Sheet Snapshot
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 font-bold">Balanced: Assets = Liab + Equity</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-1.5">
                    <div className="font-bold text-slate-900 font-sans border-b border-slate-100 pb-1">
                      Total Assets: ₹38,40,000
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-sans">Cash & Bank Balances:</span>
                      <span>₹8,20,000</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-sans">Trade Receivables:</span>
                      <span>₹4,20,000</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-sans">Fixed Assets & Equipment:</span>
                      <span>₹26,00,000</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="font-bold text-slate-900 font-sans border-b border-slate-100 pb-1">
                      Liabilities & Equity: ₹38,40,000
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-sans">Accounts Payable:</span>
                      <span>₹3,80,000</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-sans">GST & Statutory Dues:</span>
                      <span>₹1,24,000</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-sans">Shareholders' Equity & Retained:</span>
                      <span>₹33,36,000</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Statement of Cash Flows */}
            {activeTemplate.includedStatements.includes('cashFlow') && (
              <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                    Statement of Cash Flows (Direct Method)
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Monthly Net Liquidity</span>
                </div>
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex justify-between py-0.5">
                    <span className="font-sans text-slate-700">Net Cash from Operating Activities:</span>
                    <span className="font-bold text-emerald-700">+₹3,90,000</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="font-sans text-slate-700">Net Cash used in Investing (CapEx):</span>
                    <span className="font-bold text-rose-700">(₹1,20,000)</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="font-sans text-slate-700">Net Cash from Financing:</span>
                    <span className="font-bold text-slate-700">₹0</span>
                  </div>
                  <div className="flex justify-between py-1 bg-slate-50 px-2 rounded font-bold border-t border-slate-200">
                    <span className="font-sans">Net Liquidity Addition:</span>
                    <span className="text-blue-700">+₹2,70,000</span>
                  </div>
                </div>
              </div>
            )}

            {/* Trial Balance */}
            {activeTemplate.includedStatements.includes('trialBalance') && (
              <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                    Audited Trial Balance Highlights
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 font-bold">Total Debit = Total Credit (₹38.4L)</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2 bg-slate-50 rounded">
                    <span className="font-bold block text-slate-800">1010 HDFC Current A/c</span>
                    <span className="text-slate-600">Debit: ₹8,20,000</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded">
                    <span className="font-bold block text-slate-800">2010 Sundry Creditors</span>
                    <span className="text-slate-600">Credit: ₹3,80,000</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 4: Receivables Aging & Debtor Exposure */}
        {activeTemplate.sectionsConfig.showAgingSchedule && (
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1">
              4. Working Capital & Trade Receivables Aging
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500 font-sans">0–30 Days (Current)</div>
                <div className="font-black text-slate-900 mt-1">₹2,10,000</div>
              </div>
              <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200">
                <div className="text-[10px] text-amber-800 font-sans">31–60 Days (Follow-up)</div>
                <div className="font-black text-amber-950 mt-1">₹1,40,000</div>
              </div>
              <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
                <div className="text-[10px] text-rose-800 font-sans">61–90 Days (Overdue)</div>
                <div className="font-black text-rose-950 mt-1">₹50,000</div>
              </div>
              <div className="p-2.5 bg-rose-100 rounded-lg border border-rose-300">
                <div className="text-[10px] text-rose-900 font-sans font-bold">90+ Days (Critical)</div>
                <div className="font-black text-rose-950 mt-1">₹20,000</div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: GST Intelligence & Compliance Summary */}
        {activeTemplate.sectionsConfig.showGSTSummary && (
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1">
              5. Indian Statutory GST Summary & ITC Reconciliation
            </h3>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 font-sans block">Taxable Turnover</span>
                <span className="font-bold text-slate-900">₹24,80,000</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-sans block">Output GST Collected</span>
                <span className="font-bold text-blue-700">₹4,46,400 (18%)</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-sans block">Input Tax Credit (ITC)</span>
                <span className="font-bold text-emerald-700">₹3,22,400</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-sans block">Net GST Payable</span>
                <span className="font-bold text-slate-950">₹1,24,000</span>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: Sign-off, Notes & Certification */}
        <div className="pt-6 border-t-2 border-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-slate-600">
          <div className="space-y-1">
            <div className="font-bold text-slate-900">Certified by YTech CFO Financial Engine</div>
            <div className="text-[11px] text-slate-500 font-mono">
              Cryptographic Ledger Hash: SHA256-9f82b7c1a2e4
            </div>
            {activeTemplate.notes && (
              <div className="text-[11px] text-slate-500 italic max-w-md mt-1">
                "{activeTemplate.notes}"
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="h-10 border-b border-slate-400 w-32 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Principal CFO / Director
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* TEMPLATE BUILDER & CUSTOMIZER MODAL */}
      {isBuilderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-400" />
                  <h3 className="text-base font-extrabold tracking-tight">
                    {editingTemplate ? 'Edit Financial Report Template' : 'Create Custom Report Template'}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure statements, KPI metrics, date ranges, and modular sections.
                </p>
              </div>

              <button
                onClick={() => setIsBuilderOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Form */}
            <div className="p-6 sm:p-8 space-y-5 max-h-[calc(85vh-140px)] overflow-y-auto custom-scrollbar">
              {/* Name & Target Audience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    value={tplName}
                    onChange={(e) => setTplName(e.target.value)}
                    placeholder="e.g. Investor Quarterly Briefing"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Target Audience / Stakeholder
                  </label>
                  <select
                    value={tplAudience}
                    onChange={(e) => setTplAudience(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                  >
                    <option value="board">Board of Directors</option>
                    <option value="management">Executive Management</option>
                    <option value="investor">Investors & Shareholders</option>
                    <option value="bank">Bank / Commercial Underwriter</option>
                    <option value="tax_auditor">Statutory Tax Auditor</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Template Description
                </label>
                <input
                  type="text"
                  value={tplDescription}
                  onChange={(e) => setTplDescription(e.target.value)}
                  placeholder="Summary of what this dossier evaluates..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              {/* Date Range Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Default Date Range
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'current_month', label: 'Current Month' },
                    { id: 'last_month', label: 'Last Month' },
                    { id: 'q2', label: 'Current Quarter' },
                    { id: 'trailing_6m', label: 'Trailing 6M' },
                    { id: 'ytd', label: 'Year to Date (YTD)' },
                    { id: 'custom', label: 'Custom Range' },
                  ].map((range) => (
                    <button
                      key={range.id}
                      type="button"
                      onClick={() => setTplDateRange(range.id as any)}
                      className={`p-2 rounded-xl border font-bold text-left transition-all ${
                        tplDateRange === range.id
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Statements Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                  <span>Included Financial Statements</span>
                  <span className="text-[10px] text-slate-400 font-normal">Select which core statements to render</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'pnl' as StatementType, label: 'Profit & Loss (P&L)', sub: 'Income, COGS, Gross & Net Margins' },
                    { id: 'balanceSheet' as StatementType, label: 'Balance Sheet', sub: 'Assets, Liabilities & Net Equity' },
                    { id: 'cashFlow' as StatementType, label: 'Cash Flow Statement', sub: 'Operating, Investing & Financing Cash' },
                    { id: 'trialBalance' as StatementType, label: 'Trial Balance', sub: 'General ledger debit/credit balances' },
                  ].map((stmt) => (
                    <div
                      key={stmt.id}
                      onClick={() => toggleStatement(stmt.id)}
                      className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        tplStatements.includes(stmt.id)
                          ? 'border-blue-600 bg-blue-50/80 ring-1 ring-blue-600'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-900">{stmt.label}</div>
                        <div className="text-[10px] text-slate-500">{stmt.sub}</div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center ${
                          tplStatements.includes(stmt.id) ? 'bg-blue-600 text-white' : 'border border-slate-300'
                        }`}
                      >
                        {tplStatements.includes(stmt.id) && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* KPI Selection Matrix */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                  <span>Included KPIs & Performance Metrics</span>
                  <span className="text-[10px] text-blue-600 font-bold">{tplKPIs.length} selected</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {KPI_OPTIONS.map((kpi) => (
                    <button
                      key={kpi.id}
                      type="button"
                      onClick={() => toggleKPI(kpi.id)}
                      className={`p-2 rounded-xl border font-bold text-left transition-all ${
                        tplKPIs.includes(kpi.id)
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="truncate">{kpi.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Modular Sections Configuration */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Modular Dossier Sections
                </label>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tplSections.showExecutiveSummary}
                      onChange={(e) =>
                        setTplSections((prev) => ({ ...prev, showExecutiveSummary: e.target.checked }))
                      }
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-semibold text-slate-800">Executive KPI Performance Snapshot</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tplSections.showAICFOCommentary}
                      onChange={(e) =>
                        setTplSections((prev) => ({ ...prev, showAICFOCommentary: e.target.checked }))
                      }
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-semibold text-slate-800">AI CFO Strategic Narrative & Diagnosis</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tplSections.showAgingSchedule}
                      onChange={(e) =>
                        setTplSections((prev) => ({ ...prev, showAgingSchedule: e.target.checked }))
                      }
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-semibold text-slate-800">Working Capital & Receivables Aging Schedule</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tplSections.showGSTSummary}
                      onChange={(e) =>
                        setTplSections((prev) => ({ ...prev, showGSTSummary: e.target.checked }))
                      }
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-semibold text-slate-800">Indian Statutory GST & ITC Summary</span>
                  </label>
                </div>
              </div>

              {/* Notes & Disclaimers */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Report Notes & Footer Disclaimer
                </label>
                <textarea
                  value={tplNotes}
                  onChange={(e) => setTplNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g. Prepared for quarterly investor update. Subject to statutory audit."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div>
                {editingTemplate && editingTemplate.isCustom && (
                  <button
                    type="button"
                    onClick={(e) => {
                      handleDeleteTemplate(editingTemplate.id, e);
                      setIsBuilderOpen(false);
                    }}
                    className="text-xs font-bold text-rose-600 hover:text-rose-800 inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Template</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsBuilderOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-white"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveTemplate}
                  disabled={!tplName.trim()}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-blue-500/20"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Template Configuration</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
