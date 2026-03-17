import { API } from "@core/network/supabase/api";
import { uploadImage } from "../storage/api.storage";
import { Bucket } from "../storage/type";

export const getUserProjects = async (userId) => {
  const data = await API.from("projects").select("*").eq("user_id", userId).order("created_at").throwOnError();

  return data;
};

export const createNewProject = async (body) => {
  const { data, error } = await API.from("projects").insert(body).select().single();

  if (error) throw error;

  return data;
};

export const getUserProject = async (userId) => {
  const data = await API.from("projects").select("scene").eq("user_id", userId).throwOnError().single();

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
      onconflict: "id",
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

export const updateProject = async (id, project) => {
  const { data, error } = await API.from("projects").update(project).eq("id", id).select().single();
  if (error) throw error;
  return data;
};

export const updateProjectImages = async (userId, id, image) => {
  const fileName = `${userId}/${id}_${Date.now()}.jpg`;
  await uploadImage(Bucket.Renders, image, fileName);
  const data = await updateProject(id, { images: fileName });
  return data;
};
