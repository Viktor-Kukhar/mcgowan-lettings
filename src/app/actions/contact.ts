"use server";

import { supabaseAdmin } from "@/lib/supabase-server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactResult =
  | { success: true }
  | { success: false; error: string };

export async function submitContactForm(formData: {
  name: string;
  email: string;
  phone?: string;
  type?: string;
  message: string;
}): Promise<ContactResult> {
  const { name, email, phone, type, message } = formData;

  // Validate required fields
  if (!name || !name.trim()) {
    return { success: false, error: "Name is required." };
  }
  if (!email || !email.trim()) {
    return { success: false, error: "Email is required." };
  }
  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { success: false, error: "Please enter a valid email address." };
  }
  if (!message || !message.trim()) {
    return { success: false, error: "Message is required." };
  }

  try {
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      type: type?.trim() || null,
      message: message.trim(),
      read: false,
    });

    if (error) {
      console.error("Supabase contact insert error:", error);
      return { success: false, error: "Something went wrong. Please try again." };
    }

    // Send email notification to David
    try {
      await resend.emails.send({
        from: "McGowan Lettings <onboarding@resend.dev>",
        to: "info@mcgowanlettings.co.uk",
        replyTo: email.trim(),
        subject: `New ${type || "General"} Enquiry from ${name.trim()}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a1a1a; border-bottom: 2px solid #abd300; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${name.trim()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${email.trim()}</td>
              </tr>
              ${phone?.trim() ? `<tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${phone.trim()}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Type:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${type || "General"}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 15px; background: #f8f8f6; border-radius: 8px;">
              <p style="font-weight: bold; color: #555; margin: 0 0 8px 0;">Message:</p>
              <p style="color: #1a1a1a; margin: 0; white-space: pre-wrap;">${message.trim()}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #999;">
              You can reply directly to this email to respond to ${name.trim()}.
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      // Log but don't fail the submission — the data is saved in Supabase
      console.error("Email notification error:", emailErr);
    }

    return { success: true };
  } catch (err) {
    console.error("Contact form submission error:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
