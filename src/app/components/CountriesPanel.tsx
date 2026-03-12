import { useState } from "react";
import { ButtonTab } from "./ButtonTab";

const regions: Record<string, string[]> = {
  "Europe": ["United Kingdom", "Germany", "France", "Spain", "Italy", "Netherlands", "Belgium", "Switzerland", "Austria", "Sweden", "Norway", "Denmark", "Finland", "Portugal", "Ireland", "Greece", "Poland", "Czech Republic", "Romania", "Hungary"],
  "Asia": ["Japan", "China", "South Korea", "India", "Singapore", "Hong Kong", "Thailand", "Malaysia", "Indonesia", "Vietnam", "Philippines", "Taiwan"],
  "North America": ["United States", "Canada", "Mexico"],
  "South America": ["Brazil", "Argentina", "Colombia", "Chile", "Peru", "Venezuela", "Ecuador", "Uruguay"],
  "Africa": ["South Africa", "Nigeria", "Kenya", "Egypt", "Morocco", "Ghana", "Tanzania"],
  "Oceania": ["Australia", "New Zealand", "Fiji", "Papua New Guinea"],
  "Others": ["Bermuda", "Cayman Islands", "British Virgin Islands", "Guam", "Puerto Rico", "US Virgin Islands"],
};

const initialEnabled = new Set([
  "United Kingdom", "Germany", "France", "Spain", "Italy", "Netherlands", "Belgium", "Switzerland",
  "United States", "Canada", "Japan", "Singapore", "Hong Kong", "Australia", "New Zealand",
  "UAE", "Saudi Arabia", "Qatar", "South Africa", "Brazil",
]);

export function CountriesPanel() {
  const [activeRegion, setActiveRegion] = useState("Europe");
  const [enabled, setEnabled] = useState<Set<string>>(new Set(initialEnabled));
  const [search, setSearch] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const regionNames = Object.keys(regions);
  const countries = (regions[activeRegion] || []).filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  function toggleCountry(country: string) {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(country)) next.delete(country);
      else next.add(country);
      return next;
    });
    setHasChanges(true);
  }

  function deselectAll() {
    setEnabled((prev) => {
      const next = new Set(prev);
      countries.forEach((c) => next.delete(c));
      return next;
    });
    setHasChanges(true);
  }

  function selectAll() {
    setEnabled((prev) => {
      const next = new Set(prev);
      countries.forEach((c) => next.add(c));
      return next;
    });
    setHasChanges(true);
  }

  const enabledCount = countries.filter((c) => enabled.has(c)).length;

  return (
    <div className="py-8 px-5">
      <div className="w-full max-w-[640px] flex flex-col gap-6">
        {/* Section heading */}
        <div>
          <h5
            className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-1"
            style={{ fontWeight: 600 }}
          >
            Country Selection
          </h5>
          <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] max-w-[75ch]">
            Select or deselect the countries that are available to the registration form. Use the continent tabs to navigate regions.
          </p>
          <div className="h-px bg-[var(--border-subtle)] mt-4 mb-5" />
        </div>

        {/* Region tabs */}
        <div className="flex gap-1 flex-wrap">
          {regionNames.map((region) => (
            <ButtonTab
              key={region}
              label={region}
              isActive={activeRegion === region}
              onClick={() => setActiveRegion(region)}
            />
          ))}
        </div>

        {/* Search + Deselect All toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-[var(--slate-2)] rounded-lg h-8 px-2.5 w-[200px]">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search countries..."
              className="flex-1 bg-transparent font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)]">
              {enabledCount} of {countries.length} enabled
            </span>
            <button
              onClick={deselectAll}
              className="px-2.5 py-1 rounded-md border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
            >
              Deselect All
            </button>
            <button
              onClick={selectAll}
              className="px-2.5 py-1 rounded-md border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
            >
              Select All
            </button>
          </div>
        </div>

        {/* Country grid — 4 columns per Obsidian spec */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-[360px] overflow-y-auto overlay-scrollbar">
          {countries.map((country) => (
            <label
              key={country}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--accent-bg-subtle)] transition-colors cursor-pointer border border-[var(--border-subtle)]"
            >
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); toggleCountry(country); }}
                className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer shrink-0 ${
                  enabled.has(country) ? "bg-[var(--accent-solid)]" : "bg-[var(--slate-5)]"
                }`}
              >
                <div
                  className={`absolute top-[3px] w-3.5 h-3.5 rounded-full bg-white shadow transition-transform ${
                    enabled.has(country) ? "translate-x-[18px]" : "translate-x-[3px]"
                  }`}
                />
              </button>
              <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-primary)] truncate">
                {country}
              </span>
            </label>
          ))}
        </div>

        {/* Save */}
        <div className="flex justify-end pt-2">
          <button
            className="px-5 py-2 bg-[var(--accent-solid)] text-[color:var(--text-on-accent)] font-['Inter',sans-serif] text-[length:var(--text-sm)] rounded-lg hover:bg-[var(--accent-solid-hover)] transition-all cursor-pointer"
            style={{ fontWeight: 600 }}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}