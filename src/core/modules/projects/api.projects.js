import { API } from "@core/network/supabase/api";

export const createNewProject = async (body) => {
  const { data, error } = await API.from("rooms").insert(body).select().single();

  if (error) throw error;

  return data;
};

export const getAllProjects = async () => {
  const { data, error } = await API.from("rooms").select("*").order("created_at").throwOnError();

  if (error) throw error;

  return data;
};

export const uploadProject = async (body) => {
  const { data, error } = await API.from("rooms")
    .upsert(body, {
      onconflict: "user_id",
    })
    .select()
    .single();

  if (error) throw error;

  return { data, error };
};

export const loadProject = async (userId) => {
  const { data, error } = await API.from("rooms").select("scene").eq("user_id", userId).throwOnError().single();

  return { data, error };
};
