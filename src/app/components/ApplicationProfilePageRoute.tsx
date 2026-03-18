import { useParams } from "react-router";
import { cn } from "./ui/utils";

interface ApplicationProfilePageRouteProps {
  className?: string;
}

export function ApplicationProfilePageRoute({ className = "" }: ApplicationProfilePageRouteProps) {
  const { id } = useParams();

  return (
    <div
      className={cn("flex items-center justify-center p-6", className)}
      data-component="application-profile-page"
    >
      <span className="text-[length:var(--text-lg)] text-[color:var(--text-muted)]">
        Application {id}
      </span>
    </div>
  );
}
