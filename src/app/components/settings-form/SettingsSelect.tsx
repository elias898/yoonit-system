import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SettingsFormField } from "./SettingsFormField";

interface SettingsSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange?: (value: string) => void;
  className?: string;
}

export function SettingsSelect({
  label,
  value: initialValue,
  options,
  onChange,
  className = "",
}: SettingsSelectProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <SettingsFormField label={label} className={className}>
      <div className="relative">
        <select
          value={value}
          onChange={handleChange}
          className="w-full h-[44px] px-4 pr-10 rounded-lg border border-[var(--border-default)] bg-[var(--bg-raised)] font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] outline-none focus:border-[var(--indigo-7)] transition-colors appearance-none cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none" />
      </div>
    </SettingsFormField>
  );
}
