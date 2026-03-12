import { useState } from "react";
import { SettingsFormField } from "./SettingsFormField";

interface SettingsRadioGroupProps {
  label: string;
  value: string;
  options: string[];
  onChange?: (value: string) => void;
  className?: string;
}

export function SettingsRadioGroup({
  label,
  value: initialValue,
  options,
  onChange,
  className = "",
}: SettingsRadioGroupProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (opt: string) => {
    setValue(opt);
    onChange?.(opt);
  };

  return (
    <SettingsFormField label={label} className={className}>
      {options.length === 2 && options[0] === "Yes" && options[1] === "No" ? (
        <button
          type="button"
          onClick={() => handleChange(value === "Yes" ? "No" : "Yes")}
          className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer ${
            value === "Yes" ? "bg-[var(--accent-solid)]" : "bg-[var(--slate-5)]"
          }`}
        >
          <div
            className={`absolute top-[3px] w-3.5 h-3.5 rounded-full bg-white shadow transition-transform ${
              value === "Yes" ? "translate-x-[18px]" : "translate-x-[3px]"
            }`}
          />
        </button>
      ) : (
        <div className="flex items-center gap-4">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => handleChange(opt)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div
                className={`size-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  value === opt ? "border-[var(--accent-solid)]" : "border-[var(--border-strong)]"
                }`}
              >
                {value === opt && <div className="size-2 rounded-full bg-[var(--accent-solid)]" />}
              </div>
              <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">{opt}</span>
            </button>
          ))}
        </div>
      )}
    </SettingsFormField>
  );
}