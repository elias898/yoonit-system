import { useState } from "react";
import { RefreshCw, Check, Plus, X } from "lucide-react";
import { InputField } from "./InputField";

/* ── Bonus Configuration ── */
export function BonusConfigPanel() {
  const [negativeBalance, setNegativeBalance] = useState(true);
  const [excludeManual, setExcludeManual] = useState(false);
  const [triggerTrading, setTriggerTrading] = useState(true);
  const [safetyThreshold, setSafetyThreshold] = useState(true);
  const [stopoutMode, setStopoutMode] = useState("system");
  const [adjustmentMode, setAdjustmentMode] = useState("deposit-proportional");
  const [accountRemoval, setAccountRemoval] = useState("delete");

  const [withdrawExclude, setWithdrawExclude] = useState(["Div*", "Adjustment", "MAMM*"]);
  const [depositExclude, setDepositExclude] = useState(["*div*", "Adjustment", "Cashback*"]);
  const [newWithdraw, setNewWithdraw] = useState("");
  const [newDeposit, setNewDeposit] = useState("");

  const [bonusRemoval, setBonusRemoval] = useState("Bonus Removed");
  const [negBalComment, setNegBalComment] = useState("Negative Balance Protection");
  const [withdrawalComment, setWithdrawalComment] = useState("Bonus Withdrawal Adjustment");
  const [stopoutComment, setStopoutComment] = useState("Bonus Stopout");
  const [deallocateComment, setDeallocateComment] = useState("Client De-Allocated");
  const [cashbackComment, setCashbackComment] = useState("Cashback Bonus");

  function RadioRow({ label, name, value, checked, onChange }: { label: string; name: string; value: string; checked: boolean; onChange: () => void }) {
    return (
      <label className="flex items-start gap-2 cursor-pointer py-1">
        <input type="radio" name={name} checked={checked} onChange={onChange} className="accent-[var(--accent-solid)] mt-0.5" />
        <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{label}</span>
      </label>
    );
  }

  function YesNoRow({ label, name, value, onChange }: { label: string; name: string; value: boolean; onChange: (v: boolean) => void }) {
    return (
      <div className="flex items-center justify-between py-1">
        <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{label}</span>
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={`flex items-center w-9 h-5 p-[2px] rounded-[16px] transition-colors shrink-0 cursor-pointer ${
            value ? "bg-[var(--indigo-9)]" : "bg-[var(--slate-5)]"
          }`}
        >
          <div
            className={`h-full aspect-square rounded-full bg-[var(--slate-1)] shadow-sm transition-transform ${
              value ? "translate-x-[16px]" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    );
  }

  function CommentList({ items, onRemove, newValue, onNewChange, onAdd }: { items: string[]; onRemove: (i: number) => void; newValue: string; onNewChange: (v: string) => void; onAdd: () => void }) {
    return (
      <div className="space-y-1.5">
        {items.map((c, i) => (
          <div key={i} className="flex items-center gap-2">
            <input value={c} readOnly className="flex-1 h-7 px-2.5 rounded-md border border-[var(--border-default)] bg-[var(--bg-raised)] font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-primary)] outline-none" />
            <button onClick={() => onRemove(i)} className="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--bg-hover)] cursor-pointer">
              <X size={12} className="text-[var(--text-muted)]" />
            </button>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <input value={newValue} onChange={(e) => onNewChange(e.target.value)} placeholder="Add pattern..." className="flex-1 h-7 px-2.5 rounded-md border border-[var(--border-default)] bg-[var(--bg-raised)] font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]" />
          <button onClick={onAdd} className="w-6 h-6 flex items-center justify-center rounded bg-[var(--accent-solid)] text-white hover:bg-[var(--accent-solid-hover)] cursor-pointer">
            <Plus size={12} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden">
      {/* Section 1 — Bonus Configurations */}
      <div className="px-5 py-4">
        <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] font-semibold mb-3">
          Bonus Configurations
        </h6>
        <div className="space-y-1 max-w-[480px]">
          <YesNoRow label="Negative Balance" name="negBal" value={negativeBalance} onChange={setNegativeBalance} />
          <YesNoRow label="Exclude Manual Credit Operation" name="excludeManual" value={excludeManual} onChange={setExcludeManual} />
          <YesNoRow label="Trigger Trading Accounts" name="triggerTrading" value={triggerTrading} onChange={setTriggerTrading} />
          <YesNoRow label="Safety Threshold" name="safetyThreshold" value={safetyThreshold} onChange={setSafetyThreshold} />
        </div>
        <div className="pt-3">
          <button className="px-4 py-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors">
            Save
          </button>
        </div>
      </div>

      {/* Section 2 — Stopout Account */}
      <div className="px-5 py-4 border-b border-[var(--border-default)]">
        <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] font-semibold mb-1">
          Stopout Account
        </h6>
        <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-3">
          You may forcibly apply stopout on the accounts benefiting from a bonus campaign using a variety of options.
        </p>
        <div className="space-y-1 max-w-[560px]">
          <RadioRow label="System: stopout when Loss Threshold % is consumed (irrespective of MT platform)" name="stopout" value="system" checked={stopoutMode === "system"} onChange={() => setStopoutMode("system")} />
          <RadioRow label="Hybrid: combination of System and MT Group Stopout level" name="stopout" value="hybrid" checked={stopoutMode === "hybrid"} onChange={() => setStopoutMode("hybrid")} />
          <RadioRow label="MT: leaves stopout entirely to MT platform" name="stopout" value="mt" checked={stopoutMode === "mt"} onChange={() => setStopoutMode("mt")} />
        </div>
        <div className="pt-3">
          <button className="px-4 py-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors">
            Save
          </button>
        </div>
      </div>

      {/* Section 3 — Bonus Adjustment */}
      <div className="px-5 py-4 border-b border-[var(--border-default)]">
        <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] font-semibold mb-1">
          Bonus Adjustment
        </h6>
        <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-3">
          Specify what to do with bonus in the event of a withdrawal transaction.
        </p>
        <div className="space-y-1 max-w-[560px]">
          <RadioRow label="All: entire bonus removed on withdrawal" name="adjustment" value="all" checked={adjustmentMode === "all"} onChange={() => setAdjustmentMode("all")} />
          <RadioRow label="Deposit-Based Proportional Bonus Deduction" name="adjustment" value="deposit-proportional" checked={adjustmentMode === "deposit-proportional"} onChange={() => setAdjustmentMode("deposit-proportional")} />
          <RadioRow label="Current Balance Proportional Bonus Deduction" name="adjustment" value="balance-proportional" checked={adjustmentMode === "balance-proportional"} onChange={() => setAdjustmentMode("balance-proportional")} />
          <RadioRow label="None" name="adjustment" value="none" checked={adjustmentMode === "none"} onChange={() => setAdjustmentMode("none")} />
        </div>

        <div className="mt-4 space-y-4 max-w-[400px]">
          <div>
            <span className="block font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] font-semibold mb-2">
              Withdrawal Exclude Comment
            </span>
            <CommentList
              items={withdrawExclude}
              onRemove={(i) => setWithdrawExclude((p) => p.filter((_, j) => j !== i))}
              newValue={newWithdraw}
              onNewChange={setNewWithdraw}
              onAdd={() => { if (newWithdraw.trim()) { setWithdrawExclude((p) => [...p, newWithdraw.trim()]); setNewWithdraw(""); } }}
            />
          </div>
          <div>
            <span className="block font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] font-semibold mb-2">
              Deposit Exclude Comment
            </span>
            <CommentList
              items={depositExclude}
              onRemove={(i) => setDepositExclude((p) => p.filter((_, j) => j !== i))}
              newValue={newDeposit}
              onNewChange={setNewDeposit}
              onAdd={() => { if (newDeposit.trim()) { setDepositExclude((p) => [...p, newDeposit.trim()]); setNewDeposit(""); } }}
            />
          </div>
        </div>

        <div className="pt-3">
          <button className="px-4 py-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors">
            Save
          </button>
        </div>
      </div>

      {/* Section 4 — Account Removal */}
      <div className="px-5 py-4 border-b border-[var(--border-default)]">
        <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] font-semibold mb-3">
          Account Removal
        </h6>
        <div className="space-y-1 max-w-[560px]">
          <RadioRow label="Historical bonus transactions will be deleted when account is removed from bonus campaign." name="accountRemoval" value="delete" checked={accountRemoval === "delete"} onChange={() => setAccountRemoval("delete")} />
          <RadioRow label="Historical bonus transactions will be retained indefinitely even when account is removed." name="accountRemoval" value="retain" checked={accountRemoval === "retain"} onChange={() => setAccountRemoval("retain")} />
        </div>
        <div className="pt-3">
          <button className="px-4 py-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors">
            Save
          </button>
        </div>
      </div>

      {/* Section 5 — Bonus Comments */}
      <div className="px-5 py-4">
        <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] font-semibold mb-1">
          Bonus Comments
        </h6>
        <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-3">
          Customize your comments for each bonus related balance transaction.
        </p>
        <div className="space-y-3 max-w-[480px]">
          {[
            { label: "Bonus Removal", value: bonusRemoval, onChange: setBonusRemoval },
            { label: "Negative Balance", value: negBalComment, onChange: setNegBalComment },
            { label: "Withdrawal", value: withdrawalComment, onChange: setWithdrawalComment },
            { label: "Stopout", value: stopoutComment, onChange: setStopoutComment },
            { label: "De-Allocate Client", value: deallocateComment, onChange: setDeallocateComment },
            { label: "Cashback", value: cashbackComment, onChange: setCashbackComment },
          ].map(({ label, value, onChange }) => (
            <InputField key={label} label={label} value={value} onChange={(e) => onChange(e.target.value)} />
          ))}
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

/* ── Bonus Synchronization ── */
export function BonusSyncPanel() {
  const [campaign, setCampaign] = useState("Welcome Bonus");
  const [syncing, setSyncing] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden">
      <div className="px-5 py-4">
        <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-4">
          Synchronize the campaigns with the Bonus application to accommodate any changes on either end in case any issue is encountered when adding new profiles.
        </p>
        <div className="space-y-3 max-w-[480px]">
          <InputField as="select" label="Campaigns" value={campaign} onChange={(e) => setCampaign(e.target.value)}>
            <option>Welcome Bonus</option>
            <option>Deposit Match 50%</option>
            <option>Loyalty Cashback</option>
            <option>VIP Bonus</option>
          </InputField>
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