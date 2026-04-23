import { cache } from "react";
import { supabaseAdmin } from "@/lib/supabase-server";

export const getProperty = cache(async (id: string) => {
  const { data, error } = await supabaseAdmin
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
});
