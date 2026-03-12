import { useState } from "react";
import { Eye, EyeOff, Monitor, Smartphone, Tablet, LogOut, X, Lock } from "lucide-react";
import { InputField } from "./InputField";

const initialSecurity = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

type DeviceType = "desktop" | "mobile" | "tablet";

interface ConnectedDevice {
  id: string;
  type: DeviceType;
  name: string;
  browser: string;
  ip: string;
  location: string;
  lastActive: string;
  current: boolean;
}

const mockDevices: ConnectedDevice[] = [
  {
    id: "1",
    type: "desktop",
    name: "MacBook Pro",
    browser: "Chrome 122",
    ip: "192.168.1.42",
    location: "Limassol, Cyprus",
    lastActive: "Now",
    current: true,
  },
  {
    id: "2",
    type: "desktop",
    name: "Windows PC",
    browser: "Firefox 124",
    ip: "85.73.112.201",
    location: "Nicosia, Cyprus",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "3",
    type: "mobile",
    name: "iPhone 15 Pro",
    browser: "Safari 17",
    ip: "10.0.0.88",
    location: "Limassol, Cyprus",
    lastActive: "Yesterday",
    current: false,
  },
  {
    id: "4",
    type: "tablet",
    name: "iPad Air",
    browser: "Safari 17",
    ip: "10.0.0.91",
    location: "Paphos, Cyprus",
    lastActive: "3 days ago",
    current: false,
  },
  {
    id: "5",
    type: "desktop",
    name: "Linux Workstation",
    browser: "Chrome 121",
    ip: "203.45.67.12",
    location: "London, UK",
    lastActive: "1 week ago",
    current: false,
  },
];

const deviceIcons: Record<DeviceType, typeof Monitor> = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

export function ProfileSecurityPanel() {
  const [values, setValues] = useState(initialSecurity);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [devices, setDevices] = useState(mockDevices);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const update = (field: keyof typeof initialSecurity) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const hasChanges = (Object.keys(initialSecurity) as (keyof typeof initialSecurity)[]).some(
    (key) => values[key] !== initialSecurity[key]
  );

  const handleRevokeDevice = (id: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  const handleRevokeAll = () => {
    setDevices((prev) => prev.filter((d) => d.current));
  };

  return (
    <div className="py-8 px-5 flex flex-col gap-10">
      <div className="w-full">
        <div className="flex items-center justify-between mb-1">
          <h5 className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
            Update Password
          </h5>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-4 py-2 bg-[var(--accent-solid)] text-[color:var(--text-on-accent)] font-['Inter',sans-serif] text-[length:var(--text-sm)] rounded-lg hover:bg-[var(--accent-solid-hover)] transition-all cursor-pointer flex items-center gap-2"
            style={{ fontWeight: 600 }}
          >
            <Lock size={14} />
            Change password
          </button>
        </div>
        <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] max-w-[75ch]">
          Update your password regularly to keep your account secure.
        </p>
        <div className="h-px bg-[var(--border-subtle)] mt-4" />
      </div>

      {/* ── Password Modal ── */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => { setShowPasswordModal(false); setValues(initialSecurity); setShowCurrentPw(false); setShowNewPw(false); setShowConfirmPw(false); }} />
          <div className="relative bg-[var(--bg-surface)] rounded-xl shadow-xl w-full max-w-[480px] mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)]">
              <h5 className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
                Change Password
              </h5>
              <button
                onClick={() => { setShowPasswordModal(false); setValues(initialSecurity); setShowCurrentPw(false); setShowNewPw(false); setShowConfirmPw(false); }}
                className="size-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 flex flex-col gap-5">
              <div className="relative">
                <InputField
                  label="Current Password"
                  type={showCurrentPw ? "text" : "password"}
                  value={values.currentPassword}
                  onChange={update("currentPassword")}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPw(!showCurrentPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer transition-colors"
                >
                  {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="relative">
                <InputField
                  label="New Password"
                  type={showNewPw ? "text" : "password"}
                  value={values.newPassword}
                  onChange={update("newPassword")}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPw(!showNewPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer transition-colors"
                >
                  {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="relative">
                <InputField
                  label="Confirm New Password"
                  type={showConfirmPw ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={update("confirmPassword")}
                  placeholder="Re-enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPw(!showConfirmPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer transition-colors"
                >
                  {showConfirmPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {values.newPassword && values.confirmPassword && values.newPassword !== values.confirmPassword && (
                <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-red-500">
                  Passwords do not match.
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--border-subtle)]">
              <button
                onClick={() => { setShowPasswordModal(false); setValues(initialSecurity); setShowCurrentPw(false); setShowNewPw(false); setShowConfirmPw(false); }}
                className="px-4 py-2 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] rounded-lg hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
                style={{ fontWeight: 600 }}
              >
                Cancel
              </button>
              <button
                onClick={() => { alert("Password updated!"); setShowPasswordModal(false); setValues(initialSecurity); }}
                disabled={!hasChanges || (values.newPassword !== values.confirmPassword)}
                className="px-5 py-2 bg-[var(--accent-solid)] text-[color:var(--text-on-accent)] font-['Inter',sans-serif] text-[length:var(--text-sm)] rounded-lg hover:bg-[var(--accent-solid-hover)] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontWeight: 600 }}
              >
                Update password
              </button>
            </div>
          </div>
        </div>
      )}

        {/* ── Connected Devices ── */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-1">
            <h5 className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
              Connected Devices
            </h5>
            {devices.filter((d) => !d.current).length > 0 && (
              <button
                onClick={handleRevokeAll}
                className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[#e5484d] hover:text-[var(--danger-hover)] transition-colors cursor-pointer flex items-center gap-1.5"
                style={{ fontWeight: 600 }}
              >
                <LogOut size={13} />
                Revoke all other sessions
              </button>
            )}
          </div>
          <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] max-w-[75ch]">
            Devices that are currently signed in to your account.
          </p>
          <div className="h-px bg-[var(--border-subtle)] mt-4" />

          {/* Table */}
          <div className="border border-[var(--border-default)] rounded-lg overflow-hidden mt-4">
            {/* Header */}
            <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1fr)_40px] bg-[var(--bg-subtle)] border-b border-[var(--border-subtle)]">
              {["Device", "Location", "Last Active", ""].map((col) => (
                <div key={col || "action"} className="px-3 py-2.5">
                  <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)] uppercase tracking-wider" style={{ fontWeight: 600 }}>
                    {col}
                  </span>
                </div>
              ))}
            </div>

            {/* Rows */}
            {devices.map((device, i) => {
              const Icon = deviceIcons[device.type];
              return (
                <div
                  key={device.id}
                  className={`grid grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1fr)_40px] items-center ${
                    i < devices.length - 1 ? "border-b border-[var(--border-subtle)]" : ""
                  } hover:bg-[var(--bg-hover)] transition-colors`}
                >
                  {/* Device */}
                  <div className="px-3 py-3 flex items-center gap-2.5 min-w-0">
                    <div className="size-8 rounded-lg bg-[var(--bg-muted)] flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-[var(--text-secondary)]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] truncate" style={{ fontWeight: 600 }}>
                          {device.name}
                        </span>
                        {device.current && (
                          <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--success)] bg-[var(--success-bg)] rounded-full px-2 py-0.5 shrink-0" style={{ fontWeight: 600 }}>
                            Current
                          </span>
                        )}
                      </div>
                      <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)]">
                        {device.browser} · {device.ip}
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="px-3 py-3">
                    <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
                      {device.location}
                    </span>
                  </div>

                  {/* Last Active */}
                  <div className="px-3 py-3">
                    <span className={`font-['Inter',sans-serif] text-[length:var(--text-sm)] ${
                      device.current ? "text-[color:var(--success)]" : "text-[color:var(--text-muted)]"
                    }`} style={device.current ? { fontWeight: 600 } : undefined}>
                      {device.lastActive}
                    </span>
                  </div>

                  {/* Action */}
                  <div className="px-1 py-3 flex justify-center">
                    {!device.current && (
                      <button
                        onClick={() => handleRevokeDevice(device.id)}
                        className="size-7 flex items-center justify-center rounded-md text-[var(--text-muted)] hover:text-[#e5484d] hover:bg-[var(--danger-bg)] transition-colors cursor-pointer"
                        title="Revoke session"
                      >
                        <LogOut size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {devices.length === 0 && (
              <div className="py-10 flex flex-col items-center gap-2">
                <Monitor size={28} className="text-[var(--text-muted)] opacity-40" />
                <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-muted)]">
                  No connected devices
                </span>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}