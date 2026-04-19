import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

// Pull the same content defined in add-smoke-co-post.mjs to avoid drift
const addScript = readFileSync(new URL("./add-smoke-co-post.mjs", import.meta.url), "utf8");
const contentMatch = addScript.match(/const content = `([\s\S]*?)`;\s*\n\s*const \{ data: existing \}/);
if (!contentMatch) {
  console.error("Could not locate content block in add-smoke-co-post.mjs");
  process.exit(1);
}
const content = contentMatch[1];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data, error } = await supabase
  .from("blog_posts")
  .update({ content })
  .eq("slug", "smoke-co-alarm-regulations-landlords-uk")
  .select()
  .single();

if (error) {
  console.error(error);
  process.exit(1);
}

console.log(`Updated ${data.slug} (published: ${data.published})`);
