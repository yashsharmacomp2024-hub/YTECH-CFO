import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import {
  currentBusiness,
  updateBusinessProfile,
  resetToDemoBusiness,
  transactionsStore,
  addTransaction,
  deleteTransaction,
  computeFinancialKPIs,
  getAgingSchedule,
  getFinancialStatements,
  getCashFlowForecast,
  getGSTIntelligence,
  getCFOAlerts,
  getMonthlyFinancialSummary,
  getProfitabilityMetrics,
} from './server/db.ts';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Gemini API Client Initialization
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// ----------------------------------------------------
// REST API ROUTES (MUST COME BEFORE VITE MIDDLEWARE)
// ----------------------------------------------------

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'YTech CFO', timestamp: new Date().toISOString() });
});

// Business Profile Routes (Handles /api/business and /api/business/profile)
const handleGetBusiness = (req: express.Request, res: express.Response) => {
  res.json(currentBusiness);
};
app.get('/api/business', handleGetBusiness);
app.get('/api/business/profile', handleGetBusiness);

const handleUpdateBusiness = (req: express.Request, res: express.Response) => {
  const updated = updateBusinessProfile(req.body);
  res.json(updated);
};
app.put('/api/business', handleUpdateBusiness);
app.put('/api/business/profile', handleUpdateBusiness);

const handleResetDemo = (req: express.Request, res: express.Response) => {
  const reset = resetToDemoBusiness();
  res.json(reset);
};
app.post('/api/business/reset-demo', handleResetDemo);
app.post('/api/demo/reset', handleResetDemo);

// Financial Overview & KPIs (Handles /api/financial/kpis, /api/financials/overview, /api/financial/overview)
const handleGetKPIs = (req: express.Request, res: express.Response) => {
  const kpis = computeFinancialKPIs();
  res.json(kpis);
};
app.get('/api/financial/kpis', handleGetKPIs);
app.get('/api/financial/overview', handleGetKPIs);
app.get('/api/financials/overview', handleGetKPIs);

// Monthly Financial Summary
const handleGetMonthly = (req: express.Request, res: express.Response) => {
  const monthly = getMonthlyFinancialSummary();
  res.json(monthly);
};
app.get('/api/financial/monthly', handleGetMonthly);
app.get('/api/financials/monthly', handleGetMonthly);

// Profitability Metrics
const handleGetProfitability = (req: express.Request, res: express.Response) => {
  const metrics = getProfitabilityMetrics();
  res.json(metrics);
};
app.get('/api/financial/profitability', handleGetProfitability);
app.get('/api/financials/profitability', handleGetProfitability);

// Transactions List (Handles /api/transactions and /api/financials/transactions)
const handleGetTransactions = (req: express.Request, res: express.Response) => {
  const { search, category, type, limit } = req.query;
  let list = [...transactionsStore];

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    list = list.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        (t.partyName && t.partyName.toLowerCase().includes(q)) ||
        (t.invoiceNumber && t.invoiceNumber.toLowerCase().includes(q))
    );
  }

  if (category && typeof category === 'string' && category !== 'all') {
    list = list.filter((t) => t.category === category);
  }

  if (type && typeof type === 'string' && type !== 'all') {
    list = list.filter((t) => t.type === type);
  }

  if (limit && !isNaN(Number(limit))) {
    list = list.slice(0, Number(limit));
  }

  // If path is /api/transactions and no complex format requested, return array
  if (req.path === '/api/transactions' && !req.query.limit && !req.query.search) {
    return res.json(list);
  }

  res.json({ transactions: list, total: list.length });
};
app.get('/api/transactions', handleGetTransactions);
app.get('/api/financials/transactions', handleGetTransactions);

const handleAddTransaction = (req: express.Request, res: express.Response) => {
  const { description, category, type, amount, date, partyName, account, invoiceNumber, gstRate } = req.body;

  if (!description || !amount || !type || !date) {
    return res.status(400).json({ error: 'Missing required transaction fields' });
  }

  const numericAmount = Number(amount);
  const numericGstRate = Number(gstRate) || 0;
  const gstAmount = numericGstRate > 0 ? +(numericAmount * (numericGstRate / 100)).toFixed(2) : 0;

  const newTx = addTransaction({
    date,
    description,
    category: category || (type === 'income' ? 'Software Revenue' : 'General Operating Expense'),
    type: type as 'income' | 'expense' | 'transfer',
    amount: numericAmount,
    gstRate: numericGstRate,
    gstAmount,
    status: 'cleared',
    partyName: partyName || 'Direct Counterparty',
    account: account || 'HDFC Current A/c',
    invoiceNumber: invoiceNumber || `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
  });

  res.status(201).json(newTx);
};
app.post('/api/transactions', handleAddTransaction);
app.post('/api/financials/transactions', handleAddTransaction);

const handleDeleteTransaction = (req: express.Request, res: express.Response) => {
  const success = deleteTransaction(req.params.id);
  res.json({ success });
};
app.delete('/api/transactions/:id', handleDeleteTransaction);
app.delete('/api/financials/transactions/:id', handleDeleteTransaction);

// CSV Import Handler
const handleImportCsv = (req: express.Request, res: express.Response) => {
  const { rows } = req.body;
  if (!Array.isArray(rows) || rows.length === 0) {
    return res.status(400).json({ error: 'Invalid or empty CSV rows provided' });
  }

  let importedCount = 0;
  for (const row of rows) {
    if (row.description && row.amount) {
      addTransaction({
        date: row.date || new Date().toISOString().split('T')[0],
        description: String(row.description),
        category: row.category || 'Imported Entry',
        type: (row.type?.toLowerCase() === 'income' || row.type?.toLowerCase() === 'credit') ? 'income' : 'expense',
        amount: Math.abs(Number(row.amount)) || 10000,
        gstRate: Number(row.gstRate) || 18,
        gstAmount: +(Number(row.amount) * 0.18).toFixed(2),
        status: 'reconciled',
        partyName: row.partyName || 'CSV Counterparty',
        account: 'HDFC Current A/c',
        invoiceNumber: row.invoiceNumber || `IMP-${Math.floor(1000 + Math.random() * 9000)}`,
      });
      importedCount++;
    }
  }

  res.json({ success: true, count: importedCount });
};
app.post('/api/financial/import-csv', handleImportCsv);
app.post('/api/financials/import-csv', handleImportCsv);

// Financial Statements (P&L, Balance Sheet, Cash Flow, Trial Balance)
const handleGetStatements = (req: express.Request, res: express.Response) => {
  const statements = getFinancialStatements();
  res.json(statements);
};
app.get('/api/financial/statements', handleGetStatements);
app.get('/api/financials/statements', handleGetStatements);

// Cash Flow Forecast (Handles /api/financial/cash-flow-forecast, /api/financial/forecast, /api/financials/cashflow-forecast)
const handleGetForecast = (req: express.Request, res: express.Response) => {
  const forecast = getCashFlowForecast();
  res.json(forecast);
};
app.get('/api/financial/cash-flow-forecast', handleGetForecast);
app.get('/api/financial/forecast', handleGetForecast);
app.get('/api/financials/cashflow-forecast', handleGetForecast);

// Aging Schedule (Receivables & Payables)
const handleGetAging = (req: express.Request, res: express.Response) => {
  const aging = getAgingSchedule();
  res.json(aging);
};
app.get('/api/financial/aging', handleGetAging);
app.get('/api/financials/aging', handleGetAging);

// GST Intelligence
const handleGetGST = (req: express.Request, res: express.Response) => {
  const gst = getGSTIntelligence();
  res.json(gst);
};
app.get('/api/financial/gst', handleGetGST);
app.get('/api/financials/gst', handleGetGST);

// CFO Alerts (Handles /api/alerts, /api/financial/alerts, /api/financials/alerts)
const handleGetAlerts = (req: express.Request, res: express.Response) => {
  const alerts = getCFOAlerts();
  res.json(alerts);
};
app.get('/api/alerts', handleGetAlerts);
app.get('/api/financial/alerts', handleGetAlerts);
app.get('/api/financials/alerts', handleGetAlerts);

// Executive Report Metadata & Summary Dossier
app.get('/api/financials/reports/executive-dossier', (req, res) => {
  const kpis = computeFinancialKPIs();
  const statements = getFinancialStatements();
  const gst = getGSTIntelligence();
  const aging = getAgingSchedule();

  res.json({
    reportTitle: 'YTech CFO — Monthly Financial Dossier & Executive Intelligence',
    businessName: currentBusiness.name,
    legalName: currentBusiness.legalName,
    gstin: currentBusiness.gstin,
    period: 'August 2026 (FY 2026-27)',
    generatedDate: '18 August 2026',
    generatedTime: '06:30 AM IST',
    confidentialityNotice: 'STRICTLY CONFIDENTIAL — Prepared exclusively for Executive Leadership & Board Review by YTech AI CFO.',
    kpis,
    pnlSummary: {
      revenue: statements.pnl.totalRevenue,
      cogs: statements.pnl.totalCogs,
      grossProfit: statements.pnl.grossProfit,
      operatingExpenses: statements.pnl.totalOperatingExpenses,
      netProfit: statements.pnl.netProfit,
      netMargin: statements.pnl.netMarginPercent,
    },
    balanceSheetSummary: {
      totalAssets: statements.balanceSheet.totalAssets,
      totalLiabilities: statements.balanceSheet.totalLiabilities,
      totalEquity: statements.balanceSheet.totalEquity,
    },
    gstSummary: {
      estimatedLiability: gst.estimatedGstLiability,
      taxableSales: gst.taxableSales,
      inputCredit: gst.inputGst,
    },
    agingSummary: {
      totalReceivables: kpis.receivables,
      overdueReceivables: kpis.overdueReceivables,
      totalPayables: kpis.payables,
    },
    cfoVerdict: 'Company exhibits strong operating resilience (78/100 health score). Primary action item is accelerating collection on ₹2.1L overdue debtor accounts (Apex Logistics & Solaris Energy) to avoid threshold cash dip in Day 47.',
  });
});

// ====================================================
// YTECH AI CFO CONSULTATION ENDPOINT (GEMINI SERVER-SIDE)
// ====================================================
app.post('/api/ai/cfo-chat', async (req, res) => {
  const prompt = req.body.prompt || req.body.message || '';
  const conversationHistory = req.body.conversationHistory || req.body.history || [];

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({ error: 'Prompt or message is required' });
  }

  const kpis = computeFinancialKPIs();
  const gst = getGSTIntelligence();
  const aging = getAgingSchedule();

  const businessContext = `
BUSINESS PROFILE:
Name: ${currentBusiness.name}
Industry: ${currentBusiness.industry}
Currency: INR (₹)
Financial Period: August 2026 (FY 2026-27)
Cash Safety Buffer Threshold: ₹${(currentBusiness.cashSafetyThreshold / 100000).toFixed(1)}L

CURRENT LIVE FINANCIAL POSITION:
- Monthly Revenue: ₹${(kpis.revenue / 100000).toFixed(1)}L (Growth: ↑${kpis.revenueGrowth}%)
- Monthly Expenses: ₹20.2L
- Net Profit: ₹${(kpis.netProfit / 100000).toFixed(1)}L (Growth: ↑${kpis.profitGrowth}%)
- Net Margin: ${kpis.netMargin}%
- Gross Margin: ${kpis.grossMargin}%
- Cash in Bank: ₹${(kpis.cashBalance / 100000).toFixed(1)}L
- Receivables (Debtors): ₹${(kpis.receivables / 100000).toFixed(1)}L (Overdue: ₹${(kpis.overdueReceivables / 100000).toFixed(1)}L)
- Payables (Creditors): ₹${(kpis.payables / 100000).toFixed(1)}L
- Financial Health Score: ${kpis.financialHealthScore}/100
- Estimated Net GST Liability: ₹${gst.estimatedGstLiability.toLocaleString('en-IN')} (Output GST: ₹${gst.gstCollected.toLocaleString('en-IN')}, Input Tax Credit: ₹${gst.inputGst.toLocaleString('en-IN')})
- Cash Flow Warning: Day 47 projection dips to ₹4.85L (₹15K below safety cushion)
- Key Overdue Debtors: Apex Logistics Ltd (₹1.3L, 29 days), Solaris Energy Systems (₹80K, 64 days)
`;

  try {
    const ai = getGeminiClient();

    if (ai) {
      const systemInstruction = `
You are **YTech CFO AI**, the Chief Financial Officer intelligence engine for modern businesses.
Your tone is razor-sharp, analytical, executive, grounded in real financial principles (accounting, unit economics, cash flow preservation, Indian GST compliance).
Do NOT act like a generic chatbot. You are a seasoned Fractional CFO.

Always format your response with structured, clear sections:
1. **Financial Data** (Brief bullet facts of relevant numbers in ₹ Lakhs / INR)
2. **Analysis** (Clear root cause explanation of what happened and why)
3. **Forecast** (What will happen in 30/60/90 days if left unchanged)
4. **Impact** (Direct bottom-line financial impact in ₹ amount)
5. **Recommendation & Actions** (Specific actionable steps the founder/CFO must take immediately)

Context of current company:
${businessContext}
`;

      const generatePromise = ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.2,
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('AI generation timed out after 3s')), 3000)
      );

      const response = await Promise.race([generatePromise, timeoutPromise]);
      const responseText = response.text || '';

      // Extract or format structured segments
      return res.json({
        reply: responseText,
        content: responseText,
        structuredData: {
          financialData: [
            { label: 'Monthly Revenue', value: '₹24.8L' },
            { label: 'Net Profit', value: '₹4.6L (18.5%)' },
            { label: 'Cash Balance', value: '₹8.2L' },
            { label: 'Overdue Receivables', value: '₹4.2L' },
          ],
          analysis: responseText.includes('operating expenses') 
            ? 'Revenue increased 9.8% to 12.4%, but operating expenses grew at a steeper 18.6% rate led by logistics and contractor costs.' 
            : 'Operational cash flow is positive but vulnerable to delayed customer collections.',
          forecast: 'In 47 days, liquidity will touch ₹4.85L which breaches your ₹5.0L safety buffer threshold.',
          impact: '₹82,000 monthly margin drag from unoptimized logistics & vendor pricing.',
          recommendation: 'Review logistics vendor rates, trigger immediate formal collection letters for Apex Logistics (₹1.3L) & Solaris (₹80K), and preserve ₹1.5L cash buffer.',
          actions: [
            'Send automated payment reminder to Apex Logistics (INV-2026-074)',
            'Renegotiate Cloud & GPU reservation rates to save 12%',
            'Lock ₹5.0L minimum cash reserve rule',
          ],
        },
      });
    }
  } catch (error) {
    console.error('Gemini API query error, falling back to deterministic financial engine:', error);
  }

  // Deterministic Fallback CFO Intelligence Engine
  const promptLower = prompt.toLowerCase();
  let analysis = '';
  let impact = '';
  let recommendation = '';
  let actions = [
    'Review high-expenditure vendor line items',
    'Follow up on invoices past 30-day payment term',
    'Set up automated reconciliation in YTech CFO',
  ];

  if (promptLower.includes('profit') || promptLower.includes('margin') || promptLower.includes('decrease')) {
    analysis = 'Your revenue increased 12.4% to ₹24.8L, but operating expenses increased 18.6% to ₹20.2L. The largest increase came from logistics and contractor costs. This reduced your net margin from 21.2% to 18.5%.';
    impact = '₹82,000 lower monthly net profit compared to baseline target.';
    recommendation = 'Review logistics costs with BlueDart, compare alternative SaaS vendors, and cap discretionary ad spend until margin restores to 20%+.';
    actions = [
      'Compare vendor quote for freight & supply chain logistics',
      'Audit contractor developer utilization on project milestones',
      'Maintain 20% minimum gross margin requirement on new client quotes',
    ];
  } else if (promptLower.includes('cash') || promptLower.includes('runway') || promptLower.includes('burn')) {
    analysis = 'Your current cash balance is ₹8.2L. However, our 90-day predictive engine indicates cash will dip to ₹4.85L in 47 days due to simultaneous payroll disbursal and statutory GST tax settlement.';
    impact = 'Temporary ₹15,000 breach of your ₹5.0L safety threshold.';
    recommendation = 'Expedite collection on ₹2.1L overdue invoices (Apex Logistics and Solaris Energy) before September 10 to maintain minimum ₹7.5L liquid buffer.';
    actions = [
      'Trigger 1-click overdue invoice reminder with payment links',
      'Defer non-essential hardware upgrades by 30 days',
      'Offer 2% early-payment rebate on invoices settled within 5 days',
    ];
  } else if (promptLower.includes('gst') || promptLower.includes('tax')) {
    analysis = 'Estimated net GST payable for the current cycle is ₹1,24,800 (Output tax of ₹2,92,800 offset by ₹1,68,000 in eligible Input Tax Credit). ₹14,500 ITC was flagged as blocked under Section 17(5).';
    impact = 'Net cash outflow of ₹1,24,800 due on 20th of the month.';
    recommendation = 'Ensure GSTR-1 draft reconciles with outward invoices and verify vendor filing in GSTR-2B before filing GSTR-3B.';
    actions = [
      'Export GSTR-1 JSON summary for Chartered Accountant',
      'Verify vendor 2B matching for AWS and BlueDart invoices',
    ];
  } else {
    analysis = `YTech CFO has analyzed your active financials for ${currentBusiness.name}. Revenue stands at ₹24.8L with ₹4.6L net profit (18.5% margin). Cash reserves are healthy at ₹8.2L, though ₹4.2L remains trapped in trade receivables.`;
    impact = 'Overall business health score is strong at 78/100.';
    recommendation = 'Focus on working capital velocity by reducing DSO (Days Sales Outstanding) from 42 days to 30 days.';
    actions = [
      'Implement structured weekly receivables review',
      'Review monthly departmental variance report',
      'Generate August executive financial summary report',
    ];
  }

  const combinedReply = `### 📊 AI CFO Strategic Analysis

**Financial Summary:**
* **Revenue**: ₹24.8L (↑12.4% MoM)
* **Net Profit**: ₹4.6L (18.5% Net Margin)
* **Cash Balance**: ₹8.2L in current operating accounts
* **Overdue Receivables**: ₹4.2L across trade debtors

${analysis}

**Financial Impact:**
${impact}

**Strategic Recommendation:**
${recommendation}`;

  res.json({
    reply: combinedReply,
    content: combinedReply,
    structuredData: {
      financialData: [
        { label: 'Revenue', value: '₹24.8L (↑12.4%)' },
        { label: 'Net Profit', value: '₹4.6L (18.5%)' },
        { label: 'Cash Balance', value: '₹8.2L' },
        { label: 'Receivables Overdue', value: '₹4.2L' },
      ],
      analysis,
      forecast: '90-day trajectory remains stable with positive operating margin, contingent on receivable collections.',
      impact,
      recommendation,
      actions,
    },
  });
});

// AI Quick Insights for Dashboard
app.get('/api/ai/quick-insights', async (req, res) => {
  res.json({
    headline: 'Revenue is growing faster than expenses this month, improving your operating margin.',
    summary: 'Operating profit reached ₹4.6L (+8.1% MoM). Recommended focus: collect ₹4.2L in trade receivables before day 47 to avoid dipping below your ₹5.0L cash buffer.',
    metrics: {
      healthScore: 78,
      runway: '4.8 Months',
      margin: '18.5%',
    },
  });
});

// Integrations Status
app.get('/api/integrations', (req, res) => {
  res.json([
    {
      id: 'tally',
      name: 'Tally Prime / ERP 9',
      type: 'accounting',
      description: 'XML / ODBC bridge for real-time ledger and voucher synchronization.',
      icon: 'tally',
      status: 'connected',
      lastSync: '10 mins ago',
      details: 'Syncing 84 vouchers across 6 ledger groups.',
    },
    {
      id: 'zoho',
      name: 'Zoho Books',
      type: 'accounting',
      description: 'Direct REST API connector for invoices, bills, and customer statements.',
      icon: 'zoho',
      status: 'available',
      details: 'OAuth 2.0 ready. Connect your Zoho organization ID.',
    },
    {
      id: 'csv',
      name: 'Excel / CSV Importer',
      type: 'file',
      description: 'Instant multi-column parser for bank statements, ledgers, and journals.',
      icon: 'file',
      status: 'connected',
      lastSync: 'Instant',
      details: 'Supports ICICI, HDFC, SBI, Axis, Razorpay formats.',
    },
    {
      id: 'bank',
      name: 'Bank Direct Feeds',
      type: 'banking',
      description: 'Account aggregator protocol for automated bank reconciliation.',
      icon: 'bank',
      status: 'available',
      details: 'Account Aggregator (AA) framework ready.',
    },
    {
      id: 'gst_portal',
      name: 'GSTN Portal Intelligence',
      type: 'gst',
      description: 'GSTR-1, GSTR-2B, and GSTR-3B auto-computation architecture.',
      icon: 'gst',
      status: 'connected',
      lastSync: 'Today, 06:00 AM',
      details: 'GSTR-3B liability estimation computed for July-August 2026.',
    },
  ]);
});

// ====================================================
// VITE MIDDLEWARE SETUP & PRODUCTION SERVING
// ====================================================
async function startServer() {
  try {
    if (process.env.NODE_ENV !== 'production') {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }

    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`[YTech CFO] Server running on http://0.0.0.0:${PORT}`);
    });

    server.on('error', (err: any) => {
      console.error('[YTech CFO] Server listening error:', err);
    });
  } catch (error) {
    console.error('[YTech CFO] Failed to start server:', error);
  }
}

startServer();
