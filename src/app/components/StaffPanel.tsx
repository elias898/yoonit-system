import { useState, useRef, useEffect } from "react";
import {
  Search,
  Download,
  Plus,
  MoreVertical,
  User,
  Eye,
  EyeOff,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Minus,
} from "lucide-react";
import { ModuleTag, type ModuleId } from "./ModuleTag";
import { InputField } from "./InputField";

// --- Types ---

interface StaffUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  modules: ModuleId[];
  avatarColor: string;
  createdAt: string;
  type: "Agent" | "Manager";
  team: string;
  deskPath: string[];
  status: "Active" | "Disabled";
  has2FA: boolean;
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

const allModuleIds: ModuleId[] = ["CRM", "MAM", "Bonus", "Partners", "Dynamic Margin", "CopyTrade", "TradeSelect"];

// --- Mock Data ---
const mockStaff: StaffUser[] = [
  { id: "s1", firstName: "Elena", lastName: "Constantinou", email: "elena.c@yoonit.com", modules: ["CRM", "Partners"], avatarColor: avatarColors[0], createdAt: "Jan 15, 2025", type: "Manager", team: "Cyprus Desk", deskPath: ["CYSEC", "Sales", "EU Team", "Cyprus Desk"], status: "Active", has2FA: true },
  { id: "s2", firstName: "Stavros", lastName: "Nikolaou", email: "stavros.n@yoonit.com", modules: ["CRM"], avatarColor: avatarColors[1], createdAt: "Feb 3, 2025", type: "Agent", team: "Cyprus Desk", deskPath: ["CYSEC", "Sales", "EU Team", "Cyprus Desk"], status: "Active", has2FA: true },
  { id: "s3", firstName: "Christina", lastName: "Pavlou", email: "christina.p@yoonit.com", modules: ["CRM", "Bonus"], avatarColor: avatarColors[4], createdAt: "Mar 12, 2025", type: "Agent", team: "Cyprus Desk", deskPath: ["CYSEC", "Sales", "EU Team", "Cyprus Desk"], status: "Active", has2FA: false },
  { id: "s4", firstName: "Marios", lastName: "Christodoulou", email: "marios.ch@yoonit.com", modules: ["CRM", "MAM"], avatarColor: avatarColors[2], createdAt: "Apr 8, 2025", type: "Agent", team: "Cyprus Desk", deskPath: ["CYSEC", "Sales", "EU Team", "Cyprus Desk"], status: "Disabled", has2FA: true },
  { id: "s5", firstName: "Yiannis", lastName: "Makris", email: "yiannis.m@yoonit.com", modules: ["CRM", "Partners", "CopyTrade"], avatarColor: avatarColors[3], createdAt: "May 20, 2025", type: "Manager", team: "Greece Desk", deskPath: ["CYSEC", "Sales", "EU Team", "Greece Desk"], status: "Active", has2FA: true },
  { id: "s6", firstName: "Dimitra", lastName: "Alexiou", email: "dimitra.a@yoonit.com", modules: ["CRM", "Bonus"], avatarColor: avatarColors[5], createdAt: "Jun 1, 2025", type: "Agent", team: "Greece Desk", deskPath: ["CYSEC", "Sales", "EU Team", "Greece Desk"], status: "Active", has2FA: false },
  { id: "s7", firstName: "Hans", lastName: "Mueller", email: "hans.m@yoonit.com", modules: ["CRM", "MAM", "Dynamic Margin"], avatarColor: avatarColors[7], createdAt: "Jun 15, 2025", type: "Manager", team: "Germany Desk", deskPath: ["CYSEC", "Sales", "EU Team", "Germany Desk"], status: "Active", has2FA: true },
  { id: "s8", firstName: "Klaus", lastName: "Richter", email: "klaus.r@yoonit.com", modules: ["CRM"], avatarColor: avatarColors[0], createdAt: "Jul 3, 2025", type: "Agent", team: "Germany Desk", deskPath: ["CYSEC", "Sales", "EU Team", "Germany Desk"], status: "Disabled", has2FA: false },
  { id: "s9", firstName: "Fatima", lastName: "Al-Hassan", email: "fatima.h@yoonit.com", modules: ["CRM", "Partners", "TradeSelect"], avatarColor: avatarColors[4], createdAt: "Jul 20, 2025", type: "Manager", team: "UAE Desk", deskPath: ["CYSEC", "Sales", "Arabic Team", "UAE Desk"], status: "Active", has2FA: true },
  { id: "s10", firstName: "Khalid", lastName: "Mansour", email: "khalid.m@yoonit.com", modules: ["CRM", "CopyTrade"], avatarColor: avatarColors[1], createdAt: "Aug 5, 2025", type: "Agent", team: "UAE Desk", deskPath: ["CYSEC", "Sales", "Arabic Team", "UAE Desk"], status: "Active", has2FA: true },
  { id: "s11", firstName: "Emily", lastName: "Watson", email: "emily.w@yoonit.com", modules: ["CRM", "MAM", "Bonus", "Partners"], avatarColor: avatarColors[3], createdAt: "Aug 22, 2025", type: "Manager", team: "London Desk", deskPath: ["FCA", "Sales", "UK Team", "London Desk"], status: "Active", has2FA: true },
  { id: "s12", firstName: "Oliver", lastName: "Thompson", email: "oliver.t@yoonit.com", modules: ["CRM", "Dynamic Margin"], avatarColor: avatarColors[4], createdAt: "Sep 10, 2025", type: "Agent", team: "London Desk", deskPath: ["FCA", "Sales", "UK Team", "London Desk"], status: "Active", has2FA: false },
];

function getInitials(firstName: string, lastName: string) {
  return (firstName[0] + lastName[0]).toUpperCase();
}

// --- Modal Components ---
function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-[480px] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[var(--border-subtle)]">
          <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)]">{title}</h5>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer">
            <X size={16} className="text-[var(--text-secondary)]" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

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

// --- Desk Path Tooltip (Google Drive style) ---
function DeskPathCell({ deskPath }: { deskPath: string[] }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const cellRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deskName = deskPath[deskPath.length - 1];

  function show() {
    if (hideTimeout.current) { clearTimeout(hideTimeout.current); hideTimeout.current = null; }
    setShowTooltip(true);
  }
  function scheduleHide() {
    hideTimeout.current = setTimeout(() => setShowTooltip(false), 150);
  }

  useEffect(() => {
    return () => { if (hideTimeout.current) clearTimeout(hideTimeout.current); };
  }, []);

  useEffect(() => {
    if (!showTooltip || !cellRef.current || !tooltipRef.current) return;
    const cellRect = cellRef.current.getBoundingClientRect();
    const tipRect = tooltipRef.current.getBoundingClientRect();
    const padding = 8;
    let top = cellRect.bottom + 4;
    let left = cellRect.left;
    if (left + tipRect.width + padding > window.innerWidth) {
      left = window.innerWidth - tipRect.width - padding;
    }
    if (left < padding) left = padding;
    if (top + tipRect.height + padding > window.innerHeight) {
      top = cellRect.top - tipRect.height - 4;
    }
    setTooltipPos({ top, left });
  }, [showTooltip]);

  return (
    <div
      ref={cellRef}
      className="relative inline-flex items-center"
      onMouseEnter={show}
      onMouseLeave={scheduleHide}
    >
      <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] cursor-default">
        {deskName}
      </span>
      {showTooltip && deskPath.length > 1 && (
        <div
          ref={tooltipRef}
          className="fixed z-50 bg-white rounded-lg border border-[var(--border-default)] shadow-lg px-3 py-2.5"
          style={{ top: tooltipPos.top, left: tooltipPos.left }}
          onMouseEnter={show}
          onMouseLeave={scheduleHide}
        >
          <div className="flex items-center gap-1 whitespace-nowrap">
            {deskPath.map((segment, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={12} className="text-[var(--text-muted)] shrink-0" />}
                <span
                  className={`font-['Inter',sans-serif] text-[length:var(--text-xs)] rounded px-1 py-0.5 cursor-default transition-colors hover:bg-[var(--bg-hover)] ${
                    i === deskPath.length - 1
                      ? "text-[color:var(--text-primary)] font-semibold"
                      : "text-[color:var(--text-secondary)]"
                  }`}
                >
                  {segment}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Add User Multi-Step ---
function AddUserOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [autoGenPassword, setAutoGenPassword] = useState(false);
  const [sendPasswordEmail, setSendPasswordEmail] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-[600px] max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {step === 2 && (
              <button onClick={() => setStep(1)} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer">
                <ChevronLeft size={18} className="text-[var(--text-secondary)]" />
              </button>
            )}
            <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)]">
              {step === 1 ? "New User" : "Team Member Role"}
            </h5>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)]">Step {step} of 2</span>
            <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer">
              <X size={16} className="text-[var(--text-secondary)]" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 ? (
            <div className="max-w-[560px] space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField label="First Name *" placeholder="Enter first name" />
                <InputField label="Last Name *" placeholder="Enter last name" />
              </div>
              <InputField label="Email" placeholder="Set up the domain before providing email" />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={autoGenPassword}
                  onChange={() => setAutoGenPassword(!autoGenPassword)}
                  className="w-4 h-4 rounded border-[var(--border-default)] accent-[var(--accent-solid)]"
                />
                <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">Auto-generate Password</span>
              </div>

              {!autoGenPassword && (
                <InputField label="Password" type="password" placeholder="Enter password" />
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={sendPasswordEmail}
                  onChange={() => setSendPasswordEmail(!sendPasswordEmail)}
                  className="w-4 h-4 rounded border-[var(--border-default)] accent-[var(--accent-solid)]"
                />
                <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">Send Password In Email Upon Completion</span>
              </div>
            </div>
          ) : (
            <div className="max-w-[640px]">
              <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-4">Product Access</h5>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)]">
                    {["Access", "Product", "Role", "Description"].map((h) => (
                      <th key={h} className="text-left py-2 px-3 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold tracking-[-0.06px] leading-[1.3]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allModuleIds.map((product) => (
                    <tr key={product} className="border-b border-[var(--border-subtle)]">
                      <td className="py-3 px-3"><input type="checkbox" className="w-4 h-4 rounded accent-[var(--accent-solid)]" /></td>
                      <td className="py-3 px-3 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{product}</td>
                      <td className="py-3 px-3">
                        <select defaultValue="No Access" className="h-8 px-2 rounded-md border border-[var(--border-default)] bg-[var(--bg-raised)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
                          <option>No Access</option>
                          <option>Product Admin</option>
                          <option>Viewer</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)]">
                        Select a role to see description
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end gap-2 shrink-0">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer">
            Cancel
          </button>
          {step === 2 && (
            <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer">
              Back
            </button>
          )}
          {step === 1 ? (
            <button onClick={() => setStep(2)} className="px-4 py-2 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer flex items-center gap-1">
              Next <ChevronRight size={14} />
            </button>
          ) : (
            <button onClick={onClose} className="px-4 py-2 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer">
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Main Staff Panel ---
export function StaffPanel({ search, selectedIds, onSelectedIdsChange, showAddUser: showAddUserProp, onCloseAddUser }: { search: string; selectedIds: Set<string>; onSelectedIdsChange: (ids: Set<string>) => void; showAddUser?: boolean; onCloseAddUser?: () => void }) {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; user: StaffUser } | null>(null);
  const [editInfoModal, setEditInfoModal] = useState<StaffUser | null>(null);
  const [resetPasswordModal, setResetPasswordModal] = useState<StaffUser | null>(null);
  const [ipWhitelistModal, setIpWhitelistModal] = useState<StaffUser | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ title: string; message: string; onConfirm: () => void } | null>(null);
  const [showAddUserInternal, setShowAddUserInternal] = useState(false);
  const [manageRolesUser, setManageRolesUser] = useState<StaffUser | null>(null);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [autoGenPw, setAutoGenPw] = useState(false);

  const showAddUser = showAddUserProp ?? showAddUserInternal;
  const closeAddUser = onCloseAddUser ?? (() => setShowAddUserInternal(false));

  const filtered = mockStaff.filter((u) => {
    const full = `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase();
    return full.includes(search.toLowerCase());
  });

  const allFilteredSelected = filtered.length > 0 && filtered.every((u) => selectedIds.has(u.id));
  const someFilteredSelected = filtered.some((u) => selectedIds.has(u.id));

  function toggleSelectAll() {
    if (allFilteredSelected) {
      onSelectedIdsChange(new Set());
    } else {
      onSelectedIdsChange(new Set(filtered.map((u) => u.id)));
    }
  }

  function toggleSelectUser(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onSelectedIdsChange(next);
  }

  function handleContextMenu(e: React.MouseEvent, user: StaffUser) {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, user });
  }

  const contextOptions = contextMenu
    ? [
        { label: "Edit Information", onClick: () => setEditInfoModal(contextMenu.user) },
        { label: "Reset Password", onClick: () => setResetPasswordModal(contextMenu.user) },
        { label: "Manage Roles", onClick: () => setManageRolesUser(contextMenu.user) },
        { label: "IP Whitelisting", onClick: () => setIpWhitelistModal(contextMenu.user) },
        { label: contextMenu.user.status === "Active" ? "Disable" : "Enable", onClick: () => setConfirmModal({ title: "Block", message: `Are you sure you want to Block this User?`, onConfirm: () => {} }) },
        ...(contextMenu.user.has2FA ? [{ label: "Deactivate 2FA", onClick: () => setConfirmModal({ title: "Deactivate 2FA", message: `Are you sure you want to deactivate 2FA for this user?`, onConfirm: () => {} }) }] : []),
        { label: "Delete", onClick: () => setConfirmModal({ title: "Delete User", message: `Are you sure you want to delete this user?`, onConfirm: () => {} }), danger: true },
      ]
    : [];

  // Manage Roles full-page overlay
  if (manageRolesUser) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)] flex items-center gap-3">
          <button onClick={() => setManageRolesUser(null)} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer">
            <ChevronLeft size={18} className="text-[var(--text-secondary)]" />
          </button>
          <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)]">
            Manage Roles — {manageRolesUser.firstName} {manageRolesUser.lastName}
          </h5>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[640px]">
            <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-4">Product Access</h5>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  {["Access", "Product", "Role", "Description"].map((h) => (
                    <th key={h} className="text-left py-2 px-3 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold tracking-[-0.06px] leading-[1.3]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allModuleIds.map((product) => {
                  const hasAccess = manageRolesUser.modules.includes(product as ModuleId);
                  return (
                    <tr key={product} className="border-b border-[var(--border-subtle)]">
                      <td className="py-3 px-3"><input type="checkbox" defaultChecked={hasAccess} className="w-4 h-4 rounded accent-[var(--accent-solid)]" /></td>
                      <td className="py-3 px-3 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{product}</td>
                      <td className="py-3 px-3">
                        <select defaultValue={hasAccess ? "Product Admin" : "No Access"} className="h-8 px-2 rounded-md border border-[var(--border-default)] bg-[var(--bg-raised)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
                          <option>No Access</option>
                          <option>Product Admin</option>
                          <option>Viewer</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)]">
                        {hasAccess ? "Full administrative access to all features" : "Select a role to see description"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end">
          <button onClick={() => setManageRolesUser(null)} className="px-4 py-2 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer">
            Save
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
              {["User", "Module", "Desk", "Creation Date", ""].map((h) => (
                <th key={h} className="text-left py-2.5 px-5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold tracking-[-0.06px] leading-[1.3]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => {
              const isSelected = selectedIds.has(user.id);
              return (
                <tr
                  key={user.id}
                  className={`border-b border-[var(--border-subtle)] transition-colors ${
                    isSelected
                      ? "bg-[var(--indigo-2)] hover:bg-[var(--indigo-3)]"
                      : "hover:bg-[var(--bg-hover)]"
                  }`}
                >
                  {/* Checkbox cell */}
                  <td className="py-3 px-5">
                    <button
                      onClick={() => toggleSelectUser(user.id)}
                      className={`w-4 h-4 rounded-[4px] border flex items-center justify-center cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[var(--indigo-9)] border-[var(--indigo-9)]"
                          : "bg-white border-[var(--slate-7)] hover:border-[var(--slate-8)]"
                      }`}
                    >
                      {isSelected && <Check size={12} className="text-white" />}
                    </button>
                  </td>

                  {/* User cell */}
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--slate-4)] flex items-center justify-center shrink-0">
                        <User size={16} className="text-[var(--slate-10)]" />
                      </div>
                      <div className="min-w-0">
                        <span className="block font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] font-semibold truncate">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="block font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)] truncate">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Module badges */}
                  <td className="py-3 px-5">
                    <div className="flex flex-wrap gap-1">
                      {user.modules.map((mod) => (
                        <ModuleTag key={mod} module={mod} />
                      ))}
                    </div>
                  </td>

                  {/* Desk Path */}
                  <td className="py-3 px-5">
                    <DeskPathCell deskPath={user.deskPath} />
                  </td>

                  {/* Date */}
                  <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">
                    {user.createdAt}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-5">
                    <button
                      onClick={(e) => handleContextMenu(e, user)}
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

      {/* Edit Info Modal */}
      <Modal open={!!editInfoModal} onClose={() => setEditInfoModal(null)} title="Manage Info">
        {editInfoModal && (
          <div className="space-y-4">
            <div>
              <label className="block font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] mb-[6px]" style={{ fontWeight: 600 }}>Type</label>
              <div className="flex gap-4">
                {(["Agent", "Manager"] as const).map((t) => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="type" defaultChecked={editInfoModal.type === t} className="accent-[var(--accent-solid)]" />
                    <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{t}</span>
                  </label>
                ))}
              </div>
            </div>
            <InputField as="select" label="Team">
              <option>{editInfoModal.team}</option>
              <option>Cyprus Desk</option>
              <option>Greece Desk</option>
              <option>Germany Desk</option>
            </InputField>
            <InputField label="Email" defaultValue={editInfoModal.email} />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="First Name" defaultValue={editInfoModal.firstName} />
              <InputField label="Last Name" defaultValue={editInfoModal.lastName} />
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setEditInfoModal(null)} className="px-4 py-2 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer">
                Save
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Reset Password Modal */}
      <Modal open={!!resetPasswordModal} onClose={() => setResetPasswordModal(null)} title="Change Password">
        {resetPasswordModal && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={autoGenPw} onChange={() => setAutoGenPw(!autoGenPw)} className="w-4 h-4 rounded accent-[var(--accent-solid)]" />
              <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">Auto-generate Password</span>
            </div>
            {!autoGenPw && (
              <div>
                <label className="block font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] mb-[6px]" style={{ fontWeight: 600 }}>Password</label>
                <div className="relative">
                  <input
                    type={showPasswordField ? "text" : "password"}
                    className="w-full h-[44px] px-4 pr-10 rounded-lg border border-[var(--border-default)] bg-[var(--bg-raised)] font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] outline-none focus:border-[var(--indigo-7)] transition-colors placeholder:text-[var(--text-muted)]"
                    placeholder="Enter new password"
                  />
                  <button
                    onClick={() => setShowPasswordField(!showPasswordField)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center cursor-pointer"
                  >
                    {showPasswordField ? <EyeOff size={15} className="text-[var(--text-muted)]" /> : <Eye size={15} className="text-[var(--text-muted)]" />}
                  </button>
                </div>
              </div>
            )}
            <div className="flex justify-end pt-2">
              <button onClick={() => setResetPasswordModal(null)} className="px-4 py-2 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer">
                Save
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* IP Whitelisting Modal */}
      <Modal open={!!ipWhitelistModal} onClose={() => setIpWhitelistModal(null)} title="Enter Desired IPs">
        {ipWhitelistModal && (
          <div className="space-y-4">
            <InputField label="Whitelisted IPs" placeholder="Enter IP addresses separated by commas" />
            <div className="flex justify-end pt-2">
              <button onClick={() => setIpWhitelistModal(null)} className="px-4 py-2 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer">
                Save
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirm Modal */}
      <ConfirmModal
        open={!!confirmModal}
        onClose={() => setConfirmModal(null)}
        onConfirm={confirmModal?.onConfirm ?? (() => {})}
        title={confirmModal?.title ?? ""}
        message={confirmModal?.message ?? ""}
      />

      {/* Add User Overlay */}
      <AddUserOverlay open={showAddUser} onClose={closeAddUser} />
    </div>
  );
}