import type { EFPage } from "../../App";

const nav: { id: EFPage; label: string }[] = [
  { id: "overview",        label: "Overview" },
  { id: "mobility",        label: "Mobility" },
  { id: "stays",           label: "Stays" },
  { id: "recommendations", label: "AI Assistant" },
  { id: "event",           label: "Event" },
  { id: "analytics",       label: "Analytics" },
];

export default function NavBar({ page, onNav }: { page: EFPage; onNav: (p: EFPage) => void }) {
  return (
    <header
      className="shrink-0 border-b"
      style={{ background: "#F5F3EE", borderColor: "#D8D5CF" }}
    >
      <div className="flex items-center justify-between px-6 py-0 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 py-3.5 mr-8 shrink-0">
          <EventFlowLogo />
          <div>
            <div className="text-base font-bold leading-none tracking-tight" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>
              EVENTFLOW
            </div>
            <div className="text-xs leading-none mt-0.5" style={{ color: "#70756F" }}>Hospitality & Mobility</div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-1 flex-1">
          {nav.map(n => (
            <button
              key={n.id}
              onClick={() => onNav(n.id)}
              className="px-3.5 py-3 text-sm font-medium border-b-2 transition-colors"
              style={{
                borderColor: page === n.id ? "#53624F" : "transparent",
                color: page === n.id ? "#53624F" : "#70756F",
              }}
            >
              {n.label}
            </button>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Live badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs"
            style={{ background: "#EEF2F2", borderColor: "#315C5B22", color: "#315C5B" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4F7A52" }} />
            LIVE · NCF 2026
          </div>
          {/* Bell */}
          <button className="relative w-8 h-8 rounded-xl flex items-center justify-center border"
            style={{ background: "#EEECEA", borderColor: "#D8D5CF" }}>
            <svg width="15" height="15" fill="none" stroke="#70756F" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style={{ background: "#A05544" }} />
          </button>
          {/* Avatar */}
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-semibold"
            style={{ background: "#53624F", fontFamily: "Space Grotesk" }}>
            OC
          </div>
        </div>
      </div>
    </header>
  );
}

function EventFlowLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#53624F" />
      {/* Grid lines */}
      <line x1="8" y1="12" x2="24" y2="12" stroke="#7FAE83" strokeWidth="0.7" strokeOpacity="0.5" />
      <line x1="8" y1="16" x2="24" y2="16" stroke="#7FAE83" strokeWidth="0.7" strokeOpacity="0.5" />
      <line x1="8" y1="20" x2="24" y2="20" stroke="#7FAE83" strokeWidth="0.7" strokeOpacity="0.5" />
      <line x1="12" y1="8" x2="12" y2="24" stroke="#7FAE83" strokeWidth="0.7" strokeOpacity="0.5" />
      <line x1="16" y1="8" x2="16" y2="24" stroke="#7FAE83" strokeWidth="0.7" strokeOpacity="0.5" />
      <line x1="20" y1="8" x2="20" y2="24" stroke="#7FAE83" strokeWidth="0.7" strokeOpacity="0.5" />
      {/* Route */}
      <path d="M10 22 L14 16 L18 18 L22 11" stroke="#C89B55" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Pin */}
      <circle cx="22" cy="11" r="2.5" fill="white" />
      <circle cx="22" cy="11" r="1.2" fill="#C89B55" />
    </svg>
  );
}
