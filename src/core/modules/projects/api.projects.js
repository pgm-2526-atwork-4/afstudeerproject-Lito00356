import { API } from "@core/network/supabase/api";

export const getUserProjects = async (userId) => {
  const { data, error } = await API.from("projects").select("*").eq("user_id", userId).order("created_at").throwOnError();

  if (error) throw error;

  return data;
};

export const createNewProject = async (body) => {
  const { data, error } = await API.from("projects").insert(body).select().single();

  if (error) throw error;

  return data;
};

export const getUserProject = async (userId) => {
  const { data, error } = await API.from("projects").select("scene").eq("user_id", userId).throwOnError().single();

  if (error) throw error;

  return data;
};

export const getProjectById = async (projectId) => {
  const { data, error } = await API.from("projects").select("*").eq("id", projectId).single();

  if (error) throw error;

  return data;
};

export const uploadProject = async (body) => {
  const { data, error } = await API.from("projects")
    .upsert(body, {
      onconflict: "user_id",
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const deleteProject = async (projectId) => {
  const { data, error } = await API.from("projects").delete().eq("id", projectId).single();

  if (error) throw error;

  return data;
};

export const getOpenings = async (projectId) => {
  const { data, error } = await API.from("projects").select("openings").eq("id", projectId).single();

  if (error) throw error;

  return data.openings ?? {};
};

export const saveOpenings = async (projectId, openings) => {
  const { data, error } = await API.from("projects").update({ openings }).eq("id", projectId).select("openings").single();

  if (error) throw error;

  return data.openings;
};
