import { useState, type ReactNode } from "react";
import { Users, Database, type LucideIcon } from "lucide-react";

export function SubMenuItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon?: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
        active
          ? "bg-[var(--bg-hover)] text-[var(--indigo-12)]"
          : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] rounded-r-full bg-[var(--indigo-9)]" />
      )}
      {Icon && <Icon size={18} className={active ? "text-[var(--indigo-12)]" : ""} />}
      <span className="font-['Inter',sans-serif] font-medium text-[length:var(--text-body)] tracking-[-0.28px]">
        {label}
      </span>
    </button>
  );
}

export function SubSidebar({ onClose }: { onClose?: () => void }) {
  const [activeItem, setActiveItem] = useState("all");

  return (
    <div className="relative flex flex-col w-[240px] h-full bg-[var(--bg-subtle)] rounded-2xl shrink-0 group/sidebar mr-2">
      {/* Collapse handle on right edge */}
      <button
        onClick={onClose}
        className="absolute right-[6px] top-0 bottom-0 w-[12px] z-10 flex items-center justify-center opacity-0 group-hover/sidebar:opacity-100 transition-opacity cursor-pointer"
      >
        <div className="w-[3px] h-[16px] bg-[var(--resize-handle)] rounded-[50px] hover:bg-[var(--resize-handle-hover)] transition-colors" />
      </button>

      {/* Title */}
      <div className="px-4 pt-4 pb-3">
        <h4 className="text-[length:var(--text-h4)] text-[color:var(--text-primary)] tracking-[0.36px] text-[#1c2024cc] text-[18px]">
          Clients
        </h4>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-1 px-3">
        <SubMenuItem
          icon={Users}
          label="All Clients"
          active={activeItem === "all"}
          onClick={() => setActiveItem("all")}
        />
        <SubMenuItem
          icon={Database}
          label="Segments"
          active={activeItem === "segments"}
          onClick={() => setActiveItem("segments")}
        />
      </div>
    </div>
  );
}