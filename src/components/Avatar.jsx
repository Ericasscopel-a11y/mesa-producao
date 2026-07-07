import { useState } from "react";
import { Camera } from "lucide-react";
import { C } from "../theme";

/* Foto da nutri (ou iniciais enquanto não tem foto).
   Com onUpload, vira uma área clicável de troca de foto (badge de câmera). */
export default function Avatar({ src, name, size = 44, onUpload }) {
  const [busy, setBusy] = useState(false);
  const initials = (name || "?").trim().slice(0, 2).toUpperCase();

  const pick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !onUpload || busy) return;
    setBusy(true);
    try { await onUpload(file); } finally { setBusy(false); }
  };

  const circle = (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0, overflow: "hidden",
      background: src ? "transparent" : `linear-gradient(135deg, ${C.dark}, #5A3520)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#FBF6EC", fontSize: size * 0.3, fontWeight: 700,
      boxShadow: C.sh, border: src ? `2px solid ${C.card}` : "none",
      opacity: busy ? 0.6 : 1, transition: "opacity 0.2s",
    }}>
      {src
        ? <img src={src} alt={name || "Perfil"} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        : initials}
    </div>
  );

  if (!onUpload) return circle;

  return (
    <label title="Trocar foto" className="press" style={{ position: "relative", cursor: "pointer", display: "inline-block", flexShrink: 0 }}>
      {circle}
      <span style={{
        position: "absolute", bottom: -2, right: -2, width: Math.max(18, size * 0.36), height: Math.max(18, size * 0.36),
        borderRadius: "50%", background: C.gold, border: `2px solid ${C.bg}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Camera size={Math.max(10, size * 0.18)} color={C.dark} />
      </span>
      <input type="file" accept="image/*" style={{ display: "none" }} onChange={pick} />
    </label>
  );
}
