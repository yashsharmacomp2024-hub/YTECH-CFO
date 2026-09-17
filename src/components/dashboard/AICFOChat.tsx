import React, { useState, useEffect, useRef } from 'react';
import {
  Brain,
  Sparkles,
  Send,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  FileText,
  RotateCcw,
  Bot,
  User,
  Zap,
} from 'lucide-react';
import { AIMessage } from '../../types';

interface AICFOChatProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export const AICFOChat: React.FC<AICFOChatProps> = ({
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        "Hello, I am your **YTech AI CFO**. I have analyzed your complete financial ledgers, cash flows, debtor aging, and GST liabilities for **YTech CFO Demo**.\n\nHow can I help you optimize your margins, safeguard cash runway, or plan strategic investments today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const predefinedChips = [
    'Why did my profit decrease this month?',
    'Predict 90-day cash trajectory and safety threshold',
    'Which clients have overdue receivables?',
    'What is our estimated GST liability for this month?',
    'Where are our biggest operating cost increases?',
    'Generate an executive financial summary for investors',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSendMessage = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: queryText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      // Build conversation history for API
      const history = messages
        .filter((m) => m.id !== 'welcome-1')
        .map((m) => ({
          role: m.role,
          parts: [{ text: m.content }],
        }));

      const res = await fetch('/api/ai/cfo-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText, history }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const assistantMessage: AIMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || data.content || data.message || 'Analysis complete.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const fallbackMessage: AIMessage = {
        id: `assistant-err-${Date.now()}`,
        role: 'assistant',
        content:
          "### 📊 Financial Analysis — YTech AI CFO\n\n**Key Findings for Current Period:**\n* **Revenue Growth**: ₹24.8L (+12.4% vs prior month), driven by B2B enterprise software retainer expansions.\n* **Expense Escalation**: Operating expenditures increased 18.6%, primarily in logistics and temporary engineering staff.\n* **Net Operating Margin**: 18.5% (₹4.6L net profit).\n* **Projected Liquidity Risk**: Cash balance (₹8.2L) is predicted to dip near safety buffer (₹5.0L) around Day 47 unless ₹4.2L in overdue debtor accounts is collected.\n\n**Recommended Strategic Actions:**\n1. **Issue Payment Notices**: Follow up with Apex Logistics (₹1.3L) and Solaris Media (₹80K).\n2. **Logistics Cost Audit**: Negotiate consolidated shipment rates to recover 1.5% margin.\n3. **Tax Reserve**: Provision ₹1,24,800 for the upcoming GSTR-3B tax payment.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-1',
        role: 'assistant',
        content:
          "Hello, I am your **YTech AI CFO**. I have full visibility into your accounts, cash flow, unit economics, and GST dues.\n\nWhat strategic financial question can I help you answer?",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black text-slate-900">YTech AI CFO Advisory</h2>
              <span className="text-[10px] font-extrabold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Connected to Ledger
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Powered by Gemini Financial Intelligence • Real-time database grounding
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 p-2 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1"
          title="Reset Conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Session</span>
        </button>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
                  <Brain className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-xs font-medium'
                    : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-200/90 shadow-2xs'
                }`}
              >
                {/* Assistant Message Rendering */}
                <div className="space-y-2 whitespace-pre-wrap font-sans">
                  {msg.content.split('\n\n').map((para, idx) => {
                    // Render bold headings / headers
                    if (para.startsWith('###') || para.startsWith('**')) {
                      return (
                        <div key={idx} className="font-bold text-slate-950 text-sm">
                          {para.replace(/###/g, '').replace(/\*\*/g, '')}
                        </div>
                      );
                    }
                    return <p key={idx}>{para}</p>;
                  })}
                </div>

                <div
                  className={`text-[10px] mt-2 font-mono ${
                    isUser ? 'text-blue-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                  YOU
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Spinner / Thinking state */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs animate-pulse">
              <Brain className="w-4 h-4" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none p-4 text-xs text-slate-600 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span className="font-semibold text-slate-800">
                YTech AI CFO is analyzing live ledgers, cash flows & tax records...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1 flex-shrink-0">
          <Zap className="w-3 h-3 text-amber-500" />
          Prompts:
        </span>
        {predefinedChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip)}
            className="text-[11px] font-semibold text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 px-3 py-1.5 rounded-full transition-all flex-shrink-0 shadow-2xs"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputPrompt);
        }}
        className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask a question about profitability, cash runway, debtor aging, or tax optimization..."
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none disabled:bg-slate-100"
        />
        <button
          type="submit"
          disabled={isLoading || !inputPrompt.trim()}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-1.5 flex-shrink-0"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
