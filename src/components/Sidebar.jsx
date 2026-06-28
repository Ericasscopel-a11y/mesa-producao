import { Home, LayoutGrid, Calendar, BarChart2, Plus, Sparkles, Wand2, LogOut } from "lucide-react";
import { C } from "../theme";
import { useAuth } from "../lib/useAuth";

export default function Sidebar({ screen, setScreen, setShowAdd }) {
  const { name, signOut } = useAuth();
  const tabs = [
    { id: "home", icon: <Home size={20} />, label: "Início" },
    { id: "content", icon: <LayoutGrid size={20} />, label: "Conteúdos" },
    { id: "calendar", icon: <Calendar size={20} />, label: "Calendário" },
    { id: "analytics", icon: <BarChart2 size={20} />, label: "Análises" },
    { id: "skills", icon: <Wand2 size={20} />, label: "Skills" },
  ];
  const initials = (name || "?").trim().slice(0, 2).toUpperCase();

  return (
    <aside style={{
      width: 240, flexShrink: 0, background: C.card, borderRight: `1px solid ${C.border}`,
      height: "100vh", position: "sticky", top: 0, display: "flex", flexDirection: "column",
      padding: "24px 16px",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px", marginBottom: 28 }}>
        <div style={{ width: 38, height: 38, borderRadius: 12, background: C.dark, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Sparkles size={20} color={C.gold} />
        </div>
        <span style={{ fontWeight: 700, fontSize: 16, color: C.text, letterSpacing: "-0.02em" }}>Mesa de Produção</span>
      </div>

      {/* Novo conteúdo */}
      <button onClick={() => setShowAdd(true)} style={{ display: "flex", alignItems: "center", gap: 10, background: C.dark, border: "none", borderRadius: 12, padding: "12px 14px", cursor: "pointer", color: "#FBF6EC", fontWeight: 600, fontSize: 14, marginBottom: 24, boxShadow: C.sh2 }}>
        <Plus size={18} /> Novo conteúdo
      </button>

      {/* Navegação */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        {tabs.map((t) => {
          const active = screen === t.id;
          return (
            <button key={t.id} onClick={() => setScreen(t.id)} style={{
              display: "flex", alignItems: "center", gap: 12, border: "none", cursor: "pointer",
              background: active ? "rgba(165,106,46,0.12)" : "transparent",
              borderRadius: 10, padding: "11px 14px", textAlign: "left",
              color: active ? C.accent : C.muted, fontWeight: active ? 600 : 500, fontSize: 14,
            }}>
              {t.icon} {t.label}
            </button>
          );
        })}
      </nav>

      {/* Usuária + sair */}
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.dark, color: "#FBF6EC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name || "Minha conta"}</div>
        </div>
        <button onClick={signOut} title="Sair" style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex" }}>
          <LogOut size={18} color={C.muted} />
        </button>
      </div>
    </aside>
  );
}
