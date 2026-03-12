import { Search, Bell, Server, Sparkles, Check, UserPlus, AlertTriangle, CreditCard, Settings, LogOut, Sun, Moon, User, ChevronRight } from "lucide-react";
import svgPaths from "../../imports/svg-9ezgt5521u";
import menuSvgPaths from "../../imports/svg-g8gsgks6k4";
import sidePanelSvgPaths from "../../imports/svg-1rgk5d53mt";
import { ReactNode, useState, useRef, useEffect } from "react";

function TopBarIconButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    null
  );
}

/* ── Mock server data ── */
const mockServers = [
  { name: "Server - MT4", type: "MT4", status: "online" as const, latency: "12ms", uptime: "99.98%" },
  { name: "Demo - MT5", type: "MT5", status: "online" as const, latency: "8ms", uptime: "99.99%" },
  { name: "Trade - MT4", type: "MT4", status: "offline" as const, latency: "—", uptime: "97.42%" },
  { name: "demo:chsandbox2 - CTrader", type: "cTrader", status: "online" as const, latency: "23ms", uptime: "99.91%" },
  { name: "Live - MT5", type: "MT5", status: "degraded" as const, latency: "142ms", uptime: "99.12%" },
];

function StatusDot({ status }: { status: "online" | "offline" | "degraded" }) {
  const colorMap = {
    online: "bg-[#30a46c]",
    offline: "bg-[#e5484d]",
    degraded: "bg-[#f5a623]",
  };
  return <span className={`inline-block size-2 rounded-full ${colorMap[status]}`} />;
}

function StatusLabel({ status }: { status: "online" | "offline" | "degraded" }) {
  const labelMap = { online: "Online", offline: "Offline", degraded: "Degraded" };
  const colorMap = {
    online: "text-[#30a46c]",
    offline: "text-[#e5484d]",
    degraded: "text-[#f5a623]",
  };
  return (
    <span className={`font-['Inter',sans-serif] text-[length:var(--text-xs)] ${colorMap[status]}`} style={{ fontWeight: 600 }}>
      {labelMap[status]}
    </span>
  );
}

function ServersStatusPopup({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-[390px] bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl shadow-lg z-50"
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <h6
          className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]"
          style={{ fontWeight: 600 }}
        >
          Servers Status
        </h6>
      </div>

      {/* Server list */}
      <div>
        {mockServers.map((server, i) => (
          <div key={server.name}>
            {i > 0 && <div className="h-px bg-[var(--border-subtle)] mx-4" />}
            <div className="px-4 py-3 flex items-center gap-3">
              {/* Status dot + name */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <StatusDot status={server.status} />
                  <span
                    className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] truncate"
                    style={{ fontWeight: 600 }}
                  >
                    {server.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 pl-4">
                  <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)]">
                    {server.type}
                  </span>
                  <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)]">
                    Latency: {server.latency}
                  </span>
                  <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)]">
                    Uptime: {server.uptime}
                  </span>
                </div>
              </div>
              {/* Status label */}
              <StatusLabel status={server.status} />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="h-px bg-[var(--border-subtle)]" />
      <div className="px-4 py-3 flex justify-center">
        <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)]">
          Last checked: 2 min ago
        </span>
      </div>
    </div>
  );
}

/* ── Mock notification data ── */
const mockNotifications = [
  {
    id: "1",
    icon: "user" as const,
    title: "New client registered",
    description: "John Smith completed registration via Public form.",
    time: "5 min ago",
    read: false,
  },
  {
    id: "2",
    icon: "alert" as const,
    title: "MT4 Server connection lost",
    description: "Trade - MT4 went offline. Auto-reconnect in progress.",
    time: "12 min ago",
    read: false,
  },
  {
    id: "3",
    icon: "payment" as const,
    title: "Deposit approved",
    description: "Client #4821 deposit of $2,500 has been approved.",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "4",
    icon: "settings" as const,
    title: "Bonus configuration updated",
    description: "Admin updated the default bonus percentage to 15%.",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "5",
    icon: "user" as const,
    title: "KYC verification pending",
    description: "Maria Garcia submitted documents for review.",
    time: "5 hours ago",
    read: true,
  },
];

function NotificationIcon({ type }: { type: "user" | "alert" | "payment" | "settings" }) {
  const iconMap = {
    user: <UserPlus size={14} />,
    alert: <AlertTriangle size={14} />,
    payment: <CreditCard size={14} />,
    settings: <Settings size={14} />,
  };
  const bgMap = {
    user: "bg-[var(--indigo-3)] text-[var(--indigo-11)]",
    alert: "bg-[#fff0e0] text-[#f5a623]",
    payment: "bg-[#e0f7e6] text-[#30a46c]",
    settings: "bg-[var(--slate-3)] text-[var(--text-secondary)]",
  };
  return (
    <div className={`size-7 rounded-full flex items-center justify-center shrink-0 ${bgMap[type]}`}>
      {iconMap[type]}
    </div>
  );
}

function NotificationsPopup({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState(mockNotifications);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-[370px] bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl shadow-lg z-50"
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h6
            className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]"
            style={{ fontWeight: 600 }}
          >
            Notifications
          </h6>
          {unreadCount > 0 && (
            <span className="bg-[var(--indigo-3)] text-[color:var(--indigo-11)] text-[length:var(--text-xs)] font-['Inter',sans-serif] rounded-full px-1.5 py-0.5 min-w-[20px] text-center" style={{ fontWeight: 600 }}>
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--indigo-11)] hover:text-[color:var(--indigo-12)] transition-colors flex items-center gap-1"
            style={{ fontWeight: 600 }}
          >
            <Check size={12} />
            Mark all as read
          </button>
        )}
      </div>

      {/* Notification list */}
      <div className="max-h-[360px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="py-12 flex flex-col items-center gap-2">
            <Bell size={32} className="text-[var(--text-muted)] opacity-40" />
            <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-muted)]">
              No notifications
            </span>
          </div>
        ) : (
          notifications.map((notification, i) => (
            <div key={notification.id}>
              {i > 0 && <div className="h-px bg-[var(--border-subtle)] mx-4" />}
              <div
                className={`px-4 py-3 flex items-start gap-3 transition-colors ${
                  !notification.read ? "bg-[var(--indigo-2)]" : ""
                }`}
              >
                <NotificationIcon type={notification.icon} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)]"
                      style={{ fontWeight: notification.read ? 400 : 600 }}
                    >
                      {notification.title}
                    </span>
                    {!notification.read && (
                      <span className="size-2 rounded-full bg-[var(--indigo-9)] shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)] mt-0.5 line-clamp-2">
                    {notification.description}
                  </p>
                  <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)] mt-1 block opacity-70">
                    {notification.time}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="h-px bg-[var(--border-subtle)]" />
      <div className="px-4 py-3 flex justify-center">
        <button className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--indigo-11)] hover:text-[color:var(--indigo-12)] transition-colors" style={{ fontWeight: 600 }}>
          View all notifications
        </button>
      </div>
    </div>
  );
}

export function TopBar({ onToggleSubSidebar, onToggleSidePanel, onOpenAiPanel, onProfileNavigate }: { onToggleSubSidebar?: () => void; onToggleSidePanel?: () => void; onOpenAiPanel?: () => void; onProfileNavigate?: (tab: "personal" | "preferences" | "security") => void }) {
  const [serversOpen, setServersOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains("dark"));
  const avatarMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(e.target as Node)) {
        setAvatarMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <div className="h-[52px] bg-[var(--bg-app)] flex items-center justify-between px-4 shrink-0">
      {/* Left: Logo and title */}
      <div className="flex items-center gap-2">
        <div className="size-8 flex items-center justify-center shrink-0">
          <svg width="16" height="23" viewBox="0 0 16 23.1028" fill="none">
            <path d={svgPaths.p374d48f1} fill="#1EBBBF" />
            <path d={svgPaths.p22a56700} fill="url(#topbar_paint0)" />
            <path d={svgPaths.p1d224b80} fill="url(#topbar_paint1)" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="topbar_paint0" x1="0" x2="12.6573" y1="11.163" y2="11.163">
                <stop stopColor="#6644E5" />
                <stop offset="0.17" stopColor="#6249E5" />
                <stop offset="0.4" stopColor="#575AE3" />
                <stop offset="0.67" stopColor="#4676DF" />
                <stop offset="0.96" stopColor="#2D9CDA" />
                <stop offset="1" stopColor="#2AA3DA" />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="topbar_paint1" x1="7.7274" x2="12.5752" y1="23.7969" y2="17.6994">
                <stop stopColor="#2AA3DA" />
                <stop offset="0.19" stopColor="#417DDE" />
                <stop offset="0.43" stopColor="#5B53E3" />
                <stop offset="0.56" stopColor="#6644E5" />
                <stop offset="0.64" stopColor="#5F3EDA" />
                <stop offset="0.78" stopColor="#4D32BA" />
                <stop offset="0.96" stopColor="#301E88" />
                <stop offset="0.97" stopColor="#301E87" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Center: Search bar */}
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-[var(--slate-2)] border border-transparent rounded-lg h-9 w-[308px] px-2 gap-2">
          <Search size={16} className="text-[var(--text-muted)]" />
          <span className="text-[length:var(--text-sm)] text-[color:var(--text-muted)] font-['Inter',sans-serif] flex-1 tracking-[0.21px]">
            Search
          </span>
          <div className="flex gap-1">
            <kbd className="text-[color:var(--text-muted)] text-[length:var(--text-sm)] font-['Inter',sans-serif] flex items-center">
              ⌘
            </kbd>
            <kbd className="text-[color:var(--text-muted)] text-[length:var(--text-sm)] font-['Inter',sans-serif] flex items-center">
              K
            </kbd>
          </div>
        </div>
        {/* AI Button */}
        <button
          onClick={onOpenAiPanel}
          className="bg-[var(--slate-2)] rounded-lg size-9 flex items-center justify-center cursor-pointer hover:bg-[var(--slate-3)] transition-colors"
        >
          <Sparkles size={18} className="text-[var(--accent-solid)]" fill="var(--accent-solid)" />
        </button>
      </div>

      {/* Right: action buttons */}
      <div className="flex items-center gap-1">
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setServersOpen(false);
            }}
            className={`size-[34px] flex items-center justify-center rounded-lg transition-colors ${
              notificationsOpen
                ? "bg-[var(--indigo-4)] text-[var(--indigo-11)]"
                : "text-[var(--text-secondary)] hover:bg-black/5"
            }`}
          >
            <Bell size={18} />
          </button>
          {notificationsOpen && <NotificationsPopup onClose={() => setNotificationsOpen(false)} />}
        </div>
        <div className="relative">
          <button
            onClick={() => {
              setServersOpen(!serversOpen);
              setNotificationsOpen(false);
            }}
            className={`size-[34px] flex items-center justify-center rounded-lg transition-colors ${
              serversOpen
                ? "bg-[var(--indigo-4)] text-[var(--indigo-11)]"
                : "text-[var(--text-secondary)] hover:bg-black/5"
            }`}
          >
            <Server size={18} />
          </button>
          {serversOpen && <ServersStatusPopup onClose={() => setServersOpen(false)} />}
        </div>
        <div data-name="SidePanel">
          <TopBarIconButton onClick={onToggleSidePanel}>
            <svg className="block" width="18" height="18" viewBox="-0.6 -0.6 15.5 15.5" fill="none">
              <path d={sidePanelSvgPaths.p1040be00} stroke="var(--text-secondary)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
            </svg>
          </TopBarIconButton>
        </div>
        {/* Avatar */}
        <div className="relative" ref={avatarMenuRef}>
          <button
            onClick={() => {
              setAvatarMenuOpen(!avatarMenuOpen);
              setServersOpen(false);
              setNotificationsOpen(false);
            }}
            className="size-[34px] bg-[var(--slate-3)] rounded-full flex items-center justify-center ml-1 cursor-pointer hover:bg-[var(--slate-4)] transition-colors border-[1.4px] border-[var(--slate-11)]"
          >
            <User size={15} className="text-[var(--slate-11)]" />
          </button>
          {avatarMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-[220px] bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl shadow-lg z-50 py-1.5">
              {/* Email — non-interactive */}
              <div className="px-3.5 py-2">
                <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-muted)] truncate block">
                  elena.p@yoonit.com
                </span>
              </div>
              <div className="h-px bg-[var(--border-subtle)] mx-2 my-1" />
              {/* Profile tab links */}
              {([
                { label: "Personal Information", tab: "personal" as const },
                { label: "Preferences", tab: "preferences" as const },
                { label: "Security", tab: "security" as const },
              ]).map((item) => (
                <button
                  key={item.tab}
                  onClick={() => {
                    onProfileNavigate?.(item.tab);
                    setAvatarMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-[var(--border-subtle)] mx-2 my-1" />
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-full text-left px-3.5 py-2 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer flex items-center gap-2.5"
              >
                {darkMode ? <Sun size={15} /> : <Moon size={15} />}
                <span className="flex-1">{darkMode ? "Light Mode" : "Dark Mode"}</span>
                <div
                  className={`w-8 h-[18px] rounded-full relative transition-colors ${
                    darkMode ? "bg-[var(--accent-solid)]" : "bg-[var(--slate-5)]"
                  }`}
                >
                  <div
                    className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform ${
                      darkMode ? "translate-x-[16px]" : "translate-x-[2px]"
                    }`}
                  />
                </div>
              </button>
              <div className="h-px bg-[var(--border-subtle)] mx-2 my-1" />
              {/* Log out — destructive */}
              <button
                onClick={() => {
                  setAvatarMenuOpen(false);
                  alert("Logged out!");
                }}
                className="w-full text-left px-3.5 py-2 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[#e5484d] hover:bg-[var(--danger-bg)] transition-colors cursor-pointer flex items-center gap-2.5"
              >
                <LogOut size={15} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}