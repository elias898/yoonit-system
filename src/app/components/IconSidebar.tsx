import { useState } from "react";
import {
  Search,
  Home,
  Users,
  UserPlus,
  FileText,
  Wallet,
  Settings,
  Target,
  BarChart3,
  Wrench,
  Users2,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { NavIconButton } from "./NavIconButton";

const navItems = [
  { icon: Home, label: "Home", page: "home" },
  { icon: Users, label: "Clients", page: "clients" },
  { icon: UserPlus, label: "Leads", page: "leads" },
  { icon: FileText, label: "Documents", page: "documents" },
  { icon: Wallet, label: "Payments", page: "payments" },
  { icon: Target, label: "Marketing", page: "marketing" },
  { icon: BarChart3, label: "Reports", page: "reports" },
  { icon: Wrench, label: "Tools", page: "tools" },
  { icon: Users2, label: "Teams", page: "teams" },
  { icon: Settings, label: "Settings", page: "settings" },
];

export function IconSidebar({ activePage, onNavigate, subSidebarOpen, onToggleSubSidebar }: { activePage: string; onNavigate: (page: string) => void; subSidebarOpen?: boolean; onToggleSubSidebar?: () => void }) {
  return (
    <div className="flex flex-col items-center w-[56px] h-full bg-[var(--bg-app)] py-3 shrink-0">
      {/* Nav Items */}
      <div className="flex flex-col gap-4 flex-1">
        {navItems.map((item) => {
          const isActive = activePage === item.page;
          return (
            <NavIconButton
              key={item.page}
              icon={item.icon}
              label={item.label}
              isActive={isActive}
              onClick={() => onNavigate(item.page)}
            />
          );
        })}
        {/* Spacer to push toggle to bottom */}
        <div className="flex-1" />
        {/* Collapse / Expand submenu toggle */}
        <button
          onClick={onToggleSubSidebar}
          className="size-9 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer self-center"
          title={subSidebarOpen ? "Collapse submenu" : "Expand submenu"}
        >
          {subSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
        </button>
      </div>

      {/* Bottom avatar removed — moved to TopBar */}
    </div>
  );
}