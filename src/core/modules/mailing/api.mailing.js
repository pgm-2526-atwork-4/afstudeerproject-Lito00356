import { API } from "@core/network/supabase/api";
import { getPublicImageUrl } from "../storage/api.storage";
import { Bucket } from "../storage/type";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const sendEmail = async ({ to, cc, subject, html, imagePaths = [] }) => {
  const attachments = await Promise.all(
    imagePaths.map(async (path) => {
      const url = getPublicImageUrl(Bucket.Renders, path);
      const response = await fetch(url);
      const blob = await response.blob();
      const base64 = await blobToBase64(blob);
      const filename = path.split("/").pop();
      return { filename, content: base64 };
    }),
  );

  const { data, error } = await API.functions.invoke("send-email", {
    body: { to, cc, subject, html, attachments },
  });

  if (error) throw error;

  return data;
};

const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
