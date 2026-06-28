import { useState } from "react";
import { ChevronLeft, ChevronRight, Copy, Check, Sparkles } from "lucide-react";
import { C } from "../theme";
import { SKILLS } from "../skills";
import Markdown from "../components/Markdown";

export default function SkillsScreen({ isDesktop }) {
  const [selected, setSelected] = useState(null);
  const skill = SKILLS.find((s) => s.id === selected);
  const pad = isDesktop ? "32px" : "22px 16px";

  /* ── Detalhe de uma skill ─────────────────────────────────────── */
  if (skill) {
    return <SkillDetail skill={skill} onBack={() => setSelected(null)} isDesktop={isDesktop} />;
  }

  /* ── Lista de skills ──────────────────────────────────────────── */
  return (
    <div style={{ padding: pad, maxWidth: 880, margin: "0 auto" }}>
      <span style={{ fontWeight: 700, fontSize: 20, color: C.text, display: "block", marginBottom: 8 }}>Skills</span>
      <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.55, marginTop: 0, marginBottom: 18 }}>
        Suas skills de criação de conteúdo. Siga a ordem: <b style={{ color: C.text }}>1) Persona → 2) Linha Editorial → 3) Modela Conteúdo</b>. As duas primeiras criam a base; a terceira você usa toda semana.
      </p>

      <div style={isDesktop ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } : undefined}>
        {SKILLS.map((s) => {
          const Icon = s.icon;
          return (
            <button key={s.id} onClick={() => setSelected(s.id)} style={{
              width: "100%", textAlign: "left", background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 16, padding: "16px", cursor: "pointer", boxShadow: C.sh, marginBottom: isDesktop ? 0 : 12,
              display: "flex", gap: 13, alignItems: "flex-start",
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: C.dark, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}>
                <Icon size={20} color={C.gold} />
                <span style={{ position: "absolute", top: -6, left: -6, width: 20, height: 20, borderRadius: "50%", background: C.accent, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.step}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: C.text, marginBottom: 2 }}>{s.title}</div>
                <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 8 }}>{s.subtitle}</div>
                <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.5, opacity: 0.85 }}>{s.when}</div>
              </div>
              <ChevronRight size={18} color={C.muted} style={{ flexShrink: 0, marginTop: 4 }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Detalhe + Markdown + Copiar ────────────────────────────────── */
function SkillDetail({ skill, onBack, isDesktop }) {
  const [copied, setCopied] = useState(false);
  const Icon = skill.icon;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(skill.raw);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback simples
      const ta = document.createElement("textarea");
      ta.value = skill.raw;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
      document.body.removeChild(ta);
    }
  };

  return (
    <div style={{ padding: isDesktop ? "24px 32px 40px" : "18px 16px 32px", maxWidth: 820, margin: "0 auto" }}>
      {/* Topo: voltar + copiar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 14, padding: 0 }}>
          <ChevronLeft size={18} /> Voltar
        </button>
        <button onClick={copy} style={{ display: "flex", alignItems: "center", gap: 7, background: copied ? "#D8EDE0" : C.dark, border: "none", borderRadius: 12, padding: "9px 14px", cursor: "pointer", color: copied ? "#1E5C38" : "#FBF6EC", fontWeight: 600, fontSize: 13 }}>
          {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copiado!" : "Copiar skill"}
        </button>
      </div>

      {/* Cabeçalho da skill */}
      <div style={{ display: "flex", gap: 13, alignItems: "center", marginBottom: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: 13, background: C.dark, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={22} color={C.gold} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 19, color: C.text }}>{skill.title}</div>
          <div style={{ fontSize: 13, color: C.muted }}>Passo {skill.step} · {skill.subtitle}</div>
        </div>
      </div>

      {/* Orientação "Quando usar" */}
      <div style={{ background: "#FFF3D8", borderRadius: 14, padding: "14px 16px", marginBottom: 22, display: "flex", gap: 10 }}>
        <Sparkles size={17} color={C.gold} style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#8B6000", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.03em" }}>Quando usar</div>
          <div style={{ fontSize: 13.5, color: "#6B4D00", lineHeight: 1.55 }}>{skill.when}</div>
        </div>
      </div>

      {/* Conteúdo da skill em Markdown */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: isDesktop ? "24px 28px" : "18px 18px", boxShadow: C.sh }}>
        <Markdown text={skill.body} />
      </div>
    </div>
  );
}
