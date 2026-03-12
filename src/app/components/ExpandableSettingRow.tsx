import { Search, Download, Plus, ChevronRight } from "lucide-react";
import { SettingRowHeader } from "./SettingRowHeader";
import { useRef, useEffect } from "react";

interface ExpandableSettingRowProps {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  data?: { columns: string[]; rows: string[][] };
  children?: React.ReactNode;
  itemName?: string;
  subLinks?: { label: string; description?: string; icon?: React.ElementType; onNavigate: () => void }[];
}

export function ExpandableSettingRow({
  id,
  label,
  description,
  icon,
  isExpanded,
  onToggle,
  data,
  children,
  itemName,
  subLinks,
}: ExpandableSettingRowProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      // Small delay to let the DOM render expanded content
      requestAnimationFrame(() => {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
  }, [isExpanded]);

  return (
    <>
      <SettingRowHeader
        label={label}
        description={description}
        icon={icon}
        isExpanded={isExpanded}
        onToggle={() => onToggle(id)}
      />

      {/* Sub-links */}
      {subLinks && subLinks.length > 0 && (
        <div className="px-6 -mt-2 mb-1">
          {subLinks.map((link) => {
            const LinkIcon = link.icon;
            return (
              <button
                key={link.label}
                onClick={link.onNavigate}
                className="w-full flex items-center gap-3 pl-[52px] pr-4 py-2.5 rounded-lg text-left hover:bg-[var(--accent-bg-hover)] transition-colors cursor-pointer group"
              >
                {LinkIcon && (
                  <div className="size-7 rounded-md flex items-center justify-center shrink-0 bg-[var(--bg-muted)]">
                    <LinkIcon size={14} className="text-[color:var(--text-secondary)]" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <span className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
                    {link.label}
                  </span>
                  {link.description && (
                    <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mt-0.5">
                      {link.description}
                    </p>
                  )}
                </div>
                <ChevronRight size={14} className="shrink-0 text-[color:var(--accent-text)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      )}

      {/* Expanded content */}
      {isExpanded && (
        <div ref={contentRef} className="px-6 pb-5">
          {children ? (
            <div>
              {children}
            </div>
          ) : data ? (
            <div className="border border-[var(--border-default)] rounded-xl overflow-hidden">
              {/* Search bar inside container */}
              <div className="px-4 py-2.5 bg-[var(--bg-subtle)] border-b border-[var(--border-default)] flex items-center justify-between">
                <div className="flex items-center bg-[var(--slate-3)] border border-transparent rounded-lg h-7 w-[200px] px-2 gap-2">
                  <Search size={13} className="text-[var(--text-muted)] shrink-0" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 bg-transparent text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-['Inter',sans-serif] outline-none placeholder:text-[var(--text-muted)]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)]">
                    {data.rows.length} {data.rows.length === 1 ? "item" : "items"}
                  </span>
                  <button
                    className="h-7 px-2.5 flex items-center gap-1.5 rounded-md border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
                  >
                    <Download size={12} />
                    Export
                  </button>
                  <button
                    className="h-7 px-2.5 flex items-center gap-1.5 bg-[var(--accent-solid)] text-[color:var(--text-on-accent)] font-['Inter',sans-serif] text-[length:var(--text-xs)] rounded-md hover:bg-[var(--accent-solid-hover)] transition-colors cursor-pointer"
                    style={{ fontWeight: 600 }}
                  >
                    <Plus size={12} />
                    Add new {itemName || "Item"}
                  </button>
                </div>
              </div>
              {/* Table */}
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--slate-3)] border-b border-[var(--border-subtle)]">
                    {data.columns.map((col) => (
                      <th
                        key={col}
                        className="text-left px-4 py-2 font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)] tracking-[0.2px] bg-[var(--bg-subtle)]"
                        style={{ fontWeight: 600 }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--accent-bg-subtle)] transition-colors cursor-pointer"
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className="px-4 py-2.5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}