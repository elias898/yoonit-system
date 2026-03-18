import { cn } from "./ui/utils";

interface FinancePageWrapperProps {
  className?: string;
}

export function FinancePageWrapper({ className = "" }: FinancePageWrapperProps) {
  return (
    <div
      className={cn("flex items-center justify-center p-6", className)}
      data-component="finance-page"
    >
      <span className="text-[length:var(--text-lg)] text-[color:var(--text-muted)]">
        Finance
      </span>
    </div>
  );
}
