import { useState } from "react";
import { Plus, List, Columns3 } from "lucide-react";
import { C, ST } from "../theme";
import ContentCard from "../components/ContentCard";
import KanbanView from "./KanbanView";

export default function ContentScreen({ items, setDetail, setShowAdd, onOpen, onMove, isDesktop, initialFilter }) {
  const [filter, setFilter] = useState(initialFilter || "todos");
  const [view, setView] = useState("lista"); // lista | pipeline
  const filters = ["todos", "em-producao", "agendado", "roteiro-pronto", "ideia", "postado"];
  const visible = filter === "todos" ? items : items.filter((i) => i.status === filter);

  return (
    <div style={{ padding: isDesktop ? "32px 32px 16px" : "22px 16px 8px", maxWidth: view === "pipeline" ? 1320 : 880, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontWeight: 600, fontSize: 22, color: C.text, fontFamily: C.serif, letterSpacing: "-0.01em" }}>Conteúdos</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Alternador lista / pipeline */}
          <div style={{ display: "flex", background: "rgba(43,22,13,0.07)", borderRadius: 10, padding: 3 }}>
            {[["lista", <List size={15} key="l" />], ["pipeline", <Columns3 size={15} key="p" />]].map(([v, icon]) => (
              <button key={v} onClick={() => setView(v)} className="press" title={v === "lista" ? "Lista" : "Pipeline (Kanban)"} style={{
                display: "flex", alignItems: "center", gap: 5, border: "none", cursor: "pointer",
                background: view === v ? C.dark : "transparent", color: view === v ? "#FBF6EC" : C.muted,
                borderRadius: 8, padding: "7px 11px", fontSize: 12, fontWeight: 600, transition: "all 0.15s",
              }}>{icon}{isDesktop ? (v === "lista" ? "Lista" : "Pipeline") : ""}</button>
            ))}
          </div>
          <button onClick={() => setShowAdd(true)} className="press" style={{ background: C.accent, border: "none", borderRadius: 12, padding: "8px 14px", cursor: "pointer", color: "#FBF6EC", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
            <Plus size={15} /> Novo
          </button>
        </div>
      </div>

      {view === "pipeline" ? (
        <KanbanView items={items} onOpen={onOpen} onMove={onMove} />
      ) : (
        <>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, marginBottom: 12 }}>
            {filters.map((f) => {
              const active = filter === f;
              return (
                <button key={f} onClick={() => setFilter(f)} className="press" style={{
                  background: active ? C.dark : C.card, border: `1px solid ${active ? "transparent" : C.border}`,
                  borderRadius: 20, padding: "6px 14px", cursor: "pointer", whiteSpace: "nowrap",
                  color: active ? "#FBF6EC" : C.muted, fontSize: 12.5, fontWeight: active ? 600 : 400, transition: "all 0.15s",
                }}>
                  {f === "todos" ? "Todos" : ST[f]?.label}
                </button>
              );
            })}
          </div>
          <div className="stagger" style={isDesktop ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } : undefined}>
            {visible.map((item) => <ContentCard key={item.id} item={item} onClick={setDetail} />)}
          </div>
          {visible.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0", color: C.muted, fontSize: 14 }}>
              Nenhum conteúdo nessa categoria ainda.
            </div>
          )}
        </>
      )}
    </div>
  );
}
