import { useState } from "react";
import { MoreVertical, ChevronLeft, Trash2, Globe, Plus, X, Search, Download } from "lucide-react";
import { InputField } from "./InputField";

/* ── Mock data ── */
type Questionnaire = {
  id: string;
  name: string;
  description: string;
  created: string;
  modified: string;
};

const mockQuestionnaires: Questionnaire[] = [
  { id: "1", name: "KYC Basic", description: "Basic KYC questionnaire for individual traders", created: "Feb 28th 2026", modified: "Mar 5th 2026" },
  { id: "2", name: "Risk Assessment", description: "Trading risk profile evaluation for all account types", created: "Feb 15th 2026", modified: "Mar 2nd 2026" },
  { id: "3", name: "Suitability", description: "Investment suitability assessment per MiFID II", created: "Jan 30th 2026", modified: "Feb 20th 2026" },
  { id: "4", name: "AML Check", description: "Anti-money laundering screening questionnaire", created: "Mar 1st 2026", modified: "Mar 7th 2026" },
  { id: "5", name: "Experience Survey", description: "Trading experience and knowledge evaluation", created: "Mar 3rd 2026", modified: "Mar 3rd 2026" },
];

type Section = {
  id: string;
  title: string;
  questions: string[];
};

const defaultSections: Record<string, Section[]> = {
  "1": [
    { id: "sec1", title: "Personal Information", questions: ["Full Legal Name", "Date of Birth", "Nationality", "Tax Identification Number"] },
    { id: "sec2", title: "Employment Status", questions: ["Current Employment Status", "Industry / Sector", "Annual Income Range"] },
  ],
  "2": [
    { id: "sec1", title: "Trading Experience", questions: ["How many years have you been trading?", "Which instruments have you traded?", "Average trade frequency"] },
    { id: "sec2", title: "Risk Tolerance", questions: ["Maximum acceptable loss percentage", "How would you describe your risk appetite?", "Investment horizon"] },
    { id: "sec3", title: "Financial Situation", questions: ["Source of funds", "Net worth range", "Liquid assets range", "Monthly disposable income"] },
  ],
  "3": [
    { id: "sec1", title: "Investment Objectives", questions: ["Primary investment goal", "Expected return per annum", "Time horizon for investments"] },
    { id: "sec2", title: "Product Knowledge", questions: ["Knowledge of CFDs", "Knowledge of Forex", "Knowledge of Options", "Knowledge of Futures"] },
  ],
  "4": [
    { id: "sec1", title: "Identity Verification", questions: ["Are you a Politically Exposed Person (PEP)?", "Country of tax residence", "Do you hold dual citizenship?"] },
    { id: "sec2", title: "Source of Wealth", questions: ["Primary source of wealth", "Are funds from a third party?", "Expected annual deposit volume"] },
  ],
  "5": [
    { id: "sec1", title: "Market Knowledge", questions: ["Understanding of leverage", "Understanding of margin calls", "Understanding of stop-loss orders"] },
    { id: "sec2", title: "Platform Experience", questions: ["Experience with MetaTrader 4/5", "Experience with copy trading", "Experience with algorithmic trading"] },
    { id: "sec3", title: "Education", questions: ["Relevant financial certifications", "Finance-related degree", "Have you attended trading courses?", "How do you stay informed about markets?", "Do you use fundamental or technical analysis?"] },
  ],
};

/* ── Questionnaire Editor Modal ── */
function QuestionnaireEditorModal({ questionnaire, onClose }: { questionnaire: Questionnaire; onClose: () => void }) {
  const [title, setTitle] = useState(questionnaire.name);
  const [description, setDescription] = useState(questionnaire.description);
  const [language, setLanguage] = useState("English");
  const [sections, setSections] = useState<Section[]>(defaultSections[questionnaire.id] || [{ id: "sec1", title: "Section 1", questions: ["Question 1"] }]);

  function removeSection(secId: string) {
    setSections((prev) => prev.filter((s) => s.id !== secId));
  }

  function addSection() {
    setSections((prev) => [...prev, { id: `sec${Date.now()}`, title: `Section ${prev.length + 1}`, questions: [] }]);
  }

  function removeQuestion(secId: string, qIdx: number) {
    setSections((prev) =>
      prev.map((s) => (s.id === secId ? { ...s, questions: s.questions.filter((_, i) => i !== qIdx) } : s))
    );
  }

  function addQuestion(secId: string) {
    setSections((prev) =>
      prev.map((s) => (s.id === secId ? { ...s, questions: [...s.questions, ""] } : s))
    );
  }

  function updateQuestion(secId: string, qIdx: number, value: string) {
    setSections((prev) =>
      prev.map((s) => (s.id === secId ? { ...s, questions: s.questions.map((q, i) => (i === qIdx ? value : q)) } : s))
    );
  }

  function updateSectionTitle(secId: string, value: string) {
    setSections((prev) => prev.map((s) => (s.id === secId ? { ...s, title: value } : s)));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-[720px] max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[var(--border-subtle)] flex items-center justify-between shrink-0">
          <h5 className="text-[length:var(--text-h5)] text-[color:var(--text-primary)]">
            {questionnaire.name}
          </h5>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer">
            <X size={16} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overlay-scrollbar p-6">
          <div className="max-w-[560px] space-y-4">
            {/* Meta fields */}
            <InputField label="Template Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <InputField label="Template Description" value={description} onChange={(e) => setDescription(e.target.value)} />

            {/* Language selector */}
            <div>
              <label className="block font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] mb-1.5" style={{ fontWeight: 600 }}>Questions Translation</label>
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-[var(--text-muted)]" />
                <InputField as="select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option>English</option>
                  <option>Arabic</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Chinese</option>
                </InputField>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[var(--border-subtle)] my-2" />

            {/* Sections */}
            <div className="space-y-4">
              {sections.map((section, sIdx) => (
                <div key={section.id} className="border border-[var(--border-default)] rounded-lg overflow-hidden">
                  {/* Section header */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-subtle)] border-b border-[var(--border-subtle)]">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[var(--accent-bg)] font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--accent-text)] font-semibold shrink-0">
                        {sIdx + 1}
                      </span>
                      <input
                        value={section.title}
                        onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                        className="flex-1 bg-transparent font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold outline-none"
                      />
                    </div>
                    <button
                      onClick={() => removeSection(section.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 cursor-pointer transition-colors"
                    >
                      <Trash2 size={13} className="text-red-400" />
                    </button>
                  </div>

                  {/* Questions */}
                  <div className="divide-y divide-[var(--border-subtle)]">
                    {section.questions.map((q, qIdx) => (
                      <div key={qIdx} className="flex items-center gap-2 px-4 py-2 group">
                        <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] w-6 shrink-0 text-center">
                          {qIdx + 1}.
                        </span>
                        <input
                          value={q}
                          onChange={(e) => updateQuestion(section.id, qIdx, e.target.value)}
                          placeholder="Enter question..."
                          className="flex-1 bg-transparent font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
                        />
                        <button
                          onClick={() => removeQuestion(section.id, qIdx)}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-50 cursor-pointer opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <X size={12} className="text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add question */}
                  <div className="px-4 py-2 border-t border-[var(--border-subtle)]">
                    <button
                      onClick={() => addQuestion(section.id)}
                      className="h-7 px-2.5 flex items-center gap-1 rounded-md font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--indigo-11)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
                    >
                      <Plus size={12} />
                      Add Question
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add section */}
            <button
              onClick={addSection}
              className="h-8 px-3 flex items-center gap-1.5 rounded-lg border border-dashed border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
            >
              <Plus size={14} />
              Add Section
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-end gap-2 shrink-0">
          <button onClick={onClose} className="h-8 px-4 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="h-8 px-4 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Questionnaire Panel (table + modal) ── */
export function CRMQuestionnairePanel() {
  const [selectedQ, setSelectedQ] = useState<Questionnaire | null>(null);
  const [search, setSearch] = useState("");
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; q: Questionnaire } | null>(null);

  const filtered = mockQuestionnaires.filter((q) =>
    `${q.name} ${q.description}`.toLowerCase().includes(search.toLowerCase())
  );

  const columns = ["Question Name", "Description", "Created", "Modified"];

  return (
    <div>
      {/* Toolbar */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-[var(--slate-2)] rounded-lg h-8 px-2.5 w-[240px]">
          <Search size={14} className="text-[var(--text-muted)] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questionnaires..."
            className="flex-1 bg-transparent font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer">
            <Download size={14} />
            Export
          </button>
          <button
            onClick={() => setSelectedQ({ id: `new-${Date.now()}`, name: "New Questionnaire", description: "", sections: [], created: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), modified: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) })}
            className="h-8 px-3 flex items-center gap-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer"
          >
            <Plus size={14} />
            Add new Questionnaire
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
            {filtered.map((q) => (
              <tr
                key={q.id}
                onClick={() => setSelectedQ(q)}
                className="border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
              >
                <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--accent-text)] font-semibold">{q.name}</td>
                <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{q.description}</td>
                <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{q.created}</td>
                <td className="py-3 px-5 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">{q.modified}</td>
                <td className="py-3 px-5">
                  <button
                    onClick={(e) => { e.stopPropagation(); setContextMenu({ x: e.clientX, y: e.clientY, q }); }}
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
                onClick={() => setContextMenu(null)}
                className="w-full px-3 py-1.5 text-left font-['Inter',sans-serif] text-[length:var(--text-sm)] text-red-500 hover:bg-red-50 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* Questionnaire editor modal */}
      {selectedQ && (
        <QuestionnaireEditorModal questionnaire={selectedQ} onClose={() => setSelectedQ(null)} />
      )}
    </div>
  );
}