import { InputHTMLAttributes } from "react";

interface SettingsInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function SettingsInput({ className = "", ...props }: SettingsInputProps) {
  return (
    <input
      {...props}
      className={`w-full h-[44px] px-4 rounded-lg border border-[var(--border-default)] bg-[var(--bg-raised)] font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] outline-none focus:border-[var(--indigo-7)] transition-colors placeholder:text-[var(--text-muted)] ${className}`}
    />
  );
}
