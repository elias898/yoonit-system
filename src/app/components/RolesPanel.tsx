import { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  ChevronLeft,
  X,
  User,
  Check,
  Minus,
} from "lucide-react";
import { ModuleTag, type ModuleId } from "./ModuleTag";
import { InputField } from "./InputField";

// --- Types ---

interface RoleItem {
  id: string;
  name: string;
  module: ModuleId;
  avatarColor: string;
  createdAt: string;
}

// --- Constants ---
const avatarColors = [
  "bg-[var(--indigo-9)]",
  "bg-[#e16f24]",
  "bg-[#0d9488]",
  "bg-[#7c3aed]",
  "bg-[#db2777]",
  "bg-[#2563eb]",
  "bg-[#059669]",
  "bg-[#d97706]",
];

const allModules: ModuleId[] = ["CRM", "MAM", "Bonus", "Partners", "Dynamic Margin", "CopyTrade", "TradeSelect"];

// --- Mock Data ---
const mockRoles: RoleItem[] = [
  { id: "r1", name: "CRM Admin", module: "CRM", avatarColor: avatarColors[0], createdAt: "Jan 10, 2025" },
  { id: "r2", name: "CRM Viewer", module: "CRM", avatarColor: avatarColors[1], createdAt: "Jan 10, 2025" },
  { id: "r3", name: "MAM Manager", module: "MAM", avatarColor: avatarColors[2], createdAt: "Feb 5, 2025" },
  { id: "r4", name: "Partners Admin", module: "Partners", avatarColor: avatarColors[3], createdAt: "Mar 1, 2025" },
  { id: "r5", name: "Bonus Manager", module: "Bonus", avatarColor: avatarColors[4], createdAt: "Mar 15, 2025" },
  { id: "r6", name: "CopyTrade Admin", module: "CopyTrade", avatarColor: avatarColors[5], createdAt: "Apr 2, 2025" },
  { id: "r7", name: "Dynamic Margin Viewer", module: "Dynamic Margin", avatarColor: avatarColors[6], createdAt: "May 12, 2025" },
  { id: "r8", name: "TradeSelect Manager", module: "TradeSelect", avatarColor: avatarColors[7], createdAt: "Jun 20, 2025" },
  { id: "r9", name: "MAM Viewer", module: "MAM", avatarColor: avatarColors[0], createdAt: "Jul 8, 2025" },
  { id: "r10", name: "Partners Viewer", module: "Partners", avatarColor: avatarColors[1], createdAt: "Aug 1, 2025" },
];

function getInitials(name: string) {
  const parts = name.split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

// --- Confirm Modal ---
function ConfirmModal({ open, onClose, onConfirm, title, message }: { open: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-[420px]">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[var(--border-subtle)]">
          <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)]">{title}</h5>
        </div>
        <div className="px-6 py-5">
          <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">{message}</p>
        </div>
        <div className="flex justify-end gap-2 px-6 pb-5">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer">
            No
          </button>
          <button onClick={() => { onConfirm(); onClose(); }} className="px-4 py-2 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Context Menu ---
function ContextMenu({ x, y, onClose, options }: { x: number; y: number; onClose: () => void; options: { label: string; onClick: () => void; danger?: boolean }[] }) {
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
    if (x + rect.width + padding > window.innerWidth) {
      newLeft = x - rect.width;
    }
    if (newLeft < padding) newLeft = padding;
    if (y + rect.height + padding > window.innerHeight) {
      newTop = y - rect.height;
    }
    if (newTop < padding) newTop = padding;
    setPos({ top: newTop, left: newLeft });
  }, [x, y]);

  return (
    <div
      ref={ref}
      className="fixed z-50 bg-white rounded-lg border border-[var(--border-default)] shadow-lg py-1 min-w-[180px]"
      style={{ top: pos.top, left: pos.left }}
    >
      {options.map((opt) => (
        <button
          key={opt.label}
          onClick={() => { opt.onClick(); onClose(); }}
          className={`w-full text-left px-3 py-2 font-['Inter',sans-serif] text-[length:var(--text-sm)] cursor-pointer ${
            opt.danger
              ? "text-[color:var(--danger)] hover:bg-[var(--danger-bg)]"
              : "text-[color:var(--text-primary)] hover:bg-[var(--bg-hover)]"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// --- Admin Permissions Mock ---
const adminPermissions = ["Manage Configuration", "Manage Synchronization", "Manage IBCode Ranges", "View Reports", "Manage Users"];
const backofficePermissions = ["DeleteIBallocations", "DeleteProfiletemplates", "Operation Balance", "Operation Correction", "Operation Charge", "Operation Transfer", "Approve/Reject Transactions"];

// --- Main Roles Panel ---
export function RolesPanel({ search, selectedIds, onSelectedIdsChange }: { search: string; selectedIds: Set<string>; onSelectedIdsChange: (ids: Set<string>) => void }) {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; role: RoleItem } | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ title: string; message: string; onConfirm: () => void } | null>(null);
  const [manageRole, setManageRole] = useState<RoleItem | null>(null);
  const [cloneRole, setCloneRole] = useState<RoleItem | null>(null);
  const [showAddRole, setShowAddRole] = useState(false);
  const [addRoleModule, setAddRoleModule] = useState<ModuleId | "">("");

  const filtered = mockRoles.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const allFilteredSelected = filtered.length > 0 && filtered.every((r) => selectedIds.has(r.id));
  const someFilteredSelected = filtered.some((r) => selectedIds.has(r.id));

  function toggleSelectAll() {
    if (allFilteredSelected) {
      onSelectedIdsChange(new Set());
    } else {
      onSelectedIdsChange(new Set(filtered.map((r) => r.id)));
    }
  }

  function toggleSelectRole(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onSelectedIdsChange(next);
  }

  function handleContextMenu(e: React.MouseEvent, role: RoleItem) {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, role });
  }

  const contextOptions = contextMenu
    ? [
        { label: "Manage Role", onClick: () => setManageRole(contextMenu.role) },
        { label: "Clone Role", onClick: () => setCloneRole(contextMenu.role) },
        { label: "Delete", onClick: () => setConfirmModal({ title: "Delete Role", message: "Are you sure you want to delete this role?", onConfirm: () => {} }), danger: true },
      ]
    : [];

  // --- Manage Role Full Page ---
  if (manageRole) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)] flex items-center gap-3">
          <button onClick={() => setManageRole(null)} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer">
            <ChevronLeft size={18} className="text-[var(--text-secondary)]" />
          </button>
          <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)]">Manage Role</h5>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[640px] space-y-6">
            {/* Role name */}
            <div>
              <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-3">Role</h5>
              <InputField label="Role Name" defaultValue={manageRole.name} />
            </div>

            {/* Module selection */}
            <div>
              <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-3">Module Selection and Permissions</h5>
              <InputField as="select" label="Product" defaultValue={manageRole.module}>
                {allModules.map((m) => <option key={m}>{m}</option>)}
              </InputField>
            </div>

            {/* Admin Portal */}
            <div>
              <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-3">Admin Portal</h5>
              <label className="block font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] mb-[6px]" style={{ fontWeight: 600 }}>Admin Permissions</label>
              <div className="flex flex-wrap gap-1.5 p-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-raised)] min-h-[48px]">
                {adminPermissions.slice(0, 3).map((p) => (
                  <span key={p} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[var(--accent-bg)] text-[color:var(--accent-text)] font-['Inter',sans-serif] text-[length:var(--text-xs)] font-semibold">
                    {p}
                    <X size={12} className="cursor-pointer opacity-60 hover:opacity-100" />
                  </span>
                ))}
              </div>
            </div>

            {/* Backoffice Portal */}
            <div>
              <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-3">Backoffice Portal</h5>
              <label className="block font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] mb-[6px]" style={{ fontWeight: 600 }}>Backoffice Permissions</label>
              <div className="flex flex-wrap gap-1.5 p-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-raised)] min-h-[48px]">
                {backofficePermissions.slice(0, 4).map((p) => (
                  <span key={p} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[var(--bg-muted)] text-[color:var(--text-secondary)] font-['Inter',sans-serif] text-[length:var(--text-xs)] font-semibold">
                    {p}
                    <X size={12} className="cursor-pointer opacity-60 hover:opacity-100" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end">
          <button onClick={() => setManageRole(null)} className="px-4 py-2 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer">
            Save
          </button>
        </div>
      </div>
    );
  }

  // --- Clone Role Full Page ---
  if (cloneRole) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)] flex items-center gap-3">
          <button onClick={() => setCloneRole(null)} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer">
            <ChevronLeft size={18} className="text-[var(--text-secondary)]" />
          </button>
          <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)]">Clone Role</h5>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[480px] space-y-4">
            <InputField label="Role Name" defaultValue={`${cloneRole.name} (Copy)`} />
            <InputField as="select" label="Product" defaultValue={cloneRole.module}>
              {allModules.map((m) => <option key={m}>{m}</option>)}
            </InputField>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end">
          <button onClick={() => setCloneRole(null)} className="px-4 py-2 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer">
            Save
          </button>
        </div>
      </div>
    );
  }

  // --- Add Role Full Page ---
  if (showAddRole) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)] flex items-center gap-3">
          <button onClick={() => { setShowAddRole(false); setAddRoleModule(""); }} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer">
            <ChevronLeft size={18} className="text-[var(--text-secondary)]" />
          </button>
          <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)]">Add Role</h5>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[640px] space-y-6">
            <div>
              <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-3">Role</h5>
              <InputField label="Role Name *" placeholder="Enter role name" />
            </div>

            <div>
              <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-3">Module Selection and Permissions</h5>
              <InputField as="select" label="Product" value={addRoleModule} onChange={(e) => setAddRoleModule(e.target.value as ModuleId)}>
                <option value="">Select a module...</option>
                {allModules.map((m) => <option key={m}>{m}</option>)}
              </InputField>
            </div>

            {addRoleModule && (
              <>
                <div>
                  <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-3">Admin Portal</h5>
                  <div className="space-y-2">
                    {adminPermissions.map((p) => (
                      <label key={p} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded accent-[var(--accent-solid)]" />
                        <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-3">Backoffice Portal</h5>
                  <div className="space-y-2">
                    {backofficePermissions.map((p) => (
                      <label key={p} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded accent-[var(--accent-solid)]" />
                        <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end">
          <button onClick={() => { setShowAddRole(false); setAddRoleModule(""); }} className="px-4 py-2 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer">
            Add
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full relative">
      {/* Table */}
      <div className="flex-1 overflow-y-auto overlay-scrollbar mx-5 my-4 rounded-lg border border-[var(--border-default)]">
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[var(--slate-3)] border-b border-[var(--border-default)]">
              <th className="w-[52px] py-2.5 px-5">
                <button
                  onClick={toggleSelectAll}
                  className={`w-4 h-4 rounded-[4px] border flex items-center justify-center cursor-pointer transition-colors ${
                    allFilteredSelected
                      ? "bg-[var(--indigo-9)] border-[var(--indigo-9)]"
                      : someFilteredSelected
                        ? "bg-[var(--indigo-9)] border-[var(--indigo-9)]"
                        : "bg-white border-[var(--slate-7)] hover:border-[var(--slate-8)]"
                  }`}
                >
                  {allFilteredSelected && <Check size={12} className="text-white" />}
                  {someFilteredSelected && !allFilteredSelected && <Minus size={12} className="text-white" />}
                </button>
              </th>
              {["Role", "Module", "Creation Date", ""].map((h) => (
                <th key={h} className="text-left py-2.5 px-5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold tracking-[-0.06px] leading-[1.3]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((role) => {
              const isSelected = selectedIds.has(role.id);
              return (
                <tr
                  key={role.id}
                  className={`border-b border-[var(--border-subtle)] transition-colors ${
                    isSelected
                      ? "bg-[var(--indigo-2)] hover:bg-[var(--indigo-3)]"
                      : "hover:bg-[var(--bg-hover)]"
                  }`}
                >
                  {/* Checkbox cell */}
                  <td className="py-3 px-5">
                    <button
                      onClick={() => toggleSelectRole(role.id)}
                      className={`w-4 h-4 rounded-[4px] border flex items-center justify-center cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[var(--indigo-9)] border-[var(--indigo-9)]"
                          : "bg-white border-[var(--slate-7)] hover:border-[var(--slate-8)]"
                      }`}
                    >
                      {isSelected && <Check size={12} className="text-white" />}
                    </button>
                  </td>

                  {/* Role cell */}
                  <td className="py-3 px-5">
                    <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] font-semibold">
                      {role.name}
                    </span>
                  </td>

                  {/* Module badge */}
                  <td className="py-3 px-5">
                    <ModuleTag module={role.module} />
                  </td>

                  {/* Date */}
                  <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">
                    {role.createdAt}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-5">
                    <button
                      onClick={(e) => handleContextMenu(e, role)}
                      className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-muted)] cursor-pointer"
                    >
                      <MoreVertical size={15} className="text-[var(--text-muted)]" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          options={contextOptions}
        />
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        open={!!confirmModal}
        onClose={() => setConfirmModal(null)}
        onConfirm={confirmModal?.onConfirm ?? (() => {})}
        title={confirmModal?.title ?? ""}
        message={confirmModal?.message ?? ""}
      />
    </div>
  );
}