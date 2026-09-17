import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Receipt,
  CheckCircle2,
  Clock,
  IndianRupee,
  Calendar,
  X,
  FileSpreadsheet,
  Trash2,
} from 'lucide-react';
import { Transaction } from '../../types';

interface TransactionsViewProps {
  transactions: Transaction[];
  onAddTransaction: (tx: Omit<Transaction, 'id' | 'createdAt'>) => Promise<void>;
  onRefresh: () => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  transactions,
  onAddTransaction,
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Form State
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Software Revenue');
  const [type, setType] = useState<'revenue' | 'cogs' | 'opex' | 'asset' | 'liability' | 'tax'>('revenue');
  const [amount, setAmount] = useState('');
  const [entityName, setEntityName] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [status, setStatus] = useState<'cleared' | 'pending' | 'overdue'>('cleared');
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'upi' | 'cheque' | 'cash'>('bank_transfer');
  const [submitting, setSubmitting] = useState(false);

  // CSV Import State
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || tx.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || tx.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !entityName) return;

    setSubmitting(true);
    const amtNum = parseFloat(amount);
    const gstRateNum = parseFloat(gstRate) || 0;
    const gstAmt = (amtNum * gstRateNum) / (100 + gstRateNum);

    await onAddTransaction({
      date,
      description,
      category,
      type,
      amount: amtNum,
      entityName,
      gstRate: gstRateNum,
      gstAmount: Math.round(gstAmt),
      status,
      paymentMethod,
    });

    setSubmitting(false);
    setIsAddModalOpen(false);
    setDescription('');
    setAmount('');
    setEntityName('');
  };

  const handleCsvImport = async () => {
    if (!importText.trim()) return;
    setSubmitting(true);
    setImportStatus('Parsing and recording spreadsheet entries...');

    const lines = importText.trim().split('\n');
    let count = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || i === 0 && line.toLowerCase().includes('date')) continue; // Skip header

      const parts = line.split(',');
      if (parts.length >= 4) {
        const rowDate = parts[0]?.trim() || new Date().toISOString().split('T')[0];
        const rowDesc = parts[1]?.trim() || 'Imported Entry';
        const rowAmt = parseFloat(parts[2]?.trim() || '0');
        const rowEntity = parts[3]?.trim() || 'General Vendor';
        const rowType = (parts[4]?.trim().toLowerCase() as any) || 'opex';

        if (rowAmt > 0) {
          await onAddTransaction({
            date: rowDate,
            description: rowDesc,
            category: 'Operating Overheads',
            type: ['revenue', 'cogs', 'opex', 'asset', 'liability', 'tax'].includes(rowType) ? rowType : 'opex',
            amount: rowAmt,
            entityName: rowEntity,
            gstRate: 18,
            gstAmount: Math.round(rowAmt * 0.18),
            status: 'cleared',
            paymentMethod: 'bank_transfer',
          });
          count++;
        }
      }
    }

    setImportStatus(`Successfully imported ${count} transaction entries!`);
    setTimeout(() => {
      setSubmitting(false);
      setIsImportModalOpen(false);
      setImportText('');
      setImportStatus(null);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight">
            Financial Ledger & Transactions
          </h2>
          <p className="text-xs text-slate-500">
            {transactions.length} Total recorded entries • Live double-entry bookkeeping engine
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5 text-slate-600" />
            <span>Import CSV</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs shadow-blue-500/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Record Transaction</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="sm:col-span-5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by client, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
          >
            <option value="all">All Types (Revenue, COGS, OpEx, etc)</option>
            <option value="revenue">Revenue (Sales)</option>
            <option value="cogs">COGS (Direct Costs)</option>
            <option value="opex">OpEx (Operating Overheads)</option>
            <option value="asset">Assets (Equipment / Deposits)</option>
            <option value="tax">Tax / GST Dues</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="cleared">Cleared / Settled</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Description & Counterparty</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">GST Rate</th>
                <th className="py-3.5 px-4 text-right">Amount (₹)</th>
                <th className="py-3.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No transactions match your search filter criteria.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-600 whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{tx.description}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{tx.entityName}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          tx.type === 'revenue'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : tx.type === 'cogs'
                            ? 'bg-slate-100 text-slate-700'
                            : tx.type === 'tax'
                            ? 'bg-purple-50 text-purple-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {tx.gstRate ? `${tx.gstRate}%` : '0%'}
                    </td>
                    <td
                      className={`py-3 px-4 text-right font-bold font-mono text-sm ${
                        tx.type === 'revenue' ? 'text-emerald-700' : 'text-slate-900'
                      }`}
                    >
                      {tx.type === 'revenue' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          tx.status === 'cleared'
                            ? 'bg-emerald-50 text-emerald-700'
                            : tx.status === 'overdue'
                            ? 'bg-rose-50 text-rose-700 font-black'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {tx.status === 'cleared' && <CheckCircle2 className="w-3 h-3" />}
                        {tx.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Transaction Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-black text-slate-900">Record Journal Entry</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Transaction Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                  >
                    <option value="revenue">Revenue (Sales / Inflow)</option>
                    <option value="cogs">COGS (Direct Production Cost)</option>
                    <option value="opex">OpEx (Operating Expense)</option>
                    <option value="asset">Asset Purchase / Deposit</option>
                    <option value="liability">Liability / Loan Draw</option>
                    <option value="tax">Tax / GST Remittance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise Retainer Invoice #4092"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="250000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Counterparty Entity</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Reliance Retail / Vendor Corp"
                    value={entityName}
                    onChange={(e) => setEntityName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">GST Rate</label>
                  <select
                    value={gstRate}
                    onChange={(e) => setGstRate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                  >
                    <option value="0">0% (Exempt)</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18% (Standard)</option>
                    <option value="28">28%</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                  >
                    <option value="cleared">Cleared</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  {submitting ? 'Recording...' : 'Post Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-black text-slate-900">Import CSV Spreadsheet</h3>
              </div>
              <button onClick={() => setIsImportModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-3">
              Paste standard CSV text formatted as: <br />
              <code className="text-slate-800 bg-slate-100 p-1 rounded font-mono text-[11px] block mt-1">
                Date, Description, Amount, Counterparty, Type
              </code>
            </p>

            <textarea
              rows={5}
              placeholder={`2026-08-15, Cloud Hosting Infrastructure, 45000, AWS India, opex\n2026-08-14, Enterprise License Expansion, 350000, Tata Digital, revenue`}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />

            {importStatus && (
              <div className="mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                {importStatus}
              </div>
            )}

            <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100 mt-2">
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCsvImport}
                disabled={submitting || !importText.trim()}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
              >
                {submitting ? 'Importing...' : 'Parse & Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
