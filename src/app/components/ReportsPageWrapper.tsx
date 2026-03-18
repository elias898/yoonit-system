import { cn } from "./ui/utils";

interface ReportsPageWrapperProps {
  className?: string;
}

export function ReportsPageWrapper({ className = "" }: ReportsPageWrapperProps) {
  return (
    <div
      className={cn("flex items-center justify-center p-6", className)}
      data-component="reports-page"
    >
      <span className="text-[length:var(--text-lg)] text-[color:var(--text-muted)]">
        Reports
      </span>
    </div>
  );
}
