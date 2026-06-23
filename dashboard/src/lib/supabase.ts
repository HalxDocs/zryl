import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseReady =
  Boolean(supabaseUrl) && Boolean(supabaseAnonKey);

export const supabase = supabaseReady
  ? createClient(supabaseUrl, supabaseAnonKey, {
      realtime: {
        params: {
          eventsPerSecond: 2,
        },
      },
    })
  : createClient("https://placeholder.supabase.co", "placeholder-key");
