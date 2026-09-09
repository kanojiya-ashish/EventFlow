const STADIUM_WIDE = "https://images.unsplash.com/photo-1665413813194-3b80d79b6421?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80";

const stages = [
  { time: "10:00 AM", label: "Opening Ceremony",  crowd: 55, status: "done",    desc: "Official opening, national anthem, welcome address" },
  { time: "12:30 PM", label: "Visitor Peak",       crowd: 92, status: "done",    desc: "Maximum visitor arrival — transport pressure period" },
  { time: "03:00 PM", label: "Main Performance",   crowd: 88, status: "active",  desc: "Main arena show — all sectors at capacity" },
  { time: "04:30 PM", label: "Cultural Exhibition",crowd: 70, status: "upcoming",desc: "Cultural center events, food zones open" },
  { time: "05:30 PM", label: "Exit Wave 1",        crowd: 65, status: "upcoming",desc: "First dispersal, north and east gates" },
  { time: "07:00 PM", label: "Closing Performance",crowd: 78, status: "upcoming",desc: "Final event — expect second peak on exits" },
  { time: "08:30 PM", label: "Event End",          crowd: 40, status: "upcoming",desc: "Full dispersal begins — all transport on standby" },
];

const crowdColor = (c: number) => c >= 85 ? "#A05544" : c >= 65 ? "#C89B55" : "#4F7A52";
const crowdLabel = (c: number) => c >= 85 ? "Critical" : c >= 65 ? "High" : "Moderate";

export default function EventTimeline() {
  return (
    <div className="max-w-screen-xl mx-auto p-6 flex flex-col gap-6">
      {/* Stadium photo header */}
      <div className="relative rounded-3xl overflow-hidden photo-hero" style={{ height: 220 }}>
        <img src={STADIUM_WIDE} alt="Stadium filled with people" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,30,26,0.2) 0%, rgba(26,30,26,0.75) 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-end p-8 z-10 photo-text">
          <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#F5F3EE", opacity: 0.9, textShadow: "0 2px 8px rgba(0,0,0,.65)" }}>Event Intelligence</div>
          <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "Space Grotesk", color: "#F5F3EE", textShadow: "0 2px 10px rgba(0,0,0,.7)" }}>
            National Cricket Tournament 2026 — Day 3
          </h2>
          <p className="text-sm" style={{ color: "#F5F3EE", opacity: 0.86, textShadow: "0 1px 8px rgba(0,0,0,.65)" }}>Live schedule with crowd forecasting · Main Arena & Cultural Center</p>
          <div className="flex gap-4 mt-4">
            {[
              { label: "Current Stage", value: "Main Performance" },
              { label: "Est. Visitors", value: "84,219" },
              { label: "Peak in", value: "Past" },
            ].map(s => (
              <div key={s.label}
                className="px-4 py-2.5 rounded-xl"
                style={{ background: "rgba(245,243,238,0.12)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
                <div className="text-xs" style={{ color: "#F5F3EE", opacity: 0.78 }}>{s.label}</div>
                <div className="font-bold text-sm mt-0.5" style={{ fontFamily: "Space Grotesk", color: "#F5F3EE", textShadow: "0 1px 6px rgba(0,0,0,.55)" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Main timeline */}
        <div className="md:col-span-2 flex flex-col gap-3">
          {stages.map((s, i) => {
            const isActive = s.status === "active";
            const isDone = s.status === "done";
            const col = crowdColor(s.crowd);
            return (
              <div
                key={i}
                className="flex gap-5 p-5 rounded-3xl border"
                style={{
                  background: isActive ? "#EEF2F0" : "#EEECEA",
                  borderColor: isActive ? "#53624F" : "#D8D5CF",
                }}
              >
                {/* Timeline indicator */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-bold"
                    style={{
                      background: isActive ? "#53624F" : isDone ? "#4F7A5222" : "#F5F3EE",
                      color: isActive ? "white" : isDone ? "#4F7A52" : "#70756F",
                      border: isDone ? "1px solid #4F7A5244" : "1px solid #D8D5CF",
                    }}
                  >
                    {isDone ? "✓" : isActive ? "▶" : i + 1}
                  </div>
                  {i < stages.length - 1 && (
                    <div className="w-px flex-1 my-1" style={{ background: isDone ? "#4F7A5244" : "#D8D5CF", minHeight: 16 }} />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <div className="text-xs font-mono mb-0.5" style={{ color: "#70756F" }}>{s.time}</div>
                      <div className="font-bold text-sm" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>{s.label}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: col + "22", color: col }}>
                        {crowdLabel(s.crowd)}
                      </span>
                      {isActive && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: "#53624F22", color: "#53624F" }}>
                          <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: "#53624F" }} />
                          Live
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs mb-3" style={{ color: "#70756F" }}>{s.desc}</p>

                  {/* Crowd bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#D8D5CF" }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${s.crowd}%`, background: col }} />
                    </div>
                    <span className="text-xs font-mono shrink-0" style={{ color: col }}>{s.crowd}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Crowd forecast sidebar */}
        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border p-5" style={{ background: "#EEECEA", borderColor: "#D8D5CF" }}>
            <div className="font-semibold text-sm mb-4" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>Crowd Forecast</div>
            {stages.map((s, i) => (
              <div key={i} className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono w-16 shrink-0" style={{ color: "#70756F" }}>{s.time.split(" ")[0]}</span>
                <div className="flex-1 h-4 rounded-lg overflow-hidden" style={{ background: "#D8D5CF" }}>
                  <div className="h-full rounded-lg" style={{ width: `${s.crowd}%`, background: crowdColor(s.crowd), opacity: s.status === "upcoming" ? 0.5 : 1 }} />
                </div>
                <span className="text-xs w-6 shrink-0 text-right font-mono" style={{ color: crowdColor(s.crowd) }}>{s.crowd}</span>
              </div>
            ))}
            <p className="text-xs mt-3 italic" style={{ color: "#70756F" }}>
              Upcoming stages show AI-predicted crowd levels based on historical festival data.
            </p>
          </div>

          <div className="rounded-3xl border p-5" style={{ background: "#EEECEA", borderColor: "#D8D5CF" }}>
            <div className="font-semibold text-sm mb-3" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>Transport Readiness</div>
            {[
              { stage: "Exit Wave 1 (17:30)", buses: 48, ready: true },
              { stage: "Closing Show (19:00)", buses: 62, ready: false },
              { stage: "Event End (20:30)", buses: 80, ready: false },
            ].map(t => (
              <div key={t.stage} className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: "#D8D5CF" }}>
                <div>
                  <div className="text-xs font-medium" style={{ color: "#202421" }}>{t.stage}</div>
                  <div className="text-xs" style={{ color: "#70756F" }}>{t.buses} buses needed</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ background: t.ready ? "#4F7A5222" : "#C89B5522", color: t.ready ? "#4F7A52" : "#C89B55" }}>
                  {t.ready ? "Ready" : "Plan needed"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
