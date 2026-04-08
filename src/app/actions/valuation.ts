"use server";

import { supabaseAdmin } from "@/lib/supabase-server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ValuationResult =
  | { success: true }
  | { success: false; error: string };

export async function submitValuationForm(formData: {
  name: string;
  email: string;
  phone: string;
  address: string;
  property_type?: string;
  bedrooms?: string;
  situation?: string;
  message?: string;
}): Promise<ValuationResult> {
  const { name, email, phone, address, property_type, bedrooms, situation, message } = formData;

  // Validate required fields
  if (!name || !name.trim()) {
    return { success: false, error: "Name is required." };
  }
  if (!email || !email.trim()) {
    return { success: false, error: "Email is required." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { success: false, error: "Please enter a valid email address." };
  }
  if (!phone || !phone.trim()) {
    return { success: false, error: "Phone number is required." };
  }
  if (!address || !address.trim()) {
    return { success: false, error: "Property address is required." };
  }

  try {
    const { error } = await supabaseAdmin.from("valuation_requests").insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      property_type: property_type?.trim() || null,
      bedrooms: bedrooms?.trim() || null,
      situation: situation?.trim() || null,
      message: message?.trim() || null,
      read: false,
    });

    if (error) {
      console.error("Supabase valuation insert error:", error);
      return { success: false, error: "Something went wrong. Please try again." };
    }

    // Send email notification to David
    try {
      await resend.emails.send({
        from: "McGowan Lettings <onboarding@resend.dev>",
        to: "info@mcgowanlettings.co.uk",
        replyTo: email.trim(),
        subject: `New Valuation Request from ${name.trim()} — ${address.trim()}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a1a1a; border-bottom: 2px solid #abd300; padding-bottom: 10px;">
              New Valuation Request
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 140px;">Name:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${name.trim()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${email.trim()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${phone.trim()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Property Address:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${address.trim()}</td>
              </tr>
              ${property_type?.trim() ? `<tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Property Type:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${property_type.trim()}</td>
              </tr>` : ""}
              ${bedrooms?.trim() ? `<tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Bedrooms:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${bedrooms.trim()}</td>
              </tr>` : ""}
              ${situation?.trim() ? `<tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Situation:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${situation.trim()}</td>
              </tr>` : ""}
            </table>
            ${message?.trim() ? `
            <div style="margin-top: 20px; padding: 15px; background: #f8f8f6; border-radius: 8px;">
              <p style="font-weight: bold; color: #555; margin: 0 0 8px 0;">Additional Information:</p>
              <p style="color: #1a1a1a; margin: 0; white-space: pre-wrap;">${message.trim()}</p>
            </div>` : ""}
            <p style="margin-top: 20px; font-size: 12px; color: #999;">
              You can reply directly to this email to respond to ${name.trim()}.
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      // Log but don't fail the submission — the data is saved in Supabase
      console.error("Valuation email notification error:", emailErr);
    }

    return { success: true };
  } catch (err) {
    console.error("Valuation form submission error:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
