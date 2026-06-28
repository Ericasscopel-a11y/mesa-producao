import { Bell, Plus, FileText, Play, Send, BarChart2, Lightbulb, Calendar, Sparkles, Bookmark, LogOut } from "lucide-react";
import { C, PL, IDEAS } from "../theme";
import ContentCard from "../components/ContentCard";

export default function HomeScreen({ items, setDetail, setScreen, setShowAdd, name, signOut, loadSamples, isDesktop }) {
  const counts = {
    planejados: items.length,
    producao: items.filter((i) => i.status === "em-producao").length,
    agendados: items.filter((i) => i.status === "agendado").length,
    alcance: "—",
  };
  const initials = (name || "?").trim().slice(0, 2).toUpperCase();

  return (
    <div style={{ padding: isDesktop ? "32px 32px 16px" : "20px 16px 8px", maxWidth: 880, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.dark, display: "flex", alignItems: "center", justifyContent: "center", color: "#FBF6EC", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{initials}</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, color: C.text }}>Olá, {name || "nutri"} 👋</div>
            <div style={{ fontSize: 12, color: C.muted }}>Pronta para criar hoje?</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 8, position: "relative" }}>
            <Bell size={21} color={C.text} />
            <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", background: C.accent, border: `2px solid ${C.bg}` }} />
          </button>
          {!isDesktop && (
            <button onClick={signOut} title="Sair" style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
              <LogOut size={20} color={C.muted} />
            </button>
          )}
        </div>
      </div>

      {/* Stats card */}
      <div style={{ background: C.dark, borderRadius: 18, padding: "18px 20px 20px", marginBottom: 22, boxShadow: C.sh2 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <span style={{ color: "rgba(255,248,239,0.82)", fontWeight: 500, fontSize: 14 }}>Visão geral</span>
          <span style={{ color: C.gold, fontSize: 12, cursor: "pointer" }}>Esta semana ▾</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "repeat(4,1fr)" : "1fr 1fr", rowGap: 20 }}>
          {[
            [<FileText size={18} />, counts.planejados, "Conteúdos planejados"],
            [<Play size={18} />, counts.producao, "Em produção"],
            [<Send size={18} />, counts.agendados, "Agendados"],
            [<BarChart2 size={18} />, counts.alcance, "Alcance estimado"],
          ].map(([Icon, val, label], i) => (
            <div key={i}>
              <div style={{ color: "rgba(255,248,239,0.35)", marginBottom: 7 }}>{Icon}</div>
              <div style={{ fontSize: 26, fontWeight: 600, color: "#FBF6EC", lineHeight: 1, letterSpacing: "-0.02em" }}>{val}</div>
              <div style={{ fontSize: 11, color: "rgba(255,248,239,0.45)", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12, color: C.text }}>Ações rápidas</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {[
            { icon: <Plus size={20} />, label: "Novo conteúdo", dark: true, action: () => setShowAdd(true) },
            { icon: <Lightbulb size={20} />, label: "Ideias", action: () => setScreen("content") },
            { icon: <FileText size={20} />, label: "Roteiros", action: () => setScreen("content") },
            { icon: <Calendar size={20} />, label: "Calendário", action: () => setScreen("calendar") },
          ].map((a, i) => (
            <button key={i} onClick={a.action} style={{
              background: a.dark ? C.dark : C.card, border: `1px solid ${a.dark ? "transparent" : C.border}`,
              borderRadius: 14, padding: "13px 6px 11px", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
              boxShadow: a.dark ? C.sh2 : C.sh,
            }}>
              <span style={{ color: a.dark ? "#FBF6EC" : C.accent }}>{a.icon}</span>
              <span style={{ fontSize: 10.5, color: a.dark ? "rgba(255,248,239,0.72)" : C.muted, lineHeight: 1.3, textAlign: "center" }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Next content */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontWeight: 600, fontSize: 15, color: C.text }}>Próximos conteúdos</span>
          <button onClick={() => setScreen("content")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: C.accent, fontWeight: 500 }}>Ver todos</button>
        </div>
        {items.slice(0, 3).map((item) => (
          <ContentCard key={item.id} item={item} onClick={setDetail} />
        ))}
        {items.length === 0 && (
          <div style={{ textAlign: "center", padding: "28px 0", color: C.muted, fontSize: 14 }}>
            <Lightbulb size={28} color={C.gold} style={{ margin: "0 auto 8px", display: "block" }} />
            Nenhum conteúdo ainda. Clique em "Novo conteúdo" para começar.
            {loadSamples && (
              <div style={{ marginTop: 14 }}>
                <button onClick={loadSamples} style={{ background: "rgba(43,22,13,0.06)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 16px", cursor: "pointer", color: C.accent, fontSize: 13, fontWeight: 600 }}>
                  Carregar exemplos
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ideas */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontWeight: 600, fontSize: 15, color: C.text }}>Ideias em destaque</span>
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: C.accent, fontWeight: 500 }}>Ver todas</button>
        </div>
        {IDEAS.slice(0, 2).map((idea, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "13px 14px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12, boxShadow: C.sh }}>
            <Sparkles size={17} color={C.gold} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: 13.5, flex: 1, color: C.text }}>{idea}</span>
            <Bookmark size={17} color={C.muted} style={{ flexShrink: 0, cursor: "pointer" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
