import { cn } from "./ui/utils";

interface LogsPageProps {
  className?: string;
}

export function LogsPage({ className = "" }: LogsPageProps) {
  return (
    <div
      className={cn("flex items-center justify-center p-6", className)}
      data-component="logs-page"
    >
      <span className="text-[length:var(--text-lg)] text-[color:var(--text-muted)]">
        Logs
      </span>
    </div>
  );
}
