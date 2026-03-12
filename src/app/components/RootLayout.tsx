import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { IconSidebar } from "./IconSidebar";
import { TopBar } from "./TopBar";
import { Toaster } from "sonner";

// Map routes to page keys for IconSidebar active state
const routeToPage: Record<string, string> = {
  "/": "clients",
  "/settings": "settings",
};

// Map page keys to routes for navigation
const pageToRoute: Record<string, string> = {
  home: "/",
  clients: "/",
  leads: "/",
  documents: "/",
  payments: "/",
  settings: "/settings",
  marketing: "/",
  reports: "/",
  tools: "/",
  teams: "/",
};

export function RootLayout() {
  const [subSidebarOpen, setSubSidebarOpen] = useState(true);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [sidePanelTab, setSidePanelTab] = useState<"client" | "ai">("client");
  const location = useLocation();
  const navigate = useNavigate();

  const activePage = routeToPage[location.pathname] || "clients";

  const handleNavigate = (page: string) => {
    const route = pageToRoute[page] || "/";
    navigate(route);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[var(--bg-app)] font-['Inter',sans-serif]">
      <Toaster richColors closeButton />
      <TopBar
        onToggleSubSidebar={() => setSubSidebarOpen((prev) => !prev)}
        onToggleSidePanel={() => setSidePanelOpen((prev) => !prev)}
        onOpenAiPanel={() => {
          setSidePanelTab("ai");
          setSidePanelOpen(true);
        }}
        onProfileNavigate={(tab) => {
          navigate(`/settings?section=my-profile&tab=${tab}`);
        }}
      />

      <div className="flex flex-1 min-h-0">
        <IconSidebar
          activePage={activePage}
          onNavigate={handleNavigate}
          subSidebarOpen={subSidebarOpen}
          onToggleSubSidebar={() => setSubSidebarOpen((prev) => !prev)}
        />
        <Outlet context={{ subSidebarOpen, setSubSidebarOpen, sidePanelOpen, setSidePanelOpen, sidePanelTab, setSidePanelTab }} />
      </div>
    </div>
  );
}