interface SettingsFormFieldProps {
  label: string;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsFormField({ label, optional, hint, children, className = "" }: SettingsFormFieldProps) {
  return (
    <div className={`flex flex-col gap-[6px] ${className}`}>
      <div className="flex items-center gap-1 leading-[1.3]">
        <label
          className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]"
          style={{ fontWeight: 600 }}
        >
          {label}
        </label>
        {optional && (
          <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)]">
            (optional)
          </span>
        )}
      </div>
      {children}
      {hint && (
        <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] leading-[1.3]">
          {hint}
        </p>
      )}
    </div>
  );
}
