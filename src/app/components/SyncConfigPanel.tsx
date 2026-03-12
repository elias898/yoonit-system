import { useState } from "react";
import { SettingsRadioGroup } from "./settings-form/SettingsRadioGroup";
import { InputField } from "./InputField";

export function SyncConfigPanel() {
  const [walletSync, setWalletSync] = useState("Yes");
  const [syncInterval, setSyncInterval] = useState("Per 12 Hours");
  const [server, setServer] = useState("Server - MT4");
  const [syncType, setSyncType] = useState("Groups");
  const [syncing, setSyncing] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  function handleSync(section: string) {
    setSyncing(section);
    setTimeout(() => setSyncing(null), 1500);
  }

  const m = () => setHasChanges(true);

  return (
    <div className="py-8 px-5">
      <div className="w-full max-w-[640px] flex flex-col gap-10">
        {/* Section: Wallet Synchronization */}
        <div>
          <h5
            className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-1"
            style={{ fontWeight: 600 }}
          >
            Wallet Synchronization
          </h5>
          <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] max-w-[75ch]">
            Set a regular interval at which the system is synchronized with the MT Server.
          </p>
          <div className="h-px bg-[var(--border-subtle)] mt-4 mb-5" />
          <div className="flex flex-col gap-5">
            <SettingsRadioGroup
              label="Synchronize Wallet to MT Account"
              value={walletSync}
              options={["Yes", "No"]}
              onChange={(v) => { setWalletSync(v); m(); }}
            />
            <InputField
              as="select"
              label="Synchronization Interval"
              value={syncInterval}
              onChange={(e) => { setSyncInterval(e.target.value); m(); }}
            >
              <option value="Per Hour">Per Hour</option>
              <option value="Per 6 Hours">Per 6 Hours</option>
              <option value="Per 12 Hours">Per 12 Hours</option>
              <option value="Per Day">Per Day</option>
            </InputField>
            <div className="pt-1">
              <button
                onClick={() => handleSync("wallet")}
                className={`h-9 px-5 flex items-center gap-2 rounded-lg font-['Inter',sans-serif] text-[length:var(--text-sm)] cursor-pointer transition-colors ${
                  syncing === "wallet"
                    ? "bg-emerald-600 text-white"
                    : "bg-[var(--accent-solid)] text-white hover:bg-[var(--accent-solid-hover)]"
                }`}
                style={{ fontWeight: 600 }}
              >
                {syncing === "wallet" ? "Synchronized" : "Synchronize"}
              </button>
            </div>
          </div>
        </div>

        {/* Section: Server Synchronization */}
        <div>
          <h5
            className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-1"
            style={{ fontWeight: 600 }}
          >
            Server Synchronization
          </h5>
          <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] max-w-[75ch]">
            Synchronize at any point in time with the MT Server by clicking the Synchronize button.
          </p>
          <div className="h-px bg-[var(--border-subtle)] mt-4 mb-5" />
          <div className="flex flex-col gap-5">
            <InputField
              as="select"
              label="Server"
              value={server}
              onChange={(e) => { setServer(e.target.value); m(); }}
            >
              <option value="Server - MT4">Server - MT4</option>
              <option value="Demo - MT5">Demo - MT5</option>
              <option value="Trade - MT4">Trade - MT4</option>
              <option value="demo:chsandbox2 - CTrader">demo:chsandbox2 - CTrader</option>
            </InputField>
            <InputField
              as="select"
              label="Synchronize"
              value={syncType}
              onChange={(e) => { setSyncType(e.target.value); m(); }}
            >
              <option value="Groups">Groups</option>
              <option value="Security Symbols">Security Symbols</option>
              <option value="Account Type">Account Type</option>
              <option value="Holidays">Holidays</option>
            </InputField>
            <div className="pt-1">
              <button
                onClick={() => handleSync("server")}
                className={`h-9 px-5 flex items-center gap-2 rounded-lg font-['Inter',sans-serif] text-[length:var(--text-sm)] cursor-pointer transition-colors ${
                  syncing === "server"
                    ? "bg-emerald-600 text-white"
                    : "bg-[var(--accent-solid)] text-white hover:bg-[var(--accent-solid-hover)]"
                }`}
                style={{ fontWeight: 600 }}
              >
                {syncing === "server" ? "Synchronized" : "Synchronize"}
              </button>
            </div>
          </div>
        </div>

        {/* Save */}
        
      </div>
    </div>
  );
}
