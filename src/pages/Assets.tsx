import { useState } from "react";
import { StatusChip } from "./Identities";
import type { ToastMsg } from "../App";

const assets = [
  {
    id: "VRT-0041", name: "Employee Credential", owner: "Aria Kim", did: "did:ethr:0x4a2f…f91",
    minted: "Jan 15, 2024", category: "Credential", status: "Verified",
    color: "#3F6B4D", history: ["Minted → Aria Kim (Jan 15)", "Transferred → Aria Kim (Jan 15)"],
  },
  {
    id: "VRT-0088", name: "Access Certificate", owner: "Reza Tehrani", did: "did:ethr:0x9c8d…b32",
    minted: "Mar 8, 2024", category: "Certificate", status: "Verified",
    color: "#5C8A5C", history: ["Minted → Reza Tehrani (Mar 8)", "Role added (Mar 9)"],
  },
  {
    id: "VRT-0112", name: "Audit Report NFT", owner: "Yuki Tanaka", did: "did:ethr:0x1b3e…d72",
    minted: "Apr 22, 2024", category: "Report", status: "Verified",
    color: "#7FAE83", history: ["Minted → Org Vault (Apr 22)", "Assigned → Yuki (Apr 23)"],
  },
  {
    id: "VRT-0145", name: "Training Badge", owner: "Sia Mensah", did: "did:ethr:0x7f4c…aa5",
    minted: "May 5, 2024", category: "Badge", status: "Verified",
    color: "#C99A4A", history: ["Minted → Sia Mensah (May 5)"],
  },
  {
    id: "VRT-0201", name: "Compliance Token", owner: "Lena Vogel", did: "did:ethr:0x5e2f…e41",
    minted: "Jul 1, 2024", category: "Token", status: "Pending",
    color: "#B26B57", history: ["Minted → Org Vault (Jul 1)", "Pending verification"],
  },
  {
    id: "VRT-0219", name: "Security Clearance", owner: "Omar Hassan", did: "did:ethr:0xc34a…b19",
    minted: "Sep 2, 2024", category: "Credential", status: "Pending",
    color: "#6B7166", history: ["Minted → Omar Hassan (Sep 2)"],
  },
];

export default function Assets({ onToast }: { onToast: (t: string, type?: ToastMsg["type"]) => void }) {
  const [selected, setSelected] = useState<typeof assets[0] | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="flex gap-5 max-w-6xl">
      <div className="flex-1 flex flex-col gap-4">
        {/* Controls */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ fontFamily: "Space Grotesk", color: "#20291F" }}>
              {assets.length} assets
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 p-0.5 rounded-lg" style={{ background: "#F1F4E8", border: "1px solid #DCE2D2" }}>
              {(["grid", "list"] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium"
                  style={{
                    background: view === v ? "#3F6B4D" : "transparent",
                    color: view === v ? "white" : "#6B7166",
                  }}
                >
                  {v === "grid" ? "⊞ Grid" : "≡ List"}
                </button>
              ))}
            </div>
            <button
              onClick={() => onToast("NFT minted successfully — recorded on-chain ✓", "success")}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ background: "#3F6B4D", fontFamily: "Space Grotesk" }}
            >
              + Mint New Asset
            </button>
          </div>
        </div>

        {/* Grid */}
        {view === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {assets.map(a => (
              <AssetCard key={a.id} asset={a} onClick={() => setSelected(a)} selected={selected?.id === a.id} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border overflow-hidden" style={{ background: "#F1F4E8", borderColor: "#DCE2D2" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #DCE2D2" }}>
                  {["Asset", "Category", "Owner", "Minted", "Status"].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide" style={{ color: "#6B7166" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assets.map((a, i) => (
                  <tr key={a.id} onClick={() => setSelected(a)} className="cursor-pointer"
                    style={{ borderBottom: i < assets.length - 1 ? "1px solid #DCE2D2" : "none", background: selected?.id === a.id ? "#EEF1E3" : "transparent" }}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <NftIcon color={a.color} />
                        <div>
                          <div className="font-medium text-sm" style={{ color: "#20291F" }}>{a.name}</div>
                          <div className="text-xs font-mono" style={{ color: "#6B7166" }}>{a.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs" style={{ color: "#6B7166" }}>{a.category}</td>
                    <td className="px-5 py-3 text-xs" style={{ color: "#20291F" }}>{a.owner}</td>
                    <td className="px-5 py-3 text-xs" style={{ color: "#6B7166" }}>{a.minted}</td>
                    <td className="px-5 py-3"><StatusChip status={a.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selected && (
        <div
          className="w-72 shrink-0 rounded-2xl border p-6 flex flex-col gap-5"
          style={{ background: "#F1F4E8", borderColor: "#DCE2D2" }}
        >
          <div className="flex items-start justify-between">
            <div className="font-semibold" style={{ fontFamily: "Space Grotesk", color: "#20291F" }}>{selected.name}</div>
            <button onClick={() => setSelected(null)} style={{ color: "#6B7166", fontSize: 18 }}>×</button>
          </div>

          <div className="flex justify-center py-4">
            <NftIcon color={selected.color} size={80} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Token ID", value: selected.id },
              { label: "Category", value: selected.category },
              { label: "Owner", value: selected.owner },
              { label: "Minted", value: selected.minted },
            ].map(f => (
              <div key={f.label} className="p-3 rounded-xl" style={{ background: "#EEF1E3" }}>
                <div className="text-xs" style={{ color: "#6B7166" }}>{f.label}</div>
                <div className="text-xs font-semibold mt-1" style={{ color: "#20291F" }}>{f.value}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#6B7166" }}>
              Ownership History
            </div>
            <div className="flex flex-col gap-2">
              {selected.history.map((h, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="flex flex-col items-center">
                    <span className="w-2 h-2 rounded-full shrink-0 mt-0.5" style={{ background: "#3F6B4D" }} />
                    {i < selected.history.length - 1 && (
                      <div className="w-px flex-1 my-1" style={{ background: "#DCE2D2", minHeight: 16 }} />
                    )}
                  </div>
                  <span className="text-xs leading-relaxed" style={{ color: "#6B7166" }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onToast("Transfer initiated — pending confirmation on-chain", "info")}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white mt-auto"
            style={{ background: "#3F6B4D", fontFamily: "Space Grotesk" }}
          >
            Transfer Ownership
          </button>
        </div>
      )}
    </div>
  );
}

function NftIcon({ color, size = 36 }: { color: string; size?: number }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="10" fill={color + "22"} />
      <polygon points="18,6 30,13 30,23 18,30 6,23 6,13" fill={color + "44"} stroke={color} strokeWidth="1.5" />
      <circle cx="18" cy="18" r="5" fill={color} opacity="0.8" />
      <circle cx="18" cy="18" r="2" fill="white" opacity="0.9" />
    </svg>
  );
}

function AssetCard({
  asset, onClick, selected,
}: { asset: typeof assets[0]; onClick: () => void; selected: boolean }) {
  return (
    <button
      onClick={onClick}
      className="p-5 rounded-2xl border text-left flex flex-col gap-4"
      style={{
        background: selected ? "#EEF1E3" : "#F1F4E8",
        borderColor: selected ? "#7FAE83" : "#DCE2D2",
      }}
    >
      <div className="flex items-start justify-between">
        <NftIcon color={asset.color} size={44} />
        <StatusChip status={asset.status} />
      </div>
      <div>
        <div className="font-semibold text-sm" style={{ fontFamily: "Space Grotesk", color: "#20291F" }}>
          {asset.name}
        </div>
        <div className="text-xs mt-0.5 font-mono" style={{ color: "#6B7166" }}>{asset.id}</div>
      </div>
      <div className="text-xs" style={{ color: "#6B7166" }}>
        <span style={{ color: "#20291F" }}>{asset.owner}</span> · {asset.minted}
      </div>
    </button>
  );
}
