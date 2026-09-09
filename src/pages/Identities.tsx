import { useState } from "react";
import { RoleBadge } from "./Dashboard";
import type { ToastMsg } from "../App";

const users = [
  { name: "Aria Kim", did: "did:ethr:0x4a2f…f91", role: "Admin", status: "Verified", joined: "Jan 12, 2024", proof: "EcDSA-secp256k1", txns: 428 },
  { name: "Reza Tehrani", did: "did:ethr:0x9c8d…b32", role: "Manager", status: "Verified", joined: "Mar 4, 2024", proof: "EcDSA-secp256k1", txns: 211 },
  { name: "Yuki Tanaka", did: "did:ethr:0x1b3e…d72", role: "Auditor", status: "Verified", joined: "Apr 18, 2024", proof: "BLS12-381", txns: 89 },
  { name: "Marcus Cole", did: "did:ethr:0xe2a1…099", role: "User", status: "Pending", joined: "Aug 1, 2024", proof: "—", txns: 3 },
  { name: "Sia Mensah", did: "did:ethr:0x7f4c…aa5", role: "Manager", status: "Verified", joined: "May 22, 2024", proof: "EcDSA-secp256k1", txns: 155 },
  { name: "Finn O'Brien", did: "did:ethr:0x3b9d…cc8", role: "User", status: "Revoked", joined: "Feb 10, 2024", proof: "EcDSA-secp256k1", txns: 17 },
  { name: "Lena Vogel", did: "did:ethr:0x5e2f…e41", role: "Auditor", status: "Verified", joined: "Jun 30, 2024", proof: "BLS12-381", txns: 63 },
  { name: "Omar Hassan", did: "did:ethr:0xc34a…b19", role: "User", status: "Pending", joined: "Sep 1, 2024", proof: "—", txns: 1 },
];

const statuses = ["All", "Verified", "Pending", "Revoked"];

export default function Identities({ onToast }: { onToast: (t: string, type?: ToastMsg["type"]) => void }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof users[0] | null>(null);

  const filtered = users.filter(u =>
    (filter === "All" || u.status === filter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.did.includes(search))
  );

  return (
    <div className="flex gap-5 max-w-6xl">
      {/* Main table */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <input
            placeholder="Search name or DID…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg border text-sm outline-none flex-1 min-w-40"
            style={{ background: "#F1F4E8", borderColor: "#DCE2D2", color: "#20291F" }}
          />
          <div className="flex gap-1 p-0.5 rounded-lg" style={{ background: "#F1F4E8", border: "1px solid #DCE2D2" }}>
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className="px-3 py-1.5 rounded-md text-xs font-medium"
                style={{
                  background: filter === s ? "#3F6B4D" : "transparent",
                  color: filter === s ? "white" : "#6B7166",
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={() => onToast("New identity creation flow opened", "info")}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: "#3F6B4D", fontFamily: "Space Grotesk" }}
          >
            + Create Identity
          </button>
        </div>

        {/* Table */}
        <div className="rounded-2xl border overflow-hidden" style={{ background: "#F1F4E8", borderColor: "#DCE2D2" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #DCE2D2" }}>
                {["Identity", "DID", "Role", "Status", "Joined", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide" style={{ color: "#6B7166" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr
                  key={u.did}
                  onClick={() => setSelected(u)}
                  className="cursor-pointer"
                  style={{
                    borderBottom: i < filtered.length - 1 ? "1px solid #DCE2D2" : "none",
                    background: selected?.did === u.did ? "#EEF1E3" : "transparent",
                  }}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: "#3F6B4D", fontFamily: "Space Grotesk" }}
                      >
                        {u.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="font-medium" style={{ color: "#20291F" }}>{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono text-xs" style={{ color: "#6B7166" }}>{u.did}</td>
                  <td className="px-5 py-3"><RoleBadge role={u.role} /></td>
                  <td className="px-5 py-3"><StatusChip status={u.status} /></td>
                  <td className="px-5 py-3 text-xs" style={{ color: "#6B7166" }}>{u.joined}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={e => { e.stopPropagation(); onToast(`Role updated for ${u.name}`, "success"); }}
                      className="text-xs px-3 py-1 rounded-lg border"
                      style={{ borderColor: "#DCE2D2", color: "#6B7166", background: "#FAF9F1" }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <div className="text-3xl mb-3">◈</div>
              <div className="font-medium" style={{ color: "#20291F" }}>No identities found</div>
              <div className="text-sm mt-1" style={{ color: "#6B7166" }}>Try adjusting your search or filter.</div>
            </div>
          )}
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div
          className="w-72 shrink-0 rounded-2xl border p-6 flex flex-col gap-5"
          style={{ background: "#F1F4E8", borderColor: "#DCE2D2" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="font-semibold text-base" style={{ fontFamily: "Space Grotesk", color: "#20291F" }}>
                {selected.name}
              </div>
              <StatusChip status={selected.status} />
            </div>
            <button onClick={() => setSelected(null)} style={{ color: "#6B7166", fontSize: 18 }}>×</button>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#6B7166" }}>
              Decentralized Identifier
            </div>
            <div
              className="px-3 py-2 rounded-lg font-mono text-xs break-all"
              style={{ background: "#EEF1E3", color: "#3F6B4D", border: "1px solid #DCE2D2" }}
            >
              {selected.did.replace("…", "abcdef1234567890")}
            </div>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: "#6B7166" }}>
              This is a globally unique identifier tied to the user's wallet — no central authority controls it.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#6B7166" }}>
              Cryptographic Proof
            </div>
            <div className="text-sm font-medium" style={{ color: "#20291F" }}>{selected.proof}</div>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: "#6B7166" }}>
              The signature algorithm used to prove ownership of this identity without revealing private keys.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl" style={{ background: "#EEF1E3" }}>
              <div className="text-xs" style={{ color: "#6B7166" }}>Role</div>
              <div className="font-semibold text-sm mt-1" style={{ fontFamily: "Space Grotesk", color: "#20291F" }}>
                {selected.role}
              </div>
            </div>
            <div className="p-3 rounded-xl" style={{ background: "#EEF1E3" }}>
              <div className="text-xs" style={{ color: "#6B7166" }}>Transactions</div>
              <div className="font-semibold text-sm mt-1" style={{ fontFamily: "Space Grotesk", color: "#20291F" }}>
                {selected.txns}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            <button
              onClick={() => onToast(`Role updated for ${selected.name}`, "success")}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: "#3F6B4D", fontFamily: "Space Grotesk" }}
            >
              Assign Role
            </button>
            <button
              onClick={() => onToast(`Revocation submitted for ${selected.name}`, "warn")}
              className="w-full py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: "#B26B5722", color: "#B26B57", border: "1px solid #B26B5744" }}
            >
              Revoke Identity
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function StatusChip({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Verified: { bg: "#5C8A5C22", color: "#5C8A5C" },
    Pending: { bg: "#C99A4A22", color: "#C99A4A" },
    Revoked: { bg: "#B26B5722", color: "#B26B57" },
  };
  const s = map[status] || map["Pending"];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ background: s.bg, color: s.color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
      {status}
    </span>
  );
}
