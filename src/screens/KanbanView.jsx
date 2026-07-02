import { useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { C, ST, PL } from "../theme";
import { PlatBadge } from "../components/ui";

const ORDER = ["ideia", "roteiro-pronto", "em-producao", "agendado", "postado"];

// Ao mover para um status, ajusta o checklist de etapas pra ficar coerente
const stagesForStatus = (status) => {
  const n = { "ideia": 0, "roteiro-pronto": 1, "em-producao": 2, "agendado": 4, "postado": 5 }[status] ?? 0;
  return [0, 1, 2, 3, 4].map((i) => i < n);
};

/* Pipeline em colunas por status.
   Desktop: arrastar e soltar. Celular/desktop: botão ⇄ abre menu "mover para". */
export default function KanbanView({ items, onOpen, onMove }) {
  const [dragId, setDragId] = useState(null);
  const [overCol, setOverCol] = useState(null);
  const [menuFor, setMenuFor] = useState(null); // id do card com menu aberto

  const move = async (item, status) => {
    setMenuFor(null);
    if (item.status === status) return;
    await onMove(item.id, { ...item, status, stages: stagesForStatus(status) });
  };

  return (
    <div className="kanban-scroll" style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: 20 }}>
      {ORDER.map((key) => {
        const s = ST[key];
        const colItems = items.filter((i) => i.status === key);
        return (
          <div
            key={key}
            className={`kanban-col${overCol === key ? " dragover" : ""}`}
            style={{ flex: "0 0 240px", background: "rgba(43,22,13,0.035)", borderRadius: 16, padding: "12px 10px", minHeight: 180, transition: "background 0.15s" }}
            onDragOver={(e) => { e.preventDefault(); setOverCol(key); }}
            onDragLeave={() => setOverCol(null)}
            onDrop={(e) => {
              e.preventDefault();
              setOverCol(null);
              const item = items.find((i) => i.id === dragId);
              if (item) move(item, key);
              setDragId(null);
            }}
          >
            {/* Cabeçalho da coluna */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px 10px" }}>
              <span style={{ background: s.bg, color: s.tc, fontSize: 11.5, fontWeight: 700, padding: "4px 10px", borderRadius: 8 }}>{s.label}</span>
              <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{colItems.length}</span>
            </div>

            {/* Cards */}
            {colItems.map((item) => (
              <div
                key={item.id}
                className={`kanban-card${dragId === item.id ? " dragging" : ""}`}
                draggable
                onDragStart={() => setDragId(item.id)}
                onDragEnd={() => { setDragId(null); setOverCol(null); }}
                style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 12px", marginBottom: 8, boxShadow: C.sh, position: "relative" }}
              >
                <div onClick={() => onOpen(item)} style={{ cursor: "pointer" }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                    <PlatBadge platform={item.platform} size={11} />
                    <span style={{ fontSize: 10.5, color: C.muted }}>{PL[item.platform]?.label} · {item.type}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.35, marginBottom: 8 }}>{item.title}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: C.muted }}>{item.date || "sem data"}</span>
                    <span style={{ fontSize: 11, color: item.steps === 5 ? "#1E5C38" : C.muted, fontWeight: 600 }}>{item.steps}/5</span>
                  </div>
                </div>

                {/* Mover (funciona no toque) */}
                <button onClick={(e) => { e.stopPropagation(); setMenuFor(menuFor === item.id ? null : item.id); }}
                  className="press" title="Mover para…"
                  style={{ position: "absolute", top: 7, right: 7, background: "rgba(43,22,13,0.05)", border: "none", borderRadius: 7, padding: 5, cursor: "pointer", display: "flex" }}>
                  <MoveHorizontal size={13} color={C.muted} />
                </button>

                {menuFor === item.id && (
                  <div className="anim-pop" style={{ position: "absolute", top: 30, right: 7, zIndex: 30, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, boxShadow: C.sh2, overflow: "hidden", minWidth: 150 }}>
                    {ORDER.filter((k) => k !== key).map((k) => (
                      <button key={k} onClick={(e) => { e.stopPropagation(); move(item, k); }}
                        style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "9px 13px", fontSize: 12.5, color: C.text }}>
                        → {ST[k].label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {colItems.length === 0 && (
              <div style={{ textAlign: "center", padding: "18px 0", color: C.muted, fontSize: 12, opacity: 0.7 }}>
                Solte um card aqui
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
