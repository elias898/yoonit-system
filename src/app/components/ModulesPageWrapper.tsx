import { cn } from "./ui/utils";

interface ModulesPageWrapperProps {
  className?: string;
}

export function ModulesPageWrapper({ className = "" }: ModulesPageWrapperProps) {
  return (
    <div
      className={cn("flex items-center justify-center p-6", className)}
      data-component="modules-page"
    >
      <span className="text-[length:var(--text-lg)] text-[color:var(--text-muted)]">
        Modules
      </span>
    </div>
  );
}
