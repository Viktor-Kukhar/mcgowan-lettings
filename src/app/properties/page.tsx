import { supabaseAdmin } from "@/lib/supabase-server";
import PropertiesPage from "./PropertiesClient";

export const dynamic = "force-dynamic";

async function getProperties() {
  const { data } = await supabaseAdmin
    .from("properties")
    .select("id, title, price, location, area, beds, baths, type, images, status")
    .eq("active", true)
    .order("price", { ascending: false });

  return data ?? [];
}

export default async function Page() {
  const properties = await getProperties();
  return <PropertiesPage initialProperties={properties} />;
}
