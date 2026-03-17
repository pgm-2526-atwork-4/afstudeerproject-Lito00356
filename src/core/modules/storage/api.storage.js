import { API } from "@core/network/supabase/api";
import { decode } from "base64-arraybuffer";

export const uploadImage = async (bucket, base64, filename) => {
  const { data, error } = await API.storage.from(bucket).upload(filename, decode(base64), {
    contentType: "image/jpg",
  });
  if (error) {
    return Promise.reject(error);
  }
  return Promise.resolve(data);
};
