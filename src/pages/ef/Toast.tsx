import type { ToastMsg } from "../../App";

export default function Toast({ msg }: { msg: ToastMsg }) {
  const styles = {
    success: { bg: "#F0F4EE", border: "#53624F", dot: "#4F7A52" },
    warn:    { bg: "#FBF6EE", border: "#C89B55", dot: "#C89B55" },
    info:    { bg: "#EEF2F2", border: "#315C5B", dot: "#315C5B" },
  };
  const s = styles[msg.type || "info"];
  return (
    <div
      className="pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-2xl border shadow-xl max-w-xs"
      style={{ background: s.bg, borderColor: s.border, minWidth: 240 }}
    >
      <span className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: s.dot }} />
      <p className="text-sm leading-snug" style={{ color: "#202421" }}>{msg.text}</p>
    </div>
  );
}
