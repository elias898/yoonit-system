import { useState } from "react";
import type { LucideIcon } from "lucide-react";

interface NavIconButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function NavIconButton({ icon: Icon, label, isActive, onClick }: NavIconButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={onClick}
        aria-label={label}
        aria-current={isActive ? "page" : undefined}
        className={`size-9 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
          isActive
            ? "bg-[var(--slate-12)] text-[var(--slate-2)]"
            : "text-[var(--slate-12)] hover:bg-[var(--slate-5)]"
        }`}
      >
        <Icon size={20} />
      </button>

      {hovered && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 rounded-lg bg-[var(--slate-12)] text-[var(--slate-2)] font-['Inter',sans-serif] text-[length:var(--text-sm)] whitespace-nowrap z-50 pointer-events-none shadow-md">
          {label}
        </div>
      )}
    </div>
  );
}