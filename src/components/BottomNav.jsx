import { Home, LayoutGrid, Calendar, BarChart2, Plus, Wand2, Images } from "lucide-react";
import { C } from "../theme";

export default function BottomNav({ screen, setScreen, setShowAdd }) {
  const tabs = [
    { id: "home", icon: <Home size={20} />, label: "Início" },
    { id: "content", icon: <LayoutGrid size={20} />, label: "Conteúdos" },
    { id: "calendar", icon: <Calendar size={20} />, label: "Calendário" },
    { id: "gallery", icon: <Images size={20} />, label: "Galeria" },
    { id: "analytics", icon: <BarChart2 size={20} />, label: "Análises" },
    { id: "skills", icon: <Wand2 size={20} />, label: "Skills" },
  ];
  return (
    <div style={{ background: C.card, borderTop: `0.5px solid ${C.border}`, display: "flex", paddingBottom: 8 }}>
      {[tabs[0], tabs[1], "plus", tabs[2], tabs[3], tabs[4], tabs[5]].map((n) => {
        if (n === "plus") return (
          <div key="plus" style={{ flex: 1, display: "flex", justifyContent: "center", paddingTop: 4 }}>
            <button onClick={() => setShowAdd(true)} style={{ width: 50, height: 50, borderRadius: "50%", background: C.dark, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transform: "translateY(-10px)", boxShadow: C.sh2 }}>
              <Plus size={24} color="#FBF6EC" />
            </button>
          </div>
        );
        const active = screen === n.id;
        return (
          <button key={n.id} onClick={() => setScreen(n.id)} style={{
            flex: 1, border: "none", background: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 0 4px",
          }}>
            <span style={{ color: active ? C.dark : C.muted }}>{n.icon}</span>
            <span style={{ fontSize: 9, color: active ? C.dark : C.muted, fontWeight: active ? 600 : 400, whiteSpace: "nowrap" }}>{n.label}</span>
          </button>
        );
      })}
    </div>
  );
}
