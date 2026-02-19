import { createClient } from "@supabase/supabase-js";

export const API = createClient(import.meta.env.VITE_SUPABASE_KEY, import.meta.env.VITE_SUPABASE_URL, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
