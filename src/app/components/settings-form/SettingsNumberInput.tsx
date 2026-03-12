import { useState } from "react";
import { SettingsFormField } from "./SettingsFormField";
import { SettingsInput } from "./SettingsInput";

interface SettingsNumberInputProps {
  label: string;
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function SettingsNumberInput({
  label,
  value: initialValue,
  onChange,
  min,
  max,
  className = "",
}: SettingsNumberInputProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    setValue(num);
    onChange?.(num);
  };

  return (
    <SettingsFormField label={label} className={className}>
      <SettingsInput
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
      />
    </SettingsFormField>
  );
}