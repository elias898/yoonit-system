import { useState, useMemo } from "react";
import { Building2 } from "lucide-react";
import { InputField } from "./InputField";

const initialValues = {
  companyName: "YOONIT Technologies Ltd.",
  legalEntity: "YOONIT Technologies Limited",
  regNumber: "HE 123456",
  licenseNumber: "CIF 000/00",
};

export function CompanyDetailsPanel() {
  const [values, setValues] = useState(initialValues);

  const hasChanges = useMemo(() => {
    return (Object.keys(initialValues) as (keyof typeof initialValues)[]).some(
      (key) => values[key] !== initialValues[key]
    );
  }, [values]);

  const update = (field: keyof typeof initialValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="w-full max-w-[640px] flex flex-col gap-6">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-[var(--indigo-3)] flex items-center justify-center shrink-0">
            <Building2 size={28} className="text-[var(--indigo-11)]" />
          </div>
          <div className="flex-1">
            <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-1.5">Company Logo</p>
            <button className="h-8 px-3 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
              Upload Logo
            </button>
          </div>
        </div>

        <InputField
          label="Company Name"
          type="text"
          value={values.companyName}
          onChange={update("companyName")}
        />

        <InputField
          label="Legal Entity Name"
          type="text"
          value={values.legalEntity}
          onChange={update("legalEntity")}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Registration Number"
            type="text"
            value={values.regNumber}
            onChange={update("regNumber")}
          />
          <InputField
            label="License Number"
            type="text"
            value={values.licenseNumber}
            onChange={update("licenseNumber")}
          />
        </div>
      </div>

      {hasChanges && (
        <div className="flex justify-end">
          <button
            onClick={() => alert("Changes saved!")}
            className="px-5 py-2 bg-[var(--accent-solid)] text-[color:var(--text-on-accent)] font-['Inter',sans-serif] text-[length:var(--text-sm)] rounded-lg hover:bg-[var(--accent-solid-hover)] transition-all cursor-pointer"
            style={{ fontWeight: 600 }}
          >
            Save changes
          </button>
        </div>
      )}
    </div>
  );
}
