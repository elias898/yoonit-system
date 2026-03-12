import { useState, useMemo } from "react";
import { Camera, Eye, EyeOff } from "lucide-react";
import { InputField } from "./InputField";

const initialProfile = {
  firstName: "Elena",
  lastName: "Papadopoulos",
  email: "elena.p@yoonit.com",
  phone: "+357 25 000 000",
  mobile: "+357 96 000 000",
  jobTitle: "Senior Account Manager",
  department: "Operations",
  language: "English",
  timezone: "Europe/Nicosia (UTC+02:00)",
  dateFormat: "DD/MM/YYYY",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const languageOptions = ["English", "Greek", "German", "French", "Spanish", "Arabic", "Chinese", "Japanese", "Russian"];
const timezoneOptions = [
  "Europe/Nicosia (UTC+02:00)",
  "Europe/London (UTC+00:00)",
  "America/New_York (UTC-05:00)",
  "America/Los_Angeles (UTC-08:00)",
  "Asia/Tokyo (UTC+09:00)",
  "Asia/Dubai (UTC+04:00)",
  "Asia/Hong_Kong (UTC+08:00)",
  "Australia/Sydney (UTC+11:00)",
];
const dateFormatOptions = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"];

export function MyProfilePanel() {
  const [values, setValues] = useState(initialProfile);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const hasChanges = useMemo(() => {
    return (Object.keys(initialProfile) as (keyof typeof initialProfile)[]).some(
      (key) => values[key] !== initialProfile[key]
    );
  }, [values]);

  const update = (field: keyof typeof initialProfile) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    alert("Profile changes saved!");
  };

  const initials = `${values.firstName.charAt(0)}${values.lastName.charAt(0)}`;

  return (
    <div className="py-8 px-5 flex">
      <div className="w-full max-w-[640px] flex flex-col gap-10">
        {/* Avatar & Name Header */}
        <div id="profile-personal-info">
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
              <InputField
                label="First Name"
                type="text"
                value={values.firstName}
                onChange={update("firstName")}
              />
              <InputField
                label="Last Name"
                type="text"
                value={values.lastName}
                onChange={update("lastName")}
              />
            </div>

            <InputField
              label="Email Address"
              type="email"
              value={values.email}
              onChange={update("email")}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Phone"
                type="tel"
                value={values.phone}
                onChange={update("phone")}
              />
              <InputField
                label="Mobile"
                type="tel"
                value={values.mobile}
                onChange={update("mobile")}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Job Title"
                type="text"
                value={values.jobTitle}
                onChange={update("jobTitle")}
              />
              <InputField
                label="Department"
                type="text"
                value={values.department}
                onChange={update("department")}
              />
            </div>
          </div>
        </div>

        {/* Regional Preferences */}
        <div id="profile-preferences">
          <h5 className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-1" style={{ fontWeight: 600 }}>
            Regional Preferences
          </h5>
          <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] max-w-[75ch]">
            Locale settings that affect how dates, times, and language are displayed throughout the platform.
          </p>
          <div className="h-px bg-[var(--border-subtle)] mt-4 mb-5" />

          <div className="flex flex-col gap-5">
            <InputField
              as="select"
              label="Language"
              value={values.language}
              onChange={update("language")}
            >
              {languageOptions.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </InputField>

            <InputField
              as="select"
              label="Timezone"
              value={values.timezone}
              onChange={update("timezone")}
            >
              {timezoneOptions.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </InputField>

            <InputField
              as="select"
              label="Date Format"
              value={values.dateFormat}
              onChange={update("dateFormat")}
            >
              {dateFormatOptions.map((fmt) => (
                <option key={fmt} value={fmt}>{fmt}</option>
              ))}
            </InputField>
          </div>
        </div>

        {/* Security / Password */}
        <div id="profile-security">
          <h5 className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-1" style={{ fontWeight: 600 }}>
            Security
          </h5>
          <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] max-w-[75ch]">
            Update your password and manage authentication settings for your account.
          </p>
          <div className="h-px bg-[var(--border-subtle)] mt-4 mb-5" />

          <div className="flex flex-col gap-5">
            <div className="relative">
              <InputField
                label="Current Password"
                type={showCurrentPw ? "text" : "password"}
                value={values.currentPassword}
                onChange={update("currentPassword")}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPw(!showCurrentPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer transition-colors"
              >
                {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="relative">
              <InputField
                label="New Password"
                type={showNewPw ? "text" : "password"}
                value={values.newPassword}
                onChange={update("newPassword")}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPw(!showNewPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer transition-colors"
              >
                {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="relative">
              <InputField
                label="Confirm New Password"
                type={showConfirmPw ? "text" : "password"}
                value={values.confirmPassword}
                onChange={update("confirmPassword")}
                placeholder="Re-enter new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPw(!showConfirmPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer transition-colors"
              >
                {showConfirmPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {values.newPassword && values.confirmPassword && values.newPassword !== values.confirmPassword && (
              <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-red-500">
                Passwords do not match.
              </p>
            )}
          </div>
        </div>

        {/* Save — only visible when there are pending changes */}
        {hasChanges && (
          <div className="flex justify-end">
            <button
              onClick={handleSave}
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