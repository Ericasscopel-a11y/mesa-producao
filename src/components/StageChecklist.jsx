import { Check } from "lucide-react";
import { C, STAGES } from "../theme";

/* Checklist das 5 etapas de produção. Clicar alterna a etapa;
   o componente pai decide o que fazer com o novo array (salvar, mudar status). */
export default function StageChecklist({ stages, onChange, compact = false }) {
  const arr = Array.isArray(stages) && stages.length === 5 ? stages : [false, false, false, false, false];
  const done = arr.filter(Boolean).length;
  const pct = Math.round((done / 5) * 100);

  const toggle = (i) => {
    if (!onChange) return;
    const next = [...arr];
    next[i] = !next[i];
    onChange(next);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 12.5, color: C.muted, fontWeight: 600 }}>Etapas de produção</span>
        <span style={{ fontSize: 12.5, color: done === 5 ? "#1E5C38" : C.text, fontWeight: 600 }}>
          {done}/5 {done === 5 ? "· concluído 🎉" : ""}
        </span>
      </div>
      <div style={{ background: "rgba(43,22,13,0.08)", borderRadius: 4, height: 5, marginBottom: 12, overflow: "hidden" }}>
        <div className="grow-bar" style={{ height: "100%", borderRadius: 4, background: done === 5 ? "#2f7a4f" : C.accent, width: `${pct}%`, transition: "width 0.35s, background 0.35s" }} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {STAGES.map((s, i) => {
          const on = arr[i];
          return (
            <button key={s.key} onClick={() => toggle(i)} className="press" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: on ? C.dark : "rgba(43,22,13,0.05)",
              color: on ? "#FBF6EC" : C.muted,
              border: `1px solid ${on ? "transparent" : C.border}`,
              borderRadius: 999, padding: compact ? "6px 11px" : "8px 13px",
              fontSize: compact ? 11.5 : 12.5, fontWeight: 600, cursor: onChange ? "pointer" : "default",
              transition: "all 0.18s",
            }}>
              <span style={{
                width: 15, height: 15, borderRadius: "50%", flexShrink: 0,
                background: on ? C.gold : "transparent",
                border: on ? "none" : `1.5px solid ${C.border}`,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}>
                {on && <Check size={10} color={C.dark} strokeWidth={3} />}
              </span>
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
