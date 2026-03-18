import { cn } from "./ui/utils";

interface AccountsPageProps {
  className?: string;
}

export function AccountsPage({ className = "" }: AccountsPageProps) {
  return (
    <div
      className={cn("flex items-center justify-center p-6", className)}
      data-component="accounts-page"
    >
      <span className="text-[length:var(--text-lg)] text-[color:var(--text-muted)]">
        Accounts
      </span>
    </div>
  );
}
