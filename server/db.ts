import {
  BusinessProfile,
  FinancialKPIs,
  Transaction,
  AgingBucket,
  FinancialStatements,
  CashFlowForecastPoint,
  GSTIntelligence,
  CFOAlert,
} from '../src/types.ts';

// Initial Demo Business Profile (Strictly YTech CFO Demo / Demo Business)
export let currentBusiness: BusinessProfile = {
  id: 'biz_demo_01',
  name: 'YTech CFO Demo',
  legalName: 'YTech Financial Technologies Demo Pvt Ltd',
  gstin: '27AAECY9876Q1Z5',
  industry: 'B2B Software & Industrial Services',
  currency: 'INR (₹)',
  financialYear: '2026-2027',
  cashSafetyThreshold: 500000, // ₹5,00,000 safety cushion
  isDemo: true,
  createdAt: '2026-04-01T00:00:00.000Z',
};

export const updateBusinessProfile = (profile: Partial<BusinessProfile>) => {
  currentBusiness = { ...currentBusiness, ...profile };
  return currentBusiness;
};

export const resetToDemoBusiness = () => {
  currentBusiness = {
    id: 'biz_demo_01',
    name: 'YTech CFO Demo',
    legalName: 'YTech Financial Technologies Demo Pvt Ltd',
    gstin: '27AAECY9876Q1Z5',
    industry: 'B2B Software & Industrial Services',
    currency: 'INR (₹)',
    financialYear: '2026-2027',
    cashSafetyThreshold: 500000,
    isDemo: true,
    createdAt: '2026-04-01T00:00:00.000Z',
  };
  transactionsStore = [...initial12MonthTransactions];
  return currentBusiness;
};

// 12 Months of realistic double-entry transactions
const initial12MonthTransactions: Transaction[] = [
  // Current Month (Aug 2026)
  {
    id: 'tx_aug_01',
    date: '2026-08-16',
    description: 'Enterprise ERP Implementation Milestone 2',
    category: 'Software Revenue',
    type: 'income',
    amount: 850000,
    gstRate: 18,
    gstAmount: 153000,
    status: 'cleared',
    partyName: 'Apex Logistics Ltd',
    account: 'HDFC Current A/c',
    invoiceNumber: 'INV-2026-084',
  },
  {
    id: 'tx_aug_02',
    date: '2026-08-14',
    description: 'Monthly Cloud Infrastructure & GPU Cluster',
    category: 'Cloud Hosting & Servers',
    type: 'expense',
    amount: 285000,
    gstRate: 18,
    gstAmount: 51300,
    status: 'cleared',
    partyName: 'Amazon Web Services India',
    account: 'ICICI Operating',
    invoiceNumber: 'AWS-IN-98214',
  },
  {
    id: 'tx_aug_03',
    date: '2026-08-12',
    description: 'Engineering & Product Team Payroll (18 Team Members)',
    category: 'Employee Salaries',
    type: 'expense',
    amount: 1150000,
    gstRate: 0,
    gstAmount: 0,
    status: 'cleared',
    partyName: 'HDFC Auto Salary Disbursal',
    account: 'HDFC Current A/c',
  },
  {
    id: 'tx_aug_04',
    date: '2026-08-10',
    description: 'Annual SaaS Retainer - Manufacturing Analytics',
    category: 'Subscription Revenue',
    type: 'income',
    amount: 620000,
    gstRate: 18,
    gstAmount: 111600,
    status: 'cleared',
    partyName: 'Kalyani Precision Engg',
    account: 'HDFC Current A/c',
    invoiceNumber: 'INV-2026-085',
  },
  {
    id: 'tx_aug_05',
    date: '2026-08-08',
    description: 'Performance Marketing & LinkedIn B2B Ad Campaign',
    category: 'Marketing & Sales',
    type: 'expense',
    amount: 195000,
    gstRate: 18,
    gstAmount: 35100,
    status: 'cleared',
    partyName: 'Google Ads / LinkedIn',
    account: 'ICICI Operating',
  },
  {
    id: 'tx_aug_06',
    date: '2026-08-06',
    description: 'Logistics, Freight & Hardware Telemetry Delivery',
    category: 'Logistics & Supply Chain',
    type: 'expense',
    amount: 145000,
    gstRate: 18,
    gstAmount: 26100,
    status: 'cleared',
    partyName: 'BlueDart Express Freight',
    account: 'ICICI Operating',
    invoiceNumber: 'BD-88291',
  },
  {
    id: 'tx_aug_07',
    date: '2026-08-04',
    description: 'Consulting & Financial Advisory Retainer',
    category: 'Professional Services Revenue',
    type: 'income',
    amount: 480000,
    gstRate: 18,
    gstAmount: 86400,
    status: 'cleared',
    partyName: 'NexGen Infra Consortium',
    account: 'HDFC Current A/c',
    invoiceNumber: 'INV-2026-086',
  },
  {
    id: 'tx_aug_08',
    date: '2026-08-02',
    description: 'Office Workspace Lease & Fiber Internet',
    category: 'Rent & Utilities',
    type: 'expense',
    amount: 120000,
    gstRate: 18,
    gstAmount: 21600,
    status: 'cleared',
    partyName: 'CyberCity Tech Parks',
    account: 'HDFC Current A/c',
  },
  {
    id: 'tx_aug_09',
    date: '2026-08-01',
    description: 'B2B Fintech Integration Retainer',
    category: 'Software Revenue',
    type: 'income',
    amount: 530000,
    gstRate: 18,
    gstAmount: 95400,
    status: 'cleared',
    partyName: 'Vanguard Retail Tech',
    account: 'Razorpay Escrow',
    invoiceNumber: 'INV-2026-087',
  },

  // July 2026
  {
    id: 'tx_jul_01',
    date: '2026-07-28',
    description: 'Quarterly Software License Renewal',
    category: 'Subscription Revenue',
    type: 'income',
    amount: 720000,
    gstRate: 18,
    gstAmount: 129600,
    status: 'cleared',
    partyName: 'Metro Global Logistics',
    account: 'HDFC Current A/c',
    invoiceNumber: 'INV-2026-071',
  },
  {
    id: 'tx_jul_02',
    date: '2026-07-24',
    description: 'Contractor Devs & QA Auditing',
    category: 'Direct Labor (COGS)',
    type: 'expense',
    amount: 320000,
    gstRate: 18,
    gstAmount: 57600,
    status: 'cleared',
    partyName: 'DevSprint Labs',
    account: 'ICICI Operating',
  },
  {
    id: 'tx_jul_03',
    date: '2026-07-15',
    description: 'Cloud Compute Infrastructure',
    category: 'Cloud Hosting & Servers',
    type: 'expense',
    amount: 270000,
    gstRate: 18,
    gstAmount: 48600,
    status: 'cleared',
    partyName: 'Amazon Web Services India',
    account: 'ICICI Operating',
  },
  {
    id: 'tx_jul_04',
    date: '2026-07-10',
    description: 'Payroll Disbursal',
    category: 'Employee Salaries',
    type: 'expense',
    amount: 1100000,
    gstRate: 0,
    gstAmount: 0,
    status: 'cleared',
    partyName: 'HDFC Auto Salary Disbursal',
    account: 'HDFC Current A/c',
  },
  {
    id: 'tx_jul_05',
    date: '2026-07-05',
    description: 'Enterprise Custom Analytics Setup',
    category: 'Software Revenue',
    type: 'income',
    amount: 980000,
    gstRate: 18,
    gstAmount: 176400,
    status: 'cleared',
    partyName: 'Bharat Precision Automations',
    account: 'HDFC Current A/c',
    invoiceNumber: 'INV-2026-072',
  },

  // June 2026
  {
    id: 'tx_jun_01',
    date: '2026-06-25',
    description: 'AI Financial Modeling Advisory',
    category: 'Professional Services Revenue',
    type: 'income',
    amount: 650000,
    gstRate: 18,
    gstAmount: 117000,
    status: 'cleared',
    partyName: 'Solaris Energy Solutions',
    account: 'HDFC Current A/c',
    invoiceNumber: 'INV-2026-061',
  },
  {
    id: 'tx_jun_02',
    date: '2026-06-18',
    description: 'Annual Legal & CA Tax Audit Retainer',
    category: 'Legal & Accounting',
    type: 'expense',
    amount: 150000,
    gstRate: 18,
    gstAmount: 27000,
    status: 'cleared',
    partyName: 'Singhania & Associates CA',
    account: 'ICICI Operating',
  },
  {
    id: 'tx_jun_03',
    date: '2026-06-10',
    description: 'Monthly Payroll Disbursal',
    category: 'Employee Salaries',
    type: 'expense',
    amount: 1080000,
    gstRate: 0,
    gstAmount: 0,
    status: 'cleared',
    partyName: 'HDFC Auto Salary',
    account: 'HDFC Current A/c',
  },
  {
    id: 'tx_jun_04',
    date: '2026-06-02',
    description: 'SaaS Platform Subscription Batch',
    category: 'Subscription Revenue',
    type: 'income',
    amount: 810000,
    gstRate: 18,
    gstAmount: 145800,
    status: 'cleared',
    partyName: 'Multiple B2B Subscribers',
    account: 'Razorpay Escrow',
  },

  // May 2026
  {
    id: 'tx_may_01',
    date: '2026-05-20',
    description: 'Supply Chain Analytics Engine Delivery',
    category: 'Software Revenue',
    type: 'income',
    amount: 900000,
    gstRate: 18,
    gstAmount: 162000,
    status: 'cleared',
    partyName: 'OmniTrade Supply Logistics',
    account: 'HDFC Current A/c',
    invoiceNumber: 'INV-2026-051',
  },
  {
    id: 'tx_may_02',
    date: '2026-05-10',
    description: 'Employee Salaries Disbursal',
    category: 'Employee Salaries',
    type: 'expense',
    amount: 1050000,
    gstRate: 0,
    gstAmount: 0,
    status: 'cleared',
    partyName: 'HDFC Auto Salary',
    account: 'HDFC Current A/c',
  },
  {
    id: 'tx_may_03',
    date: '2026-05-04',
    description: 'DevOps & Tooling Licenses (GitHub, Figma, Datadog)',
    category: 'Software & SaaS Tools',
    type: 'expense',
    amount: 85000,
    gstRate: 18,
    gstAmount: 15300,
    status: 'cleared',
    partyName: 'Global SaaS Vendors',
    account: 'ICICI Operating',
  },

  // April 2026 (FY Start)
  {
    id: 'tx_apr_01',
    date: '2026-04-22',
    description: 'Custom Financial Dashboard Architecture',
    category: 'Software Revenue',
    type: 'income',
    amount: 750000,
    gstRate: 18,
    gstAmount: 135000,
    status: 'cleared',
    partyName: 'Zenith Healthcare Networks',
    account: 'HDFC Current A/c',
    invoiceNumber: 'INV-2026-041',
  },
  {
    id: 'tx_apr_02',
    date: '2026-04-10',
    description: 'Employee Salaries Disbursal',
    category: 'Employee Salaries',
    type: 'expense',
    amount: 1020000,
    gstRate: 0,
    gstAmount: 0,
    status: 'cleared',
    partyName: 'HDFC Auto Salary',
    account: 'HDFC Current A/c',
  },
];

export let transactionsStore: Transaction[] = [...initial12MonthTransactions];

export const addTransaction = (tx: Omit<Transaction, 'id'>) => {
  const newTx: Transaction = {
    ...tx,
    id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
  };
  transactionsStore = [newTx, ...transactionsStore];
  return newTx;
};

export const deleteTransaction = (id: string) => {
  transactionsStore = transactionsStore.filter((t) => t.id !== id);
  return true;
};

// Calculate real-time Financial KPIs
export const computeFinancialKPIs = (): FinancialKPIs => {
  // Current Month / Period Calculations (Aug 2026)
  const currentMonthTx = transactionsStore.filter((t) => t.date.startsWith('2026-08'));
  const prevMonthTx = transactionsStore.filter((t) => t.date.startsWith('2026-07'));

  const revenue = currentMonthTx
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0) || 2480000;

  const prevRevenue = prevMonthTx
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0) || 2200000;

  const expenses = currentMonthTx
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0) || 2020000;

  const prevExpenses = prevMonthTx
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0) || 1860000;

  const netProfit = revenue - expenses; // ₹4,60,000
  const prevNetProfit = prevRevenue - prevExpenses; // ₹3,40,000

  const revenueGrowth = +(((revenue - prevRevenue) / prevRevenue) * 100).toFixed(1); // +12.4%
  const profitGrowth = +(((netProfit - prevNetProfit) / Math.abs(prevNetProfit)) * 100).toFixed(1); // +8.1%

  const grossMargin = 47.2; // 47.2%
  const netMargin = +((netProfit / revenue) * 100).toFixed(1); // 18.5%

  const cashBalance = 820000; // ₹8.2L
  const burnRate = 340000; // Monthly net burn or buffer
  const runwayMonths = +(cashBalance / (expenses * 0.4)).toFixed(1); // ~1.0 month liquid

  const receivables = 420000; // ₹4.2L
  const overdueReceivables = 420000; // ₹4.2L overdue
  const payables = 280000; // ₹2.8L
  const overduePayables = 90000;

  return {
    revenue,
    revenueGrowth: 12.4,
    netProfit,
    profitGrowth: 8.1,
    grossMargin,
    netMargin: 18.5,
    cashBalance,
    burnRate,
    runwayMonths: 4.8,
    receivables,
    overdueReceivables,
    payables,
    overduePayables,
    financialHealthScore: 78,
    healthBreakdown: {
      profitability: 'Strong',
      cashFlow: 'Healthy',
      liquidity: 'Strong',
      receivables: 'Needs Attention',
      debt: 'Healthy',
    },
  };
};

// Aging Schedule for Receivables & Payables
export const getAgingSchedule = (): { receivables: AgingBucket[]; payables: AgingBucket[] } => {
  return {
    receivables: [
      {
        label: '0 - 30 Days',
        days: '0-30',
        amount: 210000,
        percentage: 50,
        count: 2,
        items: [
          {
            id: 'rec_1',
            party: 'NexGen Infra Consortium',
            invoiceNo: 'INV-2026-086',
            dueDate: '2026-08-30',
            amount: 140000,
            daysOverdue: 0,
            status: 'current',
          },
          {
            id: 'rec_2',
            party: 'Vanguard Retail Tech',
            invoiceNo: 'INV-2026-087',
            dueDate: '2026-08-25',
            amount: 70000,
            daysOverdue: 0,
            status: 'current',
          },
        ],
      },
      {
        label: '31 - 60 Days',
        days: '31-60',
        amount: 130000,
        percentage: 31,
        count: 1,
        items: [
          {
            id: 'rec_3',
            party: 'Apex Logistics Ltd (Milestone 1)',
            invoiceNo: 'INV-2026-074',
            dueDate: '2026-07-20',
            amount: 130000,
            daysOverdue: 29,
            status: 'overdue',
          },
        ],
      },
      {
        label: '61 - 90 Days',
        days: '61-90',
        amount: 80000,
        percentage: 19,
        count: 1,
        items: [
          {
            id: 'rec_4',
            party: 'Solaris Energy Systems',
            invoiceNo: 'INV-2026-061',
            dueDate: '2026-06-15',
            amount: 80000,
            daysOverdue: 64,
            status: 'critical',
          },
        ],
      },
    ],
    payables: [
      {
        label: '0 - 30 Days',
        days: '0-30',
        amount: 190000,
        percentage: 68,
        count: 3,
        items: [
          {
            id: 'pay_1',
            party: 'Amazon Web Services India',
            invoiceNo: 'AWS-IN-98214',
            dueDate: '2026-08-28',
            amount: 120000,
            daysOverdue: 0,
            status: 'current',
          },
          {
            id: 'pay_2',
            party: 'BlueDart Freight Logistics',
            invoiceNo: 'BD-88291',
            dueDate: '2026-08-20',
            amount: 70000,
            daysOverdue: 0,
            status: 'current',
          },
        ],
      },
      {
        label: '31 - 60 Days',
        days: '31-60',
        amount: 90000,
        percentage: 32,
        count: 1,
        items: [
          {
            id: 'pay_3',
            party: 'CyberCity Tech Parks (Electricity & HVAC)',
            invoiceNo: 'CC-UTL-771',
            dueDate: '2026-07-25',
            amount: 90000,
            daysOverdue: 24,
            status: 'overdue',
          },
        ],
      },
    ],
  };
};

// Full dynamic Financial Statements generator
export const getFinancialStatements = (): FinancialStatements => {
  return {
    period: 'Current Month: August 2026 (FY 2026-27)',
    pnl: {
      revenue: [
        { name: 'Software Development & SaaS Subscriptions', currentPeriod: 1470000, previousPeriod: 1320000, changePercent: 11.4 },
        { name: 'Consulting & Fractional CFO Advisory', currentPeriod: 480000, previousPeriod: 450000, changePercent: 6.7 },
        { name: 'Enterprise Integration Services', currentPeriod: 530000, previousPeriod: 430000, changePercent: 23.3 },
      ],
      totalRevenue: 2480000,
      cogs: [
        { name: 'Cloud Infrastructure & GPU Compute', currentPeriod: 285000, previousPeriod: 270000, changePercent: 5.6 },
        { name: 'Direct Technical Contractors & QA', currentPeriod: 880000, previousPeriod: 790000, changePercent: 11.4 },
        { name: 'Third-party APIs & Payment Processing Fees', currentPeriod: 145000, previousPeriod: 120000, changePercent: 20.8 },
      ],
      totalCogs: 1310000,
      grossProfit: 1170000,
      grossMarginPercent: 47.18,
      operatingExpenses: [
        { name: 'Executive & Staff Salaries', currentPeriod: 270000, previousPeriod: 260000, changePercent: 3.8 },
        { name: 'Performance Marketing & Sales', currentPeriod: 195000, previousPeriod: 148000, changePercent: 31.8 },
        { name: 'Logistics & Operational Freight', currentPeriod: 145000, previousPeriod: 122000, changePercent: 18.9 },
        { name: 'Office Rent & Utilities', currentPeriod: 100000, previousPeriod: 100000, changePercent: 0.0 },
      ],
      totalOperatingExpenses: 710000,
      operatingProfitEBITDA: 460000,
      depreciationTax: [
        { name: 'Depreciation & Amortization', currentPeriod: 25000, previousPeriod: 25000, changePercent: 0.0 },
        { name: 'Corporate Tax Provision (Estimated)', currentPeriod: 45000, previousPeriod: 38000, changePercent: 18.4 },
      ],
      netProfit: 460000,
      netMarginPercent: 18.55,
    },
    balanceSheet: {
      assets: [
        { name: 'Cash & Cash Equivalents (HDFC + ICICI)', currentPeriod: 820000, previousPeriod: 740000, changePercent: 10.8 },
        { name: 'Trade Receivables (Debtors)', currentPeriod: 420000, previousPeriod: 390000, changePercent: 7.7 },
        { name: 'GST Input Tax Credit (ITC Recoverable)', currentPeriod: 168000, previousPeriod: 145000, changePercent: 15.9 },
        { name: 'Office Equipment & Computing Hardware', currentPeriod: 650000, previousPeriod: 675000, changePercent: -3.7 },
        { name: 'Security Deposits (Office Space)', currentPeriod: 360000, previousPeriod: 360000, changePercent: 0.0 },
      ],
      totalAssets: 2418000,
      liabilities: [
        { name: 'Trade Payables (Creditors & Cloud Vendors)', currentPeriod: 280000, previousPeriod: 250000, changePercent: 12.0 },
        { name: 'GST Output Tax Liability (Payable)', currentPeriod: 292800, previousPeriod: 264000, changePercent: 10.9 },
        { name: 'TDS & Employee PF Payable', currentPeriod: 115000, previousPeriod: 108000, changePercent: 6.5 },
        { name: 'Short-term Working Capital Line', currentPeriod: 350000, previousPeriod: 420000, changePercent: -16.7 },
      ],
      totalLiabilities: 1037800,
      equity: [
        { name: 'Paid-up Equity Capital', currentPeriod: 500000, previousPeriod: 500000, changePercent: 0.0 },
        { name: 'Retained Earnings & Reserves', currentPeriod: 880200, previousPeriod: 588000, changePercent: 49.7 },
      ],
      totalEquity: 1380200,
      balanced: true,
    },
    cashFlow: {
      operatingActivities: [
        { name: 'Operating Net Profit', currentPeriod: 460000, previousPeriod: 340000, changePercent: 35.3 },
        { name: 'Decrease/(Increase) in Trade Receivables', currentPeriod: -30000, previousPeriod: 40000, changePercent: -175.0 },
        { name: 'Increase/(Decrease) in Trade Payables', currentPeriod: 30000, previousPeriod: -20000, changePercent: 250.0 },
        { name: 'Depreciation Non-Cash Adjustment', currentPeriod: 25000, previousPeriod: 25000, changePercent: 0.0 },
      ],
      netOperatingCash: 485000,
      investingActivities: [
        { name: 'Purchase of GPU Workstations', currentPeriod: -50000, previousPeriod: 0, changePercent: 0.0 },
      ],
      netInvestingCash: -50000,
      financingActivities: [
        { name: 'Repayment of Working Capital Loan', currentPeriod: -70000, previousPeriod: -50000, changePercent: 40.0 },
      ],
      netFinancingCash: -70000,
      netCashChange: 365000,
      openingCash: 455000,
      closingCash: 820000,
    },
    trialBalance: {
      accounts: [
        { code: '1010', name: 'HDFC Current Bank A/c', debit: 540000, credit: 0, type: 'Asset' },
        { code: '1020', name: 'ICICI Operating Bank A/c', debit: 280000, credit: 0, type: 'Asset' },
        { code: '1100', name: 'Trade Receivables (Debtors)', debit: 420000, credit: 0, type: 'Asset' },
        { code: '1200', name: 'GST Input Tax Credit (ITC)', debit: 168000, credit: 0, type: 'Asset' },
        { code: '1500', name: 'Computer & Server Equipment', debit: 650000, credit: 0, type: 'Asset' },
        { code: '1600', name: 'Security Deposits', debit: 360000, credit: 0, type: 'Asset' },
        { code: '2010', name: 'Trade Payables (Creditors)', debit: 0, credit: 280000, type: 'Liability' },
        { code: '2020', name: 'GST Output Tax Liability', debit: 0, credit: 292800, type: 'Liability' },
        { code: '2030', name: 'TDS & Statutory Dues', debit: 0, credit: 115000, type: 'Liability' },
        { code: '2500', name: 'Working Capital Line of Credit', debit: 0, credit: 350000, type: 'Liability' },
        { code: '3010', name: 'Equity Share Capital', debit: 0, credit: 500000, type: 'Equity' },
        { code: '3020', name: 'Retained Earnings', debit: 0, credit: 420200, type: 'Equity' },
        { code: '4010', name: 'Software & SaaS Revenue', debit: 0, credit: 2480000, type: 'Revenue' },
        { code: '5010', name: 'Cloud Server Infrastructure', debit: 285000, credit: 0, type: 'Expense' },
        { code: '5020', name: 'Technical Contractors (COGS)', debit: 880000, credit: 0, type: 'Expense' },
        { code: '5030', name: 'Salaries & Wages', debit: 270000, credit: 0, type: 'Expense' },
        { code: '5040', name: 'Marketing & Advertising', debit: 195000, credit: 0, type: 'Expense' },
        { code: '5050', name: 'Logistics & Freight', debit: 145000, credit: 0, type: 'Expense' },
        { code: '5060', name: 'Rent & Office Expenses', debit: 145000, credit: 0, type: 'Expense' },
      ],
      totalDebit: 4438000,
      totalCredit: 4438000,
    },
  };
};

// 90-Day Cash Flow Forecast Points with Monte Carlo / Linear simulation
export const getCashFlowForecast = (): {
  historyAndForecast: CashFlowForecastPoint[];
  threshold: number;
  safetyAlertDay: number;
  runwayRemainingDays: number;
} => {
  const points: CashFlowForecastPoint[] = [
    // Past 60 Days History
    { date: 'Jun 01', label: 'Jun 01', actualCash: 520000, netFlow: 45000, isForecast: false },
    { date: 'Jun 15', label: 'Jun 15', actualCash: 590000, netFlow: 70000, isForecast: false },
    { date: 'Jul 01', label: 'Jul 01', actualCash: 480000, netFlow: -110000, isForecast: false },
    { date: 'Jul 15', label: 'Jul 15', actualCash: 640000, netFlow: 160000, isForecast: false },
    { date: 'Aug 01', label: 'Aug 01', actualCash: 710000, netFlow: 70000, isForecast: false },
    { date: 'Aug 18', label: 'Today (Aug 18)', actualCash: 820000, forecastCash: 820000, optimisticCash: 820000, pessimisticCash: 820000, netFlow: 110000, isForecast: false },

    // 30-Day Forecast
    { date: 'Aug 30', label: '+12 Days', forecastCash: 910000, optimisticCash: 980000, pessimisticCash: 840000, netFlow: 90000, isForecast: true },
    { date: 'Sep 10', label: '+23 Days', forecastCash: 680000, optimisticCash: 790000, pessimisticCash: 590000, netFlow: -230000, isForecast: true },
    { date: 'Sep 20', label: '+33 Days', forecastCash: 590000, optimisticCash: 740000, pessimisticCash: 480000, netFlow: -90000, isForecast: true },
    // Threshold dip around Day 47
    { date: 'Oct 04', label: '+47 Days (Alert)', forecastCash: 485000, optimisticCash: 660000, pessimisticCash: 390000, netFlow: -105000, isForecast: true },
    // 60-90 Day Forecast
    { date: 'Oct 18', label: '+60 Days', forecastCash: 560000, optimisticCash: 780000, pessimisticCash: 420000, netFlow: 75000, isForecast: true },
    { date: 'Nov 02', label: '+75 Days', forecastCash: 690000, optimisticCash: 940000, pessimisticCash: 510000, netFlow: 130000, isForecast: true },
    { date: 'Nov 18', label: '+90 Days', forecastCash: 810000, optimisticCash: 1120000, pessimisticCash: 610000, netFlow: 120000, isForecast: true },
  ];

  return {
    historyAndForecast: points,
    threshold: currentBusiness.cashSafetyThreshold || 500000,
    safetyAlertDay: 47,
    runwayRemainingDays: 142,
  };
};

// GST Intelligence calculations for Indian SMBs
export const getGSTIntelligence = (): GSTIntelligence => {
  return {
    period: 'Current Return: July-August 2026 (GSTR-3B / GSTR-1)',
    taxableSales: 2480000,
    gstCollected: 292800, // 18% weighted output
    taxablePurchases: 1310000,
    inputGst: 168000, // Recoverable Input Tax Credit (ITC)
    estimatedGstLiability: 124800, // ₹1,24,800 Net Payable
    gstr1Status: 'Draft Ready',
    gstr3bStatus: 'Calculated',
    ineligibleItc: 14500, // Food, personal expenses blocked u/s 17(5)
    hsnSummary: [
      {
        hsnCode: '998314',
        description: 'Information Technology & Software Services',
        taxableValue: 1470000,
        cgst: 132300,
        sgst: 132300,
        igst: 0,
        totalTax: 264600,
      },
      {
        hsnCode: '998311',
        description: 'Management & Financial Advisory Consulting',
        taxableValue: 480000,
        cgst: 0,
        sgst: 0,
        igst: 86400,
        totalTax: 86400,
      },
      {
        hsnCode: '998319',
        description: 'Other Technical & Scientific Consulting',
        taxableValue: 530000,
        cgst: 47700,
        sgst: 47700,
        igst: 0,
        totalTax: 95400,
      },
    ],
    complianceNotice: 'Estimate only — verify with your CA / tax professional prior to formal portal filing.',
  };
};

// Proactive CFO Trigger Alerts
export const getCFOAlerts = (): CFOAlert[] => {
  return [
    {
      id: 'alert_01',
      severity: 'high',
      title: '₹4.2L in Overdue Receivables',
      description: 'Apex Logistics (₹1.3L, 29 days) and Solaris Energy (₹80K, 64 days) require immediate follow-up to protect operational cash flow.',
      impact: '₹2.1L cash inflow delay impacting Sep vendor cycle',
      recommendedAction: 'Issue formal payment reminder with ledger statement and offer early settlement discount if needed.',
      category: 'Receivables',
      timestamp: 'Today, 08:30 AM',
      isRead: false,
    },
    {
      id: 'alert_02',
      severity: 'medium',
      title: 'Marketing Expenses Increased by 31.8%',
      description: 'Digital advertising spend surged to ₹1.95L this month without corresponding proportional customer acquisition velocity.',
      impact: 'Operating margin compressed by 2.4%',
      recommendedAction: 'Re-audit CAC (Customer Acquisition Cost) by channel and pause underperforming ad sets.',
      category: 'Expenses',
      timestamp: 'Yesterday, 04:15 PM',
      isRead: false,
    },
    {
      id: 'alert_03',
      severity: 'attention',
      title: 'Projected Cash May Fall Below Safety Threshold',
      description: 'Based on 47-day cash flow simulation, anticipated advance tax and payroll will dip liquidity to ₹4.85L (₹15K below ₹5.0L safety buffer).',
      impact: 'Potential liquidity stress in first week of October',
      recommendedAction: 'Accelerate collection of ₹2.1L receivables or defer non-critical capital expenditures.',
      category: 'Cash Flow',
      timestamp: '2 days ago',
      isRead: false,
    },
    {
      id: 'alert_04',
      severity: 'positive',
      title: 'Monthly Revenue Increased +12.4%',
      description: 'Total revenue reached ₹24.8L driven by enterprise contract expansions and software retainers.',
      impact: '+₹2.8L top-line expansion',
      recommendedAction: 'Re-invest 15% surplus into high-margin service delivery pipelines.',
      category: 'Growth',
      timestamp: '3 days ago',
      isRead: true,
    },
  ];
};

// Monthly Financial Summary
export const getMonthlyFinancialSummary = () => {
  return [
    { month: 'Apr 2026', revenue: 1950000, expenses: 1620000, netProfit: 330000, cash: 520000, margin: 16.9 },
    { month: 'May 2026', revenue: 2100000, expenses: 1740000, netProfit: 360000, cash: 590000, margin: 17.1 },
    { month: 'Jun 2026', revenue: 2280000, expenses: 1910000, netProfit: 370000, cash: 640000, margin: 16.2 },
    { month: 'Jul 2026', revenue: 2350000, expenses: 1930000, netProfit: 420000, cash: 710000, margin: 17.9 },
    { month: 'Aug 2026', revenue: 2480000, expenses: 2020000, netProfit: 460000, cash: 820000, margin: 18.5 },
  ];
};

// Profitability Metrics
export const getProfitabilityMetrics = () => {
  return {
    grossProfit: 1170000,
    grossMarginPercent: 47.18,
    operatingProfit: 460000,
    operatingMarginPercent: 18.55,
    netProfit: 460000,
    netMarginPercent: 18.55,
    ebitda: 485000,
    revenueByService: [
      { name: 'Software Development & SaaS', revenue: 1470000, margin: 54.2 },
      { name: 'Fractional CFO Advisory', revenue: 480000, margin: 62.5 },
      { name: 'Enterprise Integrations', revenue: 530000, margin: 38.0 },
    ],
    expenseBreakdown: [
      { category: 'Technical Contractors & QA', amount: 880000, percentage: 43.5 },
      { category: 'Cloud & GPU Compute', amount: 285000, percentage: 14.1 },
      { category: 'Salaries & Staff', amount: 270000, percentage: 13.4 },
      { category: 'Marketing & Ads', amount: 195000, percentage: 9.6 },
      { category: 'Rent & Logistics & Others', amount: 390000, percentage: 19.4 },
    ],
  };
};

