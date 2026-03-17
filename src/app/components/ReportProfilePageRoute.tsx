import { useCallback } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { ReportProfilePage } from "./ReportProfilePage";
import type { LayoutContext } from "./RootLayout";

/**
 * URL-routed wrapper for ReportProfilePage.
 * Renders at /reports/:id
 */
export function ReportProfilePageRoute() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const reportId = Number(id);
  const { setBreadcrumbOverride } = useOutletContext<LayoutContext>();

  const onBack = useCallback(() => navigate("/reports"), [navigate]);

  return (
    <div className="flex flex-1 min-w-0 mb-2 mr-2">
      <ReportProfilePage
        reportId={reportId}
        onBack={onBack}
        setBreadcrumbOverride={setBreadcrumbOverride}
      />
    </div>
  );
}
