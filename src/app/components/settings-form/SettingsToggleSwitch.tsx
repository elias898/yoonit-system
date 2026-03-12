import { useState } from "react";

interface SettingsToggleSwitchProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function SettingsToggleSwitch({
  label,
  description,
  checked: initialChecked,
  onChange,
  className = "",
}: SettingsToggleSwitchProps) {
  const [checked, setChecked] = useState(initialChecked);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      <div className="flex flex-col">
        <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
          {label}
        </span>
        {description && (
          <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)] mt-0.5">
            {description}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={toggle}
        className={`flex items-center w-9 h-5 p-[2px] rounded-[16px] transition-colors shrink-0 cursor-pointer ${
          checked ? "bg-[var(--indigo-9)]" : "bg-[var(--slate-5)]"
        }`}
      >
        <div
          className={`h-full aspect-square rounded-full bg-[var(--slate-1)] shadow-sm transition-transform ${
            checked ? "translate-x-[16px]" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}