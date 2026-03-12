import { useState, useRef, useEffect } from "react";
import { Search, Plus, MoreVertical, RotateCw, Download, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

type MappingRow = {
  id: string;
  configuration: string;
  group: string;
  symbol: string;
  securities: string;
  prefix: string;
  suffix: string;
  server: string;
};

const initialMappings: MappingRow[] = [
  {
    id: "1",
    configuration: "test",
    group: "*",
    symbol: "-",
    securities: "Forex, CFD-Energies, Index, Metals",
    prefix: ".pro",
    suffix: "",
    server: "Demo - MT5",
  },
  {
    id: "2",
    configuration: "ecn-mapping",
    group: "ECN",
    symbol: "-",
    securities: "Forex",
    prefix: "",
    suffix: ".ecn",
    server: "Live - MT5",
  },
  {
    id: "3",
    configuration: "crypto-std",
    group: "*",
    symbol: "-",
    securities: "Crypto",
    prefix: "",
    suffix: ".c",
    server: "Live - MT5",
  },
];

const servers = ["All", "Demo - MT5", "Live - MT5", "Live - MT4"];

const columns: { key: keyof MappingRow; label: string }[] = [
  { key: "configuration", label: "Configuration" },
  { key: "group", label: "Group" },
  { key: "symbol", label: "Symbol" },
  { key: "securities", label: "Securities" },
  { key: "prefix", label: "Prefix" },
  { key: "suffix", label: "Suffix" },
  { key: "server", label: "Server" },
];

export function SymbolsMappingPanel() {
  const [mappings, setMappings] = useState<MappingRow[]>(initialMappings);
  const [mappingSearch, setMappingSearch] = useState("");
  const [serverFilter, setServerFilter] = useState("All");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [page, setPage] = useState(0);
  const [sortCol, setSortCol] = useState<keyof MappingRow>("configuration");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = mappings.filter((m) => {
    const matchesServer = serverFilter === "All" || m.server === serverFilter;
    const matchesSearch =
      !mappingSearch ||
      m.configuration.toLowerCase().includes(mappingSearch.toLowerCase()) ||
      m.group.toLowerCase().includes(mappingSearch.toLowerCase()) ||
      m.securities.toLowerCase().includes(mappingSearch.toLowerCase());
    return matchesServer && matchesSearch;
  });

  function handleSort(col: keyof MappingRow) {
    if (sortCol === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  }

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortCol];
    const bVal = b[sortCol];
    const cmp = aVal.localeCompare(bVal);
    return sortDir === "asc" ? cmp : -cmp;
  });

  function handleRefresh() {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  }

  const totalRows = filtered.length;
  const startRow = page * rowsPerPage + 1;
  const endRow = Math.min((page + 1) * rowsPerPage, totalRows);

  const handleDelete = (id: string) => {
    setMappings((prev) => prev.filter((m) => m.id !== id));
    setMenuOpenId(null);
  };

  const paged = sorted.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <div className="py-8 px-5 flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-[var(--slate-3)] border border-transparent rounded-lg h-8 px-2.5 gap-2 w-[280px]">
          <Search size={14} className="text-[var(--text-muted)] shrink-0" />
          <input
            type="text"
            placeholder="Search mappings..."
            value={mappingSearch}
            onChange={(e) => { setMappingSearch(e.target.value); setPage(0); }}
            className="flex-1 bg-transparent text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-['Inter',sans-serif] outline-none placeholder:text-[var(--text-muted)]"
          />
        </div>

        {/* Server filter */}
        <select
          value={serverFilter}
          onChange={(e) => { setServerFilter(e.target.value); setPage(0); }}
          className="h-8 px-2.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-['Inter',sans-serif] outline-none cursor-pointer"
        >
          {servers.map((s) => (
            <option key={s} value={s}>{s === "All" ? "All Servers" : s}</option>
          ))}
        </select>

        <div className="flex-1" />

        <button
          onClick={handleRefresh}
          className="size-8 rounded-lg border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
        >
          <RotateCw size={14} className={isRefreshing ? "animate-spin" : ""} />
        </button>

        <button
          className="px-3 py-1.5 bg-[var(--accent-solid)] text-[color:var(--text-on-accent)] font-['Inter',sans-serif] text-[length:var(--text-xs)] rounded-lg hover:bg-[var(--accent-solid-hover)] transition-colors flex items-center gap-1"
          style={{ fontWeight: 600 }}
        >
          <Plus size={14} />
          Add Mapping
        </button>
      </div>

      {/* Table */}
      <div className="border border-[var(--border-subtle)] rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center bg-[var(--bg-muted)] border-b border-[var(--border-subtle)] h-9 px-3">
          {columns.map((col) => (
            <button
              key={col.key}
              onClick={() => handleSort(col.key)}
              className="flex-1 flex items-center gap-1 font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)] transition-colors text-left"
              style={{ fontWeight: 600 }}
            >
              {col.label}
              {sortCol === col.key && (
                <span className="text-[var(--text-muted)]">{sortDir === "asc" ? "↑" : "↓"}</span>
              )}
            </button>
          ))}
          <span className="w-[40px]" />
        </div>

        {/* Rows */}
        {paged.length > 0 ? (
          paged.map((row) => (
            <div
              key={row.id}
              className="flex items-center h-9 px-3 border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--bg-hover)] transition-colors group"
            >
              <span className="flex-1 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] truncate" style={{ fontWeight: 600 }}>
                {row.configuration}
              </span>
              <span className="flex-1 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] truncate">
                {row.group}
              </span>
              <span className="flex-1 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] truncate">
                {row.symbol}
              </span>
              <span className="flex-1 font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] truncate">
                {row.securities}
              </span>
              <span className="flex-1 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] truncate">
                {row.prefix || "—"}
              </span>
              <span className="flex-1 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] truncate">
                {row.suffix || "—"}
              </span>
              <span className="flex-1 font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] truncate">
                {row.server}
              </span>
              <span className="w-[40px] flex justify-end relative">
                <button
                  onClick={() => setMenuOpenId(menuOpenId === row.id ? null : row.id)}
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[var(--bg-muted)]"
                >
                  <MoreVertical size={14} />
                </button>
                {menuOpenId === row.id && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 top-8 z-20 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg shadow-lg py-1 min-w-[140px]"
                  >
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--danger)] hover:bg-[var(--bg-hover)] transition-colors"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                    <button
                      onClick={() => { setMenuOpenId(null); }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
                    >
                      <Download size={13} />
                      Export
                    </button>
                  </div>
                )}
              </span>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-16">
            <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
              No mappings found
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between bg-[var(--bg-muted)] border-t border-[var(--border-subtle)] h-8 px-3">
          <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)]">
            {totalRows > 0 ? `${startRow}–${endRow} of ${totalRows}` : "0 results"}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="size-6 rounded flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-hover)] disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setPage((p) => (endRow < totalRows ? p + 1 : p))}
              disabled={endRow >= totalRows}
              className="size-6 rounded flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-hover)] disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
