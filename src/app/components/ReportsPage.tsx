import { cn } from "./ui/utils";

interface Report {
  id: number;
  name: string;
  description: string;
  category: string;
  module: string;
  type: string;
  status: string;
  generatedDate: string;
  generatedBy: {
    id: number;
    name: string;
  };
}

const INITIAL_REPORTS: Report[] = [
  { id: 1, name: "Wallet Transactions", description: "All wallet deposits, withdrawals and transfers", category: "Finance", module: "Finance", type: "Transactions", status: "Ready", generatedDate: "2026-03-16T09:30:00", generatedBy: { id: 1, name: "Elena Papadopoulos" } },
  { id: 2, name: "Trade History", description: "Complete trade execution log", category: "Trading", module: "CRM", type: "History", status: "Ready", generatedDate: "2026-03-16T08:00:00", generatedBy: { id: 2, name: "Marcus Chen" } },
  { id: 3, name: "Performance Fee", description: "MAM performance fee calculations", category: "MAM", module: "MAM", type: "Fee Report", status: "Ready", generatedDate: "2026-03-15T18:00:00", generatedBy: { id: 1, name: "Elena Papadopoulos" } },
  { id: 4, name: "Idle Clients", description: "Clients with no activity", category: "CRM", module: "CRM", type: "Activity", status: "Processing", generatedDate: "2026-03-15T12:00:00", generatedBy: { id: 3, name: "Sofia Andreou" } },
  { id: 5, name: "Wallet Balance History", description: "Daily wallet balance snapshots", category: "Finance", module: "Finance", type: "History", status: "Ready", generatedDate: "2026-03-14T09:00:00", generatedBy: { id: 1, name: "Elena Papadopoulos" } },
  { id: 6, name: "Registrations", description: "New client registrations", category: "CRM", module: "CRM", type: "Registrations", status: "Ready", generatedDate: "2026-03-14T08:00:00", generatedBy: { id: 2, name: "Marcus Chen" } },
];

export type { Report };
export { INITIAL_REPORTS };
