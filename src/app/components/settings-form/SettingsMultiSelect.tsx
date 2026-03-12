import { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

interface SettingsMultiSelectProps {
  label: string;
  selected: string[];
  options: string[];
  onChange?: (selected: string[]) => void;
  className?: string;
}

export function SettingsMultiSelect({
  label,
  selected: initialSelected,
  options,
  onChange,
  className = "",
}: SettingsMultiSelectProps) {
  const [selected, setSelected] = useState(initialSelected);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleOption = (opt: string) => {
    const next = selected.includes(opt)
      ? selected.filter((s) => s !== opt)
      : [...selected, opt];
    setSelected(next);
    onChange?.(next);
  };

  const removeTag = (opt: string) => {
    const next = selected.filter((s) => s !== opt);
    setSelected(next);
    onChange?.(next);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={className} ref={wrapperRef}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-full min-h-[56px] px-4 pt-7 pb-2 pr-10 rounded-lg border bg-[var(--bg-raised)] flex items-center flex-wrap gap-1 cursor-pointer transition-colors text-left ${
            isOpen
              ? "border-[var(--indigo-7)]"
              : "border-[var(--border-default)] hover:border-[var(--border-strong)]"
          }`}
        >
          {selected.length === 0 && (
            <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-muted)]">
              Select...
            </span>
          )}
          {selected.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[var(--accent-bg)] text-[color:var(--indigo-11)] rounded font-['Inter',sans-serif] text-[length:var(--text-xs)]"
              style={{ fontWeight: 600 }}
            >
              {tag}
              <X
                size={10}
                className="cursor-pointer hover:text-[var(--danger)]"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
              />
            </span>
          ))}
          <ChevronDown
            size={16}
            className={`absolute right-3 top-1/2 -translate-y-1/2 shrink-0 text-[var(--text-secondary)] transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Floating label */}
        <span className="absolute left-4 top-3.5 font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] pointer-events-none z-10">
          {label}
        </span>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg shadow-lg z-50 py-1 max-h-[200px] overflow-y-auto">
            {options.map((opt) => {
              const isSelected = selected.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleOption(opt)}
                  className={`w-full text-left px-3 py-2 font-['Inter',sans-serif] text-[length:var(--text-sm)] transition-colors cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-[var(--accent-solid)] border-[var(--accent-solid)]"
                        : "border-[var(--border-strong)] bg-transparent"
                    }`}
                  >
                    {isSelected && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}