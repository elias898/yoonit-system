import { useState } from "react";
import { InputField } from "./InputField";

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

const initialPreferences = {
  language: "English",
  timezone: "Europe/Nicosia (UTC+02:00)",
  dateFormat: "DD/MM/YYYY",
};

export function ProfilePreferencesPanel() {
  const [values, setValues] = useState(initialPreferences);

  const update = (field: keyof typeof initialPreferences) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const hasChanges = (Object.keys(initialPreferences) as (keyof typeof initialPreferences)[]).some(
    (key) => values[key] !== initialPreferences[key]
  );

  return (
    <div className="py-8 px-5 flex">
      <div className="w-full max-w-[640px] flex flex-col gap-10">
        <div>
          <h5 className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-1" style={{ fontWeight: 600 }}>
            Regional Preferences
          </h5>
          <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] max-w-[75ch]">
            Locale settings that affect how dates, times, and language are displayed throughout the platform.
          </p>
          <div className="h-px bg-[var(--border-subtle)] mt-4 mb-5" />

          <div className="flex flex-col gap-5">
            <InputField as="select" label="Language" value={values.language} onChange={update("language")}>
              {languageOptions.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </InputField>

            <InputField as="select" label="Timezone" value={values.timezone} onChange={update("timezone")}>
              {timezoneOptions.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </InputField>

            <InputField as="select" label="Date Format" value={values.dateFormat} onChange={update("dateFormat")}>
              {dateFormatOptions.map((fmt) => (
                <option key={fmt} value={fmt}>{fmt}</option>
              ))}
            </InputField>
          </div>
        </div>

        {hasChanges && (
          <div className="flex justify-end">
            <button
              onClick={() => alert("Preferences saved!")}
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
