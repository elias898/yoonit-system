import { useState } from "react";
import { SettingsMultiSelect } from "./settings-form/SettingsMultiSelect";
import { SettingsRadioGroup } from "./settings-form/SettingsRadioGroup";
import { InputField } from "./InputField";
import { SettingsToggleSwitch } from "./settings-form/SettingsToggleSwitch";

export function CopyTradeConfigPanel() {
  const [hasChanges, setHasChanges] = useState(false);
  const markChanged = () => setHasChanges(true);

  return (
    <div className="py-8 px-5">
      <div className="w-full flex flex-col gap-10">
        {/* Section: General Settings */}
        <div>
          <h5 className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-1" style={{ fontWeight: 600 }}>
            General Settings
          </h5>
          <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
            Configure fee schedules, copy modes, and trade visibility for this module.
          </p>
          <div className="h-px bg-[var(--border-subtle)] mt-4 mb-5" />
          <div className="flex flex-col gap-5">
            <SettingsMultiSelect
              label="Fee Schedule Permitted"
              selected={["Performance Fee"]}
              options={["Performance Fee", "Management Fee", "Subscription Fee", "Zero Fee"]}
              onChange={markChanged}
            />
            <SettingsMultiSelect
              label="Copy Mode Permitted"
              selected={["Volume Multiplier", "Fixed Volume"]}
              options={["Volume Multiplier", "Fixed Volume", "Equity Proportion", "Mirror"]}
              onChange={markChanged}
            />
            <InputField as="select" label="Trade Visibility" defaultValue="All Positions" onChange={markChanged}>
              <option value="All Positions">All Positions</option>
              <option value="Open Positions Only">Open Positions Only</option>
              <option value="Closed Positions Only">Closed Positions Only</option>
              <option value="None">None</option>
            </InputField>
            <SettingsToggleSwitch
              label="Allow Copying From Provider Account"
              description="Enable followers to copy trades directly from this provider account"
              checked={false}
              onChange={markChanged}
            />
          </div>
        </div>

        {/* Section: Numeric Limits */}
        <div>
          <h5 className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-1" style={{ fontWeight: 600 }}>
            Numeric Limits
          </h5>
          <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
            Set maximum values and thresholds for strategies, volumes, and provider limits.
          </p>
          <div className="h-px bg-[var(--border-subtle)] mt-4 mb-5" />
          <div className="grid grid-cols-2 gap-x-5 gap-y-4">
            <InputField label="Minimum Balance Provider USD" type="number" defaultValue={0} min={0} onChange={markChanged} />
            <InputField label="Maximum Number Of Strategies" type="number" defaultValue={20} min={0} onChange={markChanged} />
            <InputField label="Maximum Multiplier Value" type="number" defaultValue={1000} min={0} onChange={markChanged} />
            <InputField label="Maximum Fixed Volume" type="number" defaultValue={1000} min={0} onChange={markChanged} />
            <InputField label="Maximum Equity Proportion" type="number" defaultValue={1000} min={0} onChange={markChanged} />
            <InputField label="Maximum Providers To Copy" type="number" defaultValue={10} min={0} onChange={markChanged} />
            <InputField label="Maximum Offer PF" type="number" defaultValue={35} min={0} onChange={markChanged} />
          </div>
        </div>

        {/* Section: Symbol Handling */}
        <div>
          <h5 className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-1" style={{ fontWeight: 600 }}>
            Symbol Handling
          </h5>
          <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
            Control how symbols and contract sizes are handled during copy trading.
          </p>
          <div className="h-px bg-[var(--border-subtle)] mt-4 mb-5" />
          <div className="flex flex-col gap-5">
            <SettingsToggleSwitch
              label="Check Symbol Session / Track Symbol Session"
              description="Tie copy trading to trading sessions of each symbol"
              checked={false}
              onChange={markChanged}
            />
            <SettingsToggleSwitch
              label="Symbol Contract Size Lot Adjustment / Ignore Contract Size Ratio"
              description="Control whether copied trade volumes are adjusted for contract-size differences"
              checked={false}
              onChange={markChanged}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
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