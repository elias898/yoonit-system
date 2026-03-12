import { useState } from "react";
import { Camera } from "lucide-react";
import { InputField } from "./InputField";

const initialPersonal = {
  firstName: "Elena",
  lastName: "Papadopoulos",
  email: "elena.p@yoonit.com",
  phone: "+357 25 000 000",
  mobile: "+357 96 000 000",
  jobTitle: "Senior Account Manager",
  department: "Operations",
};

export function ProfilePersonalPanel() {
  const [values, setValues] = useState(initialPersonal);

  const update = (field: keyof typeof initialPersonal) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const hasChanges = (Object.keys(initialPersonal) as (keyof typeof initialPersonal)[]).some(
    (key) => values[key] !== initialPersonal[key]
  );

  const initials = `${values.firstName.charAt(0)}${values.lastName.charAt(0)}`;

  return (
    <div className="py-8 px-5 flex">
      <div className="w-full max-w-[640px] flex flex-col gap-10">
        <div>
          <h5 className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-1" style={{ fontWeight: 600 }}>
            Personal Information
          </h5>
          <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] max-w-[75ch]">
            Your basic profile details visible to other team members across the platform.
          </p>
          <div className="h-px bg-[var(--border-subtle)] mt-4 mb-5" />

          <div className="flex flex-col gap-5">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-[var(--indigo-3)] flex items-center justify-center shrink-0">
                  <span className="font-['Inter',sans-serif] text-[length:var(--text-h4)] text-[color:var(--indigo-11)]" style={{ fontWeight: 600 }}>
                    {initials}
                  </span>
                </div>
                <button className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-[var(--accent-solid)] flex items-center justify-center hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors">
                  <Camera size={12} className="text-white" />
                </button>
              </div>
              <div className="flex-1">
                <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-1.5">Profile Photo</p>
                <button className="h-8 px-3 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
                  Upload Photo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField label="First Name" type="text" value={values.firstName} onChange={update("firstName")} />
              <InputField label="Last Name" type="text" value={values.lastName} onChange={update("lastName")} />
            </div>

            <InputField label="Email Address" type="email" value={values.email} onChange={update("email")} />

            <div className="grid grid-cols-2 gap-4">
              <InputField label="Phone" type="tel" value={values.phone} onChange={update("phone")} />
              <InputField label="Mobile" type="tel" value={values.mobile} onChange={update("mobile")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField label="Job Title" type="text" value={values.jobTitle} onChange={update("jobTitle")} />
              <InputField label="Department" type="text" value={values.department} onChange={update("department")} />
            </div>
          </div>
        </div>

        {hasChanges && (
          <div className="flex justify-end">
            <button
              onClick={() => alert("Personal information saved!")}
              className="px-5 py-2 bg-[var(--accent-solid)] text-[color:var(--text-on-accent)] font-['Inter',sans-serif] text-[length:var(--text-sm)] rounded-lg hover:bg-[var(--accent-solid-hover)] transition-all cursor-pointer"
              style={{ fontWeight: 600 }}
            >
              Save changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
