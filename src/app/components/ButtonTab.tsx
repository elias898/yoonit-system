interface ButtonTabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function ButtonTab({ label, isActive, onClick }: ButtonTabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1.5 rounded-md font-['Inter',sans-serif] text-[length:var(--text-base)] transition-colors ${
        isActive
          ? "bg-[var(--accent-bg)] text-[color:var(--indigo-12)]"
          : "text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)]"
      }`}
      style={{ fontWeight: 600 }}
    >
      {label}
    </button>
  );
}