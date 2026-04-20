import { cache } from "react";
import { supabaseAdmin } from "@/lib/supabase-server";

export const getProperty = cache(async (id: string) => {
  const { data } = await supabaseAdmin
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();
  return data;
});
