import { Calendar, BarChart2, FileText, Check, Trash2, X } from "lucide-react";
import { C, PL } from "../theme";
import { PlatBadge, StatusPill } from "./ui";

export default function DetailPanel({ item, onClose, onDelete }) {
  if (!item) return null;
  const pct = Math.round((item.steps / item.total) * 100);
  return (
    <div style={{
      background: C.card, borderTop: `1.5px solid ${C.border}`,
      borderRadius: "20px 20px 0 0", padding: "14px 20px 28px",
      boxShadow: "0 -4px 24px rgba(43,22,13,0.12)",
    }}>
      <div style={{ width: 36, height: 3.5, background: C.border, borderRadius: 2, margin: "0 auto 16px" }} />
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
        <PlatBadge platform={item.platform} size={16} />
        <span style={{ fontSize: 13, color: C.muted }}>{PL[item.platform]?.label} · {item.type}</span>
        <StatusPill status={item.status} />
        <button onClick={onClose} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}>
          <X size={16} color={C.muted} />
        </button>
      </div>
      <div style={{ fontWeight: 600, fontSize: 17, lineHeight: 1.3, marginBottom: 16, color: C.text }}>{item.title}</div>
      {[
        [<Calendar size={13} />, "Data", item.date],
        [<BarChart2 size={13} />, "Pilar", item.pilar],
        [<FileText size={13} />, "Formato", item.type],
      ].map(([icon, label, val], i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `0.5px solid ${C.border}` }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", color: C.muted, fontSize: 13 }}>{icon} {label}</div>
          <span style={{ fontSize: 13, color: C.text }}>{val || "—"}</span>
        </div>
      ))}
      <div style={{ padding: "9px 0", borderBottom: `0.5px solid ${C.border}`, marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", color: C.muted, fontSize: 13 }}>
            <Check size={13} /> Status das etapas
          </div>
          <span style={{ fontSize: 13, color: C.text }}>{item.steps}/{item.total} concluídas</span>
        </div>
        <div style={{ background: "rgba(43,22,13,0.08)", borderRadius: 4, height: 5 }}>
          <div style={{ height: "100%", borderRadius: 4, background: C.accent, width: `${pct}%`, transition: "width 0.4s" }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => onDelete(item.id)} style={{ flex: 1, background: "rgba(43,22,13,0.06)", border: "none", borderRadius: 12, padding: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: C.muted, fontSize: 13 }}>
          <Trash2 size={14} /> Excluir
        </button>
        <button style={{ flex: 2, background: C.dark, border: "none", borderRadius: 12, padding: "12px", cursor: "pointer", color: "#FBF6EC", fontWeight: 600, fontSize: 14 }}>
          Ver detalhes completos
        </button>
      </div>
    </div>
  );
}
