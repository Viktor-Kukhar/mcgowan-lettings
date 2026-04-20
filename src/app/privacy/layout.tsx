import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | McGowan Residential Lettings",
  description:
    "Privacy Policy for McGowan Residential Lettings Ltd. Learn how we collect, use, and protect your personal data in accordance with GDPR.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
