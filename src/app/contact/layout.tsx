import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | McGowan Residential Lettings",
  description:
    "Get in touch with McGowan Residential Lettings. Call, WhatsApp, or email David directly. Letting agents in Bury, Bolton, Manchester and Rossendale with over 25 years of experience.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
