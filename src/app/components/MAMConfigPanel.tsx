import { useState } from "react";
import { RefreshCw, Check } from "lucide-react";
import { InputField } from "./InputField";

/* ── MAM Configuration ── */
export function MAMConfigPanel() {
  const [server, setServer] = useState("MT5-Live-01");
  const [userComment, setUserComment] = useState(true);
  const [mamComment, setMamComment] = useState("MAM_{MasterLogin}");
  const [pfMethod, setPfMethod] = useState("Equity");
  const [floatingPnl, setFloatingPnl] = useState(true);

  return (
    <div className="rounded-xl overflow-hidden">
      {/* Section 1 — MAM Display */}
      <div className="px-5 py-4">
        <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] font-semibold mb-1">
          MAM Display
        </h6>
        <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-4">
          Specify the Master Account Login in the comment field on the MT Server across all investor accounts for better traceability.
        </p>

        <div className="space-y-3 max-w-[480px]">
          <InputField as="select" label="Server" value={server} onChange={(e) => setServer(e.target.value)}>
            <option>MT5-Live-01</option>
            <option>MT5-Live-02</option>
            <option>MT4-Live</option>
          </InputField>

          <div className="flex items-center gap-3">
            <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] w-[200px]">User Comment</span>
            <button
              type="button"
              onClick={() => setUserComment(!userComment)}
              className={`flex items-center w-9 h-5 p-[2px] rounded-[16px] transition-colors shrink-0 cursor-pointer ${
                userComment ? "bg-[var(--indigo-9)]" : "bg-[var(--slate-5)]"
              }`}
            >
              <div
                className={`h-full aspect-square rounded-full bg-[var(--slate-1)] shadow-sm transition-transform ${
                  userComment ? "translate-x-[16px]" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <InputField label="MAM Comment" value={mamComment} onChange={(e) => setMamComment(e.target.value)} />

          <div className="pt-1">
            <button className="px-4 py-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Section 2 — PF Parameters */}
      <div className="px-5 py-4">
        <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] font-semibold mb-1">
          PF Parameters
        </h6>
        <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-4">
          Decide how the performance fee is calculated based on account Equity or Balance.
        </p>

        <div className="space-y-3 max-w-[480px]">
          <InputField as="select" label="PF Calculation Method" value={pfMethod} onChange={(e) => setPfMethod(e.target.value)}>
            <option>Equity</option>
            <option>Balance</option>
          </InputField>

          <div className="flex items-center gap-3">
            <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] w-[200px]">Floating PNL</span>
            <button
              type="button"
              onClick={() => setFloatingPnl(!floatingPnl)}
              className={`flex items-center w-9 h-5 p-[2px] rounded-[16px] transition-colors shrink-0 cursor-pointer ${
                floatingPnl ? "bg-[var(--indigo-9)]" : "bg-[var(--slate-5)]"
              }`}
            >
              <div
                className={`h-full aspect-square rounded-full bg-[var(--slate-1)] shadow-sm transition-transform ${
                  floatingPnl ? "translate-x-[16px]" : "translate-x-0"
                }`}
              />
            </button>
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

/* ── MAM Synchronization ── */
export function MAMSyncPanel() {
  const [server, setServer] = useState("MT5-Live-01");
  const [syncType, setSyncType] = useState("Profiles");
  const [syncing, setSyncing] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden">
      <div className="px-5 py-4">
        <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-4">
          Synchronize the MAM Portal
        </p>

        <div className="space-y-3 max-w-[480px]">
          <InputField as="select" label="Server" value={server} onChange={(e) => setServer(e.target.value)}>
            <option>MT5-Live-01</option>
            <option>MT5-Live-02</option>
            <option>MT4-Live</option>
          </InputField>

          <InputField as="select" label="Synchronize" value={syncType} onChange={(e) => setSyncType(e.target.value)}>
            <option>Profiles</option>
            <option>Accounts</option>
            <option>Allocations</option>
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