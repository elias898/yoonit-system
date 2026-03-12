import { useState, useMemo } from "react";
import {
  Building2,
  Briefcase,
  Users,
  Monitor,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  User,
} from "lucide-react";

// --- Types ---
type Role = "Executive" | "Desk Mgr" | "Team Mgr" | "Dept Mgr" | "Entity Mgr";

interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarColor: string;
  status: "Active" | "Inactive";
  lastActive: string;
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

// Tree node for unified handling
interface TreeNode {
  id: string;
  name: string;
  type: "entity" | "department" | "team" | "desk";
  children: TreeNode[];
  path: string[]; // breadcrumb segments
}

// --- Constants ---
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

const roleBadgeStyles: Record<Role, string> = {
  Executive: "bg-[var(--bg-muted)] text-[color:var(--text-secondary)] border-[var(--border-default)]",
  "Desk Mgr": "bg-[var(--accent-bg)] text-[color:var(--accent-text)] border-[var(--accent-line)]",
  "Team Mgr": "bg-[var(--accent-bg)] text-[color:var(--accent-text)] border-[var(--accent-line)]",
  "Dept Mgr": "bg-[var(--accent-bg)] text-[color:var(--accent-text)] border-[var(--accent-line)]",
  "Entity Mgr": "bg-[var(--indigo-4)] text-[color:var(--indigo-12)] border-[var(--indigo-7)]",
};

const isManagerRole = (role: Role) =>
  role === "Desk Mgr" || role === "Team Mgr" || role === "Dept Mgr" || role === "Entity Mgr";

const typeIcons: Record<string, React.ElementType> = {
  entity: Building2,
  department: Briefcase,
  team: Users,
  desk: Monitor,
};

const typeLabels: Record<string, string> = {
  entity: "Entity",
  department: "Department",
  team: "Team",
  desk: "Desk",
};

const allRoles: Role[] = ["Executive", "Desk Mgr", "Team Mgr", "Dept Mgr", "Entity Mgr"];

// --- Mock Data ---
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
                  { id: "u1", name: "Elena Constantinou", email: "elena.c@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[0], status: "Active", lastActive: "Today, 10:32 AM" },
                  { id: "u2", name: "Stavros Nikolaou", email: "stavros.n@yoonit.com", role: "Executive", avatarColor: avatarColors[1], status: "Active", lastActive: "Today, 9:15 AM" },
                  { id: "u3", name: "Christina Pavlou", email: "christina.p@yoonit.com", role: "Executive", avatarColor: avatarColors[4], status: "Active", lastActive: "Yesterday" },
                  { id: "u4", name: "Marios Christodoulou", email: "marios.ch@yoonit.com", role: "Executive", avatarColor: avatarColors[2], status: "Inactive", lastActive: "Feb 28, 2026" },
                ],
              },
              {
                id: "dk2",
                name: "Greece Desk",
                manager: "Yiannis Makris",
                users: [
                  { id: "u5", name: "Yiannis Makris", email: "yiannis.m@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[3], status: "Active", lastActive: "Today, 11:05 AM" },
                  { id: "u6", name: "Dimitra Alexiou", email: "dimitra.a@yoonit.com", role: "Executive", avatarColor: avatarColors[5], status: "Active", lastActive: "Today, 8:45 AM" },
                  { id: "u7", name: "Kostas Papadimitriou", email: "kostas.p@yoonit.com", role: "Executive", avatarColor: avatarColors[6], status: "Active", lastActive: "Yesterday" },
                ],
              },
              {
                id: "dk3",
                name: "Germany Desk",
                manager: "Hans Mueller",
                users: [
                  { id: "u8", name: "Hans Mueller", email: "hans.m@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[7], status: "Active", lastActive: "Today, 10:00 AM" },
                  { id: "u9", name: "Klaus Richter", email: "klaus.r@yoonit.com", role: "Executive", avatarColor: avatarColors[0], status: "Inactive", lastActive: "Mar 1, 2026" },
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
                  { id: "u10", name: "Fatima Al-Hassan", email: "fatima.h@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[4], status: "Active", lastActive: "Today, 9:50 AM" },
                  { id: "u11", name: "Khalid Mansour", email: "khalid.m@yoonit.com", role: "Executive", avatarColor: avatarColors[1], status: "Active", lastActive: "Today, 7:30 AM" },
                  { id: "u12", name: "Noor Al-Sayed", email: "noor.s@yoonit.com", role: "Executive", avatarColor: avatarColors[2], status: "Active", lastActive: "Yesterday" },
                ],
              },
              {
                id: "dk5",
                name: "KSA Desk",
                manager: "Saleh Al-Rashid",
                users: [
                  { id: "u13", name: "Saleh Al-Rashid", email: "saleh.r@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[3], status: "Active", lastActive: "Today, 11:20 AM" },
                  { id: "u14", name: "Amira Bin Khalid", email: "amira.k@yoonit.com", role: "Executive", avatarColor: avatarColors[5], status: "Inactive", lastActive: "Feb 25, 2026" },
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
                  { id: "u15", name: "Zhang Yong", email: "zhang.y@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[6], status: "Active", lastActive: "Today, 6:15 AM" },
                  { id: "u16", name: "Liu Mei", email: "liu.m@yoonit.com", role: "Executive", avatarColor: avatarColors[7], status: "Active", lastActive: "Today, 5:50 AM" },
                ],
              },
              {
                id: "dk7",
                name: "SEA Desk",
                manager: "Tan Mei Lin",
                users: [
                  { id: "u17", name: "Tan Mei Lin", email: "tan.ml@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[0], status: "Active", lastActive: "Today, 7:00 AM" },
                  { id: "u18", name: "Raj Anand", email: "raj.a@yoonit.com", role: "Executive", avatarColor: avatarColors[1], status: "Active", lastActive: "Yesterday" },
                  { id: "u19", name: "Siti Nurhaliza", email: "siti.n@yoonit.com", role: "Executive", avatarColor: avatarColors[4], status: "Inactive", lastActive: "Feb 20, 2026" },
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
                  { id: "u20", name: "Sophia Ioannou", email: "sophia.i@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[2], status: "Active", lastActive: "Today, 10:45 AM" },
                  { id: "u21", name: "Petros Antoniou", email: "petros.a@yoonit.com", role: "Executive", avatarColor: avatarColors[3], status: "Active", lastActive: "Today, 10:30 AM" },
                ],
              },
              {
                id: "dk9",
                name: "Email Desk",
                manager: "Marios Stavrou",
                users: [
                  { id: "u22", name: "Marios Stavrou", email: "marios.s@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[5], status: "Active", lastActive: "Today, 9:00 AM" },
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
                  { id: "u23", name: "Kyriakos Andreou", email: "kyriakos.a@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[6], status: "Active", lastActive: "Today, 11:00 AM" },
                  { id: "u24", name: "Georgia Efthymiou", email: "georgia.e@yoonit.com", role: "Executive", avatarColor: avatarColors[7], status: "Active", lastActive: "Yesterday" },
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
                  { id: "u25", name: "Irene Nikolaou", email: "irene.n@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[0], status: "Active", lastActive: "Today, 10:15 AM" },
                  { id: "u26", name: "Vasilis Katsaros", email: "vasilis.k@yoonit.com", role: "Executive", avatarColor: avatarColors[1], status: "Active", lastActive: "Today, 9:30 AM" },
                ],
              },
              {
                id: "dk12",
                name: "Review Desk",
                manager: "Andreas Charalambous",
                users: [
                  { id: "u27", name: "Andreas Charalambous", email: "andreas.ch@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[2], status: "Active", lastActive: "Today, 8:00 AM" },
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
                  { id: "u28", name: "Emily Watson", email: "emily.w@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[3], status: "Active", lastActive: "Today, 10:00 AM" },
                  { id: "u29", name: "Oliver Thompson", email: "oliver.t@yoonit.com", role: "Executive", avatarColor: avatarColors[4], status: "Active", lastActive: "Today, 9:45 AM" },
                  { id: "u30", name: "Charlotte Williams", email: "charlotte.w@yoonit.com", role: "Executive", avatarColor: avatarColors[5], status: "Active", lastActive: "Yesterday" },
                ],
              },
              {
                id: "dk14",
                name: "Manchester Desk",
                manager: "Robert Hayes",
                users: [
                  { id: "u31", name: "Robert Hayes", email: "robert.h@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[6], status: "Active", lastActive: "Today, 10:10 AM" },
                  { id: "u32", name: "Sophie Baker", email: "sophie.b@yoonit.com", role: "Executive", avatarColor: avatarColors[7], status: "Inactive", lastActive: "Feb 27, 2026" },
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
                  { id: "u33", name: "Arun Patel", email: "arun.p@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[0], status: "Active", lastActive: "Today, 7:30 AM" },
                  { id: "u34", name: "Deepika Rao", email: "deepika.r@yoonit.com", role: "Executive", avatarColor: avatarColors[1], status: "Active", lastActive: "Today, 7:15 AM" },
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
                  { id: "u35", name: "Thomas Wright", email: "thomas.w@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[2], status: "Active", lastActive: "Today, 9:20 AM" },
                ],
              },
              {
                id: "dk17",
                name: "Reconciliation Desk",
                manager: "Laura Green",
                users: [
                  { id: "u36", name: "Laura Green", email: "laura.g@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[3], status: "Active", lastActive: "Today, 8:50 AM" },
                  { id: "u37", name: "James Foster", email: "james.f@yoonit.com", role: "Executive", avatarColor: avatarColors[4], status: "Active", lastActive: "Yesterday" },
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
                  { id: "u38", name: "Haruto Suzuki", email: "haruto.s@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[5], status: "Active", lastActive: "Today, 6:00 AM" },
                  { id: "u39", name: "Aoi Nakamura", email: "aoi.n@yoonit.com", role: "Executive", avatarColor: avatarColors[6], status: "Active", lastActive: "Today, 5:30 AM" },
                ],
              },
              {
                id: "dk19",
                name: "Osaka Desk",
                manager: "Akira Watanabe",
                users: [
                  { id: "u40", name: "Akira Watanabe", email: "akira.w@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[7], status: "Active", lastActive: "Today, 6:20 AM" },
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
                  { id: "u41", name: "Sakura Ito", email: "sakura.i@yoonit.com", role: "Desk Mgr", avatarColor: avatarColors[0], status: "Active", lastActive: "Today, 7:00 AM" },
                  { id: "u42", name: "Takuya Mori", email: "takuya.m@yoonit.com", role: "Executive", avatarColor: avatarColors[1], status: "Inactive", lastActive: "Feb 22, 2026" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

// --- Helpers ---
function getInitials(name: string) {
  const parts = name.split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

// Build tree nodes from data
function buildTree(entities: Entity[]): TreeNode[] {
  return entities.map((entity) => ({
    id: entity.id,
    name: entity.name,
    type: "entity" as const,
    path: [entity.name],
    children: entity.departments.map((dept) => ({
      id: dept.id,
      name: dept.name,
      type: "department" as const,
      path: [entity.name, dept.name],
      children: dept.teams.map((team) => ({
        id: team.id,
        name: team.name,
        type: "team" as const,
        path: [entity.name, dept.name, team.name],
        children: team.desks.map((desk) => ({
          id: desk.id,
          name: desk.name,
          type: "desk" as const,
          path: [entity.name, dept.name, team.name, desk.name],
          children: [],
        })),
      })),
    })),
  }));
}

// Collect all users under a node ID by traversing the data
function collectUsers(nodeId: string, entities: Entity[]): StaffUser[] {
  for (const entity of entities) {
    if (entity.id === nodeId) {
      return entity.departments.flatMap((d) =>
        d.teams.flatMap((t) => t.desks.flatMap((dk) => dk.users))
      );
    }
    for (const dept of entity.departments) {
      if (dept.id === nodeId) {
        return dept.teams.flatMap((t) => t.desks.flatMap((dk) => dk.users));
      }
      for (const team of dept.teams) {
        if (team.id === nodeId) {
          return team.desks.flatMap((dk) => dk.users);
        }
        for (const desk of team.desks) {
          if (desk.id === nodeId) {
            return desk.users;
          }
        }
      }
    }
  }
  return [];
}

// Find a tree node by ID
function findNode(nodes: TreeNode[], id: string): TreeNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    const found = findNode(node.children, id);
    if (found) return found;
  }
  return null;
}

// Check if any node in subtree matches search
function nodeMatchesSearch(node: TreeNode, query: string): boolean {
  const q = query.toLowerCase();
  if (node.name.toLowerCase().includes(q)) return true;
  return node.children.some((child) => nodeMatchesSearch(child, q));
}

// --- Tree Node Component ---
function TreeNodeRow({
  node,
  depth,
  selectedId,
  onSelect,
  expandedIds,
  onToggleExpand,
  searchQuery,
}: {
  node: TreeNode;
  depth: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  expandedIds: Set<string>;
  onToggleExpand: (id: string) => void;
  searchQuery: string;
}) {
  const hasChildren = node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;
  const Icon = typeIcons[node.type];

  // Filter children by search
  const visibleChildren = searchQuery
    ? node.children.filter((c) => nodeMatchesSearch(c, searchQuery))
    : node.children;

  return (
    <>
      <button
        onClick={() => onSelect(node.id)}
        className={`flex items-center w-full py-2.5 pr-2 transition-colors cursor-pointer group ${
          isSelected
            ? "bg-[var(--indigo-3)] shadow-[inset_2px_0_0_var(--indigo-9)]"
            : "hover:bg-[var(--bg-hover)]"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {/* Expand/collapse chevron */}
        {hasChildren ? (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(node.id);
            }}
            className="w-5 h-5 flex items-center justify-center shrink-0 rounded hover:bg-[var(--slate-4)] transition-colors cursor-pointer"
          >
            {isExpanded ? (
              <ChevronDown size={12} className="text-[var(--text-muted)]" />
            ) : (
              <ChevronRight size={12} className="text-[var(--text-muted)]" />
            )}
          </span>
        ) : (
          <span className="w-5 h-5 shrink-0" />
        )}

        {/* Icon */}
        <Icon
          size={14}
          className={`shrink-0 mr-2 ${
            isSelected ? "text-[var(--accent-text)]" : "text-[var(--text-muted)]"
          }`}
        />

        {/* Label */}
        <span
          className={`font-['Inter',sans-serif] text-[length:var(--text-base)] truncate ${
            isSelected
              ? "text-[color:var(--indigo-12)] font-semibold"
              : "text-[color:var(--text-primary)]"
          }`}
        >
          {node.name}
        </span>

        {/* Child count */}
        {hasChildren && (
          <span className="ml-auto font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)] shrink-0 pl-2">
            {node.children.length}
          </span>
        )}
      </button>

      {/* Children */}
      {isExpanded &&
        visibleChildren.map((child) => (
          <TreeNodeRow
            key={child.id}
            node={child}
            depth={depth + 1}
            selectedId={selectedId}
            onSelect={onSelect}
            expandedIds={expandedIds}
            onToggleExpand={onToggleExpand}
            searchQuery={searchQuery}
          />
        ))}
    </>
  );
}

// --- Role Filter Dropdown ---
function RoleFilterDropdown({
  value,
  onChange,
}: {
  value: Role | "All";
  onChange: (v: Role | "All") => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--slate-7)] transition-colors cursor-pointer"
      >
        <Filter size={13} className="text-[var(--text-muted)]" />
        <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)]">
          {value === "All" ? "All Roles" : value}
        </span>
        <ChevronDown size={12} className="text-[var(--text-disabled)]" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-[160px] bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg shadow-lg py-1">
            <button
              onClick={() => { onChange("All"); setOpen(false); }}
              className={`w-full text-left px-3 py-1.5 font-['Inter',sans-serif] text-[length:var(--text-sm)] transition-colors cursor-pointer ${
                value === "All"
                  ? "text-[color:var(--accent-text)] bg-[var(--indigo-3)]"
                  : "text-[color:var(--text-primary)] hover:bg-[var(--bg-hover)]"
              }`}
            >
              All Roles
            </button>
            {allRoles.map((role) => (
              <button
                key={role}
                onClick={() => { onChange(role); setOpen(false); }}
                className={`w-full text-left px-3 py-1.5 font-['Inter',sans-serif] text-[length:var(--text-sm)] transition-colors cursor-pointer ${
                  value === role
                    ? "text-[color:var(--accent-text)] bg-[var(--indigo-3)]"
                    : "text-[color:var(--text-primary)] hover:bg-[var(--bg-hover)]"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// --- Main Component ---
export function Teams2Panel({ search }: { search: string }) {
  const tree = useMemo(() => buildTree(mockEntities), []);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    return new Set(mockEntities.map((e) => e.id));
  });
  const [treeSearch, setTreeSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "All">("All");

  const selectedNode = selectedId ? findNode(tree, selectedId) : null;

  const allUsers = useMemo(() => {
    if (!selectedId) return [];
    return collectUsers(selectedId, mockEntities);
  }, [selectedId]);

  const filteredUsers = useMemo(() => {
    let users = allUsers;
    if (roleFilter !== "All") {
      users = users.filter((u) => u.role === roleFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }
    return users;
  }, [allUsers, roleFilter, search]);

  const handleToggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setRoleFilter("All");
  };

  // Auto-expand parents when searching
  const effectiveExpanded = useMemo(() => {
    const q = treeSearch || search;
    if (!q) return expandedIds;
    const expanded = new Set(expandedIds);
    const expandMatching = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        if (nodeMatchesSearch(node, q) && node.children.length > 0) {
          expanded.add(node.id);
        }
        expandMatching(node.children);
      }
    };
    expandMatching(tree);
    return expanded;
  }, [treeSearch, search, expandedIds, tree]);

  const visibleTree = useMemo(() => {
    const q = treeSearch || search;
    return q ? tree.filter((n) => nodeMatchesSearch(n, q)) : tree;
  }, [treeSearch, search, tree]);

  return (
    <div className="flex h-full overflow-hidden bg-[var(--bg-surface)]">
      {/* === Left Sidebar: Tree === */}
      <div className="w-[280px] shrink-0 border-r border-[var(--border-default)] flex flex-col bg-[var(--bg-surface)]">
        {/* Tree search */}
        

        {/* Tree label */}
        <div className="py-2.5 px-[12px] py-[8px]"><span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-secondary)] font-semibold">Organizational Units</span></div>

        {/* Tree content */}
        <div className="flex-1 overflow-y-auto overlay-scrollbar pb-2">
          {visibleTree.length === 0 ? (
            <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] text-center py-6">
              No matching units
            </p>
          ) : (
            visibleTree.map((node) => (
              <TreeNodeRow
                key={node.id}
                node={node}
                depth={0}
                selectedId={selectedId}
                onSelect={handleSelect}
                expandedIds={effectiveExpanded}
                onToggleExpand={handleToggleExpand}
                searchQuery={treeSearch}
              />
            ))
          )}
        </div>
      </div>

      {/* === Right Pane: Management Table === */}
      <div className="flex-1 flex flex-col min-w-0">
        {selectedNode ? (
          <>
            {/* Header */}
            <div className="px-5 pt-4 pb-3 border-b border-[var(--border-default)]">
              <div className="flex items-center gap-2">
                {(() => {
                  const Icon = typeIcons[selectedNode.type];
                  return <Icon size={16} className="text-[var(--accent-text)] shrink-0" />;
                })()}
                <h5 className="text-[length:var(--text-base)] text-[color:var(--text-primary)]">
                  {selectedNode.name}
                </h5>
                <span className="inline-flex items-center h-6 rounded-[6px] bg-[var(--slate-3)] px-2 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:#171717] tracking-[-0.07px] whitespace-nowrap leading-[1.3]">
                  {typeLabels[selectedNode.type]}
                </span>
              </div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-1 mt-1">
                {selectedNode.path.map((seg, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && <ChevronRight size={10} className="text-[var(--border-strong)]" />}
                    <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)]">
                      {seg}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* Filter bar */}
            <div className="flex items-center justify-between px-5 py-2.5 border-b border-[var(--border-default)]">
              <div className="flex items-center gap-3">
                <RoleFilterDropdown value={roleFilter} onChange={setRoleFilter} />
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto overlay-scrollbar">
              {filteredUsers.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                  <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
                    No staff members{roleFilter !== "All" ? ` with role "${roleFilter}"` : ""} in this unit
                  </p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-[var(--bg-subtle)] border-b border-[var(--border-default)]">
                      <th className="text-left px-5 py-2 font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)] text-[color:var(--text-primary)] tracking-[-0.06px] leading-[1.3]">
                        Name
                      </th>
                      <th className="text-left px-4 py-2 font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)] text-[color:var(--text-primary)] tracking-[-0.06px] leading-[1.3]">
                        Role
                      </th>
                      <th className="text-left px-4 py-2 font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)] text-[color:var(--text-primary)] tracking-[-0.06px] leading-[1.3]">
                        Status
                      </th>
                      <th className="text-left px-4 py-2 font-['Inter',sans-serif] font-semibold text-[length:var(--text-sm)] text-[color:var(--text-primary)] tracking-[-0.06px] leading-[1.3]">
                        Last Active
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] transition-colors"
                      >
                        {/* Name + Avatar */}
                        <td className="px-5 py-2.5">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-8 h-8 rounded-full bg-[var(--slate-4)] flex items-center justify-center shrink-0"
                            >
                              <User size={16} className="text-[var(--slate-10)]" />
                            </div>
                            <div className="min-w-0">
                              <span className="block font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] font-semibold truncate">
                                {user.name}
                              </span>
                              <span className="block font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--slate-9)] truncate">
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="px-4 py-2.5">
                          <div className="inline-flex items-center h-6 min-w-[60px] rounded-[6px] bg-[var(--slate-3)]">
                            <div className="flex items-center gap-1 px-2 h-full">
                              {isManagerRole(user.role) && (
                                <div
                                  className="w-1 h-3 rounded-[50px] shrink-0 bg-[#171717]"
                                />
                              )}
                              <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:#171717] tracking-[-0.07px] whitespace-nowrap leading-[1.3]">
                                {user.role}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                user.status === "Active"
                                  ? "bg-[var(--success)]"
                                  : "bg-red-500"
                              }`}
                            />
                            <span
                              className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]"
                            >
                              {user.status}
                            </span>
                          </div>
                        </td>

                        {/* Last Active */}
                        <td className="px-4 py-2.5">
                          <span className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]">
                            {user.lastActive}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Users size={32} className="text-[var(--slate-6)] mx-auto mb-3" />
              <p className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] font-semibold">
                Select a unit from the tree to view staff members
              </p>
              <p className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] mt-1">
                Navigate the organizational hierarchy on the left
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}