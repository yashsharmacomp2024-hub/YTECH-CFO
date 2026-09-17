export type ViewMode = 
  | 'landing' 
  | 'auth' 
  | 'onboarding' 
  | 'dashboard' 
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

export interface BusinessProfile {
  id: string;
  name: string;
  legalName?: string;
  gstin?: string;
  industry: string;
  currency?: string;
  financialYear?: string;
  fiscalYearStart?: string;
  cashSafetyThreshold?: number; // in INR
  isDemo?: boolean;
  createdAt?: string;
}

export interface FinancialKPIs {
  currentMonthRevenue?: number;
  currentMonthNetProfit?: number;
  currentMonthGrossProfit?: number;
  grossMargin?: number;
  netMargin?: number;
  currentCashBalance?: number;
  runwayMonths?: number;
  monthlyBurn?: number;
  receivables?: number;
  overdueReceivables?: number;
  payables?: number;
  healthScore?: number;
  dso?: number;
  dpo?: number;
  // Aliases & extensions
  revenue?: number;
  revenueGrowth?: number;
  netProfit?: number;
  profitGrowth?: number;
  cashBalance?: number;
  burnRate?: number;
  overduePayables?: number;
  financialHealthScore?: number;
  healthBreakdown?: {
    profitability: 'Strong' | 'Moderate' | 'Weak';
    cashFlow: 'Healthy' | 'Moderate' | 'Critical';
    liquidity: 'Strong' | 'Moderate' | 'Low';
    receivables: 'Healthy' | 'Needs Attention' | 'Critical';
    debt: 'Healthy' | 'Moderate' | 'High';
  };
}

export interface MonthlyFinancialSummary {
  month: string;
  revenue: number;
  cogs: number;
  grossProfit: number;
  grossMargin: number;
  opex: number;
  netProfit: number;
  netMargin: number;
  cashBalance: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'revenue' | 'cogs' | 'opex' | 'asset' | 'liability' | 'tax' | 'income' | 'expense' | 'transfer';
  amount: number;
  entityName?: string;
  partyName?: string;
  account?: string;
  invoiceNumber?: string;
  gstRate?: number;
  gstAmount?: number;
  status: 'cleared' | 'pending' | 'overdue' | 'reconciled';
  paymentMethod?: 'bank_transfer' | 'upi' | 'cheque' | 'cash';
  createdAt?: string;
}

export interface AgingBucket {
  range?: string;
  label?: string;
  days?: string;
  amount: number;
  count?: number;
  percentage?: number;
  items?: {
    id: string;
    party: string;
    invoiceNo: string;
    dueDate: string;
    amount: number;
    daysOverdue: number;
    status: 'current' | 'overdue' | 'critical';
  }[];
}

export interface StatementRow {
  name: string;
  currentPeriod?: number;
  previousPeriod?: number;
  changePercent?: number;
  amount?: number;
  isHeader?: boolean;
  isTotal?: boolean;
  subRows?: StatementRow[];
}

export interface FinancialStatements {
  period?: string;
  pnl?: {
    period?: string;
    revenue?: any;
    totalRevenue?: number;
    cogs?: any;
    totalCogs?: number;
    grossProfit?: number;
    grossMargin?: number;
    grossMarginPercent?: number;
    operatingExpenses?: any;
    totalOperatingExpenses?: number;
    totalOpEx?: number;
    operatingProfitEBITDA?: number;
    ebitda?: number;
    depreciationTax?: any;
    depreciation?: number;
    interest?: number;
    tax?: number;
    netProfit?: number;
    netMargin?: number;
    netMarginPercent?: number;
  };
  balanceSheet?: {
    asOfDate?: string;
    assets?: any;
    totalAssets?: number;
    liabilities?: any;
    totalLiabilities?: number;
    equity?: any;
    totalEquity?: number;
    balanced?: boolean;
    isBalanced?: boolean;
  };
  cashFlow?: {
    period?: string;
    operatingActivities?: any;
    netOperatingCash?: number;
    investingActivities?: any;
    netInvestingCash?: number;
    financingActivities?: any;
    netFinancingCash?: number;
    netCashChange?: number;
    openingCash?: number;
    closingCash?: number;
  };
  trialBalance?: {
    accounts?: {
      code: string;
      name: string;
      debit: number;
      credit: number;
      type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense' | string;
    }[];
    totalDebit?: number;
    totalCredit?: number;
  };
}

export interface CashFlowForecastPoint {
  date: string;
  label: string;
  actualCash?: number;
  forecastCash?: number;
  optimisticCash?: number;
  pessimisticCash?: number;
  netFlow: number;
  isForecast: boolean;
}

export interface CashFlowForecast {
  forecastDays?: {
    day: number;
    date: string;
    projectedCash: number;
    dailyInflow: number;
    dailyOutflow: number;
    isBelowSafetyThreshold: boolean;
  }[];
  runwayMonths?: number;
  burnRateMonthly?: number;
  daysUntilThreshold?: number;
}

export interface ProfitabilityMetrics {
  revenue: number;
  cogs: number;
  grossProfit: number;
  grossMargin: number;
  opex: number;
  netProfit: number;
  netMargin: number;
  topExpenses: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export interface GSTSummary {
  period?: string;
  taxableSales: number;
  gstCollected: number;
  taxablePurchases: number;
  itcAvailable?: number;
  inputGst?: number;
  netGstPayable?: number;
  estimatedGstLiability?: number;
  gstr1Status?: 'Draft Ready' | 'Reconciled' | 'Pending' | string;
  gstr3bStatus?: 'Draft Ready' | 'Calculated' | 'Pending' | string;
  ineligibleItc?: number;
  hsnSummary?: {
    hsnCode: string;
    description: string;
    taxableValue: number;
    rate?: number;
    igst?: number;
    cgst?: number;
    sgst?: number;
    totalTax?: number;
  }[];
  complianceNotice?: string;
}

export type GSTIntelligence = GSTSummary;

export interface CFOAlert {
  id: string;
  severity: 'high' | 'medium' | 'low' | 'attention' | 'positive';
  title: string;
  description: string;
  impact?: string;
  recommendedAction?: string;
  actionRecommended?: string;
  category: 'cash_flow' | 'receivables' | 'margin' | 'gst' | 'expenses' | 'growth' | 'Cash Flow' | 'Receivables' | 'Expenses' | 'Profitability' | 'GST' | 'Growth' | string;
  timestamp?: string;
  createdAt?: string;
  isRead?: boolean;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  financialData?: Record<string, any>;
  suggestions?: string[];
}

export type AICFOMessage = AIMessage;

export type StatementType = 'pnl' | 'balanceSheet' | 'cashFlow' | 'trialBalance';

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  targetAudience: 'board' | 'management' | 'investor' | 'tax_auditor' | 'bank';
  dateRange: 'current_month' | 'last_month' | 'q1' | 'q2' | 'q3' | 'q4' | 'trailing_6m' | 'ytd' | 'custom';
  customStartDate?: string;
  customEndDate?: string;
  includedStatements: StatementType[];
  includedKPIs: string[];
  sectionsConfig: {
    showExecutiveSummary: boolean;
    showAICFOCommentary: boolean;
    showAgingSchedule: boolean;
    showGSTSummary: boolean;
    showCostBreakdown: boolean;
    showForecastCurve: boolean;
    showDetailedLedger: boolean;
  };
  notes?: string;
  isCustom?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AccountingConnector {
  id: string;
  name: 'Tally Prime' | 'Zoho Books' | 'QuickBooks Online' | 'SAP Business One' | 'Bank Feed';
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
  lastSync?: string;
  syncFrequency?: 'realtime' | 'hourly' | 'daily' | 'manual';
  authType: 'api_key' | 'oauth' | 'bridge_agent' | 'credentials';
  details?: Record<string, string>;
}
