import React, { useState, useEffect } from "react";
import {
  Edit3,
  MoreVertical,
  Star,
  Clock,
  Mail,
  Phone,
  Globe,
  ChevronRight,
  ChevronDown,
  Send,
  Sparkles,
  LogIn,
  User,
  Network,
  Building2,
  Database,
} from "lucide-react";
import svgPaths from "../../imports/svg-uy7nbbei9x";

export function ClientSidePanel({ onClose, defaultTab = "client" }: { onClose?: () => void; defaultTab?: "client" | "ai" }) {
  const [activeTab, setActiveTab] = useState<"client" | "ai">(defaultTab);

  // Sync with external defaultTab changes
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  return (
    <div className="w-[340px] h-full bg-[var(--bg-surface)] flex flex-col shrink-0 rounded-2xl overflow-hidden">
      {/* Tab Header */}
      <div className="flex items-center border-b border-[var(--border-default)] shrink-0">
        <button
          onClick={() => setActiveTab("client")}
          className={`flex-1 h-[44px] flex items-center justify-center font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)] border-b-2 ${
            activeTab === "client"
              ? "text-[color:var(--text-primary)] border-[var(--accent-solid)]"
              : "text-[color:var(--text-secondary)] border-transparent"
          }`}
        >
          Client
        </button>
        <button
          onClick={() => setActiveTab("ai")}
          className={`flex-1 h-[44px] flex items-center justify-center font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)] border-b-2 ${
            activeTab === "ai"
              ? "text-[color:var(--text-primary)] border-[var(--accent-solid)]"
              : "text-[color:var(--text-secondary)] border-transparent"
          }`}
        >
          AI Assistant
        </button>
        <button
          onClick={onClose}
          className="w-10 h-[44px] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {activeTab === "ai" ? (
        <AiAssistantContent />
      ) : (
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {/* ── Client Card ── */}
          <SectionCard>
            {/* Card Title */}
            <div className="relative shrink-0 w-full">
              <div className="absolute inset-0 border-b border-[var(--border-default)] pointer-events-none" />
              <div className="flex items-center justify-between p-4">
                <span className="font-['Inter',sans-serif] font-semibold text-[14px] text-[color:var(--text-primary)] tracking-[-0.07px]">
                  Client
                </span>
                <button className="flex items-center gap-1.5 text-[color:var(--indigo-11)] hover:text-[color:var(--indigo-12)] transition-colors">
                  <Edit3 size={14} />
                  <span className="font-['Inter',sans-serif] font-semibold text-[14px] tracking-[-0.07px]">Edit Client</span>
                </button>
              </div>
            </div>

            {/* Client Profile */}
            <div className="p-4 flex flex-col gap-4">
              {/* Avatar + Name */}
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="size-12 bg-[var(--accent-solid)] rounded-lg flex items-center justify-center">
                    <span className="font-['Public_Sans',sans-serif] font-semibold text-[18px] text-[color:var(--text-on-accent)] tracking-[-0.09px]">ND</span>
                  </div>
                  <div className="absolute -bottom-[3px] -right-1 size-3">
                    <svg className="block size-full" fill="none" viewBox="0 0 12 12">
                      <circle cx="6" cy="6" fill="var(--success)" r="5" stroke="var(--bg-surface)" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="font-['Public_Sans',sans-serif] font-bold text-[23px] text-[color:var(--text-primary)] tracking-[-0.115px] leading-[1.3]">
                    Nick Doe
                  </div>
                  <div className="font-['Inter',sans-serif] text-[10px] text-[color:var(--slate-9)] tracking-[0.25px]">
                    CID:9999
                  </div>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="h-6 px-2 flex items-center justify-center bg-[var(--success-bg)] rounded-full font-['Inter',sans-serif] text-[14px] text-[color:var(--success)] tracking-[-0.07px]">
                  Active
                </span>
                <span className="h-6 px-2 flex items-center justify-center bg-[var(--success-bg)] rounded-full font-['Inter',sans-serif] text-[14px] text-[color:var(--success)] tracking-[-0.07px]">
                  No Risk
                </span>
                <span className="h-6 px-2 flex items-center gap-1 justify-center bg-[var(--success-bg)] rounded-full font-['Inter',sans-serif] text-[14px] text-[color:var(--success)] tracking-[-0.07px]">
                  <svg className="size-3" fill="none" viewBox="0 0 10.6258 10.1863">
                    <path d={svgPaths.p18bd4300} stroke="var(--success)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
                  </svg>
                  4/5
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2">
                {([
                  { label: "Provider", color: "bg-[#f78d1d]" },
                  { label: "Copier", color: "bg-[#f78d1d]" },
                  { label: "Trader", color: "bg-[var(--tag-trader)]" },
                ] as const).map((tag) => (
                  <div
                    key={tag.label}
                    className="h-6 min-w-[60px] px-2 flex items-center gap-1 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-md"
                  >
                    <div className={`w-1 h-3 rounded-full ${tag.color}`} />
                    <span className="font-['Inter',sans-serif] text-[14px] text-[color:var(--text-primary)] tracking-[0.14px]">
                      {tag.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* ── Visit Profile Footer ── */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="flex-1 h-[34px] flex items-center justify-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg font-['Inter',sans-serif] font-semibold text-[14px] text-[color:var(--text-secondary)] tracking-[-0.07px] hover:bg-[var(--bg-hover)] transition-colors">
              <LogIn size={14} />
              Visit Profile
            </button>
            <button className="size-[34px] shrink-0 flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg hover:bg-[var(--bg-hover)] transition-colors text-[var(--text-secondary)]">
              <MoreVertical size={16} />
            </button>
          </div>

          {/* ── Contact Info Card ── */}
          <SectionCard>
            <SectionTitle
              title="Contact Info"
              trailing={
                <span className="h-6 px-2 flex items-center justify-center bg-[var(--warning-bg)] rounded-full font-['Inter',sans-serif] text-[14px] text-[color:var(--warning)] tracking-[-0.07px]">
                  Do not Disturb
                </span>
              }
            />
            <div className="flex flex-col px-4">
              <KVRow
                label="Local Time"
                value={
                  <BadgePill icon={<Clock size={12} strokeWidth={1.2} />} text="2:30 AM" />
                }
                border
              />
              <KVRow label="Email" value="ndoe@email.com" border />
              <KVRow label="Phone" value="+306988776655" />
            </div>
          </SectionCard>

          {/* ── Locale Card ── */}
          <SectionCard>
            <SectionTitle title="Locale" />
            <div className="flex flex-col px-4">
              <KVRow
                label="Country of Residence"
                value={
                  <BadgePill
                    icon={
                      <svg className="size-3 shrink-0" fill="none" viewBox="0 0 12 12">
                        <g>
                          <path d={svgPaths.p2ca50880} fill="#F0F0F0" />
                          <path d={svgPaths.pa91b300} fill="#0052B4" />
                          <path d={svgPaths.p7e37700} fill="#0052B4" />
                          <path d={svgPaths.p340da4f0} fill="#0052B4" />
                          <path d={svgPaths.p8961500} fill="#0052B4" />
                          <path d={svgPaths.p16b0c300} fill="#0052B4" />
                          <path d={svgPaths.p383bc100} fill="#0052B4" />
                          <path d={svgPaths.p86bca00} fill="#0052B4" />
                          <path d={svgPaths.p1f9da490} fill="#0052B4" />
                          <path d={svgPaths.p326fd500} fill="#D80027" />
                          <path d={svgPaths.p10188e00} fill="#D80027" />
                          <path d={svgPaths.p28126300} fill="#D80027" />
                          <path d={svgPaths.p2e23e900} fill="#D80027" />
                          <path d={svgPaths.p3605c500} fill="#D80027" />
                        </g>
                      </svg>
                    }
                    text="UK"
                  />
                }
                border
              />
              <KVRow label="Nationality" value="British" border />
              <KVRow label="Time zone" value="Europe/London" border />
              <KVRow label="Preferred Language" value="English" />
            </div>
          </SectionCard>

          {/* ── Registration Details Card ── */}
          <SectionCard>
            <SectionTitle title="Registration Details" />
            <div className="flex flex-col px-4">
              <KVRow label="Date of Birth" value="British" border />
              <KVRow label="Age" value="British" border />
              <KVRow label="Registration Date" value="Nov  12, 2025" border />
              <KVRow label="Source" value="Website Sign-up" border />
              <KVRow
                label="Introducer"
                value={<BadgePill icon={<User size={12} strokeWidth={1.2} />} text="Ted Lasso" />}
              />
            </div>
          </SectionCard>

          {/* ── Internal Assignment Card ── */}
          <SectionCard>
            <SectionTitle title="Internal Assignment" />
            <div className="flex flex-col px-4">
              <KVRow
                label="Account Manager"
                value={<BadgePill icon={<User size={12} strokeWidth={1.2} />} text="Tom Hardy" />}
                border
              />
              <KVRow
                label="Desk"
                value={<BadgePill icon={<Network size={12} strokeWidth={1.2} />} text="UK Sales" />}
                border
              />
              <KVRow
                label="Department"
                value={<BadgePill icon={<Building2 size={12} strokeWidth={1.2} />} text="Sales" />}
                border
              />
              <KVRow
                label="Pool"
                value={<BadgePill icon={<Database size={12} strokeWidth={1.2} />} text="Default Pool" />}
              />
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}

/* ─── AI Assistant Tab ─── */

interface ChatMessage {
  id: string;
  role: "ai" | "user";
  text: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: "1", role: "ai", text: "Hello! I'm your AI assistant. How can I help you with Nick Doe today?" },
  { id: "2", role: "user", text: "Hello there!" },
];

const SUGGESTED_ACTIONS = ["Draft email", "Generate summary", "Check activity"];

function AiAssistantContent() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "ai", text: "I'll look into that for you right away." },
      ]);
    }, 800);
  };

  const handleAction = (action: string) => {
    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", text: action };
    setMessages((prev) => [...prev, userMsg]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "ai", text: `Working on "${action}" for Nick Doe...` },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Model selector */}
      <div className="flex items-center justify-center py-2 border-b border-[var(--border-default)] shrink-0">
        <button className="flex items-center gap-1.5 h-[34px] px-3 rounded-lg hover:bg-[var(--bg-hover)] transition-colors">
          <Sparkles size={14} className="text-[var(--accent-solid)]" />
          <span className="font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)] text-[color:var(--indigo-11)] tracking-[-0.07px]">
            YOONIT Model
          </span>
          <ChevronDown size={14} className="text-[var(--indigo-11)]" />
        </button>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-3">
          {messages.map((msg) =>
            msg.role === "ai" ? (
              <div key={msg.id} className="flex items-start gap-3">
                <div className="size-8 bg-[var(--accent-solid)] rounded-lg flex items-center justify-center shrink-0">
                  <span className="font-['Inter',sans-serif] font-semibold text-[12px] text-[var(--text-on-accent)]">AI</span>
                </div>
                <div className="bg-[var(--slate-3)] rounded-tr-xl rounded-br-xl rounded-bl-xl px-3 py-2.5 max-w-[220px]">
                  <p className="font-['Inter',sans-serif] text-[14px] text-[color:var(--text-primary)] tracking-[-0.07px] leading-[1.3]">
                    {msg.text}
                  </p>
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex justify-end">
                <div className="bg-[var(--accent-bg)] rounded-tl-xl rounded-br-xl rounded-bl-xl px-3 py-2.5 max-w-[220px]">
                  <p className="font-['Inter',sans-serif] text-[14px] text-[color:var(--text-primary)] tracking-[-0.07px] leading-[1.3]">
                    {msg.text}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-[var(--border-default)] px-4 py-3 flex flex-col gap-3">
        {/* Suggested actions */}
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_ACTIONS.map((action) => (
            <button
              key={action}
              onClick={() => handleAction(action)}
              className="h-[34px] px-3 bg-[var(--accent-bg)] rounded-full font-['Inter',sans-serif] text-[14px] text-[color:var(--indigo-11)] tracking-[-0.07px] hover:bg-[var(--indigo-4)] transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
        {/* Input */}
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask anything..."
              className="w-full h-[44px] px-3 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg font-['Inter',sans-serif] text-[14px] text-[color:var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:border-[var(--accent-solid)] transition-colors tracking-[-0.07px]"
            />
          </div>
          <button
            onClick={handleSend}
            className="size-[44px] shrink-0 flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg hover:bg-[var(--bg-hover)] transition-colors text-[var(--text-secondary)]"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Shared Side-Panel Primitives ─── */

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--bg-surface)] rounded-lg border border-[var(--border-default)] shrink-0 w-full flex flex-col overflow-hidden">
      {children}
    </div>
  );
}

function SectionTitle({ title, trailing }: { title: string; trailing?: React.ReactNode }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="absolute inset-0 border-b border-[var(--border-default)] pointer-events-none" />
      <div className="flex items-center justify-between gap-4 p-4">
        <span className="font-['Inter',sans-serif] font-semibold text-[14px] text-[color:var(--text-primary)] tracking-[-0.07px]">
          {title}
        </span>
        {trailing}
      </div>
    </div>
  );
}

function KVRow({
  label,
  value,
  border = false,
}: {
  label: string;
  value: React.ReactNode;
  border?: boolean;
}) {
  return (
    <div className={`relative w-full ${border ? "" : ""}`}>
      {border && (
        <div className="absolute inset-0 border-b border-[var(--border-default)] opacity-40 pointer-events-none" />
      )}
      <div className="flex items-center gap-4 p-3">
        <span className="flex-1 font-['Inter',sans-serif] text-[14px] text-[color:var(--text-secondary)] tracking-[-0.07px] leading-[1.3]">
          {label}
        </span>
        {typeof value === "string" ? (
          <span className="flex-1 font-['Inter',sans-serif] text-[14px] text-[color:var(--text-primary)] tracking-[-0.07px] leading-[1.3]">
            {value}
          </span>
        ) : (
          <div className="flex-1 flex items-center justify-start">{value}</div>
        )}
      </div>
    </div>
  );
}

function BadgePill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-1 h-6 min-w-[60px] px-2 bg-[var(--slate-3)] rounded-full">
      <span className="shrink-0 text-[color:var(--text-primary)]">{icon}</span>
      <span className="font-['Inter',sans-serif] text-[14px] text-[color:var(--text-primary)] tracking-[-0.07px] leading-[1.3] whitespace-nowrap">
        {text}
      </span>
    </div>
  );
}