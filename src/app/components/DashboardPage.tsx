import { User } from "lucide-react";
import { cn } from "./ui/utils";

interface DashboardPageProps {
  className?: string;
}

const loggedInUser = {
  name: "Elena Papadopoulos",
  email: "elena.p@yoonit.com",
};

export function DashboardPage({ className = "" }: DashboardPageProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const initials = loggedInUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-6 py-4",
        className
      )}
      data-component="dashboard-welcome"
    >
      <div
        className="size-10 bg-[var(--slate-3)] rounded-full flex items-center justify-center border-[1.4px] border-[var(--slate-11)]"
        data-name="UserAvatar"
      >
        <span className="text-[var(--slate-11)] text-xs font-medium">
          {initials}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-[length:var(--text-sm)] text-[color:var(--text-muted)]">
          {getGreeting()},
        </span>
        <span className="text-[length:var(--text-lg)] font-semibold text-[color:var(--text-primary)]">
          {loggedInUser.name.split(" ")[0]}
        </span>
      </div>
    </div>
  );
}
