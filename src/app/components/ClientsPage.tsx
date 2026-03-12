import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SubSidebar } from "./SubSidebar";
import { ClientsTable } from "./ClientsTable";
import { ClientSidePanel } from "./ClientSidePanel";
import { ClientSettingsPage } from "./ClientSettingsPage";

export function ClientsPage({
  subSidebarOpen,
  setSubSidebarOpen,
  sidePanelOpen,
  setSidePanelOpen,
  sidePanelTab,
  setSidePanelTab,
}: {
  subSidebarOpen: boolean;
  setSubSidebarOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  sidePanelOpen: boolean;
  setSidePanelOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  sidePanelTab: "client" | "ai";
  setSidePanelTab: (v: "client" | "ai") => void;
}) {
  const [selectedClientId, setSelectedClientId] = useState<number | null>(0);
  const [settingsClientId, setSettingsClientId] = useState<number | null>(null);

  if (settingsClientId !== null) {
    return (
      <div className="flex flex-1 min-w-0 mb-2 mr-2">
        <ClientSettingsPage
          clientId={settingsClientId}
          onBack={() => setSettingsClientId(null)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-1 min-w-0 mb-2 mr-2 gap-2 rounded-2xl overflow-hidden">
      <motion.div
        initial={false}
        animate={{ width: subSidebarOpen ? 240 : 12 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="shrink-0 overflow-hidden flex"
      >
        {subSidebarOpen ? (
          <SubSidebar onClose={() => setSubSidebarOpen(false)} />
        ) : (
          <button
            onClick={() => setSubSidebarOpen(true)}
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer group"
            style={{
              backgroundColor: 'var(--bg-app)',
              boxShadow: 'inset -1px 0 0 0 var(--border-subtle)',
            }}
          >
            <div className="w-[3px] h-[16px] bg-[var(--resize-handle)] rounded-[50px] group-hover:bg-[var(--resize-handle-hover)] transition-colors" />
          </button>
        )}
      </motion.div>

      <div className="flex-1 min-w-0 pb-2">
        <ClientsTable
          onSelectClient={(id) => {
            setSelectedClientId(id);
            setSidePanelTab("client");
            setSidePanelOpen(true);
          }}
          selectedClientId={selectedClientId}
          onOpenSettings={setSettingsClientId}
        />
      </div>

      <AnimatePresence initial={false}>
        {sidePanelOpen && selectedClientId !== null && (
          <motion.div
            key="sidepanel"
            initial={{ width: 0 }}
            animate={{ width: 340 }}
            exit={{ width: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="shrink-0 overflow-hidden flex"
          >
            <ClientSidePanel onClose={() => setSidePanelOpen(false)} defaultTab={sidePanelTab} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}