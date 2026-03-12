import { useState, useEffect, useRef } from "react";
import { MoreVertical, Trash2, Globe, Pencil, Plus, GripVertical, X, Search, Download, Check, ChevronDown } from "lucide-react";
import { InputField } from "./InputField";

/* ── Mock data ── */
type Flow = {
  id: string;
  name: string;
  clientType: string;
  flowType: string;
  isDefault: boolean;
  status: "Enabled" | "Disabled";
  created: string;
  modified: string;
};

const mockFlows: Flow[] = [
  { id: "1", name: "Main Onboarding", clientType: "Individual", flowType: "Trader", isDefault: true, status: "Enabled", created: "Aug 23rd 2024", modified: "Feb 12th 2025" },
  { id: "2", name: "Corporate Flow", clientType: "Corporate", flowType: "Trader", isDefault: false, status: "Enabled", created: "Sep 15th 2024", modified: "Jan 8th 2025" },
  { id: "3", name: "IB Application", clientType: "Individual", flowType: "IB", isDefault: true, status: "Enabled", created: "Oct 1st 2024", modified: "Mar 1st 2025" },
  { id: "4", name: "MEA Clients", clientType: "Individual", flowType: "Trader", isDefault: false, status: "Disabled", created: "Nov 14th 2024", modified: "Nov 14th 2024" },
];

const wizardSteps = ["Global Settings", "Application Level", "Grouping", "Configuration", "Conditions"] as const;
type WizardStep = (typeof wizardSteps)[number];

/* ── Status badge ── */
function StatusBadge({ status }: { status: "Enabled" | "Disabled" | "True" | "False" }) {
  const isPositive = status === "Enabled" || status === "True";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full font-['Inter',sans-serif] text-[length:var(--text-xs)] ${
        isPositive
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-[var(--slate-3)] text-[var(--slate-9)] border border-[var(--border-default)]"
      }`}
    >
      {status}
    </span>
  );
}

/* ── Application Level step items ── */
const defaultSteps = [
  { id: "s1", label: "Applicant Data", lang: "En" },
  { id: "s2", label: "Identity Verification", lang: "En" },
  { id: "s3", label: "Questionnaire", lang: "En" },
  { id: "s4", label: "Address Verification", lang: "En" },
];

/* ── Grouping step items ── */
const defaultGroups = [
  { id: "g1", name: "Basic Data", screens: [{ id: "sc1", label: "Personal Information" }, { id: "sc2", label: "Contact Details" }] },
  { id: "g2", name: "Questionnaire", screens: [{ id: "sc3", label: "Risk Assessment" }, { id: "sc4", label: "Trading Experience" }] },
  { id: "g3", name: "Documents", screens: [{ id: "sc5", label: "ID Upload" }, { id: "sc6", label: "Proof of Address" }] },
];

/* ── Multi-select dropdown with checkboxes + badges ── */
function MultiSelectDropdown({ options, placeholder = "Select..." }: { options: string[]; placeholder?: string }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggle(option: string) {
    setSelected((prev) => prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]);
  }

  function remove(option: string) {
    setSelected((prev) => prev.filter((o) => o !== option));
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full min-h-[40px] px-3 py-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-raised)] flex items-center gap-1.5 flex-wrap cursor-pointer transition-colors hover:border-[var(--slate-7)] focus:border-[var(--indigo-7)] outline-none"
      >
        {selected.length === 0 ? (
          <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[var(--text-muted)]">{placeholder}</span>
        ) : (
          selected.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--slate-3)] font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-primary)]"
            >
              {item}
              <span
                role="button"
                onClick={(e) => { e.stopPropagation(); remove(item); }}
                className="w-3.5 h-3.5 flex items-center justify-center rounded-full hover:bg-[var(--slate-5)] transition-colors"
              >
                <X size={10} className="text-[var(--text-muted)]" />
              </span>
            </span>
          ))
        )}
        <ChevronDown size={14} className={`ml-auto text-[var(--text-muted)] shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-lg py-1 max-h-[200px] overflow-y-auto">
          {options.map((option) => {
            const isChecked = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggle(option)}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
              >
                <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                  isChecked ? "bg-[var(--accent-solid)] border-[var(--accent-solid)]" : "border-[var(--border-default)] bg-white"
                }`}>
                  {isChecked && <Check size={10} strokeWidth={3} className="text-white" />}
                </span>
                <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)]">{option}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Flow Detail Wizard (Modal) ── */
function FlowDetailModal({ flow, onClose }: { flow: Flow; onClose: () => void }) {
  const [activeStep, setActiveStep] = useState<WizardStep>("Global Settings");
  const [visitedSteps, setVisitedSteps] = useState<Set<WizardStep>>(new Set());

  const isNew = flow.id.startsWith("new-");

  // Step 1 state
  const [isDefault, setIsDefault] = useState(flow.isDefault);
  const [enabled, setEnabled] = useState(flow.status === "Enabled");
  const [flowName, setFlowName] = useState(flow.name);
  const [appType, setAppType] = useState(flow.clientType);
  const [flowType, setFlowType] = useState(flow.flowType);

  // Step 2 state
  const [appSteps, setAppSteps] = useState(defaultSteps);

  // Step 4 state
  const [sumsubEnabled, setSumsubEnabled] = useState(false);

  // Step 5 state
  const [rejectUSA, setRejectUSA] = useState(false);

  const currentIndex = wizardSteps.indexOf(activeStep);

  function handleStepChange(target: WizardStep) {
    setVisitedSteps((prev) => new Set(prev).add(activeStep));
    setActiveStep(target);
  }

  function goNext() {
    if (currentIndex < wizardSteps.length - 1) handleStepChange(wizardSteps[currentIndex + 1]);
  }

  function goPrev() {
    if (currentIndex > 0) handleStepChange(wizardSteps[currentIndex - 1]);
  }

  function removeStep(id: string) {
    setAppSteps((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-[720px] max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)]">
              {flow.name}
            </h5>
            <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)]">
              Saved as draft
            </span>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer">
            <X size={16} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Step tabs */}
        <div className="px-6 py-2 border-b border-[var(--border-subtle)] flex items-center gap-1 overflow-x-auto shrink-0">
          {wizardSteps.map((step, i) => {
            const isActive = activeStep === step;
            const isVisited = visitedSteps.has(step);
            return (
              <button
                key={step}
                onClick={() => { if (!isActive) handleStepChange(step); }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-['Inter',sans-serif] text-[length:var(--text-base)] whitespace-nowrap cursor-pointer transition-colors ${
                  isActive
                    ? "bg-[var(--accent-bg)] text-[color:var(--accent-text)]"
                    : "text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                }`}
                style={{ fontWeight: 600 }}
              >
                <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-semibold ${
                  isActive
                    ? "bg-[var(--accent-solid)] text-white"
                    : isVisited
                      ? "bg-[var(--slate-3)] text-[var(--text-muted)]"
                      : "bg-[var(--slate-4)] text-[var(--text-muted)]"
                }`}>
                  {isVisited && !isActive ? <Check size={11} strokeWidth={3} /> : i + 1}
                </span>
                {step}
              </button>
            );
          })}
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto overlay-scrollbar p-6">
          {activeStep === "Global Settings" && (
            <div className="space-y-4 max-w-[480px]">
              <div className="flex items-center gap-3">
                <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] w-[180px]" style={{ fontWeight: 600 }}>Is Default</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isDefault}
                  onClick={() => setIsDefault(!isDefault)}
                  className={`flex items-center w-9 h-5 p-[2px] rounded-full transition-colors shrink-0 cursor-pointer ${isDefault ? "bg-[var(--accent-solid)]" : "bg-[var(--slate-6)]"}`}
                >
                  <span className={`pointer-events-none h-full aspect-square rounded-full bg-white shadow-sm transition-transform ${isDefault ? "translate-x-[16px]" : "translate-x-0"}`} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] w-[180px]" style={{ fontWeight: 600 }}>Enabled</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={enabled}
                  onClick={() => setEnabled(!enabled)}
                  className={`flex items-center w-9 h-5 p-[2px] rounded-full transition-colors shrink-0 cursor-pointer ${enabled ? "bg-[var(--accent-solid)]" : "bg-[var(--slate-6)]"}`}
                >
                  <span className={`pointer-events-none h-full aspect-square rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-[16px]" : "translate-x-0"}`} />
                </button>
              </div>
              <InputField label="Flow Name" value={flowName} onChange={(e) => setFlowName(e.target.value)} />
              <InputField as="select" label="Application Type" value={appType} onChange={(e) => setAppType(e.target.value)}>
                <option>Individual</option>
                <option>Corporate</option>
                <option>Joint</option>
              </InputField>
              <InputField as="select" label="Flow Type" value={flowType} onChange={(e) => setFlowType(e.target.value)}>
                <option>Trader</option>
                <option>IB</option>
                <option>Investor</option>
                <option>Provider</option>
                <option>Money Manager</option>
              </InputField>
            </div>
          )}

          {activeStep === "Application Level" && (
            <div className="max-w-[560px]">
              <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-4">
                Define the ordered steps of the onboarding application flow.
              </p>
              <div className="space-y-2">
                {appSteps.map((step, i) => (
                  <div key={step.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-raised)] group">
                    <GripVertical size={14} className="text-[var(--text-muted)] shrink-0 cursor-grab" />
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[var(--slate-4)] font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)] font-semibold shrink-0">
                      {i + 1}
                    </span>
                    <span className="flex-1 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)]">
                      {step.label}
                    </span>
                    <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
                      <Globe size={13} className="text-[var(--text-muted)]" />
                    </button>
                    <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)]">{step.lang}</span>
                    <button onClick={() => removeStep(step.id)} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 size={13} className="text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setAppSteps((prev) => [...prev, { id: `s${Date.now()}`, label: "New Step", lang: "En" }])}
                className="mt-3 h-8 px-3 flex items-center gap-1.5 rounded-lg border border-dashed border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
              >
                <Plus size={14} />
                Add New Step
              </button>
            </div>
          )}

          {activeStep === "Grouping" && (
            <div className="max-w-[560px]">
              <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-4">
                Organise application screens into logical groups for the onboarding wizard.
              </p>
              <div className="space-y-4">
                {defaultGroups.map((group) => (
                  <div key={group.id} className="border border-[var(--border-default)] rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-subtle)] border-b border-[var(--border-subtle)]">
                      <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold">{group.name}</span>
                      <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--bg-hover)] cursor-pointer">
                        <Pencil size={12} className="text-[var(--text-muted)]" />
                      </button>
                    </div>
                    <div className="divide-y divide-[var(--border-subtle)]">
                      {group.screens.map((screen) => (
                        <div key={screen.id} className="flex items-center justify-between px-4 py-2 hover:bg-[var(--accent-bg-subtle)] transition-colors group">
                          <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">{screen.label}</span>
                          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-50 cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
                            <Trash2 size={12} className="text-red-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-[var(--border-subtle)]">
                      <button className="h-7 px-2.5 flex items-center gap-1 rounded-md font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
                        <Plus size={12} />
                        Add Screen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeStep === "Configuration" && (
            <div className="max-w-[560px]">
              <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-3">
                Add the steps of the application flow that will pass through Sumsub's verification process.
              </p>
              <div className="flex items-center gap-3">
                <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] w-[200px]">Enable Sumsub API</span>
                <button
                  type="button"
                  onClick={() => setSumsubEnabled(!sumsubEnabled)}
                  className={`flex items-center w-9 h-5 p-[2px] rounded-[16px] transition-colors shrink-0 cursor-pointer ${
                    sumsubEnabled ? "bg-[var(--indigo-9)]" : "bg-[var(--slate-5)]"
                  }`}
                >
                  <div
                    className={`h-full aspect-square rounded-full bg-[var(--slate-1)] shadow-sm transition-transform ${
                      sumsubEnabled ? "translate-x-[16px]" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {activeStep === "Conditions" && (
            <div className="max-w-[560px]">
              <h6 className="font-['Public_Sans',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] font-semibold mb-1">
                Reject a Country
              </h6>
              <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mb-4">
                Users in the selected countries or regions will not be allowed to continue the application flow.
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] mb-[6px]" style={{ fontWeight: 600 }}>Country of Residence</label>
                  <MultiSelectDropdown
                    options={["Afghanistan", "Iran", "North Korea", "Syria", "Yemen"]}
                    placeholder="Select..."
                  />
                </div>
                <div>
                  <label className="block font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] mb-[6px]" style={{ fontWeight: 600 }}>Nationality</label>
                  <MultiSelectDropdown
                    options={["Afghan", "Iranian", "North Korean", "Syrian"]}
                    placeholder="Select..."
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input type="checkbox" checked={rejectUSA} onChange={(e) => setRejectUSA(e.target.checked)} className="accent-[var(--accent-solid)]" />
                  <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">Reject USA Residents</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-between shrink-0">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="h-8 px-4 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="h-8 px-4 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
              Cancel
            </button>
            {currentIndex < wizardSteps.length - 1 ? (
              <button
                onClick={goNext}
                className="h-8 px-4 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors"
              >
                Next
              </button>
            ) : (
              <button onClick={onClose} className="h-8 px-4 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors">
                {isNew ? "Save Flow" : "Save Changes"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Flow Panel (table + detail) ── */
export function CRMFlowPanel() {
  const [selectedFlow, setSelectedFlow] = useState<Flow | null>(null);
  const [search, setSearch] = useState("");
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; flow: Flow } | null>(null);

  const filtered = mockFlows.filter((f) =>
    `${f.name} ${f.clientType} ${f.flowType}`.toLowerCase().includes(search.toLowerCase())
  );

  const columns = ["Name", "Client Type", "Flow Type", "Default", "Status", "Created", "Modified"];

  return (
    <div>
      {/* Toolbar */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-[var(--slate-2)] rounded-lg h-8 px-2.5 w-[240px]">
          <Search size={14} className="text-[var(--text-muted)] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search flows..."
            className="flex-1 bg-transparent font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer">
            <Download size={14} />
            Export
          </button>
          <button
            onClick={() => setSelectedFlow({ id: `new-${Date.now()}`, name: "New Flow", clientType: "Individual", flowType: "Trader", isDefault: false, status: "Disabled", created: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), modified: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) })}
            className="h-8 px-3 flex items-center gap-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer"
          >
            <Plus size={14} />
            Add new Flow
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--border-default)] overflow-hidden mx-5 mb-4">
        {/* Table */}
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[var(--slate-3)] border-b border-[var(--border-default)]">
              {columns.map((col) => (
                <th key={col} className="text-left py-2.5 px-5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold tracking-[-0.06px] leading-[1.3]">
                  {col}
                </th>
              ))}
              <th className="w-[52px]" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((flow) => (
              <tr
                key={flow.id}
                className="border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--bg-hover)] transition-colors"
              >
                <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--accent-text)] font-semibold">
                  <button
                    onClick={() => setSelectedFlow(flow)}
                    className="hover:underline cursor-pointer text-left"
                  >
                    {flow.name}
                  </button>
                </td>
                <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{flow.clientType}</td>
                <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{flow.flowType}</td>
                <td className="py-3 px-5"><StatusBadge status={flow.isDefault ? "True" : "False"} /></td>
                <td className="py-3 px-5"><StatusBadge status={flow.status} /></td>
                <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{flow.created}</td>
                <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{flow.modified}</td>
                <td className="py-3 px-5">
                  <button
                    onClick={(e) => { setContextMenu({ x: e.clientX, y: e.clientY, flow }); }}
                    className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-muted)] cursor-pointer"
                  >
                    <MoreVertical size={15} className="text-[var(--text-muted)]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Context menu */}
        {contextMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setContextMenu(null)} />
            <div
              className="fixed z-50 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg shadow-lg py-1 min-w-[120px]"
              style={{ top: contextMenu.y, left: contextMenu.x }}
            >
              <button
                onClick={() => { setSelectedFlow(contextMenu.flow); setContextMenu(null); }}
                className="w-full px-3 py-1.5 text-left font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] hover:bg-[var(--bg-hover)] cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => setContextMenu(null)}
                className="w-full px-3 py-1.5 text-left font-['Inter',sans-serif] text-[length:var(--text-sm)] text-red-500 hover:bg-red-50 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* Flow detail wizard modal */}
      {selectedFlow && (
        <FlowDetailModal flow={selectedFlow} onClose={() => setSelectedFlow(null)} />
      )}
    </div>
  );
}