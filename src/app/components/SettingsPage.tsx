import { ExpandableSettingRow } from "./ExpandableSettingRow";
import { SettingDetailPage } from "./SettingDetailPage";
import { CopyTradeConfigPanel } from "./CopyTradeConfigPanel";
import { RiskStatementPanel } from "./RiskStatementPanel";
import { SymbolsPanel } from "./SymbolsPanel";
import { SymbolsMappingPanel } from "./SymbolsMappingPanel";
import { CountriesPanel } from "./CountriesPanel";
import { SyncConfigPanel } from "./SyncConfigPanel";
import { PartnersConfigPanel, PartnersSyncPanel, CommentRulesPanel } from "./PartnersConfigPanel";
import { MAMConfigPanel, MAMSyncPanel } from "./MAMConfigPanel";
import { BonusConfigPanel, BonusSyncPanel } from "./BonusConfigPanel";
import { DynamicMarginPanel } from "./DynamicMarginPanel";
import { CompanyPanel } from "./CompanyPanel";
import { CompanyDetailsPanel } from "./CompanyDetailsPanel";
import { CompanyContactPanel } from "./CompanyContactPanel";
import { CompanyAdminsPanel } from "./CompanyAdminsPanel";
import { MyProfilePanel } from "./MyProfilePanel";
import { ProfilePersonalPanel } from "./ProfilePersonalPanel";
import { ProfilePreferencesPanel } from "./ProfilePreferencesPanel";
import { ProfileSecurityPanel } from "./ProfileSecurityPanel";
import { ProfileNotificationsPanel } from "./ProfileNotificationsPanel";
import { CRMFlowPanel } from "./CRMFlowPanel";
import { CRMQuestionnairePanel } from "./CRMQuestionnairePanel";
import {
  DeletedClientsPanel,
  ClientIDRangePanel,
  AccountTypesPanel,
  PoolsPanel,
  WalletTypesPanel,
  RegistrationPanel,
} from "./HubConfigPanels";
import { Teams2Panel } from "./Teams2Panel";
import { StaffPanel } from "./StaffPanel";
import { RolesPanel } from "./RolesPanel";
import { ButtonTab } from "./ButtonTab";
import { SubMenuItem } from "./SubSidebar";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  Search,
  Users,
  Trash2,
  Hash,
  CreditCard,
  Layers,
  Wallet,
  Globe,
  FileEdit,
  RefreshCw,
  GitBranch,
  ClipboardList,
  Settings2,
  AlertTriangle,
  BarChart3,
  Link2,
  Box,
  Download,
  Plus,
  X,
  Shield,
  UserX,
  KeyRound,
  Copy,
  Percent,
  MessageSquare,
  TrendingUp,
  Zap,
  Building2,
  Mail,
  Workflow,
  Plug,
  User,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

type SettingsSection = {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  itemName?: string;
  hidden?: boolean;
};

// Core settings now live under Configuration
const configurationSections: SettingsSection[] = [
  { id: "deleted-clients", label: "Deleted Clients", icon: Trash2, description: "View clients that have been deleted; allows restoration or permanent deletion." },
  { id: "client-id-range", label: "Client IDs", icon: Hash, description: "Create ID ranges to be used for different categorisations and pools." },
  { id: "account-types", label: "Account Types", icon: CreditCard, description: "Create different types of accounts tailored to different offerings, controlling many aspects of those accounts." },
  { id: "pools", label: "Segments (Pools)", icon: Layers, description: "Segregate accounts into different pools for different segregation purposes or jurisdictions." },
  { id: "wallet-types", label: "Wallet Types", icon: Wallet, description: "Create multi-currency wallets with different permissions across different modules." },
  { id: "countries", label: "Countries", icon: Globe, description: "Select or deselect the countries that are available to the registration form." },
  { id: "registration", label: "Registration", icon: FileEdit, description: "Customise the registration form across different modules." },
  { id: "synchronize", label: "Synchronization", icon: RefreshCw, description: "Set a regular interval at which the system is synchronized with the MT Server, or synchronize manually at any time." },
];

// Module sections with their tab grouping
type ModuleSection = SettingsSection & { tab: string };

const moduleSections: ModuleSection[] = [
  // CRM
  { id: "flow", label: "Onboarding Flows", icon: GitBranch, description: "Design the entire onboarding application flow on a per-pool basis.", tab: "CRM" },
  { id: "questionnaire", label: "Questionnaire Templates", icon: ClipboardList, description: "Design and customise application questionnaires in a flexible, configurable way.", tab: "CRM" },
  // CopyTrade
  { id: "copy-trade-config", label: "Configuration", icon: Settings2, description: "Configure fee schedules, copy modes, trade visibility, provider permissions, numeric limits, and symbol/session handling for the copy trading module.", tab: "CopyTrade" },
  { id: "risk-statement", label: "Risk Statement", icon: AlertTriangle, description: "Define the risk statement text displayed as a warning on provider pages within copy trading.", tab: "CopyTrade" },
  { id: "symbols", label: "Symbols", icon: BarChart3, description: "Manage symbols by asset class and configure symbol-mapping rules that align naming across servers and groups.", tab: "CopyTrade" },
  { id: "symbols-mapping", label: "Symbols Mapping", icon: Link2, description: "Configure symbol-mapping rules that align naming conventions across different servers and groups.", tab: "CopyTrade" },
  // Partners
  { id: "partners-config", label: "Configuration", icon: Settings2, description: "Configure IB settings per server including auto-link behaviour and account link types.", tab: "Partners" },
  { id: "partner-id", label: "Partner ID", icon: Hash, description: "Set up different IB code ranges to be used for different types of agents.", tab: "Partners", itemName: "ID Range" },
  { id: "partners-sync", label: "Synchronization", icon: RefreshCw, description: "Synchronize partner data including trades, commissions, and account links.", tab: "Partners" },
  { id: "static-markup", label: "Static Markup", icon: BarChart3, description: "Manage static markup values applied to symbols for partner commission calculations.", tab: "Partners", itemName: "Markup" },
  { id: "volume-coefficient", label: "Volume Coefficient", icon: Percent, description: "Configure volume coefficient ratios per symbol and security for IB commission calculations.", tab: "Partners", itemName: "Coefficient" },
  { id: "comment-rules", label: "Comment Rules", icon: MessageSquare, description: "Define comment patterns to exclude specific withdrawal and deposit operations from IB calculations.", tab: "Partners" },
  // MAM
  { id: "mam-config", label: "Configuration", icon: Settings2, description: "Configure MAM display settings and performance fee calculation parameters.", tab: "MAM" },
  { id: "mam-sync", label: "Synchronization", icon: RefreshCw, description: "Synchronize the MAM Portal with MT Platforms to accommodate changes or resolve issues.", tab: "MAM" },
  // Bonus
  { id: "bonus-config", label: "Configuration", icon: Settings2, description: "Configure bonus behaviour including negative balance, stopout, adjustment rules, and transaction comments.", tab: "Bonus" },
  { id: "bonus-sync", label: "Synchronization", icon: RefreshCw, description: "Synchronize campaigns with the Bonus application to accommodate changes on either end.", tab: "Bonus" },
  // Dynamic Margin
  { id: "dynamic-margin-adjust", label: "Adjustment", icon: TrendingUp, description: "Recalculate and adjust margin for logins with open positions based on the respective DM Profile.", tab: "Dynamic Margin" },
];

const moduleTabs = ["CRM", "CopyTrade", "Partners", "MAM", "Bonus", "Dynamic Margin"] as const;

// Company sections
const companySections: SettingsSection[] = [
  { id: "company-details", label: "Company Details", icon: Building2, description: "Basic information about your company that appears across the platform and client-facing materials." },
  { id: "company-contact", label: "Contact Information", icon: Mail, description: "Primary contact details used for client communications and regulatory correspondence." },
  { id: "company-admins", label: "Administrators", icon: Shield, description: "Users with administrative access to the platform settings and configuration." },
];

// Mock table data generator
function getMockData(sectionId: string): { columns: string[]; rows: string[][] } {
  switch (sectionId) {
    case "deleted-clients":
      return { columns: ["Name", "CID", "Email", "Group Type", "Deleted Date"], rows: [["Former Client A", "CL-0500", "former.a@example.com", "Individual", "Mar 1st 2026"], ["Former Client B", "CL-0412", "former.b@example.com", "Corporate", "Feb 20th 2026"]] };
    case "client-id-range":
      return { columns: ["Range Name", "Client ID Start", "Client ID End", "Pool"], rows: [["Default Range", "1000", "9999", "Default Pool"], ["VIP Range", "10000", "19999", "VIP Pool"]] };
    case "account-types":
      return { columns: ["Account Type", "Server", "Demo", "Status"], rows: [["Standard", "MT5-Live", "No", "Active"], ["ECN", "MT5-Live", "No", "Active"], ["Demo Standard", "MT5-Demo", "Yes", "Active"], ["Cent", "MT4-Live", "No", "Active"], ["Islamic", "MT5-Live", "No", "Active"]] };
    case "pools":
      return { columns: ["Pool Name", "Pool ID", "Default"], rows: [["Default Pool", "1", "Yes"], ["MEA Pool", "2", "No"], ["EU Pool", "3", "No"], ["APAC Pool", "4", "No"]] };
    case "wallet-types":
      return { columns: ["Type Name", "Category", "Default", "Permissions"], rows: [["USD Wallet", "Fiat", "Yes", "All modules"], ["EUR Wallet", "Fiat", "No", "Trading"], ["Crypto Wallet", "Digital", "No", "Trading, CopyTrade"], ["Bonus Wallet", "Promotional", "No", "Trading"], ["Reward Wallet", "Promotional", "No", "CRM"], ["BTC Wallet", "Digital", "No", "Trading"]] };
    case "countries":
      return { columns: ["Country", "Region", "Enabled", "Registration"], rows: [["United Kingdom", "Europe", "Yes", "Enabled"], ["United States", "North America", "Yes", "Enabled"], ["UAE", "Middle East", "Yes", "Enabled"], ["Germany", "Europe", "Yes", "Enabled"], ["Japan", "Asia", "Yes", "Enabled"]] };
    case "registration":
      return { columns: ["Type", "Module", "Status", "Fields"], rows: [["Trader", "Core", "Active", "12 fields"], ["IB", "CRM", "Active", "15 fields"], ["Corporate", "Core", "Active", "20 fields"], ["Sub-IB", "CRM", "Draft", "10 fields"], ["Fund Manager", "CopyTrade", "Active", "14 fields"], ["Investor", "CopyTrade", "Active", "11 fields"], ["Demo", "Core", "Active", "5 fields"]] };
    case "synchronize":
      return { columns: ["Server", "Last Sync", "Interval", "Status"], rows: [["MT5-Live-01", "Mar 5th 2026 10:30", "5 min", "Active"], ["MT5-Live-02", "Mar 5th 2026 10:28", "5 min", "Active"], ["MT4-Live", "Mar 5th 2026 10:25", "10 min", "Active"], ["MT5-Demo", "Mar 5th 2026 09:00", "30 min", "Active"]] };
    case "flow":
      return { columns: ["Flow Name", "Client Type", "Flow Type", "Default", "Status", "Created"], rows: [["Main Onboarding", "Individual", "trader", "True", "Enabled", "Aug 23rd 2024"], ["Corporate Flow", "Corporate", "trader", "False", "Enabled", "Sep 15th 2024"], ["IB Application", "Individual", "IB", "True", "Enabled", "Oct 1st 2024"], ["MEA Clients", "Individual", "trader", "False", "Disabled", "Nov 14th 2024"]] };
    case "questionnaire":
      return { columns: ["Name", "Description", "Questions", "Status", "Updated"], rows: [["KYC Basic", "Basic KYC questionnaire", "8", "Active", "Feb 28th 2026"], ["Risk Assessment", "Trading risk profile", "12", "Active", "Feb 15th 2026"], ["Suitability", "Investment suitability", "10", "Active", "Jan 30th 2026"], ["AML Check", "Anti-money laundering", "6", "Draft", "Mar 1st 2026"], ["Experience Survey", "Trading experience", "15", "Active", "Mar 3rd 2026"]] };
    case "risk-statement":
      return { columns: ["Label", "Content"], rows: [["Risk Warning Title", "Important Risk Disclosure"], ["Risk Warning Body", "Past performance is not indicative of future results. Trading involves significant risk of loss."], ["Display Location", "Provider profile page, Strategy page"], ["Last Updated", "Feb 1st 2026"]] };
    case "symbols":
      return { columns: ["Symbol", "Asset Class", "Description", "Status"], rows: [["EURUSD", "Forex", "Euro / US Dollar", "Active"], ["GBPUSD", "Forex", "British Pound / US Dollar", "Active"], ["XAUUSD", "Metals", "Gold / US Dollar", "Active"], ["US30", "Index", "Dow Jones Industrial", "Active"], ["BTCUSD", "Crypto", "Bitcoin / US Dollar", "Active"]] };
    case "partner-id":
      return { columns: ["IDs Range", "Start Range", "End Range", "Default"], rows: [["Standard IB", "50000", "59999", "Yes"], ["Sub-IB", "60000", "69999", "No"], ["VIP Partners", "70000", "79999", "No"]] };
    case "static-markup":
      return { columns: ["Symbol", "Markup"], rows: [["EURUSD", "0.5"], ["GBPUSD", "0.8"], ["USDJPY", "0.6"], ["XAUUSD", "1.2"], ["US30", "2.0"]] };
    case "volume-coefficient":
      return { columns: ["Symbol", "Security", "Ratio"], rows: [["EURUSD", "Forex", "1.00"], ["GBPUSD", "Forex", "1.00"], ["XAUUSD", "Metals", "0.10"], ["US30", "Index", "0.01"], ["BTCUSD", "Crypto", "0.001"]] };
    default:
      return { columns: ["Name", "Status"], rows: [["Item 1", "Active"], ["Item 2", "Active"]] };
  }
}

export function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeMenuSection, setActiveMenuSection] = useState<"my-profile" | "modules" | "configuration" | "teams" | "automation" | "company">("configuration");
  const [activeModuleTab, setActiveModuleTab] = useState<string>("CRM");
  const [activeTeamTab, setActiveTeamTab] = useState<"staff" | "roles" | "org-structure">("org-structure");
  const [teamSearch, setTeamSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchActive, setSearchActive] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [staffSelectedIds, setStaffSelectedIds] = useState<Set<string>>(new Set());
  const [rolesSelectedIds, setRolesSelectedIds] = useState<Set<string>>(new Set());
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [activeAutomationTab, setActiveAutomationTab] = useState<"integrations" | "mass-email" | "workflows">("integrations");
  const [openPageId, setOpenPageId] = useState<string | null>(null);
  const [modulesMenuOpen, setModulesMenuOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<"personal" | "preferences" | "security" | "notifications">("personal");

  // Handle deep-link from avatar menu (e.g. /settings?section=my-profile&tab=personal)
  useEffect(() => {
    const section = searchParams.get("section");
    const tab = searchParams.get("tab");
    if (section === "my-profile") {
      setActiveMenuSection("my-profile");
      setOpenPageId(null);
      if (tab === "personal" || tab === "preferences" || tab === "security" || tab === "notifications") {
        setActiveProfileTab(tab);
      }
      // Clear search params after consuming them
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const toggleModuleExpand = (id: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Get module sections for the active tab
  const activeTabSections = moduleSections.filter((s) => s.tab === activeModuleTab && !s.hidden);

  // When switching menu sections
  const handleMenuSwitch = (section: "my-profile" | "modules" | "configuration" | "teams" | "automation" | "company") => {
    setActiveMenuSection(section);
    setSearchQuery("");
    setOpenPageId(null);
    if (section === "modules") {
      setActiveModuleTab("CRM");
    }
    setExpandedModules(new Set());
  };

  // Map section id → panel content for the detail page
  const getPanelContent = (id: string): React.ReactNode => {
    switch (id) {
      case "deleted-clients": return <DeletedClientsPanel />;
      case "client-id-range": return <ClientIDRangePanel />;
      case "account-types": return <AccountTypesPanel />;
      case "pools": return <PoolsPanel />;
      case "wallet-types": return <WalletTypesPanel />;
      case "countries": return <CountriesPanel />;
      case "registration": return <RegistrationPanel />;
      case "synchronize": return <SyncConfigPanel />;
      case "flow": return <CRMFlowPanel />;
      case "questionnaire": return <CRMQuestionnairePanel />;
      case "copy-trade-config": return <CopyTradeConfigPanel />;
      case "risk-statement": return <RiskStatementPanel />;
      case "symbols": return <SymbolsPanel />;
      case "symbols-mapping": return <SymbolsMappingPanel />;
      case "partners-config": return <PartnersConfigPanel />;
      case "partners-sync": return <PartnersSyncPanel />;
      case "comment-rules": return <CommentRulesPanel />;
      case "mam-config": return <MAMConfigPanel />;
      case "mam-sync": return <MAMSyncPanel />;
      case "bonus-config": return <BonusConfigPanel />;
      case "bonus-sync": return <BonusSyncPanel />;
      case "dynamic-margin-adjust": return <DynamicMarginPanel />;
      case "company-details": return <CompanyDetailsPanel />;
      case "company-contact": return <CompanyContactPanel />;
      case "company-admins": return <CompanyAdminsPanel />;
      default: {
        const data = getMockData(id);
        return (
          <div className="border border-[var(--border-default)] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--bg-subtle)] border-b border-[var(--border-subtle)]">
                  {data.columns.map((col) => (
                    <th key={col} className="text-left px-4 py-2.5 font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)] tracking-[0.2px]" style={{ fontWeight: 600 }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, i) => (
                  <tr key={i} className="border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--accent-bg-subtle)] transition-colors cursor-pointer">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-2.5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }
  };

  // When switching module tabs
  const handleTabSwitch = (tab: string) => {
    setActiveModuleTab(tab);
    setExpandedModules(new Set());
  };

  // Focus search input when search is active
  useEffect(() => {
    if (searchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchActive]);

  // Detail page — full-width, no sidebar
  if (openPageId) {
    const section = [...configurationSections, ...moduleSections, ...companySections].find((s) => s.id === openPageId);
    if (section) {
      return (
        <div className="flex flex-1 min-w-0 mb-2 mr-2 rounded-2xl overflow-hidden bg-[var(--bg-surface)]">
          <SettingDetailPage
            label={section.label}
            description={section.description}
            icon={section.icon}
            onBack={() => setOpenPageId(null)}
          >
            {getPanelContent(openPageId)}
          </SettingDetailPage>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-1 min-w-0 mb-2 mr-2 rounded-2xl overflow-hidden bg-[var(--bg-surface)]">
      {/* Settings Left Sidebar */}
      {activeMenuSection !== "my-profile" && (
      <div className="w-[260px] shrink-0 border-r border-[var(--border-default)] flex flex-col h-full bg-[var(--bg-subtle)]">
        {/* Header */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <h4 className="text-[length:var(--text-h4)] text-[color:var(--text-primary)] tracking-[0.36px]">
              Settings
            </h4>
            {!searchActive ? (
              <button
                onClick={() => setSearchActive(true)}
                className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
              >
                <Search size={15} className="text-[var(--text-secondary)]" />
              </button>
            ) : null}
          </div>
          {searchActive ? (
            <div className={`flex items-center rounded-lg h-8 px-2.5 gap-2 mt-2 transition-colors ${
              searchQuery
                ? "bg-[var(--slate-2)] border-2 border-[var(--indigo-7)]"
                : "bg-[var(--slate-3)] border border-transparent focus-within:border-2 focus-within:border-[var(--indigo-7)] focus-within:bg-[var(--slate-2)]"
            }`}>
              <Search size={14} className={`shrink-0 ${searchQuery ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  if (!searchQuery) setSearchActive(false);
                }}
                className="flex-1 bg-transparent text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-['Inter',sans-serif] outline-none placeholder:text-[var(--text-muted)]"
              />
            </div>
          ) : (
            null
          )}
        </div>

        {/* Top-level menu items */}
        <div className="flex flex-col px-3 gap-1 pb-3">
          
          <SubMenuItem
            icon={Settings2}
            label="Hub Configuration"
            active={activeMenuSection === "configuration"}
            onClick={() => handleMenuSwitch("configuration")}
          />
          <div>
            <button
              onClick={() => {
                setModulesMenuOpen((prev) => {
                  const next = !prev;
                  if (next && activeMenuSection !== "modules") {
                    handleMenuSwitch("modules");
                  }
                  return next;
                });
              }}
              className={`w-full relative flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                modulesMenuOpen
                  ? "bg-[var(--bg-hover)] text-[var(--indigo-12)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Box size={18} className={modulesMenuOpen ? "text-[var(--indigo-12)]" : ""} />
              <span className="font-['Inter',sans-serif] font-medium text-[length:var(--text-body)] tracking-[-0.28px] flex-1">Modules</span>
              {modulesMenuOpen ? (
                <ChevronDown size={14} className="shrink-0 opacity-60" />
              ) : (
                <ChevronRight size={14} className="shrink-0 opacity-60" />
              )}
            </button>
            {modulesMenuOpen && (
              <div className="flex flex-col gap-0.5 ml-7 mt-1">
                {moduleTabs.map((tab) => (
                  <SubMenuItem
                    key={tab}
                    label={tab}
                    active={activeModuleTab === tab && activeMenuSection === "modules"}
                    onClick={() => {
                      handleMenuSwitch("modules");
                      setModulesMenuOpen(true);
                      setActiveModuleTab(tab);
                      setExpandedModules(new Set());
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <SubMenuItem
            icon={Users}
            label="Team Management"
            active={activeMenuSection === "teams"}
            onClick={() => handleMenuSwitch("teams")}
          />
          <SubMenuItem
            icon={Zap}
            label="Automation"
            active={activeMenuSection === "automation"}
            onClick={() => handleMenuSwitch("automation")}
          />
          <SubMenuItem
            icon={Building2}
            label="Company"
            active={activeMenuSection === "company"}
            onClick={() => handleMenuSwitch("company")}
          />
        </div>
      </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[var(--bg-surface)]">
        {/* === MY PROFILE VIEW === */}
        {activeMenuSection === "my-profile" && (
          <div className="flex-1 flex flex-col min-w-0 min-h-0">
            <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)]">
              <h4 className="text-[length:var(--text-h4)] text-[color:var(--text-primary)] tracking-[0.2px]">
                My Profile
              </h4>
              <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mt-1 mb-3">
                Manage your personal information, preferences, and security settings
              </p>
              <div className="flex gap-1">
                {([
                  { label: "Personal Information", key: "personal" as const },
                  { label: "Preferences", key: "preferences" as const },
                  { label: "Security", key: "security" as const },
                  { label: "Notifications", key: "notifications" as const },
                ]).map((tab) => (
                  <ButtonTab
                    key={tab.key}
                    label={tab.label}
                    isActive={activeProfileTab === tab.key}
                    onClick={() => setActiveProfileTab(tab.key)}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overlay-scrollbar">
              {activeProfileTab === "personal" && <ProfilePersonalPanel />}
              {activeProfileTab === "preferences" && <ProfilePreferencesPanel />}
              {activeProfileTab === "security" && <ProfileSecurityPanel />}
              {activeProfileTab === "notifications" && <ProfileNotificationsPanel />}
            </div>
          </div>
        )}

        {/* === MODULES VIEW: vertical list of all settings in the active tab === */}
        {activeMenuSection === "modules" && (
          <>
            {/* Breadcrumbs + Tabs header */}
            <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)]">
              <h4 className="text-[length:var(--text-h4)] text-[color:var(--text-primary)] tracking-[0.2px]">
                Modules
              </h4>
              <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mt-1 mb-3">
                Configure your platform modules
              </p>

              {/* Module tabs */}
              <div className="flex gap-1">
                {moduleTabs.map((tab) => (
                  <ButtonTab
                    key={tab}
                    label={tab}
                    isActive={activeModuleTab === tab}
                    onClick={() => handleTabSwitch(tab)}
                  />
                ))}
              </div>
            </div>

            {/* Scrollable list of module settings */}
            <div className="flex-1 overflow-y-auto overlay-scrollbar">
              {activeTabSections.map((section, index) => (
                <div key={section.id}>
                  <ExpandableSettingRow
                    id={section.id}
                    label={section.label}
                    description={section.description}
                    icon={section.icon}
                    isExpanded={false}
                    onToggle={() => setOpenPageId(section.id)}
                    itemName={section.itemName}
                  />
                  {index < activeTabSections.length - 1 && (
                    <div className="h-px bg-[var(--border-subtle)] mx-6" />
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* === CONFIGURATION VIEW: expandable list like modules === */}
        {activeMenuSection === "configuration" && (
          <>
            {/* Header */}
            <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)]">
              <h4 className="text-[length:var(--text-h4)] text-[color:var(--text-primary)] tracking-[0.2px]">
                Configuration
              </h4>
              <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mt-1">
                Core settings for your workspace
              </p>
            </div>

            {/* Scrollable list of configuration settings */}
            <div className="flex-1 overflow-y-auto overlay-scrollbar">
              {configurationSections
                .filter((s) => s.label.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((section, index, filtered) => (
                  <div key={section.id}>
                    <ExpandableSettingRow
                      id={section.id}
                      label={section.label}
                      description={section.description}
                      icon={section.icon}
                      isExpanded={false}
                      onToggle={() => setOpenPageId(section.id)}
                      itemName={section.itemName}
                    />
                    {index < filtered.length - 1 && (
                      <div className="h-px bg-[var(--border-subtle)] mx-6" />
                    )}
                  </div>
                ))}
            </div>
          </>
        )}

        {/* === TEAMS VIEW: placeholder === */}
        {activeMenuSection === "teams" && (
          <div className="flex-1 flex flex-col min-w-0">
            <div className="px-6 pt-6 pb-4 border-b border-[var(--border-default)]">
              <h4 className="text-[length:var(--text-h4)] text-[color:var(--text-primary)] tracking-[0.2px]">
                Team Management
              </h4>
              <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mt-1 mb-3">
                Manage your teams and permissions
              </p>

              {/* Team Management tabs */}
              <div className="flex gap-1">
                <ButtonTab label="Staff" isActive={activeTeamTab === "staff"} onClick={() => { setActiveTeamTab("staff"); setTeamSearch(""); setStaffSelectedIds(new Set()); }} />
                <ButtonTab label="Roles" isActive={activeTeamTab === "roles"} onClick={() => { setActiveTeamTab("roles"); setTeamSearch(""); setRolesSelectedIds(new Set()); }} />
                <ButtonTab label="Organizational Structure" isActive={activeTeamTab === "org-structure"} onClick={() => { setActiveTeamTab("org-structure"); setTeamSearch(""); setStaffSelectedIds(new Set()); }} />
              </div>
            </div>

            {/* Shared search / action toolbar OR bulk action ribbon */}
            {activeTeamTab === "staff" && staffSelectedIds.size > 0 ? (
              <div className="px-5 py-3 flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--indigo-2)]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setStaffSelectedIds(new Set())}
                    className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--indigo-4)] cursor-pointer transition-colors"
                  >
                    <X size={15} className="text-[var(--indigo-11)]" />
                  </button>
                  <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--indigo-11)] font-semibold">
                    {staffSelectedIds.size} selected
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg border border-[var(--indigo-6)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--indigo-11)] hover:bg-[var(--indigo-3)] cursor-pointer transition-colors">
                    <Shield size={14} />
                    Manage Roles
                  </button>
                  <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg border border-[var(--indigo-6)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--indigo-11)] hover:bg-[var(--indigo-3)] cursor-pointer transition-colors">
                    <KeyRound size={14} />
                    Reset Password
                  </button>
                  <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg border border-[var(--indigo-6)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--indigo-11)] hover:bg-[var(--indigo-3)] cursor-pointer transition-colors">
                    <UserX size={14} />
                    Disable
                  </button>
                  <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg border border-[var(--indigo-6)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--indigo-11)] hover:bg-[var(--indigo-3)] cursor-pointer transition-colors">
                    <Download size={14} />
                    Export
                  </button>
                  <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg border border-red-300 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--danger)] hover:bg-red-50 cursor-pointer transition-colors">
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            ) : activeTeamTab === "roles" && rolesSelectedIds.size > 0 ? (
              <div className="px-5 py-3 flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--indigo-2)]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setRolesSelectedIds(new Set())}
                    className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--indigo-4)] cursor-pointer transition-colors"
                  >
                    <X size={15} className="text-[var(--indigo-11)]" />
                  </button>
                  <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--indigo-11)] font-semibold">
                    {rolesSelectedIds.size} selected
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg border border-[var(--indigo-6)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--indigo-11)] hover:bg-[var(--indigo-3)] cursor-pointer transition-colors">
                    <Copy size={14} />
                    Clone
                  </button>
                  <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg border border-[var(--indigo-6)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--indigo-11)] hover:bg-[var(--indigo-3)] cursor-pointer transition-colors">
                    <Download size={14} />
                    Export
                  </button>
                  <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg border border-red-300 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--danger)] hover:bg-red-50 cursor-pointer transition-colors">
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className={`px-5 pt-3 flex items-center justify-between ${activeTeamTab === "org-structure" ? "pb-3 border-b border-[var(--border-subtle)]" : ""}`}>
                <div className="flex items-center gap-2 bg-[var(--slate-2)] rounded-lg h-8 px-2.5 w-[240px]">
                  <Search size={14} className="text-[var(--text-muted)] shrink-0" />
                  <input
                    value={teamSearch}
                    onChange={(e) => setTeamSearch(e.target.value)}
                    placeholder={activeTeamTab === "staff" ? "Search staff..." : activeTeamTab === "roles" ? "Search roles..." : "Search..."}
                    className="flex-1 bg-transparent font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer">
                    <Download size={14} />
                    Export
                  </button>
                  <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer" onClick={() => { if (activeTeamTab === "staff") setShowAddStaff(true); }}>
                    <Plus size={14} />
                    {activeTeamTab === "staff" ? "Add staff" : "Add"}
                  </button>
                </div>
              </div>
            )}

            <div className="flex-1 min-h-0">
              {activeTeamTab === "staff" && <StaffPanel search={teamSearch} selectedIds={staffSelectedIds} onSelectedIdsChange={setStaffSelectedIds} showAddUser={showAddStaff} onCloseAddUser={() => setShowAddStaff(false)} />}
              {activeTeamTab === "roles" && <RolesPanel search={teamSearch} selectedIds={rolesSelectedIds} onSelectedIdsChange={setRolesSelectedIds} />}
              {activeTeamTab === "org-structure" && <Teams2Panel search={teamSearch} />}
            </div>
          </div>
        )}

        {/* === AUTOMATION VIEW === */}
        {activeMenuSection === "automation" && (
          <div className="flex-1 flex flex-col min-w-0">
            <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)]">
              <h4 className="text-[length:var(--text-h4)] text-[color:var(--text-primary)] tracking-[0.2px]">
                Automation
              </h4>
              <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mt-1 mb-3">
                Manage integrations, email campaigns, and automated workflows
              </p>
              <div className="flex gap-1">
                <ButtonTab label="Integrations" isActive={activeAutomationTab === "integrations"} onClick={() => setActiveAutomationTab("integrations")} />
                <ButtonTab label="Mass Email" isActive={activeAutomationTab === "mass-email"} onClick={() => setActiveAutomationTab("mass-email")} />
                <ButtonTab label="Workflows" isActive={activeAutomationTab === "workflows"} onClick={() => setActiveAutomationTab("workflows")} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overlay-scrollbar">
              {activeAutomationTab === "integrations" && (
                <div className="p-6">
                  <div className="flex flex-col gap-4">
                    {[
                      { name: "Slack", description: "Send notifications and alerts to Slack channels when key events occur.", status: "Connected", icon: Plug },
                      { name: "Zapier", description: "Connect with 5,000+ apps through Zapier automations and triggers.", status: "Connected", icon: Zap },
                      { name: "Webhooks", description: "Send real-time HTTP callbacks to external services on specific events.", status: "Not configured", icon: Link2 },
                      { name: "Salesforce", description: "Sync client data bidirectionally with Salesforce CRM.", status: "Not configured", icon: RefreshCw },
                      { name: "Mailchimp", description: "Sync client segments and trigger email campaigns automatically.", status: "Not configured", icon: Mail },
                    ].map((integration) => (
                      <div key={integration.name} className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-default)] hover:bg-[var(--bg-hover)] transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[var(--slate-3)] flex items-center justify-center">
                            <integration.icon size={20} className="text-[var(--text-secondary)]" />
                          </div>
                          <div>
                            <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
                              {integration.name}
                            </h6>
                            <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mt-0.5">
                              {integration.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-['Inter',sans-serif] text-[length:var(--text-xs)] font-semibold ${
                            integration.status === "Connected"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-[var(--slate-3)] text-[color:var(--text-muted)]"
                          }`}>
                            {integration.status}
                          </span>
                          <button className="h-8 px-3 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
                            {integration.status === "Connected" ? "Configure" : "Connect"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeAutomationTab === "mass-email" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
                      Create and manage email campaigns to reach your clients at scale.
                    </p>
                    <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer">
                      <Plus size={14} />
                      New Campaign
                    </button>
                  </div>
                  <div className="rounded-lg border border-[var(--border-default)] overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[var(--bg-surface)] border-b border-[var(--border-default)]">
                          {["Campaign Name", "Recipients", "Status", "Sent", "Open Rate", "Created"].map((col) => (
                            <th key={col} className="text-left py-2.5 px-5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold tracking-[-0.06px]">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "Welcome Series", recipients: "All New Clients", status: "Active", sent: "1,240", openRate: "68%", created: "Feb 1st 2026" },
                          { name: "Monthly Newsletter", recipients: "All Active", status: "Scheduled", sent: "\u2014", openRate: "\u2014", created: "Mar 1st 2026" },
                          { name: "KYC Reminder", recipients: "Incomplete KYC", status: "Active", sent: "385", openRate: "42%", created: "Jan 15th 2026" },
                          { name: "Dormant Re-engagement", recipients: "Inactive 90d+", status: "Draft", sent: "\u2014", openRate: "\u2014", created: "Mar 4th 2026" },
                        ].map((campaign) => (
                          <tr key={campaign.name} className="border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--bg-hover)] transition-colors cursor-pointer">
                            <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--indigo-11)] font-semibold">{campaign.name}</td>
                            <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{campaign.recipients}</td>
                            <td className="py-3 px-5">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-['Inter',sans-serif] text-[length:var(--text-xs)] font-semibold ${
                                campaign.status === "Active" ? "bg-emerald-50 text-emerald-700" :
                                campaign.status === "Scheduled" ? "bg-blue-50 text-blue-700" :
                                "bg-[var(--slate-3)] text-[color:var(--text-muted)]"
                              }`}>
                                {campaign.status}
                              </span>
                            </td>
                            <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{campaign.sent}</td>
                            <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{campaign.openRate}</td>
                            <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{campaign.created}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeAutomationTab === "workflows" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
                      Build automated workflows triggered by client actions or system events.
                    </p>
                    <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer">
                      <Plus size={14} />
                      New Workflow
                    </button>
                  </div>
                  <div className="flex flex-col gap-3">
                    {[
                      { name: "New Client Onboarding", trigger: "Client Registration", steps: 5, status: "Active", lastRun: "Mar 5th 2026" },
                      { name: "KYC Follow-up", trigger: "KYC Incomplete (48h)", steps: 3, status: "Active", lastRun: "Mar 5th 2026" },
                      { name: "First Deposit Nudge", trigger: "Account Created (no deposit 7d)", steps: 4, status: "Active", lastRun: "Mar 4th 2026" },
                      { name: "VIP Upgrade", trigger: "Balance > $50,000", steps: 2, status: "Paused", lastRun: "Feb 28th 2026" },
                      { name: "Churn Prevention", trigger: "No login 30d+", steps: 6, status: "Draft", lastRun: "\u2014" },
                    ].map((wf) => (
                      <div key={wf.name} className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-default)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[var(--indigo-3)] flex items-center justify-center">
                            <Workflow size={20} className="text-[var(--indigo-11)]" />
                          </div>
                          <div>
                            <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
                              {wf.name}
                            </h6>
                            <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mt-0.5">
                              Trigger: {wf.trigger} &middot; {wf.steps} steps &middot; Last run: {wf.lastRun}
                            </p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-['Inter',sans-serif] text-[length:var(--text-xs)] font-semibold ${
                          wf.status === "Active" ? "bg-emerald-50 text-emerald-700" :
                          wf.status === "Paused" ? "bg-amber-50 text-amber-700" :
                          "bg-[var(--slate-3)] text-[color:var(--text-muted)]"
                        }`}>
                          {wf.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* === COMPANY VIEW === */}
        {activeMenuSection === "company" && (
          <>
            <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)]">
              <h4 className="text-[length:var(--text-h4)] text-[color:var(--text-primary)] tracking-[0.2px]">
                Company
              </h4>
              <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mt-1">
                Manage your company profile and business details
              </p>
            </div>

            <div className="flex-1 overflow-y-auto overlay-scrollbar">
              {companySections.map((section, index) => (
                <div key={section.id}>
                  <ExpandableSettingRow
                    id={section.id}
                    label={section.label}
                    description={section.description}
                    icon={section.icon}
                    isExpanded={false}
                    onToggle={() => setOpenPageId(section.id)}
                  />
                  {index < companySections.length - 1 && (
                    <div className="h-px bg-[var(--border-subtle)] mx-6" />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}