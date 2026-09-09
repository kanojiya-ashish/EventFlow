import { useState } from "react";
import type { ToastMsg } from "../../App";

const HOTEL_1 = "https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80";
const HOTEL_2 = "https://images.unsplash.com/photo-1587702068694-a909ef4aa346?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80";
const HOTEL_3 = "https://images.unsplash.com/photo-1702814160779-4a88cfb330c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80";
const HOTEL_4 = "https://images.unsplash.com/photo-1637730827702-de34e9ae4ede?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80";

type Hotel = {
  id: string; name: string; type: string; photo: string;
  occ: number; rooms: number; dist: string; buses: number; rating: number; price: "High" | "Moderate" | "Budget"; priceValue: number; aiScore?: number;
}

const initialHotels: Hotel[] = [
  { id: "h1", name: "City Central Hotel",   type: "Hotel",    photo: HOTEL_1, occ: 98, rooms: 6,   dist: "1.2 km", buses: 4, rating: 4.3, price: "High", priceValue: 5200 },
  { id: "h2", name: "Lakeview Stay Zone",   type: "Stay Zone",photo: HOTEL_2, occ: 62, rooms: 84,  dist: "4.8 km", buses: 12, rating: 4.6, price: "Moderate", priceValue: 2400, aiScore: 94 },
  { id: "h3", name: "East Stay Zone",       type: "Stay Zone",photo: HOTEL_3, occ: 44, rooms: 120, dist: "5.6 km", buses: 9, rating: 4.4, price: "Moderate", priceValue: 2100, aiScore: 88 },
  { id: "h4", name: "Grand Congress Hotel", type: "Hotel",    photo: HOTEL_4, occ: 85, rooms: 28,  dist: "2.1 km", buses: 6, rating: 4.1, price: "High", priceValue: 4600 },
];

export default function Stays({ onToast }: { onToast: (t: string, type?: ToastMsg["type"]) => void }) {
  const [hotels, setHotels] = useState(initialHotels);
  const [selected, setSelected] = useState<Hotel | null>(null);
  const [simulated, setSimulated] = useState(false);
  const [reserved, setReserved] = useState<string | null>(null);

  const simulateSaturation = () => {
    setSimulated(true);
    setHotels(h => h.map(hotel => hotel.id === "h1" ? { ...hotel, occ: 100, rooms: 0 } : hotel));
    onToast("Central hotel zone saturated — AI recommending redistribution", "warn");
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>Smart Stay Management</h2>
          <p className="text-sm mt-0.5" style={{ color: "#70756F" }}>Real-time hotel occupancy, AI-powered accommodation routing</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={simulateSaturation}
            className="px-4 py-2 rounded-xl text-sm font-semibold border"
            style={{ background: "#C89B5511", borderColor: "#C89B55", color: "#C89B55" }}
          >
            ⚡ Simulate Saturation
          </button>
          <button
            onClick={() => onToast("Stay search opened", "info")}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: "#53624F", fontFamily: "Space Grotesk" }}
          >
            + Find Stay
          </button>
        </div>
      </div>

      {/* Pressure alert */}
      {simulated && (
        <div className="rounded-3xl border p-5 flex items-start gap-5" style={{ background: "#FBF6EE", borderColor: "#C89B5566" }}>
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-lg" style={{ background: "#C89B5522" }}>⚠</div>
          <div className="flex-1">
            <div className="font-semibold text-sm mb-1" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>
              Accommodation Pressure Detected
            </div>
            <p className="text-sm" style={{ color: "#70756F" }}>
              Central Zone has reached full capacity. <span style={{ color: "#202421", fontWeight: 500 }}>AI recommends shifting visitors toward Lakeview Stay Zone</span> — 84 rooms available, 4.8 km from stadium, 12 buses connecting.
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <button onClick={() => setSelected(hotels[1])}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: "#53624F", fontFamily: "Space Grotesk" }}>
              View Stay Options
            </button>
            <button onClick={() => onToast("Transport arranged to Lakeview Stay Zone", "success")}
              className="px-4 py-2 rounded-xl text-sm font-medium border"
              style={{ borderColor: "#D8D5CF", color: "#70756F", background: "#F5F3EE" }}>
              Arrange Transport
            </button>
          </div>
        </div>
      )}

      {/* Hotel grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {hotels.map(h => (
          <HotelCard key={h.id} hotel={h} onClick={() => setSelected(h)} selected={selected?.id === h.id} />
        ))}
      </div>

      {/* Selection + transport detail */}
      {selected && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Stay detail */}
          <div className="rounded-3xl border overflow-hidden" style={{ background: "#EEECEA", borderColor: "#D8D5CF" }}>
            <div className="relative photo-hero" style={{ height: 180 }}>
              <img src={selected.photo} alt={selected.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,24,21,0.88) 0%, rgba(20,24,21,0.22) 65%, transparent 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-4 photo-text">
                <div className="font-bold" style={{ fontFamily: "Space Grotesk", color: "#F5F3EE", textShadow: "0 2px 8px rgba(0,0,0,.7)" }}>{selected.name}</div>
                <div className="text-xs" style={{ color: "#F5F3EE", opacity: 0.84, textShadow: "0 1px 6px rgba(0,0,0,.65)" }}>{selected.type} · {selected.dist} from stadium</div>
              </div>
              {selected.aiScore && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ background: "#53624F", color: "white" }}>
                  AI Score {selected.aiScore}/100
                </div>
              )}
              <button onClick={() => setSelected(null)}
                className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-white"
                style={{ background: "rgba(26,30,26,0.5)" }}>×</button>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Rooms Available", value: selected.rooms },
                  { label: "Occupancy", value: `${selected.occ}%` },
                  { label: "Bus Connections", value: selected.buses },
                ].map(f => (
                  <div key={f.label} className="p-3 rounded-2xl text-center" style={{ background: "#F5F3EE" }}>
                    <div className="text-lg font-bold" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>{f.value}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#70756F" }}>{f.label}</div>
                  </div>
                ))}
              </div>
              {selected.aiScore && (
                <p className="text-xs italic leading-relaxed mb-4" style={{ color: "#70756F" }}>
                  "This zone is recommended because it has higher availability, better transport connectivity, and reduces pressure on central accommodation."
                </p>
              )}
              <button
                onClick={() => { setReserved(selected.id); onToast(`Stay selected: ${selected.name}`, "success"); }}
                className="w-full py-3 rounded-2xl font-semibold text-sm text-white"
                style={{ background: reserved === selected.id ? "#4F7A52" : "#53624F", fontFamily: "Space Grotesk" }}
              >
                {reserved === selected.id ? "✓ Stay Selected" : "Select Stay"}
              </button>
            </div>
          </div>

          {/* Transport connection */}
          <div className="rounded-3xl border p-6" style={{ background: "#EEECEA", borderColor: "#D8D5CF" }}>
            <div className="font-semibold text-sm mb-4" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>
              Transport Connection
            </div>
            <div className="p-5 rounded-2xl border mb-4" style={{ background: "#F5F3EE", borderColor: "#D8D5CF" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: "#315C5B" }}>⬡</div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "#202421" }}>Bus B-18</div>
                  <div className="text-xs" style={{ color: "#70756F" }}>Operating on this route</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { label: "Pickup", value: selected.name },
                  { label: "Destination", value: "Cricket Stadium" },
                  { label: "ETA", value: "14 min" },
                  { label: "Seats Available", value: "28" },
                ].map(f => (
                  <div key={f.label}>
                    <div style={{ color: "#70756F" }}>{f.label}</div>
                    <div className="font-semibold mt-0.5" style={{ color: "#202421" }}>{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => onToast("Journey reserved — Bus B-18 · Cricket Stadium · 14 min", "success")}
              className="w-full py-3 rounded-2xl font-semibold text-sm text-white"
              style={{ background: "#315C5B", fontFamily: "Space Grotesk" }}
            >
              Reserve Journey
            </button>
            <button
              onClick={() => onToast("Showing all departures from this zone", "info")}
              className="w-full py-2.5 rounded-2xl text-sm font-medium border mt-2"
              style={{ borderColor: "#D8D5CF", color: "#70756F", background: "#F5F3EE" }}
            >
              View All Departures
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function HotelCard({ hotel, onClick, selected }: { hotel: Hotel; onClick: () => void; selected: boolean }) {
  const full = hotel.occ >= 100;
  const nearly = hotel.occ >= 90;
  const statusColor = full ? "#A05544" : nearly ? "#C89B55" : "#4F7A52";
  const statusLabel = full ? "Full" : nearly ? "Nearly Full" : "Available";

  return (
    <button
      onClick={onClick}
      className="rounded-3xl border overflow-hidden text-left flex flex-col"
      style={{
        background: selected ? "#E8EDE5" : "#EEECEA",
        borderColor: selected ? "#53624F" : "#D8D5CF",
      }}
    >
      {/* Photo */}
      <div className="relative photo-hero" style={{ height: 160 }}>
        <img src={hotel.photo} alt={hotel.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,24,21,0.86) 0%, rgba(20,24,21,0.18) 62%, transparent 100%)" }} />
        {hotel.aiScore && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold text-white"
            style={{ background: "#53624F" }}>
            ★ {hotel.aiScore}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Occupancy bar */}
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.25)" }}>
            <div className="h-full rounded-full" style={{ width: `${hotel.occ}%`, background: statusColor }} />
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-semibold text-sm" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>{hotel.name}</div>
            <div className="text-xs mt-0.5" style={{ color: "#70756F" }}>{hotel.type} · {hotel.dist}</div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold shrink-0"
            style={{ background: statusColor + "22", color: statusColor }}>
            {statusLabel}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs mb-1">
          <div className="rounded-xl px-2.5 py-2" style={{ background: "#F5F3EE" }}><span style={{ color: "#C89B55", fontWeight: 700 }}>★ {hotel.rating}</span><span style={{ color: "#70756F" }}> rating</span></div>
          <div className="rounded-xl px-2.5 py-2 text-right" style={{ background: "#F5F3EE" }}><span style={{ color: "#202421", fontWeight: 700 }}>₹{hotel.priceValue.toLocaleString()}</span><span style={{ color: "#70756F" }}> / night</span></div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: "Rooms", value: hotel.rooms },
            { label: "Occ.", value: `${hotel.occ}%` },
            { label: "Buses", value: hotel.buses },
          ].map(f => (
            <div key={f.label} className="py-1.5 rounded-xl" style={{ background: "#F5F3EE" }}>
              <div className="text-sm font-bold" style={{ fontFamily: "Space Grotesk", color: "#202421" }}>{f.value}</div>
              <div className="text-xs" style={{ color: "#70756F" }}>{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}
