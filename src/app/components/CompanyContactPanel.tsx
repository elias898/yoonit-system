import { useState, useMemo } from "react";
import { InputField } from "./InputField";

const initialValues = {
  website: "https://www.yoonit.com",
  supportEmail: "support@yoonit.com",
  phone: "+357 25 000 000",
  address: "1 Example Street\nLimassol, 3095\nCyprus",
};

export function CompanyContactPanel() {
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
        <InputField
          label="Website"
          type="url"
          value={values.website}
          onChange={update("website")}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Support Email"
            type="email"
            value={values.supportEmail}
            onChange={update("supportEmail")}
          />
          <InputField
            label="Phone"
            type="tel"
            value={values.phone}
            onChange={update("phone")}
          />
        </div>

        <InputField
          as="textarea"
          label="Registered Address"
          value={values.address}
          onChange={update("address")}
          rows={3}
        />
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
