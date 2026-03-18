import { cn } from "./ui/utils";

interface StatusBadgeProps {
  variant?: "active" | "pending" | "escalated";
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({
  variant = "active",
  children,
  className = "",
}: StatusBadgeProps) {
  const variantStyles = {
    active: "bg-[var(--green-3)] text-[var(--green-11)]",
    pending: "bg-[var(--warning-bg)] text-[var(--warning-text)]",
    escalated: "bg-[var(--red-3)] text-[var(--red-11)]",
  };

  return (
    <span
      className={cn(
        "inline-flex h-[22px] px-2 items-center rounded font-['Inter',sans-serif] text-[12px] tracking-[-0.06px] font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
