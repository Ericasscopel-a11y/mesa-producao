import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { compressImage } from "./media";

export function useGallery(userId) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery_photos")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setPhotos(data);
    setLoading(false);
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  // Sobe várias fotos de uma vez (comprimidas); pode já aplicar tags iniciais
  const addPhotos = async (files, tags = []) => {
    const rows = [];
    for (const f of Array.from(files).slice(0, 12)) {
      try {
        rows.push({ user_id: userId, src: await compressImage(f, 1280, 0.72), tags });
      } catch { /* arquivo não suportado — pula */ }
    }
    if (!rows.length) return { error: { message: "Nenhuma imagem válida selecionada." }, count: 0 };
    const { data, error } = await supabase.from("gallery_photos").insert(rows).select();
    if (!error && data) setPhotos((prev) => [...data, ...prev]);
    return { error, count: data?.length || 0 };
  };

  const updateTags = async (id, tags) => {
    const { data, error } = await supabase
      .from("gallery_photos")
      .update({ tags })
      .eq("id", id)
      .select()
      .single();
    if (!error && data) setPhotos((prev) => prev.map((p) => (p.id === id ? data : p)));
    return error;
  };

  const delPhoto = async (id) => {
    const { error } = await supabase.from("gallery_photos").delete().eq("id", id);
    if (!error) setPhotos((prev) => prev.filter((p) => p.id !== id));
    return error;
  };

  return { photos, loading, addPhotos, updateTags, delPhoto };
}
