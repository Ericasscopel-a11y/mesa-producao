import { C, ST, PL } from "../theme";
import { PlatBadge } from "../components/ui";

export default function AnalyticsScreen({ items, isDesktop }) {
  const byPlatform = Object.entries(PL).map(([key, { label }]) => ({
    key, label, count: items.filter((i) => i.platform === key).length,
  }));
  const byStatus = Object.entries(ST).map(([key, { label, bg, tc }]) => ({
    key, label, bg, tc, count: items.filter((i) => i.status === key).length,
  }));

  return (
    <div style={{ padding: isDesktop ? "32px 32px 16px" : "22px 16px 8px", maxWidth: 880, margin: "0 auto" }}>
      <span style={{ fontWeight: 600, fontSize: 22, color: C.text, display: "block", marginBottom: 20, fontFamily: C.serif, letterSpacing: "-0.01em" }}>Análises</span>

      <div style={{ background: C.dark, borderRadius: 16, padding: "18px", marginBottom: 16, boxShadow: C.sh2 }}>
        <div style={{ color: "rgba(255,248,239,0.6)", fontSize: 12, marginBottom: 14 }}>TOTAL DE CONTEÚDOS</div>
        <div style={{ fontSize: 42, fontWeight: 700, color: "#FBF6EC", letterSpacing: "-0.03em", lineHeight: 1 }}>{items.length}</div>
        <div style={{ fontSize: 12, color: C.gold, marginTop: 6 }}>na mesa de produção</div>
      </div>

      <div style={{ fontWeight: 600, fontSize: 14, color: C.text, marginBottom: 12 }}>Por plataforma</div>
      <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "repeat(4,1fr)" : "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {byPlatform.map(({ key, label, count }) => (
          <div key={key} style={{ background: C.card, borderRadius: 14, padding: "14px", boxShadow: C.sh, border: `1px solid ${C.border}` }}>
            <PlatBadge platform={key} size={20} />
            <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10, marginBottom: 2 }}>{count}</div>
            <div style={{ fontSize: 12, color: C.muted }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ fontWeight: 600, fontSize: 14, color: C.text, marginBottom: 12 }}>Por status</div>
      {byStatus.filter((s) => s.count > 0).map(({ key, label, bg, tc, count }) => (
        <div key={key} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, background: C.card, borderRadius: 12, padding: "12px 14px", boxShadow: C.sh }}>
          <span style={{ background: bg, color: tc, fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 8 }}>{label}</span>
          <div style={{ flex: 1, background: "rgba(43,22,13,0.07)", borderRadius: 4, height: 6, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 4, background: C.accent, width: `${(count / Math.max(items.length, 1)) * 100}%` }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.text, minWidth: 20, textAlign: "right" }}>{count}</span>
        </div>
      ))}
      {items.length === 0 && (
        <div style={{ textAlign: "center", padding: "20px 0", color: C.muted, fontSize: 14 }}>
          Adicione conteúdos para ver suas análises aqui.
        </div>
      )}
    </div>
  );
}
