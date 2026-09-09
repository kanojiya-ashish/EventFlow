import { useState } from "react";
import type { ToastMsg } from "../../App";

const CITY_AERIAL = "https://images.unsplash.com/photo-1773657611594-6f54137d85d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80";

type Rec = {
  id: string; category: string; severity: "critical" | "warn" | "ok";
  title: string; description: string; action: string; actionLabel: string;
  applied?: boolean;
}

const initialRecs: Rec[] = [
  {
    id: "r1", category: "Crowd Pressure", severity: "critical",
    title: "Central Arena Gate B approaching critical density",
    description: "Expected to reach critical density in 22 minutes based on current growth rate of +18% / 15 min. Historical data shows similar events peak quickly without intervention.",
    action: "Redirect 2 buses toward Gate B immediately.",
    actionLabel: "Approve Bus Redirect",
  },
  {
    id: "r2", category: "Hotel Saturation", severity: "warn",
    title: "Central accommodation zone 91% occupied",
    description: "City Central Hotel and nearby properties are nearing capacity. Incoming visitor registrations suggest demand will continue for the next 4 hours.",
    action: "Promote East Stay Zone — 120 rooms available, 9 buses connecting.",
    actionLabel: "View Distribution Plan",
  },
  {
    id: "r3", category: "Transport Congestion", severity: "warn",
    title: "Main Avenue traffic increasing rapidly",
    description: "Average transit times on Main Avenue have increased by 34% in the past 45 minutes. Bus delays are cascading to downstream routes.",
    action: "Route buses through East Connector instead of Main Avenue.",
    actionLabel: "Apply Route Change",
  },
  {
    id: "r4", category: "Operational Efficiency", severity: "ok",
    title: "12 underutilized buses near East Zone",
    description: "Fleet analysis shows 12 buses at East Connector with average 22% occupancy. Rebalancing to higher-demand stops would improve overall efficiency by an estimated 28%.",
    action: "Redistribute 6 buses to North Gate and Cultural Center stops.",
    actionLabel: "Review Rebalancing Plan",
  },
];

export default function Recommendations({ onToast }: { onToast: (t: string, type?: ToastMsg["type"]) => void }) {
  const [recs, setRecs] = useState(initialRecs);

  const apply = (id: string) => {
    setRecs(r => r.map(rec => rec.id === id ? { ...rec, applied: true } : rec));
    const rec = recs.find(r => r.id === id);
    onToast(`Applied: ${rec?.action}`, "success");
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6 flex flex-col gap-6">
      {/* Header with aerial night photo */}
      <div className="relative rounded-3xl overflow-hidden photo-hero" style={{ height: 160 }}>
        <img src={CITY_AERIAL} alt="Aerial city street at night" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 60%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(26,30,26,0.88) 0%, rgba(26,30,26,0.3) 70%)" }} />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 photo-text">
          <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#F5F3EE", opacity: 0.9, textShadow: "0 2px 8px rgba(0,0,0,.65)" }}>Intelligence Center</div>
          <h2 className="text-2xl font-bold" style={{ fontFamily: "Space Grotesk", color: "#F5F3EE", textShadow: "0 2px 10px rgba(0,0,0,.7)" }}>AI Operations Assistant</h2>
          <p className="text-sm mt-1" style={{ color: "#F5F3EE", opacity: 0.86, textShadow: "0 1px 8px rgba(0,0,0,.65)" }}>Proactive recommendations — sorted by urgency. Act before problems become critical.</p>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2">
          <div className="text-right">
            <div className="text-3xl font-bold text-white" style={{ fontFamily: "Space Grotesk" }}>
              {recs.filter(r => !r.applied).length}
            </div>
            <div className="text-xs" style={{ color: "#F5F3EE", opacity: 0.78 }}>active recommendations</div>
          </div>
        </div>
      </div>

      {/* Recs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recs.map(rec => {
          const sc = {
            critical: { border: "#A0554466", bg: "#FBF5F3", dot: "#A05544", badge: "#A0554422", badgeText: "#A05544" },
            warn:     { border: "#C89B5566", bg: "#FBF6EE", dot: "#C89B55", badge: "#C89B5522", badgeText: "#C89B55" },
            ok:       { border: "#4F7A5244", bg: "#EFF4EE", dot: "#4F7A52", badge: "#4F7A5222", badgeText: "#4F7A52" },
          }[rec.severity];

          return (
            <div
              key={rec.id}
              className="rounded-3xl border p-6 flex flex-col gap-4"
              style={{ background: rec.applied ? "#F5F3EE" : sc.bg, borderColor: rec.applied ? "#D8D5CF" : sc.border, opacity: rec.applied ? 0.7 : 1 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0 mt-0.5" style={{ background: sc.dot }} />
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: sc.badgeText }}>
                    {rec.category}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: sc.badge, color: sc.badgeText }}>
                  {rec.severity}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base mb-2 leading-snug" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>
                  {rec.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#70756F" }}>{rec.description}</p>
              </div>

              <div className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#70756F" }}>Recommended Action</div>
                <p className="text-sm font-medium" style={{ color: "#202421" }}>{rec.action}</p>
              </div>

              {rec.applied ? (
                <div className="py-3 rounded-2xl text-center text-sm font-semibold"
                  style={{ background: "#4F7A5222", color: "#4F7A52", border: "1px solid #4F7A5244" }}>
                  ✓ Recommendation Applied
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => apply(rec.id)}
                    className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white"
                    style={{ background: rec.severity === "ok" ? "#315C5B" : "#53624F", fontFamily: "Space Grotesk" }}
                  >
                    {rec.actionLabel}
                  </button>
                  <button
                    onClick={() => onToast("Recommendation dismissed", "info")}
                    className="px-4 py-3 rounded-2xl text-sm border"
                    style={{ borderColor: "#D8D5CF", color: "#70756F", background: "#F5F3EE" }}
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
