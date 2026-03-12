import { useState } from "react";
import { ArrowLeft, User, Mail, Phone, Globe, Tag, UserCheck, FileText } from "lucide-react";
import { toast } from "sonner";

interface ClientSettingsPageProps {
  clientId: number;
  onBack: () => void;
}

export function ClientSettingsPage({ clientId, onBack }: ClientSettingsPageProps) {
  const [form, setForm] = useState({
    name: "Nick Doe",
    email: "ndoe@email.com",
    phone: "+306988776655",
    country: "United Kingdom",
    nationality: "British",
    timezone: "Europe/London",
    language: "English",
    status: "Active",
    risk: "No Risk",
    owner: "Sarah Johnson",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast.success("Client settings saved", {
      description: `Changes to ${form.name} have been saved successfully.`,
      position: "top-right",
    });
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-app)] flex-1 min-w-0">
      {/* Top bar — back button only */}
      <div className="flex items-center px-6 h-[52px] border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          <span className="font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)]">
            Back
          </span>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[640px] mx-auto py-8 px-5 flex flex-col gap-8">

          {/* Page title + avatar */}
          <div className="flex items-center gap-4">
            <div className="size-12 bg-[var(--accent-solid)] rounded-xl flex items-center justify-center shrink-0">
              <span className="text-[color:var(--text-on-accent)] font-['Inter',sans-serif] font-semibold text-[length:var(--text-base)]">
                ND
              </span>
            </div>
            <div>
              <h2 className="font-['Public_Sans',sans-serif] text-[color:var(--text-primary)] tracking-[-0.2px]">
                {form.name}
              </h2>
              <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)]">
                CID:{clientId + 9000}
              </span>
            </div>
          </div>

          {/* Section: Basic Info */}
          <Section icon={<User size={14} />} title="Basic Info">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Full Name">
                <input
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="field-input"
                />
              </Field>
              <Field label="Email">
                <input
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="field-input"
                />
              </Field>
              <Field label="Phone">
                <input
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="field-input"
                />
              </Field>
              <Field label="Country of Residence">
                <input
                  value={form.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className="field-input"
                />
              </Field>
              <Field label="Nationality">
                <input
                  value={form.nationality}
                  onChange={(e) => handleChange("nationality", e.target.value)}
                  className="field-input"
                />
              </Field>
              <Field label="Timezone">
                <input
                  value={form.timezone}
                  onChange={(e) => handleChange("timezone", e.target.value)}
                  className="field-input"
                />
              </Field>
              <Field label="Preferred Language">
                <input
                  value={form.language}
                  onChange={(e) => handleChange("language", e.target.value)}
                  className="field-input"
                />
              </Field>
            </div>
          </Section>

          {/* Section: Account Settings */}
          <Section icon={<UserCheck size={14} />} title="Account Settings">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="field-input"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Pending</option>
                  <option>Suspended</option>
                </select>
              </Field>
              <Field label="Risk Level">
                <select
                  value={form.risk}
                  onChange={(e) => handleChange("risk", e.target.value)}
                  className="field-input"
                >
                  <option>No Risk</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </Field>
              <Field label="Assigned Owner">
                <select
                  value={form.owner}
                  onChange={(e) => handleChange("owner", e.target.value)}
                  className="field-input"
                >
                  <option>Sarah Johnson</option>
                  <option>Mark Williams</option>
                  <option>Emma Clarke</option>
                  <option>Unassigned</option>
                </select>
              </Field>
            </div>
          </Section>

          {/* Section: Tags & Roles */}
          <Section icon={<Tag size={14} />} title="Tags & Roles">
            <div className="flex flex-wrap gap-2">
              {["Trader", "Provider", "Copier"].map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1.5 h-7 px-3 bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg cursor-pointer hover:border-[var(--indigo-8)] transition-colors"
                >
                  <div
                    className={`w-1.5 h-3 rounded-full ${
                      tag === "Trader"
                        ? "bg-[var(--tag-trader)]"
                        : tag === "Provider"
                        ? "bg-[var(--tag-provider)]"
                        : "bg-[var(--tag-copier)]"
                    }`}
                  />
                  <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)]">
                    {tag}
                  </span>
                </div>
              ))}
              <button className="flex items-center gap-1 h-7 px-3 border border-dashed border-[var(--border-default)] rounded-lg text-[var(--text-secondary)] hover:border-[var(--indigo-8)] hover:text-[var(--indigo-11)] transition-colors">
                <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)]">+ Add tag</span>
              </button>
            </div>
          </Section>

          {/* Section: Notes */}
          <Section icon={<FileText size={14} />} title="Internal Notes">
            <textarea
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              rows={4}
              placeholder="Add internal notes about this client…"
              className="w-full px-3 py-2.5 bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] placeholder:text-[var(--text-disabled)] outline-none focus:border-[var(--indigo-8)] focus:ring-2 focus:ring-[var(--indigo-4)] transition-colors resize-none"
            />
          </Section>

        </div>
      </div>

      {/* Footer — Save */}
      <div className="shrink-0 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] px-6 py-3 flex items-center justify-end gap-3">
        <button
          onClick={onBack}
          className="h-8 px-4 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="h-8 px-4 rounded-lg bg-[var(--accent-solid)] font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)] text-[color:var(--text-on-accent)] hover:opacity-90 transition-opacity"
        >
          Save changes
        </button>
      </div>

      <style>{`
        .field-input {
          width: 100%;
          height: 36px;
          padding: 0 12px;
          background: var(--bg-raised);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          font-family: 'Inter', sans-serif;
          font-size: var(--text-sm);
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .field-input:focus {
          border-color: var(--indigo-8);
          box-shadow: 0 0 0 2px var(--indigo-4);
        }
        select.field-input {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-subtle)]">
        <span className="text-[var(--text-secondary)]">{icon}</span>
        <span className="font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)] text-[color:var(--text-primary)] tracking-[-0.07px]">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] tracking-[0.1px]">
        {label}
      </label>
      {children}
    </div>
  );
}
