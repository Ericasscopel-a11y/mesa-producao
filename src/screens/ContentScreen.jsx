import { useState } from "react";
import { Plus } from "lucide-react";
import { C, ST } from "../theme";
import ContentCard from "../components/ContentCard";

export default function ContentScreen({ items, setDetail, setShowAdd, isDesktop }) {
  const [filter, setFilter] = useState("todos");
  const filters = ["todos", "em-producao", "agendado", "roteiro-pronto", "ideia", "postado"];
  const visible = filter === "todos" ? items : items.filter((i) => i.status === filter);

  return (
    <div style={{ padding: isDesktop ? "32px 32px 16px" : "22px 16px 8px", maxWidth: 880, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontWeight: 700, fontSize: 20, color: C.text }}>Conteúdos</span>
        <button onClick={() => setShowAdd(true)} style={{ background: C.accent, border: "none", borderRadius: 12, padding: "8px 14px", cursor: "pointer", color: "#FBF6EC", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
          <Plus size={15} /> Novo
        </button>
      </div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, marginBottom: 12 }}>
        {filters.map((f) => {
          const active = filter === f;
          return (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: active ? C.dark : C.card, border: `1px solid ${active ? "transparent" : C.border}`,
              borderRadius: 20, padding: "6px 14px", cursor: "pointer", whiteSpace: "nowrap",
              color: active ? "#FBF6EC" : C.muted, fontSize: 12.5, fontWeight: active ? 600 : 400,
            }}>
              {f === "todos" ? "Todos" : ST[f]?.label}
            </button>
          );
        })}
      </div>
      <div style={isDesktop ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } : undefined}>
        {visible.map((item) => <ContentCard key={item.id} item={item} onClick={setDetail} />)}
      </div>
      {visible.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: C.muted, fontSize: 14 }}>
          Nenhum conteúdo nessa categoria ainda.
        </div>
      )}
    </div>
  );
}
