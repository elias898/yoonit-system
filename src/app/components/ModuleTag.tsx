/**
 * ModuleTag — Figma-matched module badge with a colored vertical accent bar.
 *
 * Colour accent mapping (one unique colour per module):
 *   CRM            → #3e63dd  (indigo)
 *   CopyTrade      → #f78d1d  (orange)
 *   Partners       → #30a46c  (green)       — was "IB"
 *   Bonus          → #e5484d  (red)         — was "B"
 *   Dynamic Margin → #8b5cf6  (purple)      — was "DM"
 *   MAM            → #0d9488  (teal)
 *   TradeSelect    → #d97706  (amber)
 */

export type ModuleId =
  | "CRM"
  | "CopyTrade"
  | "Partners"
  | "Bonus"
  | "Dynamic Margin"
  | "MAM"
  | "TradeSelect";

/** Accent colour per module */
const moduleAccent: Record<ModuleId, string> = {
  CRM: "#3e63dd",
  CopyTrade: "#f78d1d",
  Partners: "#30a46c",
  Bonus: "#e5484d",
  "Dynamic Margin": "#8b5cf6",
  MAM: "#0d9488",
  TradeSelect: "#d97706",
};

interface ModuleTagProps {
  module: ModuleId;
}

export function ModuleTag({ module }: ModuleTagProps) {
  const accent = moduleAccent[module];

  return (
    <div className="inline-flex items-center h-6 min-w-[60px] rounded-[6px] bg-[var(--slate-1)] border border-[var(--slate-7)] relative">
      {/* Content */}
      <div className="flex items-center gap-1 px-2 h-full">
        {/* Colour accent bar */}
        <div
          className="w-1 h-3 rounded-[50px] shrink-0"
          style={{ backgroundColor: accent }}
        />
        {/* Label */}
        <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:#171717] tracking-[-0.07px] whitespace-nowrap leading-[1.3]">
          {module}
        </span>
      </div>
    </div>
  );
}