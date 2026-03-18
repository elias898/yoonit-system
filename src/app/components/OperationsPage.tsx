import { cn } from "./ui/utils";

interface OperationsPageProps {
  className?: string;
}

export function OperationsPage({ className = "" }: OperationsPageProps) {
  return (
    <div
      className={cn("flex items-center justify-center p-6", className)}
      data-component="operations-page"
    >
      <span className="text-[length:var(--text-lg)] text-[color:var(--text-muted)]">
        Operations
      </span>
    </div>
  );
}
