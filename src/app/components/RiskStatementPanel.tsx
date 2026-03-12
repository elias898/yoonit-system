import { useState } from "react";

export function RiskStatementPanel() {
  const [hasChanges, setHasChanges] = useState(false);
  const [riskText, setRiskText] = useState(
    "Past performance is not indicative of future results. Copy trading involves significant risk of loss. You should not invest money that you cannot afford to lose. Please ensure you fully understand the risks involved before proceeding."
  );

  return (
    <div className="py-8 px-5 flex">
      <div className="w-full max-w-[640px] flex flex-col gap-5">
        {/* Description */}
        

        {/* Risk Statement Reminder */}
        <div className="flex flex-col gap-1.5">
          <label
            className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] tracking-[0.2px]"
            style={{ fontWeight: 600 }}
          >
            Risk Statement Reminder
          </label>
          <textarea
            value={riskText}
            onChange={(e) => {
              setRiskText(e.target.value);
              setHasChanges(true);
            }}
            rows={5}
            className="w-full border border-[var(--border-default)] rounded-lg px-3 py-2.5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] bg-[var(--bg-surface)] resize-y outline-none focus:border-[var(--accent-line)] transition-colors leading-[1.6]"
            placeholder="Enter risk statement text..."
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-1">
          <button
            className={`px-5 py-2 bg-[var(--accent-solid)] text-[color:var(--text-on-accent)] font-['Inter',sans-serif] text-[length:var(--text-sm)] rounded-lg hover:bg-[var(--accent-solid-hover)] transition-all ${
              hasChanges ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{ fontWeight: 600 }}
            onClick={() => setHasChanges(false)}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}