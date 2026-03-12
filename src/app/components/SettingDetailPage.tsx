import { ArrowLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface SettingDetailPageProps {
  label: string;
  description: string;
  icon: ElementType;
  onBack: () => void;
  children: React.ReactNode;
}

export function SettingDetailPage({
  label,
  description,
  icon: Icon,
  onBack,
  children,
}: SettingDetailPageProps) {
  const handleSave = () => {
    toast.success(`${label} saved`, {
      description: "Your changes have been saved successfully.",
      position: "top-right",
    });
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--bg-surface)]">
      {/* Top bar — back button only, left-aligned */}
      <div className="flex items-center px-6 h-[52px] border-b border-[var(--border-subtle)] shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          <span className="font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)]">
            Back
          </span>
        </button>
      </div>

      {/* Page heading */}
      <div className="px-8 pt-6 pb-4 border-b border-[var(--border-subtle)] shrink-0">
        <div className="flex flex-col gap-1">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1">
            <button
              onClick={onBack}
              className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--indigo-11)] hover:text-[color:var(--indigo-12)] transition-colors cursor-pointer text-[12px]"
            >
              Settings
            </button>
            <ChevronRight size={11} className="text-[color:var(--text-muted)] shrink-0" />
            <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)] text-[12px]">
              {label}
            </span>
          </div>
          {/* Icon + Page title */}
          <div className="flex items-center gap-3 mt-1">
            <div className="size-8 rounded-lg bg-[var(--bg-muted)] flex items-center justify-center shrink-0">
              <Icon size={16} className="text-[color:var(--text-secondary)]" />
            </div>
            <h3
              className="font-['Public_Sans',sans-serif] text-[color:var(--text-primary)] tracking-[-0.18px]"
              style={{ fontWeight: 600 }}
            >
              {label}
            </h3>
          </div>
        </div>
        <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] max-w-[75ch] pl-11">
          {description}
        </p>
      </div>

      {/* Scrollable panel content */}
      <div className="flex-1 min-h-0 overflow-y-auto overlay-scrollbar">
        <div className="px-8 py-6">{children}</div>
      </div>

      {/* Footer save bar */}
      <div className="shrink-0 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] px-6 py-3 flex items-center justify-end gap-3">
        <button
          onClick={onBack}
          className="h-8 px-4 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="h-8 px-4 rounded-lg bg-[var(--accent-solid)] font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)] text-[color:var(--text-on-accent)] hover:opacity-90 transition-opacity cursor-pointer"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}