import React, { useState, useEffect, useCallback } from 'react';
import { LandingPage } from './components/landing/LandingPage';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { AppShell, ActiveTab } from './components/dashboard/AppShell';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { AICFOChat } from './components/dashboard/AICFOChat';
import { TransactionsView } from './components/dashboard/TransactionsView';
import { StatementsView } from './components/dashboard/StatementsView';
import { CashFlowView } from './components/dashboard/CashFlowView';
import { ProfitabilityView } from './components/dashboard/ProfitabilityView';
import { ReceivablesPayablesView } from './components/dashboard/ReceivablesPayablesView';
import { GSTIntelligenceView } from './components/dashboard/GSTIntelligenceView';
import { AlertsView } from './components/dashboard/AlertsView';
import { ReportsView } from './components/dashboard/ReportsView';
import { IntegrationsView } from './components/dashboard/IntegrationsView';
import { SettingsView } from './components/dashboard/SettingsView';
import {
  BusinessProfile,
  FinancialKPIs,
  CFOAlert,
  MonthlyFinancialSummary,
  Transaction,
  FinancialStatements,
  CashFlowForecast,
  ProfitabilityMetrics,
  AgingBucket,
  GSTSummary,
} from './types';

export default function App() {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  // Core Business Profile
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
    id: 'demo-biz-1',
    name: 'YTech CFO Demo',
    legalName: 'YTech CFO Solutions Pvt Ltd',
    industry: 'B2B SaaS & Financial Technology',
    currency: 'INR (₹)',
    fiscalYearStart: '04-01',
    cashSafetyThreshold: 500000,
    gstin: '27AAECY9876Q1Z5',
    isDemo: true,
  });

  // Financial Engine State
  const [kpis, setKpis] = useState<FinancialKPIs | null>(null);
  const [alerts, setAlerts] = useState<CFOAlert[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyFinancialSummary[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statements, setStatements] = useState<FinancialStatements | null>(null);
  const [forecast, setForecast] = useState<CashFlowForecast | null>(null);
  const [profitability, setProfitability] = useState<ProfitabilityMetrics | null>(null);
  const [aging, setAging] = useState<{
    receivables: AgingBucket[];
    payables: AgingBucket[];
    dso: number;
    dpo: number;
  } | null>(null);
  const [gst, setGst] = useState<GSTSummary | null>(null);
  const [initialAIPrompt, setInitialAIPrompt] = useState<string | undefined>(undefined);

  // Fetch all live data from backend API
  const fetchAllData = useCallback(async () => {
    try {
      const [
        kpisRes,
        alertsRes,
        monthlyRes,
        txRes,
        statementsRes,
        forecastRes,
        profitabilityRes,
        agingRes,
        gstRes,
        profileRes,
      ] = await Promise.all([
        fetch('/api/financial/kpis').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/alerts').then((r) => (r.ok ? r.json() : [])),
        fetch('/api/financial/monthly').then((r) => (r.ok ? r.json() : [])),
        fetch('/api/transactions').then((r) => (r.ok ? r.json() : [])),
        fetch('/api/financial/statements').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/financial/cash-flow-forecast').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/financial/profitability').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/financial/aging').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/financial/gst').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/business/profile').then((r) => (r.ok ? r.json() : null)),
      ]);

      if (kpisRes) setKpis(kpisRes);
      if (alertsRes) setAlerts(alertsRes);
      if (monthlyRes) setMonthlyData(monthlyRes);
      if (txRes) setTransactions(txRes);
      if (statementsRes) setStatements(statementsRes);
      if (forecastRes) setForecast(forecastRes);
      if (profitabilityRes) setProfitability(profitabilityRes);
      if (agingRes) setAging(agingRes);
      if (gstRes) setGst(gstRes);
      if (profileRes) setBusinessProfile(profileRes);
    } catch (err) {
      console.error('Error fetching financial data from backend:', err);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Handler to Add a new transaction (records to backend and refreshes calculations)
  const handleAddTransaction = async (newTx: Omit<Transaction, 'id' | 'createdAt'>) => {
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTx),
      });
      if (res.ok) {
        await fetchAllData();
      }
    } catch (err) {
      console.error('Failed to post transaction:', err);
    }
  };

  // Handler to update business profile
  const handleUpdateProfile = async (updated: Partial<BusinessProfile>) => {
    try {
      const res = await fetch('/api/business/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        const data = await res.json();
        setBusinessProfile(data);
      }
    } catch (err) {
      console.error('Failed to update business profile:', err);
    }
  };

  // Handler to reset demo data
  const handleResetDemo = async () => {
    try {
      await fetch('/api/demo/reset', { method: 'POST' });
      await fetchAllData();
    } catch (err) {
      console.error('Failed to reset demo data:', err);
    }
  };

  // Quick launch demo workspace
  const handleQuickDemo = () => {
    setAuthModalOpen(false);
    setOnboardingOpen(false);
    setView('app');
    setActiveTab('overview');
  };

  // Ask AI with prompt
  const handleAskAIWithPrompt = (prompt: string) => {
    setInitialAIPrompt(prompt);
    setActiveTab('ai-cfo');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {view === 'landing' ? (
        <LandingPage
          onStartFree={() => {
            setAuthMode('signup');
            setAuthModalOpen(true);
          }}
          onSignIn={() => {
            setAuthMode('signin');
            setAuthModalOpen(true);
          }}
          onExploreDemo={handleQuickDemo}
        />
      ) : (
        <AppShell
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          businessProfile={businessProfile}
          onLogout={() => setView('landing')}
          onResetDemo={handleResetDemo}
        >
          {activeTab === 'overview' && (
            <DashboardOverview
              kpis={kpis}
              alerts={alerts}
              monthlyData={monthlyData}
              onNavigate={setActiveTab}
              onAskAIWithPrompt={handleAskAIWithPrompt}
            />
          )}

          {activeTab === 'ai-cfo' && (
            <AICFOChat
              initialPrompt={initialAIPrompt}
              onClearInitialPrompt={() => setInitialAIPrompt(undefined)}
            />
          )}

          {activeTab === 'transactions' && (
            <TransactionsView
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
              onRefresh={fetchAllData}
            />
          )}

          {activeTab === 'statements' && (
            <StatementsView
              statements={statements}
              businessName={businessProfile.name}
            />
          )}

          {activeTab === 'cash-flow' && (
            <CashFlowView
              forecast={forecast}
              currentCash={kpis?.currentCashBalance || 820000}
              safetyThreshold={businessProfile.cashSafetyThreshold || 500000}
            />
          )}

          {activeTab === 'profitability' && (
            <ProfitabilityView metrics={profitability} />
          )}

          {activeTab === 'receivables-payables' && (
            <ReceivablesPayablesView aging={aging} />
          )}

          {activeTab === 'gst' && (
            <GSTIntelligenceView gst={gst} gstin={businessProfile.gstin} />
          )}

          {activeTab === 'alerts' && (
            <AlertsView alerts={alerts} onNavigate={setActiveTab} />
          )}

          {activeTab === 'reports' && (
            <ReportsView
              businessName={businessProfile.name}
              kpis={kpis}
              profitability={profitability}
            />
          )}

          {activeTab === 'integrations' && <IntegrationsView />}

          {activeTab === 'settings' && (
            <SettingsView
              profile={businessProfile}
              onUpdateProfile={handleUpdateProfile}
              onResetDemo={handleResetDemo}
            />
          )}
        </AppShell>
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          setAuthModalOpen(false);
          setOnboardingOpen(true);
        }}
        onQuickDemo={handleQuickDemo}
      />

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={onboardingOpen}
        onUseDemo={handleQuickDemo}
        onComplete={(profileData) => {
          handleUpdateProfile(profileData);
          setOnboardingOpen(false);
          setView('app');
          setActiveTab('overview');
        }}
      />
    </div>
  );
}
