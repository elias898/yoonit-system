import { useState } from "react";
import { RefreshCw, Check } from "lucide-react";
import { InputField } from "./InputField";

export function DynamicMarginPanel() {
  const [server, setServer] = useState("MT5-Live-01");
  const [profile, setProfile] = useState("Default DM Profile");
  const [syncing, setSyncing] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden">
      <div className="px-5 py-4">
        <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-4">
          Recalculate and adjust the margin of logins with open positions prior to the configuration based on the respective DM Profile.
        </p>

        <div className="space-y-3 max-w-[480px]">
          <InputField as="select" label="Server" value={server} onChange={(e) => setServer(e.target.value)}>
            <option>MT5-Live-01</option>
            <option>MT5-Live-02</option>
            <option>MT4-Live</option>
          </InputField>

          <InputField as="select" label="DM Profile" value={profile} onChange={(e) => setProfile(e.target.value)}>
            <option>Default DM Profile</option>
            <option>High Risk Profile</option>
            <option>Low Risk Profile</option>
            <option>VIP Profile</option>
          </InputField>

          <div className="px-3 py-2.5 bg-[var(--slate-2)] rounded-lg">
            <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
              This action will recalculate margins for all open positions under the selected server and profile. Ensure market conditions are stable before proceeding.
            </p>
          </div>

          <div className="pt-1">
            <button
              onClick={() => { setSyncing(true); setTimeout(() => setSyncing(false), 1500); }}
              className="h-8 px-4 flex items-center gap-2 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors"
            >
              {syncing ? <><Check size={14} /> Adjustment Complete</> : <><RefreshCw size={14} /> Adjust Margin</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}