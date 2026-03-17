import { useState, useEffect, ReactNode } from "react";
import {
  ChevronLeft,
  ChevronUp,
  Download,
  RefreshCw,
  Clock,
  FileText,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  Check,
  Search,
  DollarSign,
  UserX,
  Users,
  Wallet,
  Calendar,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import type { Report } from "./ReportsPage";
import { INITIAL_REPORTS } from "./ReportsPage";
import { toast } from "sonner";

/* ═══════════════════════════════════════════════════════
 *  Report Profile Page
 * ═══════════════════════════════════════════════════════ */

interface ReportProfilePageProps {
  reportId: number;
  onBack: () => void;
  setBreadcrumbOverride?: (
    segments: { label: string; isLast: boolean; onClick?: () => void }[] | null
  ) => void;
}

export function ReportProfilePage({
  reportId,
  onBack,
  setBreadcrumbOverride,
}: ReportProfilePageProps) {
  const report = INITIAL_REPORTS.find((r) => r.id === reportId) ?? INITIAL_REPORTS[0];

  /* ── Breadcrumb ── */
  useEffect(() => {
    setBreadcrumbOverride?.([
      { label: "Reports", isLast: false, onClick: onBack },
      { label: report.category, isLast: false, onClick: onBack },
      { label: report.name, isLast: true },
    ]);
    return () => setBreadcrumbOverride?.(null);
  }, [setBreadcrumbOverride, onBack, report.name, report.category]);

  const genDate = new Date(report.generatedDate);
  const formattedDate = genDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const statusVariant =
    report.status === "Ready"
      ? "active"
      : report.status === "Processing"
        ? "pending"
        : "escalated";

  return (
    <div className="flex flex-col h-full bg-[var(--bg-surface)] flex-1 min-w-0 rounded-2xl overflow-hidden">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="size-[34px] flex items-center justify-center rounded-lg hover:bg-[var(--bg-hover)] transition-colors text-[var(--text-secondary)] cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="size-10 rounded-xl bg-[var(--accent-bg)] flex items-center justify-center shrink-0">
            <FileText size={18} className="text-[var(--indigo-11)]" />
          </div>

          <div className="flex flex-col gap-0.5 min-w-0">
            <h1 className="font-['Public_Sans',sans-serif] font-semibold text-[20px] text-[color:var(--text-primary)] tracking-[-0.8px] leading-[1.2]">
              {report.name}
            </h1>
            <span className="font-['Inter',sans-serif] text-[12px] text-[color:var(--text-secondary)] tracking-[-0.06px]">
              {report.description}
            </span>
          </div>

          <div className="flex items-center gap-2 ml-2">
            <StatusBadge variant={statusVariant}>{report.status}</StatusBadge>
            <span className="inline-flex h-6 px-2 items-center bg-[var(--slate-3)] rounded-full font-['Inter',sans-serif] text-[12px] text-[color:var(--text-secondary)] tracking-[-0.06px]">
              {report.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toast.success("Report refreshed")}
            className="h-8 px-3 flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            <RefreshCw size={14} className="text-[var(--text-secondary)]" />
            <span
              className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-secondary)] tracking-[-0.07px]"
              style={{ fontWeight: 600 }}
            >
              Regenerate
            </span>
          </button>
          <button
            onClick={() => toast.success("Scheduled")}
            className="h-8 px-3 flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            <Clock size={14} className="text-[var(--text-secondary)]" />
            <span
              className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-secondary)] tracking-[-0.07px]"
              style={{ fontWeight: 600 }}
            >
              Schedule
            </span>
          </button>
          <button
            onClick={() => toast.success("Downloading PDF...")}
            className="h-8 px-4 flex items-center gap-2 bg-[var(--accent-solid)] rounded-lg hover:bg-[var(--indigo-10)] transition-colors cursor-pointer"
          >
            <Download size={14} className="text-white" />
            <span
              className="font-['Inter',sans-serif] text-[13px] text-white tracking-[-0.07px]"
              style={{ fontWeight: 600 }}
            >
              Export
            </span>
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 min-h-0 gap-2.5 px-6 pb-6">
        {/* Sidebar */}
        <ReportSidebar report={report} formattedDate={formattedDate} />

        {/* Main content */}
        <div className="flex-1 min-w-0 overflow-hidden flex flex-col">
          <div className="pt-0 px-6 pb-6 flex flex-col gap-4 flex-1 overflow-y-auto">
            {report.name === "Wallet Transactions" && <WalletTransactionsContent />}
            {report.name === "Trade History" && <TradeHistoryContent />}
            {report.name === "Performance Fee" && <PerformanceFeeContent />}
            {report.name === "Idle Clients" && <IdleClientsContent />}
            {report.name === "Wallet Balance History" && <WalletBalanceHistoryContent />}
            {report.name === "Registrations" && <RegistrationsContent />}
            {!["Wallet Transactions","Trade History","Performance Fee","Idle Clients","Wallet Balance History","Registrations"].includes(report.name) && (
              <GenericReportContent report={report} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  Sidebar
 * ═══════════════════════════════════════════════════════ */
function ReportSidebar({
  report,
  formattedDate,
}: {
  report: Report;
  formattedDate: string;
}) {
  return (
    <div className="w-[340px] shrink-0 flex flex-col gap-4 overflow-y-auto pr-2">
      <AccordionCard title="Report Details" defaultOpen>
        <KVRow label="Report ID" value={<span className="font-mono tracking-[-0.02em]">RPT-{String(report.id).padStart(5, "0")}</span>} border />
        <KVRow label="Name" value={report.name} border />
        <KVRow label="Category" value={report.category} border />
        <KVRow label="Module" value={report.module} border />
        <KVRow label="Type" value={report.type} border />
        <KVRow label="Status" value={report.status} />
      </AccordionCard>

      <AccordionCard title="Generation Info" defaultOpen>
        <KVRow label="Generated" value={formattedDate} border />
        <KVRow label="Generated by" value={report.generatedBy.name} border />
        <KVRow label="Format" value="PDF, CSV" border />
        <KVRow label="Records" value={
          ({ "Wallet Transactions": "156", "Trade History": "243", "Performance Fee": "84", "Idle Clients": "37", "Wallet Balance History": "192", "Registrations": "128" } as Record<string, string>)[report.name] ?? "\u2014"
        } />
      </AccordionCard>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  Wallet Transactions Content
 * ═══════════════════════════════════════════════════════ */

interface WalletTx {
  id: string;
  date: string;
  type: "Deposit" | "Withdrawal" | "Transfer";
  method: string;
  amount: string;
  currency: string;
  status: "Completed" | "Pending" | "Failed";
  client: string;
  walletId: string;
}

const WALLET_TXS: WalletTx[] = [
  { id: "WTX-90001", date: "16 Mar 2026 09:12", type: "Deposit", method: "Bank Wire", amount: "+$12,500.00", currency: "USD", status: "Completed", client: "Nick Doe", walletId: "W-1001" },
  { id: "WTX-90002", date: "16 Mar 2026 08:45", type: "Withdrawal", method: "Crypto (BTC)", amount: "-$3,200.00", currency: "USD", status: "Pending", client: "Amira Hassan", walletId: "W-1002" },
  { id: "WTX-90003", date: "15 Mar 2026 17:30", type: "Transfer", method: "Internal", amount: "$5,000.00", currency: "USD", status: "Completed", client: "Liam O'Brien", walletId: "W-1003" },
  { id: "WTX-90004", date: "15 Mar 2026 14:22", type: "Deposit", method: "Credit Card", amount: "+$1,000.00", currency: "EUR", status: "Completed", client: "Yuki Tanaka", walletId: "W-1004" },
  { id: "WTX-90005", date: "15 Mar 2026 11:05", type: "Withdrawal", method: "Bank Wire", amount: "-$25,000.00", currency: "USD", status: "Completed", client: "Elena Petrova", walletId: "W-1005" },
  { id: "WTX-90006", date: "14 Mar 2026 16:40", type: "Deposit", method: "Crypto (USDT)", amount: "+$8,750.00", currency: "USD", status: "Completed", client: "Carlos Mendoza", walletId: "W-1006" },
  { id: "WTX-90007", date: "14 Mar 2026 09:15", type: "Transfer", method: "Internal", amount: "$2,300.00", currency: "USD", status: "Completed", client: "Fatima Al-Rashid", walletId: "W-1007" },
  { id: "WTX-90008", date: "13 Mar 2026 15:30", type: "Withdrawal", method: "E-Wallet", amount: "-$500.00", currency: "GBP", status: "Failed", client: "Oliver Smith", walletId: "W-1008" },
  { id: "WTX-90009", date: "13 Mar 2026 10:00", type: "Deposit", method: "Bank Wire", amount: "+$50,000.00", currency: "USD", status: "Completed", client: "Nick Doe", walletId: "W-1001" },
  { id: "WTX-90010", date: "12 Mar 2026 14:45", type: "Deposit", method: "Credit Card", amount: "+$2,000.00", currency: "EUR", status: "Completed", client: "Yuki Tanaka", walletId: "W-1004" },
  { id: "WTX-90011", date: "12 Mar 2026 09:30", type: "Withdrawal", method: "Crypto (ETH)", amount: "-$15,800.00", currency: "USD", status: "Completed", client: "Amira Hassan", walletId: "W-1002" },
  { id: "WTX-90012", date: "11 Mar 2026 16:20", type: "Transfer", method: "Internal", amount: "$7,500.00", currency: "USD", status: "Completed", client: "Elena Petrova", walletId: "W-1005" },
];

function WalletTransactionsContent() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | WalletTx["type"]>("All");

  const filtered = WALLET_TXS.filter((tx) => {
    if (typeFilter !== "All" && tx.type !== typeFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        tx.id.toLowerCase().includes(q) ||
        tx.client.toLowerCase().includes(q) ||
        tx.method.toLowerCase().includes(q) ||
        tx.walletId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalDeposits = WALLET_TXS.filter((t) => t.type === "Deposit").length;
  const totalWithdrawals = WALLET_TXS.filter((t) => t.type === "Withdrawal").length;
  const totalTransfers = WALLET_TXS.filter((t) => t.type === "Transfer").length;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        <SummaryCard icon={<ArrowDownLeft size={16} className="text-[var(--green-11)]" />} label="Deposits" value={String(totalDeposits)} accent="var(--green-3)" />
        <SummaryCard icon={<ArrowUpRight size={16} className="text-[var(--red-11)]" />} label="Withdrawals" value={String(totalWithdrawals)} accent="var(--red-3)" />
        <SummaryCard icon={<ArrowLeftRight size={16} className="text-[var(--indigo-11)]" />} label="Transfers" value={String(totalTransfers)} accent="var(--accent-bg)" />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {(["All", "Deposit", "Withdrawal", "Transfer"] as const).map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)} className={`h-[30px] px-3 rounded-lg font-['Inter',sans-serif] text-[13px] tracking-[-0.065px] transition-colors cursor-pointer ${typeFilter === t ? "bg-[var(--accent-solid)] text-white" : "bg-[var(--slate-3)] text-[var(--text-secondary)] hover:bg-[var(--slate-4)]"}`} style={{ fontWeight: 600 }}>
              {t === "All" ? "All Types" : `${t}s`}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <div className="relative w-[240px]">
          <input type="text" placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-[30px] px-3 pr-8 bg-[var(--slate-2)] rounded-lg text-[13px] font-['Inter',sans-serif] text-[color:var(--text-secondary)] focus:text-[color:var(--text-primary)] outline-none border border-transparent focus:border-[var(--accent-solid)] transition-colors" />
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
        </div>
      </div>
      <div className="bg-[var(--bg-surface)] rounded-lg border-2 border-[var(--slate-3)] overflow-hidden">
        <div className="overflow-auto">
          <div className="flex items-center h-[40px] bg-[var(--slate-3)] sticky top-0 z-10">
            {["Transaction ID", "Date", "Type", "Method", "Amount", "Status", "Client", "Wallet"].map((col) => (
              <div key={col} className={`shrink-0 flex items-center px-3 ${col === "Transaction ID" ? "w-[130px]" : col === "Date" ? "w-[160px]" : col === "Amount" ? "w-[140px]" : col === "Client" ? "w-[150px]" : "w-[120px]"}`}>
                <span className="font-['Inter',sans-serif] font-semibold text-[12px] text-[color:var(--text-primary)] tracking-[-0.06px]">{col}</span>
              </div>
            ))}
          </div>
          {filtered.map((tx) => (
            <div key={tx.id} className="flex items-center h-[48px] border-b border-[var(--border-subtle)] bg-[var(--slate-1)] hover:bg-[var(--slate-3)] transition-colors">
              <div className="w-[130px] shrink-0 px-3"><span className="font-mono text-[13px] text-[color:var(--text-primary)] tracking-[-0.02em]">{tx.id}</span></div>
              <div className="w-[160px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-secondary)] tracking-[-0.065px]">{tx.date}</span></div>
              <div className="w-[120px] shrink-0 px-3"><TxTypeBadge type={tx.type} /></div>
              <div className="w-[120px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-primary)] tracking-[-0.065px]">{tx.method}</span></div>
              <div className="w-[140px] shrink-0 px-3"><span className={`font-mono text-[13px] tracking-[-0.02em] ${tx.amount.startsWith("+") ? "text-[var(--green-11)]" : tx.amount.startsWith("-") ? "text-[var(--red-11)]" : "text-[color:var(--text-primary)]"}`} style={{ fontWeight: 600 }}>{tx.amount}</span></div>
              <div className="w-[120px] shrink-0 px-3"><TxStatusDot status={tx.status} /></div>
              <div className="w-[150px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-primary)] tracking-[-0.065px] truncate">{tx.client}</span></div>
              <div className="w-[120px] shrink-0 px-3"><span className="font-mono text-[12px] text-[color:var(--text-secondary)] tracking-[-0.02em]">{tx.walletId}</span></div>
            </div>
          ))}
          {filtered.length === 0 && (<div className="flex items-center justify-center py-12"><span className="font-['Inter',sans-serif] text-[14px] text-[color:var(--text-secondary)]">No transactions match your filters.</span></div>)}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  Trade History Content
 * ═══════════════════════════════════════════════════════ */

interface Trade {
  id: string; date: string; symbol: string; side: "Buy" | "Sell"; volume: string; openPrice: string; closePrice: string; pnl: string; status: "Closed" | "Open"; account: string; client: string;
}

const TRADES: Trade[] = [
  { id: "TRD-40001", date: "16 Mar 2026 09:14", symbol: "EURUSD", side: "Buy", volume: "1.00", openPrice: "1.08542", closePrice: "1.08731", pnl: "+$189.00", status: "Closed", account: "MT5-20001", client: "Nick Doe" },
  { id: "TRD-40002", date: "16 Mar 2026 08:50", symbol: "GBPJPY", side: "Sell", volume: "0.50", openPrice: "191.245", closePrice: "190.882", pnl: "+$181.50", status: "Closed", account: "MT5-20002", client: "Amira Hassan" },
  { id: "TRD-40003", date: "15 Mar 2026 17:22", symbol: "XAUUSD", side: "Buy", volume: "0.10", openPrice: "2,165.40", closePrice: "2,172.85", pnl: "+$74.50", status: "Closed", account: "MT5-20003", client: "Yuki Tanaka" },
  { id: "TRD-40004", date: "15 Mar 2026 14:10", symbol: "US30", side: "Buy", volume: "1.00", openPrice: "39,245.5", closePrice: "\u2014", pnl: "+$320.00", status: "Open", account: "MT5-20001", client: "Nick Doe" },
  { id: "TRD-40005", date: "15 Mar 2026 11:30", symbol: "BTCUSD", side: "Sell", volume: "0.05", openPrice: "73,215.0", closePrice: "72,980.0", pnl: "+$117.50", status: "Closed", account: "MT5-20005", client: "Elena Petrova" },
  { id: "TRD-40006", date: "14 Mar 2026 16:55", symbol: "EURUSD", side: "Sell", volume: "2.00", openPrice: "1.08890", closePrice: "1.08745", pnl: "+$290.00", status: "Closed", account: "MT5-20006", client: "Carlos Mendoza" },
  { id: "TRD-40007", date: "14 Mar 2026 09:00", symbol: "USDJPY", side: "Buy", volume: "1.50", openPrice: "148.920", closePrice: "148.650", pnl: "-$271.50", status: "Closed", account: "MT5-20007", client: "Oliver Smith" },
  { id: "TRD-40008", date: "13 Mar 2026 15:45", symbol: "GBPUSD", side: "Buy", volume: "0.30", openPrice: "1.27450", closePrice: "1.27820", pnl: "+$111.00", status: "Closed", account: "MT5-20002", client: "Amira Hassan" },
  { id: "TRD-40009", date: "13 Mar 2026 10:20", symbol: "XAUUSD", side: "Sell", volume: "0.20", openPrice: "2,178.60", closePrice: "2,170.10", pnl: "+$170.00", status: "Closed", account: "MT5-20005", client: "Elena Petrova" },
  { id: "TRD-40010", date: "12 Mar 2026 14:30", symbol: "NAS100", side: "Buy", volume: "0.50", openPrice: "18,125.0", closePrice: "18,210.0", pnl: "+$42.50", status: "Closed", account: "MT5-20003", client: "Yuki Tanaka" },
  { id: "TRD-40011", date: "12 Mar 2026 09:15", symbol: "EURUSD", side: "Buy", volume: "3.00", openPrice: "1.08320", closePrice: "1.08180", pnl: "-$420.00", status: "Closed", account: "MT5-20001", client: "Nick Doe" },
  { id: "TRD-40012", date: "11 Mar 2026 16:00", symbol: "USDJPY", side: "Sell", volume: "1.00", openPrice: "149.120", closePrice: "\u2014", pnl: "-$85.00", status: "Open", account: "MT5-20007", client: "Oliver Smith" },
];

function TradeHistoryContent() {
  const [search, setSearch] = useState("");
  const [sideFilter, setSideFilter] = useState<"All" | "Buy" | "Sell">("All");
  const filtered = TRADES.filter((t) => {
    if (sideFilter !== "All" && t.side !== sideFilter) return false;
    if (search.trim()) { const q = search.toLowerCase(); return t.id.toLowerCase().includes(q) || t.symbol.toLowerCase().includes(q) || t.client.toLowerCase().includes(q) || t.account.toLowerCase().includes(q); }
    return true;
  });
  const totalPnl = TRADES.reduce((sum, t) => { const num = parseFloat(t.pnl.replace(/[^0-9.\-+]/g, "")); return sum + (isNaN(num) ? 0 : num); }, 0);
  const winCount = TRADES.filter((t) => t.pnl.startsWith("+")).length;
  const lossCount = TRADES.filter((t) => t.pnl.startsWith("-")).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        <SummaryCard icon={totalPnl >= 0 ? <TrendingUp size={16} className="text-[var(--green-11)]" /> : <TrendingDown size={16} className="text-[var(--red-11)]" />} label="Total P&L" value={`${totalPnl >= 0 ? "+" : ""}$${Math.abs(totalPnl).toLocaleString("en-US", { minimumFractionDigits: 2 })}`} accent={totalPnl >= 0 ? "var(--green-3)" : "var(--red-3)"} />
        <SummaryCard icon={<Check size={16} className="text-[var(--green-11)]" />} label="Winning Trades" value={String(winCount)} accent="var(--green-3)" />
        <SummaryCard icon={<TrendingDown size={16} className="text-[var(--red-11)]" />} label="Losing Trades" value={String(lossCount)} accent="var(--red-3)" />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {(["All", "Buy", "Sell"] as const).map((s) => (
            <button key={s} onClick={() => setSideFilter(s)} className={`h-[30px] px-3 rounded-lg font-['Inter',sans-serif] text-[13px] tracking-[-0.065px] transition-colors cursor-pointer ${sideFilter === s ? "bg-[var(--accent-solid)] text-white" : "bg-[var(--slate-3)] text-[var(--text-secondary)] hover:bg-[var(--slate-4)]"}`} style={{ fontWeight: 600 }}>{s === "All" ? "All Sides" : s}</button>
          ))}
        </div>
        <div className="flex-1" />
        <div className="relative w-[240px]">
          <input type="text" placeholder="Search trades..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-[30px] px-3 pr-8 bg-[var(--slate-2)] rounded-lg text-[13px] font-['Inter',sans-serif] text-[color:var(--text-secondary)] focus:text-[color:var(--text-primary)] outline-none border border-transparent focus:border-[var(--accent-solid)] transition-colors" />
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
        </div>
      </div>
      <div className="bg-[var(--bg-surface)] rounded-lg border-2 border-[var(--slate-3)] overflow-hidden">
        <div className="overflow-auto">
          <div className="flex items-center h-[40px] bg-[var(--slate-3)] sticky top-0 z-10">
            {["Trade ID", "Date", "Symbol", "Side", "Volume", "Open", "Close", "P&L", "Status", "Account", "Client"].map((col) => (
              <div key={col} className={`shrink-0 flex items-center px-3 ${col === "Trade ID" ? "w-[120px]" : col === "Date" ? "w-[160px]" : col === "Client" ? "w-[140px]" : col === "Account" ? "w-[120px]" : "w-[100px]"}`}>
                <span className="font-['Inter',sans-serif] font-semibold text-[12px] text-[color:var(--text-primary)] tracking-[-0.06px]">{col}</span>
              </div>
            ))}
          </div>
          {filtered.map((trade) => (
            <div key={trade.id} className="flex items-center h-[48px] border-b border-[var(--border-subtle)] bg-[var(--slate-1)] hover:bg-[var(--slate-3)] transition-colors">
              <div className="w-[120px] shrink-0 px-3"><span className="font-mono text-[13px] text-[color:var(--text-primary)] tracking-[-0.02em]">{trade.id}</span></div>
              <div className="w-[160px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-secondary)] tracking-[-0.065px]">{trade.date}</span></div>
              <div className="w-[100px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-primary)] tracking-[-0.065px]" style={{ fontWeight: 600 }}>{trade.symbol}</span></div>
              <div className="w-[100px] shrink-0 px-3"><SideBadge side={trade.side} /></div>
              <div className="w-[100px] shrink-0 px-3"><span className="font-mono text-[13px] text-[color:var(--text-primary)] tracking-[-0.02em]">{trade.volume}</span></div>
              <div className="w-[100px] shrink-0 px-3"><span className="font-mono text-[13px] text-[color:var(--text-primary)] tracking-[-0.02em]">{trade.openPrice}</span></div>
              <div className="w-[100px] shrink-0 px-3"><span className="font-mono text-[13px] text-[color:var(--text-secondary)] tracking-[-0.02em]">{trade.closePrice}</span></div>
              <div className="w-[100px] shrink-0 px-3"><span className={`font-mono text-[13px] tracking-[-0.02em] ${trade.pnl.startsWith("+") ? "text-[var(--green-11)]" : "text-[var(--red-11)]"}`} style={{ fontWeight: 600 }}>{trade.pnl}</span></div>
              <div className="w-[100px] shrink-0 px-3"><span className={`inline-flex h-[22px] px-2 items-center rounded font-['Inter',sans-serif] text-[12px] tracking-[-0.06px] ${trade.status === "Closed" ? "bg-[var(--slate-3)] text-[var(--text-secondary)]" : "bg-[var(--accent-bg)] text-[var(--indigo-11)]"}`} style={{ fontWeight: 500 }}>{trade.status}</span></div>
              <div className="w-[120px] shrink-0 px-3"><span className="font-mono text-[12px] text-[color:var(--text-secondary)] tracking-[-0.02em]">{trade.account}</span></div>
              <div className="w-[140px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-primary)] tracking-[-0.065px] truncate">{trade.client}</span></div>
            </div>
          ))}
          {filtered.length === 0 && (<div className="flex items-center justify-center py-12"><span className="font-['Inter',sans-serif] text-[14px] text-[color:var(--text-secondary)]">No trades match your filters.</span></div>)}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  Performance Fee Content
 * ═══════════════════════════════════════════════════════ */
interface PerfFeeRow { id: string; period: string; account: string; client: string; openEquity: string; closeEquity: string; hwm: string; netProfit: string; feeRate: string; feeCharged: string; status: "Collected" | "Pending" | "Waived"; }
const PERF_FEE_DATA: PerfFeeRow[] = [
  { id: "PF-001", period: "01\u201315 Mar 2026", account: "MT5-20001", client: "Nick Doe", openEquity: "$45,200.00", closeEquity: "$48,750.00", hwm: "$45,200.00", netProfit: "$3,550.00", feeRate: "20%", feeCharged: "$710.00", status: "Collected" },
  { id: "PF-002", period: "01\u201315 Mar 2026", account: "MT5-20002", client: "Amira Hassan", openEquity: "$112,800.00", closeEquity: "$118,940.00", hwm: "$114,000.00", netProfit: "$4,940.00", feeRate: "25%", feeCharged: "$1,235.00", status: "Collected" },
  { id: "PF-003", period: "01\u201315 Mar 2026", account: "MT5-20003", client: "Yuki Tanaka", openEquity: "$22,400.00", closeEquity: "$21,850.00", hwm: "$23,100.00", netProfit: "-$550.00", feeRate: "20%", feeCharged: "$0.00", status: "Waived" },
  { id: "PF-004", period: "01\u201315 Mar 2026", account: "MT5-20005", client: "Elena Petrova", openEquity: "$67,300.00", closeEquity: "$71,200.00", hwm: "$67,300.00", netProfit: "$3,900.00", feeRate: "20%", feeCharged: "$780.00", status: "Pending" },
  { id: "PF-005", period: "01\u201315 Mar 2026", account: "MT5-20006", client: "Carlos Mendoza", openEquity: "$18,500.00", closeEquity: "$19,100.00", hwm: "$19,200.00", netProfit: "-$100.00", feeRate: "20%", feeCharged: "$0.00", status: "Waived" },
  { id: "PF-006", period: "01\u201315 Mar 2026", account: "MT5-20007", client: "Oliver Smith", openEquity: "$34,600.00", closeEquity: "$36,450.00", hwm: "$34,600.00", netProfit: "$1,850.00", feeRate: "15%", feeCharged: "$277.50", status: "Collected" },
  { id: "PF-007", period: "16\u201328 Feb 2026", account: "MT5-20001", client: "Nick Doe", openEquity: "$42,100.00", closeEquity: "$45,200.00", hwm: "$42,100.00", netProfit: "$3,100.00", feeRate: "20%", feeCharged: "$620.00", status: "Collected" },
  { id: "PF-008", period: "16\u201328 Feb 2026", account: "MT5-20002", client: "Amira Hassan", openEquity: "$108,200.00", closeEquity: "$114,000.00", hwm: "$108,200.00", netProfit: "$5,800.00", feeRate: "25%", feeCharged: "$1,450.00", status: "Collected" },
  { id: "PF-009", period: "16\u201328 Feb 2026", account: "MT5-20005", client: "Elena Petrova", openEquity: "$63,100.00", closeEquity: "$67,300.00", hwm: "$63,100.00", netProfit: "$4,200.00", feeRate: "20%", feeCharged: "$840.00", status: "Collected" },
  { id: "PF-010", period: "16\u201328 Feb 2026", account: "MT5-20007", client: "Oliver Smith", openEquity: "$31,800.00", closeEquity: "$34,600.00", hwm: "$31,800.00", netProfit: "$2,800.00", feeRate: "15%", feeCharged: "$420.00", status: "Collected" },
];
function PerformanceFeeContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | PerfFeeRow["status"]>("All");
  const filtered = PERF_FEE_DATA.filter((r) => { if (statusFilter !== "All" && r.status !== statusFilter) return false; if (search.trim()) { const q = search.toLowerCase(); return r.id.toLowerCase().includes(q) || r.client.toLowerCase().includes(q) || r.account.toLowerCase().includes(q); } return true; });
  const totalCollected = PERF_FEE_DATA.filter((r) => r.status === "Collected").reduce((s, r) => s + parseFloat(r.feeCharged.replace(/[^0-9.]/g, "")), 0);
  const totalPending = PERF_FEE_DATA.filter((r) => r.status === "Pending").reduce((s, r) => s + parseFloat(r.feeCharged.replace(/[^0-9.]/g, "")), 0);
  const waivedCount = PERF_FEE_DATA.filter((r) => r.status === "Waived").length;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        <SummaryCard icon={<DollarSign size={16} className="text-[var(--green-11)]" />} label="Total Collected" value={`$${totalCollected.toLocaleString("en-US", { minimumFractionDigits: 2 })}`} accent="var(--green-3)" />
        <SummaryCard icon={<Clock size={16} className="text-[var(--amber-11)]" />} label="Pending" value={`$${totalPending.toLocaleString("en-US", { minimumFractionDigits: 2 })}`} accent="var(--warning-bg)" />
        <SummaryCard icon={<AlertTriangle size={16} className="text-[var(--text-secondary)]" />} label="Waived (Below HWM)" value={String(waivedCount)} accent="var(--slate-3)" />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {(["All", "Collected", "Pending", "Waived"] as const).map((s) => (<button key={s} onClick={() => setStatusFilter(s)} className={`h-[30px] px-3 rounded-lg font-['Inter',sans-serif] text-[13px] tracking-[-0.065px] transition-colors cursor-pointer ${statusFilter === s ? "bg-[var(--accent-solid)] text-white" : "bg-[var(--slate-3)] text-[var(--text-secondary)] hover:bg-[var(--slate-4)]"}`} style={{ fontWeight: 600 }}>{s === "All" ? "All Statuses" : s}</button>))}
        </div>
        <div className="flex-1" />
        <div className="relative w-[240px]"><input type="text" placeholder="Search fees..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-[30px] px-3 pr-8 bg-[var(--slate-2)] rounded-lg text-[13px] font-['Inter',sans-serif] text-[color:var(--text-secondary)] focus:text-[color:var(--text-primary)] outline-none border border-transparent focus:border-[var(--accent-solid)] transition-colors" /><Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" /></div>
      </div>
      <div className="bg-[var(--bg-surface)] rounded-lg border-2 border-[var(--slate-3)] overflow-hidden"><div className="overflow-auto">
        <div className="flex items-center h-[40px] bg-[var(--slate-3)] sticky top-0 z-10">{["ID", "Period", "Account", "Client", "Open Equity", "Close Equity", "HWM", "Net Profit", "Rate", "Fee", "Status"].map((col) => (<div key={col} className={`shrink-0 flex items-center px-3 ${col === "Period" ? "w-[150px]" : col === "Client" ? "w-[140px]" : col === "Open Equity" || col === "Close Equity" ? "w-[120px]" : col === "Net Profit" || col === "Fee" ? "w-[110px]" : col === "ID" ? "w-[80px]" : "w-[100px]"}`}><span className="font-['Inter',sans-serif] font-semibold text-[12px] text-[color:var(--text-primary)] tracking-[-0.06px]">{col}</span></div>))}</div>
        {filtered.map((row) => (<div key={row.id} className="flex items-center h-[48px] border-b border-[var(--border-subtle)] bg-[var(--slate-1)] hover:bg-[var(--slate-3)] transition-colors"><div className="w-[80px] shrink-0 px-3"><span className="font-mono text-[12px] text-[color:var(--text-secondary)] tracking-[-0.02em]">{row.id}</span></div><div className="w-[150px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-secondary)] tracking-[-0.065px]">{row.period}</span></div><div className="w-[100px] shrink-0 px-3"><span className="font-mono text-[12px] text-[color:var(--text-primary)] tracking-[-0.02em]">{row.account}</span></div><div className="w-[140px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-primary)] tracking-[-0.065px] truncate">{row.client}</span></div><div className="w-[120px] shrink-0 px-3"><span className="font-mono text-[13px] text-[color:var(--text-primary)] tracking-[-0.02em]">{row.openEquity}</span></div><div className="w-[120px] shrink-0 px-3"><span className="font-mono text-[13px] text-[color:var(--text-primary)] tracking-[-0.02em]">{row.closeEquity}</span></div><div className="w-[100px] shrink-0 px-3"><span className="font-mono text-[12px] text-[color:var(--text-secondary)] tracking-[-0.02em]">{row.hwm}</span></div><div className="w-[110px] shrink-0 px-3"><span className={`font-mono text-[13px] tracking-[-0.02em] ${row.netProfit.startsWith("-") ? "text-[var(--red-11)]" : "text-[var(--green-11)]"}`} style={{ fontWeight: 600 }}>{row.netProfit}</span></div><div className="w-[100px] shrink-0 px-3"><span className="font-mono text-[13px] text-[color:var(--text-primary)] tracking-[-0.02em]">{row.feeRate}</span></div><div className="w-[110px] shrink-0 px-3"><span className="font-mono text-[13px] text-[color:var(--text-primary)] tracking-[-0.02em]" style={{ fontWeight: 600 }}>{row.feeCharged}</span></div><div className="w-[100px] shrink-0 px-3"><PerfFeeStatusBadge status={row.status} /></div></div>))}
        {filtered.length === 0 && <div className="flex items-center justify-center py-12"><span className="font-['Inter',sans-serif] text-[14px] text-[color:var(--text-secondary)]">No fee records match your filters.</span></div>}
      </div></div>
    </div>
  );
}
function PerfFeeStatusBadge({ status }: { status: PerfFeeRow["status"] }) { const styles = status === "Collected" ? "bg-[var(--green-3)] text-[var(--green-11)]" : status === "Pending" ? "bg-[var(--warning-bg)] text-[var(--warning-text)]" : "bg-[var(--slate-3)] text-[var(--text-secondary)]"; return <span className={`inline-flex h-[22px] px-2 items-center rounded font-['Inter',sans-serif] text-[12px] tracking-[-0.06px] ${styles}`} style={{ fontWeight: 500 }}>{status}</span>; }

/* ═══════════════════════════════════════════════════════
 *  Idle Clients Content
 * ═══════════════════════════════════════════════════════ */
interface IdleClient { id: string; client: string; email: string; lastLogin: string; lastTrade: string; daysIdle: number; balance: string; riskLevel: "Low" | "Medium" | "High"; status: "Warning" | "At Risk" | "Dormant"; }
const IDLE_CLIENTS_DATA: IdleClient[] = [
  { id: "CL-3001", client: "Marcus Webb", email: "m.webb@email.com", lastLogin: "12 Jan 2026", lastTrade: "08 Jan 2026", daysIdle: 64, balance: "$4,230.00", riskLevel: "Medium", status: "At Risk" },
  { id: "CL-3002", client: "Sofia Rodriguez", email: "s.rodriguez@email.com", lastLogin: "28 Feb 2026", lastTrade: "15 Feb 2026", daysIdle: 17, balance: "$12,800.00", riskLevel: "Low", status: "Warning" },
  { id: "CL-3003", client: "Henrik Johansson", email: "h.johansson@email.se", lastLogin: "05 Dec 2025", lastTrade: "01 Dec 2025", daysIdle: 102, balance: "$890.00", riskLevel: "High", status: "Dormant" },
  { id: "CL-3004", client: "Priya Sharma", email: "p.sharma@email.in", lastLogin: "20 Jan 2026", lastTrade: "18 Jan 2026", daysIdle: 56, balance: "$7,450.00", riskLevel: "Medium", status: "At Risk" },
  { id: "CL-3005", client: "Thomas Mueller", email: "t.mueller@email.de", lastLogin: "03 Mar 2026", lastTrade: "28 Feb 2026", daysIdle: 14, balance: "$23,100.00", riskLevel: "Low", status: "Warning" },
  { id: "CL-3006", client: "Aisha Patel", email: "a.patel@email.com", lastLogin: "10 Nov 2025", lastTrade: "05 Nov 2025", daysIdle: 127, balance: "$310.00", riskLevel: "High", status: "Dormant" },
  { id: "CL-3007", client: "James Kim", email: "j.kim@email.kr", lastLogin: "15 Feb 2026", lastTrade: "10 Feb 2026", daysIdle: 30, balance: "$5,600.00", riskLevel: "Medium", status: "Warning" },
  { id: "CL-3008", client: "Maria Costa", email: "m.costa@email.pt", lastLogin: "22 Dec 2025", lastTrade: "18 Dec 2025", daysIdle: 85, balance: "$1,940.00", riskLevel: "High", status: "Dormant" },
  { id: "CL-3009", client: "David Wilson", email: "d.wilson@email.co.uk", lastLogin: "01 Mar 2026", lastTrade: "25 Feb 2026", daysIdle: 16, balance: "$18,700.00", riskLevel: "Low", status: "Warning" },
  { id: "CL-3010", client: "Lin Wei", email: "l.wei@email.cn", lastLogin: "08 Feb 2026", lastTrade: "02 Feb 2026", daysIdle: 37, balance: "$9,200.00", riskLevel: "Medium", status: "At Risk" },
];
function IdleClientsContent() {
  const [search, setSearch] = useState(""); const [statusFilter, setStatusFilter] = useState<"All" | IdleClient["status"]>("All");
  const filtered = IDLE_CLIENTS_DATA.filter((c) => { if (statusFilter !== "All" && c.status !== statusFilter) return false; if (search.trim()) { const q = search.toLowerCase(); return c.client.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.id.toLowerCase().includes(q); } return true; });
  const warningCount = IDLE_CLIENTS_DATA.filter((c) => c.status === "Warning").length; const atRiskCount = IDLE_CLIENTS_DATA.filter((c) => c.status === "At Risk").length; const dormantCount = IDLE_CLIENTS_DATA.filter((c) => c.status === "Dormant").length;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        <SummaryCard icon={<Activity size={16} className="text-[var(--amber-11)]" />} label="Warning (14\u201330 days)" value={String(warningCount)} accent="var(--warning-bg)" />
        <SummaryCard icon={<UserX size={16} className="text-[var(--red-11)]" />} label="At Risk (31\u201390 days)" value={String(atRiskCount)} accent="var(--red-3)" />
        <SummaryCard icon={<AlertTriangle size={16} className="text-[var(--text-secondary)]" />} label="Dormant (90+ days)" value={String(dormantCount)} accent="var(--slate-3)" />
      </div>
      <div className="flex items-center gap-3"><div className="flex items-center gap-1">{(["All", "Warning", "At Risk", "Dormant"] as const).map((s) => (<button key={s} onClick={() => setStatusFilter(s)} className={`h-[30px] px-3 rounded-lg font-['Inter',sans-serif] text-[13px] tracking-[-0.065px] transition-colors cursor-pointer ${statusFilter === s ? "bg-[var(--accent-solid)] text-white" : "bg-[var(--slate-3)] text-[var(--text-secondary)] hover:bg-[var(--slate-4)]"}`} style={{ fontWeight: 600 }}>{s === "All" ? "All Statuses" : s}</button>))}</div><div className="flex-1" /><div className="relative w-[240px]"><input type="text" placeholder="Search clients..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-[30px] px-3 pr-8 bg-[var(--slate-2)] rounded-lg text-[13px] font-['Inter',sans-serif] text-[color:var(--text-secondary)] focus:text-[color:var(--text-primary)] outline-none border border-transparent focus:border-[var(--accent-solid)] transition-colors" /><Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" /></div></div>
      <div className="bg-[var(--bg-surface)] rounded-lg border-2 border-[var(--slate-3)] overflow-hidden"><div className="overflow-auto">
        <div className="flex items-center h-[40px] bg-[var(--slate-3)] sticky top-0 z-10">{["Client ID", "Client", "Email", "Last Login", "Last Trade", "Days Idle", "Balance", "Risk", "Status"].map((col) => (<div key={col} className={`shrink-0 flex items-center px-3 ${col === "Email" ? "w-[200px]" : col === "Client" ? "w-[160px]" : col === "Last Login" || col === "Last Trade" ? "w-[120px]" : col === "Balance" ? "w-[120px]" : col === "Days Idle" ? "w-[90px]" : "w-[100px]"}`}><span className="font-['Inter',sans-serif] font-semibold text-[12px] text-[color:var(--text-primary)] tracking-[-0.06px]">{col}</span></div>))}</div>
        {filtered.map((c) => (<div key={c.id} className="flex items-center h-[48px] border-b border-[var(--border-subtle)] bg-[var(--slate-1)] hover:bg-[var(--slate-3)] transition-colors"><div className="w-[100px] shrink-0 px-3"><span className="font-mono text-[12px] text-[color:var(--text-secondary)] tracking-[-0.02em]">{c.id}</span></div><div className="w-[160px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-primary)] tracking-[-0.065px] truncate" style={{ fontWeight: 500 }}>{c.client}</span></div><div className="w-[200px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-secondary)] tracking-[-0.065px] truncate">{c.email}</span></div><div className="w-[120px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-secondary)] tracking-[-0.065px]">{c.lastLogin}</span></div><div className="w-[120px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-secondary)] tracking-[-0.065px]">{c.lastTrade}</span></div><div className="w-[90px] shrink-0 px-3"><span className={`font-mono text-[13px] tracking-[-0.02em] ${c.daysIdle >= 90 ? "text-[var(--red-11)]" : c.daysIdle >= 30 ? "text-[var(--amber-11)]" : "text-[color:var(--text-primary)]"}`} style={{ fontWeight: 600 }}>{c.daysIdle}</span></div><div className="w-[120px] shrink-0 px-3"><span className="font-mono text-[13px] text-[color:var(--text-primary)] tracking-[-0.02em]">{c.balance}</span></div><div className="w-[100px] shrink-0 px-3"><IdleRiskBadge level={c.riskLevel} /></div><div className="w-[100px] shrink-0 px-3"><IdleStatusBadge status={c.status} /></div></div>))}
        {filtered.length === 0 && <div className="flex items-center justify-center py-12"><span className="font-['Inter',sans-serif] text-[14px] text-[color:var(--text-secondary)]">No idle clients match your filters.</span></div>}
      </div></div>
    </div>
  );
}
function IdleRiskBadge({ level }: { level: IdleClient["riskLevel"] }) { const styles = level === "Low" ? "bg-[var(--green-3)] text-[var(--green-11)]" : level === "Medium" ? "bg-[var(--warning-bg)] text-[var(--warning-text)]" : "bg-[var(--red-3)] text-[var(--red-11)]"; return <span className={`inline-flex h-[22px] px-2 items-center rounded font-['Inter',sans-serif] text-[12px] tracking-[-0.06px] ${styles}`} style={{ fontWeight: 500 }}>{level}</span>; }
function IdleStatusBadge({ status }: { status: IdleClient["status"] }) { const styles = status === "Warning" ? "bg-[var(--warning-bg)] text-[var(--warning-text)]" : status === "At Risk" ? "bg-[var(--red-3)] text-[var(--red-11)]" : "bg-[var(--slate-3)] text-[var(--text-secondary)]"; return <span className={`inline-flex h-[22px] px-2 items-center rounded font-['Inter',sans-serif] text-[12px] tracking-[-0.06px] ${styles}`} style={{ fontWeight: 500 }}>{status}</span>; }

/* ═══════════════════════════════════════════════════════
 *  Wallet Balance History Content
 * ═══════════════════════════════════════════════════════ */
interface BalanceSnapshot { id: string; date: string; walletId: string; client: string; currency: string; openingBalance: string; deposits: string; withdrawals: string; fees: string; closingBalance: string; netChange: string; }
const BALANCE_HISTORY: BalanceSnapshot[] = [
  { id: "BH-001", date: "16 Mar 2026", walletId: "W-1001", client: "Nick Doe", currency: "USD", openingBalance: "$55,200.00", deposits: "$12,500.00", withdrawals: "$0.00", fees: "-$42.00", closingBalance: "$67,658.00", netChange: "+$12,458.00" },
  { id: "BH-002", date: "16 Mar 2026", walletId: "W-1002", client: "Amira Hassan", currency: "USD", openingBalance: "$128,400.00", deposits: "$0.00", withdrawals: "-$3,200.00", fees: "-$85.00", closingBalance: "$125,115.00", netChange: "-$3,285.00" },
  { id: "BH-003", date: "16 Mar 2026", walletId: "W-1004", client: "Yuki Tanaka", currency: "EUR", openingBalance: "\u20ac18,900.00", deposits: "\u20ac1,000.00", withdrawals: "\u20ac0.00", fees: "-\u20ac12.00", closingBalance: "\u20ac19,888.00", netChange: "+\u20ac988.00" },
  { id: "BH-004", date: "15 Mar 2026", walletId: "W-1001", client: "Nick Doe", currency: "USD", openingBalance: "$5,200.00", deposits: "$50,000.00", withdrawals: "$0.00", fees: "$0.00", closingBalance: "$55,200.00", netChange: "+$50,000.00" },
  { id: "BH-005", date: "15 Mar 2026", walletId: "W-1005", client: "Elena Petrova", currency: "USD", openingBalance: "$92,300.00", deposits: "$0.00", withdrawals: "-$25,000.00", fees: "-$65.00", closingBalance: "$67,235.00", netChange: "-$25,065.00" },
  { id: "BH-006", date: "14 Mar 2026", walletId: "W-1006", client: "Carlos Mendoza", currency: "USD", openingBalance: "$10,200.00", deposits: "$8,750.00", withdrawals: "$0.00", fees: "-$30.00", closingBalance: "$18,920.00", netChange: "+$8,720.00" },
  { id: "BH-007", date: "14 Mar 2026", walletId: "W-1007", client: "Fatima Al-Rashid", currency: "USD", openingBalance: "$45,600.00", deposits: "$0.00", withdrawals: "$0.00", fees: "$0.00", closingBalance: "$45,600.00", netChange: "$0.00" },
  { id: "BH-008", date: "13 Mar 2026", walletId: "W-1008", client: "Oliver Smith", currency: "GBP", openingBalance: "\u00a312,400.00", deposits: "\u00a30.00", withdrawals: "\u00a30.00", fees: "\u00a30.00", closingBalance: "\u00a312,400.00", netChange: "\u00a30.00" },
  { id: "BH-009", date: "13 Mar 2026", walletId: "W-1001", client: "Nick Doe", currency: "USD", openingBalance: "$4,800.00", deposits: "$0.00", withdrawals: "$0.00", fees: "-$12.00", closingBalance: "$4,788.00", netChange: "-$12.00" },
  { id: "BH-010", date: "12 Mar 2026", walletId: "W-1002", client: "Amira Hassan", currency: "USD", openingBalance: "$144,200.00", deposits: "$0.00", withdrawals: "-$15,800.00", fees: "$0.00", closingBalance: "$128,400.00", netChange: "-$15,800.00" },
  { id: "BH-011", date: "12 Mar 2026", walletId: "W-1004", client: "Yuki Tanaka", currency: "EUR", openingBalance: "\u20ac16,900.00", deposits: "\u20ac2,000.00", withdrawals: "\u20ac0.00", fees: "\u20ac0.00", closingBalance: "\u20ac18,900.00", netChange: "+\u20ac2,000.00" },
  { id: "BH-012", date: "11 Mar 2026", walletId: "W-1005", client: "Elena Petrova", currency: "USD", openingBalance: "$84,800.00", deposits: "$7,500.00", withdrawals: "$0.00", fees: "$0.00", closingBalance: "$92,300.00", netChange: "+$7,500.00" },
];
function WalletBalanceHistoryContent() {
  const [search, setSearch] = useState("");
  const filtered = BALANCE_HISTORY.filter((s) => { if (!search.trim()) return true; const q = search.toLowerCase(); return s.walletId.toLowerCase().includes(q) || s.client.toLowerCase().includes(q) || s.date.toLowerCase().includes(q); });
  const uniqueWallets = new Set(BALANCE_HISTORY.map((s) => s.walletId)).size; const netPositive = BALANCE_HISTORY.filter((s) => s.netChange.includes("+")).length; const netNegative = BALANCE_HISTORY.filter((s) => s.netChange.includes("-")).length;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        <SummaryCard icon={<Wallet size={16} className="text-[var(--indigo-11)]" />} label="Unique Wallets" value={String(uniqueWallets)} accent="var(--accent-bg)" />
        <SummaryCard icon={<TrendingUp size={16} className="text-[var(--green-11)]" />} label="Net Positive Days" value={String(netPositive)} accent="var(--green-3)" />
        <SummaryCard icon={<TrendingDown size={16} className="text-[var(--red-11)]" />} label="Net Negative Days" value={String(netNegative)} accent="var(--red-3)" />
      </div>
      <div className="flex items-center gap-3"><div className="flex-1" /><div className="relative w-[240px]"><input type="text" placeholder="Search by wallet, client, date..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-[30px] px-3 pr-8 bg-[var(--slate-2)] rounded-lg text-[13px] font-['Inter',sans-serif] text-[color:var(--text-secondary)] focus:text-[color:var(--text-primary)] outline-none border border-transparent focus:border-[var(--accent-solid)] transition-colors" /><Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" /></div></div>
      <div className="bg-[var(--bg-surface)] rounded-lg border-2 border-[var(--slate-3)] overflow-hidden"><div className="overflow-auto">
        <div className="flex items-center h-[40px] bg-[var(--slate-3)] sticky top-0 z-10">{["Date", "Wallet", "Client", "CCY", "Opening", "Deposits", "Withdrawals", "Fees", "Closing", "Net Change"].map((col) => (<div key={col} className={`shrink-0 flex items-center px-3 ${col === "Client" ? "w-[150px]" : col === "Date" ? "w-[120px]" : col === "CCY" ? "w-[60px]" : col === "Wallet" ? "w-[90px]" : "w-[115px]"}`}><span className="font-['Inter',sans-serif] font-semibold text-[12px] text-[color:var(--text-primary)] tracking-[-0.06px]">{col}</span></div>))}</div>
        {filtered.map((s) => (<div key={s.id} className="flex items-center h-[48px] border-b border-[var(--border-subtle)] bg-[var(--slate-1)] hover:bg-[var(--slate-3)] transition-colors"><div className="w-[120px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-secondary)] tracking-[-0.065px]">{s.date}</span></div><div className="w-[90px] shrink-0 px-3"><span className="font-mono text-[12px] text-[color:var(--text-primary)] tracking-[-0.02em]">{s.walletId}</span></div><div className="w-[150px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-primary)] tracking-[-0.065px] truncate">{s.client}</span></div><div className="w-[60px] shrink-0 px-3"><span className="font-mono text-[12px] text-[color:var(--text-secondary)] tracking-[-0.02em]">{s.currency}</span></div><div className="w-[115px] shrink-0 px-3"><span className="font-mono text-[13px] text-[color:var(--text-primary)] tracking-[-0.02em]">{s.openingBalance}</span></div><div className="w-[115px] shrink-0 px-3"><span className={`font-mono text-[13px] tracking-[-0.02em] ${s.deposits !== "$0.00" && s.deposits !== "\u20ac0.00" && s.deposits !== "\u00a30.00" ? "text-[var(--green-11)]" : "text-[var(--text-secondary)]"}`}>{s.deposits}</span></div><div className="w-[115px] shrink-0 px-3"><span className={`font-mono text-[13px] tracking-[-0.02em] ${s.withdrawals.includes("-") ? "text-[var(--red-11)]" : "text-[var(--text-secondary)]"}`}>{s.withdrawals}</span></div><div className="w-[115px] shrink-0 px-3"><span className={`font-mono text-[13px] tracking-[-0.02em] ${s.fees.includes("-") ? "text-[var(--red-11)]" : "text-[var(--text-secondary)]"}`}>{s.fees}</span></div><div className="w-[115px] shrink-0 px-3"><span className="font-mono text-[13px] text-[color:var(--text-primary)] tracking-[-0.02em]" style={{ fontWeight: 600 }}>{s.closingBalance}</span></div><div className="w-[115px] shrink-0 px-3"><span className={`font-mono text-[13px] tracking-[-0.02em] ${s.netChange.includes("+") ? "text-[var(--green-11)]" : s.netChange.includes("-") ? "text-[var(--red-11)]" : "text-[var(--text-secondary)]"}`} style={{ fontWeight: 600 }}>{s.netChange}</span></div></div>))}
        {filtered.length === 0 && <div className="flex items-center justify-center py-12"><span className="font-['Inter',sans-serif] text-[14px] text-[color:var(--text-secondary)]">No balance records match your search.</span></div>}
      </div></div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  Registrations Content
 * ═══════════════════════════════════════════════════════ */
interface Registration { id: string; date: string; client: string; email: string; country: string; source: string; type: "Individual" | "Corporate"; kycStatus: "Verified" | "Pending" | "In Review" | "Declined"; converted: boolean; }
const REGISTRATIONS_DATA: Registration[] = [
  { id: "REG-5001", date: "16 Mar 2026", client: "Lena Karlsson", email: "l.karlsson@email.se", country: "Sweden", source: "Website", type: "Individual", kycStatus: "Pending", converted: false },
  { id: "REG-5002", date: "16 Mar 2026", client: "Ahmed Al-Farsi", email: "a.alfarsi@email.ae", country: "UAE", source: "Referral", type: "Individual", kycStatus: "In Review", converted: false },
  { id: "REG-5003", date: "15 Mar 2026", client: "Chen Wei Ming", email: "c.weiming@corp.cn", country: "China", source: "Partner Portal", type: "Corporate", kycStatus: "Pending", converted: false },
  { id: "REG-5004", date: "15 Mar 2026", client: "Isabella Rossi", email: "i.rossi@email.it", country: "Italy", source: "Website", type: "Individual", kycStatus: "Verified", converted: true },
  { id: "REG-5005", date: "14 Mar 2026", client: "Dmitri Volkov", email: "d.volkov@email.ru", country: "Russia", source: "Mobile App", type: "Individual", kycStatus: "Declined", converted: false },
  { id: "REG-5006", date: "14 Mar 2026", client: "Sophie Dupont", email: "s.dupont@email.fr", country: "France", source: "Website", type: "Individual", kycStatus: "Verified", converted: true },
  { id: "REG-5007", date: "13 Mar 2026", client: "Kenji Watanabe", email: "k.watanabe@email.jp", country: "Japan", source: "Referral", type: "Individual", kycStatus: "Verified", converted: true },
  { id: "REG-5008", date: "13 Mar 2026", client: "Global Trade Ltd", email: "info@globaltrade.co.uk", country: "United Kingdom", source: "Partner Portal", type: "Corporate", kycStatus: "In Review", converted: false },
  { id: "REG-5009", date: "12 Mar 2026", client: "Maria Santos", email: "m.santos@email.br", country: "Brazil", source: "Mobile App", type: "Individual", kycStatus: "Verified", converted: true },
  { id: "REG-5010", date: "12 Mar 2026", client: "Oscar Nguyen", email: "o.nguyen@email.vn", country: "Vietnam", source: "Website", type: "Individual", kycStatus: "Verified", converted: true },
  { id: "REG-5011", date: "11 Mar 2026", client: "Alexandra Popov", email: "a.popov@email.bg", country: "Bulgaria", source: "Referral", type: "Individual", kycStatus: "Pending", converted: false },
  { id: "REG-5012", date: "11 Mar 2026", client: "Rashid Al-Mansur", email: "r.almansur@corp.sa", country: "Saudi Arabia", source: "Partner Portal", type: "Corporate", kycStatus: "Pending", converted: false },
];
function RegistrationsContent() {
  const [search, setSearch] = useState(""); const [sourceFilter, setSourceFilter] = useState<"All" | string>("All");
  const sources = [...new Set(REGISTRATIONS_DATA.map((r) => r.source))];
  const filtered = REGISTRATIONS_DATA.filter((r) => { if (sourceFilter !== "All" && r.source !== sourceFilter) return false; if (search.trim()) { const q = search.toLowerCase(); return r.client.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.country.toLowerCase().includes(q) || r.id.toLowerCase().includes(q); } return true; });
  const totalRegs = REGISTRATIONS_DATA.length; const convertedCount = REGISTRATIONS_DATA.filter((r) => r.converted).length; const conversionRate = totalRegs > 0 ? Math.round((convertedCount / totalRegs) * 100) : 0;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        <SummaryCard icon={<Users size={16} className="text-[var(--indigo-11)]" />} label="Total Registrations" value={String(totalRegs)} accent="var(--accent-bg)" />
        <SummaryCard icon={<Check size={16} className="text-[var(--green-11)]" />} label="Converted" value={String(convertedCount)} accent="var(--green-3)" />
        <SummaryCard icon={<TrendingUp size={16} className="text-[var(--indigo-11)]" />} label="Conversion Rate" value={`${conversionRate}%`} accent="var(--accent-bg)" />
      </div>
      <div className="flex items-center gap-3"><div className="flex items-center gap-1"><button onClick={() => setSourceFilter("All")} className={`h-[30px] px-3 rounded-lg font-['Inter',sans-serif] text-[13px] tracking-[-0.065px] transition-colors cursor-pointer ${sourceFilter === "All" ? "bg-[var(--accent-solid)] text-white" : "bg-[var(--slate-3)] text-[var(--text-secondary)] hover:bg-[var(--slate-4)]"}`} style={{ fontWeight: 600 }}>All Sources</button>{sources.map((s) => (<button key={s} onClick={() => setSourceFilter(s)} className={`h-[30px] px-3 rounded-lg font-['Inter',sans-serif] text-[13px] tracking-[-0.065px] transition-colors cursor-pointer ${sourceFilter === s ? "bg-[var(--accent-solid)] text-white" : "bg-[var(--slate-3)] text-[var(--text-secondary)] hover:bg-[var(--slate-4)]"}`} style={{ fontWeight: 600 }}>{s}</button>))}</div><div className="flex-1" /><div className="relative w-[240px]"><input type="text" placeholder="Search registrations..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-[30px] px-3 pr-8 bg-[var(--slate-2)] rounded-lg text-[13px] font-['Inter',sans-serif] text-[color:var(--text-secondary)] focus:text-[color:var(--text-primary)] outline-none border border-transparent focus:border-[var(--accent-solid)] transition-colors" /><Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" /></div></div>
      <div className="bg-[var(--bg-surface)] rounded-lg border-2 border-[var(--slate-3)] overflow-hidden"><div className="overflow-auto">
        <div className="flex items-center h-[40px] bg-[var(--slate-3)] sticky top-0 z-10">{["Reg ID", "Date", "Client", "Email", "Country", "Source", "Type", "KYC", "Converted"].map((col) => (<div key={col} className={`shrink-0 flex items-center px-3 ${col === "Email" ? "w-[200px]" : col === "Client" ? "w-[160px]" : col === "Country" ? "w-[130px]" : col === "Source" ? "w-[120px]" : col === "Date" ? "w-[110px]" : "w-[100px]"}`}><span className="font-['Inter',sans-serif] font-semibold text-[12px] text-[color:var(--text-primary)] tracking-[-0.06px]">{col}</span></div>))}</div>
        {filtered.map((r) => (<div key={r.id} className="flex items-center h-[48px] border-b border-[var(--border-subtle)] bg-[var(--slate-1)] hover:bg-[var(--slate-3)] transition-colors"><div className="w-[100px] shrink-0 px-3"><span className="font-mono text-[12px] text-[color:var(--text-secondary)] tracking-[-0.02em]">{r.id}</span></div><div className="w-[110px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-secondary)] tracking-[-0.065px]">{r.date}</span></div><div className="w-[160px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-primary)] tracking-[-0.065px] truncate" style={{ fontWeight: 500 }}>{r.client}</span></div><div className="w-[200px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-secondary)] tracking-[-0.065px] truncate">{r.email}</span></div><div className="w-[130px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-primary)] tracking-[-0.065px]">{r.country}</span></div><div className="w-[120px] shrink-0 px-3"><span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-secondary)] tracking-[-0.065px]">{r.source}</span></div><div className="w-[100px] shrink-0 px-3"><RegTypeBadge type={r.type} /></div><div className="w-[100px] shrink-0 px-3"><RegKycBadge status={r.kycStatus} /></div><div className="w-[100px] shrink-0 px-3">{r.converted ? (<span className="inline-flex items-center gap-1 font-['Inter',sans-serif] text-[13px] text-[var(--green-11)] tracking-[-0.065px]" style={{ fontWeight: 600 }}><Check size={14} /> Yes</span>) : (<span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-tertiary)] tracking-[-0.065px]">No</span>)}</div></div>))}
        {filtered.length === 0 && <div className="flex items-center justify-center py-12"><span className="font-['Inter',sans-serif] text-[14px] text-[color:var(--text-secondary)]">No registrations match your filters.</span></div>}
      </div></div>
    </div>
  );
}
function RegTypeBadge({ type }: { type: Registration["type"] }) { const styles = type === "Individual" ? "bg-[var(--accent-bg)] text-[var(--indigo-11)]" : "bg-[var(--slate-3)] text-[var(--text-primary)]"; return <span className={`inline-flex h-[22px] px-2 items-center rounded font-['Inter',sans-serif] text-[12px] tracking-[-0.06px] ${styles}`} style={{ fontWeight: 500 }}>{type}</span>; }
function RegKycBadge({ status }: { status: Registration["kycStatus"] }) { const styles = status === "Verified" ? "bg-[var(--green-3)] text-[var(--green-11)]" : status === "Pending" ? "bg-[var(--warning-bg)] text-[var(--warning-text)]" : status === "In Review" ? "bg-[var(--accent-bg)] text-[var(--indigo-11)]" : "bg-[var(--red-3)] text-[var(--red-11)]"; return <span className={`inline-flex h-[22px] px-2 items-center rounded font-['Inter',sans-serif] text-[12px] tracking-[-0.06px] ${styles}`} style={{ fontWeight: 500 }}>{status}</span>; }

/* ═══════════════════════════════════════════════════════
 *  Generic Report Content (fallback for other reports)
 * ═══════════════════════════════════════════════════════ */
function GenericReportContent({ report }: { report: Report }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="size-12 bg-[var(--slate-3)] rounded-xl flex items-center justify-center"><FileText size={24} className="text-[var(--text-secondary)]" /></div>
      <h3 className="font-['Public_Sans',sans-serif] text-[18px] text-[color:var(--text-primary)] tracking-[-0.36px]">{report.name}</h3>
      <p className="font-['Inter',sans-serif] text-[14px] text-[color:var(--text-secondary)] tracking-[-0.07px] text-center max-w-[360px]">Detailed report view for this report type is coming soon. Use the Export button to download.</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  Shared primitives
 * ═══════════════════════════════════════════════════════ */
function SummaryCard({ icon, label, value, accent }: { icon: ReactNode; label: string; value: string; accent: string; }) {
  return (
    <div className="bg-[var(--bg-surface)] rounded-lg border-2 border-[var(--slate-3)] p-4 flex items-center gap-3">
      <div className="size-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: accent }}>{icon}</div>
      <div className="flex flex-col gap-0.5">
        <span className="font-['Inter',sans-serif] text-[12px] text-[color:var(--text-secondary)] tracking-[-0.06px]">{label}</span>
        <span className="font-['Inter',sans-serif] text-[18px] text-[color:var(--text-primary)] tracking-[-0.36px]" style={{ fontWeight: 600 }}>{value}</span>
      </div>
    </div>
  );
}
function TxTypeBadge({ type }: { type: WalletTx["type"] }) { const styles = type === "Deposit" ? "bg-[var(--green-3)] text-[var(--green-11)]" : type === "Withdrawal" ? "bg-[var(--red-3)] text-[var(--red-11)]" : "bg-[var(--accent-bg)] text-[var(--indigo-11)]"; return (<span className={`inline-flex h-[22px] px-2 items-center rounded font-['Inter',sans-serif] text-[12px] tracking-[-0.06px] ${styles}`} style={{ fontWeight: 500 }}>{type}</span>); }
function TxStatusDot({ status }: { status: WalletTx["status"] }) { const dotColor = status === "Completed" ? "var(--success)" : status === "Pending" ? "var(--warning-text)" : "var(--red-11)"; const textColor = dotColor; return (<div className="flex items-center gap-1.5"><div className="size-2 rounded-full shrink-0" style={{ backgroundColor: dotColor }} /><span className="font-['Inter',sans-serif] text-[13px] tracking-[-0.065px]" style={{ color: textColor }}>{status}</span></div>); }
function SideBadge({ side }: { side: "Buy" | "Sell" }) { return (<span className={`inline-flex h-[22px] px-2 items-center rounded font-['Inter',sans-serif] text-[12px] tracking-[-0.06px] ${side === "Buy" ? "bg-[var(--green-3)] text-[var(--green-11)]" : "bg-[var(--red-3)] text-[var(--red-11)]"}`} style={{ fontWeight: 500 }}>{side}</span>); }

/* \u2500\u2500\u2500 Accordion Card \u2500\u2500\u2500 */
function AccordionCard({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode; }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-[var(--bg-surface)] rounded-lg border-2 border-[var(--slate-3)] shrink-0 w-full overflow-hidden">
      <div className="shrink-0 w-full bg-[var(--slate-3)] border-b border-[var(--border-subtle)]">
        <div className="flex items-center justify-between gap-4 px-4 py-2.5">
          <span className="font-['Inter',sans-serif] font-semibold text-[12px] text-[color:var(--text-primary)] tracking-[-0.06px]">{title}</span>
          <button onClick={() => setOpen((v) => !v)} className="size-[24px] flex items-center justify-center hover:bg-[var(--slate-4)] transition-colors rounded-md cursor-pointer"><ChevronUp size={14} className={`text-[var(--text-secondary)] transition-transform ${open ? "" : "rotate-180"}`} /></button>
        </div>
      </div>
      {open && <div className="flex flex-col">{children}</div>}
    </div>
  );
}

/* \u2500\u2500\u2500 KV Row \u2500\u2500\u2500 */
function KVRow({ label, value, border = false }: { label: string; value: React.ReactNode; border?: boolean; }) {
  return (
    <div className={`relative w-full bg-[var(--slate-1)] ${border ? "border-b border-[var(--border-subtle)]" : ""}`}>
      <div className="flex items-center gap-4 p-3">
        <span className="flex-1 font-['Inter',sans-serif] text-[14px] text-[color:var(--text-secondary)] tracking-[-0.07px] leading-[1.3]">{label}</span>
        {typeof value === "string" ? (<span className="flex-1 font-['Inter',sans-serif] text-[14px] text-[color:var(--text-primary)] tracking-[-0.07px] leading-[1.3]">{value}</span>) : (<div className="flex-1 flex items-center justify-start">{value}</div>)}
      </div>
    </div>
  );
}
