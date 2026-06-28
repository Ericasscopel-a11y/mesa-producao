import { C, ST, PL, THUMB } from "../theme";

export function PlatBadge({ platform, size = 14 }) {
  const p = PL[platform] || PL.instagram;
  return (
    <span style={{
      width: size + 6, height: size + 6, borderRadius: Math.max(4, (size + 6) * 0.28),
      background: p.color, color: "#fff", fontSize: size * 0.6, fontWeight: 700,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, letterSpacing: "-0.03em",
    }}>{p.abbr}</span>
  );
}

export function StatusPill({ status }) {
  const s = ST[status] || ST["ideia"];
  return (
    <span style={{
      background: s.bg, color: s.tc, fontSize: 11, fontWeight: 600,
      padding: "3px 9px", borderRadius: 8, whiteSpace: "nowrap",
    }}>{s.label}</span>
  );
}

export function Thumb({ platform, size = 56 }) {
  const color = THUMB[platform] || THUMB.instagram;
  return (
    <div style={{
      width: size, height: size, borderRadius: 12, flexShrink: 0,
      background: `linear-gradient(135deg, ${color}, ${color}cc)`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <PlatBadge platform={platform} size={size * 0.4} />
    </div>
  );
}
