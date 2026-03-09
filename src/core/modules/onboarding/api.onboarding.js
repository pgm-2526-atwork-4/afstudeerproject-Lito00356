import { API } from "@core/network/supabase/api";

export const getOnboarding = async (userId) => {
  const { data, error } = await API.from("onboarding").select("*").eq("user_id", userId).maybeSingle();

  if (error) throw error;

  return data ?? null;
};

export const saveOnboarding = async (userId, { skipped, progress }) => {
  const { data, error } = await API.from("onboarding")
    .upsert(
      {
        user_id: userId,
        skipped: skipped ?? false,
        progress: progress ?? {},
      },
      { onConflict: "user_id" },
    )
    .select()
    .single();

  if (error) {
    console.error("saveOnboarding error:", JSON.stringify(error, null, 2));
    throw error;
  }

  return data;
};
