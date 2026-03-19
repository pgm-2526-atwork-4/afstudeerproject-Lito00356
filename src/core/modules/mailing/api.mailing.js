import { API } from "@core/network/supabase/api";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const sendEmail = async ({ to, cc, subject, html, images = [] }) => {
  const attachments = await Promise.all(
    images.map(async (file) => ({
      filename: file.name,
      content: await fileToBase64(file),
    })),
  );

  const { data, error } = await API.functions.invoke("send-email", {
    body: { to, cc, subject, html, attachments },
  });

  if (error) throw error;

  return data;
};
