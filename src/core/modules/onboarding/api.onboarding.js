import { API } from "@core/network/supabase/api";

export const getOnboarding = async (userId) => {
  const { data, error } = await API.from("onboarding").select("*").eq("user_id", userId).single();

  if (error) throw error;

  return data ?? null;
};

export const saveOnboarding = async (userId, progress) => {
  const { data, error } = await API.from("onboarding")
    .upsert({ user_id: userId, progress }, { onConflict: "user_id" })
    .select()
    .single();

  if (error) throw error;

  return data;
};
