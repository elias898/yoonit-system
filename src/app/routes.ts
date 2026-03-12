import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { ClientsPageWrapper } from "./components/ClientsPageWrapper";
import { SettingsPage } from "./components/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: ClientsPageWrapper },
      { path: "settings", Component: SettingsPage },
    ],
  },
]);
