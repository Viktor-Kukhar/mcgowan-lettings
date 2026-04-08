"use server";

import { supabaseAdmin } from "@/lib/supabase-server";

export async function deleteProperty(id: string, imageUrls: string[]) {
  // Remove images from storage
  for (const url of imageUrls) {
    const path = url.split("/property-images/")[1];
    if (path) {
      await supabaseAdmin.storage.from("property-images").remove([path]);
    }
  }

  const { error } = await supabaseAdmin
    .from("properties")
    .delete()
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true, error: "" };
}

export async function deleteBlogPost(id: string, coverImage: string | null) {
  // Remove cover image from storage
  if (coverImage) {
    const path = coverImage.split("/property-images/")[1];
    if (path) {
      await supabaseAdmin.storage.from("property-images").remove([path]);
    }
  }

  const { error } = await supabaseAdmin
    .from("blog_posts")
    .delete()
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true, error: "" };
}

export async function deleteSubmission(id: string) {
  const { error } = await supabaseAdmin
    .from("contact_submissions")
    .delete()
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true, error: "" };
}

export async function deleteValuationRequest(id: string) {
  const { error } = await supabaseAdmin
    .from("valuation_requests")
    .delete()
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true, error: "" };
}
