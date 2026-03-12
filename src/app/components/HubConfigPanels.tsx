import { useState, useRef, useEffect } from "react";
import { SettingsToggleSwitch } from "./settings-form/SettingsToggleSwitch";
import { SettingsRadioGroup } from "./settings-form/SettingsRadioGroup";
import { SettingsSelect } from "./settings-form/SettingsSelect";
import { SettingsMultiSelect } from "./settings-form/SettingsMultiSelect";
import { InputField } from "./InputField";
import { MoreVertical, X, ChevronRight, ChevronLeft, ChevronDown, Search, Download, Plus, RotateCw, ExternalLink, Undo2, Trash2, Copy, Pencil, Bold, Italic, Underline, Strikethrough, Link } from "lucide-react";

/* ── Shared section heading ── */
function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h5
        className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-1"
        style={{ fontWeight: 600 }}
      >
        {title}
      </h5>
      <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] max-w-[75ch]">
        {description}
      </p>
      <div className="h-px bg-[var(--border-subtle)] mt-4 mb-5" />
    </>
  );
}

/* ── Save button ── */
function SaveButton({
  visible,
  onSave,
}: {
  visible: boolean;
  onSave: () => void;
}) {
  return (
    <div className="flex justify-end pt-2">
      <button
        className={`px-5 py-2 bg-[var(--accent-solid)] text-[color:var(--text-on-accent)] font-['Inter',sans-serif] text-[length:var(--text-sm)] rounded-lg hover:bg-[var(--accent-solid-hover)] transition-all cursor-pointer ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ fontWeight: 600 }}
        onClick={onSave}
      >
        Save changes
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   1. Clients List Panel
   ════════════════════════════════════════════════════════════════════ */
export function ClientsListPanel() {
  const [hasChanges, setHasChanges] = useState(false);
  const m = () => setHasChanges(true);

  return (
    <div className="py-8 px-5">
      <div className="w-full max-w-[640px] flex flex-col gap-10">
        {/* Display Settings */}
        <div>
          <SectionHeading
            title="Display Settings"
            description="Configure which columns and information are visible in the client list view."
          />
          <div className="flex flex-col gap-5">
            <SettingsMultiSelect
              label="Visible Columns"
              selected={["Basic Info", "Pool", "Country", "Creation Date"]}
              options={[
                "Basic Info",
                "Pool",
                "Country",
                "Creation Date",
                "Email",
                "Phone",
                "Account Type",
                "Last Activity",
              ]}
              onChange={m}
            />
            <SettingsSelect
              label="Default Sort Column"
              value="Creation Date"
              options={[
                "Creation Date",
                "Name",
                "Pool",
                "Country",
                "Last Activity",
              ]}
              onChange={m}
            />
            <SettingsRadioGroup
              label="Default Sort Order"
              value="Descending"
              options={["Ascending", "Descending"]}
              onChange={m}
            />
            <InputField
              label="Default Rows Per Page"
              type="number"
              defaultValue={25}
              min={10}
              max={100}
              onChange={m}
            />
          </div>
        </div>

        {/* Toolbar Configuration */}
        <div>
          <SectionHeading
            title="Toolbar Configuration"
            description="Control which actions are available in the clients list toolbar."
          />
          <div className="flex flex-col gap-5">
            <SettingsToggleSwitch
              label="Enable Search"
              description="Allow text search filtering across client records"
              checked={true}
              onChange={m}
            />
            <SettingsToggleSwitch
              label="Enable Export"
              description="Allow exporting client data to CSV or Excel files"
              checked={true}
              onChange={m}
            />
            <SettingsToggleSwitch
              label="Enable Bulk Actions"
              description="Allow selecting multiple clients for bulk operations"
              checked={false}
              onChange={m}
            />
          </div>
        </div>

        {/* Row Actions */}
        <div>
          <SectionHeading
            title="Row Actions"
            description="Configure available actions in the context menu for each client row."
          />
          <div className="flex flex-col gap-5">
            <SettingsToggleSwitch
              label="Add User"
              description="Allow creating user accounts from client records"
              checked={true}
              onChange={m}
            />
            <SettingsToggleSwitch
              label="Delete Client"
              description="Allow soft-deleting client records from the list view"
              checked={true}
              onChange={m}
            />
          </div>
        </div>

        <SaveButton visible={hasChanges} onSave={() => setHasChanges(false)} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   2. Deleted Clients Panel
   ════════════════════════════════════════════════════════════════════ */

/* --- Types & Mock Data --- */
interface DeletedClient {
  id: string;
  initials: string;
  name: string;
  cid: string;
  email: string;
  avatarBg: string;
  groupType: string;
  clientOwner: string;
  lastActivity: string;
  deletedDate: string;
}

const mockDeletedClients: DeletedClient[] = [
  {
    id: "dc1",
    initials: "SC",
    name: "Sarine Client 2",
    cid: "CID: 13354",
    email: "sar@gmil.com",
    avatarBg: "bg-[var(--slate-8)]",
    groupType: "_",
    clientOwner: "-",
    lastActivity: "Mar 26th 2025",
    deletedDate: "Mar 26th 2025",
  },
  {
    id: "dc2",
    initials: "AP",
    name: "Alex Provider Test",
    cid: "CID: 10597",
    email: "pbgdxfbjnwoejqicwj@ytnhy.com",
    avatarBg: "bg-[var(--slate-8)]",
    groupType: "_",
    clientOwner: "-",
    lastActivity: "Nov 7th 2024",
    deletedDate: "Oct 16th 2024",
  },
  {
    id: "dc3",
    initials: "-",
    name: "-",
    cid: "CID: 10106",
    email: "maria_7182@yahoo.com",
    avatarBg: "bg-emerald-600",
    groupType: "_",
    clientOwner: "-",
    lastActivity: "Jul 2nd 2024",
    deletedDate: "Jul 2nd 2024",
  },
];

type SortDir = "asc" | "desc";
type SortCol = "basicInfo" | "groupType" | "clientOwner" | "lastActivity" | "deletedDate";

/* --- Context Menu (local) --- */
function DeletedContextMenu({
  x,
  y,
  onClose,
  onRestore,
  onDelete,
}: {
  x: number;
  y: number;
  onClose: () => void;
  onRestore: () => void;
  onDelete: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: y, left: x });

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const padding = 8;
    let newLeft = x;
    let newTop = y;
    if (x + rect.width + padding > window.innerWidth) newLeft = x - rect.width;
    if (newLeft < padding) newLeft = padding;
    if (y + rect.height + padding > window.innerHeight) newTop = y - rect.height;
    if (newTop < padding) newTop = padding;
    setPos({ top: newTop, left: newLeft });
  }, [x, y]);

  return (
    <div
      ref={ref}
      className="fixed z-50 bg-white rounded-lg border border-[var(--border-default)] shadow-lg py-1 min-w-[160px]"
      style={{ top: pos.top, left: pos.left }}
    >
      <button
        onClick={() => { onRestore(); onClose(); }}
        className="w-full text-left px-3 py-2 flex items-center gap-2 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--accent-text)] hover:bg-[var(--bg-hover)] cursor-pointer"
      >
        <Undo2 size={14} />
        Restore
      </button>
      <button
        onClick={() => { onDelete(); onClose(); }}
        className="w-full text-left px-3 py-2 flex items-center gap-2 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--danger)] hover:bg-[var(--danger-bg)] cursor-pointer"
      >
        <Trash2 size={14} />
        Delete
      </button>
    </div>
  );
}

/* --- Restore Modal --- */
function RestoreModal({
  open,
  onClose,
  onRestore,
}: {
  open: boolean;
  onClose: () => void;
  onRestore: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-[380px]">
        <div className="px-6 pt-5 pb-3">
          <h5
            className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)]"
            style={{ fontWeight: 600 }}
          >
            Restore Client
          </h5>
        </div>
        <div className="px-6 pb-5">
          <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
            Are you sure you want to restore this Client?
          </p>
        </div>
        <div className="flex justify-center px-6 pb-5">
          <button
            onClick={() => { onRestore(); onClose(); }}
            className="px-5 py-2 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer"
            style={{ fontWeight: 600 }}
          >
            Restore
          </button>
        </div>
      </div>
    </div>
  );
}

/* --- Permanent Delete Modal --- */
function PermanentDeleteModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-[420px]">
        <div className="px-6 pt-5 pb-3">
          <h5
            className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)]"
            style={{ fontWeight: 600 }}
          >
            Delete
          </h5>
        </div>
        <div className="px-6 pb-5">
          <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
            Are you sure you want to delete this user? All Acounts: Requests: Money Managers: and data that belongs to this user will be removed.
          </p>
        </div>
        <div className="flex gap-2 px-6 pb-5">
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="px-5 py-2 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer"
            style={{ fontWeight: 600 }}
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export function DeletedClientsPanel() {
  const [clients, setClients] = useState<DeletedClient[]>(mockDeletedClients);
  const [search, setSearch] = useState("");
  const [sortCol, setSortCol] = useState<SortCol>("deletedDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; client: DeletedClient } | null>(null);
  const [restoreModal, setRestoreModal] = useState<DeletedClient | null>(null);
  const [deleteModal, setDeleteModal] = useState<DeletedClient | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [page, setPage] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filtered = clients.filter((c) =>
    `${c.name} ${c.cid} ${c.email} ${c.groupType} ${c.clientOwner}`.toLowerCase().includes(search.toLowerCase())
  );

  function handleSort(col: SortCol) {
    if (sortCol === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  }

  function getSortValue(c: DeletedClient, col: SortCol): string {
    switch (col) {
      case "basicInfo": return c.name;
      case "groupType": return c.groupType;
      case "clientOwner": return c.clientOwner;
      case "lastActivity": return c.lastActivity;
      case "deletedDate": return c.deletedDate;
    }
  }

  const sorted = [...filtered].sort((a, b) => {
    const aVal = getSortValue(a, sortCol);
    const bVal = getSortValue(b, sortCol);
    const cmp = aVal.localeCompare(bVal);
    return sortDir === "asc" ? cmp : -cmp;
  });

  function handleRefresh() {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  }

  function handleRestore(client: DeletedClient) {
    setClients((prev) => prev.filter((c) => c.id !== client.id));
  }

  function handlePermanentDelete(client: DeletedClient) {
    setClients((prev) => prev.filter((c) => c.id !== client.id));
  }

  const columnDefs: { label: string; key: SortCol }[] = [
    { label: "Basic Info", key: "basicInfo" },
    { label: "Group Type", key: "groupType" },
    { label: "Client Owner", key: "clientOwner" },
    { label: "Last Activity", key: "lastActivity" },
    { label: "Deleted Date", key: "deletedDate" },
  ];

  function SortArrow({ col }: { col: SortCol }) {
    if (sortCol !== col) return null;
    return <span className="ml-1 text-[color:var(--text-muted)]">{sortDir === "asc" ? "↑" : "↓"}</span>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="px-5 pt-3 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[var(--slate-2)] rounded-lg h-8 px-2.5 w-[240px]">
            <Search size={14} className="text-[var(--text-muted)] shrink-0" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              placeholder="Search"
              className="flex-1 bg-transparent font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
          >
            <RotateCw size={14} className={`text-[var(--text-secondary)] ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
          <button className="h-8 px-2.5 flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      {(() => {
        const totalPages = Math.ceil(sorted.length / rowsPerPage);
        const paged = sorted.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
        const startIdx = sorted.length > 0 ? page * rowsPerPage + 1 : 0;
        const endIdx = Math.min((page + 1) * rowsPerPage, sorted.length);
        return (
          <div className="rounded-lg border border-[var(--border-default)] overflow-hidden mx-5 mb-4">
            <table className="w-full">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[var(--slate-3)] border-b border-[var(--border-default)]">
                  {columnDefs.map((col) => (
                    <th
                      key={col.key}
                      className="text-left py-2.5 px-5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold tracking-[-0.06px] leading-[1.3] cursor-pointer select-none hover:bg-[var(--bg-hover)] transition-colors"
                      onClick={() => handleSort(col.key)}
                    >
                      {col.label}
                      <SortArrow col={col.key} />
                    </th>
                  ))}
                  <th className="w-[52px]" />
                </tr>
              </thead>
              <tbody>
                {paged.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--bg-hover)] transition-colors"
                  >
                    {/* Basic Info */}
                    <td className="py-3 px-5">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg ${client.avatarBg} flex items-center justify-center shrink-0 mt-0.5`}
                        >
                          <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-white" style={{ fontWeight: 600 }}>
                            {client.initials}
                          </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
                            {client.name}
                          </span>
                          <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)]">
                            {client.cid}
                          </span>
                          <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)] truncate">
                            {client.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    {/* Group Type */}
                    <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">
                      {client.groupType}
                    </td>
                    {/* Client Owner */}
                    <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">
                      {client.clientOwner}
                    </td>
                    {/* Last Activity */}
                    <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">
                      {client.lastActivity}
                    </td>
                    {/* Deleted Date */}
                    <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">
                      {client.deletedDate}
                    </td>
                    {/* Actions */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={(e) => setContextMenu({ x: e.clientX, y: e.clientY, client })}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer transition-colors mx-auto"
                      >
                        <MoreVertical size={16} className="text-[var(--text-secondary)]" />
                      </button>
                    </td>
                  </tr>
                ))}
                {sorted.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-muted)]">
                      No deleted clients found.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={6} className="py-2.5 px-5 border-t border-[var(--border-default)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
                          Rows per page:
                        </span>
                        <select
                          value={rowsPerPage}
                          onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(0); }}
                          className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] bg-transparent outline-none cursor-pointer"
                        >
                          {[10, 25, 50, 100].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
                          {sorted.length > 0 ? `${startIdx}–${endIdx} of ${sorted.length}` : "0 of 0"}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            disabled={page === 0}
                            onClick={() => setPage((p) => p - 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer disabled:opacity-40 disabled:cursor-default transition-colors"
                          >
                            <ChevronLeft size={16} className="text-[var(--text-secondary)]" />
                          </button>
                          <button
                            disabled={page >= totalPages - 1}
                            onClick={() => setPage((p) => p + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer disabled:opacity-40 disabled:cursor-default transition-colors"
                          >
                            <ChevronRight size={16} className="text-[var(--text-secondary)]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      })()}

      {/* Context Menu */}
      {contextMenu && (
        <DeletedContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onRestore={() => setRestoreModal(contextMenu.client)}
          onDelete={() => setDeleteModal(contextMenu.client)}
        />
      )}

      {/* Restore Modal */}
      <RestoreModal
        open={!!restoreModal}
        onClose={() => setRestoreModal(null)}
        onRestore={() => restoreModal && handleRestore(restoreModal)}
      />

      {/* Permanent Delete Modal */}
      <PermanentDeleteModal
        open={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        onConfirm={() => deleteModal && handlePermanentDelete(deleteModal)}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   3. Client ID Range Panel
   ════════════════════════════════════════════════════════════════════ */
export function ClientIDRangePanel() {
  const [hasChanges, setHasChanges] = useState(false);
  const m = () => setHasChanges(true);

  return (
    <div className="py-8 px-5">
      <div className="w-full max-w-[640px] flex flex-col gap-10">
        {/* Range Configuration */}
        <div>
          <SectionHeading
            title="Range Configuration"
            description="Create ID ranges to be used for different categorisations and pools. Each range defines a unique segment of client identifiers."
          />
          <div className="flex flex-col gap-5">
            <InputField
              label="Client ID Range Name"
              placeholder="e.g. Default"
              defaultValue="Default"
              onChange={m}
            />
            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
              <InputField
                label="Start Range"
                type="number"
                defaultValue={12000}
                min={0}
                onChange={m}
              />
              <InputField
                label="End Range"
                type="number"
                defaultValue={20000}
                min={0}
                onChange={m}
              />
            </div>
            <SettingsRadioGroup
              label="API"
              value="Yes"
              options={["Yes", "No"]}
              onChange={m}
            />
          </div>
        </div>

        {/* Auto-Assignment */}
        <div>
          <SectionHeading
            title="Auto-Assignment"
            description="Control how new clients are automatically assigned IDs from the configured ranges."
          />
          <div className="flex flex-col gap-5">
            <SettingsToggleSwitch
              label="Auto-Assign Client IDs"
              description="Automatically assign the next available ID from the range during registration"
              checked={true}
              onChange={m}
            />
            <SettingsToggleSwitch
              label="Enforce Unique Ranges"
              description="Prevent overlapping ID ranges across different categorisations"
              checked={true}
              onChange={m}
            />
          </div>
        </div>

        <SaveButton visible={hasChanges} onSave={() => setHasChanges(false)} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   4. Account Types Panel — table + wizard modal (2-step: Basics → Permissions)
   ════════════════════════════════════════════════════════════════════ */
type AccountType = {
  id: string;
  name: string;
  displayName: string;
  server: string;
  serverBadgeColor: string;
  isDemo: boolean;
  isActive: boolean;
  islamic: boolean;
  imageUrl: string;
  description: string;
  leverages: string[];
  currencies: string[];
  defaultGroup: string;
  eurGroup: string;
  triggerGroup: string;
  allowLive: boolean;
  allowCopy: boolean;
  autoTrigger: boolean;
};

const mockAccountTypes: AccountType[] = [
  { id: "1", name: "Default AccType - Trade", displayName: "Standard", server: "Trade - MT4", serverBadgeColor: "bg-blue-100 text-blue-700", isDemo: false, isActive: true, islamic: false, imageUrl: "", description: "", leverages: ["1:50", "1:100", "1:200", "1:300"], currencies: ["USD", "EUR"], defaultGroup: "real\\standard\\usd", eurGroup: "real\\standard\\eur", triggerGroup: "", allowLive: true, allowCopy: false, autoTrigger: false },
  { id: "2", name: "Default AccType - demo:chsandbox2", displayName: "CTrader Demo", server: "demo:chsandbox2 - CTrader", serverBadgeColor: "bg-purple-100 text-purple-700", isDemo: false, isActive: true, islamic: false, imageUrl: "", description: "", leverages: ["1:100", "1:200"], currencies: ["USD"], defaultGroup: "", eurGroup: "", triggerGroup: "", allowLive: true, allowCopy: false, autoTrigger: false },
  { id: "3", name: "Default Server AccType", displayName: "Server Default", server: "Server - MT4", serverBadgeColor: "bg-amber-100 text-amber-700", isDemo: false, isActive: true, islamic: false, imageUrl: "", description: "", leverages: ["1:50", "1:100"], currencies: ["USD", "EUR", "GBP"], defaultGroup: "real\\default\\usd", eurGroup: "real\\default\\eur", triggerGroup: "", allowLive: true, allowCopy: true, autoTrigger: false },
  { id: "4", name: "MT5 Account Type", displayName: "MT5 Standard", server: "Demo - MT5", serverBadgeColor: "bg-emerald-100 text-emerald-700", isDemo: false, isActive: true, islamic: false, imageUrl: "", description: "", leverages: ["1:100", "1:200", "1:500"], currencies: ["USD", "EUR"], defaultGroup: "", eurGroup: "", triggerGroup: "", allowLive: true, allowCopy: false, autoTrigger: false },
  { id: "5", name: "Standard Account type", displayName: "Standard Plus", server: "Server - MT4", serverBadgeColor: "bg-amber-100 text-amber-700", isDemo: false, isActive: false, islamic: false, imageUrl: "", description: "", leverages: ["1:50", "1:100", "1:200", "1:300", "1:500"], currencies: ["USD"], defaultGroup: "real\\standard\\usd", eurGroup: "", triggerGroup: "real\\standard\\upgrade", allowLive: true, allowCopy: true, autoTrigger: true },
];

function AccountTypeWizardModal({
  acct,
  onClose,
  isNew,
}: {
  acct: AccountType | null;
  onClose: () => void;
  isNew: boolean;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [server, setServer] = useState(acct?.server ?? "Trade - MT4");
  const [name, setName] = useState(acct?.name ?? "");
  const [displayName, setDisplayName] = useState(acct?.displayName ?? "");
  const [islamic, setIslamic] = useState(acct?.islamic ? "Yes" : "No");
  const [isDemo, setIsDemo] = useState(acct?.isDemo ? "Yes" : "No");
  const [imageUrl, setImageUrl] = useState(acct?.imageUrl ?? "");
  const [description, setDescription] = useState(acct?.description ?? "");
  const [allowLive, setAllowLive] = useState(acct?.allowLive ?? true);
  const [allowCopy, setAllowCopy] = useState(acct?.allowCopy ?? false);

  const title = isNew ? "Create Account Type" : `Edit — ${acct?.name}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-[720px] max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
              {title}
            </h5>
            <div className="flex items-center gap-1.5 ml-2">
              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-[length:var(--text-xs)] font-['Inter',sans-serif] font-semibold ${step === 1 ? "bg-[var(--accent-solid)] text-white" : "bg-[var(--slate-3)] text-[color:var(--text-secondary)]"}`}>1</span>
              <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)]">—</span>
              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-[length:var(--text-xs)] font-['Inter',sans-serif] font-semibold ${step === 2 ? "bg-[var(--accent-solid)] text-white" : "bg-[var(--slate-3)] text-[color:var(--text-secondary)]"}`}>2</span>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer">
            <X size={16} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overlay-scrollbar p-6">
          <div className="max-w-[560px]">
            {step === 1 && (
              <div className="flex flex-col gap-5">
                <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
                  Step 1 — Basics
                </h6>
                <InputField
                  as="select"
                  label="Server"
                  value={server}
                  onChange={(e) => setServer(e.target.value)}
                >
                  {["Trade - MT4", "Server - MT4", "Demo - MT5", "demo:chsandbox2 - CTrader"].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </InputField>
                <InputField
                  label="Account Type Name"
                  placeholder="e.g. Standard Account Type"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <InputField
                  label="Account Type Display Name"
                  placeholder="e.g. Standard"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <SettingsRadioGroup
                  label="Islamic"
                  value={islamic}
                  options={["Yes", "No"]}
                  onChange={setIslamic}
                />
                <SettingsRadioGroup
                  label="Demo Account"
                  value={isDemo}
                  options={["Yes", "No"]}
                  onChange={setIsDemo}
                />
                <div className="flex flex-col gap-[6px]">
                  <div
                    className="relative bg-[var(--bg-raised)] rounded-lg border border-dashed border-[var(--border-default)] hover:border-[var(--indigo-7)] transition-colors cursor-pointer flex items-center h-[56px] px-4 gap-3"
                    onClick={() => document.getElementById('account-type-image-upload')?.click()}
                  >
                    <input
                      id="account-type-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImageUrl(file.name);
                        }
                      }}
                    />
                    {imageUrl ? (
                      <>
                        <div className="w-8 h-8 rounded bg-[var(--slate-3)] flex items-center justify-center overflow-hidden shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)]">
                            Upload Account Type Image
                          </span>
                          <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] truncate">
                            {imageUrl}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-8 h-8 rounded bg-[var(--indigo-3)] flex items-center justify-center shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--indigo-11)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        </div>
                        <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-muted)]">
                          Upload Account Type Image
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <InputField
                  label="Description"
                  placeholder="Enter a description for this account type..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-5">
                <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
                  Step 2 — Permissions
                </h6>
                <SettingsToggleSwitch
                  label="Allow Live Trading"
                  description="Enable live trading for accounts of this type"
                  checked={allowLive}
                  onChange={setAllowLive}
                />
                <SettingsToggleSwitch
                  label="Allow Copy Trading"
                  description="Enable copy trading functionality for this account type"
                  checked={allowCopy}
                  onChange={setAllowCopy}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-between shrink-0">
          <div>
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="h-8 px-4 flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
              >
                <ChevronLeft size={14} />
                Previous
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="h-8 px-4 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
              Cancel
            </button>
            {step === 1 ? (
              <button
                onClick={() => setStep(2)}
                className="h-8 px-4 flex items-center gap-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors"
              >
                Next
                <ChevronRight size={14} />
              </button>
            ) : (
              <button onClick={onClose} className="h-8 px-4 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors">
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AccountTypesPanel() {
  const [selectedAcct, setSelectedAcct] = useState<AccountType | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; a: AccountType } | null>(null);
  const [search, setSearch] = useState("");

  const columns = ["Account Type", "Server Name", "Demo", "Status"];

  const filtered = mockAccountTypes.filter((a) =>
    `${a.name} ${a.server}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Toolbar */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-[var(--slate-2)] rounded-lg h-8 px-2.5 w-[240px]">
          <Search size={14} className="text-[var(--text-muted)] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search account types..."
            className="flex-1 bg-transparent font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer">
            <Download size={14} />
            Export
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="h-8 px-3 flex items-center gap-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer"
          >
            <Plus size={14} />
            Add new Account Type
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--border-default)] overflow-hidden mx-5 mb-4">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[var(--slate-3)] border-b border-[var(--border-default)]">
              {columns.map((col) => (
                <th key={col} className="text-left py-2.5 px-5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold tracking-[-0.06px] leading-[1.3]">
                  {col}
                </th>
              ))}
              <th className="w-[52px]" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr
                key={a.id}
                onClick={() => setSelectedAcct(a)}
                className="border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
              >
                <td className="py-3 px-5">
                  <div className="flex items-center gap-2">
                    <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--indigo-11)] hover:text-[color:var(--indigo-12)] font-semibold cursor-pointer transition-colors">{a.name}</span>
                  </div>
                </td>
                <td className="py-3 px-5">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-['Inter',sans-serif] text-[length:var(--text-xs)] font-semibold ${a.serverBadgeColor}`}>
                    {a.server}
                  </span>
                </td>
                <td className="py-3 px-5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-['Inter',sans-serif] text-[length:var(--text-xs)] font-semibold ${a.isDemo ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                    {a.isDemo ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-3 px-5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-['Inter',sans-serif] text-[length:var(--text-xs)] font-semibold ${a.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                    {a.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 px-5">
                  <button
                    onClick={(e) => { e.stopPropagation(); setContextMenu({ x: e.clientX, y: e.clientY, a }); }}
                    className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-muted)] cursor-pointer"
                  >
                    <MoreVertical size={15} className="text-[var(--text-muted)]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Context menu */}
        {contextMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setContextMenu(null)} />
            <div
              className="fixed z-50 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg shadow-lg py-1 min-w-[120px]"
              style={{ top: contextMenu.y, left: contextMenu.x }}
            >
              <button
                onClick={() => { setSelectedAcct(contextMenu.a); setContextMenu(null); }}
                className="w-full px-3 py-1.5 text-left font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] hover:bg-[var(--bg-hover)] cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => setContextMenu(null)}
                className="w-full px-3 py-1.5 text-left font-['Inter',sans-serif] text-[length:var(--text-sm)] text-red-500 hover:bg-red-50 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* Edit modal */}
      {selectedAcct && (
        <AccountTypeWizardModal acct={selectedAcct} onClose={() => setSelectedAcct(null)} isNew={false} />
      )}

      {/* Add modal */}
      {showAdd && (
        <AccountTypeWizardModal acct={null} onClose={() => setShowAdd(false)} isNew={true} />
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   5. Pools Panel — table + modal (Create / Edit / Delete)
   ════════════════════════════════════════════════════════════════════ */
type Pool = {
  id: number;
  name: string;
  isDefault: boolean;
  accountTypes: string[];
  activationOnSignup: boolean;
  demoPermitted: boolean;
  tradingCreationPermitted: boolean;
  walletPermitted: boolean;
};

const mockPools: Pool[] = [
  { id: 1, name: "Default Pool", isDefault: true, accountTypes: ["Standard", "ECN", "Cent", "Islamic", "Demo Standard"], activationOnSignup: true, demoPermitted: true, tradingCreationPermitted: true, walletPermitted: true },
  { id: 2, name: "hamad pool", isDefault: false, accountTypes: ["Standard"], activationOnSignup: false, demoPermitted: false, tradingCreationPermitted: true, walletPermitted: false },
  { id: 3, name: "New pool", isDefault: false, accountTypes: ["ECN", "VIP"], activationOnSignup: false, demoPermitted: true, tradingCreationPermitted: true, walletPermitted: false },
  { id: 4, name: "test pool acctype", isDefault: false, accountTypes: ["Cent"], activationOnSignup: false, demoPermitted: false, tradingCreationPermitted: false, walletPermitted: false },
];

const allAccountTypeOptions = ["Standard", "ECN", "Cent", "Islamic", "Demo Standard", "VIP"];

function PoolModal({
  pool,
  onClose,
  isNew,
}: {
  pool: Pool | null;
  onClose: () => void;
  isNew: boolean;
}) {
  const [name, setName] = useState(pool?.name ?? "");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(pool?.accountTypes ?? []);
  const [isDefault, setIsDefault] = useState(pool?.isDefault ?? false);
  const [activationOnSignup, setActivationOnSignup] = useState(pool?.activationOnSignup ?? false);
  const [demoPermitted, setDemoPermitted] = useState(pool?.demoPermitted ?? false);
  const [tradingCreationPermitted, setTradingCreationPermitted] = useState(pool?.tradingCreationPermitted ?? false);
  const [walletPermitted, setWalletPermitted] = useState(pool?.walletPermitted ?? false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  const title = isNew ? "Create a new Pool" : `Edit — ${pool?.name}`;

  const toggleType = (t: string) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-[720px] max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)] flex items-center justify-between shrink-0">
          <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
            {title}
          </h5>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer">
            <X size={16} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overlay-scrollbar p-6">
          <div className="max-w-[560px] flex flex-col gap-5">
            <InputField
              label="Pool Name"
              placeholder="Pool Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Account Types multi-select */}
            <div className="flex flex-col gap-[6px]">
              <div className="relative">
                <div
                  onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                  className="w-full min-h-[56px] px-4 pt-7 pb-1.5 pr-10 rounded-lg border border-[var(--border-default)] bg-[var(--bg-raised)] font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] outline-none cursor-pointer flex flex-wrap items-center gap-1.5 relative"
                >
                  <span className="absolute left-4 top-2 font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] pointer-events-none">
                    Account Types
                  </span>
                  {selectedTypes.length === 0 && (
                    <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-muted)]">
                      Account Types
                    </span>
                  )}
                  {selectedTypes.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--slate-3)] font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-primary)]"
                    >
                      <span className="max-w-[80px] truncate">{t}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleType(t); }}
                        className="hover:text-red-500 cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  {selectedTypes.length > 3 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-[var(--indigo-3)] font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--indigo-11)] font-semibold">
                      +{selectedTypes.length - 3}
                    </span>
                  )}
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none" />
                </div>
                {typeDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setTypeDropdownOpen(false)} />
                    <div className="absolute left-0 right-0 top-full mt-1 z-20 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg shadow-lg py-1 max-h-[200px] overflow-y-auto">
                      {allAccountTypeOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => toggleType(opt)}
                          className={`w-full px-3 py-2 text-left font-['Inter',sans-serif] text-[length:var(--text-sm)] cursor-pointer flex items-center gap-2 hover:bg-[var(--bg-hover)] ${selectedTypes.includes(opt) ? "text-[color:var(--indigo-11)]" : "text-[color:var(--text-primary)]"}`}
                        >
                          <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${selectedTypes.includes(opt) ? "bg-[var(--accent-solid)] border-[var(--accent-solid)]" : "border-[var(--border-default)]"}`}>
                            {selectedTypes.includes(opt) && (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            )}
                          </span>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <SettingsToggleSwitch
              label="Set as Default"
              description="Make this the default pool for new accounts"
              checked={isDefault}
              onChange={setIsDefault}
            />
            <SettingsToggleSwitch
              label="Activation Upon Signup"
              description="Automatically activate accounts when clients complete registration"
              checked={activationOnSignup}
              onChange={setActivationOnSignup}
            />
            <SettingsToggleSwitch
              label="Demo Account Permitted"
              description="Allow demo account creation within this pool"
              checked={demoPermitted}
              onChange={setDemoPermitted}
            />
            <SettingsToggleSwitch
              label="Trading Accounts Creation Permitted"
              description="Allow clients to create new trading accounts in this pool"
              checked={tradingCreationPermitted}
              onChange={setTradingCreationPermitted}
            />
            <SettingsToggleSwitch
              label="Access To Wallet Permitted"
              description="Allow clients to access wallet functionality within this pool"
              checked={walletPermitted}
              onChange={setWalletPermitted}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-end gap-2 shrink-0">
          <button onClick={onClose} className="h-8 px-4 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="h-8 px-4 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors">
            {isNew ? "Create Pool" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PoolDeleteModal({
  pool,
  onClose,
  onConfirm,
}: {
  pool: Pool;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-[420px] flex flex-col">
        <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)] flex items-center justify-between shrink-0">
          <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
            Delete
          </h5>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer">
            <X size={16} className="text-[var(--text-secondary)]" />
          </button>
        </div>
        <div className="p-6">
          <div className="bg-[var(--slate-2)] rounded-lg px-4 py-3">
            <p className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">
              Are you sure you want to delete this pool?
            </p>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-end gap-2 shrink-0">
          <button onClick={onClose} className="h-8 px-4 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors">
            No
          </button>
          <button onClick={() => { onConfirm(); onClose(); }} className="h-8 px-4 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export function PoolsPanel() {
  const [pools, setPools] = useState<Pool[]>(mockPools);
  const [search, setSearch] = useState("");
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deletePool, setDeletePool] = useState<Pool | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; p: Pool } | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = pools
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortDir === "asc" ? a.id - b.id : b.id - a.id);

  const handleDelete = (pool: Pool) => {
    setPools((prev) => prev.filter((p) => p.id !== pool.id));
  };

  return (
    <div>
      {/* Subtitle */}
      

      {/* Toolbar */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border-default)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
            <RotateCw size={14} className="text-[var(--text-secondary)]" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border-default)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
            <ExternalLink size={14} className="text-[var(--text-secondary)]" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[var(--slate-2)] rounded-lg h-8 px-2.5 w-[220px]">
            <Search size={14} className="text-[var(--text-muted)] shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
            />
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="h-8 px-3 flex items-center gap-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer"
          >
            <Plus size={14} />
            New Pool
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[var(--border-default)] overflow-hidden mx-5 mb-4">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[var(--slate-3)] border-b border-[var(--border-default)]">
              <th className="text-left py-2.5 px-5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold tracking-[-0.06px] leading-[1.3]">
                Pool Name
              </th>
              <th
                onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                className="text-left py-2.5 px-5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold tracking-[-0.06px] leading-[1.3] cursor-pointer select-none"
              >
                Pool ID {sortDir === "asc" ? "↓" : "↑"}
              </th>
              <th className="text-left py-2.5 px-5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold tracking-[-0.06px] leading-[1.3]">
                Default
              </th>
              <th className="w-[52px]" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                onClick={() => setSelectedPool(p)}
                className="border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
              >
                <td className="py-3 px-5">
                  <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--indigo-11)] hover:text-[color:var(--indigo-12)] font-semibold cursor-pointer transition-colors">
                    {p.name}
                  </span>
                </td>
                <td className="py-3 px-5">
                  <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">
                    {p.id}
                  </span>
                </td>
                <td className="py-3 px-5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-['Inter',sans-serif] text-[length:var(--text-xs)] font-semibold ${p.isDefault ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                    {p.isDefault ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-3 px-5">
                  <button
                    onClick={(e) => { e.stopPropagation(); setContextMenu({ x: e.clientX, y: e.clientY, p }); }}
                    className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-muted)] cursor-pointer"
                  >
                    <MoreVertical size={15} className="text-[var(--text-muted)]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-5 pb-4 flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)]">Rows per page:</span>
          <select className="bg-transparent font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-primary)] outline-none cursor-pointer border-none" defaultValue="100">
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)]">
          1–{filtered.length} of {filtered.length}
        </span>
        <div className="flex items-center gap-1">
          <button disabled className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-muted)] opacity-40 cursor-not-allowed">
            <ChevronLeft size={16} />
          </button>
          <button disabled className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-muted)] opacity-40 cursor-not-allowed">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Context menu */}
      {contextMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setContextMenu(null)} />
          <div
            className="fixed z-50 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg shadow-lg py-1 min-w-[120px]"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <button
              onClick={() => { setSelectedPool(contextMenu.p); setContextMenu(null); }}
              className="w-full px-3 py-1.5 text-left font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] hover:bg-[var(--bg-hover)] cursor-pointer flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--indigo-11)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button
              onClick={() => { setDeletePool(contextMenu.p); setContextMenu(null); }}
              className="w-full px-3 py-1.5 text-left font-['Inter',sans-serif] text-[length:var(--text-sm)] text-red-500 hover:bg-red-50 cursor-pointer flex items-center gap-2"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </>
      )}

      {/* Edit modal */}
      {selectedPool && (
        <PoolModal pool={selectedPool} onClose={() => setSelectedPool(null)} isNew={false} />
      )}

      {/* Add modal */}
      {showAdd && (
        <PoolModal pool={null} onClose={() => setShowAdd(false)} isNew={true} />
      )}

      {/* Delete confirmation */}
      {deletePool && (
        <PoolDeleteModal
          pool={deletePool}
          onClose={() => setDeletePool(null)}
          onConfirm={() => handleDelete(deletePool)}
        />
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   6. Wallet Types Panel  — table + wizard modal (2-step: Basics → Permissions)
   ════════════════════════════════════════════════════════════════════ */
type WalletType = {
  id: string;
  categoryName: string;
  typeName: string;
  isDefault: boolean;
  creationDate: string;
  type: string;
  currencies: string[];
  allowDeposit: boolean;
  allowWithdrawal: boolean;
  allowTransfer: boolean;
  allowExchange: boolean;
  payoutAllocation: boolean;
};

const mockWalletTypes: WalletType[] = [
  { id: "1", categoryName: "My Wallet", typeName: "My Wallet", isDefault: true, creationDate: "Feb 9th 2023", type: "My Wallet", currencies: ["USD", "EUR"], allowDeposit: true, allowWithdrawal: true, allowTransfer: true, allowExchange: true, payoutAllocation: false },
  { id: "2", categoryName: "CopyTrade", typeName: "Performance Wallet CopyTrade", isDefault: true, creationDate: "Dec 29th 2023", type: "Performance Wallet", currencies: ["USD"], allowDeposit: false, allowWithdrawal: true, allowTransfer: false, allowExchange: false, payoutAllocation: true },
  { id: "3", categoryName: "MAM Wallet", typeName: "Performance Wallet MAM", isDefault: true, creationDate: "May 29th 2023", type: "Performance Wallet", currencies: ["USD", "EUR"], allowDeposit: false, allowWithdrawal: true, allowTransfer: false, allowExchange: false, payoutAllocation: true },
  { id: "4", categoryName: "Performance Wallet", typeName: "Performance Wallet Select", isDefault: true, creationDate: "Feb 9th 2023", type: "Performance Wallet", currencies: ["USD"], allowDeposit: false, allowWithdrawal: true, allowTransfer: false, allowExchange: false, payoutAllocation: true },
  { id: "5", categoryName: "Profit Share Wallet", typeName: "Profit Share Wallet", isDefault: true, creationDate: "Feb 9th 2023", type: "Profit Share", currencies: ["USD", "EUR", "GBP"], allowDeposit: false, allowWithdrawal: true, allowTransfer: true, allowExchange: false, payoutAllocation: false },
  { id: "6", categoryName: "Rebate Wallet", typeName: "Rebate Wallet", isDefault: true, creationDate: "Feb 9th 2023", type: "Rebate", currencies: ["USD"], allowDeposit: false, allowWithdrawal: true, allowTransfer: true, allowExchange: false, payoutAllocation: false },
];

function WalletTypeWizardModal({
  wallet,
  onClose,
  isNew,
}: {
  wallet: WalletType | null;
  onClose: () => void;
  isNew: boolean;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [categoryName, setCategoryName] = useState(wallet?.categoryName ?? "");
  const [type, setType] = useState(wallet?.type ?? "My Wallet");
  const [isDefault, setIsDefault] = useState(wallet?.isDefault ? "Yes" : "No");
  const [allowDeposit, setAllowDeposit] = useState(wallet?.allowDeposit ?? true);
  const [allowWithdrawal, setAllowWithdrawal] = useState(wallet?.allowWithdrawal ?? true);
  const [allowTransfer, setAllowTransfer] = useState(wallet?.allowTransfer ?? true);
  const [allowExchange, setAllowExchange] = useState(wallet?.allowExchange ?? false);
  const [payoutAllocation, setPayoutAllocation] = useState(wallet?.payoutAllocation ?? false);

  const title = isNew ? "Create Wallet Type" : `Edit — ${wallet?.categoryName}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-[720px] max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
              {title}
            </h5>
            {/* Step indicator */}
            <div className="flex items-center gap-1.5 ml-2">
              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-[length:var(--text-xs)] font-['Inter',sans-serif] font-semibold ${step === 1 ? "bg-[var(--accent-solid)] text-white" : "bg-[var(--slate-3)] text-[color:var(--text-secondary)]"}`}>1</span>
              <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)]">—</span>
              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-[length:var(--text-xs)] font-['Inter',sans-serif] font-semibold ${step === 2 ? "bg-[var(--accent-solid)] text-white" : "bg-[var(--slate-3)] text-[color:var(--text-secondary)]"}`}>2</span>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer">
            <X size={16} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overlay-scrollbar p-6">
          <div className="max-w-[560px]">
            {step === 1 && (
              <div className="flex flex-col gap-5">
                <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
                  Step 1 — Basics
                </h6>
                <InputField
                  label="Category Name"
                  placeholder="e.g. My Wallet, CopyTrade"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <SettingsSelect
                  label="Type"
                  value={type}
                  options={["My Wallet", "Performance Wallet", "Profit Share", "Rebate", "Commission"]}
                  onChange={setType}
                />
                <SettingsMultiSelect
                  label="Currency"
                  selected={wallet?.currencies ?? ["USD"]}
                  options={["USD", "EUR", "GBP", "JPY", "CHF", "AUD", "CAD", "BTC", "ETH", "USDT"]}
                  onChange={() => {}}
                />
                <SettingsRadioGroup
                  label="Set as Default"
                  value={isDefault}
                  options={["Yes", "No"]}
                  onChange={setIsDefault}
                />
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-5">
                <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
                  Step 2 — Permissions
                </h6>
                <SettingsRadioGroup
                  label="Allow Deposit From Wallet"
                  value={allowDeposit ? "Yes" : "No"}
                  options={["Yes", "No"]}
                  onChange={(v) => setAllowDeposit(v === "Yes")}
                />
                <SettingsRadioGroup
                  label="Allow Withdrawals From Wallet"
                  value={allowWithdrawal ? "Yes" : "No"}
                  options={["Yes", "No"]}
                  onChange={(v) => setAllowWithdrawal(v === "Yes")}
                />
                <SettingsRadioGroup
                  label="Allow Transfer From Wallet"
                  value={allowTransfer ? "Yes" : "No"}
                  options={["Yes", "No"]}
                  onChange={(v) => setAllowTransfer(v === "Yes")}
                />
                <SettingsRadioGroup
                  label="Allow Exchange"
                  value={allowExchange ? "Yes" : "No"}
                  options={["Yes", "No"]}
                  onChange={(v) => setAllowExchange(v === "Yes")}
                />
                <SettingsRadioGroup
                  label="Payout Account Allocation Permitted"
                  value={payoutAllocation ? "Yes" : "No"}
                  options={["Yes", "No"]}
                  onChange={(v) => setPayoutAllocation(v === "Yes")}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-between shrink-0">
          <div>
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="h-8 px-4 flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
              >
                <ChevronLeft size={14} />
                Previous
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="h-8 px-4 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
              Cancel
            </button>
            {step === 1 ? (
              <button
                onClick={() => setStep(2)}
                className="h-8 px-4 flex items-center gap-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors"
              >
                Next
                <ChevronRight size={14} />
              </button>
            ) : (
              <button onClick={onClose} className="h-8 px-4 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors">
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WalletTypesPanel() {
  const [selectedWallet, setSelectedWallet] = useState<WalletType | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; w: WalletType } | null>(null);
  const [search, setSearch] = useState("");

  const columns = ["Category Name", "Type Name", "Default", "Creation Date"];

  const filtered = mockWalletTypes.filter((w) =>
    `${w.categoryName} ${w.typeName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Toolbar */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-[var(--slate-2)] rounded-lg h-8 px-2.5 w-[240px]">
          <Search size={14} className="text-[var(--text-muted)] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search wallet types..."
            className="flex-1 bg-transparent font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer">
            <Download size={14} />
            Export
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="h-8 px-3 flex items-center gap-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer"
          >
            <Plus size={14} />
            Add new Wallet Type
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--border-default)] overflow-hidden mx-5 mb-4">
        {/* Table */}
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[var(--slate-3)] border-b border-[var(--border-default)]">
              {columns.map((col) => (
                <th key={col} className="text-left py-2.5 px-5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold tracking-[-0.06px] leading-[1.3]">
                  {col}
                </th>
              ))}
              <th className="w-[52px]" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((w) => (
              <tr
                key={w.id}
                onClick={() => setSelectedWallet(w)}
                className="border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
              >
                <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--indigo-11)] hover:text-[color:var(--indigo-12)] font-semibold cursor-pointer transition-colors">{w.categoryName}</td>
                <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{w.typeName}</td>
                <td className="py-3 px-5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-['Inter',sans-serif] text-[length:var(--text-xs)] font-semibold ${w.isDefault ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                    {w.isDefault ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{w.creationDate}</td>
                <td className="py-3 px-5">
                  <button
                    onClick={(e) => { e.stopPropagation(); setContextMenu({ x: e.clientX, y: e.clientY, w }); }}
                    className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-muted)] cursor-pointer"
                  >
                    <MoreVertical size={15} className="text-[var(--text-muted)]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Context menu */}
        {contextMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setContextMenu(null)} />
            <div
              className="fixed z-50 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg shadow-lg py-1 min-w-[120px]"
              style={{ top: contextMenu.y, left: contextMenu.x }}
            >
              <button
                onClick={() => { setSelectedWallet(contextMenu.w); setContextMenu(null); }}
                className="w-full px-3 py-1.5 text-left font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] hover:bg-[var(--bg-hover)] cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => setContextMenu(null)}
                className="w-full px-3 py-1.5 text-left font-['Inter',sans-serif] text-[length:var(--text-sm)] text-red-500 hover:bg-red-50 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* Edit modal */}
      {selectedWallet && (
        <WalletTypeWizardModal wallet={selectedWallet} onClose={() => setSelectedWallet(null)} isNew={false} />
      )}

      {/* Add modal */}
      {showAdd && (
        <WalletTypeWizardModal wallet={null} onClose={() => setShowAdd(false)} isNew={true} />
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   7. Registration Panel — data table (Type, Default, Creation Date, Link, Actions)
   ═══════��══════════════════════════════════════════════��═════════════ */

type Registration = {
  id: number;
  type: string;
  isDefault: boolean;
  creationDate: string;
  hasLink: boolean;
};

const mockRegistrations: Registration[] = [
  { id: 1, type: "Trader", isDefault: true, creationDate: "Jun 14th 2024", hasLink: true },
  { id: 2, type: "Copier", isDefault: false, creationDate: "Jun 18th 2024", hasLink: true },
  { id: 3, type: "Investor", isDefault: false, creationDate: "Sep 11th 2024", hasLink: true },
  { id: 4, type: "Provider", isDefault: false, creationDate: "Jan 10th 2025", hasLink: true },
  { id: 5, type: "MoneyManager", isDefault: false, creationDate: "Jan 17th 2025", hasLink: true },
  { id: 6, type: "IB", isDefault: false, creationDate: "Feb 21st 2025", hasLink: true },
  { id: 7, type: "Public agent", isDefault: false, creationDate: "Nov 1st 2025", hasLink: false },
];

function RegistrationDeleteModal({
  reg,
  onClose,
  onConfirm,
}: {
  reg: Registration;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-[420px] flex flex-col">
        <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)] flex items-center justify-between shrink-0">
          <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
            Delete
          </h5>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer">
            <X size={16} className="text-[var(--text-secondary)]" />
          </button>
        </div>
        <div className="p-6">
          <div className="bg-[var(--slate-2)] rounded-lg px-4 py-3">
            <p className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">
              Are you sure you want to delete the <span style={{ fontWeight: 600 }}>{reg.type}</span> registration type?
            </p>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-end gap-2 shrink-0">
          <button onClick={onClose} className="h-8 px-4 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors">
            No
          </button>
          <button onClick={() => { onConfirm(); onClose(); }} className="h-8 px-4 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Registration Detail Modal types ── */

const REG_TYPE_OPTIONS = ["Trader", "IB", "Investor", "MoneyManager", "Copier", "Provider", "Public Agent"] as const;

const REG_LANGUAGE_OPTIONS = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "zh", label: "Chinese", flag: "🇨🇳" },
  { code: "ar", label: "Arabic", flag: "🇦🇪" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
  { code: "th", label: "Thai", flag: "🇹🇭" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "it", label: "Italian", flag: "🇮🇹" },
  { code: "ko", label: "Korean", flag: "🇰🇷" },
  { code: "vi", label: "Vietnamese", flag: "🇻🇳" },
  { code: "zh-TW", label: "Chinese (Traditional)", flag: "🇨🇳" },
  { code: "en2", label: "English", flag: "" },
  { code: "ms", label: "Malay", flag: "🇲🇾" },
] as const;

const BODY_FIELD_OPTIONS = ["FullName", "FirstName", "LastName", "Country", "PhoneNumber", "Confirmation"] as const;

interface RegFormField {
  id: string;
  name: string;
  required: boolean;
  removable: boolean;
}

interface RegFormData {
  type: string;
  language: string;
  setAsDefault: boolean;
  loginDirectly: boolean;
  emailVerification: boolean;
  headerContent: string;
  bodyFields: RegFormField[];
  footerContent: string;
  successFormDesc: string;
}

const defaultRegFormData: RegFormData = {
  type: "Trader",
  language: "en",
  setAsDefault: false,
  loginDirectly: false,
  emailVerification: false,
  headerContent: "",
  bodyFields: [
    { id: "email", name: "Email", required: true, removable: false },
    { id: "password", name: "Password", required: true, removable: false },
  ],
  footerContent: "",
  successFormDesc: "",
};

/* Mock saved data for existing registrations */
const mockRegFormStore: Record<string, Partial<RegFormData>> = {
  Trader: { type: "Trader", setAsDefault: true, language: "en", headerContent: "Welcome to Trader registration", bodyFields: [
    { id: "email", name: "Email", required: true, removable: false },
    { id: "password", name: "Password", required: true, removable: false },
    { id: "f-fn", name: "FullName", required: true, removable: true },
    { id: "f-cn", name: "Country", required: false, removable: true },
  ]},
  Copier: { type: "Copier", language: "en" },
  Investor: { type: "Investor", language: "en" },
  Provider: { type: "Provider", language: "en" },
  MoneyManager: { type: "MoneyManager", language: "en" },
  IB: { type: "IB", language: "en" },
  "Public agent": { type: "Public Agent", language: "en" },
};

function RegistrationDetailModal({
  editingReg,
  onClose,
  onSave,
}: {
  editingReg: Registration | null; // null = creating new
  onClose: () => void;
  onSave: (reg: Registration, form: RegFormData) => void;
}) {
  const isEdit = editingReg !== null;
  const savedData = isEdit ? mockRegFormStore[editingReg.type] : undefined;

  const [form, setForm] = useState<RegFormData>(() => {
    if (savedData) {
      return { ...defaultRegFormData, ...savedData };
    }
    return { ...defaultRegFormData };
  });
  const [showFieldPicker, setShowFieldPicker] = useState(false);
  const fieldPickerRef = useRef<HTMLDivElement>(null);
  let nextFieldId = useRef(100);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (fieldPickerRef.current && !fieldPickerRef.current.contains(e.target as Node)) {
        setShowFieldPicker(false);
      }
    }
    if (showFieldPicker) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFieldPicker]);

  const updateField = <K extends keyof RegFormData>(key: K, value: RegFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addBodyField = (fieldName: string) => {
    nextFieldId.current += 1;
    setForm((prev) => ({
      ...prev,
      bodyFields: [
        ...prev.bodyFields,
        { id: `f-${nextFieldId.current}`, name: fieldName, required: false, removable: true },
      ],
    }));
    setShowFieldPicker(false);
  };

  const removeBodyField = (id: string) =>
    setForm((prev) => ({ ...prev, bodyFields: prev.bodyFields.filter((f) => f.id !== id) }));

  const toggleFieldRequired = (id: string) =>
    setForm((prev) => ({
      ...prev,
      bodyFields: prev.bodyFields.map((f) => (f.id === id ? { ...f, required: !f.required } : f)),
    }));

  const renameField = (id: string, name: string) =>
    setForm((prev) => ({
      ...prev,
      bodyFields: prev.bodyFields.map((f) => (f.id === id ? { ...f, name } : f)),
    }));

  const handleSave = () => {
    const now = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const day = now.getDate();
    const suffix = day === 1 || day === 21 || day === 31 ? "st" : day === 2 || day === 22 ? "nd" : day === 3 || day === 23 ? "rd" : "th";
    const dateStr = `${months[now.getMonth()]} ${day}${suffix} ${now.getFullYear()}`;

    if (isEdit) {
      onSave(
        { ...editingReg, isDefault: form.setAsDefault },
        form,
      );
    } else {
      const newReg: Registration = {
        id: Date.now(),
        type: form.type,
        isDefault: form.setAsDefault,
        creationDate: dateStr,
        hasLink: form.type !== "Public Agent",
      };
      onSave(newReg, form);
    }
    onClose();
  };

  /* Available fields = options not yet in the body */
  const usedFieldNames = new Set(form.bodyFields.map((f) => f.name));
  const availableFields = BODY_FIELD_OPTIONS.filter((f) => !usedFieldNames.has(f));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-[720px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)] flex items-center justify-between shrink-0">
          <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
            {isEdit ? "Edit Registration Template" : "New Registration Template"}
          </h5>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer">
            <X size={16} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* ── 1. Settings Section ── */}
          <div className="rounded-lg bg-[var(--slate-2)] p-5 space-y-4">
            {/* Type */}
            <InputField
              as="select"
              label="Type"
              value={form.type}
              onChange={(e) => updateField("type", (e.target as HTMLSelectElement).value)}
              disabled={isEdit}
            >
              {REG_TYPE_OPTIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </InputField>

            {/* Language */}
            <InputField
              as="select"
              label="Language"
              value={form.language}
              onChange={(e) => updateField("language", (e.target as HTMLSelectElement).value)}
            >
              {REG_LANGUAGE_OPTIONS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag ? `${l.flag} ${l.label}` : l.label}
                </option>
              ))}
            </InputField>

            {/* Toggles */}
            <div className="space-y-3 pt-1">
              <SettingsToggleSwitch
                label="Set as default"
                checked={form.setAsDefault}
                onChange={(v) => updateField("setAsDefault", v)}
              />
              <SettingsToggleSwitch
                label="Login directly after registration"
                checked={form.loginDirectly}
                onChange={(v) => updateField("loginDirectly", v)}
              />
              <SettingsToggleSwitch
                label="Enable Email Verification"
                checked={form.emailVerification}
                onChange={(v) => updateField("emailVerification", v)}
              />
            </div>
          </div>

          {/* ── 2. Header Section ── */}
          <div>
            <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] mb-1" style={{ fontWeight: 600 }}>
              Header
            </h6>
            <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-3">
              You can add header content.
            </p>
            {isEdit ? (
              /* Edit mode: rich text editor toolbar + textarea */
              <div className="border border-[var(--border-default)] rounded-lg overflow-hidden">
                <div className="flex items-center gap-0.5 px-2 py-1.5 bg-[var(--slate-2)] border-b border-[var(--border-default)]">
                  <select className="h-7 px-2 rounded text-[length:var(--text-sm)] font-['Inter',sans-serif] bg-transparent border border-[var(--border-default)] text-[color:var(--text-primary)] cursor-pointer outline-none">
                    <option>Normal</option>
                    <option>Heading 1</option>
                    <option>Heading 2</option>
                    <option>Heading 3</option>
                  </select>
                  <div className="w-px h-5 bg-[var(--border-default)] mx-1" />
                  <button type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-[var(--bg-hover)] cursor-pointer">
                    <Bold size={14} className="text-[var(--text-secondary)]" />
                  </button>
                  <button type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-[var(--bg-hover)] cursor-pointer">
                    <Italic size={14} className="text-[var(--text-secondary)]" />
                  </button>
                  <button type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-[var(--bg-hover)] cursor-pointer">
                    <Underline size={14} className="text-[var(--text-secondary)]" />
                  </button>
                  <button type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-[var(--bg-hover)] cursor-pointer">
                    <Strikethrough size={14} className="text-[var(--text-secondary)]" />
                  </button>
                  <button type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-[var(--bg-hover)] cursor-pointer">
                    <Link size={14} className="text-[var(--text-secondary)]" />
                  </button>
                </div>
                <textarea
                  value={form.headerContent}
                  onChange={(e) => updateField("headerContent", e.target.value)}
                  placeholder="You can add header content."
                  className="w-full min-h-[80px] p-3 bg-transparent font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] outline-none resize-y placeholder:text-[var(--text-muted)]"
                />
              </div>
            ) : (
              <textarea
                value={form.headerContent}
                onChange={(e) => updateField("headerContent", e.target.value)}
                placeholder="You can add header content."
                className="w-full min-h-[80px] p-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-raised)] font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] outline-none resize-y placeholder:text-[var(--text-muted)] focus:border-[var(--indigo-7)]"
              />
            )}
          </div>

          {/* ── 3. Body Section ── */}
          <div>
            <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] mb-1" style={{ fontWeight: 600 }}>
              Body
            </h6>
            <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-3">
              Create your own fields and position them as you see fit.
            </p>

            {/* Column headers */}
            <div className="grid grid-cols-[1fr_80px_64px] gap-2 mb-2 px-1">
              <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]" style={{ fontWeight: 600 }}>Name</span>
              <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] text-center" style={{ fontWeight: 600 }}>Required</span>
              <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] text-center" style={{ fontWeight: 600 }}>Remove</span>
            </div>

            {/* Field rows */}
            <div className="space-y-2">
              {form.bodyFields.map((field) => (
                <div key={field.id} className="grid grid-cols-[1fr_80px_64px] gap-2 items-center">
                  <input
                    value={field.name}
                    onChange={(e) => renameField(field.id, e.target.value)}
                    className="h-10 px-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-raised)] font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] outline-none focus:border-[var(--indigo-7)]"
                  />
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => toggleFieldRequired(field.id)}
                      className={`flex items-center w-9 h-5 p-[2px] rounded-[16px] transition-colors shrink-0 cursor-pointer ${
                        field.required ? "bg-[var(--indigo-9)]" : "bg-[var(--slate-5)]"
                      }`}
                    >
                      <div
                        className={`h-full aspect-square rounded-full bg-[var(--slate-1)] shadow-sm transition-transform ${
                          field.required ? "translate-x-[16px]" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex justify-center">
                    {field.removable ? (
                      <button
                        type="button"
                        onClick={() => removeBodyField(field.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 cursor-pointer transition-colors"
                      >
                        <Trash2 size={14} className="text-red-500" />
                      </button>
                    ) : (
                      <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)]">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* + Add Field */}
            <div className="relative mt-3" ref={fieldPickerRef}>
              <button
                type="button"
                onClick={() => setShowFieldPicker(!showFieldPicker)}
                disabled={availableFields.length === 0}
                className="w-full h-10 flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-[var(--border-default)] bg-[var(--slate-2)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-default"
              >
                <Plus size={14} />
                Add Field
              </button>
              {showFieldPicker && availableFields.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 z-10 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg shadow-lg py-1">
                  {availableFields.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => addBodyField(f)}
                      className="w-full px-3 py-2 flex items-center gap-2 text-left font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] hover:bg-[var(--bg-hover)] cursor-pointer"
                    >
                      <span className="w-5 h-5 rounded bg-[var(--indigo-3)] flex items-center justify-center text-[length:10px] text-[color:var(--indigo-11)]">⬡</span>
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── 4. Footer Section ── */}
          <div>
            <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] mb-1" style={{ fontWeight: 600 }}>
              Footer
            </h6>
            <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-3">
              You can add Footer content.
            </p>
            <div className="border border-[var(--border-default)] rounded-lg overflow-hidden">
              <div className="flex items-center gap-0.5 px-2 py-1.5 bg-[var(--slate-2)] border-b border-[var(--border-default)]">
                <select className="h-7 px-2 rounded text-[length:var(--text-sm)] font-['Inter',sans-serif] bg-transparent border border-[var(--border-default)] text-[color:var(--text-primary)] cursor-pointer outline-none">
                  <option>Normal</option>
                  <option>Heading 1</option>
                  <option>Heading 2</option>
                  <option>Heading 3</option>
                </select>
                <div className="w-px h-5 bg-[var(--border-default)] mx-1" />
                <button type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-[var(--bg-hover)] cursor-pointer">
                  <Bold size={14} className="text-[var(--text-secondary)]" />
                </button>
                <button type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-[var(--bg-hover)] cursor-pointer">
                  <Italic size={14} className="text-[var(--text-secondary)]" />
                </button>
                <button type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-[var(--bg-hover)] cursor-pointer">
                  <Underline size={14} className="text-[var(--text-secondary)]" />
                </button>
                <button type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-[var(--bg-hover)] cursor-pointer">
                  <Strikethrough size={14} className="text-[var(--text-secondary)]" />
                </button>
                <button type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-[var(--bg-hover)] cursor-pointer">
                  <Link size={14} className="text-[var(--text-secondary)]" />
                </button>
              </div>
              <textarea
                value={form.footerContent}
                onChange={(e) => updateField("footerContent", e.target.value)}
                placeholder="You can add Footer content."
                className="w-full min-h-[80px] p-3 bg-transparent font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] outline-none resize-y placeholder:text-[var(--text-muted)]"
              />
            </div>
          </div>

          {/* ── 5. Success Form Section ── */}
          <div>
            <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] mb-1" style={{ fontWeight: 600 }}>
              Success Form
            </h6>
            <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-3">
              Success Form Description
            </p>
            <textarea
              value={form.successFormDesc}
              onChange={(e) => updateField("successFormDesc", e.target.value)}
              placeholder="Success Form Description"
              className="w-full min-h-[80px] p-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-raised)] font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] outline-none resize-y placeholder:text-[var(--text-muted)] focus:border-[var(--indigo-7)]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-end gap-2 shrink-0">
          <button
            onClick={onClose}
            className="h-8 px-4 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="h-8 px-4 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export function RegistrationPanel() {
  const [registrations, setRegistrations] = useState<Registration[]>(mockRegistrations);
  const [search, setSearch] = useState("");
  const [deleteReg, setDeleteReg] = useState<Registration | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; r: Registration } | null>(null);
  const [sortCol, setSortCol] = useState<"type" | "default" | "creationDate">("type");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [detailModal, setDetailModal] = useState<{ open: boolean; reg: Registration | null }>({ open: false, reg: null });
  const [defaultConfirm, setDefaultConfirm] = useState<Registration | null>(null);

  const handleSetDefault = (reg: Registration) => {
    setRegistrations((prev) =>
      prev.map((r) => ({ ...r, isDefault: r.id === reg.id }))
    );
    setDefaultConfirm(null);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setRegistrations([...mockRegistrations]);
      setIsRefreshing(false);
    }, 800);
  };

  const filtered = registrations
    .filter((r) => r.type.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let cmp = 0;
      if (sortCol === "type") cmp = a.type.localeCompare(b.type);
      else if (sortCol === "default") cmp = (a.isDefault ? 0 : 1) - (b.isDefault ? 0 : 1);
      else if (sortCol === "creationDate") cmp = a.id - b.id;
      return sortDir === "asc" ? cmp : -cmp;
    });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paged = filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  const startIdx = page * rowsPerPage + 1;
  const endIdx = Math.min((page + 1) * rowsPerPage, filtered.length);

  const handleSort = (col: "type" | "default" | "creationDate") => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortCol(col); setSortDir("asc"); }
  };

  const handleDelete = (reg: Registration) => {
    setRegistrations((prev) => prev.filter((r) => r.id !== reg.id));
  };

  const handleSaveRegistration = (reg: Registration, _form: RegFormData) => {
    setRegistrations((prev) => {
      const exists = prev.find((r) => r.id === reg.id);
      if (exists) {
        // Update existing
        return prev.map((r) => (r.id === reg.id ? { ...r, isDefault: reg.isDefault } : r));
      }
      // Add new
      return [...prev, reg];
    });
  };

  const handleKebab = (e: React.MouseEvent, r: Registration) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement).closest("button")!.getBoundingClientRect();
    setContextMenu({ x: rect.left - 80, y: rect.bottom + 4, r });
  };

  const sortArrow = (col: "type" | "default" | "creationDate") =>
    sortCol === col ? (sortDir === "asc" ? " ↑" : " ↓") : "";

  return (
    <div>
      {/* Toolbar */}
      <div className="px-5 pt-3 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[var(--slate-2)] rounded-lg h-8 px-2.5 w-[240px]">
            <Search size={14} className="text-[var(--text-muted)] shrink-0" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              placeholder="Search"
              className="flex-1 bg-transparent font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
          >
            <RotateCw size={14} className={`text-[var(--text-secondary)] ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
          <button className="h-8 px-2.5 flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
            <Download size={14} />
            Export
          </button>
          <button
            onClick={() => setDetailModal({ open: true, reg: null })}
            className="h-8 px-3 flex items-center gap-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer"
          >
            <Plus size={14} />
            New registration
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[var(--border-default)] overflow-hidden mx-5 mb-4">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[var(--slate-3)] border-b border-[var(--border-default)]">
              <th
                onClick={() => handleSort("type")}
                className="text-left py-2.5 px-5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold tracking-[-0.06px] leading-[1.3] cursor-pointer hover:bg-[var(--bg-hover)]"
              >
                Type{sortArrow("type")}
              </th>
              <th
                onClick={() => handleSort("default")}
                className="text-left py-2.5 px-5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold tracking-[-0.06px] leading-[1.3] cursor-pointer hover:bg-[var(--bg-hover)]"
              >
                Default{sortArrow("default")}
              </th>
              <th
                onClick={() => handleSort("creationDate")}
                className="text-left py-2.5 px-5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold tracking-[-0.06px] leading-[1.3] cursor-pointer hover:bg-[var(--bg-hover)]"
              >
                Creation Date{sortArrow("creationDate")}
              </th>
              <th className="text-left py-2.5 px-5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold tracking-[-0.06px] leading-[1.3]">
                Link
              </th>
              <th className="text-left py-2.5 px-3 w-[52px]">
              </th>
            </tr>
          </thead>
          <tbody>
            {paged.map((reg) => (
              <tr
                key={reg.id}
                className="border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--bg-hover)] transition-colors"
              >
                <td className="py-3 px-5 text-left">
                  <button
                    onClick={() => setDetailModal({ open: true, reg })}
                    className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--indigo-11)] hover:text-[color:var(--indigo-12)] hover:underline cursor-pointer transition-colors"
                  >
                    {reg.type}
                  </button>
                </td>
                <td className="py-3 px-5 text-left">
                  <button
                    type="button"
                    onClick={() => {
                      if (!reg.isDefault) setDefaultConfirm(reg);
                    }}
                    className={`relative inline-flex items-center w-9 h-5 p-[2px] rounded-[16px] transition-colors shrink-0 cursor-pointer ${
                      reg.isDefault ? "bg-[var(--indigo-9)]" : "bg-[var(--slate-5)]"
                    }`}
                  >
                    <div
                      className={`h-full aspect-square rounded-full bg-[var(--slate-1)] shadow-sm transition-transform ${
                        reg.isDefault ? "translate-x-[16px]" : "translate-x-0"
                      }`}
                    />
                  </button>
                </td>
                <td className="py-3 px-5 text-center font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">
                  {reg.creationDate}
                </td>
                <td className="py-3 px-5 text-center">
                  {reg.hasLink && (
                    <>
                      <button className="inline-flex items-center justify-center w-7 h-7 rounded-md hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
                        <ExternalLink size={16} className="text-[var(--text-secondary)]" />
                      </button>
                      <button className="inline-flex items-center justify-center w-7 h-7 rounded-md hover:bg-[var(--bg-hover)] cursor-pointer transition-colors ml-1">
                        <Copy size={16} className="text-[var(--text-secondary)]" />
                      </button>
                    </>
                  )}
                </td>
                <td className="py-3 px-3 text-center">
                  <button
                    onClick={(e) => handleKebab(e, reg)}
                    className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer transition-colors mx-auto"
                  >
                    <MoreVertical size={16} className="text-[var(--text-secondary)]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className="py-2.5 px-5 border-t border-[var(--border-default)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
                      Rows per page:
                    </span>
                    <select
                      value={rowsPerPage}
                      onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(0); }}
                      className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] bg-transparent outline-none cursor-pointer"
                    >
                      {[10, 25, 50, 100].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
                      {filtered.length > 0 ? `${startIdx}–${endIdx} of ${filtered.length}` : "0 of 0"}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        disabled={page === 0}
                        onClick={() => setPage((p) => p - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer disabled:opacity-40 disabled:cursor-default transition-colors"
                      >
                        <ChevronLeft size={16} className="text-[var(--text-secondary)]" />
                      </button>
                      <button
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage((p) => p + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer disabled:opacity-40 disabled:cursor-default transition-colors"
                      >
                        <ChevronRight size={16} className="text-[var(--text-secondary)]" />
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Kebab context menu */}
      {contextMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setContextMenu(null)} />
          <div
            className="fixed z-50 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg shadow-lg py-1 min-w-[120px]"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <button
              onClick={() => { setDetailModal({ open: true, reg: contextMenu.r }); setContextMenu(null); }}
              className="w-full px-3 py-1.5 flex items-center gap-2 text-left font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] hover:bg-[var(--bg-hover)] cursor-pointer"
            >
              <Pencil size={14} className="text-[var(--text-secondary)]" />
              Edit
            </button>
            <button
              onClick={() => { setDeleteReg(contextMenu.r); setContextMenu(null); }}
              className="w-full px-3 py-1.5 flex items-center gap-2 text-left font-['Inter',sans-serif] text-[length:var(--text-sm)] text-red-500 hover:bg-red-50 cursor-pointer"
            >
              <Trash2 size={14} className="text-red-500" />
              Delete
            </button>
          </div>
        </>
      )}

      {/* Set Default confirmation modal */}
      {defaultConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDefaultConfirm(null)} />
          <div className="relative bg-[var(--bg-surface)] rounded-xl shadow-xl w-full max-w-[440px] mx-4 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-default)]">
              <h3 className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
                Change Default Registration
              </h3>
              <button onClick={() => setDefaultConfirm(null)} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
                <X size={16} className="text-[var(--text-secondary)]" />
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
                Are you sure you want to set <span className="text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>{defaultConfirm.type}</span> as the default registration? The current default will be switched off.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--border-default)]">
              <button
                onClick={() => setDefaultConfirm(null)}
                className="px-4 py-2 rounded-lg font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
                style={{ fontWeight: 600 }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleSetDefault(defaultConfirm)}
                className="px-4 py-2 rounded-lg bg-[var(--accent-solid)] text-[color:var(--text-on-accent)] font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] transition-colors cursor-pointer"
                style={{ fontWeight: 600 }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {deleteReg && (
        <RegistrationDeleteModal
          reg={deleteReg}
          onClose={() => setDeleteReg(null)}
          onConfirm={() => handleDelete(deleteReg)}
        />
      )}

      {/* Detail modal (Add / Edit) */}
      {detailModal.open && (
        <RegistrationDetailModal
          editingReg={detailModal.reg}
          onClose={() => setDetailModal({ open: false, reg: null })}
          onSave={handleSaveRegistration}
        />
      )}
    </div>
  );
}