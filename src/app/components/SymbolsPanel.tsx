import { useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { ButtonTab } from "./ButtonTab";

type AssetClass = {
  name: string;
  symbols: string[];
};

const initialAssetClasses: AssetClass[] = [
  {
    name: "Forex",
    symbols: [
      "AUDCAD", "AUDCHF", "AUDJPY", "AUDNZD", "AUDUSD",
      "CADCHF", "CADJPY", "CHFJPY",
      "EURAUD", "EURCHF", "EURGBP", "EURJPY", "EURNZD", "EURUSD",
      "GBPAUD", "GBPCAD", "GBPCHF", "GBPJPY", "GBPNZD", "GBPUSD",
      "NZDCAD", "NZDCHF", "NZDJPY", "NZDUSD",
      "USDCAD", "USDCHF", "USDJPY",
    ],
  },
  {
    name: "CFD-Energies",
    symbols: ["USOIL", "UKOIL", "NGAS"],
  },
  {
    name: "Index",
    symbols: ["US30", "US500", "NAS100", "GER40", "UK100", "JP225"],
  },
  {
    name: "Metals",
    symbols: ["XAUUSD", "XAGUSD", "XPTUSD", "XPDUSD"],
  },
  {
    name: "Crypto",
    symbols: ["BTCUSD", "ETHUSD", "LTCUSD", "XRPUSD", "ADAUSD"],
  },
];

export function SymbolsPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [assetClasses, setAssetClasses] = useState<AssetClass[]>(initialAssetClasses);
  const [activeTab, setActiveTab] = useState<string>("Forex");
  const [newSymbolInputs, setNewSymbolInputs] = useState<Record<string, string>>({});
  const [symbolSortDir, setSymbolSortDir] = useState<"asc" | "desc">("asc");

  const activeClass = assetClasses.find((ac) => ac.name === activeTab);

  const filteredSymbols = activeClass
    ? activeClass.symbols.filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const sortedSymbols = [...filteredSymbols].sort((a, b) => {
    const cmp = a.localeCompare(b);
    return symbolSortDir === "asc" ? cmp : -cmp;
  });

  const handleAddSymbol = (className: string) => {
    const value = (newSymbolInputs[className] || "").trim().toUpperCase();
    if (!value) return;
    setAssetClasses((prev) =>
      prev.map((ac) =>
        ac.name === className && !ac.symbols.includes(value)
          ? { ...ac, symbols: [...ac.symbols, value] }
          : ac
      )
    );
    setNewSymbolInputs((prev) => ({ ...prev, [className]: "" }));
  };

  const handleRemoveSymbol = (className: string, symbol: string) => {
    setAssetClasses((prev) =>
      prev.map((ac) =>
        ac.name === className
          ? { ...ac, symbols: ac.symbols.filter((s) => s !== symbol) }
          : ac
      )
    );
  };

  return (
    <div className="py-8 px-5 flex flex-col gap-10">
      <div className="w-full flex flex-col gap-10">
        <div>
          {/* Search + Add symbol */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center bg-[var(--slate-3)] border border-transparent rounded-lg h-8 px-2.5 gap-2 w-[280px]">
              <Search size={14} className="text-[var(--text-muted)] shrink-0" />
              <input
                type="text"
                placeholder="Search by symbol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-['Inter',sans-serif] outline-none placeholder:text-[var(--text-muted)]"
              />
            </div>
            <div className="flex-1" />
            {activeClass && (
              <>
                <div className="flex items-center border border-dashed border-[var(--border-strong)] rounded-lg h-8 px-2.5 gap-2 w-[240px] bg-[var(--bg-subtle)]">
                  <Plus size={14} className="text-[var(--text-muted)] shrink-0" />
                  <input
                    type="text"
                    placeholder={`Add new symbol under ${activeClass.name}`}
                    value={newSymbolInputs[activeClass.name] || ""}
                    onChange={(e) =>
                      setNewSymbolInputs((prev) => ({ ...prev, [activeClass.name]: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddSymbol(activeClass.name);
                    }}
                    className="flex-1 bg-transparent text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-['Inter',sans-serif] outline-none placeholder:text-[var(--text-muted)]"
                  />
                </div>
                <button
                  onClick={() => handleAddSymbol(activeClass.name)}
                  className="px-3 py-1.5 bg-[var(--accent-solid)] text-[color:var(--text-on-accent)] font-['Inter',sans-serif] text-[length:var(--text-xs)] rounded-lg hover:bg-[var(--accent-solid-hover)] transition-colors flex items-center gap-1"
                  style={{ fontWeight: 600 }}
                >
                  <Plus size={14} />
                  Add Symbol
                </button>
              </>
            )}
          </div>

          {/* Asset class tabs */}
          <div className="flex gap-1 mb-3">
            {assetClasses.map((ac) => (
              <ButtonTab
                key={ac.name}
                label={`${ac.name} (${ac.symbols.length})`}
                isActive={activeTab === ac.name}
                onClick={() => {
                  setActiveTab(ac.name);
                  setSearchQuery("");
                }}
              />
            ))}
          </div>

          {/* Symbols table */}
          {activeClass && (
            <div className="border border-[var(--border-subtle)] rounded-lg overflow-hidden">
              {/* Table header */}
              <div className="flex items-center bg-[var(--bg-muted)] border-b border-[var(--border-subtle)] h-9 px-3">
                <button
                  onClick={() => setSymbolSortDir((d) => d === "asc" ? "desc" : "asc")}
                  className="flex-1 flex items-center gap-1 font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)] transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Symbol
                  <span className="text-[var(--text-muted)]">{symbolSortDir === "asc" ? "↑" : "↓"}</span>
                </button>
                <span className="w-[140px] font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)]" style={{ fontWeight: 600 }}>
                  Asset Class
                </span>
                <span className="w-[60px]" />
              </div>
              {/* Table rows */}
              {sortedSymbols.length > 0 ? (
                sortedSymbols.map((symbol) => (
                  <div
                    key={symbol}
                    className="flex items-center h-9 px-3 border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--bg-hover)] transition-colors group"
                  >
                    <span className="flex-1 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
                      {symbol}
                    </span>
                    <span className="w-[140px] font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)]">
                      {activeClass.name}
                    </span>
                    <span className="w-[60px] flex justify-end">
                      <button
                        onClick={() => handleRemoveSymbol(activeClass.name, symbol)}
                        className="text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[var(--bg-muted)]"
                      >
                        <X size={13} />
                      </button>
                    </span>
                  </div>
                ))
              ) : searchQuery ? (
                <div className="flex items-center justify-center h-16">
                  <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
                    No symbols matching "{searchQuery}"
                  </p>
                </div>
              ) : null}
              {/* Table footer */}
              <div className="flex items-center justify-between bg-[var(--bg-muted)] border-t border-[var(--border-subtle)] h-8 px-3">
                <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)]">
                  {sortedSymbols.length} symbol{sortedSymbols.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
