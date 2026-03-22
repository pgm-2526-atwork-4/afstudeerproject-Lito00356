// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
const EMAILS = "https://api.resend.com/emails"

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try{
const { to, cc, subject, html, attachments} = await req.json();

const formattedAttachments = attachments?.map((att) => ({
  filename: att.filename,
  content: att.content,
}));

const res = await fetch(EMAILS, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${RESEND_API_KEY}`,
  },
  body: JSON.stringify({
    from: "RoomCraft <onboarding@resend.dev>",
    to,
    cc: cc || undefined,
    subject,
    html,
    attachments: formattedAttachments || undefined,
  }),
});

const data = await res.json()

if (!res.ok){
    return new Response(JSON.stringify({error: data}), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

return new Response(JSON.stringify(data), {
  status: 200,
  headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
})
  } catch (err){
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
})