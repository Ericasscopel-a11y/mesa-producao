import { useMemo, useState } from "react";
import { Plus, X, Trash2, Tag, Loader, Images, Check } from "lucide-react";
import { C } from "../theme";

// Sugestões iniciais — a nutri pode criar quantas tags novas quiser
export const DEFAULT_TAGS = ["selfies", "comida", "passeios", "viagens", "treino", "consultório", "bastidores", "família"];

const norm = (t) => (t || "").trim().toLowerCase();

export default function GalleryScreen({ photos, loading, addPhotos, updateTags, delPhoto, isDesktop }) {
  const [filter, setFilter] = useState(null);          // tag ativa (null = todas)
  const [selected, setSelected] = useState(null);      // id da foto aberta
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState(null);

  // Todas as tags em uso (pra filtros e sugestões)
  const usedTags = useMemo(() => {
    const s = new Set();
    photos.forEach((p) => (p.tags || []).forEach((t) => s.add(t)));
    return [...s].sort();
  }, [photos]);

  const visible = filter ? photos.filter((p) => (p.tags || []).includes(filter)) : photos;
  const openPhoto = selected ? photos.find((p) => p.id === selected) : null;

  const onUpload = async (e) => {
    const files = e.target.files;
    e.target.value = "";
    if (!files?.length) return;
    setMsg(null);
    setUploading(true);
    // Se um filtro estiver ativo, as fotos novas já entram com essa tag
    const { error, count } = await addPhotos(files, filter ? [filter] : []);
    setUploading(false);
    if (error) {
      setMsg(/relation|does not exist|schema/i.test(error.message || "")
        ? "Falta atualizar o banco: rode o SQL da galeria no Supabase (SQL Editor)."
        : "Não foi possível enviar: " + (error.message || "tente de novo."));
    } else if (count) {
      setMsg(null);
    }
  };

  const pad = isDesktop ? "32px 32px 40px" : "22px 16px 32px";

  return (
    <div style={{ padding: pad, maxWidth: 1000, margin: "0 auto" }}>
      {/* Cabeçalho */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontWeight: 600, fontSize: 22, color: C.text, fontFamily: C.serif, letterSpacing: "-0.01em" }}>Galeria</span>
        <label className="press" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: C.accent, border: "none", borderRadius: 12, padding: "9px 15px", cursor: "pointer", color: "#FBF6EC", fontWeight: 600, fontSize: 13 }}>
          {uploading ? <Loader size={15} className="spin" /> : <Plus size={15} />}
          {uploading ? "Enviando…" : "Adicionar fotos"}
          <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={onUpload} disabled={uploading} />
        </label>
      </div>
      <p style={{ fontSize: 12.5, color: C.muted, margin: "0 0 14px" }}>
        Seu banco de imagens para a produção de conteúdo. {filter ? <>Fotos novas entram já com a tag <b style={{ color: C.accent }}>#{filter}</b>.</> : "Toque numa foto para adicionar tags."}
      </p>

      {msg && (
        <div className="anim-fade-up" style={{ background: "#FBE3DA", color: "#9A2B0E", borderRadius: 12, padding: "11px 14px", fontSize: 13, lineHeight: 1.5, marginBottom: 14 }}>⚠️ {msg}</div>
      )}

      {/* Filtro por tag */}
      {photos.length > 0 && (
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, marginBottom: 10 }}>
          <FilterChip label="Todas" active={!filter} onClick={() => setFilter(null)} count={photos.length} />
          {usedTags.map((t) => (
            <FilterChip key={t} label={`#${t}`} active={filter === t} onClick={() => setFilter(filter === t ? null : t)}
              count={photos.filter((p) => (p.tags || []).includes(t)).length} />
          ))}
        </div>
      )}

      {/* Grade de fotos */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: C.muted, fontSize: 14 }}>Carregando fotos…</div>
      ) : visible.length === 0 ? (
        <div className="anim-fade-up" style={{ background: C.card, border: `1px dashed ${C.border}`, borderRadius: 18, padding: "40px 24px", textAlign: "center", boxShadow: C.sh }}>
          <Images size={30} color={C.gold} style={{ margin: "0 auto 10px", display: "block" }} />
          <div style={{ fontWeight: 600, fontSize: 16, color: C.text, fontFamily: C.serif, marginBottom: 6 }}>
            {filter ? `Nenhuma foto com #${filter}` : "Sua galeria começa aqui"}
          </div>
          <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.6, margin: "0 auto", maxWidth: 380 }}>
            {filter
              ? "Adicione fotos com esse filtro ativo e elas já entram com a tag."
              : "Suba selfies, comidas, treinos, bastidores… e organize com tags pra nunca mais faltar foto na hora de criar."}
          </p>
        </div>
      ) : (
        <div style={{ columns: isDesktop ? 4 : 3, columnGap: 8 }} className="anim-fade-up">
          {visible.map((p) => (
            <div key={p.id} onClick={() => setSelected(p.id)} className="press" style={{ breakInside: "avoid", marginBottom: 8, position: "relative", cursor: "pointer" }}>
              <img src={p.src} alt="" loading="lazy" style={{ width: "100%", display: "block", borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: C.sh }} />
              {(p.tags || []).length > 0 && (
                <span style={{ position: "absolute", bottom: 6, left: 6, background: "rgba(43,22,13,0.72)", color: "#FBF6EC", fontSize: 9.5, fontWeight: 600, borderRadius: 7, padding: "2px 7px", maxWidth: "85%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  #{p.tags[0]}{p.tags.length > 1 ? ` +${p.tags.length - 1}` : ""}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Foto aberta: tags + excluir */}
      {openPhoto && (
        <PhotoPanel
          photo={openPhoto}
          usedTags={usedTags}
          onClose={() => setSelected(null)}
          onTags={(tags) => updateTags(openPhoto.id, tags)}
          onDelete={async () => { await delPhoto(openPhoto.id); setSelected(null); }}
        />
      )}
    </div>
  );
}

function FilterChip({ label, active, onClick, count }) {
  return (
    <button onClick={onClick} className="press" style={{
      display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0,
      background: active ? C.dark : C.card, border: `1px solid ${active ? "transparent" : C.border}`,
      borderRadius: 20, padding: "6px 13px", cursor: "pointer", whiteSpace: "nowrap",
      color: active ? "#FBF6EC" : C.muted, fontSize: 12.5, fontWeight: active ? 600 : 500, transition: "all 0.15s",
    }}>
      {label} <span style={{ fontSize: 10.5, opacity: 0.7 }}>{count}</span>
    </button>
  );
}

/* ── Painel da foto: ver grande, gerenciar tags, excluir ────────── */
function PhotoPanel({ photo, usedTags, onClose, onTags, onDelete }) {
  const [input, setInput] = useState("");
  const tags = photo.tags || [];

  // Sugestões: padrões + tags já usadas, menos as que a foto já tem
  const suggestions = [...new Set([...DEFAULT_TAGS, ...usedTags])]
    .filter((t) => !tags.includes(t))
    .slice(0, 10);

  const addTag = (t) => {
    const v = norm(t);
    if (!v || tags.includes(v)) return;
    onTags([...tags, v]);
    setInput("");
  };
  const removeTag = (t) => onTags(tags.filter((x) => x !== t));

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(43,22,13,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: 16 }} className="anim-fade-up">
      <div onClick={(e) => e.stopPropagation()} className="anim-pop" style={{ background: C.card, borderRadius: 20, width: "100%", maxWidth: 480, maxHeight: "92vh", overflowY: "auto", boxShadow: C.sh2 }}>
        {/* Imagem */}
        <div style={{ position: "relative" }}>
          <img src={photo.src} alt="" style={{ width: "100%", display: "block", borderRadius: "20px 20px 0 0", maxHeight: "48vh", objectFit: "contain", background: "#2B160D" }} />
          <button onClick={onClose} className="press" style={{ position: "absolute", top: 10, right: 10, width: 30, height: 30, borderRadius: "50%", background: "rgba(43,22,13,0.75)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={16} color="#FBF6EC" />
          </button>
        </div>

        <div style={{ padding: "16px 18px 20px" }}>
          {/* Tags atuais */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
            <Tag size={14} color={C.accent} />
            <span style={{ fontSize: 12.5, fontWeight: 700, color: C.text }}>Tags desta foto</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 14 }}>
            {tags.length === 0 && <span style={{ fontSize: 12.5, color: C.muted }}>Nenhuma tag ainda — adicione abaixo.</span>}
            {tags.map((t) => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: C.dark, color: "#FBF6EC", borderRadius: 999, padding: "5px 8px 5px 12px", fontSize: 12, fontWeight: 600 }}>
                #{t}
                <button onClick={() => removeTag(t)} title="Remover tag" style={{ background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                  <X size={10} color="#FBF6EC" />
                </button>
              </span>
            ))}
          </div>

          {/* Nova tag */}
          <form onSubmit={(e) => { e.preventDefault(); addTag(input); }} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Criar ou digitar tag…"
              style={{ flex: 1, background: "rgba(43,22,13,0.05)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "9px 13px", fontSize: 13.5, color: C.text, fontFamily: "inherit", outline: "none" }}
            />
            <button type="submit" disabled={!norm(input)} className="press" style={{ background: C.gold, border: "none", borderRadius: 10, padding: "0 14px", cursor: "pointer", color: C.dark, fontWeight: 700, fontSize: 13, opacity: norm(input) ? 1 : 0.5, display: "flex", alignItems: "center", gap: 5 }}>
              <Check size={14} /> Adicionar
            </button>
          </form>

          {/* Sugestões */}
          {suggestions.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
              {suggestions.map((t) => (
                <button key={t} onClick={() => addTag(t)} className="press" style={{ background: "rgba(165,106,46,0.09)", border: `1px dashed ${C.border}`, borderRadius: 999, padding: "4px 11px", cursor: "pointer", color: C.accent, fontSize: 11.5, fontWeight: 600 }}>
                  + {t}
                </button>
              ))}
            </div>
          )}

          <button onClick={onDelete} className="press" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, width: "100%", background: "rgba(43,22,13,0.06)", border: "none", borderRadius: 12, padding: "11px", cursor: "pointer", color: "#9A2B0E", fontSize: 13, fontWeight: 600 }}>
            <Trash2 size={14} /> Excluir foto
          </button>
        </div>
      </div>
    </div>
  );
}
