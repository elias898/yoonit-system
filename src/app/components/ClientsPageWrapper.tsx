import { useOutletContext } from "react-router";
import { ClientsPage } from "./ClientsPage";

type LayoutContext = {
  subSidebarOpen: boolean;
  setSubSidebarOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  sidePanelOpen: boolean;
  setSidePanelOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  sidePanelTab: "client" | "ai";
  setSidePanelTab: (v: "client" | "ai") => void;
};

export function ClientsPageWrapper() {
  const { subSidebarOpen, setSubSidebarOpen, sidePanelOpen, setSidePanelOpen, sidePanelTab, setSidePanelTab } =
    useOutletContext<LayoutContext>();

  return (
    <ClientsPage
      subSidebarOpen={subSidebarOpen}
      setSubSidebarOpen={setSubSidebarOpen}
      sidePanelOpen={sidePanelOpen}
      setSidePanelOpen={setSidePanelOpen}
      sidePanelTab={sidePanelTab}
      setSidePanelTab={setSidePanelTab}
    />
  );
}