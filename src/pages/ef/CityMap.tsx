import type { ReactNode } from "react";

export type MapMarker = {
  id: string;
  type: "bus" | "hotel" | "hotspot" | "venue";
  x: number;
  y: number;
  label: string;
  detail: string;
  severity?: "ok" | "warn" | "critical";
};

export default function CityMap({ markers, activeId, onSelect, reroute = false, children }: {
  markers: MapMarker[];
  activeId?: string | null;
  onSelect?: (marker: MapMarker) => void;
  reroute?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#E8E5DC" }}>
      <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-label="2D live city map">
        <rect width="1000" height="600" fill="#E9E6DE" />
        <path d="M0 0H175C210 85 195 155 235 225C275 295 260 380 310 450C350 510 330 555 360 600H0Z" fill="#D7DED9" />
        <g fill="none" stroke="#D0CDC4" strokeWidth="2">
          <path d="M30 80 C190 145 250 95 390 150 S700 125 980 80" />
          <path d="M-20 175 C150 230 290 190 430 235 S760 220 1020 180" />
          <path d="M-10 285 C170 330 300 280 470 320 S760 305 1010 275" />
          <path d="M0 410 C170 365 300 440 470 395 S790 410 1000 350" />
          <path d="M20 525 C170 470 300 545 455 485 S760 505 990 450" />
          <path d="M145 -20 C115 120 210 180 165 300 S210 480 155 620" />
          <path d="M285 -10 C250 120 345 195 300 330 S350 490 315 610" />
          <path d="M455 -10 C420 130 500 220 455 345 S500 500 470 620" />
          <path d="M620 -10 C580 120 665 205 615 330 S670 485 635 620" />
          <path d="M790 -10 C750 120 835 220 785 355 S840 500 805 620" />
          <path d="M930 -10 C890 120 970 205 925 340 S970 500 940 620" />
        </g>
        <g fill="none" stroke="#FAF8F2" strokeWidth="9" opacity="0.95">
          <path d="M40 150 C230 210 330 120 500 190 S790 170 970 125" />
          <path d="M40 455 C220 405 320 500 500 430 S760 450 965 385" />
          <path d="M365 25 C330 170 520 235 470 360 S520 500 500 590" />
        </g>
        <g fill="none" stroke="#BDB8AD" strokeWidth="3">
          <path d="M40 150 C230 210 330 120 500 190 S790 170 970 125" />
          <path d="M40 455 C220 405 320 500 500 430 S760 450 965 385" />
          <path d="M365 25 C330 170 520 235 470 360 S520 500 500 590" />
        </g>
        <g opacity="0.75">
          <circle cx="520" cy="270" r="118" fill="#D8E1D5" stroke="#8FA18C" strokeWidth="2" />
          <circle cx="760" cy="390" r="105" fill="#E8D9BD" stroke="#C89B55" strokeWidth="2" />
          <circle cx="280" cy="430" r="92" fill="#D8E1D5" stroke="#7C9A83" strokeWidth="2" />
          <circle cx="700" cy="165" r="90" fill="#E7D8B7" stroke="#C89B55" strokeWidth="2" />
        </g>
        <g fill="#77766F" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600" opacity="0.62">
          <text x="425" y="255">CENTRAL ZONE</text>
          <text x="690" y="395">EAST STAY ZONE</text>
          <text x="205" y="440">WEST ZONE</text>
          <text x="635" y="165">NORTH ZONE</text>
        </g>
        <g fill="#A8A49A" fontFamily="Inter, sans-serif" fontSize="11" opacity="0.9">
          <text x="90" y="120">WEST CONNECTOR</text>
          <text x="790" y="115">NORTH AVENUE</text>
          <text x="70" y="505">SOUTH LOOP</text>
          <text x="540" y="545">EAST CONNECTOR</text>
        </g>
        {reroute && <path d="M380 330 C475 280 555 310 665 245" fill="none" stroke="#C89B55" strokeWidth="7" strokeDasharray="14 10" strokeLinecap="round" />}
      </svg>

      {markers.map(marker => {
        const color = marker.type === "hotspot"
          ? marker.severity === "critical" ? "#A05544" : "#C89B55"
          : marker.type === "bus" ? "#315C5B"
          : marker.type === "hotel" ? "#53624F" : "#C89B55";
        const icon = marker.type === "bus" ? "▰" : marker.type === "hotel" ? "⌂" : marker.type === "venue" ? "★" : "!";
        const active = activeId === marker.id;
        return (
          <button key={marker.id} onClick={() => onSelect?.(marker)} className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center" style={{ left: `${marker.x}%`, top: `${marker.y}%` }}>
            {marker.type === "hotspot" && <span className="absolute w-10 h-10 rounded-full animate-ping opacity-25" style={{ background: color }} />}
            <span className="relative flex items-center justify-center rounded-full shadow-md border-2 border-white text-white font-bold" style={{ width: active ? 34 : 28, height: active ? 34 : 28, background: color, fontSize: 12 }}>{icon}</span>
            <span className="mt-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold whitespace-nowrap shadow-sm" style={{ background: "rgba(255,255,255,.92)", color: "#202421", border: "1px solid #D8D5CF" }}>{marker.label}</span>
          </button>
        );
      })}
      {children}
    </div>
  );
}
