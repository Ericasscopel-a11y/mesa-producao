import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { C } from "../theme";
import { LATEST_UPDATE } from "../updates";

const SEEN_KEY = "mesa-updates-seen";

/* Aviso "O que há de novo": aparece 1x por atualização.
   Compara o id da última novidade com o que está salvo no navegador. */
export default function UpdateNotice() {
  const [open, setOpen] = useState(() => {
    try {
      return localStorage.getItem(SEEN_KEY) !== LATEST_UPDATE.id;
    } catch {
      return false;
    }
  });

  const dismiss = () => {
    try { localStorage.setItem(SEEN_KEY, LATEST_UPDATE.id); } catch {}
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div onClick={dismiss} style={{ position: "fixed", inset: 0, background: "rgba(43,22,13,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: 18 }} className="anim-fade-up">
      <div onClick={(e) => e.stopPropagation()} className="anim-pop" style={{ background: C.card, borderRadius: 22, padding: "26px 24px 22px", width: "100%", maxWidth: 440, maxHeight: "86vh", overflowY: "auto", boxShadow: C.sh2 }}>
        {/* Cabeçalho */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 13, marginBottom: 16 }}>
          <div style={{ width: 46, height: 46, borderRadius: 14, background: C.dark, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Sparkles size={22} color={C.gold} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Novidades · {LATEST_UPDATE.date}</div>
            <div style={{ fontWeight: 600, fontSize: 18, color: C.text, fontFamily: C.serif, lineHeight: 1.25 }}>{LATEST_UPDATE.title}</div>
          </div>
          <button onClick={dismiss} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}>
            <X size={18} color={C.muted} />
          </button>
        </div>

        {/* Lista de novidades */}
        <div style={{ display: "flex", flexDirection: "column", gap: 11, marginBottom: 20 }}>
          {LATEST_UPDATE.items.map((it, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.4 }}>{it.emoji}</span>
              <span style={{ fontSize: 13.5, color: C.text, lineHeight: 1.55 }}>{it.text}</span>
            </div>
          ))}
        </div>

        <button onClick={dismiss} className="press" style={{ background: C.dark, border: "none", borderRadius: 14, padding: "13px", cursor: "pointer", color: "#FBF6EC", fontWeight: 700, fontSize: 14.5, width: "100%" }}>
          Entendi, vamos criar! 🚀
        </button>
      </div>
    </div>
  );
}
