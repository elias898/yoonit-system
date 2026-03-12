import { useState } from "react";
import { RefreshCw, Check, Plus, X } from "lucide-react";
import { InputField } from "./InputField";

/* ── Partners Configuration ── */
export function PartnersConfigPanel() {
  const [autoLink, setAutoLink] = useState(true);
  const [linkType, setLinkType] = useState("Agent Account");

  return (
    <div className="rounded-xl overflow-hidden">
      <div className="px-5 py-4">
        <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-4">
          Configure IB settings per server. Controls how partner accounts are linked and managed.
        </p>

        <div className="space-y-4 max-w-[480px]">
          <div>
            <label className="block font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] mb-[6px]" style={{ fontWeight: 600 }}>
              Auto Link
            </label>
            <button
              type="button"
              onClick={() => setAutoLink(!autoLink)}
              className={`flex items-center w-9 h-5 p-[2px] rounded-[16px] transition-colors shrink-0 cursor-pointer ${
                autoLink ? "bg-[var(--indigo-9)]" : "bg-[var(--slate-5)]"
              }`}
            >
              <div
                className={`h-full aspect-square rounded-full bg-[var(--slate-1)] shadow-sm transition-transform ${
                  autoLink ? "translate-x-[16px]" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div>
            <InputField as="select" label="Account Link Type" value={linkType} onChange={(e) => setLinkType(e.target.value)}>
              <option>Agent Account</option>
              <option>IDNumber</option>
              <option>NONE</option>
            </InputField>
          </div>

          <div className="px-3 py-2.5 bg-[var(--slate-2)] rounded-lg">
            <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
              When Auto Link is enabled, new sub-partners are automatically linked to the parent IB account without manual approval.
            </p>
          </div>

          <div className="pt-1">
            <button className="px-4 py-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Partners Synchronization ── */
export function PartnersSyncPanel() {
  const [syncType, setSyncType] = useState("Trades");
  const [ib, setIb] = useState("");
  const [account, setAccount] = useState("");
  const [syncing, setSyncing] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden">
      <div className="px-5 py-4">
        <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-4">
          Synchronize partner data including trades, commissions, and account links.
        </p>
        <div className="space-y-3 max-w-[480px]">
          <InputField as="select" label="Synchronize" value={syncType} onChange={(e) => setSyncType(e.target.value)}>
            <option>Trades</option>
            <option>Commissions</option>
            <option>Links</option>
          </InputField>
          <div className="grid grid-cols-2 gap-3">
            <InputField as="select" label="IB" value={ib} onChange={(e) => setIb(e.target.value)}>
              <option value="">Select IB...</option>
              <option>IB-001</option>
              <option>IB-002</option>
            </InputField>
            <InputField as="select" label="Account" value={account} onChange={(e) => setAccount(e.target.value)}>
              <option value="">Select Account...</option>
              <option>100001</option>
              <option>100002</option>
            </InputField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <InputField label="From" type="date" />
            <InputField label="To" type="date" />
          </div>
          <div className="pt-1">
            <button
              onClick={() => { setSyncing(true); setTimeout(() => setSyncing(false), 1500); }}
              className="h-8 px-4 flex items-center gap-2 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors"
            >
              {syncing ? <><Check size={14} /> Synchronized</> : <><RefreshCw size={14} /> Synchronize</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Comment Rules Panel ── */
export function CommentRulesPanel() {
  const [withdrawComments, setWithdrawComments] = useState(["cashback*"]);
  const [depositComments, setDepositComments] = useState<string[]>([]);
  const [newWithdraw, setNewWithdraw] = useState("");
  const [newDeposit, setNewDeposit] = useState("");

  return (
    <div className="rounded-xl overflow-hidden">
      <div className="px-5 py-4 space-y-5">
        {/* Withdrawal */}
        <div>
          <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] font-semibold mb-1">
            Withdrawal Exclude Comment
          </h6>
          <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
            Only withdrawal operations with these comments will be excluded.
          </p>
          <div className="space-y-2 max-w-[400px]">
            {withdrawComments.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={c}
                  readOnly
                  className="flex-1 h-8 px-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-raised)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] outline-none"
                />
                <button
                  onClick={() => setWithdrawComments((prev) => prev.filter((_, j) => j !== i))}
                  className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer"
                >
                  <X size={14} className="text-[var(--text-muted)]" />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <input
                value={newWithdraw}
                onChange={(e) => setNewWithdraw(e.target.value)}
                placeholder="Add comment pattern..."
                className="flex-1 h-8 px-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-raised)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
              />
              <button
                onClick={() => { if (newWithdraw.trim()) { setWithdrawComments((p) => [...p, newWithdraw.trim()]); setNewWithdraw(""); } }}
                className="w-7 h-7 flex items-center justify-center rounded-md bg-[var(--accent-solid)] text-white hover:bg-[var(--accent-solid-hover)] cursor-pointer"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="h-px bg-[var(--border-subtle)]" />

        {/* Deposit */}
        <div>
          <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] font-semibold mb-1">
            Deposit Exclude Comment
          </h6>
          <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
            Only deposit operations with these comments will be excluded.
          </p>
          <div className="space-y-2 max-w-[400px]">
            {depositComments.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={c}
                  readOnly
                  className="flex-1 h-8 px-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-raised)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] outline-none"
                />
                <button
                  onClick={() => setDepositComments((prev) => prev.filter((_, j) => j !== i))}
                  className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer"
                >
                  <X size={14} className="text-[var(--text-muted)]" />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <input
                value={newDeposit}
                onChange={(e) => setNewDeposit(e.target.value)}
                placeholder="Add comment pattern..."
                className="flex-1 h-8 px-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-raised)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
              />
              <button
                onClick={() => { if (newDeposit.trim()) { setDepositComments((p) => [...p, newDeposit.trim()]); setNewDeposit(""); } }}
                className="w-7 h-7 flex items-center justify-center rounded-md bg-[var(--accent-solid)] text-white hover:bg-[var(--accent-solid-hover)] cursor-pointer"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-1 flex justify-end">
          <button className="px-4 py-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}