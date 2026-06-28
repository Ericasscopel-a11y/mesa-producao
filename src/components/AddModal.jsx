import { useState } from "react";
import { X } from "lucide-react";
import { C, PL, ST } from "../theme";

export default function AddModal({ onClose, onSave }) {
  const [form, setForm] = useState({ title: "", platform: "instagram", type: "Reels", status: "ideia", pilar: "", date: "28 JUN" });
  const [saving, setSaving] = useState(false);
  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const typeOpts = { instagram: ["Reels", "Carrossel", "Stories", "Post"], tiktok: ["Vídeo", "Stories"], youtube: ["Vídeo", "Shorts"], linkedin: ["Post", "Artigo"] };

  const save = async () => {
    if (!form.title.trim() || saving) return;
    setSaving(true);
    await onSave({ ...form, steps: 0, total: 5 });
    setSaving(false);
  };

  const inputStyle = { width: "100%", background: "rgba(43,22,13,0.05)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 13px", fontSize: 14, color: C.text, fontFamily: "inherit", boxSizing: "border-box" };
  const labelStyle = { fontSize: 12, color: C.muted, marginBottom: 6, display: "block" };

  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(43,22,13,0.4)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 200 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: C.card, borderRadius: "20px 20px 0 0", padding: "20px 20px 32px", width: "100%", maxWidth: 460, maxHeight: "90%", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontWeight: 700, fontSize: 18, color: C.text }}>Nova ideia</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><X size={20} color={C.muted} /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>Título</label>
            <input style={inputStyle} value={form.title} onChange={(e) => upd("title", e.target.value)} placeholder="Sobre o que é esse conteúdo?" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Plataforma</label>
              <select style={{ ...inputStyle, appearance: "none" }} value={form.platform} onChange={(e) => { upd("platform", e.target.value); upd("type", typeOpts[e.target.value][0]); }}>
                {Object.entries(PL).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Formato</label>
              <select style={{ ...inputStyle, appearance: "none" }} value={form.type} onChange={(e) => upd("type", e.target.value)}>
                {(typeOpts[form.platform] || []).map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Status</label>
              <select style={{ ...inputStyle, appearance: "none" }} value={form.status} onChange={(e) => upd("status", e.target.value)}>
                {Object.entries(ST).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Pilar</label>
              <input style={inputStyle} value={form.pilar} onChange={(e) => upd("pilar", e.target.value)} placeholder="Ex: Produtividade" />
            </div>
          </div>
          <button onClick={save} disabled={saving} style={{ background: C.gold, border: "none", borderRadius: 14, padding: "14px", cursor: "pointer", color: C.dark, fontWeight: 700, fontSize: 15, width: "100%", opacity: saving ? 0.6 : 1 }}>
            {saving ? "Salvando…" : "Adicionar à Mesa"}
          </button>
        </div>
      </div>
    </div>
  );
}
