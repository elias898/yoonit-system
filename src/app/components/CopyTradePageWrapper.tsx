import { cn } from "./ui/utils";

interface CopyTradePageWrapperProps {
  className?: string;
}

export function CopyTradePageWrapper({ className = "" }: CopyTradePageWrapperProps) {
  return (
    <div
      className={cn("flex items-center justify-center p-6", className)}
      data-component="copytrade-page"
    >
      <span className="text-[length:var(--text-lg)] text-[color:var(--text-muted)]">
        Copy Trade
      </span>
    </div>
  );
}
