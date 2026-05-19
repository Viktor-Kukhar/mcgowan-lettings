import { cache } from "react";
import { supabaseAdmin } from "@/lib/supabase-server";

// React-deduped per-request: layout.tsx (JSON-LD) and page.tsx
// (TestimonialsCarousel prop) both call this, but Supabase is only hit once.
// Returns null on failure / missing row so callers can choose their fallback
// (layout omits aggregateRating; carousel shows 370).
export const getReviewCount = cache(async (): Promise<number | null> => {
  try {
    const { data } = await supabaseAdmin
      .from("site_config")
      .select("value")
      .eq("key", "google_review_count")
      .maybeSingle();
    const parsed = data?.value ? Number(data.value) : NaN;
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  } catch {
    return null;
  }
});
