import { API } from "@core/network/supabase/api";

export const uploadRoom = async (body) => {
  const { data, error } = await API.from("rooms")
    .upsert(body, {
      onconflict: "user_id",
    })
    .select()
    .single();

  console.log("ERROR", error);

  return { data, error };
};

export const loadRoom = async (userId) => {
  const { data, error } = await API.from("rooms").select("scene").eq("user_id", userId).throwOnError().single();

  return { data, error };
};
