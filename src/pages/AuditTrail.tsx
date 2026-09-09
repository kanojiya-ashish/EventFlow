import { useState } from "react";

const log = [
  { id: "0x4a2f9e1b", action: "Identity Verified", actor: "Aria Kim", target: "Omar Hassan", time: "Sep 3, 2024 14:22:07", category: "Identity", txHash: "0x4a2f…9e1b" },
  { id: "0x7c913d4a", action: "NFT Minted", actor: "Reza Tehrani", target: "VRT-0219", time: "Sep 3, 2024 13:11:45", category: "Asset", txHash: "0x7c91…3d4a" },
  { id: "0x1b3ea72c", action: "Role Assigned", actor: "Aria Kim", target: "Yuki Tanaka → Auditor", time: "Sep 3, 2024 11:05:33", category: "Access", txHash: "0x1b3e…a72c" },
  { id: "0x9f2dc15e", action: "Access Revoked", actor: "Aria Kim", target: "Finn O'Brien", time: "Sep 3, 2024 10:48:19", category: "Access", txHash: "0x9f2d…c15e" },
  { id: "0x3e8bd91f", action: "Ownership Transferred", actor: "Sia Mensah", target: "VRT-0088 → Reza", time: "Sep 3, 2024 09:30:02", category: "Asset", txHash: "0x3e8b…d91f" },
  { id: "0xf1a2c839", action: "Identity Created", actor: "Aria Kim", target: "Omar Hassan", time: "Sep 2, 2024 16:55:41", category: "Identity", txHash: "0xf1a2…c839" },
  { id: "0xb3d5e120", action: "Permission Changed", actor: "Aria Kim", target: "Manager: mint_nft → enabled", time: "Sep 2, 2024 15:12:08", category: "Access", txHash: "0xb3d5…e120" },
  { id: "0xe9c1a47b", action: "NFT Minted", actor: "Sia Mensah", target: "VRT-0201", time: "Sep 1, 2024 12:44:33", category: "Asset", txHash: "0xe9c1…a47b" },
  { id: "0x2d7bf038", action: "Identity Verified", actor: "Reza Tehrani", target: "Lena Vogel", time: "Aug 31, 2024 10:15:22", category: "Identity", txHash: "0x2d7b…f038" },
  { id: "0x6a3cd819", action: "Settings Updated", actor: "Aria Kim", target: "Notification preferences", time: "Aug 30, 2024 17:03:50", category: "System", txHash: "0x6a3c…d819" },
];

const categories = ["All", "Identity", "Asset", "Access", "System"];

const catColors: Record<string, { bg: string; color: string }> = {
  Identity: { bg: "#3F6B4D22", color: "#3F6B4D" },
  Asset: { bg: "#5C8A5C22", color: "#5C8A5C" },
  Access: { bg: "#C99A4A22", color: "#C99A4A" },
  System: { bg: "#6B716622", color: "#6B7166" },
};

export default function AuditTrail() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = log.filter(l =>
    (cat === "All" || l.category === cat) &&
    (l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.actor.toLowerCase().includes(search.toLowerCase()) ||
      l.target.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-5xl flex flex-col gap-5">
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <input
          placeholder="Search actions, actors, targets…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 rounded-lg border text-sm outline-none flex-1 min-w-40"
          style={{ background: "#F1F4E8", borderColor: "#DCE2D2", color: "#20291F" }}
        />
        <div className="flex gap-1 p-0.5 rounded-lg" style={{ background: "#F1F4E8", border: "1px solid #DCE2D2" }}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="px-3 py-1.5 rounded-md text-xs font-medium"
              style={{
                background: cat === c ? "#3F6B4D" : "transparent",
                color: cat === c ? "white" : "#6B7166",
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <button
          className="px-4 py-2 rounded-lg text-sm font-semibold border"
          style={{ borderColor: "#DCE2D2", color: "#3F6B4D", background: "#F1F4E8" }}
        >
          ↓ Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: "#F1F4E8", borderColor: "#DCE2D2" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid #DCE2D2", background: "#EEF1E3" }}>
              {["Time", "Action", "Category", "Actor", "Target / Detail", "Tx Hash"].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide" style={{ color: "#6B7166" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry, i) => (
              <tr key={entry.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #DCE2D2" : "none" }}>
                <td className="px-5 py-3 text-xs font-mono whitespace-nowrap" style={{ color: "#6B7166" }}>
                  {entry.time}
                </td>
                <td className="px-5 py-3 font-medium text-sm" style={{ color: "#20291F" }}>{entry.action}</td>
                <td className="px-5 py-3">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: catColors[entry.category]?.bg, color: catColors[entry.category]?.color }}
                  >
                    {entry.category}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm" style={{ color: "#20291F" }}>{entry.actor}</td>
                <td className="px-5 py-3 text-xs" style={{ color: "#6B7166" }}>{entry.target}</td>
                <td className="px-5 py-3">
                  <a
                    href="#"
                    className="font-mono text-xs flex items-center gap-1"
                    style={{ color: "#3F6B4D" }}
                    onClick={e => e.preventDefault()}
                  >
                    {entry.txHash}
                    <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <div className="text-3xl mb-3">≡</div>
            <div className="font-medium" style={{ color: "#20291F" }}>No audit entries match</div>
            <div className="text-sm mt-1" style={{ color: "#6B7166" }}>Try adjusting your search or category filter.</div>
          </div>
        )}
      </div>

      <p className="text-xs" style={{ color: "#6B7166" }}>
        All {log.length} entries are immutably recorded on Ethereum Mainnet. Data cannot be altered or deleted.
      </p>
    </div>
  );
}
