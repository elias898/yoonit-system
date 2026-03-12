import type { ElementType } from "react";
import { ChevronRight } from "lucide-react";

interface SettingRowHeaderProps {
  label: string;
  description: string;
  icon: ElementType;
  isExpanded: boolean;
  onToggle: () => void;
}

export function SettingRowHeader({
  label,
  description,
  icon: Icon,
  isExpanded,
  onToggle,
}: SettingRowHeaderProps) {
  return (
    <div
      onClick={onToggle}
      className="px-6 py-5 flex items-start gap-4 hover:bg-[var(--accent-bg-hover)] transition-colors cursor-pointer"
    >
      <div className="size-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-[var(--bg-muted)]">
        <Icon size={18} className="text-[color:var(--text-secondary)]" />
      </div>
      <div className="flex-1 min-w-0">
        <h4
          className="font-['Public_Sans',sans-serif] text-[length:var(--text-h4)] text-[color:var(--text-primary)]"
          style={{ fontWeight: 600 }}
        >
          {label}
        </h4>
        <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mt-0.5 max-w-[75ch]">
          {description}
        </p>
      </div>
      
    </div>
  );
}