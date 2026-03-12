import { useState, useRef, useEffect } from "react";
import {
  Search,
  MoreVertical,
  Plus,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ListFilter,
  LayoutGrid,
  User,
  Check,
  Minus,
} from "lucide-react";
import svgPaths from "../../imports/svg-r047q20eeh";
import columnIconPaths from "../../imports/svg-04y9cwgvx9";
import newColumnIconPaths from "../../imports/svg-51xinysb3t";

const tabs = ["Open", "Pending", "Approved", "Rejected", "<Saved view>"];

const ALL_COLUMNS = [
  { key: "clients", label: "Clients", alwaysVisible: true },
  { key: "tags", label: "Tags" },
  { key: "country", label: "Country" },
  { key: "accountManager", label: "Account Manager" },
  { key: "creation", label: "Creation Date" },
] as const;

type ColumnKey = (typeof ALL_COLUMNS)[number]["key"];

const DEFAULT_VISIBLE: ColumnKey[] = ["clients", "tags", "country", "accountManager", "creation"];

interface ClientsTableProps {
  onSelectClient: (id: number) => void;
  selectedClientId: number | null;
  onOpenSettings: (id: number) => void;
}

const clients = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  name: "Nick Doe",
  cid: "9999",
  status: "New",
  tags: ["Trader", "Provider"],
  country: "USA",
  accountManager: "John Doe",
  creation: "2023-10-01",
}));

function Checkbox({ checked, indeterminate, onChange }: { checked: boolean; indeterminate?: boolean; onChange: () => void }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onChange(); }}
      className={`size-5 rounded-md border-[1.4px] flex items-center justify-center transition-colors ${
        checked || indeterminate
          ? "bg-[var(--accent-solid)] border-[var(--accent-solid)]"
          : "border-[var(--border-default)] bg-[var(--bg-raised)]"
      }`}
    >
      {checked && <Check size={13} className="text-white" strokeWidth={3} />}
      {indeterminate && !checked && <Minus size={13} className="text-white" strokeWidth={3} />}
    </button>
  );
}

export function ClientsTable({ onSelectClient, selectedClientId, onOpenSettings }: ClientsTableProps) {
  const [activeTab, setActiveTab] = useState("Pending");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState<Set<ColumnKey>>(new Set(DEFAULT_VISIBLE));
  const [columnPickerOpen, setColumnPickerOpen] = useState(false);
  const [sortPopupOpen, setSortPopupOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<ColumnKey | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [rowsPickerOpen, setRowsPickerOpen] = useState(false);
  const columnPickerRef = useRef<HTMLDivElement>(null);
  const sortPopupRef = useRef<HTMLDivElement>(null);
  const rowsPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (columnPickerRef.current && !columnPickerRef.current.contains(e.target as Node)) {
        setColumnPickerOpen(false);
      }
      if (sortPopupRef.current && !sortPopupRef.current.contains(e.target as Node)) {
        setSortPopupOpen(false);
      }
      if (rowsPickerRef.current && !rowsPickerRef.current.contains(e.target as Node)) {
        setRowsPickerOpen(false);
      }
    }
    if (columnPickerOpen || sortPopupOpen || rowsPickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [columnPickerOpen, sortPopupOpen, rowsPickerOpen]);

  const isColumnVisible = (key: ColumnKey) => visibleColumns.has(key);

  const toggleColumn = (key: ColumnKey) => {
    setVisibleColumns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const filteredClients = clients.filter((client) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      client.name.toLowerCase().includes(q) ||
      client.cid.toLowerCase().includes(q) ||
      client.status.toLowerCase().includes(q) ||
      client.tags.some((t) => t.toLowerCase().includes(q)) ||
      client.country.toLowerCase().includes(q) ||
      client.accountManager.toLowerCase().includes(q) ||
      client.creation.toLowerCase().includes(q)
    );
  });

  const allSelected = selectedRows.size === filteredClients.length && filteredClients.length > 0;
  const someSelected = selectedRows.size > 0 && !allSelected;

  const handleSelectAll = () => {
    if (allSelected || someSelected) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredClients.map((c) => c.id)));
    }
  };

  const handleToggleRow = (id: number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-surface)] flex-1 min-w-0 rounded-2xl overflow-hidden">
      {/* Breadcrumb */}
      <div className="px-6 pt-3">
        
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-2 pb-3">
        <h4 className="font-['Public_Sans',sans-serif] text-[length:var(--text-h4)] text-[color:var(--text-primary)] tracking-[-0.145px]">All Clients</h4>
        <div className="flex items-center gap-2">
          <button className="size-[34px] flex items-center justify-center rounded-lg text-[var(--text-secondary)]">
            <MoreVertical size={18} />
          </button>
          <button className="flex items-center gap-2 h-[34px] px-3 bg-[var(--slate-3)] rounded-lg text-[var(--text-primary)]">
            <Download size={16} />
            <span className="font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)]">Export</span>
            <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 h-[34px] px-4 bg-[var(--accent-solid)] rounded-lg text-[var(--text-on-accent)]">
            <Plus size={16} />
            <span className="font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)]">Add Clients</span>
          </button>
        </div>
      </div>

      {/* Tab Views */}
      <div className="flex items-center gap-3 px-6 pb-3">
        <button className="flex items-center gap-2 h-[34px] px-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">
          <LayoutGrid size={14} />
          <span className="font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)]">Views</span>
          <ChevronDown size={14} />
        </button>
        <div className="w-px h-6 bg-[var(--border-default)] rounded-full" />
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`h-[34px] px-3 rounded-md font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)] tracking-[0.21px] ${
                activeTab === tab
                  ? "bg-[var(--accent-bg)] text-[color:var(--indigo-12)]"
                  : "text-[color:var(--text-secondary)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Sort and Filters */}
      <div className="flex items-center gap-3 px-6 pb-3">
        {/* Sort button with popup */}
        <div className="relative" ref={sortPopupRef}>
          <button
            onClick={(e) => { e.stopPropagation(); setSortPopupOpen((v) => !v); }}
            className={`flex items-center gap-2 h-[34px] pl-2 pr-4 rounded-lg transition-colors cursor-pointer ${
              sortColumn
                ? "bg-[var(--bg-hover)] text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
            }`}
          >
            {sortColumn ? (
              sortOrder === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />
            ) : (
              <ArrowUpDown size={16} />
            )}
            <span className="font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)] whitespace-nowrap">
              {sortColumn
                ? `Sorted by ${ALL_COLUMNS.find((c) => c.key === sortColumn)?.label ?? ""}`
                : "Sort"}
            </span>
          </button>
          {sortPopupOpen && (
            <div className="absolute top-full left-0 mt-1 w-[220px] bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg shadow-lg z-50 py-1">
              <div className="px-3 py-2">
                <span className="font-['Inter',sans-serif] font-semibold text-[11px] text-[#60646c] tracking-[0.4px] uppercase">
                  Sort by
                </span>
              </div>
              {ALL_COLUMNS.map((col) => (
                <button
                  key={col.key}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (sortColumn === col.key) {
                      setSortOrder((prev) => prev === "asc" ? "desc" : "asc");
                    } else {
                      setSortColumn(col.key);
                      setSortOrder("asc");
                    }
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-[7px] transition-colors cursor-pointer ${
                    sortColumn === col.key
                      ? "bg-[var(--accent-bg)] text-[var(--indigo-11)]"
                      : "hover:bg-[var(--slate-2)] text-[var(--text-primary)]"
                  }`}
                >
                  <span className="flex-1 font-['Inter',sans-serif] text-[13px] tracking-[-0.07px] text-left">
                    {col.label}
                  </span>
                  {sortColumn === col.key && (
                    sortOrder === "asc"
                      ? <ArrowUp size={14} className="text-[var(--indigo-11)]" />
                      : <ArrowDown size={14} className="text-[var(--indigo-11)]" />
                  )}
                </button>
              ))}
              {sortColumn && (
                <>
                  <div className="mx-2 my-1 h-px bg-[var(--border-subtle)]" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSortColumn(null);
                      setSortPopupOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-[7px] hover:bg-[var(--slate-2)] transition-colors cursor-pointer text-[var(--text-secondary)]"
                  >
                    <span className="font-['Inter',sans-serif] text-[13px] tracking-[-0.07px]">
                      Clear sort
                    </span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        {/* Vertical divider */}
        <div className="w-px h-6 bg-[var(--border-default)] rounded-full" />
        {/* Filter button */}
        <button className="flex items-center gap-2 h-[34px] pl-2 pr-4 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-lg transition-colors cursor-pointer">
          <ListFilter size={16} />
          <span className="font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)]">Filter</span>
        </button>
        {/* Add filter button */}
        <button className="size-[34px] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] rounded-lg transition-colors cursor-pointer">
          <Plus size={16} />
        </button>
        <div className="flex-1" />
        {/* Search */}
        <div className="relative w-[300px]">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[34px] px-3 pr-8 bg-[var(--slate-2)] rounded-lg text-[length:var(--text-sm)] font-['Inter',sans-serif] text-[color:var(--text-secondary)] focus:text-[color:var(--text-primary)] outline-none border border-transparent focus:border-[var(--accent-solid)] transition-colors"
          />
          <Search
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 flex flex-col min-h-0 mx-6 mb-3 bg-[var(--bg-surface)] rounded-lg overflow-hidden">
        <div className="flex-1 overflow-auto border-2 border-[var(--slate-3)] rounded-t-lg rounded-b-none">
        {/* Table Header */}
        <div className="flex items-center h-[44px] bg-[var(--slate-3)] sticky top-0 z-10">
          <div className="w-12 flex items-center justify-center shrink-0">
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={handleSelectAll}
            />
          </div>
          <div className="w-[280px] shrink-0 pl-2 py-2">
            <span className="font-['Inter',sans-serif] font-semibold text-[12px] text-[color:var(--text-primary)] tracking-[-0.06px]">
              Clients
            </span>
          </div>
          {isColumnVisible("tags") && (
            <div className="w-[180px] shrink-0 flex items-center gap-2 px-2">
              <span className="font-['Inter',sans-serif] font-semibold text-[12px] text-[color:var(--text-primary)] tracking-[-0.06px]">
                Tags
              </span>
            </div>
          )}
          {isColumnVisible("country") && (
            <div className="w-[140px] shrink-0 pl-2 py-2">
              <span className="font-['Inter',sans-serif] font-semibold text-[12px] text-[color:var(--text-primary)] tracking-[-0.06px]">
                Country
              </span>
            </div>
          )}
          {isColumnVisible("accountManager") && (
            <div className="w-[180px] shrink-0 pl-2 py-2">
              <span className="font-['Inter',sans-serif] font-semibold text-[12px] text-[color:var(--text-primary)] tracking-[-0.06px]">
                Account Manager
              </span>
            </div>
          )}
          {isColumnVisible("creation") && (
            <div className="flex-1 pl-2 py-2">
              <span className="font-['Inter',sans-serif] font-semibold text-[12px] text-[color:var(--text-primary)] tracking-[-0.06px]">
                Creation Date
              </span>
            </div>
          )}
          
          
          
          <div className="sticky right-0 z-20 w-12 flex items-center justify-center shrink-0 bg-[var(--slate-3)]" ref={columnPickerRef}>
            <button
              onClick={(e) => { e.stopPropagation(); setColumnPickerOpen((v) => !v); }}
              className="flex items-center justify-center size-[34px] rounded-lg hover:bg-[var(--slate-3)] transition-colors"
            >
              <svg className="size-[18px]" fill="none" viewBox="0 0 15.1 15.1">
                <path d={newColumnIconPaths.p84d7a00} stroke="#60646c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
              </svg>
            </button>
            {columnPickerOpen && (
              <div className="absolute top-full right-0 mt-1 w-[200px] bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg shadow-lg z-50 py-1">
                <div className="px-3 py-2">
                  <span className="font-['Inter',sans-serif] font-semibold text-[11px] text-[#60646c] tracking-[0.4px] uppercase">
                    Columns
                  </span>
                </div>
                {ALL_COLUMNS.map((col) => (
                  <button
                    key={col.key}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!col.alwaysVisible) toggleColumn(col.key);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-[7px] hover:bg-[var(--slate-2)] transition-colors ${
                      col.alwaysVisible ? "opacity-50 cursor-default" : "cursor-pointer"
                    }`}
                  >
                    <div
                      className={`size-[18px] rounded-[5px] border-[1.4px] flex items-center justify-center transition-colors ${
                        isColumnVisible(col.key)
                          ? "bg-[var(--accent-solid)] border-[var(--accent-solid)]"
                          : "border-[var(--border-default)] bg-[var(--bg-raised)]"
                      }`}
                    >
                      {isColumnVisible(col.key) && <Check size={11} className="text-white" strokeWidth={3} />}
                    </div>
                    <span className="font-['Inter',sans-serif] text-[13px] text-[color:var(--text-primary)] tracking-[-0.07px]">
                      {col.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table Rows */}
        {filteredClients.map((client) => (
          <div
            key={client.id}
            onClick={() => onSelectClient(client.id)}
            className={`flex items-center h-[56px] border-b border-[var(--border-subtle)] cursor-pointer transition-colors group ${ 
              selectedRows.has(client.id) ? "bg-[var(--indigo-2)]" : "bg-[var(--slate-1)] hover:bg-[var(--slate-2)]"
            }`}
          >
            <div className="w-12 flex items-center justify-center shrink-0">
              <Checkbox
                checked={selectedRows.has(client.id)}
                onChange={() => handleToggleRow(client.id)}
              />
            </div>
            <div className="w-[280px] shrink-0 flex items-center gap-3 px-2">
              {/* Avatar */}
              <div className="relative">
                <div className="size-8 bg-[var(--slate-4)] rounded-lg flex items-center justify-center">
                  <User size={16} className="text-[var(--slate-11)]" />
                </div>
                <div className="absolute -bottom-[2px] -right-1 size-3 bg-[var(--success)] rounded-full border-2 border-[var(--bg-surface)]" />
              </div>
              {/* Name and CID */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="font-['Inter',sans-serif] font-semibold text-[length:var(--text-base)] text-[color:var(--text-primary)] tracking-[-0.07px] text-[15px]">
                    {client.name}
                  </span>
                  <span className="bg-[var(--accent-bg)] text-[color:var(--accent-text)] text-[length:var(--text-sm)] font-['Inter',sans-serif] px-2 h-6 flex items-center rounded-full tracking-[-0.07px]">
                    {client.status}
                  </span>
                </div>
                <span className="text-[length:var(--text-xs)] text-[color:var(--slate-9)] font-['Inter',sans-serif] tracking-[0.25px] text-[12px]">
                  CID:{client.cid}
                </span>
              </div>
            </div>
            {/* Tags */}
            {isColumnVisible("tags") && (
              <div className="w-[180px] shrink-0 flex items-center gap-2 px-2">
                {client.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 h-6 px-2 bg-[var(--slate-3)] rounded-md"
                  >
                    <div
                      className={`w-1 h-3 rounded-full ${
                        tag === "Trader" ? "bg-[var(--tag-trader)]" : "bg-[var(--tag-provider)]"
                      }`}
                    />
                    <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] tracking-[-0.07px] leading-[24px]">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {/* Country */}
            {isColumnVisible("country") && (
              <div className="w-[140px] shrink-0 pl-2 py-2">
                <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] tracking-[-0.07px]">
                  {client.country}
                </span>
              </div>
            )}
            {/* Account Manager */}
            {isColumnVisible("accountManager") && (
              <div className="w-[180px] shrink-0 pl-2 py-2">
                <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] tracking-[-0.07px]">
                  {client.accountManager}
                </span>
              </div>
            )}
            {/* Creation Date */}
            {isColumnVisible("creation") && (
              <div className={`flex-1 pl-2 py-2 ${
                selectedRows.has(client.id) ? "bg-[var(--indigo-2)]" : "bg-[var(--slate-1)] group-hover:bg-[var(--slate-2)]"
              }`}>
                <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] tracking-[-0.07px]">
                  {client.creation}
                </span>
              </div>
            )}
            {/* More */}
            <div className={`sticky right-0 z-10 w-10 flex items-center justify-center shrink-0 self-stretch transition-colors ${
              selectedRows.has(client.id) ? "bg-[var(--indigo-2)]" : "bg-[var(--slate-1)] group-hover:bg-[var(--slate-2)]"
            }`}>
              <button
                onClick={(e) => { e.stopPropagation(); onOpenSettings(client.id); }}
                className="p-1.5 rounded-md hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
        </div>

        {/* Pagination */}
        <div className="shrink-0 flex items-center justify-between px-6 py-3 bg-[var(--slate-3)] rounded-b-lg">
          <div className="flex items-center gap-1 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
            <span>showing</span>
            <div className="relative" ref={rowsPickerRef}>
              <button
                onClick={(e) => { e.stopPropagation(); setRowsPickerOpen((v) => !v); }}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[color:var(--text-primary)] hover:bg-[var(--slate-3)] transition-colors cursor-pointer"
              >
                {rowsPerPage}
                <ChevronDown size={12} />
              </button>
              {rowsPickerOpen && (
                <div className="absolute bottom-full left-0 mb-1 w-[80px] bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg shadow-lg z-50 py-1">
                  {[25, 50, 100, 200].map((n) => (
                    <button
                      key={n}
                      onClick={(e) => {
                        e.stopPropagation();
                        setRowsPerPage(n);
                        setRowsPickerOpen(false);
                      }}
                      className={`w-full flex items-center px-3 py-[6px] transition-colors cursor-pointer ${
                        rowsPerPage === n
                          ? "bg-[var(--accent-bg)] text-[var(--indigo-11)]"
                          : "hover:bg-[var(--slate-2)] text-[var(--text-primary)]"
                      }`}
                    >
                      <span className="font-['Inter',sans-serif] text-[13px] tracking-[-0.07px]">
                        {n}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span>rows of 400</span>
          </div>
          <div className="flex items-center gap-2 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
            <button className="p-1 text-[var(--text-disabled)]">
              <ChevronLeft size={16} />
            </button>
            <span>Page 1 of 4</span>
            <button className="p-1 text-[var(--text-secondary)]">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}