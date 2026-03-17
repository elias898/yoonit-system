import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { ClientsPageWrapper } from "./components/ClientsPageWrapper";
import { SettingsPage } from "./components/SettingsPage";
import { ClientProfilePageRoute } from "./components/ClientProfilePageRoute";
import { DashboardPage } from "./components/DashboardPage";
import { OperationsPage } from "./components/OperationsPage";
import { AccountsPage } from "./components/AccountsPage";
import { FinancePageWrapper } from "./components/FinancePageWrapper";
import { ModulesPageWrapper } from "./components/ModulesPageWrapper";
import { ReportsPageWrapper } from "./components/ReportsPageWrapper";
import { LogsPage } from "./components/LogsPage";
import { CopyTradePageWrapper } from "./components/CopyTradePageWrapper";
import { ApplicationProfilePageRoute } from "./components/ApplicationProfilePageRoute";
import { ReportProfilePageRoute } from "./components/ReportProfilePageRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "operations", Component: OperationsPage },
      { path: "clients", Component: ClientsPageWrapper },
      { path: "clients/:id", Component: ClientProfilePageRoute },
      { path: "accounts", Component: AccountsPage },
      { path: "finance", Component: FinancePageWrapper },
      { path: "modules", Component: ModulesPageWrapper },
      { path: "reports", Component: ReportsPageWrapper },
      { path: "reports/:id", Component: ReportProfilePageRoute },
      { path: "logs", Component: LogsPage },
      { path: "settings", Component: SettingsPage },
      { path: "copytrade", Component: CopyTradePageWrapper },
      { path: "onboarding/applications/:id", Component: ApplicationProfilePageRoute },
    ],
  },
]);