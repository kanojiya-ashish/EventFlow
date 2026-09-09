import { useState } from "react";
import type { EFPage, ToastMsg } from "../../App";
import CityMap from "./CityMap";

// Aerial city — map background
// Stadium — event banner
const STADIUM = "https://images.unsplash.com/photo-1556816214-6d16c62fbbf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80";
// Aerial crowd
const CROWD_AERIAL = "https://images.unsplash.com/photo-1539657523674-fbd149b04c13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700&q=80";

type Marker = { id: string; type: "bus" | "hotel" | "hotspot" | "venue"; x: number; y: number; label: string; detail: string; severity?: "ok" | "warn" | "critical" }

const markers: Marker[] = [
  { id: "venue-a", type: "venue",   x: 50,  y: 42, label: "Cricket Stadium",       detail: "Main cricket venue · Cap. 45,000" },
  { id: "venue-b", type: "venue",   x: 28,  y: 65, label: "Fan Zone",  detail: "Fan zone venue · Cap. 12,000" },
  { id: "bus-1",   type: "bus",     x: 38,  y: 55, label: "Bus B-24",         detail: "Enroute: Gate B → Central Stop · 32 seats" },
  { id: "bus-2",   type: "bus",     x: 62,  y: 70, label: "Bus B-18",         detail: "Enroute: East Stay → Main Arena · 28 seats" },
  { id: "bus-3",   type: "bus",     x: 72,  y: 35, label: "Bus B-07",         detail: "Idle: East Connector Stop · 44 seats" },
  { id: "hotel-1", type: "hotel",   x: 22,  y: 45, label: "City Central",     detail: "Occupancy 98% · 6 rooms left" },
  { id: "hotel-2", type: "hotel",   x: 74,  y: 58, label: "Lakeview Stay",    detail: "Occupancy 62% · 84 rooms" },
  { id: "hotel-3", type: "hotel",   x: 45,  y: 78, label: "East Stay Zone",   detail: "Occupancy 44% · 120 rooms" },
  { id: "hot-1",   type: "hotspot", x: 52,  y: 48, label: "Gate B Hotspot",   detail: "8,420 crowd · +18% / 15 min", severity: "critical" },
  { id: "hot-2",   type: "hotspot", x: 30,  y: 70, label: "Cultural Square",  detail: "4,100 crowd · +6% / 15 min", severity: "warn" },
];

export default function Dashboard({ onToast, onNav }: { onToast: (t: string, type?: ToastMsg["type"]) => void; onNav: (p: EFPage) => void }) {
  const [active, setActive] = useState<Marker | null>(null);

  return (
    <div className="max-w-screen-2xl mx-auto p-6 flex flex-col gap-6">
      {/* Event banner */}
      <div className="relative rounded-3xl overflow-hidden photo-hero" style={{ height: 180 }}>
        <img src={STADIUM} alt="Event stadium" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(26,30,26,0.85) 0%, rgba(26,30,26,0.4) 60%, rgba(26,30,26,0.15) 100%)" }} />
        <div className="relative z-10 flex items-center justify-between h-full px-8 photo-text">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4F7A52" }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#F5F3EE", opacity: 0.92 }}>Live Event</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight" style={{ fontFamily: "Space Grotesk", color: "#F5F3EE", textShadow: "0 2px 10px rgba(0,0,0,.55)" }}>
              National Cricket Tournament 2026
            </h2>
            <p className="text-sm mt-1" style={{ color: "#F5F3EE", opacity: 0.86, textShadow: "0 1px 8px rgba(0,0,0,.55)" }}>Match Day 3 · Main Cricket Stadium · Est. 84,000 visitors</p>
          </div>
          <div className="flex gap-4">
            {[
              { label: "Visitors Today", value: "84,219", ok: true },
              { label: "Crowd Hotspots", value: "2", ok: false },
              { label: "Overall Capacity", value: "76%", ok: true },
            ].map(s => (
              <div key={s.label}
                className="px-5 py-3 rounded-2xl text-center"
                style={{ background: "rgba(245,243,238,0.12)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
                <div className="text-2xl font-bold" style={{ fontFamily: "Space Grotesk", color: s.ok ? "#F5F3EE" : "#E2B96D", textShadow: "0 2px 8px rgba(0,0,0,.5)" }}>
                  {s.value}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#F5F3EE", opacity: 0.78 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Active Buses",       value: "312",   delta: "18 rerouting", color: "#315C5B" },
          { label: "Available Rooms",    value: "1,824", delta: "Central zone critical", color: "#C89B55" },
          { label: "Avg Travel Time",    value: "14 min",delta: "−2 min vs peak", color: "#53624F" },
          { label: "Buses Dispatched",   value: "47",    delta: "This session", color: "#4F7A52" },
          { label: "AI Alerts",          value: "3",     delta: "2 require action", color: "#A05544" },
        ].map(k => (
          <div key={k.label} className="p-4 rounded-2xl border" style={{ background: "#EEECEA", borderColor: "#D8D5CF" }}>
            <div className="text-xs font-medium mb-3" style={{ color: "#70756F" }}>{k.label}</div>
            <div className="text-2xl font-bold" style={{ fontFamily: "Space Grotesk", color: k.color }}>{k.value}</div>
            <div className="text-xs mt-1" style={{ color: "#70756F" }}>{k.delta}</div>
          </div>
        ))}
      </div>

      {/* Map + sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Live city map */}
        <div className="md:col-span-2 rounded-3xl overflow-hidden border relative" style={{ height: 460, borderColor: "#D8D5CF" }}>
          <CityMap markers={markers} activeId={active?.id} onSelect={setActive}>
          {/* Map label */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(26,30,26,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4F7A52" }} />
            <span className="text-xs font-medium" style={{ color: "#F5F3EE" }}>Live City Map</span>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1.5 px-3 py-2.5 rounded-2xl"
            style={{ background: "rgba(26,30,26,0.65)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            {[
              { color: "#C89B55", icon: "⬡", label: "Venue" },
              { color: "#4F7A52", icon: "→", label: "Bus" },
              { color: "#315C5B", icon: "◆", label: "Hotel" },
              { color: "#A05544", icon: "⚠", label: "Hotspot" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <span className="text-xs" style={{ color: l.color }}>{l.icon}</span>
                <span className="text-xs" style={{ color: "#F5F3EE", opacity: 0.82 }}>{l.label}</span>
              </div>
            ))}
          </div>

          {/* Popup */}
          {active && (
            <div
              className="absolute z-30 min-w-44 px-4 py-3 rounded-2xl border shadow-2xl"
              style={{
                left: `${Math.min(active.x + 4, 62)}%`,
                top: `${Math.max(active.y - 18, 5)}%`,
                background: "rgba(245,243,238,0.97)",
                borderColor: "#D8D5CF",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center justify-between gap-4 mb-1">
                <span className="text-sm font-semibold" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>{active.label}</span>
                <button onClick={() => setActive(null)} style={{ color: "#70756F" }}>×</button>
              </div>
              <p className="text-xs" style={{ color: "#70756F" }}>{active.detail}</p>
              {active.type === "hotspot" && (
                <button
                  onClick={() => { setActive(null); onNav("mobility"); onToast("Opening Mobility screen — hotspot selected", "warn"); }}
                  className="mt-2 text-xs font-semibold px-3 py-1.5 rounded-lg w-full"
                  style={{ background: "#53624F", color: "white" }}
                >
                  View AI Response →
                </button>
              )}
            </div>
          )}
          </CityMap>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Crowd aerial inset */}
          <div className="rounded-3xl overflow-hidden relative border" style={{ height: 160, borderColor: "#D8D5CF" }}>
            <img src={CROWD_AERIAL} alt="Aerial view of crowd" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,30,26,0.8) 0%, rgba(26,30,26,0.15) 70%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
              <div className="text-xs font-semibold mb-1" style={{ color: "#F5F3EE", opacity: 0.9 }}>Crowd Density Zones</div>
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: "Gate B", color: "#A05544" },
                  { label: "North Exit", color: "#C89B55" },
                  { label: "East Zone", color: "#4F7A52" },
                ].map(z => (
                  <span key={z.label} className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ background: z.color + "BB" }}>
                    {z.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI alerts */}
          <div className="flex-1 rounded-3xl border p-5" style={{ background: "#EEECEA", borderColor: "#D8D5CF" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-sm" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>AI Alerts</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#A0554422", color: "#A05544" }}>3 active</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { msg: "Gate B approaching critical density in ~22 min", level: "critical", action: "mobility" as EFPage },
                { msg: "Central hotel zone 92% occupied", level: "warn", action: "stays" as EFPage },
                { msg: "12 buses available near East Zone — ready to deploy", level: "ok", action: "mobility" as EFPage },
              ].map((a, i) => (
                <button
                  key={i}
                  onClick={() => { onNav(a.action); onToast(a.msg, a.level === "ok" ? "success" : a.level === "warn" ? "warn" : "warn"); }}
                  className="flex items-start gap-3 text-left p-3 rounded-xl border"
                  style={{ background: "#F5F3EE", borderColor: a.level === "critical" ? "#A0554444" : "#D8D5CF" }}
                >
                  <span className="w-2 h-2 rounded-full mt-1 shrink-0" style={{
                    background: a.level === "critical" ? "#A05544" : a.level === "warn" ? "#C89B55" : "#4F7A52"
                  }} />
                  <span className="text-xs leading-relaxed" style={{ color: "#202421" }}>{a.msg}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarkerIcon({ type, severity, active }: { type: Marker["type"]; severity?: string; active: boolean }) {
  const colors: Record<string, string> = {
    bus:     "#4F7A52",
    hotel:   "#315C5B",
    venue:   "#C89B55",
    hotspot: severity === "critical" ? "#A05544" : "#C89B55",
  };
  const color = colors[type];
  const pulse = type === "hotspot";

  return (
    <div className="relative flex items-center justify-center">
      {pulse && (
        <div className="absolute w-8 h-8 rounded-full animate-ping opacity-40" style={{ background: color }} />
      )}
      <div
        className="relative flex items-center justify-center rounded-full text-white shadow-lg"
        style={{
          width: active ? 32 : 26,
          height: active ? 32 : 26,
          background: color,
          border: active ? "2px solid white" : "1.5px solid rgba(255,255,255,0.5)",
          fontSize: active ? 13 : 11,
          transition: "all 150ms",
        }}
      >
        {type === "bus" ? "⬡" : type === "hotel" ? "◆" : type === "venue" ? "★" : "⚠"}
      </div>
    </div>
  );
}
