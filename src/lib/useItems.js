import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { SEED } from "../theme";

// Converte a linha do banco (snake_case) para o formato usado nas telas (camelCase)
const fromRow = (r) => ({
  id: r.id,
  title: r.title,
  platform: r.platform,
  type: r.type,
  status: r.status,
  pilar: r.pilar,
  date: r.date,
  dayNum: r.day_num,
  timeSlot: r.time_slot,
  steps: r.steps,
  total: r.total,
});

// Converte o item das telas para o formato do banco
const toRow = (item, userId) => ({
  user_id: userId,
  title: item.title,
  platform: item.platform,
  type: item.type,
  status: item.status,
  pilar: item.pilar || null,
  date: item.date,
  day_num: item.dayNum ?? null,
  time_slot: item.timeSlot ?? null,
  steps: item.steps ?? 0,
  total: item.total ?? 5,
});

export function useItems(userId) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("content_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setItems(data.map(fromRow));
    setLoading(false);
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  const addItem = async (item) => {
    const { data, error } = await supabase
      .from("content_items")
      .insert(toRow(item, userId))
      .select()
      .single();
    if (!error && data) setItems((prev) => [fromRow(data), ...prev]);
    return error;
  };

  const delItem = async (id) => {
    const { error } = await supabase.from("content_items").delete().eq("id", id);
    if (!error) setItems((prev) => prev.filter((i) => i.id !== id));
    return error;
  };

  // Insere os 3 conteúdos de exemplo (botão "carregar exemplos" no estado vazio)
  const loadSamples = async () => {
    const rows = SEED.map((s) => toRow(s, userId));
    const { data, error } = await supabase.from("content_items").insert(rows).select();
    if (!error && data) setItems((prev) => [...data.map(fromRow), ...prev]);
    return error;
  };

  return { items, loading, addItem, delItem, loadSamples, reload: load };
}
