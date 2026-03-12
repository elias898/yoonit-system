import { useState, useMemo } from "react";
import { Shield, Search, Plus, Download, RefreshCw, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

type Admin = {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin";
  lastActive: string;
  avatar: string;
};

const initialAdmins: Admin[] = [
  { id: "1", name: "Elena Papadopoulos", email: "elena.p@yoonit.com", role: "Super Admin", lastActive: "Mar 9th 2026, 10:15", avatar: "EP" },
  { id: "2", name: "Marcus Chen", email: "marcus.c@yoonit.com", role: "Admin", lastActive: "Mar 9th 2026, 09:42", avatar: "MC" },
  { id: "3", name: "Sofia Andreou", email: "sofia.a@yoonit.com", role: "Admin", lastActive: "Mar 8th 2026, 17:30", avatar: "SA" },
  { id: "4", name: "James Wright", email: "james.w@yoonit.com", role: "Admin", lastActive: "Mar 7th 2026, 14:20", avatar: "JW" },
  { id: "5", name: "Anna Kozlova", email: "anna.k@yoonit.com", role: "Super Admin", lastActive: "Mar 6th 2026, 11:05", avatar: "AK" },
  { id: "6", name: "Dimitris Georgiou", email: "dimitris.g@yoonit.com", role: "Admin", lastActive: "Mar 5th 2026, 16:48", avatar: "DG" },
];

export function CompanyAdminsPanel() {
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins);
  const [adminSearch, setAdminSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAdmins = useMemo(() => {
    if (!adminSearch.trim()) return admins;
    const q = adminSearch.toLowerCase();
    return admins.filter(
      (a) => a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q) || a.role.toLowerCase().includes(q)
    );
  }, [admins, adminSearch]);

  const totalPages = Math.max(1, Math.ceil(filteredAdmins.length / rowsPerPage));
  const paginatedAdmins = filteredAdmins.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const rangeStart = filteredAdmins.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const rangeEnd = Math.min(currentPage * rowsPerPage, filteredAdmins.length);

  const handleRemoveAdmin = (id: string) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 bg-[var(--slate-2)] rounded-lg h-8 px-2.5 w-[240px]">
          <Search size={14} className="text-[var(--text-muted)] shrink-0" />
          <input
            type="text"
            placeholder="Search administrators..."
            value={adminSearch}
            onChange={(e) => { setAdminSearch(e.target.value); setCurrentPage(1); }}
            className="flex-1 bg-transparent font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
            <RefreshCw size={15} className="text-[var(--text-secondary)]" />
          </button>
          <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
            <Download size={14} />
            Export
          </button>
          <button className="h-8 px-3 flex items-center gap-1.5 rounded-lg bg-[var(--accent-solid)] text-white font-['Inter',sans-serif] text-[length:var(--text-sm)] hover:bg-[var(--accent-solid-hover)] cursor-pointer transition-colors" style={{ fontWeight: 600 }}>
            <Plus size={14} />
            Add Admin
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-[var(--border-default)] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--bg-subtle)]">
              <th className="text-left px-4 py-2.5 font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] tracking-wide" style={{ fontWeight: 600 }}>Name</th>
              <th className="text-left px-4 py-2.5 font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] tracking-wide" style={{ fontWeight: 600 }}>Email</th>
              <th className="text-left px-4 py-2.5 font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] tracking-wide" style={{ fontWeight: 600 }}>Role</th>
              <th className="text-left px-4 py-2.5 font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] tracking-wide" style={{ fontWeight: 600 }}>Last Active</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedAdmins.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-muted)]">
                  No administrators found.
                </td>
              </tr>
            ) : (
              paginatedAdmins.map((admin, idx) => (
                <tr key={admin.id} className={`hover:bg-[var(--bg-hover)] transition-colors ${idx < paginatedAdmins.length - 1 ? "border-b border-[var(--border-subtle)]" : ""}`}>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[var(--indigo-3)] flex items-center justify-center shrink-0">
                        <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--indigo-11)]" style={{ fontWeight: 600 }}>
                          {admin.avatar}
                        </span>
                      </div>
                      <span className="font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-primary)]" style={{ fontWeight: 600 }}>
                        {admin.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 font-['Inter',sans-serif] text-[length:var(--text-sm)] text-[color:var(--text-secondary)]">
                    {admin.email}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="inline-flex items-center gap-1 px-2 h-6 rounded-[6px] bg-[var(--slate-3)] font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-primary)]">
                      <Shield size={11} className="text-[var(--text-secondary)]" />
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)]">
                    {admin.lastActive}
                  </td>
                  <td className="px-4 py-2.5">
                    <button
                      onClick={() => handleRemoveAdmin(admin.id)}
                      title="Remove admin"
                      className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 cursor-pointer transition-colors group"
                    >
                      <Trash2 size={14} className="text-[var(--text-muted)] group-hover:text-red-500 transition-colors" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr className="border-t border-[var(--border-subtle)]">
              <td colSpan={5} className="px-4 py-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)]">Rows per page</span>
                    <select
                      value={rowsPerPage}
                      onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                      className="h-7 px-1.5 rounded border border-[var(--border-default)] bg-[var(--bg-surface)] font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-primary)] outline-none cursor-pointer"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-muted)]">
                      {rangeStart}–{rangeEnd} of {filteredAdmins.length}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage <= 1}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-default"
                      >
                        <ChevronLeft size={14} className="text-[var(--text-secondary)]" />
                      </button>
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage >= totalPages}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--bg-hover)] cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-default"
                      >
                        <ChevronRight size={14} className="text-[var(--text-secondary)]" />
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
