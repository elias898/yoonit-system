import { useState } from "react";
import { Bell, Mail, MessageSquare, AlertTriangle, Users, CreditCard, Shield, TrendingUp } from "lucide-react";

interface NotificationChannel {
  email: boolean;
  inApp: boolean;
}

interface NotificationCategory {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  channels: NotificationChannel;
}

const initialCategories: NotificationCategory[] = [
  {
    id: "security",
    label: "Security Alerts",
    description: "Login attempts, password changes, and new device sign-ins.",
    icon: Shield,
    channels: { email: true, inApp: true },
  },
  {
    id: "clients",
    label: "Client Activity",
    description: "New registrations, KYC submissions, and document uploads.",
    icon: Users,
    channels: { email: true, inApp: true },
  },
  {
    id: "transactions",
    label: "Transactions",
    description: "Deposits, withdrawals, and transfer notifications.",
    icon: CreditCard,
    channels: { email: true, inApp: true },
  },
  {
    id: "compliance",
    label: "Compliance & Risk",
    description: "AML alerts, risk threshold breaches, and regulatory updates.",
    icon: AlertTriangle,
    channels: { email: true, inApp: true },
  },
  {
    id: "trading",
    label: "Trading Activity",
    description: "Margin calls, stop-outs, and large trade notifications.",
    icon: TrendingUp,
    channels: { email: false, inApp: true },
  },
  {
    id: "team",
    label: "Team Updates",
    description: "Staff added or removed, role changes, and assignment notifications.",
    icon: Users,
    channels: { email: false, inApp: true },
  },
  {
    id: "system",
    label: "System Notifications",
    description: "Platform updates, scheduled maintenance, and sync status.",
    icon: Bell,
    channels: { email: true, inApp: true },
  },
  {
    id: "marketing",
    label: "Marketing & Campaigns",
    description: "Campaign performance reports and email delivery summaries.",
    icon: Mail,
    channels: { email: false, inApp: false },
  },
  {
    id: "comments",
    label: "Comments & Mentions",
    description: "When someone mentions you or replies to your comments.",
    icon: MessageSquare,
    channels: { email: true, inApp: true },
  },
];

const channelLabels: { key: keyof NotificationChannel; label: string }[] = [
  { key: "email", label: "Email" },
  { key: "inApp", label: "In-App" },
];

export function ProfileNotificationsPanel() {
  const [categories, setCategories] = useState(initialCategories);

  const toggleChannel = (categoryId: string, channel: keyof NotificationChannel) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, channels: { ...cat.channels, [channel]: !cat.channels[channel] } }
          : cat
      )
    );
  };

  const toggleAllForCategory = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;
        const allOn = cat.channels.email && cat.channels.inApp;
        return {
          ...cat,
          channels: { email: !allOn, inApp: !allOn },
        };
      })
    );
  };

  const hasChanges = JSON.stringify(categories) !== JSON.stringify(initialCategories);

  return (
    <div className="py-8 px-5 flex flex-col gap-10">
      {/* Header */}
      <div className="w-full">
        <h5
          className="font-['Public_Sans',sans-serif] text-[length:var(--text-h5)] text-[color:var(--text-primary)] mb-1"
          style={{ fontWeight: 600 }}
        >
          Notifications
        </h5>
        <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] max-w-[75ch]">
          Choose how and when you want to be notified about activity in your workspace.
        </p>
        <div className="h-px bg-[var(--border-subtle)] mt-4" />
      </div>

      {/* Table */}
      <div className="w-full border border-[var(--border-default)] rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_80px_80px] bg-[var(--bg-subtle)] border-b border-[var(--border-subtle)]">
          <div className="px-4 py-2.5">
            <span
              className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)] uppercase tracking-wider"
              style={{ fontWeight: 600 }}
            >
              Category
            </span>
          </div>
          {channelLabels.map((ch) => (
            <div key={ch.key} className="px-2 py-2.5 text-center">
              <span
                className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)] uppercase tracking-wider"
                style={{ fontWeight: 600 }}
              >
                {ch.label}
              </span>
            </div>
          ))}
        </div>

        {/* Rows */}
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          const allOn = cat.channels.email && cat.channels.inApp;
          return (
            <div
              key={cat.id}
              className={`grid grid-cols-[1fr_80px_80px] items-center ${
                i < categories.length - 1 ? "border-b border-[var(--border-subtle)]" : ""
              } hover:bg-[var(--bg-hover)] transition-colors`}
            >
              {/* Category info */}
              <div className="px-4 py-3.5 flex items-center gap-3 min-w-0">
                <div className="size-8 rounded-lg bg-[var(--bg-muted)] flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-[var(--text-secondary)]" />
                </div>
                <div className="min-w-0">
                  <button
                    onClick={() => toggleAllForCategory(cat.id)}
                    className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] cursor-pointer hover:text-[var(--indigo-11)] transition-colors text-left"
                    style={{ fontWeight: 600 }}
                    title={allOn ? "Disable all channels" : "Enable all channels"}
                  >
                    {cat.label}
                  </button>
                  <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)] mt-0.5 truncate">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Channel toggles */}
              {channelLabels.map((ch) => (
                <div key={ch.key} className="px-2 py-3.5 flex justify-center">
                  <button
                    type="button"
                    onClick={() => toggleChannel(cat.id, ch.key)}
                    className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer ${
                      cat.channels[ch.key] ? "bg-[var(--accent-solid)]" : "bg-[var(--slate-5)]"
                    }`}
                  >
                    <div
                      className={`absolute top-[3px] w-3.5 h-3.5 rounded-full bg-white shadow transition-transform ${
                        cat.channels[ch.key] ? "translate-x-[18px]" : "translate-x-[3px]"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Save */}
      {hasChanges && (
        <div className="flex justify-end">
          <button
            onClick={() => alert("Notification preferences saved!")}
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