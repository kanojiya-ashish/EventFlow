import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";

const CITY_NIGHT_2 = "https://images.unsplash.com/photo-1759210720487-c74d9764da79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80";

const arrivalData = [
  { t: "09:00", arrivals: 1200, predicted: 1100 },
  { t: "10:00", arrivals: 4800, predicted: 4500 },
  { t: "11:00", arrivals: 7200, predicted: 7000 },
  { t: "12:00", arrivals: 9100, predicted: 8800 },
  { t: "13:00", arrivals: 8400, predicted: 8200 },
  { t: "14:00", arrivals: 7600, predicted: 7800 },
  { t: "15:00", arrivals: 6900, predicted: null },
  { t: "16:00", arrivals: null, predicted: 8200 },
  { t: "17:00", arrivals: null, predicted: 9400 },
];

const busData = [
  { zone: "North Gate", util: 82 },
  { zone: "East Connector", util: 38 },
  { zone: "Cultural Ctr", util: 74 },
  { zone: "West Loop", util: 55 },
  { zone: "South Exit", util: 61 },
];

const zoneData = [
  { name: "Central Zone", visitors: 28400, occ: 91 },
  { name: "East Zone",    visitors: 18200, occ: 44 },
  { name: "North Zone",   visitors: 15800, occ: 62 },
  { name: "West Zone",    visitors: 11600, occ: 38 },
  { name: "Cultural Ctr", visitors: 10200, occ: 74 },
];

const tooltipStyle = {
  contentStyle: { background: "#F5F3EE", border: "1px solid #D8D5CF", borderRadius: 12, fontSize: 12 },
  labelStyle: { color: "#202421", fontFamily: "Space Grotesk", fontWeight: 600 },
};

export default function Analytics() {
  return (
    <div className="max-w-screen-xl mx-auto p-6 flex flex-col gap-6">
      {/* Header photo */}
      <div className="relative rounded-3xl overflow-hidden photo-hero" style={{ height: 160 }}>
        <img src={CITY_NIGHT_2} alt="Aerial city at night" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(26,30,26,0.88) 0%, rgba(26,30,26,0.25) 80%)" }} />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 photo-text">
          <div className="text-xs text-white opacity-60 font-semibold uppercase tracking-widest mb-2">Operations Intelligence</div>
          <h2 className="text-2xl font-bold" style={{ fontFamily: "Space Grotesk", color: "#F5F3EE", textShadow: "0 2px 10px rgba(0,0,0,.7)" }}>Live Analytics</h2>
          <p className="text-sm mt-1" style={{ color: "#F5F3EE", opacity: 0.86, textShadow: "0 1px 8px rgba(0,0,0,.65)" }}>
            National Cricket Tournament 2026 · Day 3 · Data updated every 30 seconds
          </p>
        </div>
        {/* Prediction callout */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 px-5 py-3 rounded-2xl"
          style={{ background: "rgba(200,155,85,0.15)", border: "1px solid rgba(200,155,85,0.35)", backdropFilter: "blur(8px)" }}>
          <div className="text-xs font-semibold" style={{ color: "#C89B55" }}>AI Prediction</div>
          <div className="text-lg font-bold text-white mt-0.5" style={{ fontFamily: "Space Grotesk" }}>+24%</div>
          <div className="text-xs" style={{ color: "#F5F3EE", opacity: 0.78 }}>visitor demand · next 2 hrs</div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Avg Travel Time", value: "14 min", delta: "−2 vs peak" },
          { label: "Bus Utilization", value: "67%",    delta: "+5% this hour" },
          { label: "Avg Hotel Occ.",  value: "71%",    delta: "Central zone critical" },
          { label: "Total Arrivals",  value: "84,219", delta: "Today" },
          { label: "Routes Active",   value: "24",     delta: "3 modified by AI" },
        ].map(k => (
          <div key={k.label} className="p-4 rounded-2xl border" style={{ background: "#EEECEA", borderColor: "#D8D5CF" }}>
            <div className="text-xs mb-2" style={{ color: "#70756F" }}>{k.label}</div>
            <div className="text-2xl font-bold" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>{k.value}</div>
            <div className="text-xs mt-1" style={{ color: "#70756F" }}>{k.delta}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Visitor arrivals */}
        <div className="rounded-3xl border p-6" style={{ background: "#EEECEA", borderColor: "#D8D5CF" }}>
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="font-semibold text-sm" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>Visitor Arrivals</div>
              <div className="text-xs mt-0.5" style={{ color: "#70756F" }}>Actual vs AI prediction</div>
            </div>
            <div className="flex gap-3 text-xs" style={{ color: "#70756F" }}>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: "#53624F" }} />Actual
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: "#C89B55" }} />Predicted
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={arrivalData} margin={{ left: -20, right: 0, top: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="gAct" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#53624F" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#53624F" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gPred" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C89B55" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#C89B55" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#D8D5CF" vertical={false} />
              <XAxis dataKey="t" tick={{ fontSize: 11, fill: "#70756F" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#70756F" }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="arrivals" stroke="#53624F" strokeWidth={2} fill="url(#gAct)" dot={false} connectNulls={false} />
              <Area type="monotone" dataKey="predicted" stroke="#C89B55" strokeWidth={1.5} fill="url(#gPred)" dot={false} strokeDasharray="4 3" connectNulls={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bus utilization */}
        <div className="rounded-3xl border p-6" style={{ background: "#EEECEA", borderColor: "#D8D5CF" }}>
          <div className="font-semibold text-sm mb-1" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>Bus Route Utilization</div>
          <div className="text-xs mb-5" style={{ color: "#70756F" }}>Current occupancy by zone</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={busData} margin={{ left: -20, right: 0, top: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D8D5CF" vertical={false} />
              <XAxis dataKey="zone" tick={{ fontSize: 10, fill: "#70756F" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#70756F" }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} formatter={(v) => [`${v}%`, "Utilization"]} />
              <Bar dataKey="util" fill="#53624F" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Zone distribution */}
      <div className="rounded-3xl border p-6" style={{ background: "#EEECEA", borderColor: "#D8D5CF" }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="font-semibold text-sm" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>Zone Distribution</div>
            <div className="text-xs mt-0.5" style={{ color: "#70756F" }}>Visitor count and hotel occupancy per zone</div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {zoneData.map(z => {
            const occColor = z.occ >= 85 ? "#A05544" : z.occ >= 65 ? "#C89B55" : "#4F7A52";
            return (
              <div key={z.name} className="flex items-center gap-4">
                <div className="w-32 text-xs font-medium shrink-0" style={{ color: "#202421" }}>{z.name}</div>
                <div className="flex-1 h-6 rounded-xl overflow-hidden relative" style={{ background: "#D8D5CF" }}>
                  <div
                    className="h-full rounded-xl flex items-center px-2"
                    style={{ width: `${(z.visitors / 30000) * 100}%`, background: "#53624F" }}
                  >
                    <span className="text-xs text-white font-mono">{z.visitors.toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-20 flex items-center gap-2 shrink-0">
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "#D8D5CF" }}>
                    <div className="h-full rounded-full" style={{ width: `${z.occ}%`, background: occColor }} />
                  </div>
                  <span className="text-xs font-mono" style={{ color: occColor }}>{z.occ}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
