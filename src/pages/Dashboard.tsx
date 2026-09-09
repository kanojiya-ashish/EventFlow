import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { ToastMsg } from "../App";

const activityData = [
  { day: "Aug 26", txns: 38, identities: 4 },
  { day: "Aug 27", txns: 62, identities: 7 },
  { day: "Aug 28", txns: 45, identities: 3 },
  { day: "Aug 29", txns: 91, identities: 12 },
  { day: "Aug 30", txns: 74, identities: 9 },
  { day: "Aug 31", txns: 55, identities: 5 },
  { day: "Sep 1", txns: 110, identities: 14 },
  { day: "Sep 2", txns: 88, identities: 8 },
  { day: "Sep 3", txns: 127, identities: 18 },
];

const recentTxns = [
  { id: "0x4a2f…9e1b", action: "Identity Verified", actor: "Aria Kim", role: "Admin", time: "2 min ago", status: "confirmed" },
  { id: "0x7c91…3d4a", action: "NFT Minted", actor: "Reza Tehrani", role: "Manager", time: "11 min ago", status: "confirmed" },
  { id: "0x1b3e…a72c", action: "Role Assigned", actor: "Yuki Tanaka", role: "Auditor", time: "28 min ago", status: "confirmed" },
  { id: "0x9f2d…c15e", action: "Access Revoked", actor: "Marcus Cole", role: "User", time: "1 hr ago", status: "confirmed" },
  { id: "0x3e8b…d91f", action: "Ownership Transferred", actor: "Sia Mensah", role: "Manager", time: "2 hr ago", status: "confirmed" },
];

export default function Dashboard({ onToast }: { onToast: (t: string, type?: ToastMsg["type"]) => void }) {
  return (
    <div className="flex flex-col gap-6 max-w-6xl">
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Identities", value: "4,821", delta: "+18 today", icon: "◈", color: "#3F6B4D" },
          { label: "Active NFT Assets", value: "12,309", delta: "+42 this week", icon: "◆", color: "#5C8A5C" },
          { label: "Pending Access", value: "7", delta: "3 need review", icon: "⬛", color: "#C99A4A" },
          { label: "Txns Today", value: "127", delta: "+14% vs yesterday", icon: "≡", color: "#7FAE83" },
        ].map(card => (
          <div
            key={card.label}
            className="p-5 rounded-2xl border"
            style={{ background: "#F1F4E8", borderColor: "#DCE2D2" }}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "#6B7166" }}>
                {card.label}
              </span>
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                style={{ background: card.color + "22", color: card.color }}
              >
                {card.icon}
              </span>
            </div>
            <div className="text-3xl font-bold" style={{ fontFamily: "Space Grotesk", color: "#20291F" }}>
              {card.value}
            </div>
            <div className="text-xs mt-1" style={{ color: "#6B7166" }}>{card.delta}</div>
          </div>
        ))}
      </div>

      {/* Chart + quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Chart */}
        <div
          className="md:col-span-2 p-6 rounded-2xl border"
          style={{ background: "#F1F4E8", borderColor: "#DCE2D2" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="font-semibold text-sm" style={{ fontFamily: "Space Grotesk", color: "#20291F" }}>
                Platform Activity
              </div>
              <div className="text-xs mt-0.5" style={{ color: "#6B7166" }}>Blockchain transactions — last 9 days</div>
            </div>
            <div className="flex gap-3 text-xs" style={{ color: "#6B7166" }}>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: "#3F6B4D" }} />Transactions
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: "#C99A4A" }} />New Identities
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={activityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="txnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3F6B4D" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3F6B4D" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="idGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C99A4A" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#C99A4A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#DCE2D2" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#6B7166" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6B7166" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#FAF9F1", border: "1px solid #DCE2D2", borderRadius: 10, fontSize: 12 }}
                labelStyle={{ color: "#20291F", fontFamily: "Space Grotesk", fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="txns" stroke="#3F6B4D" strokeWidth={2} fill="url(#txnGrad)" dot={false} />
              <Area type="monotone" dataKey="identities" stroke="#C99A4A" strokeWidth={2} fill="url(#idGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick actions */}
        <div
          className="p-6 rounded-2xl border flex flex-col gap-3"
          style={{ background: "#F1F4E8", borderColor: "#DCE2D2" }}
        >
          <div className="font-semibold text-sm mb-1" style={{ fontFamily: "Space Grotesk", color: "#20291F" }}>
            Quick Actions
          </div>
          {[
            { label: "Create Identity", sub: "Issue new DID", color: "#3F6B4D" },
            { label: "Mint Asset", sub: "New NFT credential", color: "#5C8A5C" },
            { label: "Review Access", sub: "7 pending requests", color: "#C99A4A" },
          ].map(a => (
            <button
              key={a.label}
              onClick={() => onToast(`${a.label} — opening flow…`, "info")}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border text-left w-full"
              style={{ background: "#FAF9F1", borderColor: "#DCE2D2" }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: a.color }}
              />
              <div>
                <div className="text-sm font-medium" style={{ color: "#20291F" }}>{a.label}</div>
                <div className="text-xs" style={{ color: "#6B7166" }}>{a.sub}</div>
              </div>
            </button>
          ))}

          <div className="mt-auto pt-4 border-t" style={{ borderColor: "#DCE2D2" }}>
            <div className="text-xs font-medium mb-2" style={{ color: "#6B7166" }}>System Health</div>
            <div className="flex flex-col gap-2">
              {[
                { label: "Smart Contracts", status: "Operational" },
                { label: "IPFS Gateway", status: "Operational" },
                { label: "Oracle Feed", status: "Syncing" },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between text-xs">
                  <span style={{ color: "#6B7166" }}>{s.label}</span>
                  <span
                    className="px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: s.status === "Operational" ? "#5C8A5C22" : "#C99A4A22",
                      color: s.status === "Operational" ? "#5C8A5C" : "#C99A4A",
                    }}
                  >
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "#F1F4E8", borderColor: "#DCE2D2" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#DCE2D2" }}>
          <div className="font-semibold text-sm" style={{ fontFamily: "Space Grotesk", color: "#20291F" }}>
            Recent Transactions
          </div>
          <span className="text-xs" style={{ color: "#3F6B4D", cursor: "pointer" }}>View all →</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #DCE2D2" }}>
                {["Tx Hash", "Action", "Actor", "Role", "Time", "Status"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide" style={{ color: "#6B7166" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTxns.map((tx, i) => (
                <tr
                  key={tx.id}
                  style={{ borderBottom: i < recentTxns.length - 1 ? "1px solid #DCE2D2" : "none" }}
                >
                  <td className="px-5 py-3 font-mono text-xs" style={{ color: "#3F6B4D" }}>{tx.id}</td>
                  <td className="px-5 py-3 font-medium" style={{ color: "#20291F" }}>{tx.action}</td>
                  <td className="px-5 py-3" style={{ color: "#20291F" }}>{tx.actor}</td>
                  <td className="px-5 py-3">
                    <RoleBadge role={tx.role} />
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: "#6B7166" }}>{tx.time}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ background: "#5C8A5C22", color: "#5C8A5C" }}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function RoleBadge({ role }: { role: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Admin: { bg: "#3F6B4D22", color: "#3F6B4D" },
    Manager: { bg: "#7FAE8322", color: "#5C8A5C" },
    Auditor: { bg: "#C99A4A22", color: "#C99A4A" },
    User: { bg: "#DCE2D2", color: "#6B7166" },
  };
  const s = map[role] || map["User"];
  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: s.bg, color: s.color }}>
      {role}
    </span>
  );
}
