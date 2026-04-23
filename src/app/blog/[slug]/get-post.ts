import { cache } from "react";
import { supabaseAdmin } from "@/lib/supabase-server";

export const getPost = cache(async (slug: string) => {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  if (error) return null;
  return data;
});
