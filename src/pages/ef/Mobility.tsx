import { useState } from "react";
import type { ToastMsg } from "../../App";
import CityMap from "./CityMap";

const BUS_PHOTO = "https://images.unsplash.com/photo-1632276536839-84cad7fd03b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80";

type Bus = { id: string; label: string; seats: number; dist: string; eta: string; status: "available" | "rerouting" | "idle" }

const initialBuses: Bus[] = [
  { id: "b24", label: "Bus B-24", seats: 32, dist: "1.8 km", eta: "6 min",  status: "available" },
  { id: "b07", label: "Bus B-07", seats: 44, dist: "3.2 km", eta: "11 min", status: "available" },
  { id: "b18", label: "Bus B-18", seats: 28, dist: "4.1 km", eta: "14 min", status: "available" },
  { id: "b31", label: "Bus B-31", seats: 18, dist: "5.0 km", eta: "17 min", status: "idle" },
];

const activity = [
  { time: "14:18", msg: "Bus B-12 rerouted to Gate A — arrived 14:31" },
  { time: "13:55", msg: "Bus B-05 deployed — East Zone to Arena North" },
  { time: "13:42", msg: "Hotspot cleared: South Gate dispersed" },
  { time: "13:20", msg: "Bus B-09 rerouted to Cultural Center — 40 boarded" },
];

export default function Mobility({ onToast }: { onToast: (t: string, type?: ToastMsg["type"]) => void }) {
  const [buses, setBuses] = useState(initialBuses);
  const [approved, setApproved] = useState<string | null>(null);
  const [crowdLevel, setCrowdLevel] = useState(8420);
  const [simulating, setSimulating] = useState(false);

  const simulate = () => {
    setSimulating(true);
    setCrowdLevel(c => c + 1240);
    setTimeout(() => setSimulating(false), 800);
    onToast("Crowd surge detected at Gate B — AI generating recommendation", "warn");
  };

  const approveReroute = (busId: string) => {
    setBuses(b => b.map(bus => bus.id === busId ? { ...bus, status: "rerouting" } : bus));
    setApproved(busId);
    onToast("Bus B-24 rerouted — ETA 6 min · Status updated on-map", "success");
  };

  const severity = crowdLevel > 9000 ? "critical" : crowdLevel > 7000 ? "warn" : "ok";
  const sevColor = severity === "critical" ? "#A05544" : severity === "warn" ? "#C89B55" : "#4F7A52";

  return (
    <div className="max-w-screen-2xl mx-auto p-6 flex flex-col gap-6">
      {/* Header photo strip */}
      <div className="relative rounded-3xl overflow-hidden photo-hero" style={{ height: 140 }}>
        <img src={BUS_PHOTO} alt="Modern transit bus" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(26,30,26,0.85) 0%, rgba(26,30,26,0.2) 70%)" }} />
        <div className="relative z-10 flex items-center justify-between h-full px-8">
          <div className="photo-text">
            <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#F5F3EE", opacity: 0.92, textShadow: "0 2px 8px rgba(0,0,0,.6)" }}>Mobility Command</div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "Space Grotesk", color: "#F5F3EE", textShadow: "0 2px 10px rgba(0,0,0,.65)" }}>Smart Bus Redistribution</h2>
            <p className="text-sm mt-1" style={{ color: "#F5F3EE", opacity: 0.86, textShadow: "0 1px 8px rgba(0,0,0,.6)" }}>AI-powered crowd detection and dynamic bus rerouting</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={simulate}
              disabled={simulating}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold border"
              style={{ background: "rgba(26,30,26,.55)", borderColor: "#E2B96D", color: "#E2B96D", backdropFilter: "blur(8px)" }}
            >
              {simulating ? "Simulating…" : "⚡ Simulate Crowd Surge"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        {/* Map + operations: no empty column below the map */}
        <div className="md:col-span-2 mobility-left-stack">
        {/* Map panel */}
        <div className="rounded-3xl overflow-hidden relative border mobility-map-surface" style={{ height: 420, minHeight: 420, borderColor: "#D8D5CF", background: "#E8E5DC" }}>
          <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-xs text-white font-medium"
            style={{ background: "rgba(26,30,26,0.65)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)" }}>
            Live Bus & Hotspot Map
          </div>

          <CityMap
            markers={[
              { id: "b24", type: "bus", x: 38, y: 55, label: "B-24", detail: "32 seats · 1.8 km · 6 min" },
              { id: "b07", type: "bus", x: 72, y: 35, label: "B-07", detail: "44 seats · 3.2 km · 11 min" },
              { id: "b18", type: "bus", x: 62, y: 70, label: "B-18", detail: "28 seats · 4.1 km · 14 min" },
              { id: "gate-b", type: "hotspot", x: 52, y: 48, label: "Gate B", detail: `${crowdLevel.toLocaleString()} crowd`, severity: severity === "critical" ? "critical" : "warn" },
              { id: "stadium", type: "venue", x: 50, y: 42, label: "Cricket Stadium", detail: "Main venue · 45,000 capacity" },
            ]}
            activeId={approved ? "b24" : undefined}
            onSelect={(m) => { if (m.type === "bus") onToast(`${m.label} selected · ${m.detail}`, "info"); }}
            reroute={!!approved}
          >
            <div className="absolute top-4 left-4 z-30 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,.94)", color: "#202421", border: "1px solid #D8D5CF" }}>
              Live 2D Bus & Crowd Map
            </div>
            {/* Compact route-control overlay keeps the map area useful even while live layers load. */}
            <div className="mobility-route-card">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="route-title">B-24 · Central Stop → Gate B</div>
                  <div className="route-sub">Live 2D route · AI reroute ready</div>
                </div>
                <span className="px-2 py-1 rounded-full text-[10px] font-semibold" style={{ background: "#4F7A5233", color: "#B9D1B9" }}>● LIVE</span>
              </div>
              <div className="grid grid-cols-4 gap-3 mt-3">
                <div><div className="route-label">Distance</div><div className="route-stat">1.8 km</div></div>
                <div><div className="route-label">ETA</div><div className="route-stat">6 min</div></div>
                <div><div className="route-label">Seats</div><div className="route-stat">32</div></div>
                <div><div className="route-label">Crowd</div><div className="route-stat">{crowdLevel.toLocaleString()}</div></div>
              </div>
            </div>
            <div className="absolute right-4 top-4 z-30 w-56 rounded-2xl border p-4 shadow-lg" style={{ background: "rgba(245,243,238,.94)", borderColor: "#D8D5CF", backdropFilter: "blur(10px)" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>Live Route Control</span>
                <span className="text-[10px] font-semibold" style={{ color: "#4F7A52" }}>● LIVE</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl p-2" style={{ background: "#F5F3EE" }}><div className="font-bold text-sm" style={{ color: "#202421" }}>24</div><div className="text-[9px]" style={{ color: "#70756F" }}>Routes</div></div>
                <div className="rounded-xl p-2" style={{ background: "#F5F3EE" }}><div className="font-bold text-sm" style={{ color: "#C89B55" }}>3</div><div className="text-[9px]" style={{ color: "#70756F" }}>Rerouting</div></div>
                <div className="rounded-xl p-2" style={{ background: "#F5F3EE" }}><div className="font-bold text-sm" style={{ color: "#202421" }}>9m</div><div className="text-[9px]" style={{ color: "#70756F" }}>Avg ETA</div></div>
              </div>
              <div className="mt-3 pt-3 border-t" style={{ borderColor: "#D8D5CF" }}>
                <div className="text-[10px] uppercase tracking-wider" style={{ color: "#70756F" }}>Current action</div>
                <div className="text-xs font-semibold mt-1" style={{ color: "#202421" }}>{approved ? "B-24 → Gate B · Rerouting" : "Monitoring Gate B crowd surge"}</div>
              </div>
            </div>
          </CityMap>
        </div>

        {/* Operations panel fills the space directly below the 2D map. */}
        <div className="mobility-ops-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold text-sm" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>Route Operations</div>
              <div className="text-xs mt-0.5" style={{ color: "#70756F" }}>Live capacity and dispatch controls</div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold" style={{ background: "#4F7A5218", color: "#4F7A52" }}>● LIVE</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              ["312", "Active buses"], ["47", "Dispatched"], ["18", "Rerouting"], ["14 min", "Avg travel"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl p-3" style={{ background: "#F5F3EE", border: "1px solid #D8D5CF" }}>
                <div className="text-xl font-bold" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>{value}</div>
                <div className="text-[10px] mt-1" style={{ color: "#70756F" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Hotspot panel */}
        <div className="flex flex-col gap-4">
          {/* Hotspot card */}
          <div className="rounded-3xl border p-5" style={{ background: "#EEECEA", borderColor: sevColor + "44" }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: sevColor }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: sevColor }}>
                {severity === "critical" ? "Critical Hotspot" : severity === "warn" ? "Rising Density" : "Normal"}
              </span>
            </div>
            <div className="font-bold text-lg mb-1" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>Central Stadium Gate</div>
            <div className="text-3xl font-bold mb-1" style={{ fontFamily: "Space Grotesk", color: sevColor }}>
              {crowdLevel.toLocaleString()}
            </div>
            <div className="text-xs mb-4" style={{ color: "#70756F" }}>crowd · +18% per 15 min</div>

            {/* Crowd bar */}
            <div className="h-2 rounded-full overflow-hidden mb-5" style={{ background: "#D8D5CF" }}>
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.min((crowdLevel / 12000) * 100, 100)}%`, background: sevColor }} />
            </div>

            {/* AI Recommendation */}
            <div className="p-4 rounded-2xl mb-4" style={{ background: "#F5F3EE", border: "1px solid #D8D5CF" }}>
              <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#70756F" }}>
                AI Recommendation
              </div>
              <div className="font-bold text-sm mb-1" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>
                Redirect Bus B-24
              </div>
              <div className="text-xs space-y-1" style={{ color: "#70756F" }}>
                <div className="flex justify-between"><span>Distance</span><span className="font-medium" style={{ color: "#202421" }}>1.8 km</span></div>
                <div className="flex justify-between"><span>Available seats</span><span className="font-medium" style={{ color: "#202421" }}>32</span></div>
                <div className="flex justify-between"><span>Est. arrival</span><span className="font-medium" style={{ color: "#202421" }}>6 min</span></div>
              </div>
            </div>

            {approved ? (
              <div className="text-center py-3 rounded-2xl" style={{ background: "#4F7A5222", border: "1px solid #4F7A5244" }}>
                <div className="text-sm font-semibold" style={{ color: "#4F7A52" }}>✓ Reroute Approved</div>
                <div className="text-xs mt-0.5" style={{ color: "#70756F" }}>B-24 status: Rerouting</div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => approveReroute("b24")}
                  className="w-full py-3 rounded-2xl font-semibold text-sm text-white"
                  style={{ background: "#53624F", fontFamily: "Space Grotesk" }}
                >
                  Approve Reroute
                </button>
                <button
                  onClick={() => onToast("Showing 3 alternative buses nearby", "info")}
                  className="w-full py-2.5 rounded-2xl text-sm font-medium border"
                  style={{ borderColor: "#D8D5CF", color: "#70756F", background: "#F5F3EE" }}
                >
                  View Alternatives
                </button>
              </div>
            )}
          </div>

          {/* Route impact */}
          <div className="rounded-3xl border p-5" style={{ background: "#EEECEA", borderColor: "#D8D5CF" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold text-sm" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>Live Route Impact</div>
              <span className="text-xs font-semibold" style={{ color: approved ? "#4F7A52" : "#70756F" }}>{approved ? "Rerouting" : "Monitoring"}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl p-2.5" style={{ background: "#F5F3EE" }}><div className="text-sm font-bold" style={{ color: "#202421" }}>B-24</div><div className="text-[10px]" style={{ color: "#70756F" }}>Bus</div></div>
              <div className="rounded-xl p-2.5" style={{ background: "#F5F3EE" }}><div className="text-sm font-bold" style={{ color: "#202421" }}>{approved ? "Gate B" : "Central"}</div><div className="text-[10px]" style={{ color: "#70756F" }}>Destination</div></div>
              <div className="rounded-xl p-2.5" style={{ background: "#F5F3EE" }}><div className="text-sm font-bold" style={{ color: "#202421" }}>6 min</div><div className="text-[10px]" style={{ color: "#70756F" }}>ETA</div></div>
            </div>
          </div>

          {/* Bus list */}
          <div className="rounded-3xl border p-5" style={{ background: "#EEECEA", borderColor: "#D8D5CF" }}>
            <div className="font-semibold text-sm mb-3" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>Nearby Buses</div>
            <div className="flex flex-col gap-2">
              {buses.map(b => (
                <div key={b.id} className="flex items-center justify-between p-3 rounded-xl border"
                  style={{ background: "#F5F3EE", borderColor: "#D8D5CF" }}>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: "#202421" }}>{b.label}</div>
                    <div className="text-xs" style={{ color: "#70756F" }}>{b.dist} · {b.eta} · {b.seats} seats</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      background: b.status === "rerouting" ? "#C89B5522" : b.status === "idle" ? "#70756F22" : "#4F7A5222",
                      color: b.status === "rerouting" ? "#C89B55" : b.status === "idle" ? "#70756F" : "#4F7A52",
                    }}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live network strip — keeps the command center dense and actionable */}
      <div className="rounded-3xl border p-5" style={{ background: "#EEECEA", borderColor: "#D8D5CF" }}>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <div className="font-semibold text-sm" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>Live Route Network</div>
            <div className="text-xs mt-0.5" style={{ color: "#70756F" }}>Current bus positions, capacity and reroute readiness</div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "#4F7A5218", color: "#4F7A52" }}>● Live</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {buses.map(b => (
            <button key={b.id} onClick={() => onToast(`${b.label} · ${b.seats} seats · ${b.dist} · ETA ${b.eta}`, "info")} className="text-left rounded-2xl border p-3 transition-transform hover:-translate-y-0.5" style={{ background: "#F5F3EE", borderColor: "#D8D5CF" }}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold" style={{ color: "#202421" }}>{b.label}</span>
                <span className="w-2 h-2 rounded-full" style={{ background: b.status === "idle" ? "#9A958B" : b.status === "rerouting" ? "#C89B55" : "#4F7A52" }} />
              </div>
              <div className="text-xs mt-2" style={{ color: "#70756F" }}>{b.dist} · {b.eta}</div>
              <div className="text-xs font-medium mt-1" style={{ color: "#202421" }}>{b.seats} seats available</div>
            </button>
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div className="rounded-3xl border p-6" style={{ background: "#EEECEA", borderColor: "#D8D5CF" }}>
        <div className="font-semibold text-sm mb-4" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>Live Activity Feed</div>
        <div className="flex flex-col gap-3">
          {approved && (
            <div className="flex items-start gap-4 p-3 rounded-2xl" style={{ background: "#4F7A5211", border: "1px solid #4F7A5233" }}>
              <span className="text-xs font-mono pt-0.5" style={{ color: "#70756F" }}>Now</span>
              <span className="text-sm font-medium" style={{ color: "#4F7A52" }}>Bus B-24 rerouted to Gate B — dispatched, ETA 6 min</span>
            </div>
          )}
          {activity.map((a, i) => (
            <div key={i} className="flex items-start gap-4 p-3 rounded-2xl" style={{ background: "#F5F3EE" }}>
              <span className="text-xs font-mono pt-0.5 shrink-0" style={{ color: "#70756F" }}>{a.time}</span>
              <span className="text-sm" style={{ color: "#202421" }}>{a.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
