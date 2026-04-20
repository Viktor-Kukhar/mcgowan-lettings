import { cache } from "react";
import { supabaseAdmin } from "@/lib/supabase-server";

export const getPost = cache(async (slug: string) => {
  const { data } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data;
});
