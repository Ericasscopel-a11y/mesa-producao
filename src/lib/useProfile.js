import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabase";

export function useProfile(userId) {
  const [avatar, setAvatar] = useState(null);

  const load = useCallback(async () => {
    if (!userId) return;
    const { data } = await supabase
      .from("profiles")
      .select("avatar")
      .eq("user_id", userId)
      .maybeSingle();
    if (data?.avatar) setAvatar(data.avatar);
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  const saveAvatar = async (dataUrl) => {
    const { error } = await supabase
      .from("profiles")
      .upsert({ user_id: userId, avatar: dataUrl, updated_at: new Date().toISOString() });
    if (!error) setAvatar(dataUrl);
    return error;
  };

  return { avatar, saveAvatar };
}
