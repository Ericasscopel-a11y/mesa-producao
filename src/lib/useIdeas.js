import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabase";

export function useIdeas(userId) {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("ideas")
      .select("*")
      .order("favorite", { ascending: false })
      .order("created_at", { ascending: false });
    if (!error && data) setIdeas(data);
    setLoading(false);
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  const addIdea = async (text) => {
    const t = (text || "").trim();
    if (!t) return null;
    const { data, error } = await supabase
      .from("ideas")
      .insert({ user_id: userId, text: t })
      .select()
      .single();
    if (!error && data) setIdeas((prev) => [data, ...prev]);
    return error;
  };

  const toggleFavorite = async (idea) => {
    const { data, error } = await supabase
      .from("ideas")
      .update({ favorite: !idea.favorite })
      .eq("id", idea.id)
      .select()
      .single();
    if (!error && data) setIdeas((prev) => prev.map((i) => (i.id === idea.id ? data : i)));
    return error;
  };

  const delIdea = async (id) => {
    const { error } = await supabase.from("ideas").delete().eq("id", id);
    if (!error) setIdeas((prev) => prev.filter((i) => i.id !== id));
    return error;
  };

  return { ideas, loading, addIdea, toggleFavorite, delIdea };
}
