import { useParams } from "react-router";
import { cn } from "./ui/utils";

interface ClientProfilePageRouteProps {
  className?: string;
}

export function ClientProfilePageRoute({ className = "" }: ClientProfilePageRouteProps) {
  const { id } = useParams();

  return (
    <div
      className={cn("flex items-center justify-center p-6", className)}
      data-component="client-profile-page"
    >
      <span className="text-[length:var(--text-lg)] text-[color:var(--text-muted)]">
        Client Profile {id}
      </span>
    </div>
  );
}
