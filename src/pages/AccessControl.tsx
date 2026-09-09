import { useState } from "react";
import type { ToastMsg } from "../App";

const roles = ["Admin", "Manager", "Auditor", "User"];
const permissions = [
  { key: "create_identity", label: "Create Identity", desc: "Issue new DIDs to users", defaults: [true, true, false, false] },
  { key: "revoke_identity", label: "Revoke Identity", desc: "Remove access for a user", defaults: [true, false, false, false] },
  { key: "mint_nft", label: "Mint NFT Asset", desc: "Create new digital asset tokens", defaults: [true, true, false, false] },
  { key: "transfer_nft", label: "Transfer Asset", desc: "Move NFT ownership between accounts", defaults: [true, true, false, false] },
  { key: "assign_role", label: "Assign Role", desc: "Grant roles to identities", defaults: [true, false, false, false] },
  { key: "view_audit", label: "View Audit Trail", desc: "Read the full immutable activity log", defaults: [true, true, true, false] },
  { key: "export_audit", label: "Export Audit Data", desc: "Download audit log in CSV/JSON", defaults: [true, true, false, false] },
  { key: "read_only", label: "Read-Only Access", desc: "View dashboard and identity info", defaults: [true, true, true, true] },
  { key: "manage_settings", label: "Manage Settings", desc: "Edit org-level configuration", defaults: [true, false, false, false] },
];

export default function AccessControl({ onToast }: { onToast: (t: string, type?: ToastMsg["type"]) => void }) {
  const [matrix, setMatrix] = useState<Record<string, boolean[]>>(
    Object.fromEntries(permissions.map(p => [p.key, [...p.defaults]]))
  );

  const toggle = (permKey: string, roleIdx: number) => {
    if (roleIdx === 0) {
      onToast("Admin permissions cannot be modified for security reasons.", "warn");
      return;
    }
    setMatrix(prev => {
      const updated = { ...prev, [permKey]: [...prev[permKey]] };
      updated[permKey][roleIdx] = !updated[permKey][roleIdx];
      return updated;
    });
    onToast("Permission updated — change recorded on-chain", "success");
  };

  return (
    <div className="max-w-5xl flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <p className="text-sm mt-1" style={{ color: "#6B7166" }}>
            Define what each role can do. Changes are recorded as immutable smart contract transactions.
          </p>
        </div>
        <button
          onClick={() => onToast("New role creation flow opened", "info")}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: "#3F6B4D", fontFamily: "Space Grotesk" }}
        >
          + Add Role
        </button>
      </div>

      {/* Role cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {roles.map((role, i) => {
          const count = permissions.filter(p => matrix[p.key][i]).length;
          const colors = ["#3F6B4D", "#5C8A5C", "#C99A4A", "#6B7166"];
          return (
            <div key={role} className="p-4 rounded-xl border" style={{ background: "#F1F4E8", borderColor: "#DCE2D2" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full" style={{ background: colors[i] }} />
                <span className="font-semibold text-sm" style={{ fontFamily: "Space Grotesk", color: "#20291F" }}>{role}</span>
                {i === 0 && (
                  <span className="ml-auto text-xs px-1.5 py-0.5 rounded" style={{ background: "#3F6B4D22", color: "#3F6B4D" }}>
                    System
                  </span>
                )}
              </div>
              <div className="text-xs" style={{ color: "#6B7166" }}>
                {count}/{permissions.length} permissions
              </div>
              <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: "#DCE2D2" }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(count / permissions.length) * 100}%`, background: colors[i] }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Matrix */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: "#F1F4E8", borderColor: "#DCE2D2" }}>
        {/* Header row */}
        <div
          className="grid gap-0 border-b"
          style={{ gridTemplateColumns: "1fr repeat(4, 100px)", borderColor: "#DCE2D2", background: "#EEF1E3" }}
        >
          <div className="px-5 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "#6B7166" }}>
            Permission
          </div>
          {roles.map(r => (
            <div key={r} className="py-3 text-xs font-semibold text-center" style={{ color: "#20291F" }}>{r}</div>
          ))}
        </div>

        {permissions.map((perm, pi) => (
          <div
            key={perm.key}
            className="grid items-center border-b last:border-0"
            style={{ gridTemplateColumns: "1fr repeat(4, 100px)", borderColor: "#DCE2D2" }}
          >
            <div className="px-5 py-4">
              <div className="text-sm font-medium" style={{ color: "#20291F" }}>{perm.label}</div>
              <div className="text-xs mt-0.5" style={{ color: "#6B7166" }}>{perm.desc}</div>
            </div>
            {roles.map((_, ri) => (
              <div key={ri} className="flex items-center justify-center py-4">
                <div
                  className={`toggle-track${matrix[perm.key][ri] ? " on" : ""}`}
                  onClick={() => toggle(perm.key, ri)}
                  style={{ opacity: ri === 0 ? 0.6 : 1, cursor: ri === 0 ? "not-allowed" : "pointer" }}
                >
                  <div className="toggle-thumb" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="text-xs flex items-center gap-2" style={{ color: "#6B7166" }}>
        <span style={{ color: "#C99A4A" }}>!</span>
        Admin permissions are locked by smart contract. All other changes are audited on-chain.
      </p>
    </div>
  );
}
