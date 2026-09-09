import { useState } from "react";
import type { ToastMsg } from "../App";

export default function Settings({ onToast }: { onToast: (t: string, type?: ToastMsg["type"]) => void }) {
  const [notifs, setNotifs] = useState({
    txnConfirmed: true,
    newIdentity: true,
    accessRequest: true,
    systemAlerts: false,
  });
  const [email, setEmail] = useState("aria.kim@veritas.io");

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      {/* Profile */}
      <Section title="Profile & Identity">
        <div className="flex items-center gap-5 mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
            style={{ background: "#3F6B4D", fontFamily: "Space Grotesk" }}
          >
            AK
          </div>
          <div>
            <div className="font-semibold text-lg" style={{ fontFamily: "Space Grotesk", color: "#20291F" }}>Aria Kim</div>
            <div className="text-sm" style={{ color: "#6B7166" }}>Administrator</div>
            <div className="text-xs mt-1 font-mono" style={{ color: "#7FAE83" }}>Member since Jan 2024</div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Field label="Display Name" value="Aria Kim" />
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7166" }}>Contact Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
              style={{ background: "#EEF1E3", borderColor: "#DCE2D2", color: "#20291F" }}
            />
          </div>
        </div>
      </Section>

      {/* DID & Wallet */}
      <Section title="Decentralized Identifier & Wallet">
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7166" }}>
              Your DID
              <Tooltip text="A Decentralized Identifier — a globally unique address for your identity, not controlled by any central party." />
            </label>
            <div className="flex items-center gap-2">
              <div
                className="flex-1 px-3 py-2 rounded-lg font-mono text-xs"
                style={{ background: "#EEF1E3", border: "1px solid #DCE2D2", color: "#3F6B4D" }}
              >
                did:ethr:0x4a2fabcdef1234567890abcdef1234567890f91
              </div>
              <button
                onClick={() => onToast("DID copied to clipboard", "info")}
                className="px-3 py-2 rounded-lg text-xs border"
                style={{ borderColor: "#DCE2D2", color: "#6B7166", background: "#FAF9F1" }}
              >
                Copy
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7166" }}>Connected Wallet</label>
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-lg border"
              style={{ background: "#EEF1E3", borderColor: "#DCE2D2" }}
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ background: "#C99A4A" }}
              >
                M
              </span>
              <div>
                <div className="text-sm font-medium" style={{ color: "#20291F" }}>MetaMask</div>
                <div className="text-xs font-mono" style={{ color: "#6B7166" }}>0x4a2f…f91</div>
              </div>
              <span className="ml-auto flex items-center gap-1.5 text-xs" style={{ color: "#5C8A5C" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#5C8A5C" }} />
                Connected
              </span>
            </div>
          </div>

          <button
            onClick={() => onToast("Wallet disconnected", "warn")}
            className="text-xs px-4 py-2 rounded-lg border self-start"
            style={{ borderColor: "#B26B5744", color: "#B26B57", background: "#B26B5711" }}
          >
            Disconnect Wallet
          </button>
        </div>
      </Section>

      {/* Notifications */}
      <Section title="Notification Preferences">
        <div className="flex flex-col divide-y" style={{ '--tw-divide-opacity': 1 } as React.CSSProperties}>
          {[
            { key: "txnConfirmed", label: "Transaction Confirmed", desc: "Alert when a blockchain transaction you initiated is confirmed." },
            { key: "newIdentity", label: "New Identity Request", desc: "Notify me when someone requests a new DID under my organization." },
            { key: "accessRequest", label: "Access Request", desc: "Alert when a user requests elevated permissions." },
            { key: "systemAlerts", label: "System Alerts", desc: "Oracle sync issues, contract upgrades, and infrastructure alerts." },
          ].map(n => (
            <div key={n.key} className="flex items-center justify-between py-4 gap-4" style={{ borderColor: "#DCE2D2" }}>
              <div>
                <div className="text-sm font-medium" style={{ color: "#20291F" }}>{n.label}</div>
                <div className="text-xs mt-0.5" style={{ color: "#6B7166" }}>{n.desc}</div>
              </div>
              <div
                className={`toggle-track${notifs[n.key as keyof typeof notifs] ? " on" : ""}`}
                onClick={() => {
                  setNotifs(prev => ({ ...prev, [n.key]: !prev[n.key as keyof typeof notifs] }));
                  onToast("Notification preference saved", "success");
                }}
              >
                <div className="toggle-thumb" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Save */}
      <div className="flex gap-3">
        <button
          onClick={() => onToast("Settings saved — changes recorded on-chain ✓", "success")}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: "#3F6B4D", fontFamily: "Space Grotesk" }}
        >
          Save Changes
        </button>
        <button
          className="px-6 py-2.5 rounded-xl text-sm font-semibold border"
          style={{ borderColor: "#DCE2D2", color: "#6B7166", background: "#F1F4E8" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-6" style={{ background: "#F1F4E8", borderColor: "#DCE2D2" }}>
      <h3 className="text-sm font-semibold mb-5 pb-4 border-b" style={{ fontFamily: "Space Grotesk", color: "#20291F", borderColor: "#DCE2D2" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7166" }}>{label}</label>
      <div
        className="px-3 py-2 rounded-lg text-sm"
        style={{ background: "#EEF1E3", border: "1px solid #DCE2D2", color: "#20291F" }}
      >
        {value}
      </div>
    </div>
  );
}

function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-block ml-1.5">
      <span
        className="w-3.5 h-3.5 rounded-full inline-flex items-center justify-center text-xs cursor-help"
        style={{ background: "#DCE2D2", color: "#6B7166", fontSize: 9, fontWeight: 700 }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        i
      </span>
      {show && (
        <div
          className="absolute left-5 top-0 z-20 w-56 px-3 py-2 rounded-lg text-xs leading-relaxed shadow-lg border"
          style={{ background: "#FAF9F1", borderColor: "#DCE2D2", color: "#6B7166", fontWeight: 400 }}
        >
          {text}
        </div>
      )}
    </span>
  );
}
