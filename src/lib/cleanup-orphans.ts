import { supabase } from "@/lib/supabase";

const BUCKET = "property-images";
const PREFIXES = ["properties", "properties/videos", "epc"];

function pathFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const marker = `/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}

export async function cleanupOrphans(): Promise<number> {
  const { data: rows } = await supabase
    .from("properties")
    .select("images, videos, epc_document");

  const referenced = new Set<string>();
  for (const row of rows ?? []) {
    for (const u of (row.images as string[] | null) ?? []) {
      const p = pathFromUrl(u);
      if (p) referenced.add(p);
    }
    for (const u of (row.videos as string[] | null) ?? []) {
      const p = pathFromUrl(u);
      if (p) referenced.add(p);
    }
    const epc = pathFromUrl(row.epc_document as string | null);
    if (epc) referenced.add(epc);
  }

  const toDelete: string[] = [];
  for (const prefix of PREFIXES) {
    let offset = 0;
    const pageSize = 1000;
    while (true) {
      const { data } = await supabase.storage
        .from(BUCKET)
        .list(prefix, { limit: pageSize, offset });
      if (!data || data.length === 0) break;

      for (const file of data) {
        if (!file.metadata) continue;
        const fullPath = `${prefix}/${file.name}`;
        if (!referenced.has(fullPath)) toDelete.push(fullPath);
      }

      if (data.length < pageSize) break;
      offset += pageSize;
    }
  }

  if (toDelete.length > 0) {
    await supabase.storage.from(BUCKET).remove(toDelete);
  }
  return toDelete.length;
}
