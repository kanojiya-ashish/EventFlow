import { useState } from "react";

// Aerial city night — the commanding view that sets the platform's tone
const CITY_NIGHT = "https://images.unsplash.com/photo-1712152981882-3c2cbc59a09d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600&q=85";
// Aerial road intersection — abstract city grid feel
const CITY_GRID = "https://images.unsplash.com/photo-1578913020856-1c5ded2ce3e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [role, setRole] = useState<"organizer" | "partner" | "attendee" | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (r: "organizer" | "partner" | "attendee") => {
    setRole(r);
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1100);
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#1A1E1A" }}>
      {/* Left: form panel */}
      <div
        className="flex flex-col justify-between w-full max-w-md shrink-0 p-10 md:p-14 relative z-10"
        style={{ background: "#F5F3EE" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#53624F" />
            <line x1="8" y1="12" x2="24" y2="12" stroke="white" strokeWidth="0.6" strokeOpacity="0.3" />
            <line x1="8" y1="16" x2="24" y2="16" stroke="white" strokeWidth="0.6" strokeOpacity="0.3" />
            <line x1="8" y1="20" x2="24" y2="20" stroke="white" strokeWidth="0.6" strokeOpacity="0.3" />
            <line x1="12" y1="8" x2="12" y2="24" stroke="white" strokeWidth="0.6" strokeOpacity="0.3" />
            <line x1="16" y1="8" x2="16" y2="24" stroke="white" strokeWidth="0.6" strokeOpacity="0.3" />
            <line x1="20" y1="8" x2="20" y2="24" stroke="white" strokeWidth="0.6" strokeOpacity="0.3" />
            <path d="M10 22 L14 16 L18 18 L22 11" stroke="#C89B55" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="22" cy="11" r="2.5" fill="white" /><circle cx="22" cy="11" r="1.2" fill="#C89B55" />
          </svg>
          <div>
            <div className="font-bold tracking-tight text-base leading-none" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>
              EVENTFLOW
            </div>
            <div className="text-xs mt-0.5" style={{ color: "#70756F" }}>Intelligent Hospitality & Mobility Orchestration</div>
          </div>
        </div>

        {/* Hero text */}
        <div className="flex-1 flex flex-col justify-center py-10">
          <h1
            className="text-4xl font-bold leading-tight mb-4"
            style={{ fontFamily: "Space Grotesk", color: "#202421", letterSpacing: "-0.02em" }}
          >
            Move people.<br />Balance demand.<br />Keep events flowing.
          </h1>
          <p className="text-sm leading-relaxed mb-10" style={{ color: "#70756F", maxWidth: 340 }}>
            An intelligent platform for coordinating accommodation, transportation and visitor movement during mega-events.
          </p>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#70756F" }}>
              Sign in as
            </p>
            {[
              { id: "organizer" as const, label: "Event Organizer", sub: "Full command center access", icon: "◈" },
              { id: "partner" as const, label: "Hospitality Partner", sub: "Manage stays & capacity", icon: "◆" },
              { id: "attendee" as const, label: "Attendee", sub: "Find routes, stays & events", icon: "→" },
            ].map(r => (
              <button
                key={r.id}
                onClick={() => handleLogin(r.id)}
                disabled={loading}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all"
                style={{
                  background: role === r.id && loading ? "#53624F" : "#EEECEA",
                  borderColor: role === r.id && loading ? "#53624F" : "#D8D5CF",
                  color: role === r.id && loading ? "white" : "#202421",
                }}
              >
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                  style={{
                    background: role === r.id && loading ? "rgba(255,255,255,0.2)" : "#F5F3EE",
                    color: role === r.id && loading ? "white" : "#53624F",
                  }}
                >
                  {r.icon}
                </span>
                <div>
                  <div className="font-semibold text-sm" style={{ fontFamily: "Space Grotesk" }}>{r.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: role === r.id && loading ? "rgba(255,255,255,0.7)" : "#70756F" }}>{r.sub}</div>
                </div>
                {role === r.id && loading ? (
                  <span className="ml-auto text-xs opacity-70">Opening…</span>
                ) : (
                  <svg className="ml-auto" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Aerial grid inset photo */}
          <div className="mt-10 rounded-2xl overflow-hidden relative" style={{ height: 140, border: "1px solid #D8D5CF" }}>
            <img
              src={CITY_GRID}
              alt="Aerial city road intersection"
              className="w-full h-full object-cover"
              style={{ filter: "saturate(0.7) brightness(0.9)" }}
            />
            <div className="absolute inset-0 flex items-end p-3"
              style={{ background: "linear-gradient(to top, rgba(26,30,26,0.7) 0%, transparent 60%)" }}>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#C89B55" }} />
                <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
                  National Cricket Tournament 2026 · Live monitoring active
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs" style={{ color: "#70756F" }}>
          Operated under ISO 31000 risk management standards.
        </p>
      </div>

      {/* Right: full-bleed aerial city night photo */}
      <div className="flex-1 relative hidden md:block photo-hero">
        <img
          src={CITY_NIGHT}
          alt="Aerial view of city at night"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(26,30,26,0.3) 0%, rgba(49,92,91,0.25) 50%, rgba(26,30,26,0.5) 100%)" }}
        />
        {/* Floating stats */}
        <div className="absolute inset-0 flex flex-col justify-end p-12 photo-text">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 self-start"
            style={{ background: "rgba(245,243,238,0.15)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#C89B55" }} />
            <span className="text-xs font-medium text-white">Live city intelligence</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "Space Grotesk", letterSpacing: "-0.02em" }}>
            Every movement,<br />every visitor,<br />in real time.
          </h2>
          <p className="text-sm text-white opacity-70 max-w-xs leading-relaxed">
            EventFlow monitors crowd density, transport availability and accommodation capacity simultaneously — so operators act before issues become critical.
          </p>

          {/* Stats row */}
          <div className="flex gap-6 mt-10">
            {[
              { label: "Visitors tracked", value: "84,219" },
              { label: "Active buses", value: "312" },
              { label: "Hotel rooms monitored", value: "9,440" },
            ].map(s => (
              <div key={s.label}
                className="px-4 py-3 rounded-2xl"
                style={{ background: "rgba(245,243,238,0.12)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
                <div className="text-2xl font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>{s.value}</div>
                <div className="text-xs mt-0.5 text-white opacity-60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
