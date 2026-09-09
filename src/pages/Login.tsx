import { useState } from "react";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<"wallet" | "email">("wallet");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  };

  return (
    <div className="min-h-full flex" style={{ background: "#FAF9F1" }}>
      {/* Left panel */}
      <div className="flex-1 flex flex-col justify-between p-10 md:p-14 max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold"
            style={{ background: "#3F6B4D", fontFamily: "Space Grotesk", fontSize: 18 }}
          >
            V
          </div>
          <span className="text-xl font-semibold" style={{ fontFamily: "Space Grotesk", color: "#20291F" }}>
            Veritas
          </span>
        </div>

        {/* Form */}
        <div>
          <h2 className="text-3xl font-bold mb-2 leading-tight" style={{ fontFamily: "Space Grotesk", color: "#20291F" }}>
            Secure sign-in
          </h2>
          <p className="text-sm mb-8" style={{ color: "#6B7166" }}>
            Your identity is self-sovereign. No passwords stored. No middlemen.
          </p>

          {/* Tab */}
          <div
            className="flex p-1 rounded-lg mb-6"
            style={{ background: "#F1F4E8", border: "1px solid #DCE2D2" }}
          >
            {(["wallet", "email"] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex-1 py-2 rounded-md text-sm font-medium"
                style={{
                  background: mode === m ? "#3F6B4D" : "transparent",
                  color: mode === m ? "white" : "#6B7166",
                  fontFamily: "Space Grotesk",
                }}
              >
                {m === "wallet" ? "Connect Wallet" : "Passwordless Email"}
              </button>
            ))}
          </div>

          {mode === "wallet" ? (
            <div className="flex flex-col gap-3">
              {[
                { name: "MetaMask", color: "#C99A4A", sub: "Browser extension" },
                { name: "WalletConnect", color: "#3F6B4D", sub: "QR or mobile" },
                { name: "Coinbase Wallet", color: "#5C8A5C", sub: "Self-custody" },
              ].map(w => (
                <button
                  key={w.name}
                  onClick={handleConnect}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl border text-left w-full"
                  style={{ background: "#F1F4E8", borderColor: "#DCE2D2" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: w.color, fontFamily: "Space Grotesk" }}
                  >
                    {w.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "#20291F" }}>{w.name}</div>
                    <div className="text-xs" style={{ color: "#6B7166" }}>{w.sub}</div>
                  </div>
                  <svg className="ml-auto" width="16" height="16" fill="none" stroke="#6B7166" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="you@organization.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="px-4 py-3 rounded-xl border text-sm outline-none"
                style={{ background: "#F1F4E8", borderColor: "#DCE2D2", color: "#20291F" }}
              />
              <button
                onClick={handleConnect}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: "#3F6B4D", fontFamily: "Space Grotesk" }}
              >
                {loading ? "Sending magic link…" : "Send magic link →"}
              </button>
            </div>
          )}

          {/* Steps */}
          <div className="mt-10 pt-8 border-t" style={{ borderColor: "#DCE2D2" }}>
            <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: "#6B7166" }}>How it works</p>
            <div className="flex flex-col gap-4">
              {[
                { n: "01", title: "Create Identity", desc: "Get a Decentralized Identifier (DID) tied to your wallet — no username required." },
                { n: "02", title: "Get Verified", desc: "An organization admin verifies your identity via smart contract attestation." },
                { n: "03", title: "Manage Assets", desc: "Mint, transfer, and trace NFT-based credentials and digital assets — all on-chain." },
              ].map(s => (
                <div key={s.n} className="flex gap-4 items-start">
                  <span
                    className="text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "#F1F4E8", color: "#3F6B4D", fontFamily: "Space Grotesk", border: "1px solid #DCE2D2" }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "#20291F" }}>{s.title}</div>
                    <div className="text-xs mt-0.5 leading-relaxed" style={{ color: "#6B7166" }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs" style={{ color: "#6B7166" }}>
          Protected by smart contracts on Ethereum Mainnet.{" "}
          <span style={{ color: "#3F6B4D", cursor: "pointer" }}>Privacy policy</span>
        </p>
      </div>

      {/* Right panel — illustration */}
      <div
        className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden"
        style={{ background: "#EEF1E3" }}
      >
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "linear-gradient(#DCE2D2 1px, transparent 1px), linear-gradient(90deg, #DCE2D2 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* 3D-style isometric illustration */}
        <div className="relative z-10 flex flex-col items-center">
          <IsometricShield />
          <div className="mt-8 text-center max-w-xs">
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "Space Grotesk", color: "#20291F" }}>
              Self-sovereign identity,<br />enterprise-grade security
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#6B7166" }}>
              Every action recorded immutably on-chain. Every identity cryptographically verified. Zero trust, full control.
            </p>
          </div>

          {/* Floating stat chips */}
          <div
            className="absolute -top-4 -right-12 px-3 py-2 rounded-xl shadow-md border"
            style={{ background: "#FAF9F1", borderColor: "#DCE2D2" }}
          >
            <div className="text-xs font-semibold" style={{ color: "#20291F" }}>4,821 DIDs</div>
            <div className="text-xs" style={{ color: "#5C8A5C" }}>verified on-chain</div>
          </div>
          <div
            className="absolute bottom-8 -left-14 px-3 py-2 rounded-xl shadow-md border"
            style={{ background: "#FAF9F1", borderColor: "#DCE2D2" }}
          >
            <div className="text-xs font-semibold" style={{ color: "#20291F" }}>12,309 NFTs</div>
            <div className="text-xs" style={{ color: "#7FAE83" }}>assets tracked</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IsometricShield() {
  return (
    <svg width="220" height="240" viewBox="0 0 220 240" fill="none">
      {/* Shadow */}
      <ellipse cx="110" cy="228" rx="70" ry="10" fill="#DCE2D2" />

      {/* Shield body */}
      <path
        d="M110 18 L185 50 L185 120 Q185 180 110 215 Q35 180 35 120 L35 50 Z"
        fill="#5C8A5C" opacity="0.15"
      />
      {/* Shield top face (isometric) */}
      <path
        d="M110 22 L182 52 L182 118 Q182 176 110 210 Q38 176 38 118 L38 52 Z"
        fill="#F1F4E8" stroke="#7FAE83" strokeWidth="2"
      />
      {/* Shield inner */}
      <path
        d="M110 46 L162 68 L162 118 Q162 158 110 186 Q58 158 58 118 L58 68 Z"
        fill="#EEF1E3" stroke="#DCE2D2" strokeWidth="1.5"
      />

      {/* Lock body */}
      <rect x="92" y="108" width="36" height="30" rx="5" fill="#3F6B4D" />
      {/* Lock shackle */}
      <path
        d="M99 108 L99 98 Q99 86 110 86 Q121 86 121 98 L121 108"
        stroke="#3F6B4D" strokeWidth="5" fill="none" strokeLinecap="round"
      />
      {/* Lock keyhole */}
      <circle cx="110" cy="121" r="4" fill="#FAF9F1" />
      <rect x="108" y="121" width="4" height="8" rx="1" fill="#FAF9F1" />

      {/* Floating key */}
      <g transform="translate(148, 65) rotate(-30)">
        <circle cx="8" cy="8" r="7" stroke="#C99A4A" strokeWidth="2.5" fill="none" />
        <rect x="14" y="6" width="18" height="4" rx="2" fill="#C99A4A" />
        <rect x="26" y="10" width="4" height="6" rx="1" fill="#C99A4A" />
        <rect x="20" y="10" width="3" height="5" rx="1" fill="#C99A4A" />
      </g>

      {/* Check badge */}
      <circle cx="160" cy="150" r="14" fill="#5C8A5C" />
      <path d="M153 150 L158 155 L167 144" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Dots */}
      <circle cx="60" cy="75" r="4" fill="#7FAE83" opacity="0.5" />
      <circle cx="165" cy="90" r="3" fill="#C99A4A" opacity="0.4" />
      <circle cx="52" cy="150" r="5" fill="#7FAE83" opacity="0.3" />
    </svg>
  );
}
