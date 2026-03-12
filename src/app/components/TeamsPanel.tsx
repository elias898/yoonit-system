import { useState, useRef, useEffect } from "react";
import {
  Plus,
  Building2,
  Briefcase,
  Users,
  Monitor,
  ChevronRight,
  MoreHorizontal,
  UserPlus,
  X,
  Check,
  KeyRound,
  Pencil,
  UserMinus,
  ChevronDown,
  Search,
  User,
} from "lucide-react";

// --- Data types ---
type Role = "Executive" | "Desk Mgr" | "Team Mgr" | "Dept Mgr" | "Entity Mgr";

interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarColor: string;
}

interface Desk {
  id: string;
  name: string;
  manager: string;
  users: StaffUser[];
}

interface Team {
  id: string;
  name: string;
  manager: string;
  desks: Desk[];
}

interface Department {
  id: string;
  name: string;
  manager: string;
  teams: Team[];
}

interface Entity {
  id: string;
  name: string;
  manager: string;
  departments: Department[];
}

// --- Permissions per role (Section 9.2) ---
const rolePermissions: Record<Role, string[]> = {
  Executive: [
    "View assigned clients",
    "Create client notes",
    "View client documents",
    "Execute trades on behalf",
  ],
  "Desk Mgr": [
    "View all desk users",
    "Assign executives to desk",
    "Reset user passwords",
    "View desk reports",
    "Manage desk schedules",
  ],
  "Team Mgr": [
    "View all team members",
    "Manage desk assignments",
    "Reset user passwords",
    "View team performance",
    "Approve desk transfers",
    "Create team reports",
  ],
  "Dept Mgr": [
    "View all department staff",
    "Manage team structure",
    "Reset user passwords",
    "View department analytics",
    "Approve team changes",
    "Manage department budgets",
    "Create department reports",
  ],
  "Entity Mgr": [
    "Full entity oversight",
    "Manage all departments",
    "Reset any user password",
    "View entity-wide analytics",
    "Approve structural changes",
    "Manage compliance settings",
    "Create entity reports",
    "Configure entity policies",
  ],
};

const roleDescriptions: Record<Role, string> = {
  Executive: "Front-line staff handling client interactions and trade execution.",
  "Desk Mgr": "Manages a specific desk and its assigned executives.",
  "Team Mgr": "Oversees multiple desks within a team.",
  "Dept Mgr": "Manages all teams and desks within a department.",
  "Entity Mgr": "Full administrative control over an entire entity.",
};

const roleBadgeStyles: Record<Role, string> = {
  Executive: "bg-[var(--slate-3)] text-[color:var(--slate-11)] border-[var(--slate-6)]",
  "Desk Mgr": "bg-[var(--indigo-3)] text-[color:var(--indigo-11)] border-[var(--indigo-6)]",
  "Team Mgr": "bg-[var(--indigo-3)] text-[color:var(--indigo-11)] border-[var(--indigo-6)]",
  "Dept Mgr": "bg-[var(--indigo-3)] text-[color:var(--indigo-11)] border-[var(--indigo-6)]",
  "Entity Mgr": "bg-[var(--indigo-4)] text-[color:var(--indigo-12)] border-[var(--indigo-7)]",
};

// Avatar color palette
const avatarColors = [
  "bg-[var(--indigo-9)]",
  "bg-[#e16f24]",
  "bg-[#0d9488]",
  "bg-[#7c3aed]",
  "bg-[#db2777]",
  "bg-[#2563eb]",
  "bg-[#059669]",
  "bg-[#d97706]",
];

// --- Mock data ---
const mockEntities: Entity[] = [
  {
    id: "e1",
    name: "CYSEC",
    manager: "Maria Georgiou",
    departments: [
      {
        id: "d1",
        name: "Sales",
        manager: "Ahmed Khalil",
        teams: [
          {
            id: "t1",
            name: "EU Team",
            manager: "Nikos Papadopoulos",
            desks: [
              {
                id: "dk1",
                name: "Cyprus Desk",
                manager: "Elena Constantinou",
                users: [
                  { id: "u1", name: "Elena Constantinou", email: "elena.c@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[0] },
                  { id: "u2", name: "Stavros Nikolaou", email: "stavros.n@yoonit.com", role: "Executive", avatarColor: avatarColors[1] },
                  { id: "u3", name: "Christina Pavlou", email: "christina.p@yoonit.com", role: "Executive", avatarColor: avatarColors[4] },
                  { id: "u4", name: "Marios Christodoulou", email: "marios.ch@yoonit.com", role: "Executive", avatarColor: avatarColors[2] },
                ],
              },
              {
                id: "dk2",
                name: "Greece Desk",
                manager: "Yiannis Makris",
                users: [
                  { id: "u5", name: "Yiannis Makris", email: "yiannis.m@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[3] },
                  { id: "u6", name: "Dimitra Alexiou", email: "dimitra.a@yoonit.com", role: "Executive", avatarColor: avatarColors[5] },
                  { id: "u7", name: "Kostas Papadimitriou", email: "kostas.p@yoonit.com", role: "Executive", avatarColor: avatarColors[6] },
                ],
              },
              {
                id: "dk3",
                name: "Germany Desk",
                manager: "Hans Mueller",
                users: [
                  { id: "u8", name: "Hans Mueller", email: "hans.m@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[7] },
                  { id: "u9", name: "Klaus Richter", email: "klaus.r@yoonit.com", role: "Executive", avatarColor: avatarColors[0] },
                ],
              },
            ],
          },
          {
            id: "t2",
            name: "Arabic Team",
            manager: "Omar Farouk",
            desks: [
              {
                id: "dk4",
                name: "UAE Desk",
                manager: "Fatima Al-Hassan",
                users: [
                  { id: "u10", name: "Fatima Al-Hassan", email: "fatima.h@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[4] },
                  { id: "u11", name: "Khalid Mansour", email: "khalid.m@yoonit.com", role: "Executive", avatarColor: avatarColors[1] },
                  { id: "u12", name: "Noor Al-Sayed", email: "noor.s@yoonit.com", role: "Executive", avatarColor: avatarColors[2] },
                ],
              },
              {
                id: "dk5",
                name: "KSA Desk",
                manager: "Saleh Al-Rashid",
                users: [
                  { id: "u13", name: "Saleh Al-Rashid", email: "saleh.r@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[3] },
                  { id: "u14", name: "Amira Bin Khalid", email: "amira.k@yoonit.com", role: "Executive", avatarColor: avatarColors[5] },
                ],
              },
            ],
          },
          {
            id: "t3",
            name: "APAC Team",
            manager: "Li Wei",
            desks: [
              {
                id: "dk6",
                name: "China Desk",
                manager: "Zhang Yong",
                users: [
                  { id: "u15", name: "Zhang Yong", email: "zhang.y@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[6] },
                  { id: "u16", name: "Liu Mei", email: "liu.m@yoonit.com", role: "Executive", avatarColor: avatarColors[7] },
                ],
              },
              {
                id: "dk7",
                name: "SEA Desk",
                manager: "Tan Mei Lin",
                users: [
                  { id: "u17", name: "Tan Mei Lin", email: "tan.ml@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[0] },
                  { id: "u18", name: "Raj Anand", email: "raj.a@yoonit.com", role: "Executive", avatarColor: avatarColors[1] },
                  { id: "u19", name: "Siti Nurhaliza", email: "siti.n@yoonit.com", role: "Executive", avatarColor: avatarColors[4] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "d2",
        name: "Support",
        manager: "Christos Demetriou",
        teams: [
          {
            id: "t4",
            name: "Tier 1 Support",
            manager: "Anna Petrou",
            desks: [
              {
                id: "dk8",
                name: "Live Chat Desk",
                manager: "Sophia Ioannou",
                users: [
                  { id: "u20", name: "Sophia Ioannou", email: "sophia.i@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[2] },
                  { id: "u21", name: "Petros Antoniou", email: "petros.a@yoonit.com", role: "Executive", avatarColor: avatarColors[3] },
                ],
              },
              {
                id: "dk9",
                name: "Email Desk",
                manager: "Marios Stavrou",
                users: [
                  { id: "u22", name: "Marios Stavrou", email: "marios.s@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[5] },
                ],
              },
            ],
          },
          {
            id: "t5",
            name: "Tier 2 Support",
            manager: "Demetris Loizou",
            desks: [
              {
                id: "dk10",
                name: "Escalations Desk",
                manager: "Kyriakos Andreou",
                users: [
                  { id: "u23", name: "Kyriakos Andreou", email: "kyriakos.a@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[6] },
                  { id: "u24", name: "Georgia Efthymiou", email: "georgia.e@yoonit.com", role: "Executive", avatarColor: avatarColors[7] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "d3",
        name: "Compliance",
        manager: "Eleni Michail",
        teams: [
          {
            id: "t6",
            name: "KYC Team",
            manager: "Panayiotis Georgiou",
            desks: [
              {
                id: "dk11",
                name: "Verification Desk",
                manager: "Irene Nikolaou",
                users: [
                  { id: "u25", name: "Irene Nikolaou", email: "irene.n@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[0] },
                  { id: "u26", name: "Vasilis Katsaros", email: "vasilis.k@yoonit.com", role: "Executive", avatarColor: avatarColors[1] },
                ],
              },
              {
                id: "dk12",
                name: "Review Desk",
                manager: "Andreas Charalambous",
                users: [
                  { id: "u27", name: "Andreas Charalambous", email: "andreas.ch@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[2] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "e2",
    name: "FCA",
    manager: "James Whitfield",
    departments: [
      {
        id: "d4",
        name: "Sales",
        manager: "Sarah Mitchell",
        teams: [
          {
            id: "t7",
            name: "UK Team",
            manager: "David Clarke",
            desks: [
              {
                id: "dk13",
                name: "London Desk",
                manager: "Emily Watson",
                users: [
                  { id: "u28", name: "Emily Watson", email: "emily.w@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[3] },
                  { id: "u29", name: "Oliver Thompson", email: "oliver.t@yoonit.com", role: "Executive", avatarColor: avatarColors[4] },
                  { id: "u30", name: "Charlotte Williams", email: "charlotte.w@yoonit.com", role: "Executive", avatarColor: avatarColors[5] },
                ],
              },
              {
                id: "dk14",
                name: "Manchester Desk",
                manager: "Robert Hayes",
                users: [
                  { id: "u31", name: "Robert Hayes", email: "robert.h@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[6] },
                  { id: "u32", name: "Sophie Baker", email: "sophie.b@yoonit.com", role: "Executive", avatarColor: avatarColors[7] },
                ],
              },
            ],
          },
          {
            id: "t8",
            name: "International Team",
            manager: "Priya Sharma",
            desks: [
              {
                id: "dk15",
                name: "India Desk",
                manager: "Arun Patel",
                users: [
                  { id: "u33", name: "Arun Patel", email: "arun.p@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[0] },
                  { id: "u34", name: "Deepika Rao", email: "deepika.r@yoonit.com", role: "Executive", avatarColor: avatarColors[1] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "d5",
        name: "Operations",
        manager: "Michael Brown",
        teams: [
          {
            id: "t9",
            name: "Back Office",
            manager: "Catherine Jones",
            desks: [
              {
                id: "dk16",
                name: "Settlements Desk",
                manager: "Thomas Wright",
                users: [
                  { id: "u35", name: "Thomas Wright", email: "thomas.w@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[2] },
                ],
              },
              {
                id: "dk17",
                name: "Reconciliation Desk",
                manager: "Laura Green",
                users: [
                  { id: "u36", name: "Laura Green", email: "laura.g@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[3] },
                  { id: "u37", name: "James Foster", email: "james.f@yoonit.com", role: "Executive", avatarColor: avatarColors[4] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "e3",
    name: "FSA",
    manager: "Takeshi Yamamoto",
    departments: [
      {
        id: "d6",
        name: "Sales",
        manager: "Kenji Sato",
        teams: [
          {
            id: "t10",
            name: "Japan Team",
            manager: "Yuki Tanaka",
            desks: [
              {
                id: "dk18",
                name: "Tokyo Desk",
                manager: "Haruto Suzuki",
                users: [
                  { id: "u38", name: "Haruto Suzuki", email: "haruto.s@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[5] },
                  { id: "u39", name: "Aoi Nakamura", email: "aoi.n@yoonit.com", role: "Executive", avatarColor: avatarColors[6] },
                ],
              },
              {
                id: "dk19",
                name: "Osaka Desk",
                manager: "Akira Watanabe",
                users: [
                  { id: "u40", name: "Akira Watanabe", email: "akira.w@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[7] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "d7",
        name: "Risk Management",
        manager: "Naomi Kobayashi",
        teams: [
          {
            id: "t11",
            name: "Market Risk",
            manager: "Ren Ishikawa",
            desks: [
              {
                id: "dk20",
                name: "Analysis Desk",
                manager: "Sakura Ito",
                users: [
                  { id: "u41", name: "Sakura Ito", email: "sakura.i@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[0] },
                  { id: "u42", name: "Takuya Mori", email: "takuya.m@yoonit.com", role: "Executive", avatarColor: avatarColors[1] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

// Pool of available users for "Add Staff"
const availableUsersPool: StaffUser[] = [
  { id: "pool-1", name: "Alex Demetriou", email: "alex.d@yoonit.com", role: "Executive", avatarColor: avatarColors[2] },
  { id: "pool-2", name: "Marina Florou", email: "marina.f@yoonit.com", role: "Executive", avatarColor: avatarColors[3] },
  { id: "pool-3", name: "Victor Popov", email: "victor.p@yoonit.com", role: "Executive", avatarColor: avatarColors[4] },
  { id: "pool-4", name: "Isabelle Moreau", email: "isabelle.m@yoonit.com", role: "Executive", avatarColor: avatarColors[5] },
  { id: "pool-5", name: "Carlos Rivera", email: "carlos.r@yoonit.com", role: "Executive", avatarColor: avatarColors[6] },
  { id: "pool-6", name: "Yuna Park", email: "yuna.p@yoonit.com", role: "Executive", avatarColor: avatarColors[7] },
];

// --- Column icon map ---
const columnConfig = [
  { label: "Entities", singular: "Entity", icon: Building2 },
  { label: "Departments", singular: "Department", icon: Briefcase },
  { label: "Teams", singular: "Team", icon: Users },
  { label: "Desks", singular: "Desk", icon: Monitor },
] as const;

// --- Utility ---
function getInitials(name: string) {
  const parts = name.split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

// --- Sub-components ---

function Breadcrumbs({
  entity,
  department,
  team,
  desk,
  onClickEntity,
  onClickDepartment,
  onClickTeam,
  onClickDesk,
  onClickRoot,
}: {
  entity: Entity | null;
  department: Department | null;
  team: Team | null;
  desk: Desk | null;
  onClickRoot: () => void;
  onClickEntity: () => void;
  onClickDepartment: () => void;
  onClickTeam: () => void;
  onClickDesk: () => void;
}) {
  const crumbs: { label: string; onClick: () => void; isLast: boolean }[] = [];

  crumbs.push({ label: "Organization", onClick: onClickRoot, isLast: !entity });

  if (entity) {
    crumbs.push({ label: entity.name, onClick: onClickEntity, isLast: !department });
  }
  if (department) {
    crumbs.push({ label: department.name, onClick: onClickDepartment, isLast: !team });
  }
  if (team) {
    crumbs.push({ label: team.name, onClick: onClickTeam, isLast: !desk });
  }
  if (desk) {
    crumbs.push({ label: desk.name, onClick: onClickDesk, isLast: true });
  }

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={12} className="text-[var(--slate-8)]" />}
          <button
            onClick={crumb.onClick}
            className={`font-['Inter',sans-serif] text-[length:var(--text-sm)] transition-colors cursor-pointer ${
              crumb.isLast
                ? "text-[color:var(--indigo-11)] font-semibold"
                : "text-[color:var(--slate-9)] hover:text-[color:var(--slate-12)]"
            }`}
          >
            {crumb.label}
          </button>
        </span>
      ))}
    </div>
  );
}

function UnitCard({
  name,
  manager,
  childCount,
  childLabel,
  isSelected,
  onClick,
}: {
  name: string;
  manager: string;
  childCount?: number;
  childLabel?: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
        isSelected
          ? "bg-[var(--indigo-3)] border-[var(--indigo-7)] ring-1 ring-[var(--indigo-7)]"
          : "bg-[var(--bg-surface)] border-[var(--border-default)] hover:border-[var(--slate-7)] hover:bg-[var(--bg-hover)]"
      }`}
    >
      <h5
        className={`font-['Inter',sans-serif] text-[length:var(--text-sm)] tracking-[-0.1px] ${
          isSelected ? "text-[color:var(--indigo-12)]" : "text-[color:var(--text-primary)]"
        }`}
      >
        {name}
      </h5>
      <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)] mt-0.5">
        Manager: {manager}
      </p>
      {childCount !== undefined && childLabel && (
        <p
          className={`font-['Inter',sans-serif] text-[length:var(--text-xs)] mt-1.5 ${
            isSelected ? "text-[color:var(--indigo-10)]" : "text-[color:var(--slate-8)]"
          }`}
        >
          {childCount} {childLabel}
        </p>
      )}
    </button>
  );
}

function HierarchyColumn({
  level,
  items,
  selectedId,
  onSelect,
  emptyMessage,
}: {
  level: 0 | 1 | 2 | 3;
  items: { id: string; name: string; manager: string; childCount?: number; childLabel?: string }[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  emptyMessage: string;
}) {
  const config = columnConfig[level];
  const Icon = config.icon;

  return (
    <div className="flex flex-col min-w-[200px] flex-1 bg-[var(--bg-subtle)] rounded-xl border border-[var(--border-default)]">
      {/* Column header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <div className="flex items-center gap-1.5">
          <Icon size={14} className="text-[var(--slate-9)]" />
          <span className="font-['Inter',sans-serif] font-semibold text-[length:var(--text-xs)] text-[color:var(--slate-11)] uppercase tracking-[0.5px]">
            {config.label}
          </span>
          {items.length > 0 && (
            <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-8)] ml-0.5">
              ({items.length})
            </span>
          )}
        </div>
        <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[var(--indigo-10)] hover:bg-[var(--indigo-3)] transition-colors cursor-pointer">
          <Plus size={12} />
          <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] font-semibold">
            Add
          </span>
        </button>
      </div>

      {/* Column body */}
      <div className="flex-1 overflow-y-auto overlay-scrollbar px-2 pb-2 space-y-1.5">
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-24 px-3">
            <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-8)] text-center">
              {emptyMessage}
            </p>
          </div>
        ) : (
          items.map((item) => (
            <UnitCard
              key={item.id}
              name={item.name}
              manager={item.manager}
              childCount={item.childCount}
              childLabel={item.childLabel}
              isSelected={selectedId === item.id}
              onClick={() => onSelect(item.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

// --- Staff Action Menu ---
function StaffActionMenu({
  onEditRole,
  onResetPassword,
  onRemove,
}: {
  onEditRole: () => void;
  onResetPassword: () => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-md hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-[var(--slate-9)] hover:text-[var(--slate-11)]"
      >
        <MoreHorizontal size={14} />
      </button>
      {open && (
        <div className="absolute right-0 top-8 z-50 w-[180px] bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg shadow-lg py-1">
          <button
            onClick={() => { onEditRole(); setOpen(false); }}
            className="flex items-center gap-2.5 w-full px-3 py-2 text-left hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            <Pencil size={13} className="text-[var(--slate-9)]" />
            <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)]">Edit Role</span>
          </button>
          <button
            onClick={() => { onResetPassword(); setOpen(false); }}
            className="flex items-center gap-2.5 w-full px-3 py-2 text-left hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            <KeyRound size={13} className="text-[var(--slate-9)]" />
            <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)]">Reset Password</span>
          </button>
          <div className="h-px bg-[var(--border-subtle)] mx-2 my-1" />
          <button
            onClick={() => { onRemove(); setOpen(false); }}
            className="flex items-center gap-2.5 w-full px-3 py-2 text-left hover:bg-[#fee2e2] transition-colors cursor-pointer"
          >
            <UserMinus size={13} className="text-[#dc2626]" />
            <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:#dc2626]">Remove from Desk</span>
          </button>
        </div>
      )}
    </div>
  );
}

// --- Staff Members Panel (5th column) ---
function StaffMembersPanel({
  desk,
  onAddStaff,
  onEditRole,
}: {
  desk: Desk;
  onAddStaff: () => void;
  onEditRole: (user: StaffUser) => void;
}) {
  return (
    <div className="flex flex-col min-w-[300px] w-[340px] bg-[var(--bg-subtle)] rounded-xl border border-[var(--border-default)]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <div className="flex items-center gap-1.5">
          <Users size={14} className="text-[var(--slate-9)]" />
          <span className="font-['Inter',sans-serif] font-semibold text-[length:var(--text-xs)] text-[color:var(--slate-11)] uppercase tracking-[0.5px]">
            Staff
          </span>
          <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-8)] ml-0.5">
            ({desk.users.length})
          </span>
        </div>
        <button
          onClick={onAddStaff}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[var(--indigo-10)] hover:bg-[var(--indigo-3)] transition-colors cursor-pointer"
        >
          <UserPlus size={12} />
          <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] font-semibold">
            Add Staff
          </span>
        </button>
      </div>

      {/* Desk name subtitle */}
      <div className="px-3 pb-2">
        <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-8)]">
          {desk.name}
        </p>
      </div>

      {/* Staff list */}
      <div className="flex-1 overflow-y-auto overlay-scrollbar px-2 pb-2 space-y-1">
        {desk.users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] transition-colors"
          >
            {/* Avatar */}
            <div className="w-6 h-6 rounded-full bg-[var(--slate-4)] flex items-center justify-center shrink-0">
              <User size={12} className="text-[var(--slate-10)]" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold truncate">
                  {user.name}
                </span>
              </div>
              <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-8)] truncate mt-0.5">
                {user.email}
              </p>
            </div>

            {/* Role badge */}
            <span className={`shrink-0 px-2 py-0.5 rounded-full border font-['Inter',sans-serif] text-[length:var(--text-xs)] font-semibold ${roleBadgeStyles[user.role]}`}>
              {user.role}
            </span>

            {/* Actions */}
            <StaffActionMenu
              onEditRole={() => onEditRole(user)}
              onResetPassword={() => {}}
              onRemove={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Role Assignment Modal ---
function RoleAssignmentModal({
  mode,
  contextPath,
  existingUser,
  deskUsers,
  onClose,
}: {
  mode: "add" | "edit";
  contextPath: string;
  existingUser?: StaffUser;
  deskUsers: StaffUser[];
  onClose: () => void;
}) {
  const [selectedRole, setSelectedRole] = useState<Role>(existingUser?.role ?? "Executive");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(existingUser?.id ?? null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter available users not already in the desk
  const existingIds = new Set(deskUsers.map((u) => u.id));
  const filteredPool = availableUsersPool
    .filter((u) => !existingIds.has(u.id))
    .filter((u) => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()));

  const selectedPoolUser = availableUsersPool.find((u) => u.id === selectedUserId);
  const displayUser = mode === "edit" ? existingUser : selectedPoolUser;

  useEffect(() => {
    if (!userDropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userDropdownOpen]);

  const roles: Role[] = ["Executive", "Desk Mgr", "Team Mgr", "Dept Mgr", "Entity Mgr"];
  const permissions = rolePermissions[selectedRole];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-default)] shadow-2xl w-[520px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-subtle)]">
          <div>
            <h5 className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">
              {mode === "add" ? "Add Staff Member" : "Edit Role"}
            </h5>
            <div className="flex items-center gap-1 mt-1">
              {contextPath.split(" > ").map((seg, i, arr) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight size={10} className="text-[var(--slate-7)]" />}
                  <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-8)]">
                    {seg}
                  </span>
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-[var(--slate-9)]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto overlay-scrollbar px-5 py-4 space-y-5">
          {/* User selection */}
          <div>
            <label className="block font-['Inter',sans-serif] text-[length:var(--text-xs)] font-semibold text-[color:var(--slate-11)] uppercase tracking-[0.5px] mb-2">
              Staff Member
            </label>
            {mode === "edit" && existingUser ? (
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)]">
                <div className="w-6 h-6 rounded-full bg-[var(--slate-4)] flex items-center justify-center">
                  <User size={12} className="text-[var(--slate-10)]" />
                </div>
                <div>
                  <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold">
                    {existingUser.name}
                  </span>
                  <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-8)]">
                    {existingUser.email}
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center justify-between w-full p-2.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--slate-7)] transition-colors cursor-pointer"
                >
                  {displayUser ? (
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[var(--slate-4)] flex items-center justify-center">
                        <User size={12} className="text-[var(--slate-10)]" />
                      </div>
                      <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)]">
                        {displayUser.name}
                      </span>
                    </div>
                  ) : (
                    <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--slate-8)]">
                      Select a user...
                    </span>
                  )}
                  <ChevronDown size={14} className="text-[var(--slate-8)]" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg shadow-lg max-h-[200px] flex flex-col">
                    <div className="flex items-center gap-2 px-2.5 py-2 border-b border-[var(--border-subtle)]">
                      <Search size={13} className="text-[var(--slate-8)]" />
                      <input
                        type="text"
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        placeholder="Search users..."
                        className="flex-1 bg-transparent font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] outline-none placeholder:text-[var(--slate-8)]"
                        autoFocus
                      />
                    </div>
                    <div className="flex-1 overflow-y-auto overlay-scrollbar py-1">
                      {filteredPool.length === 0 ? (
                        <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-8)] text-center py-3">
                          No available users
                        </p>
                      ) : (
                        filteredPool.map((u) => (
                          <button
                            key={u.id}
                            onClick={() => { setSelectedUserId(u.id); setUserDropdownOpen(false); setUserSearch(""); }}
                            className="flex items-center gap-2.5 w-full px-3 py-2 hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
                          >
                            <div className="w-6 h-6 rounded-full bg-[var(--slate-4)] flex items-center justify-center">
                              <User size={12} className="text-[var(--slate-10)]" />
                            </div>
                            <div className="text-left">
                              <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)]">
                                {u.name}
                              </span>
                              <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-8)]">
                                {u.email}
                              </p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Role selection */}
          <div>
            <label className="block font-['Inter',sans-serif] text-[length:var(--text-xs)] font-semibold text-[color:var(--slate-11)] uppercase tracking-[0.5px] mb-2">
              Role
            </label>
            <div className="space-y-1.5">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`flex items-start gap-3 w-full p-3 rounded-lg border transition-all cursor-pointer text-left ${
                    selectedRole === role
                      ? "bg-[var(--indigo-3)] border-[var(--indigo-7)] ring-1 ring-[var(--indigo-7)]"
                      : "bg-[var(--bg-surface)] border-[var(--border-default)] hover:border-[var(--slate-7)] hover:bg-[var(--bg-hover)]"
                  }`}
                >
                  {/* Custom radio */}
                  <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${
                    selectedRole === role
                      ? "border-[var(--indigo-9)] bg-[var(--indigo-9)]"
                      : "border-[var(--slate-7)]"
                  }`}>
                    {selectedRole === role && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className={`font-['Inter',sans-serif] text-[length:var(--text-sm)] font-semibold ${
                      selectedRole === role ? "text-[color:var(--indigo-12)]" : "text-[color:var(--text-primary)]"
                    }`}>
                      {role}
                    </span>
                    <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)] mt-0.5">
                      {roleDescriptions[role]}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Permission preview */}
          <div>
            <label className="block font-['Inter',sans-serif] text-[length:var(--text-xs)] font-semibold text-[color:var(--slate-11)] uppercase tracking-[0.5px] mb-2">
              Permission Preview — {selectedRole}
            </label>
            <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] p-3">
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {permissions.map((perm) => (
                  <div key={perm} className="flex items-center gap-2">
                    <Check size={12} className="text-[var(--indigo-9)] shrink-0" />
                    <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-11)]">
                      {perm}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-[var(--border-subtle)]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[var(--indigo-9)] hover:bg-[var(--indigo-10)] transition-colors cursor-pointer font-['Inter',sans-serif] text-[length:var(--text-sm)] text-white font-semibold"
          >
            {mode === "add" ? "Add to Desk" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Main component ---
export function TeamsPanel() {
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedDeskId, setSelectedDeskId] = useState<string | null>(null);

  // Modal state
  const [modalState, setModalState] = useState<{
    open: boolean;
    mode: "add" | "edit";
    user?: StaffUser;
  }>({ open: false, mode: "add" });

  const selectedEntity = mockEntities.find((e) => e.id === selectedEntityId) ?? null;
  const selectedDept = selectedEntity?.departments.find((d) => d.id === selectedDeptId) ?? null;
  const selectedTeam = selectedDept?.teams.find((t) => t.id === selectedTeamId) ?? null;
  const selectedDesk = selectedTeam?.desks.find((d) => d.id === selectedDeskId) ?? null;

  // Derived lists
  const departments = selectedEntity?.departments ?? [];
  const teams = selectedDept?.teams ?? [];
  const desks = selectedTeam?.desks ?? [];

  // Selection handlers
  const handleSelectEntity = (id: string) => {
    setSelectedEntityId(id);
    setSelectedDeptId(null);
    setSelectedTeamId(null);
    setSelectedDeskId(null);
  };

  const handleSelectDept = (id: string) => {
    setSelectedDeptId(id);
    setSelectedTeamId(null);
    setSelectedDeskId(null);
  };

  const handleSelectTeam = (id: string) => {
    setSelectedTeamId(id);
    setSelectedDeskId(null);
  };

  const handleSelectDesk = (id: string) => {
    setSelectedDeskId(id);
  };

  // Breadcrumb navigation
  const handleClickRoot = () => {
    setSelectedEntityId(null);
    setSelectedDeptId(null);
    setSelectedTeamId(null);
    setSelectedDeskId(null);
  };

  const handleClickEntity = () => {
    setSelectedDeptId(null);
    setSelectedTeamId(null);
    setSelectedDeskId(null);
  };

  const handleClickDepartment = () => {
    setSelectedTeamId(null);
    setSelectedDeskId(null);
  };

  const handleClickTeam = () => {
    setSelectedDeskId(null);
  };

  // Build context path string for modal
  const contextPath = [
    selectedEntity?.name,
    selectedDept?.name,
    selectedTeam?.name,
    selectedDesk?.name,
  ]
    .filter(Boolean)
    .join(" > ");

  // Format items for each column
  const entityItems = mockEntities.map((e) => ({
    id: e.id,
    name: e.name,
    manager: e.manager,
    childCount: e.departments.length,
    childLabel: e.departments.length === 1 ? "Department" : "Departments",
  }));

  const deptItems = departments.map((d) => ({
    id: d.id,
    name: d.name,
    manager: d.manager,
    childCount: d.teams.length,
    childLabel: d.teams.length === 1 ? "Team" : "Teams",
  }));

  const teamItems = teams.map((t) => ({
    id: t.id,
    name: t.name,
    manager: t.manager,
    childCount: t.desks.length,
    childLabel: t.desks.length === 1 ? "Desk" : "Desks",
  }));

  const deskItems = desks.map((d) => ({
    id: d.id,
    name: d.name,
    manager: d.manager,
    childCount: d.users.length,
    childLabel: d.users.length === 1 ? "Member" : "Members",
  }));

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Breadcrumbs */}
      <Breadcrumbs
        entity={selectedEntity}
        department={selectedDept}
        team={selectedTeam}
        desk={selectedDesk}
        onClickRoot={handleClickRoot}
        onClickEntity={handleClickEntity}
        onClickDepartment={handleClickDepartment}
        onClickTeam={handleClickTeam}
        onClickDesk={() => {}}
      />

      {/* Columns layout */}
      <div className="flex gap-3 flex-1 min-h-0 overflow-x-auto">
        <HierarchyColumn
          level={0}
          items={entityItems}
          selectedId={selectedEntityId}
          onSelect={handleSelectEntity}
          emptyMessage="No entities configured"
        />
        <HierarchyColumn
          level={1}
          items={deptItems}
          selectedId={selectedDeptId}
          onSelect={handleSelectDept}
          emptyMessage={selectedEntityId ? "No departments in this entity" : "Select an entity to view departments"}
        />
        <HierarchyColumn
          level={2}
          items={teamItems}
          selectedId={selectedTeamId}
          onSelect={handleSelectTeam}
          emptyMessage={selectedDeptId ? "No teams in this department" : "Select a department to view teams"}
        />
        <HierarchyColumn
          level={3}
          items={deskItems}
          selectedId={selectedDeskId}
          onSelect={handleSelectDesk}
          emptyMessage={selectedTeamId ? "No desks in this team" : "Select a team to view desks"}
        />

        {/* 5th column: Staff Members */}
        {selectedDesk && (
          <StaffMembersPanel
            desk={selectedDesk}
            onAddStaff={() => setModalState({ open: true, mode: "add" })}
            onEditRole={(user) => setModalState({ open: true, mode: "edit", user })}
          />
        )}
      </div>

      {/* Role Assignment Modal */}
      {modalState.open && selectedDesk && (
        <RoleAssignmentModal
          mode={modalState.mode}
          contextPath={contextPath}
          existingUser={modalState.user}
          deskUsers={selectedDesk.users}
          onClose={() => setModalState({ open: false, mode: "add" })}
        />
      )}
    </div>
  );
}